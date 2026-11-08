import type { Metadata } from "next";
import { WorkSection } from "@/components/sections/WorkSection";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Curated software systems, design themes, embedded electronics, and prototypes by Mani Ratan Singh.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <WorkSection isStandalone={true} />;
}
