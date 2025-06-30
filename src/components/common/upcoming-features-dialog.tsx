"use client";

import { useState } from "react";
import { MessageSquare, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const upcomingFeatures = [
  {
    icon: MessageSquare,
    title: "Smart Chat Assistant",
    description:
      "Get instant help and answers with our intelligent chat assistant powered by AI ✨.",
    status: "In Development",
    timeline: "Q3 2025",
  },
  {
    icon: Star,
    title: "Detailed Analytics",
    description:
      "Detailed insights and analytics to help you track all your past scans.",
    status: "Coming Soon",
    timeline: "Q3 2025",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Development":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Coming Soon":
      return "bg-green-100 text-green-800 border-green-200";
    case "Planning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const UpcomingFeaturesDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          Upcoming Features
          <Sparkles className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            Upcoming Features
            <Sparkles className="h-6 w-6 text-primary" />
          </DialogTitle>
          <DialogDescription className="text-balance text-center">
            Exciting new features and improvements coming to your mobile app
            experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {upcomingFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="flex gap-4 p-3 rounded-md border bg-card"
              >
                <div className="">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-4 w-4 text-primary" />
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-1">
                    <h3 className="font-semibold text-lg leading-tight">
                      {feature.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Badge
                        variant="outline"
                        className={cn(getStatusColor(feature.status), "")}
                      >
                        {feature.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {feature.timeline}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Stay Updated</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Enable notifications to be the first to know when these features
            become available. We&apos;re constantly working to improve your
            experience!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
