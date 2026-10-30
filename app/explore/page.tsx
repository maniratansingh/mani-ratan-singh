import type { Metadata } from "next";
import { WorldSection } from "@/components/sections/WorldSection";

export const metadata: Metadata = {
  title: "My World",
  description: "Curiosities, experiments, technology, hardware and creative explorations.",
};

export default function ExplorePage() {
  return <WorldSection isStandalone={true} />;
}
