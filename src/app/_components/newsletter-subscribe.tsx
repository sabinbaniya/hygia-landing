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
import { Badge } from "@/components/ui/badge";

interface NewsletterSubscribeProps {
  className?: string;
  compact?: boolean;
}

export const NewsletterSubscribe = ({
  className = "",
  compact = false,
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

  if (compact) {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Get Feature Updates</span>
          <Badge variant="secondary" className="text-xs">
            Free
          </Badge>
        </div>

        {status === "success" ? (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <Check className="h-4 w-4" />
            <span>Successfully subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-9"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="sm"
                disabled={isLoading}
                className="px-3"
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            {status === "error" && (
              <p className="text-red-500 text-xs">{errorMessage}</p>
            )}
          </form>
        )}

        <p className="text-xs text-muted-foreground">
          Be the first to know about new features and updates. Unsubscribe
          anytime.
        </p>
      </div>
    );
  }

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">Stay in the Loop</CardTitle>
        <CardDescription>
          Subscribe to our newsletter and be the first to know about exciting
          new features, updates, and exclusive content.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {status === "success" ? (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-green-800">Welcome aboard!</h3>
              <p className="text-sm text-green-600">
                You&apos;ve successfully subscribed to our newsletter. Check
                your inbox for a confirmation email.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setStatus("idle")}
              className="w-full"
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

            <Button type="submit" className="w-full" disabled={isLoading}>
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

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Check className="h-3 w-3" />
              <span>Weekly updates</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="h-3 w-3" />
              <span>No spam</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="h-3 w-3" />
              <span>Unsubscribe anytime</span>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            By subscribing, you agree to our privacy policy and terms of
            service.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
