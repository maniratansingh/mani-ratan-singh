/**
 * =========================================================================
 * MANI RATAN SINGH — PRIVATE INFRASTRUCTURE & SUBDOMAIN VAULT
 * =========================================================================
 *
 * The link list is encrypted at rest (AES-256-GCM, PBKDF2-SHA256 key
 * derivation). It is decrypted in the browser after the passcode is entered,
 * so subdomains and service URLs never appear in the shipped JavaScript.
 *
 * The passcode cannot be recovered, and the source JSON is intentionally
 * git-ignored. To change the vault:
 *   1. create scripts/vault-data.json with the updated link array
 *   2. node scripts/vault-crypto.mjs encrypt '<passcode>' scripts/vault-data.json
 *   3. paste the printed values into VAULT_CONFIG.crypto below
 *   4. delete scripts/vault-data.json
 *
 * Note: this is client-side obfuscation with a shared passcode, not a
 * substitute for real authentication. Do not place secrets here.
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
  title: "Private Infrastructure Vault",
  subtitle: "Internal subdomains, homelab nodes, and direct service endpoints.",
  disclaimer: "Restricted gateway for owner services, private nodes, and internal lab environments.",
  crypto: {
    iterations: 210000,
    salt: "YBmTW+TJPUT7ze6kbhMvyQ==",
    iv: "IjEcl5yg4HxcxRIa",
    ciphertext:
      "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",
  },
} as const;
