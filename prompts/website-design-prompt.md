# High-End Website Design Prompt

Use this prompt with any AI tool (Claude, ChatGPT, v0.dev, etc.) to generate
unique, contemporary, memorable websites.

---

## The Prompt

```
You are a world-class creative director and frontend architect with the 
aesthetic sensibility of a boutique design studio and the technical depth 
of a senior engineer. Your work has been featured in Awwwards, FWA, and 
Siteinspire.

Design a complete, production-ready website for [PROJECT NAME / INDUSTRY].

---

DESIGN PHILOSOPHY
- Restraint over excess: every element must earn its place
- One hero idea per page — make it undeniable
- Negative space is not emptiness, it is tension and breathing room
- The first 3 seconds must create a feeling, not deliver information

---

VISUAL IDENTITY
Typography:
- Choose 1–2 typefaces maximum. One for display (editorial, strong 
  personality), one for body (legible, neutral)
- Use scale dramatically — mix 12px captions with 120px+ headlines
- Treat type as a graphic element, not just text

Color:
- Build from a 3-color palette: one dominant, one accent, one neutral
- The accent color should appear sparingly — it signals importance
- Prefer muted, sophisticated tones over saturated defaults
- Dark mode or light mode — commit fully to one

Layout:
- Asymmetric grids feel alive; center-aligned feels corporate
- Break the grid intentionally in exactly one place per section
- Use horizontal scroll or sticky elements only when they add meaning
- Sections should feel like distinct moments, not repeated templates

---

CONTEMPORARY DETAILS
- Micro-interactions on hover: subtle, not performative
- Smooth scroll with slight parallax on key visual elements
- Reveal animations triggered on scroll — use opacity + translateY,
  never overly dramatic
- Cursor customization if on desktop (subtle, not gimmicky)
- Images: full-bleed, high contrast, or not at all

---

MEMORABLE SIGNATURE ELEMENT
Design ONE unexpected feature that becomes the site's identity — examples:
  - A hero that responds to mouse position
  - Section transitions that feel like turning a page
  - A navigation that is completely unconventional but instantly learnable
  - A color shift tied to scroll depth
  - Text that splits, reveals, or distorts on load

---

STRUCTURE TO DELIVER
1. Full page layout wireframe (described section by section)
2. Color palette with hex codes and usage rules
3. Typography system (font names, sizes, weights, line heights)
4. Complete HTML/CSS/JS for the hero section — pixel-perfect
5. Component library: nav, button, card, footer
6. Mobile-first responsive breakpoints
7. Performance notes (what to lazy-load, what to inline)

---

CONSTRAINTS
- No stock photo aesthetic — art direct every visual choice
- No Bootstrap or generic UI kits — custom everything
- Lighthouse score must be 90+ on performance and accessibility
- Animations must respect prefers-reduced-motion
- The design must look equally intentional on a 13" laptop and a 27" monitor

---

TONE FOR [PROJECT NAME]: [describe the brand feeling in 3 adjectives, 
e.g. "calm, authoritative, forward-thinking" or "playful, sharp, tactile"]

Deliver the complete output. Do not summarize — build it.
```

---

## How to Use

| Variable | Replace with |
|---|---|
| `[PROJECT NAME / INDUSTRY]` | e.g. "a luxury skincare brand", "a SaaS analytics tool" |
| `[describe the brand feeling]` | 3 adjectives that define the emotional target |

**Best results in:** Claude (with extended thinking on), v0.dev, or as a brief
handed to a designer using Cursor.

---

## Why It Works

The prompt forces constraint-based creativity — the same way elite design
studios operate. The "one signature element" instruction is what separates
forgettable sites from ones people screenshot and share.
