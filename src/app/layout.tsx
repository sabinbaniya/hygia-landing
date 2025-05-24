import type { Metadata } from "next";
import "./globals.css";
import { BodyFont } from "@/lib/fonts/body";

export const metadata: Metadata = {
  title:
    "Hygia Lens | Find out safety rating of ingredients in your food, supplements and more",
  description:
    "Hygia lens is an AI Powered app that helps you easily find out safety rating of all the ingredients present in your food, supplements and more",
  openGraph: {
    type: "website",
    images: "/assets/images/og-hygia.png",
    title:
      "Hygia Lens | Find out safety rating of ingredients in your food, supplements and more",
    description:
      "Hygia lens is an AI Powered app that helps you easily find out safety rating of all the ingredients present in your food, supplements and more",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${BodyFont.className} antialiased`}>{children}</body>
    </html>
  );
}
