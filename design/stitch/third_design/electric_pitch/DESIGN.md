# Design System: Tactical Command Architecture

## 1. Overview & Creative North Star: "The Kinetic Strategist"
The Creative North Star for this design system is **The Kinetic Strategist**. In the world of high-stakes rugby management, data is the weapon and the pitch is the battlefield. This system moves beyond the "standard dashboard" by adopting a high-tech, tactical command center aesthetic that feels both elite and urgent.

We break the "template" look through **intentional atmospheric depth**. Instead of flat layouts, we use a "HUD" (Heads-Up Display) approach: overlapping data modules, glassmorphism to suggest sophisticated optics, and high-contrast typography scales that prioritize rapid scanning. The layout should feel like a coordinated strike—precise, powerful, and technologically superior.

---

## 2. Colors & Atmospheric Depth
Our palette is rooted in the deep shadows of the stadium at night, punctuated by the electric hum of the floodlights.

### The "No-Line" Rule
To maintain a premium, integrated feel, **standard 1px solid borders are prohibited** for sectioning. Use background shifts to define boundaries. A `surface-container-low` module sitting on a `surface` background creates a sophisticated, "machined" look that a line never could.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface tiers to create "nested" importance:
*   **Base:** `background` (#010e24) - The foundation.
*   **Sections:** `surface-container-low` (#02132b) - Large layout blocks.
*   **Modules/Cards:** `surface-container-high` (#0b203d) - Individual data units.
*   **Active/Pop-over:** `surface-bright` (#152c4e) - High-priority interaction layers.

### The "Glass & Gradient" Rule
To capture the "Electric Pitch" vibe, main CTAs and tactical overlays should utilize a **Signature Texture**:
*   **Gradients:** Transition from `primary` (#99f7ff) to `primary-container` (#00f1fe) at a 135-degree angle. This provides a "glowing filament" effect.
*   **Glassmorphism:** For floating tactical menus, use `surface-variant` at 60% opacity with a `20px` backdrop-blur. This allows the pitch data to bleed through, maintaining the "Command Center" immersion.

---

## 3. Typography: Precision & Impact
The typography strategy pairs the technical rigor of **Inter** with the aggressive, geometric character of **Space Grotesk**.

*   **Display & Headlines (Space Grotesk):** Used for scorelines, player names, and "War Room" headers. The wide apertures and sharp terminals convey a high-tech, editorial authority.
*   **Body & Labels (Inter):** Used for complex rugby stats and scouting reports. Inter’s tall x-height ensures maximum readability in dense tables.
*   **The Hierarchy:** Use extreme scale contrast. A `display-lg` player number next to a `label-sm` technical stat creates an "Editorial Tactical" look that feels custom-built for elite management.

---

## 4. Elevation & Depth: Tonal Layering
In this system, we do not "drop shadows"; we **diffuse light**.

*   **The Layering Principle:** Depth is achieved by "stacking" the surface-container tiers. Place a `surface-container-lowest` card inside a `surface-container-high` section to create a "recessed" technical bay effect.
*   **Ambient Glows:** When a floating state is required (e.g., a player card drag-and-drop), use a shadow with a `24px` blur at 8% opacity, tinted with `primary` (#99f7ff). This mimics the light spill of a neon screen rather than a muddy grey shadow.
*   **The "Ghost Border" Fallback:** If a container requires a perimeter for accessibility, use the `outline-variant` token at **15% opacity**. It should feel like a faint laser-etched line, not a physical wall.

---

## 5. Components

### Buttons: High-Energy Actuators
*   **Primary:** A gradient fill (`primary` to `primary-container`) with `on-primary` (#005f64) text. Apply a subtle outer glow on hover using the `primary` color.
*   **Secondary:** No fill. A "Ghost Border" using `primary` at 40% opacity.
*   **Tertiary/Tactical:** Text-only in `tertiary` (#f3ffca) for "Danger Zone" or high-impact technical actions.

### Data Tables & Lists
*   **Forbid Divider Lines:** Use `Spacing 4` (0.9rem) vertical gaps or alternating tonal shifts (`surface-container-low` vs `surface-container-high`) to separate player rows.
*   **Row States:** On hover, a row should transition to `surface-bright`, creating a "scanning" effect.

### Tactical Chips
*   **Selection Chips:** Use `secondary-container` with `0.25rem` (DEFAULT) rounding. When active, use a `primary` glow on the text only.

### Input Fields: The Data Port
*   **Styling:** Inputs should be `surface-container-highest` with a bottom-only "Ghost Border." This mimics a futuristic terminal interface.
*   **Focus State:** The border glows `primary` and the label shifts to `tertiary`.

### Player Performance Cards
*   **Structure:** Use a `surface-variant` background with a `backdrop-blur`.
*   **Visual Soul:** Integrate a subtle 10% opacity "pitch texture" (grass micro-pattern) as a background overlay to ground the management simulation in the sport.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use `tertiary` (Lime Green) exclusively for high-velocity data (e.g., "Sprint Speed" or "Live Match Score").
*   **Do** embrace asymmetry. Align a headline to the left and its supporting data to the extreme right to create a wide, cinematic field of view.
*   **Do** use `Spacing 20` and `24` for major section breathing room to avoid a cluttered "Excel" feel.

### Don't
*   **Don't** use pure white (#FFFFFF) for text. Use `on-surface` (#dbe6ff) to reduce eye strain and maintain the atmospheric "Deep Navy" vibe.
*   **Don't** use standard "Rounded" corners (12px+). Stick strictly to the `4-8px` range to keep the UI feeling like a professional tool, not a social app.
*   **Don't** use 100% opaque borders. They flatten the "Command Center" depth and break the immersion.