# J&J Sound — design session notes

This folder holds a saved copy of the latest redesign mockup, plus a summary of how we got here, so the concept isn't lost between sessions.

## Where the live site actually is

The real, deployed J&J Sound site was never lost or deleted. It lives on branch `jj-sound-updates` in this repo (`audiosnob2000/website-1-test-`) and is deployed via the `gh-pages` branch to **www.jjsoundny.com** (see the `CNAME` file on `gh-pages`). It was simply on a different branch than the one we started this session on, which only had a single "design prompt" commit.

`jj-sound-updates` was merged (clean fast-forward) into the working branch for this session, `claude/j-and-j-sound-website-6qewtf`, which now carries the real source: `index.html`, `styles.css`, `script.js`, and `jj-sound-preview.html` (a self-contained single-file preview version).

## The uploaded photo

A promo photo was uploaded showing an actual J&J Sound setup: full band rig (drums, keys, guitar, 2 PA tops + 2 subs + monitor wedges) on the dance floor at an elegant wedding-reception venue on Long Island — exposed wood beams, string lights, white brick walls. The original file had the J&J Sound logo, tagline ("Clear Sound. Strong Impact."), and contact info baked into the bottom third as a poster overlay. We cropped that off, keeping just the clean venue/gear photograph, since the live site's own components (nav, headings, etc.) already carry the branding.

## Placement mockups, in order

We went through several placement concepts before landing on a full redesign, each as its own Claude Artifact preview:

1. **Gallery tile / on-location banner** — dropping the photo into the existing Gallery grid's placeholder tiles, and a full-bleed banner section between "Why J&J" and "Gallery."
2. **Hero, photo on the right** — the photo standing alone in a framed panel to the right of the headline, text pinned left. This took two follow-up fixes: the artifact's preview panel is narrower than desktop, which kept triggering a mobile breakpoint that stacked the photo above the text instead of beside it. Fixed by removing the stacking behavior so the two-column layout holds at any width.
3. **Two hero concepts, compared** — full-bleed photo background vs. the split "photo as a panel" layout, shown side by side.

## The full redesign concept (latest, saved here)

The user asked to see what modernizing the *entire* site could look like, not just where to put one photo. `redesign-concept.html` in this folder is that concept (same file also published as a Claude Artifact: https://claude.ai/code/artifact/ffb615c0-a823-4c86-877c-0025389775e3).

**What it changes and why:**

- **Palette** — moved off the generic "dark hero + blue accent" SaaS-template look (`#0F1117` / `#1A56E8`, what the live site currently uses) to a warm charcoal ground (`#17130F`) with a burnt-amber accent (`#C17A2C`). Closer to actual stage lighting and the string-light/wood-tone world already present in the uploaded photo.
- **Type** — replaced Syne (display) + Inter (body) with **Bebas Neue** (big condensed poster-style headlines) + **Archivo** (body/UI). Reads more like a live-music brand, less like a dev tool landing page.
- **Hero** — the venue photo is now the entire hero background, color-graded into the amber/charcoal palette (like a concert poster rather than a plain photo), with the stats row (500+ shows / 10+ years / 2 engineers) pinned along the bottom edge.
- **Services** — replaced the generic 2x2 equal-card grid with an asymmetric layout: "Live Band Mixing" (the core business) gets a large featured tile, the other three services sit in a lighter divided list beside it.
- **Why J&J Sound** — the four pillars are now a divided row instead of another card grid, so the page doesn't repeat the same layout pattern twice.
- **Proof section** — a second, natural-color crop of the same photo with one honest caption line, instead of the live site's current six fake gradient "gallery" placeholders pretending to be real categorized photos.
- **All real content preserved** — every stat, service description, pillar description, and contact detail (Long Island NY, JJsoundNY@gmail.com, 48hr response) is unchanged from the live site. Only the visual language changed.

## Status

Everything above is **preview only**. Nothing has been changed in `index.html`, `styles.css`, or `script.js` — the live site and this session's working branch still reflect the original design. If the redesign direction (or any of the earlier placement concepts) gets picked, implementing it into the real site files is the next, separate step.
