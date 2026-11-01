import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "About Mani Ratan Singh — a curious learner, tinkerer, and photographer exploring hardware, clean code, and quiet simplicity.",
};

export default function AboutPage() {
  return <AboutSection isStandalone={true} />;
}
