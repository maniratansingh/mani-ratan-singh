import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { WorldSection } from "@/components/sections/WorldSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ConnectSection } from "@/components/sections/ConnectSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="relative flex flex-col gap-12 sm:gap-16">
        <AboutSection />
        <WorldSection />
        <WorkSection />
        <ConnectSection />
      </div>
    </>
  );
}
