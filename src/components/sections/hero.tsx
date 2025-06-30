import React from "react";
import { GetItOnAppleStore } from "../svg/get-it-on-apple-store";
import { GetItOnGooglePlay } from "../svg/get-it-on-google-play";
import { PrimaryFont } from "@/lib/fonts/primary";
import { WordRotate } from "../magicui/word-rotate";
import { Layout } from "../layout";
import { HeroCards } from "../common/hero-cards";

const HeroSection = () => {
  return (
    <div className="w-full h-screen sticky bg-gradient-to-br from-[#3ec76e] via-[#7ddc65] to-[#3ec76e]">
      <Layout>
        <div className="flex flex-row items-end justify-end gap-6">
          <div className="flex flex-col items-start w-2/3">
            <div className="bg-white p-2 rounded-br-xl rounded-tr-xl rounded-bl-xl">
              <h1
                className={`${PrimaryFont.className} font-bold py-2 text-5xl lg:text-7xl text-[#1E5233]`}
              >
                Hygia Lens
              </h1>
            </div>
            <h1
              className={`${PrimaryFont.className} font-bold py-2 text-5xl lg:text-7xl bg-gradient-to-br from-black to-black/70 text-transparent bg-clip-text`}
            >
              Find out the safety rating of each ingredients present in your
            </h1>
            <div className="px-4 py-2 border-4 rounded-br-xl rounded-tr-xl rounded-tl-xl border-white transition-all duration-150 ease-linear">
              <WordRotate
                className={`${PrimaryFont.className} font-bold text-5xl lg:text-7xl text-white`}
                words={["Foods", "Cosmetics", "Suplements"]}
              />
            </div>
            <div className="pt-2 flex gap-4 sm:flex-row justify-center items-center relative z-10">
              <GetItOnAppleStore />
              <GetItOnGooglePlay />
            </div>
          </div>
          <div className="w-1/3">
            <HeroCards />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HeroSection;
