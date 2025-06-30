"use client";

import CoreValue from "@/components/sections/core-value";
import FaqSection from "@/components/sections/faq";
import HeroSection from "@/components/sections/hero";
import { NewsletterSubscribe } from "@/components/sections/newsletter-subscribe";
import StatsSection from "@/components/sections/stats";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <HeroSection />
      <StatsSection />
      <CoreValue />
      <FaqSection />
      <NewsletterSubscribe />
    </Fragment>
  );
}
