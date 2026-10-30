import type { Metadata } from "next";
import { ConnectSection } from "@/components/sections/ConnectSection";

export const metadata: Metadata = {
  title: "Connect",
  description: "Initiate a conversation, social profiles and contact information for Mani Ratan Singh.",
};

export default function ConnectPage() {
  return <ConnectSection isStandalone={true} />;
}
