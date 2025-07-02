import React from "react";
import { Layout } from "../layout";
import SectionHeader from "../common/header";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Megaphone, SearchCheck, ShieldCheck } from "lucide-react";

const CoreValue = () => {
  return (
    <Layout id="core">
      <SectionHeader acronym="100% Independent">
        <SectionHeader.Title>Our core value</SectionHeader.Title>
        <SectionHeader.Subtitle>
          Our mission is to empower individuals to make informed, healthier
          decisions. Through this, we also encourage brands to improve the
          quality of their products.
        </SectionHeader.Subtitle>
      </SectionHeader>
      <div className="grid grid-cols-1 min-[950px]:grid-cols-3 gap-6">
        <Card className="relative bg-[#c5e5fe] border-none">
          <div className="bg-white absolute -top-4 p-2 -left-4 rounded-full shadow-sm border">
            <Megaphone size={28} />
          </div>
          <CardHeader>No advertisements</CardHeader>
          <CardContent>
            We operate with a strict no-advertising policy. Companies cannot pay
            us to promote their products.
          </CardContent>
        </Card>
        <Card className="relative bg-[#d6fad5] border-none">
          <div className="bg-white absolute -top-4 p-2 -left-4 rounded-full shadow-sm border">
            <SearchCheck size={28} />
          </div>
          <CardHeader>Unbiased evaluations</CardHeader>
          <CardContent>
            Our scores and recommendations are created with complete autonomy,
            free from any external pressure or brand involvement.
          </CardContent>
        </Card>
        <Card className="relative bg-[#fdfdc4] border-none">
          <div className="bg-white absolute -top-4 p-2 -left-4 rounded-full shadow-sm border">
            <ShieldCheck size={28} />
          </div>
          <CardHeader>Respect for your privacy</CardHeader>
          <CardContent>
            We never sell or share user data. All information remains private
            and is never used for marketing or commercial gain.
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CoreValue;
