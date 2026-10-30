import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description: "Personal story, identity, design philosophy and principles of Mani Ratan Singh.",
};

export default function AboutPage() {
  return <AboutSection isStandalone={true} />;
}
