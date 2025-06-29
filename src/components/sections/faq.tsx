"use client";

import React, { useState } from "react";
import SectionHeader from "../common/header";
import { faqCategories, faqData } from "./data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Layout } from "../layout";

const FaqSection = () => {
  const [activeCategory, setActiveCategory] = useState("General");

  return (
    <Layout>
      <SectionHeader acronym="FAQ's">
        <SectionHeader.Title>Frequently Asked Questions</SectionHeader.Title>
        <SectionHeader.Subtitle>
          Here are some of the most frequently asked questions about our
          services.
        </SectionHeader.Subtitle>
      </SectionHeader>
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {faqCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData[activeCategory as keyof typeof faqData]?.map(
              (faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg px-6 py-2"
                >
                  <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline py-4">
                    <span className="pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default FaqSection;
