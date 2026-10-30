# Design System: Liquid Glass & Luxury Editorial

<!-- impeccable:design-schema 1 -->

## Design Direction & Materiality
Inspired by Apple Liquid Glass (VisionOS / macOS Sequoia), luxury Swiss editorial typography, and optical physics.

## Palette & Surface Strategy
- **Canvas (Light-First Default):** `#F6F6F4` (warm bone-white / alabaster).
- **Canvas (Dark Secondary):** `#0F1013` (deep obsidian).
- **Ink / Primary Text:** `#18191B` (light mode) / `#F4F5F7` (dark mode).
- **Secondary Text:** `#52565E` (light mode) / `#9FA4AF` (dark mode).
- **Accents:**
  - Champagne: `#C8B99D` (refined warm luxury accent).
  - Silver / Opal: `#A8B2C1` (cool specular rim).

## Liquid Glass Physical Layers
1. **Light Transmission Gradient:** `linear-gradient(135deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0.18) 100%)`.
2. **VisionOS Saturation Boost:** `backdrop-filter: blur(32px) saturate(200%) brightness(103%)`.
3. **Beveled Specular Rims:** Inset top highlight `inset 0 1.5px 1.5px 0 rgba(255,255,255,1)` + bottom counter-bevel `inset 0 -1.5px 1px 0 rgba(0,0,0,0.04)`.
4. **Specular Edge Glint:** Hairline reflection on top and left perimeter using `::before` and `::after`.
5. **Atmospheric Backdrop:** Ambient floating luminous orbs behind the glass so optical blur refacts living color fields.

## Typographic Hierarchy
- **Display Hero:** Large light-weight uppercase sans (`font-light uppercase tracking-[-0.03em]`).
- **Signature Statement:** Editorial serif italic (`font-serif italic text-accent-champagne`).
- **Headings:** Bold architectural titles carrying their own weight without kickers or eyebrow tags.
- **Body:** Refined neutral sans with 65–70ch line measure (`leading-relaxed text-secondary`).

## Motion Thesis
- **One Authored Focal Moment:** The interactive 3D Torus Knot glass sculpture with real-time chromatic dispersion, caustics, and physical inertia on drag.
- **Continuity:** Liquid glass navigation capsule with spring-based active tab indicator (`layoutId="activeNav"`).
- **Tactile Feedback:** Real-time specular spotlight tracking the cursor across glass surfaces.
- **Reduced Motion:** Automatic fallback to calm states when `prefers-reduced-motion` is active.
