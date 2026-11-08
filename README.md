# Mani Ratan Pratap Singh (MRPS)

<div align="center">

```
  __  __ _____  _____   _____ 
 |  \/  |  __ \|  __ \ / ____|
 | \  / | |__) | |__) | (___  
 | |\/| |  _  /|  ___/ \___ \ 
 | |  | | | \ \| |     ____) |
 |_|  |_|_|  \_\_|    |_____/ 
```

**Personal Digital Presence, Engineering Workbench & Visual Monograph**

*"My Simplicity Is My Identity"*

[![Production Status](https://img.shields.io/badge/Production-Live-emerald?style=flat-square&logo=cloudflare)](https://maniratansingh.com)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.3-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?style=flat-square&logo=three.js)](https://threejs.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.3-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Cloudflare Workers](https://img.shields.io/badge/Deploy-Cloudflare_Static_Assets-F38020?style=flat-square&logo=cloudflare)](https://workers.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[🌐 Live Site](https://maniratansingh.com) • [🔬 Technical Lab (mrps.in)](https://mrps.in) • [📝 Dispatches](https://mrps.in/blog/) • [📷 Photo Archive](https://mrps.in/photos/) • [🔐 Private Vault](https://maniratansingh.com/vault)

</div>

---

## 🏛️ Overview

This repository houses the source code for the personal digital presence, design engineering showcase, and photographic monograph of **Mani Ratan Pratap Singh (MRPS)**.

Built with a commitment to **out-of-distribution craft**, it rejects generic template grids in favor of an asymmetrical luxury editorial layout, tactile Swiss typography, VisionOS-inspired Liquid Glass optical materials, and real-time GPU-accelerated WebGL caustics.

### Key Pillars

1. **Authentic Liquid Glass Materiality**: Multi-stop radial specular sheens, dual-lobe crescent rim lighting (`--lg-rim`), and optical refraction derived directly from authentic Apple VisionOS and `jellyfin-liquid-glass` specifications.
2. **Interactive 3D WebGL Monolith**: Real-time procedural Torus Knot with physical momentum inertia, 3 optical shader modes (Wireframe Lattice, Prism Caustics, Obsidian Glass), and zero-friction mobile touch physics.
3. **Photographic Monograph**: High-fidelity plates captured with nocturnal long-exposure techniques, featuring comprehensive EXIF metadata, swipe-gesture lightbox navigation, and mobile safe-area accommodation.
4. **Engineering Workbench**: Curated real-world systems, including rural public healthcare digital infrastructure in Purvanchal (India) and browser-based Web Audio turntable synthesis.
5. **Encrypted Node Vault**: Client-side AES-256-GCM gateway (`/vault`). The subdomain list is stored as ciphertext (PBKDF2-SHA256 key derivation) and is only decrypted in the browser after the passcode is entered.
6. **Machine-First Directives**: Native `llms.txt`, `llms-full.txt`, and Schema.org `@graph` metadata for autonomous AI agents and modern search engine indexing.

---

## ⚡ Performance & Engineering Architecture

```
                    ┌───────────────────────────────┐
                    │     Cloudflare Edge CDN       │
                    │   Global Anycast Network      │
                    └──────────────┬────────────────┘
                                   │
                    ┌──────────────▼────────────────┐
                    │   Next.js 16 Static Export    │
                    │        (HTML/CSS/JS)          │
                    └───────┬──────────────┬────────┘
                            │              │
             ┌──────────────▼────┐   ┌─────▼─────────────┐
             │ Three.js WebGL    │   │ Liquid Glass CSS  │
             │ - ACES Filmic     │   │ - 120 FPS Bypass  │
             │ - Torus Knot      │   │ - Dual-Lobe Rim   │
             │ - Dynamic Shaders │   │ - Micro-Grain     │
             └───────────────────┘   └───────────────────┘
```

- **Sub-Second Edge Delivery**: Compiled via Next.js `output: 'export'` into pure static files uploaded to Cloudflare Workers Static Assets (`wrangler.jsonc`), delivering `< 400ms` response times globally.
- **120 FPS Cursor Tracking**: Card spotlights and crystal rim highlights run directly via CSS custom properties (`--card-x`, `--card-y`), completely bypassing the React virtual DOM diffing cycle for buttery smooth tracking.
- **Off-Screen WebGL Culling**: A dedicated `IntersectionObserver` halts Three.js animation loops when the 3D sculpture scrolls out of the viewport, reducing idle GPU consumption to 0%.
- **Zero Scroll-Trapping on Touch**: The WebGL canvas enforces `touch-action: pan-y`, allowing mobile users to swipe vertically across the 3D centerpiece without being trapped.
- **Hardware-Composited Wallpaper**: Fixed atmospheric background gradients are isolated into an independent GPU compositing layer via `body::before` with `transform: translateZ(0)`.
- **WCAG AA Compliance**: 44×44px touch targets on mobile, high-contrast typography (≥ 4.5:1 ratio), focus-visible keyboard outlines, and native support for `prefers-reduced-motion`.

---

## 💎 The Liquid Glass Design System

The visual language is defined in `styles/tokens.css` and `styles/glass.css`:

```css
/* Authentic Dual-Lobe Crescent Rim Highlight */
--lg-rim:
  inset 1.5px 0.75px 0 -0.5px rgba(255, 255, 255, 0.75),
  inset -1.5px -0.75px 0 -0.5px rgba(255, 255, 255, 0.45),
  inset 0 0 0 0.5px rgba(255, 255, 255, 0.20),
  inset 0 0 0 1.5px rgba(6, 7, 10, 0.06);

/* Optical Frost & Saturation Tier */
--lg-frost-panel: blur(14px) saturate(1.45) brightness(104%);
--lg-tint-panel: rgba(26, 26, 32, 0.42);
```

### 3D Sculpture Modes
| Mode | Appearance | Optical Characteristics |
| :--- | :--- | :--- |
| **Wireframe Lattice** | Cybernetic Neon Cyan | Emissive wireframe pulse with champagne orbital halo |
| **Prism Caustics** | Alabaster & Crystal | High dispersion (0.15) with chromatic refraction |
| **Obsidian Glass** | Dark Velvet Obsidian | Deep attenuation tint with metallic rim reflection |

---

## 📂 Project Structure

```
.
├── app/                              # Next.js 16 App Router
│   ├── about/page.tsx                # Biography & learning journey
│   ├── connect/page.tsx              # Endpoints & direct communication
│   ├── vault/page.tsx                # Password-gated private node vault
│   ├── work/page.tsx                 # Engineering workbench & case studies
│   ├── globals.css                   # Tailwind v4, wallpaper, and typography
│   ├── layout.tsx                    # Root HTML layout & Schema.org JSON-LD
│   ├── icon.svg                      # Favicon monogram
│   ├── apple-icon.png                # iOS home-screen icon
│   ├── page.tsx                      # Single-page editorial monograph
│   ├── robots.ts                     # AI agent permissions & crawler rules
│   └── sitemap.ts                    # Canonical sitemap generator
├── components/
│   ├── animations/                   # Tactile spring physics configurations
│   ├── glass/                        # Liquid Glass cards, pills & atmosphere
│   ├── hero/                         # Hero typography & WebGL container
│   ├── navigation/                   # Desktop capsule navbar & mobile drawer
│   ├── sculpture/                    # Three.js procedural glass sculpture
│   ├── sections/                     # About, Work, Photo, Connect, and Modals
│   ├── theme/                        # ThemeProvider & tactile ThemeToggle
│   └── vault/                        # VaultPortal client authentication
├── config/
│   ├── content.ts                    # Editorial copy & monograph photo data
│   ├── projects.ts                   # Structured engineering ledger
│   ├── site.ts                       # Metadata, navigation & canonical links
│   └── vault.ts                      # AES-256-GCM encrypted homelab vault payload
├── public/
│   ├── _headers                      # Cloudflare Edge cache & security headers
│   ├── author-*.webp                 # Responsive author portrait variants
│   ├── og.jpg                        # 1200×630 social sharing card
│   ├── llms.txt                      # High-density markdown for AI agents
│   ├── llms-full.txt                 # Complete machine context archive
│   └── photography/                  # Responsive WebP photographic plates
├── scripts/
│   └── vault-crypto.mjs              # Encrypt/decrypt the vault link list
├── styles/
│   ├── glass.css                     # Liquid Glass surface & pill classes
│   ├── motion.css                    # Fluid spring keyframe animations
│   └── tokens.css                    # Color tokens, rims, and glass tiers
├── next.config.ts                    # Next.js static export ('output: export')
├── package.json                      # Dependencies & deploy scripts
├── tsconfig.json                     # Strict TypeScript configuration
└── wrangler.jsonc                    # Cloudflare Workers Static Assets config
```

---

## 🛠️ Getting Started Locally

### Prerequisites

- **Node.js**: `v22.0.0+` (verified in `.nvmrc` and `.node-version`)
- **npm**: `v10.0.0+`

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/maniratansingh/mani-ratan-singh.git
cd mani-ratan-singh

# 2. Install dependencies
npm clean-install

# 3. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🚀 Building & Deployment

### Production Static Export

```bash
npm run build
```

Compiles the application into `./out` with fully prerendered static HTML, versioned CSS/JS bundles, and optimized media assets.

### Deploying to Cloudflare Workers (Static Assets)

The project includes a native [`wrangler.jsonc`](wrangler.jsonc) configured for Cloudflare Workers Static Assets:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "mani-ratan-singh",
  "compatibility_date": "2026-11-02",
  "assets": {
    "directory": "./out",
    "not_found_handling": "404-page",
    "html_handling": "auto-trailing-slash"
  }
}
```

Deploy directly via CLI:
```bash
npm run deploy
# or
npx wrangler deploy
```

Preview the exported site exactly as it will be served:
```bash
npm run build
npm start        # serves ./out on http://localhost:3000
```

### Continuous Deployment

`.github/workflows/deploy.yml` builds on every push and pull request, then deploys to Cloudflare Workers on `main` using `cloudflare/wrangler-action`. Add the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets to enable the deploy job.

### Updating the Vault

The vault link list is encrypted before it is committed:

```bash
# 1. Write the plaintext link array locally (git-ignored)
#    scripts/vault-data.json
# 2. Re-encrypt and regenerate config/vault.ts
node scripts/vault-crypto.mjs encrypt '<passcode>' scripts/vault-data.json
# 3. Delete the plaintext source
rm scripts/vault-data.json
```

Client-side encryption keeps subdomains out of the shipped JavaScript bundle, but it is not a replacement for real authentication — never store secrets in the payload.

---

## 🕵️ Automated Testing with Obscura

This repository includes verification testing using **[Obscura](https://github.com/h4ckf0r0day/obscura)**, a lightweight Rust + V8 headless browser engine.

To run the automated multi-agent audit suite:

```bash
# Run multi-device & route verification suite
python3 .agent/scripts/obscura_agent_suite.py  # or local scratch script

# Quick URL fetch & DOM inspection
obscura fetch https://maniratansingh.com --dump links

# Take a pixel-perfect headless screenshot
obscura fetch https://maniratansingh.com -s screenshot.png
```

---

## 🔒 Security & Edge Headers

All deployments serve strict security headers configured in `public/_headers`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- 1-Year Immutable Caching for `/_next/static/*`
- 30-Day Stale-While-Revalidate Caching for photographic plates

---

## 👤 Author & Colophon

- **Author**: Mani Ratan Pratap Singh (MRPS)
- **Identity**: Systems Builder, Creative Technologist & Photographer
- **Location**: Purvanchal · India
- **Primary Technical Hub**: [mrps.in](https://mrps.in)
- **Instagram**: [@maniratanpratapsingh](https://www.instagram.com/maniratanpratapsingh/)
- **GitHub**: [@maniratansingh](https://github.com/maniratansingh)
- **Direct Line**: [email@mrps.in](mailto:email@mrps.in)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
Feel free to explore, learn from, and adapt the engineering and design patterns.
