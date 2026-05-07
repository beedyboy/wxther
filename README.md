# wxther

London-focused weather app where the forecast triggers useful recommendations rather than being the destination.


## How I read the brief

The brief is explicit that this is too much to finish perfectly and that the score is on judgement. So the submission is three things of equal weight: a working app, a defensible scope, and a clear write-up of what got cut. Code is the evidence; the doc is the thinking.

The card lifecycle (generate → render → dismiss → empty) sits at the centre of what I built. Without it the agentic experience doesn't show. The LLM is just the content source feeding it.

## What I shipped

- Pixel-perfect home screen against the Figma source. Sticky frosted-glass header, hourly forecast strip, and the suggested-actions canvas scrolls underneath it.
- Real Open-Meteo data with loading and error states, served via a proxy route so providers can be swapped behind a clean shape.
- Animated parallax mist background with two drifting layers.
- Three card layouts (single CTA, double CTA, ack-only) driven by a discriminated union. Spring-based dismiss with stack reflow.
- Empty state when the stack clears.
- LLM-generated cards via Claude with tool-use structured outputs, Zod-validated server-side. Key never reaches the client.
- Mock generator that runs the same code path when Claude fails or no key is set. The app stays demoable in any state.

## What I cut, and why

**Save and Swap actions.** The Figma cards have "Save Deal" buttons, but to make Save useful you also need a Saved view, persistence, and a card replenishment flow. Shipping all of it was about 6 hours of focused work I didn't have. Dismiss is the one I kept because dismiss is what makes the canvas feel alive — it's the visual proof that the system responds.

**localStorage persistence.** Dismissed cards return on reload. ~20 minute fix, cut because it raises questions I didn't want to half-answer (do dismissals from yesterday's weather still count? do you reset on a new day?).

**Deeplinks on primary actions.** "Switch to Tube", "Play in Spotify" etc. log the intent and dismiss the card. Wiring even one through end-to-end (Citymapper URL, Spotify embed) is half a day for a deal that wouldn't generalise to the others.

**Settings page.** The gear icon is decorative.

**Tests.** Type system + Zod runtime checks are the safety net. Vitest tests on the weather mapper and Zod schema would be the first add.

The principle behind every cut: anything that didn't survive the dismiss interaction got cut. The dismiss interaction is the product.


## Architecture choices worth defending

**Mock-first, Claude-last.** Built the recs endpoint with a deterministic mock function before wiring Claude. Same response shape both ways, so swapping was a one-file change. Means the UI was fully exercised against the seam before LLM latency, cost, and prompt drift entered the picture. The mock also stays in production as a fallback — if Claude fails, the user still sees something.

**Decoupled content from rendering.** The LLM doesn't return UI. It returns a card object with a `layout` discriminator (`single | double | ack`). The card component reads the discriminator and renders the right action region. If Claude hallucinates a layout, Zod drops the card; the rest still render.

**Adapter between Open-Meteo and the UI.** UI knows about `Weather`, not Open-Meteo's wire format. WMO codes get bucketed into 8 conditions. Switching to BBC Weather or Tomorrow.io later is a one-file rewrite.

## Tradeoffs I'm not happy about

- First Claude call is 1-2s on a cold cache. Should ship a server-cached default set that renders immediately, then swap in the LLM-generated set when ready.
- Background animation isn't weather-reactive. Drift speed should respond to wind, tint to cloud cover.
- Font is a system stack. Figma uses GT Walsheim Trial which is licensed.

## What I'd do next

**Day 2**
- localStorage persistence for dismissed and saved IDs
- Server-cached default cards for instant first paint
- Wire one primary action end-to-end (Citymapper deeplink for Switch to Tube)
- Vitest tests on the weather mapper and the Zod schema

**Week 2**
- Save and Swap interactions properly. Swap calls back to Claude with an excludeIds list and slots in a single replacement card.
- Card replenishment when the stack drops below 2.
- "Why this card?" inspector on long-press, showing the weather facts that triggered it. Transparency is what separates agentic from creepy.
- PWA shell with offline weather snapshot
- Sentry + structured logs on the recs route for prompt drift

**Month 2**
- Real onboarding capturing persona facts
- Geolocation, multi-place
- Push notifications when weather changes invalidate active cards
- Evals harness — fixture set of (weather, expected categories) pairs
- Affiliate / partnership integrations on Save Deal cards. The natural monetisation path.



## Quick Start Installation

1. Clone the repository and navigate inside:
   ```bash
   git clone <repo-url>
   cd wxther
   
## Run it

```bash
npm install
cp .env.example .env.local
# add ANTHROPIC_API_KEY, or set USE_MOCK_CARDS=true
npm run dev
```
Open in Chrome DevTools at iPhone 14 Pro size.


## 🛠️ Tech Stack & Packages
- **Framework:** Next.js 16 (App Router, Tailwind CSS, TypeScript)
- **Animation Framework:** Framer Motion
- **Icons:** Public assets and custom svg icons
- **AI Integrations:** Anthropic API (Claude) (with structured JSON Output schemas)