"use client";

import { CardStack } from "../ui/card-stack";
import { cn } from "@/lib/utils";
export function HeroCards() {
  return <CardStack items={CARDS} />;
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    url: "/assets/images/image-one.png",
  },
  {
    id: 1,
    url: "/assets/images/image-two.png",
  },
  {
    id: 2,
    url: "/assets/images/image-three.png",
  },
  {
    id: 3,
    url: "/assets/images/image-four.png",
  },
];
