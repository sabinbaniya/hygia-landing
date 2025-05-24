import { GetItOnAppleStore } from "@/components/svg/get-it-on-apple-store";
import { GetItOnGooglePlay } from "@/components/svg/get-it-on-google-play";
import { PrimaryFont } from "@/lib/fonts/primary";
import Image from "next/image";
import { UpcomingFeaturesDialog } from "./_components/upcoming-features-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NewsletterSubscribe } from "./_components/newsletter-subscribe";

const FAQS = [
  {
    q: "What is hygia?",
    a: "Hygia is an AI powered app that helps you easily find out safety rating of all the ingredients present in your supplements",
  },
  {
    q: "Do I need a subscription?",
    a: "No, Hygia is a free app",
  },
  {
    q: "How accurate is hygia's information?",
    a: "Hygia uses AI to analyze the ingredients and provide accurate information",
  },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#49FF92] to-[#67faa2]">
      <nav className="flex justify-between items-center gap-8 px-4 sm:px-8">
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
      <div className="bg-white rounded-t-3xl sm:rounded-t-4xl p-4 sm:p-8 pb-0">
        <main className="space-y-4 sm:space-y-5">
          <h1
            className={`${PrimaryFont.className} text-center font-bold text-5xl lg:text-7xl pt-12 bg-gradient-to-br from-black to-black/70 text-transparent bg-clip-text`}
          >
            Hygia - know your supplements
          </h1>
          <p className="md:text-lg text-center font-medium max-w-md mx-auto">
            Easily find out the safety rating of each ingredients present in
            your supplements with the help of AI.
          </p>
          <div className="text-center">
            <UpcomingFeaturesDialog />
          </div>
          <div>
            <Image
              alt=""
              src="/assets/images/appmockup.png"
              width={1200}
              height={600}
              className="w-full max-w-3xl h-auto mx-auto drop-shadow-2xl drop-shadow-[#49FF9280]"
            />
          </div>
          <div className="pt-2 flex gap-4 sm:flex-row justify-center items-center relative z-10">
            <GetItOnAppleStore />
            <GetItOnGooglePlay />
          </div>
          <div className="mt-5 sm:mt-6">
            <div>
              <p
                className={`${PrimaryFont.className} font-bold text-center text-3xl lg:text-5xl pt-12 bg-gradient-to-br from-black to-black/70 text-transparent bg-clip-text`}
              >
                Frequently Asked Questions
              </p>
            </div>
            <div className="mt-4 sm:mt-6 max-w-2xl mx-auto border-b">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq) => {
                  return (
                    <AccordionItem key={faq.q} value={faq.q}>
                      <AccordionTrigger>{faq.q}</AccordionTrigger>
                      <AccordionContent>{faq.a}</AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
          <div className="mt-5 sm:mt-8">
            <NewsletterSubscribe />
          </div>
        </main>
        <footer className="py-8 border-t border-gray-200 mt-8 sm:mt-16 flex flex-col sm:flex-row text-center items-center sm:text-left sm:justify-between sm:items-start gap-4 sm:gap-6">
          <div className="space-y-1">
            <p className="font-semibold">Hygia Lens</p>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
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
