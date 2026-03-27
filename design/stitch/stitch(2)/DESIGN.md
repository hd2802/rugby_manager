# Design System Document

## 1. Overview & Creative North Star: "The Tactical Command"
This design system is engineered for a high-end rugby management experience that balances the raw intensity of the sport with the cold precision of elite sports science. We are moving away from the "cluttered spreadsheet" aesthetic common in sports sims and moving toward a **"Tactical Command"** interface.

**Creative North Star: The Technical Elite.**
The interface should feel like a high-performance heads-up display (HUD). We achieve this through "Organic Brutalism"—using the raw, industrial weight of `Space Grotesk` paired with sophisticated, layered dark surfaces. We break the grid through **Intentional Asymmetry**: stats should not always be centered; they should be anchored to corners or edges to create a sense of technical "read-outs."

---

## 2. Colors & Surface Architecture
Our palette is rooted in deep obsidian tones, punctuated by high-visibility "Mint" and "Gold" accents that signify peak performance and elite status.

### Color Tokens
*   **Primary Mint (`#95d4b3`):** Used for "Action" states, positive growth, and peak physical fitness.
*   **Secondary Gold (`#e9c400`):** Reserved for "Elite" status, high-value players, and championship-tier data.
*   **Surface-Container-Low (`#1c1b1b`):** The default card and section base.
*   **Surface (`#131313`):** The foundational "infinite" background.

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning. We define space through **Tonal Transitions**. Use `surface-container-low` for a section, and `surface-container-highest` for an active element within it. 

### Glass & Gradient Soul
To prevent the "flat box" look:
*   **CTAs:** Use a subtle linear gradient from `primary` (`#b0f1ce`) to `primary_container` (`#95d4b3`) at a 135-degree angle.
*   **Floating Panels:** Use `surface_variant` at 60% opacity with a `20px` backdrop-blur to create a "glass cockpit" feel.

---

## 3. Typography: The Editorial Edge
We use typography to create a rhythmic hierarchy that guides the eye through dense data.

*   **Display & Headlines (`Space Grotesk`):** Must be **Uppercase** with a slight tracking increase (`0.05em`). This mimics the technical labeling found on blueprints and tactical maps.
    *   *Headline-LG (2rem):* For player names or major match scores.
*   **Body & Titles (`Inter`):** Used for all narrative and data-point descriptions. 
    *   *Title-SM (1rem):* Bold for stat labels (e.g., **MORALE**).
    *   *Body-MD (0.875rem):* For player history or news feeds.
*   **Labels (`Inter`):** Use `label-sm` for micro-data (e.g., secondary stats like "Scrum Success %").

---

## 4. Elevation & Depth: Tonal Layering
In a high-end simulation, shadows should be felt, not seen. We reject the "heavy drop shadow" in favor of **Natural Lift.**

*   **The Layering Principle:** Place a `surface_container_highest` (`#353534`) element inside a `surface_container_low` (`#1c1b1b`) container to create immediate visual hierarchy without a single line or shadow.
*   **The "Ghost Border":** For player cards, use the `outline_variant` token at **10% opacity**. It should be a mere suggestion of a boundary, allowing the player's photo or stats to feel like they are part of the UI fabric.
*   **Ambient Shadows:** If a modal must float, use a shadow with `blur: 40px`, `y: 20px`, and the color `background` at 40% opacity.

---

## 5. Components & Data Visualization

### Player Cards (The Core Component)
*   **Structure:** No divider lines. Use `spacing-5` (1.1rem) to separate the header from the stats.
*   **Visual Hierarchy:**
    *   **Value:** `Secondary Gold` text, `Space Grotesk`, top right.
    *   **Fitness:** A thin horizontal bar using a `primary` to `surface_container_highest` track.
    *   **Morale:** Represented by a tinted icon, never a full text label.
*   **Corners:** Use `DEFAULT` (0.5rem / 8px) for internal cards and `lg` (1rem / 16px) for major dashboard containers.

### High-End Inputs
*   **Fields:** No 4-sided boxes. Use a bottom-border only (`outline_variant` at 20%) that glows to `Primary Mint` on focus.
*   **Buttons:**
    *   **Primary:** Solid `Primary Mint` with `on_primary` (Dark Green) text.
    *   **Secondary:** Ghost style. Transparent background with a `Ghost Border` (15% opacity).

### Tactical Chips
*   Used for "Player Positions" (e.g., FLY-HALF, LOCK).
*   **Style:** `surface_container_highest` background, no border, `Inter` Bold, Uppercase.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place the player's "Age" in a small, low-contrast `label-sm` tucked in a corner.
*   **Embrace Negative Space:** Use `spacing-10` (2.25rem) between major data modules to allow the "technical" look to breathe.
*   **Use "On-Surface-Variant" for Labels:** Keep labels like "Weight" or "Contract End" in a muted grey (`#bfc9c1`) so the actual data (`#e5e2e1`) pops.

### Don't:
*   **Don't use 100% white:** Use `on_surface` (`#e5e2e1`). Pure white breaks the high-end dark-mode immersion.
*   **Don't use Dividers:** If you need to separate two stats, use a `0.1rem` (spacing-0.5) vertical gap or a subtle background shift.
*   **Don't Round Everything:** Keep "Action" buttons slightly sharper (`DEFAULT` 8px) to maintain a "military-grade" feel. Reserve `full` rounding only for status pips or avatars.