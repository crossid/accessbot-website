import type { MetaFunction } from "@remix-run/node";
import { CallToAction } from "~/components/CallToAction";
import { Faqs } from "~/components/Faqs";
import { Hero } from "~/components/Hero";
import { Pricing } from "~/components/Pricing";
import { PrimaryFeatures } from "~/components/PrimaryFeatures";
import { SecondaryFeatures } from "~/components/SecondaryFeatures";
import { StartNow } from "~/components/StartNow";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        {/* Testimonials */}
        <Pricing />
        <StartNow />
        <Faqs />
      </main>
    </div>
  );
}
