# Design System: High-Contrast Luxury Editorial & Liquid Glass

<!-- impeccable:design-schema 1 -->

## Design Direction & Materiality
A high-contrast luxury editorial experience combining Swiss typographic discipline, Italian editorial serif contrast, and Apple Liquid Glass optical materiality. Eliminates generic card grids in favor of asymmetrical magazine monograph spreads, architectural ledgers, and interactive laboratory exhibits.

## Palette & Surface Strategy
- **Canvas (Light-First Default):** `#FAFAF7` (warm architectural fine-art alabaster).
- **Canvas (Dark Secondary):** `#08090C` (deep velvet obsidian).
- **Ink / Primary Text:** `#08080A` (ultra-sharp jet black in light) / `#F8F9FA` (pristine starlight in dark).
- **Secondary Text:** `#363A42` (deep legible charcoal in light) / `#A0A6B2` (muted silver in dark).
- **Tertiary Text:** `#6C727E` (architectural metadata & technical coordinate gray).
- **Accents:**
  - Champagne Gold: `#B89355` (deep warm Italian gold) / `#DFC085` (dark mode luminous gold).
  - Titanium Silver: `#6B7C93` (specular rim).

## Liquid Glass Physical Layers
1. **Light Transmission Gradient:** `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.52) 50%, rgba(255,255,255,0.32) 100%)`.
2. **VisionOS Saturation Boost:** `backdrop-filter: blur(32px) saturate(190%) brightness(102%)`.
3. **Beveled Specular Rims:** Inset top highlight `inset 0 1.5px 1.5px 0 rgba(255,255,255,0.95)` + bottom counter-bevel `inset 0 -1.5px 1px 0 rgba(0,0,0,0.04)`.
4. **Crisp Outer Hairline:** 1px border (`rgba(8, 8, 10, 0.08)` in light, `rgba(255, 255, 255, 0.14)` in dark) so edges are cleanly etched like cut crystal.
5. **Atmospheric Backdrop:** Ambient floating luminous orbs behind the glass (`components/glass/AmbientAtmosphere.tsx`).

## Typographic Hierarchy
- **Display Hero:** Large light-weight uppercase sans (`font-light uppercase tracking-[-0.04em]`).
- **Signature Statement:** Editorial serif italic (`font-serif italic text-accent-champagne`).
- **Headings:** Architectural titles carrying their own weight without kickers or eyebrow tags.
- **Monograph Meta:** `font-mono` with tabular numerals for coordinates, EXIF data, and status logs.
- **Body:** Refined neutral sans with 65–70ch line measure (`leading-relaxed text-secondary`).

## Layout Patterns
- **No Generic Card Grids:** Abolished equal-size boxed cards. Replaced with:
  - Museum monograph photography salon with real photographic plates and EXIF metadata.
  - Architectural living parameter specification sheets.
  - Interactive live theme switcher for Jellyfin Liquid Glass.
  - Editorial table-of-contents journal index for blog dispatches linking directly to `mrps.in`.

## Motion & Sensory Thesis
- **3D Inertia Sculpture:** Torus Knot with real-time chromatic dispersion, caustics, and physical inertia on drag.
- **Procedural Audio Synth:** Optional ambient harmonic sine drone (110Hz A2) synthesizing relaxing frequencies on user interaction in the caustics lab.
- **Continuity:** Liquid glass navigation capsule with spring-based active tab indicator (`layoutId="activeNav"`).
- **Reduced Motion:** Automatic fallback to calm states when `prefers-reduced-motion` is active.
