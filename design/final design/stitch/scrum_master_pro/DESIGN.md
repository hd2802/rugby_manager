# Design System Strategy: The Tactical Director

## 1. Overview & Creative North Star
**Creative North Star: "The Elite War Room"**
This design system moves away from the "spreadsheet" feel of traditional sports management games. Instead, it adopts the aesthetic of a high-end, military-grade tactical command center combined with the luxury of an executive box. 

We break the "template" look through **Tonal Command**. By leveraging deep, atmospheric navy hues and sharp, high-contrast gold accents, we create a sense of high-stakes decision-making. The design prioritizes **Intentional Asymmetry**—for instance, player stat cards might feature skewed data visualizations or offset typography to mimic the kinetic energy of rugby—and **Layered Intelligence**, where data isn't just displayed, it is curated through depth and light.

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is built on deep immersion. The interaction between Deep Navy and Emerald Green is not just a brand choice; it represents the "Pitch under the Floodlights."

### Surface Hierarchy & Nesting
To achieve a premium feel, we utilize the **Surface-Container** tiers to create a physical sense of depth.
*   **Base Layer:** Use `surface` (#041329) for the global background.
*   **Sectioning:** Use `surface_container_low` (#0d1c32) for secondary sidebars or inactive regions.
*   **Active Workspaces:** Use `surface_container` (#112036) for the main management dashboard.
*   **Primary Interaction Points:** Use `surface_container_high` (#1c2a41) for cards that require immediate attention.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to separate sections. Boundaries must be defined solely through background color shifts. For example, a player's attribute list (`surface_container_highest`) should sit on a dashboard tile (`surface_container`) without a stroke. The contrast in value is your divider.

### The "Glass & Gradient" Rule
To add "soul" to the data:
*   **Main CTAs:** Use a subtle linear gradient from `secondary` (#95d3ba) to `on_secondary_fixed_variant` (#0b513d).
*   **Floating HUDs:** For in-match tactics, use Glassmorphism. Apply `surface_variant` (#27354c) at 60% opacity with a `20px` backdrop-blur.

## 3. Typography: Editorial Authority
We pair **Manrope** (Display/Headline) for its technical, modern character with **Inter** (Body/Labels) for its maximum readability in data-heavy environments.

*   **Display-LG (Manrope, 3.5rem):** Reserved for big scores or season years. It should feel monumental.
*   **Headline-SM (Manrope, 1.5rem):** Used for section titles (e.g., "Scouting Report"). Use `tertiary` (#eec200) for these to draw the eye instantly.
*   **Title-MD (Inter, 1.125rem):** For player names and key metrics.
*   **Label-SM (Inter, 0.6875rem):** For granular data labels (e.g., "Scrum Success %"). Always use `on_surface_variant` (#c5c6cd) for these to maintain hierarchy.

## 4. Elevation & Depth: Tonal Layering
In this system, light is a resource. We do not use "drop shadows" in the traditional sense.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface_container_lowest` (#010e24) card placed on a `surface` background creates a "sunken" tactical look. A `surface_container_highest` card on a `surface` background creates an elevated "active" look.
*   **Ambient Shadows:** If a floating element (like a modal) is required, use a shadow with a `40px` blur at 8% opacity, using the `background` color (#041329) as the shadow tint. This mimics natural light dissipation in a dark room.
*   **The "Ghost Border" Fallback:** If a container lacks contrast against its parent, use the `outline_variant` (#44474d) at **15% opacity**. It should be felt, not seen.

## 5. Components: Precision Management

### Cards & Data Tiles
*   **Rule:** Forbid divider lines. Use `spacing.6` (1.3rem) to separate content blocks.
*   **Style:** Use `roundedness.md` (0.375rem) for a professional, sharp edge. Data should be "contained" by background shifts, not boxes.

### Buttons (Tactical Actions)
*   **Primary (Sign Match):** Solid `secondary` (#95d3ba) with `on_secondary` (#003829) text. No border.
*   **Secondary (View Stats):** `outline_variant` at 20% opacity with `secondary` text.
*   **Tertiary (Dismiss):** Ghost style. No background, `on_surface_variant` text.

### High-Density Stats (The Player Matrix)
*   **The "Heat" Bar:** Use `tertiary` (#eec200) for positive progress and `error` (#ffb4ab) for fatigue or injury, rendered as thin 2px horizontal lines.

### Inputs & Fields
*   **Style:** Background should be `surface_container_lowest`. On focus, the background transitions to `surface_container_highest` with a 1px `tertiary` (#eec200) "glow" (not a stroke, but a subtle outer blur).

## 6. Do's and Don'ts

### Do
*   **Use Asymmetry:** Allow player photos or team crests to slightly "break" the container edges to create a bespoke, editorial feel.
*   **Prioritize Breathing Room:** Use `spacing.10` (2.25rem) between major modules. Data density requires negative space to remain legible.
*   **Color as Data:** Use `secondary` (#95d3ba) for "on the pitch" actions and `tertiary` (#eec200) for "financial/administrative" actions.

### Don't
*   **Don't use pure white (#FFFFFF):** It will shatter the dark mode immersion. Use `on_background` (#d6e3ff) for primary text.
*   **Don't use 100% opaque borders:** They create visual noise and make the app look like a generic dashboard.
*   **Don't use standard "Primary Blue":** This system relies on the specific sophisticated tension between Deep Navy and Emerald.