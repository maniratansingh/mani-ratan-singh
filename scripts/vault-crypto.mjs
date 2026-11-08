#!/usr/bin/env node
/**
 * Vault crypto helper.
 *
 * The vault page is a static export, so the decrypted link list can only ever
 * be produced in the browser. This script encrypts the source list with
 * AES-256-GCM using a PBKDF2-derived key and writes the ciphertext into
 * `config/vault.ts`.
 *
 * Usage:
 *   node scripts/vault-crypto.mjs encrypt <passcode> <source.json>
 *   node scripts/vault-crypto.mjs decrypt <passcode> <ciphertext-b64> <salt-b64> <iv-b64>
 *
 * `source.json` is git-ignored on purpose: only the ciphertext may be
 * committed, otherwise the encryption provides no benefit.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { webcrypto as crypto } from "node:crypto";
import { resolve } from "node:path";

const ITERATIONS = 210_000;
const KEY_LENGTH = 256;

const toBase64 = (bytes) => Buffer.from(bytes).toString("base64");
const fromBase64 = (value) => new Uint8Array(Buffer.from(value, "base64"));

async function deriveKey(passcode, salt, usages) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passcode),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: KEY_LENGTH },
    false,
    usages
  );
}

async function encrypt(passcode, sourcePath) {
  const links = JSON.parse(readFileSync(sourcePath, "utf8"));
  if (!Array.isArray(links) || links.length === 0) {
    throw new Error("Source file must contain a non-empty JSON array.");
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passcode, salt, ["encrypt"]);
  const plaintext = new TextEncoder().encode(JSON.stringify(links));
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);

  const output = {
    iterations: ITERATIONS,
    salt: toBase64(salt),
    iv: toBase64(iv),
    ciphertext: toBase64(new Uint8Array(ciphertext)),
  };

  console.log(JSON.stringify(output, null, 2));
  return output;
}

async function decrypt(passcode, ciphertextB64, saltB64, ivB64) {
  const key = await deriveKey(passcode, fromBase64(saltB64), ["decrypt"]);
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(ivB64) },
    key,
    fromBase64(ciphertextB64)
  );
  return JSON.parse(new TextDecoder().decode(plaintext));
}

const [command, ...args] = process.argv.slice(2);

if (command === "encrypt") {
  const [passcode, sourcePath] = args;
  if (!passcode || !sourcePath) {
    console.error("Usage: node scripts/vault-crypto.mjs encrypt <passcode> <source.json>");
    process.exit(1);
  }

  encrypt(passcode, resolve(sourcePath))
    .then((result) => {
      const template = `/**
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
    iterations: ${result.iterations},
    salt: "${result.salt}",
    iv: "${result.iv}",
    ciphertext:
      "${result.ciphertext}",
  },
} as const;
`;

      writeFileSync(resolve("config/vault.ts"), template);
      console.log("\nWrote config/vault.ts");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
} else if (command === "decrypt") {
  const [passcode, ciphertext, salt, iv] = args;
  if (!passcode || !ciphertext || !salt || !iv) {
    console.error(
      "Usage: node scripts/vault-crypto.mjs decrypt <passcode> <ciphertext-b64> <salt-b64> <iv-b64>"
    );
    process.exit(1);
  }

  decrypt(passcode, ciphertext, salt, iv)
    .then((links) => console.log(JSON.stringify(links, null, 2)))
    .catch((error) => {
      console.error("Decryption failed:", error.message);
      process.exit(1);
    });
} else {
  console.error("Unknown command. Use `encrypt` or `decrypt`.");
  process.exit(1);
}
