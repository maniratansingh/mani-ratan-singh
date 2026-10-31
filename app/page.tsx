import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { PhotographySection } from "@/components/sections/PhotographySection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ConnectSection } from "@/components/sections/ConnectSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="relative flex flex-col">
        <AboutSection />
        <PhotographySection />
        <WorkSection />
        <ConnectSection />
      </div>
    </>
  );
}
