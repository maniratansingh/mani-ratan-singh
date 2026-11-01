/**
 * =========================================================================
 * MANI RATAN SINGH — PRIVATE INFRASTRUCTURE & SUBDOMAIN VAULT
 * =========================================================================
 * 
 * HOW TO CONFIGURE:
 * 1. Change `VAULT_PASSWORD` below to your desired passcode.
 * 2. Add or edit your private subdomains and services in `vaultLinks`.
 * 3. Save this file — changes take effect immediately!
 */

export interface VaultLink {
  id: string;
  name: string;
  subdomain: string;
  url: string;
  category: "Media" | "Compute" | "Storage" | "Networking" | "Experiments" | "Admin";
  description: string;
  status: "Online" | "Private Subnet" | "Tailscale Only" | "Auth Protected";
  port?: string;
  internalOnly?: boolean;
}

export const VAULT_CONFIG = {
  // SHA-256 hash of the vault passcode (passcode is never stored in plaintext in the client bundle)
  passwordHash: "6b325b90fa9708f30ae393616d62baa1a4c1508165379805808418011bbbd9b9",

  title: "Private Infrastructure Vault",
  subtitle: "Internal subdomains, homelab nodes, and direct service endpoints.",
  disclaimer: "Restricted gateway for owner services, private nodes, and internal lab environments.",
};

export const vaultLinks: VaultLink[] = [
  {
    id: "jellyfin-node",
    name: "Jellyfin Media Server",
    subdomain: "jellyfin.mrps.in",
    url: "https://jellyfin.mrps.in",
    category: "Media",
    description: "4K HDR & HEVC 10-bit personal streaming node with custom Liquid Glass optical UI theme.",
    status: "Online",
    port: "8096",
  },
  {
    id: "truenas-core",
    name: "TrueNAS Core Storage",
    subdomain: "nas.mrps.in",
    url: "https://nas.mrps.in",
    category: "Storage",
    description: "ZFS redundant storage pool over 10GbE SFP+ optical fiber backbone.",
    status: "Private Subnet",
    port: "443",
  },
  {
    id: "ai-cluster",
    name: "Apple Silicon AI Cluster",
    subdomain: "cluster.mrps.in",
    url: "https://cluster.mrps.in",
    category: "Compute",
    description: "Thunderbolt 4 mesh cluster for distributed local LLM inference via Exo and Ollama.",
    status: "Tailscale Only",
    port: "11434",
  },
  {
    id: "telemetry-grafana",
    name: "Prometheus & Grafana Telemetry",
    subdomain: "status.mrps.in",
    url: "https://status.mrps.in",
    category: "Networking",
    description: "Real-time thermal monitoring, core frequencies, SFP+ interface throughput, and power telemetry.",
    status: "Online",
    port: "3000",
  },
  {
    id: "router-gateway",
    name: "10GbE Edge Gateway",
    subdomain: "gateway.mrps.in",
    url: "https://gateway.mrps.in",
    category: "Networking",
    description: "SFP+ fiber WAN routing, WireGuard mesh, and DNS sinkhole infrastructure.",
    status: "Private Subnet",
    port: "8443",
  },
  {
    id: "staging-workbench",
    name: "Engineering Staging & Experiments",
    subdomain: "lab.mrps.in",
    url: "https://lab.mrps.in",
    category: "Experiments",
    description: "Live staging builds, hardware schematics, and work-in-progress web applications.",
    status: "Auth Protected",
    port: "8080",
  },
];
