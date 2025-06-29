import type { Metadata } from "next";
import "./globals.css";
import { BodyFont } from "@/lib/fonts/body";
import Provider from "@/provider";
import Navbar from "@/components/layout/navbar.tsx";
import Footer from "@/components/layout/footer.tsx";
import { MobileDock } from "@/components/common/mobile-dock";

export const metadata: Metadata = {
  title: "Hygia Lens | Consumer Safety Application | AI Powered",
  description:
    "Hygia Lens is an AI Powered app that helps you easily find out safety rating of all the ingredients present in your food, supplements and more",
  keywords: ["Hygia", "Hygia Lens", "Consumer Safety Application"],
  applicationName: "Hygia Lens",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_PRODUCTION_URL}`),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
    },
  },
  openGraph: {
    title: "Hygia Lens | Consumer Safety Application | AI Powered",
    description:
      "Hygia Lens is an AI Powered app that helps you easily find out safety rating of all the ingredients present in your food, supplements and more",
    url: process.env.NEXT_PUBLIC_PRODUCTION_URL,
    siteName: "hygialens.com",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/images/hygiaCover.png`,
        type: "image/png",
        height: "630",
        width: "1200",
      },
    ],
    locale: "en-US",
    alternateLocale: "en-GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hygia Lens | Consumer Safety Application | AI Powered",
    description:
      "Hygia Lens is an AI Powered app that helps you easily find out safety rating of all the ingredients present in your food, supplements and more",
    creator: "@hygialens",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/images/hygiaCover.png`,
        alt: "HygiaLens",
        type: "image/png",
        height: "630",
        width: "1200",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/icon-16x16.png", sizes: "16x16" },
      { url: "/images/icon-32x32.png", sizes: "32x32" },
      { url: "/images/icon-48x48.png", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/images/apple-icon.png" },
      { url: "/images/apple-icon-x3.png", sizes: "180x180", type: "image/png" },
    ],
    other: {
      rel: "apple-touch-icon",
      url: "/images/apple-touch-icon.png",
      sizes: "180x180",
      fetchPriority: "auto",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${BodyFont.className} antialiased`}>
        <Provider>
          <Navbar />
          {children}
          <MobileDock />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
