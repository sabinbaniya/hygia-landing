import Footer from "@/components/layout/footer.tsx";
import Navbar from "@/components/layout/navbar.tsx";
import React, { Fragment } from "react";

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
}
