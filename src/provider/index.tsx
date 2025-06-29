"use client";

import React from "react";
import { Provider as JotaiProvider } from "jotai";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
};

export default Provider;
