"use client";

import * as React from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  ExternalLink,
  Copy,
  Check,
  Server,
  Terminal,
  ShieldAlert,
  Search,
  ArrowLeft,
  PlusCircle,
  ShieldQuestion,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VAULT_CONFIG, VaultLink } from "@/config/vault";
import { InteractiveGlassCard } from "@/components/glass/InteractiveGlassCard";
import { snappySpring } from "@/components/animations/transitions";

const SESSION_KEY = "mrps_vault_key";

function base64ToBytes(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

async function deriveKey(passcode: string): Promise<CryptoKey> {
  const { iterations, salt } = VAULT_CONFIG.crypto;
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passcode),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: base64ToBytes(salt),
      iterations,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    // Extractable so the derived key (never the passcode) can be kept for the
    // browser session and reused to decrypt after a reload.
    true,
    ["decrypt"]
  );
}

async function decryptVault(key: CryptoKey): Promise<VaultLink[]> {
  const { iv, ciphertext } = VAULT_CONFIG.crypto;
  const plaintext = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToBytes(iv) },
    key,
    base64ToBytes(ciphertext)
  );

  const parsed: unknown = JSON.parse(new TextDecoder().decode(plaintext));
  if (!Array.isArray(parsed)) {
    throw new Error("Malformed vault payload.");
  }
  return parsed as VaultLink[];
}

export function VaultPortal() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [links, setLinks] = React.useState<VaultLink[]>([]);
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [unlocking, setUnlocking] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<string>("All");
  const copyTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore a previously unlocked session. Only the derived key is stored, so
  // the link list stays encrypted in sessionStorage as well.
  React.useEffect(() => {
    let cancelled = false;

    const restore = async () => {
      try {
        const stored = sessionStorage.getItem(SESSION_KEY);
        if (!stored) return;

        const key = await window.crypto.subtle.importKey(
          "raw",
          base64ToBytes(stored),
          "AES-GCM",
          true,
          ["decrypt"]
        );
        const decrypted = await decryptVault(key);

        if (!cancelled) {
          setLinks(decrypted);
          setIsAuthenticated(true);
        }
      } catch {
        // Key is stale or was tampered with; fall back to the lock screen.
        sessionStorage.removeItem(SESSION_KEY);
      }
    };

    void restore();
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    };
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || unlocking) return;

    setUnlocking(true);
    setError(null);

    try {
      const key = await deriveKey(password.trim());
      const decrypted = await decryptVault(key);
      const rawKey = await window.crypto.subtle.exportKey("raw", key);

      sessionStorage.setItem(SESSION_KEY, bytesToBase64(new Uint8Array(rawKey)));
      setLinks(decrypted);
      setIsAuthenticated(true);
      setPassword("");
    } catch {
      setError("Passcode mismatch: access to private nodes denied.");
    } finally {
      setUnlocking(false);
    }
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    setLinks([]);
    setPassword("");
    setError(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const copyToClipboard = async (link: VaultLink) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(link.url);
      setCopiedId(link.id);
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Clipboard permission denied — leave the "Copy URL" affordance intact.
    }
  };

  const categories = ["All", "Media", "Compute", "Storage", "Networking", "Experiments"];
  const query = search.trim().toLowerCase();

  const filteredLinks = links.filter((link) => {
    const matchesCat = category === "All" || link.category === category;
    const matchesSearch =
      !query ||
      link.name.toLowerCase().includes(query) ||
      link.subdomain.toLowerCase().includes(query) ||
      link.description.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="relative max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto px-4 sm:px-8 2xl:px-12 py-20 sm:py-28 2xl:py-36">
      {/* Top Breadcrumb & Return Link */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--glass-border)]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO PORTFOLIO</span>
        </Link>
        <span className="text-xs font-mono text-[var(--accent-champagne)] flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>NODE-01 / GATEWAY</span>
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* =========================================================
             LOCKED STATE: Password Entry Screen
             ========================================================= */
          <motion.div
            key="vault-locked"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={snappySpring}
            className="max-w-md mx-auto my-12"
          >
            <div className="p-6 sm:p-10 rounded-3xl liquid-glass-surface border border-[var(--glass-border)] shadow-2xl relative overflow-hidden">
              {/* Top ambient glint */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--glass-border-hover)] to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Security Icon */}
              <div className="w-14 h-14 rounded-2xl liquid-glass-pill flex items-center justify-center text-[var(--accent-champagne)] mb-6 mx-auto shadow-inner">
                <Lock className="w-6 h-6" />
              </div>

              <div className="text-center mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-1">
                  SECURITY SUBNET
                </span>
                <h1 className="text-2xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-2">
                  {VAULT_CONFIG.title}
                </h1>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {VAULT_CONFIG.disclaimer}
                </p>
              </div>

              <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                <div className="relative">
                  <label htmlFor="vault-passcode" className="sr-only">
                    Vault passcode
                  </label>
                  <input
                    id="vault-passcode"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter owner passcode..."
                    autoComplete="current-password"
                    autoFocus
                    className="w-full px-4 py-3.5 pr-11 rounded-xl bg-black/30 dark:bg-black/40 border border-[var(--glass-border)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] text-base sm:text-sm font-mono focus:outline-none focus:border-[var(--accent-champagne)] transition-colors min-h-[46px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors p-1 min-h-[32px] min-w-[32px] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg"
                    role="alert"
                  >
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={unlocking || !password.trim()}
                  className="w-full py-3.5 rounded-xl bg-[var(--text-primary)] text-[var(--canvas)] text-xs font-mono uppercase tracking-wider font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{unlocking ? "Decrypting Nodes..." : "Authenticate & Reveal Nodes"}</span>
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-[var(--glass-border)] text-center">
                <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
                  AES-256-GCM · PBKDF2-SHA256 · CLIENT-SIDE DECRYPTION
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================
             UNLOCKED STATE: Private Services & Subdomain Directory
             ========================================================= */
          <motion.div
            key="vault-unlocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Header & Status Bar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--glass-border)]">
              <div>
                <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-400 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="uppercase tracking-widest font-semibold">
                    ACCESS GRANTED · PRIVATE DIRECTORY
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-light text-[var(--text-primary)] uppercase tracking-tight">
                  Homelab Subdomain Vault
                </h1>
                <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl">
                  Active self-hosted endpoints, private tunnels, and internal management interfaces on{" "}
                  <code className="text-[var(--accent-champagne)]">*.mrps.in</code>.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleLock}
                  className="px-4 py-2.5 rounded-full liquid-glass-pill text-xs font-mono text-[var(--text-secondary)] hover:text-rose-400 border border-[var(--glass-border)] transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
                >
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lock Vault</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    aria-pressed={category === cat}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer shrink-0 min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)] ${
                      category === cat
                        ? "bg-[var(--text-primary)] text-[var(--canvas)] font-semibold shadow-xs"
                        : "liquid-glass-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[220px]">
                <label htmlFor="vault-search" className="sr-only">
                  Filter subdomains
                </label>
                <Search className="w-3.5 h-3.5 text-[var(--text-tertiary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="vault-search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter subdomains..."
                  className="w-full pl-9 pr-4 py-2 sm:py-1.5 rounded-full bg-black/20 dark:bg-black/30 border border-[var(--glass-border)] text-base sm:text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-champagne)] transition-colors min-h-[38px]"
                />
              </div>
            </div>

            {/* Services Grid */}
            {filteredLinks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLinks.map((node) => {
                  const isCopied = copiedId === node.id;

                  return (
                    <InteractiveGlassCard
                      key={node.id}
                      className="p-6 flex flex-col justify-between h-full group"
                    >
                      <div>
                        {/* Category & Status */}
                        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)] mb-3">
                          <span className="text-[var(--accent-champagne)] uppercase text-[10px] tracking-wider">
                            {node.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {node.status}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-light text-[var(--text-primary)] uppercase tracking-tight mb-2 group-hover:text-[var(--accent-champagne)] transition-colors">
                          {node.name}
                        </h2>

                        {/* Subdomain URL Badge */}
                        <div className="p-2.5 rounded-xl bg-black/25 dark:bg-black/40 border border-[var(--glass-border)] font-mono text-xs text-[var(--accent-champagne)] flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 truncate">
                            <Server className="w-3.5 h-3.5 shrink-0 opacity-70" />
                            <span className="truncate">{node.subdomain}</span>
                          </div>
                          {node.port && (
                            <span className="text-[10px] text-[var(--text-tertiary)] shrink-0 pl-2">
                              :{node.port}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                          {node.description}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(node)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer py-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy URL</span>
                            </>
                          )}
                        </button>

                        <a
                          href={node.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-pill text-xs font-mono text-[var(--accent-champagne)] hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
                        >
                          <span>Launch</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </InteractiveGlassCard>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center text-center gap-3 py-16 rounded-2xl border border-dashed border-[var(--glass-border)]">
                <ShieldQuestion className="w-8 h-8 text-[var(--text-tertiary)]" />
                <p className="text-sm text-[var(--text-primary)] font-medium">
                  No nodes match this filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="text-xs font-mono text-[var(--accent-champagne)] underline underline-offset-4 cursor-pointer rounded-full px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-champagne)]"
                >
                  Reset filters
                </button>
              </div>
            )}

            {/* Quick Helper for Owner */}
            <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface-muted)]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-3">
                <PlusCircle className="w-5 h-5 text-[var(--accent-champagne)] shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-[var(--text-primary)] block">
                    Need to add more private subdomains?
                  </span>
                  <span className="text-[var(--text-secondary)]">
                    Re-encrypt the link list with{" "}
                    <code className="text-[var(--accent-champagne)]">
                      scripts/vault-crypto.mjs
                    </code>{" "}
                    — only the ciphertext is committed.
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] whitespace-nowrap">
                PASSCODE PROTECTED · AES-256-GCM
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
