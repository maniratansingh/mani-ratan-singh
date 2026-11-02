# Mani Ratan Pratap Singh — Personal Digital Presence & Workbench

> *"My Simplicity Is My Identity"*

A high-craft personal digital presence, engineering workbench, and photographic monograph for **Mani Ratan Pratap Singh (MRPS)**. Engineered with authentic Liquid Glass materials, real-time procedural WebGL optics, and sub-second edge performance.

---

## Technical Architecture & Performance

- **Framework**: Next.js 16 (App Router) + React 19 (Server Components & Static Optimization)
- **Styling**: Tailwind CSS v4 + Liquid Glass Material Tokens (`styles/tokens.css`, `styles/glass.css`)
- **3D Graphics & Shaders**: Three.js WebGL procedural Torus Knot with interactive physical inertia and real-time studio refraction
- **Performance Optimizations**:
  - **Zero-Re-render Cursor Tracking**: Card spotlights and crystal rim highlights run directly on CSS custom properties (`--card-x`, `--card-y`), bypassing React virtual DOM diffing for solid 120 FPS tracking.
  - **Off-Screen WebGL Culling**: `IntersectionObserver` halts Three.js rendering loops when the user scrolls past the Hero, freeing 100% of GPU resources.
  - **Hardware Compositor Wallpaper**: Ambient gradients are decoupled from scroll-paint cycles via `body::before` with `transform: translateZ(0)`.
  - **Optimized Photographic Plates**: High-fidelity optical assets compressed with perceptual quantization for sub-second loading.
  - **Edge-Ready Static Export**: Pre-rendered to pure HTML/CSS/JS (`output: 'export'`) in `out/` with zero serverless cold starts.
- **Machine & LLM Directives**:
  - Full support for `llms.txt` and `llms-full.txt` standard.
  - Rich JSON-LD `@graph` schema (`Person`, `WebSite`, `ItemList`).
  - Open AI crawler directives in `robots.txt` (`GPTBot`, `ClaudeBot`, `PerplexityBot`).
- **Internal Homelab Node Vault**:
  - Password-gated gateway (`/vault`) for internal homelab subdomains (Jellyfin, TrueNAS, Mac AI cluster).
  - Isolated from search crawlers (`robots: { index: false, follow: false }`).

---

## Getting Started Locally

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- npm 10+

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/maniratansingh/mani-ratan-singh.git
cd mani-ratan-singh

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Static Production Build

```bash
# Build production static export
npm run build
```

This compiles all routes into the `out/` directory, ready to deploy to any edge network or static host.

---

## Cloudflare Pages Deployment

This project is configured out-of-the-box for **Cloudflare Pages**.

### Option 1: Native Git Integration (Recommended — 2 Minutes)

1. Push your repository to **GitHub**:
   ```bash
   git remote add origin https://github.com/maniratansingh/mani-ratan-singh.git
   git branch -M main
   git push -u origin main
   ```
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/):
   - Navigate to **Compute (Workers) > Workers & Pages > Create > Pages > Connect to Git**.
   - Select your repository (`mani-ratan-singh`).
3. Set the build configuration:
   - **Framework preset**: `None` (or `Next.js (Static HTML Export)`)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/`
4. Under **Environment variables**, set:
   - `NODE_VERSION`: `20` (already mirrored in `.nvmrc`)
5. Click **Save and Deploy**.

Cloudflare Pages will automatically build and deploy every commit pushed to `main` with edge caching and SSL across 330+ cities worldwide.

### Option 2: Automated GitHub Actions CI/CD

A pre-configured GitHub Actions workflow is included at `.github/workflows/deploy.yml`.

1. In your GitHub repository settings, go to **Settings > Secrets and variables > Actions**.
2. Add the following repository secrets:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Pages edit permissions.
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID (found on your dashboard).
3. Every push to `main` will automatically build, verify, and deploy directly to Cloudflare Pages.

---

## Project Structure

```
├── app/                      # Next.js App Router pages & metadata
│   ├── layout.tsx            # Global HTML layout & Schema.org JSON-LD
│   ├── page.tsx              # Single-page editorial homepage
│   ├── globals.css           # Typography, compositor wallpaper & visibility
│   ├── robots.ts             # Crawler directives & AI agent permissions
│   ├── sitemap.ts            # Canonical sitemap generator
│   └── vault/page.tsx        # Password-gated private node vault
├── components/
│   ├── glass/                # Liquid glass cards & ambient atmosphere
│   ├── hero/                 # Hero section & fallback skeleton
│   ├── navigation/           # Glass navbar & mobile drawer
│   ├── sculpture/            # Three.js procedural glass sculpture
│   ├── sections/             # About, Photography, Work, and Connect
│   └── vault/                # Private vault passcode portal
├── config/
│   ├── content.ts            # Core copy, story, and social endpoints
│   ├── projects.ts           # Modular project registry (easy additions)
│   ├── site.ts               # Site metadata & canonical URLs
│   └── vault.ts              # Homelab subdomains & passcode configuration
├── public/
│   ├── _headers              # Cloudflare Pages edge cache & security headers
│   ├── author.png            # Retina square portrait plate
│   ├── llms.txt              # High-density markdown for AI crawlers
│   ├── llms-full.txt         # Full context machine archive
│   └── photography/          # Monograph photographic plates (compressed)
├── .github/workflows/        # Automated Cloudflare Pages deployment workflow
├── .nvmrc                    # Node.js 20 LTS version pin
└── next.config.ts            # Static export configuration
```

---

## License

Personal presence and open engineering experiments. Created by **Mani Ratan Pratap Singh**.
