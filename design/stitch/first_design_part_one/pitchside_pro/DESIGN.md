# Design System Document

## 1. Overview & Creative North Star: "The Tactical Architect"

This design system is built to transform complex rugby analytics into a high-end, editorial management experience. The Creative North Star is **"The Tactical Architect"**—a visual language that balances the raw, physical energy of the pitch with the cold, calculated precision of a boardroom.

We move beyond the "spreadsheet" feel of traditional management sims by using **intentional asymmetry** and **tonal depth**. The layout should feel like a premium sports magazine met a high-tech scouting department. We challenge the rigid grid by allowing player imagery to break container boundaries and using high-contrast typography scales to guide the eye through dense data sets.

## 2. Colors & Surface Philosophy

The palette is rooted in the "Deep Stadium" aesthetic: a foundation of midnight neutrals, grass-stained greens, and prestigious gold accents.

### Surface Hierarchy & Nesting
We reject the flat UI. We treat the interface as a series of physical layers.
- **Base Layer:** `surface` (#131313) for the main application background.
- **Sectioning:** Use `surface_container_low` (#1c1b1b) for large layout blocks.
- **Data Containers:** Use `surface_container` (#201f1f) or `surface_container_high` (#2a2a2a) to draw focus to specific player stats or scouting reports.
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. If you need to separate a sidebar from a main feed, transition from `surface` to `surface_container_low`.

### The "Glass & Gradient" Rule
To elevate the "Professional" feel, use **Glassmorphism** for floating overlays (e.g., tactical popovers).
- **Glass Effect:** Apply `surface_variant` (#353534) at 60% opacity with a 20px backdrop-blur.
- **Signature Gradients:** For primary CTAs (e.g., "Submit Team Sheet"), use a linear gradient from `primary` (#95d4b3) to `primary_container` (#00452e) at a 135-degree angle. This adds "visual soul" that a flat fill cannot achieve.

## 3. Typography

The system utilizes a dual-font approach to balance character with legibility.

*   **Display & Headlines (Space Grotesk):** A high-tech, geometric sans-serif used for impact. It represents the "Architect" side of the system—precise and modern.
    *   *Usage:* Large scorelines (`display-lg`), player names in headers (`headline-md`), and section titles.
*   **Body & Labels (Inter):** The industry standard for readability in dense environments. It represents the "Data" side.
    *   *Usage:* Statistical tables, scouting notes, and granular player attributes. 

**Editorial Note:** Use `tertiary` (Gold #e9c400) sparingly for "Legend" status players or key performance indicators to create a clear visual hierarchy within dense data.

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Layering** rather than shadows.
- **Nesting:** A `surface_container_highest` (#353534) card should sit inside a `surface_container_low` (#1c1b1b) section to create a soft, natural lift.

### Ambient Shadows & Ghost Borders
- **Shadows:** When a player card must "float" over a tactical pitch, use a shadow with a 32px blur, 0% spread, and 6% opacity using the `on_background` color. 
- **The "Ghost Border" Fallback:** If accessibility requires a container definition, use a **Ghost Border**: `outline_variant` (#414844) at 15% opacity. Never use 100% opaque borders.

## 5. Components

### Player Cards & Tables
- **Cards:** Forbid divider lines. Use `spacing.4` (0.9rem) of vertical white space to separate the player's name from their "Work Rate" or "Tackle Success" stats.
- **Tables:** Use alternating row fills with `surface_container_low` and `surface_container` instead of borders. Headers should use `label-sm` in `on_surface_variant` for a refined, data-heavy look.

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `rounded.md`, `on_primary` text.
- **Secondary:** `surface_container_highest` fill with a `tertiary` (Gold) left-edge accent (2px) to denote "Elite" action.
- **Tertiary:** Text-only using `primary_fixed_dim` with a subtle `surface_bright` hover state.

### Tactical Diagrams
- **The Pitch:** Use `surface_container_lowest` for the field background.
- **Player Icons:** Use `secondary` (#b0c8f0) for your team and `error_container` (#93000a) for the opposition.
- **Movement Lines:** Use `primary` dashed lines with a subtle outer glow to simulate high-end broadcast telestrations.

### Input Fields
- **Style:** Use "Inert State" styling. Inputs should have no background fill, only a `surface_container_highest` bottom-border (2px). Upon focus, transition the background to `surface_container_high` and the border to `primary`.

## 6. Do's and Don'ts

### Do
*   **Do** use `spacing.2` (0.4rem) for tight data grids to maintain the "Football Manager" density while keeping it readable.
*   **Do** use `rounded.xl` (0.75rem) for main player photos to create a "Panini Sticker" premium feel.
*   **Do** use `tertiary_fixed` (#ffe171) for critical alerts or "Star Player" notifications—the gold must feel earned.

### Don't
*   **Don't** use 1px solid lines to separate content. It clutters the interface and feels "templated."
*   **Don't** use pure white (#FFFFFF) for text. Always use `on_surface` (#e5e2e1) to reduce eye strain during long management sessions.
*   **Don't** use traditional "Drop Shadows" on cards. Rely on background color steps (`surface_container` tiers) to define hierarchy.