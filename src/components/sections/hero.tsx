"use client";

import React from "react";
import { GetItOnAppleStore } from "../svg/get-it-on-apple-store";
import { GetItOnGooglePlay } from "../svg/get-it-on-google-play";
import { PrimaryFont } from "@/lib/fonts/primary";
import { WordRotate } from "../magicui/word-rotate";
import { Layout } from "../layout";
import { HeroCards } from "../common/hero-cards";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const HeroSection = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="w-full h-auto min-[1250px]:h-screen sticky bg-gradient-to-br from-[#3ec76e] via-[#7ddc65] to-[#3ec76e]">
      <Layout>
        <div className="flex w-full flex-col items-center justify-center gap-24 min-[550px]:gap-16 min-[1250px]:flex-row min-[1250px]:items-end min-[1250px]:justify-end min-[1250px]:gap-6">
          <div className="flex flex-col items-start min-[1250px]:w-2/3 w-full">
            <div className="bg-white p-2 rounded-br-xl rounded-tr-xl rounded-bl-xl">
              {user?.role !== "authenticated" ? (
                <h1
                  className={`${PrimaryFont.className} font-bold py-2 text-xl lg:text-3xl text-[#1E5233]`}
                >
                  Welcome 👋
                </h1>
              ) : (
                <h1
                  className={`${PrimaryFont.className} font-bold py-2 text-xl lg:text-3xl text-[#1E5233]`}
                >
                  Welcome 👋, {user?.email!.split("@")[0]}
                </h1>
              )}
            </div>
            <h1
              className={`${PrimaryFont.className} font-bold py-2 max-w-2xl text-5xl lg:text-7xl bg-gradient-to-br from-black to-black/70 text-transparent bg-clip-text`}
            >
              Find out the safety rating of each ingredients present in your
            </h1>
            <div className="px-4 py-2 border-4 rounded-br-xl rounded-tr-xl rounded-tl-xl border-white transition-all duration-150 ease-linear">
              <WordRotate
                className={`${PrimaryFont.className} font-bold text-3xl min-[530px]:text-5xl lg:text-7xl text-white`}
                words={["Foods", "Cosmetics", "Supplements"]}
              />
            </div>
            <div className="pt-2 flex gap-4 sm:flex-row justify-center items-center relative z-10">
              <GetItOnAppleStore />
              <GetItOnGooglePlay />
            </div>
          </div>
          <div className="w-full min-[1250px]:block flex min-[1250px]:w-1/3 justify-center items-center">
            <HeroCards />
          </div>
        </div>
      </Layout>

      <a href="https://bolt.new" target="_blank" rel="noreferrer noopener">
        <Image
          src="/assets/images/white_circle_360x360.png"
          alt=""
          height={120}
          width={300}
          className="h-20 w-auto absolute bottom-4 left-6 "
        />
      </a>
    </div>
  );
};

export default HeroSection;
