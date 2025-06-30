import FaqSection from "@/components/sections/faq";
import HeroSection from "@/components/sections/hero";
import StatsSection from "@/components/sections/stats";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <HeroSection />
      <StatsSection />
      <FaqSection />
    </Fragment>
  );
}
