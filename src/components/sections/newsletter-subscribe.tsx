"use client";

import { useState } from "react";
import { Check, Mail, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Layout } from "../layout";

interface NewsletterSubscribeProps {
  className?: string;
}

export const NewsletterSubscribe = ({
  className = "",
}: NewsletterSubscribeProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Card className={cn(`w-full max-w-2xl shadow-none mx-auto ${className}`)}>
        <CardHeader className="text-center space-y-2">
          <div
            className={cn(
              "relative mx-auto w-12 h-12 mt-6",
              "before:content-[''] before:left-1/2 before:-translate-x-1/2 before:top-1/2 before:-translate-y-1/2 before:absolute before:block before:bg-primary/10 before:rounded-full before:w-20 before:h-20 before:z-10",
              "after:content-[''] after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:absolute after:block after:bg-primary/5 after:rounded-full after:w-28 after:h-28 after:z-10",
              status === "success" &&
                "before:bg-green-600/10 after:bg-green-600/5 "
            )}
          >
            <div
              className={cn(
                "absolute w-12 -left-1/2 translate-x-1/2 -top-1/2 translate-y-1/2 h-12 bg-primary/30 rounded-full flex items-center justify-center z-30",
                status === "success" && "bg-green-600/30"
              )}
            >
              {status === "success" ? (
                <Check className="h-8 w-8 text-green-600" />
              ) : (
                <Mail className="h-6 w-6 text-white" />
              )}
            </div>
          </div>
          <CardTitle
            className={cn(
              "text-xl mt-8",
              status === "success" ? "text-green-600" : "text-primary"
            )}
          >
            {status === "success" ? "Welcome aboard!" : "Stay in the Loop"}
          </CardTitle>
          <CardDescription
            className={cn(
              status === "success" ? "text-green-600" : "text-primary/60"
            )}
          >
            {status === "success"
              ? "You've successfully subscribed to our newsletter. Check your inbox for a confirmation email."
              : "Subscribe to our newsletter and be the first to know about exciting new features, updates, and exclusive content."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {status === "success" ? (
            <div className="text-center space-y-4">
              <Button
                variant="outline"
                onClick={() => setStatus("idle")}
                className="w-full rounded"
              >
                Subscribe Another Email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className={status === "error" ? "border-red-500" : ""}
                />
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <X className="h-4 w-4" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full rounded"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Subscribe to Newsletter
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};
