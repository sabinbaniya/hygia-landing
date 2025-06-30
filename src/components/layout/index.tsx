import { cn } from "@/lib/utils";
import type React from "react";
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-36 pb-28",
        className
      )}
    >
      {children}
    </div>
  );
}
