import { GetItOnAppleStore } from "@/components/svg/get-it-on-apple-store";
import { GetItOnGooglePlay } from "@/components/svg/get-it-on-google-play";
import { PrimaryFont } from "@/lib/fonts/primary";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#49FF92] to-[#67faa2]">
      <nav className="flex justify-between items-center gap-8 px-8">
        <p
          className={`${PrimaryFont.className} text-4xl font-semibold text-center py-4 text-[#1E5233]`}
        >
          Hygia
        </p>
        <div className="mt-1">
          <ul className="flex justify-center gap-4 text-[#1E5233] font-medium text-sm">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="bg-white rounded-t-4xl p-8 pb-0">
        <main className="text-center space-y-5">
          <h1
            className={`${PrimaryFont.className} font-bold text-7xl pt-12 bg-gradient-to-br from-black to-black/70 text-transparent bg-clip-text`}
          >
            Hygia - know your supplements
          </h1>
          <p className="text-lg font-medium max-w-md mx-auto">
            Easily find out the safety rating of each ingredients present in
            your supplements with the help of AI.
          </p>
          <div>
            <Image
              alt=""
              src={"/assets/images/appmockup.png"}
              height={600}
              width={1200}
              className="max-w-[800px] mx-auto drop-shadow-2xl drop-shadow-[#49FF92]"
            />
          </div>
          <div className="flex justify-center items-center relative z-10 gap-3">
            <GetItOnAppleStore />
            <GetItOnGooglePlay />
          </div>
        </main>
        <footer className="py-8 border-t border-gray-200 mt-20 flex justify-between items-start">
          <div className="space-y-1">
            <p className="font-semibold">Hygia Lens</p>
            <p className="text-gray-600 font-medium">
              Copyright &copy; {new Date().getFullYear()} | All rights reserved
            </p>
          </div>
          <div>
            <p className="font-semibold ">Company</p>
            <ul className="space-y-1 mt-1.5 font-medium text-gray-600">
              <li className="text-sm">
                <a href="#">About</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold ">Legals</p>
            <ul className="space-y-1 mt-1.5 font-medium text-gray-600">
              <li className="text-sm">
                <a href="#">Privacy</a>
              </li>
              <li className="text-sm">
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}
