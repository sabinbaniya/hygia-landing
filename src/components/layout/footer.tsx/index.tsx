import Link from "next/link";
import React from "react";
import { Layout } from "..";
import { cn } from "@/lib/utils";
import { PrimaryFont } from "@/lib/fonts/primary";

const Footer = () => {
  return (
    <Layout className="bg-gradient-to-br from-[#3ec76e] via-[#7ddc65] to-[#3ec76e] rounded-2xl py-10 mb-10">
      <div className="flex flex-col items-center gap-8">
        <div className="text-white flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6 w-full">
          <p className={cn("text-4xl font-semibold", PrimaryFont.className)}>
            Hygia Lens
          </p>
          <div>
            <p className={cn("font-semibold text-4xl", PrimaryFont.className)}>
              Company
            </p>
            <ul className="space-y-1 mt-1.5 font-medium text-[#1E5233]">
              <li className="text-sm">
                <Link href="#core">Our Core Value</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className={cn("font-semibold text-4xl", PrimaryFont.className)}>
              Legals
            </p>
            <ul className="space-y-1 mt-1.5 font-medium text-[#1E5233]">
              <li className="text-sm">
                <Link href="/privacy">Privacy</Link>
              </li>
              <li className="text-sm">
                <Link href="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#1E5233] rounded-full" />
        <p className="text-[#1E5233] font-medium text-sm text-left w-full">
          Copyright &copy; {new Date().getFullYear()} | All rights reserved
        </p>
      </div>
    </Layout>
  );
};

export default Footer;
