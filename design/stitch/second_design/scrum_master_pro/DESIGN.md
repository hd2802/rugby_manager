# Design System Document: Professional Rugby Management

## 1. Overview & Creative North Star

### Creative North Star: "The Tactical Command Center"
This design system moves away from the "spreadsheet" feel of traditional management sims and toward a high-end, editorial sports analytics experience. It is designed to feel like a premium broadcast suite crossed with a rugged, on-field tactical folder. 

We achieve an authoritative presence through **"Aggressive Information Density"**—where data isn't hidden, but curated through high-contrast typography and sophisticated tonal layering. The design breaks the standard grid by utilizing intentional asymmetry: large, brutalist display type offset by hyper-detailed, condensed data tables. The interface should feel "heavy" and grounded, reflecting the physical nature of Rugby Union.

---

## 2. Colors & Surface Architecture

### The Palette
The color strategy utilizes deep "Turf" greens and "Locker Room" navies to establish a professional, dark-mode foundation.

*   **Primary (`#a1d494`):** Used for "Success" metrics, active player states, and key call-to-actions.
*   **Secondary (`#bdc2ff`):** Reserved for tactical overlays and secondary data points.
*   **Surface (`#10141a`):** The deep navy-black foundation of the entire simulation.

### The "No-Line" Rule
To maintain a high-end editorial feel, **1px solid borders are strictly prohibited for sectioning.** Content must be separated by background shifts. Use `surface-container-low` for secondary information and `surface-container-high` for interactive elements. This creates a "molded" look rather than a "boxed" look.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials:
1.  **Base Layer:** `surface` (#10141a) – The "Pitch" or background.
2.  **Section Layer:** `surface-container-low` (#181c22) – Large content blocks (e.g., News Feed background).
3.  **Object Layer:** `surface-container-highest` (#31353c) – Cards and active components.

### The "Glass & Gradient" Rule
Floating tactical elements (like the Pitch Diagram) should use a Glassmorphism effect: 
*   **Fill:** `surface-variant` (#31353c) at 60% opacity.
*   **Effect:** 12px Backdrop Blur.
*   **Signature Texture:** Use a subtle linear gradient from `primary` (#a1d494) to `primary-container` (#043405) for high-impact action buttons to give them a "metallic" tactical sheen.

---

## 3. Typography

The typography is a mix of high-impact geometric shapes and hyper-legible utility fonts.

*   **Display & Headlines (Space Grotesk):** This is our "Brutalist" voice. Use `display-lg` for match scores and `headline-lg` for news titles. It should feel loud and unyielding.
*   **Titles & Body (Inter):** Our workhorse. Used for player names, descriptions, and general navigation. It provides the "Professionalism" in the system.
*   **Data Labels (Public Sans):** A highly legible, slightly condensed feel for attribute labels and small metadata.

**Data-Heavy Scaling:** For player attribute tables, use `label-md` with an uppercase transformation and `0.05rem` letter-spacing to maximize horizontal space without losing authority.

---

## 4. Elevation & Depth

### Tonal Layering
Depth is communicated through brightness, not shadows. An element that is "closer" to the user is simply a lighter shade of navy/grey.
*   **Lowest Priority:** `surface-container-lowest`
*   **Active/Elevated:** `surface-container-highest`

### Ambient Shadows
For floating modals or tooltips, use "The Invisible Lift":
*   **Color:** `#0a0e14` (Surface-container-lowest) at 40% opacity.
*   **Blur:** `20px` to `40px` for a soft, atmospheric glow that feels like stadium lighting.

### The "Ghost Border" Fallback
If contrast is required for accessibility on tactical diagrams, use a **Ghost Border**: `outline-variant` (#434843) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Tactical Pitch Diagrams
*   **Surface:** Use `surface-container-low`.
*   **Markings:** Use `outline` at 30% opacity.
*   **Player Nodes:** Circular `primary` containers for the home team; `secondary` for the opposition. No borders.

### Player Attribute Radars
*   **Webbing:** Use `outline-variant` at 20% opacity.
*   **Fill Area:** `primary` with 30% opacity and a `primary-fixed` 2px stroke.
*   **Labels:** Use `label-sm` (Public Sans).

### Cards & News Feeds
*   **Container:** `surface-container-high`.
*   **Spacing:** Use `spacing-5` (1.1rem) for internal padding.
*   **Separation:** No dividers. Use a `spacing-2` vertical gap and a background shift to `surface-container-low` for the next item.

### Input Fields
*   **State:** Default state uses `surface-container-highest`.
*   **Focus:** Transition background to `primary-container` and change label to `primary`. No heavy outlines.

### Buttons
*   **Primary:** Background `primary` (#a1d494), text `on-primary` (#0a3909). Bold, uppercase.
*   **Tertiary (Ghost):** No background. Text `primary`. Use `spacing-2` for horizontal padding.

---

## 6. Do’s and Don’ts

### Do:
*   **DO** use `surface-bright` (#353940) to highlight the currently selected player in a list.
*   **DO** use `spacing-10` or `12` to create "Editorial Breathing Room" between the main navigation and the data dashboard.
*   **DO** lean into high-contrast typography. If a header is important, make it `display-md`.

### Don't:
*   **DON'T** use 100% white (#FFFFFF) for body text. Use `on-surface-variant` (#c3c8c1) to reduce eye strain during long simulation sessions.
*   **DON'T** use rounded corners larger than `md` (0.375rem). The aesthetic is rugged and sharp; "bubbly" corners destroy the authoritative tone.
*   **DON'T** use standard grey shadows. Always tint shadows with the background navy (`#10141a`) to keep the "Rugged Turf" atmosphere intact.