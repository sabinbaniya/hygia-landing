import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";
import { Button } from "../ui/button";
import {
  Loader2,
  Upload,
  RotateCcw,
  ShieldCheck,
  Shield,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { experimental_streamedQuery as streamedQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import ReCAPTCHA from "react-google-recaptcha";

interface IngredientInfo {
  ingredient: string;
  safety_rating: number;
  reason: string;
  description: string;
}

interface IngredientCardProps {
  data: IngredientInfo;
}

function getSafetyInfo(rating: number) {
  if (rating <= 2) {
    return {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: ShieldCheck,
      label: "Safe",
      iconColor: "text-green-600",
    };
  } else if (rating <= 5) {
    return {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: Shield,
      label: "Moderate",
      iconColor: "text-yellow-600",
    };
  } else if (rating <= 7) {
    return {
      color: "bg-orange-100 text-orange-800 border-orange-200",
      icon: AlertTriangle,
      label: "Caution",
      iconColor: "text-orange-600",
    };
  } else {
    return {
      color: "bg-red-100 text-red-800 border-red-200",
      icon: ShieldAlert,
      label: "High Risk",
      iconColor: "text-red-600",
    };
  }
}

function IngredientCard({ data }: IngredientCardProps) {
  const safetyInfo = getSafetyInfo(data.safety_rating);
  const SafetyIcon = safetyInfo.icon;

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-200 p-2">
      <CardHeader className="p-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">
            {data.ingredient}
          </CardTitle>
          <div className="flex items-center gap-2">
            <SafetyIcon className={`h-5 w-5 ${safetyInfo.iconColor}`} />
            <Badge variant="outline" className={safetyInfo.color}>
              {safetyInfo.label}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-600">Risk Rating:</span>
          <div className="flex items-center gap-1">
            <span
              className={`font-bold text-lg ${
                data.safety_rating <= 2
                  ? "text-green-600"
                  : data.safety_rating <= 5
                  ? "text-yellow-600"
                  : data.safety_rating <= 7
                  ? "text-orange-600"
                  : "text-red-600"
              }`}
            >
              {data.safety_rating}
            </span>
            <span className="text-sm text-gray-500">/10</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-2">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">
            Safety Assessment
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">{data.reason}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

const dataURLtoBlob = (dataURL: string) => {
  const [header, base64] = dataURL.split(",");
  const mime = header.match(/:(.*?);/)![1];
  const bin = atob(base64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
};

function CameraScanner({
  executeCaptchaAsync,
}: {
  executeCaptchaAsync: () => Promise<string | null | undefined>;
}) {
  const camera = useRef<CameraType>(null);
  const [img, setImg] = useState<string | null>(null);
  const [parsed, setParsed] = useState<IngredientInfo[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null);

  const {
    data: tokens = [],
    isFetching,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["image-scan", formData],
    enabled: !!formData,
    queryFn: streamedQuery({
      queryFn: async () => {
        const res = await fetch(
          "https://api.hygialens.com/api/v1/product/info",
          {
            method: "POST",
            body: formData!,
          }
        );
        if (!res.body) throw new Error("No response body");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        async function* gen() {
          let buffer = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) return;
            buffer += decoder.decode(value, { stream: true });
            let idx;
            while ((idx = buffer.indexOf("\n")) !== -1) {
              const line = buffer.slice(0, idx);
              buffer = buffer.slice(idx + 1);
              yield line + "\n";
            }
          }
        }

        return gen();
      },
    }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  console.log(tokens, "tokens");

  useEffect(() => {
    if (tokens.length === 0) return;
    const output = tokens.join("");
    const matches = output.match(/\{[^}]+\}/g) || [];
    setParsed(
      matches
        .map((s) => {
          try {
            return JSON.parse(s) as IngredientInfo;
          } catch {
            return null;
          }
        })
        .filter(Boolean) as IngredientInfo[]
    );
  }, [tokens]);

  const capture = async () => {
    const photo = camera.current?.takePhoto("base64url") as string;
    if (photo) setImg(photo);
  };

  const upload = async () => {
    if (!img) return;
    const blob = dataURLtoBlob(img);
    const fd = new FormData();
    fd.append("image", blob, "photo.jpg");
    console.log("FormData contents:");
    for (const [k, v] of fd.entries()) console.log(k, v);
    const token = await executeCaptchaAsync();

    if (!token) {
      toast("Couldn't get captcha token, refresh page and try again!");
    } else {
      fd.append("token", token);
      setFormData(fd);
      toast("Uploading image and starting scan…");
    }
  };

  return (
    <div className="w-[50dvh] max-w-md mx-auto flex flex-col gap-4">
      {!img && (
        <div className="w-full h-auto flex flex-col gap-2">
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
          <Button onClick={capture}>Capture</Button>
        </div>
      )}

      {img && !isSuccess && parsed.length === 0 && (
        <div className="flex flex-col gap-2 w-full h-auto">
          <Image
            src={img}
            className="w-full h-[300px] rounded-xl shadow-sm"
            width={400}
            height={300}
            alt="Captured"
          />
          <div className="flex flex-row w-full gap-2">
            <Button onClick={upload} disabled={isFetching}>
              {isFetching ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Scanning…
                </>
              ) : (
                <>
                  <Upload className="mr-2" />
                  Upload & Scan
                </>
              )}
            </Button>
            <Button onClick={() => setImg(null)} disabled={isFetching}>
              <RotateCcw className="mr-2" /> Retake
            </Button>
          </div>
        </div>
      )}

      {isFetching && !isSuccess && <p>Loading data…</p>}
      {isSuccess && parsed.length > 0 && (
        <div className="grid grid-cols-1 gap-2 h-[50dvh] overflow-y-auto">
          {parsed.map((ingredient, index) => (
            <IngredientCard key={index} data={ingredient} />
          ))}
        </div>
      )}
      {isSuccess && parsed.length === 0 && <p>No ingredients found.</p>}
      {error && (
        <p className="text-red-500">Error: {(error as Error).message}</p>
      )}
    </div>
  );
}

export default function CameraCapture({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
}) {
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const executeCaptchaAsync = async () => {
    return await captchaRef.current?.executeAsync();
  };
  return (
    <>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        ref={captchaRef}
        size="invisible"
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Camera Scanner</DialogTitle>
            <DialogDescription>Capture and scan a product</DialogDescription>
          </DialogHeader>
          <CameraScanner executeCaptchaAsync={executeCaptchaAsync} />
        </DialogContent>
      </Dialog>
    </>
  );
}
