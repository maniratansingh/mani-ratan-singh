import type { Metadata } from "next";
import { VaultPortal } from "@/components/vault/VaultPortal";

export const metadata: Metadata = {
  title: "Infrastructure Vault",
  description: "Private homelab infrastructure, subdomains, and internal nodes.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function VaultPage() {
  return <VaultPortal />;
}
