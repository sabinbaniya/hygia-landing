import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";
import { Button } from "../ui/button";
import {
  CameraIcon,
  CircleX,
  Loader2,
  RotateCcw,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStreamTokenArray } from "@llm-ui/react";

interface IngredientInfo {
  ingredient: string;
  safety_rating: number;
  reason: string;
  description: string;
}

function CameraScanner({ onClose }: { onClose: () => void }) {
  const camera = useRef<CameraType>(null);
  const [img, setImg] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [parsed, setParsed] = useState<IngredientInfo[]>([]);
  const [tokens, setTokens] = useState<{ token: string; delayMs: number }[]>(
    []
  );
  const { output, isStreamFinished } = useStreamTokenArray(tokens);

  const { mutateAsync } = useMutation({
    mutationKey: ["search"],
    mutationFn: async (formData: FormData) => {
      const res = await fetch("https://api.hygialens.com/api/v1/product/info", {
        method: "POST",
        body: formData,
      });
      if (!res.body) throw new Error("No stream!");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const chunks: { token: string; delayMs: number }[] = [];

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          chunks.push({ token: line + "\n", delayMs: 0 });
        }
      }

      return chunks;
    },
  });

  const capture = async () => {
    setCapturing(true);
    try {
      const photo = camera.current?.takePhoto();
      if (photo) setImg(photo);
    } catch (error) {
      console.error("Failed to capture photo:", error);
    } finally {
      setCapturing(false);
    }
  };

  const dataURLtoBlob = (dataURL: string) => {
    const [header, base64Data] = dataURL.split(",");
    const mime = header.match(/:(.*?);/)![1];
    const binary = atob(base64Data);
    const arr = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
    return new Blob([arr], { type: mime });
  };

  const upload = async () => {
    if (!img) return;
    setUploading(true);

    try {
      const blob = dataURLtoBlob(img as string);
      const formData = new FormData();
      formData.append("image", blob, "photo.jpg");

      toast.promise(mutateAsync(formData), {
        loading: "Fetching Data",
        success: (res) => {
          console.log(res);
          setSuccess(true);
          setTokens(res);
          return "Successfully loaded data";
        },
        error: (err) => {
          console.log(err);
          return "Something went wrong";
        },
      });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const retake = () => {
    setImg(null);
  };

  const handleClose = () => {
    setImg(null);
    onClose();
  };

  useEffect(() => {
    const regex = /{[^}]+\}/g;
    const matches = output.match(regex);
    if (matches) {
      const items: IngredientInfo[] = [];
      for (const s of matches) {
        try {
          const obj = JSON.parse(s) as IngredientInfo;
          items.push(obj);
        } catch {}
      }
      setParsed(items);
    }
  }, [output]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-md"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {!img ? "Scan The Label" : "Review Photo"}
          </h2>
          <p className="text-gray-600 text-sm">
            {!img
              ? "Position your camera and tap capture when ready"
              : "Review your photo and upload or retake"}
          </p>
        </div>

        {success && (
          <div>
            {parsed.map((info, i) => (
              <div key={i} className="p-4 mb-2 border rounded">
                <h3 className="text-lg font-bold">{info.ingredient}</h3>
                <p>
                  <strong>Safety rating:</strong> {info.safety_rating}
                </p>
                <p>{info.reason}</p>
              </div>
            ))}

            {!isStreamFinished && <div>Loading…</div>}
          </div>
        )}

        {img && !success && (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <Image
                width={600}
                height={600}
                src={img as string}
                alt="Captured photo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={retake}
                variant="outline"
                disabled={uploading}
                className="h-12 font-semibold bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake
              </Button>

              <Button
                onClick={upload}
                disabled={uploading}
                className="h-12 font-semibold disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        {!img && (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-black aspect-[4/3]">
              <Camera
                ref={camera}
                aspectRatio={4 / 3}
                facingMode="environment"
                errorMessages={{
                  noCameraAccessible:
                    "No camera device accessible. Please connect your camera or try a different browser.",
                  permissionDenied:
                    "Permission denied. Please refresh and give camera permission.",
                  switchCamera:
                    "It is not possible to switch camera to different one because there is only one video device accessible.",
                  canvas: "Canvas is not supported.",
                }}
              />
              <div className="absolute inset-0 border-2 border-white/20 rounded-lg pointer-events-none">
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/60"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/60"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/60"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white/60"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                disabled={uploading}
                className="h-12 font-semibold bg-transparent"
              >
                <CircleX className="w-4 h-4 mr-2" />
                Close
              </Button>

              <Button
                onClick={capture}
                disabled={capturing}
                className="w-full h-12 font-semibold disabled:opacity-50"
              >
                {capturing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Capturing...
                  </>
                ) : (
                  <>
                    <CameraIcon className="w-4 h-4 mr-2" />
                    Capture
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const CameraCapture = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Camera Scanner</DialogTitle>
          <DialogDescription>
            Capture and upload photos using your camera
          </DialogDescription>
        </DialogHeader>
        <CameraScanner onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CameraCapture;
