import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article className="prose mx-auto">{children}</article>;
}
