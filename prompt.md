You are a senior frontend engineer.

I already have an existing React project using:
- TanStack Start (routing/layout)
- Tailwind CSS 

Do NOT create or re-initialize the project.
Do NOT reinstall TanStack Start.
Work within the existing setup.

Goal:
Build a production-ready marketing site for a tech company called **“Golden Tech”** with:
- Classy, premium, Apple-inspired design
- Dark theme with gold accents
- Subtle, non-flashy animations (no “extra” effects)
- Single-page feel (sections: Home, Services, Portfolio, About, Contact), implemented using TanStack Start routes/layouts.

Tech & libraries:
- Use existing React + TanStack Start + Tailwind.
- You MAY add a lightweight animation library like **Framer Motion** OR implement animations using **IntersectionObserver + CSS/Tailwind**.
- Prefer transforms + opacity for smooth performance.

Color palette:
- Background primary: `#0A0A0A`
- Background secondary / surfaces: `#1C1C1E`
- Accent / brand gold: `#FFD700`
- Accent hover gold: `#E6B800`
- Text primary: `#E5E5E5`
- Text muted: `#B0B0B0`
- Dividers / borders: `#2A2A2A`
- Optional gradient background: `#0F2027 → #203A43`

Typography & layout:
- Use a clean sans-serif (system font stack is fine).
- Large headings, generous spacing, minimal clutter.
- All sections must look good on **mobile, tablet, and desktop** (responsive).

File / structure suggestion (adapt to TanStack Start conventions):
- Shared layout in a root route (e.g. `src/routes/__root.tsx`) with header/footer.
- Home content route (e.g. `src/routes/index.tsx`) containing the sections:
  - Hero
  - Services
  - Portfolio
  - About
  - Contact
- Reusable components in `src/components` (e.g. `Header`, `Section`, `ServiceCard`, `PortfolioCard`, `StatsBlock`, `ContactForm`).

Animations (very important style guidance):
- Use **subtle** fade + slide effects, not flashy.
- Typical pattern:
  - Initial: opacity 0, translateY(20–24px)
  - Animate to: opacity 1, translateY(0)
  - Duration: ~0.25–0.4s, ease-out
- Trigger animation **once when the element enters the viewport** (no retrigger loop on scroll).
- Apply to:
  - Hero text and CTA
  - Section headings
  - Service cards
  - Portfolio items
  - Contact card
- No spinning, bouncing, huge parallax, or scroll-jacking.

Sections & content (please wire in this content):

1) HEADER / NAVBAR
- Sticky top bar with semi-transparent dark background.
- Left: wordmark “Golden Tech”
  - “Golden” in gold (`#FFD700`)
  - “Tech” in light text (`#E5E5E5`)
- Right: nav links with smooth scroll to section IDs:
  - Home → `#home`
  - Services → `#services`
  - Portfolio → `#portfolio`
  - About → `#about`
  - Contact → `#contact`
- CTA button on the right:
  - Label: “Book a Call”
  - Style: gold background, dark text, rounded, subtle shadow, hover `#E6B800`.

2) HERO SECTION (id="home")
- Full viewport height on dark gradient background (`#0A0A0A` → `#203A43`).
- Two-column layout on desktop, single column on mobile.

Left side:
- Small overline (gold, small caps):
  - Text: “Premium Engineering Partner”
- Main heading (2–3 lines, bold):
  - “Bold infrastructure.
     Golden reliability.”
- Subheading paragraph:
  - “Golden Tech helps fast-growing companies design, build, and scale reliable backends, data platforms, and AI systems — without compromising on quality or uptime.”
- Primary CTA button:
  - Label: “Schedule a consultation”
  - Gold background, dark text, hover darken to `#E6B800`.
- Secondary link-style CTA:
  - Label: “View our portfolio →”
  - Ghost style or simple underline, muted text that brightens on hover.

Right side:
- Abstract “tech dashboard / infrastructure” card:
  - Use a dark card with:
    - A fake graph
    - A few stat rows
    - Small gold accent lines or dots
  - No real data required, just a classy placeholder visual.

Animation:
- Hero text + buttons fade/slide up on first load.
- Dashboard card can have a very gentle fade/slide or micro “float” effect (optional).

3) SERVICES SECTION (id="services")
- Section title:
  - “What we do”
- Subtitle:
  - “End-to-end engineering for teams that outgrow quick fixes.”
- Three service cards in a responsive grid.

Service card 1:
- Title: “Scalable Backend Architecture”
- Description:
  “We design APIs and services that stay fast and reliable as your traffic grows — from your first thousand users to millions.”
- Bullet points:
  - “Event-driven & message-based systems”
  - “Performance profiling & bottleneck removal”
  - “High-availability & fault tolerance”

Service card 2:
- Title: “Data Platforms & Observability”
- Description:
  “From pipelines to dashboards, we make your data trustworthy, timely, and easy to reason about.”
- Bullet points:
  - “Streaming & batch data pipelines”
  - “Data warehousing & analytics”
  - “Monitoring, logging, and alerting”

Service card 3:
- Title: “AI & Automation”
- Description:
  “We integrate AI into your products and operations with a focus on reliability, traceability, and cost control.”
- Bullet points:
  - “LLM-backed product features & assistants”
  - “Process automation and internal tools”
  - “Experimentation and A/B testing”

Styling & animation:
- Cards on dark surfaces with subtle borders (`#2A2A2A`).
- On scroll into view: each card fades and slides up slightly.
- On hover: small scale (e.g. 1.01) and border accent in gold.

4) PORTFOLIO SECTION (id="portfolio")
- Section title:
  - “Selected work”
- Subtitle:
  - “A glimpse of what we’ve helped teams build.”
- Three portfolio example cards (porto items) with the following content:

Portfolio item 1:
- Name: “Aurora Transit Intelligence”
- Tagline: “Real-time operations dashboard for a city-scale transit network.”
- Description:
  “We built a real-time control and analytics layer on top of live vehicle telemetry, schedules, and incident feeds — giving operators a unified view of network reliability.”
- Key points (list):
  - “Sub-second latency for live vehicle positions”
  - “Headway and on-time performance analytics”
  - “Alerting for service gaps and congestion”
- Tech stack text:
  - “Stack: Go, PostgreSQL/Timescale, MQTT, Redis, React.”

Portfolio item 2:
- Name: “Nimbus Commerce Cloud”
- Tagline: “Scalable backend for a high-growth e-commerce platform.”
- Description:
  “We re-architected the core order and inventory services to handle flash-sale traffic without downtime, while keeping the developer experience smooth.”
- Key points:
  - “Event-driven order processing pipeline”
  - “Blue/green deploys and zero-downtime releases”
  - “End-to-end observability with tracing and metrics”
- Tech stack text:
  - “Stack: Node.js, Kafka, PostgreSQL, Kubernetes, Grafana.”

Portfolio item 3:
- Name: “Helios AI Control Panel”
- Tagline: “Operational console for AI-powered customer support.”
- Description:
  “We built a management console that lets ops teams tune AI behavior, review conversations, and track resolution metrics in one place.”
- Key points:
  - “Human-in-the-loop review workflow”
  - “Fine-grained configuration of AI assistants”
  - “Analytics on response quality and cost”
- Tech stack text:
  - “Stack: Python, FastAPI, vector search, React, Tailwind.”

Styling & animation:
- Each portfolio card: dark background, subtle border, gold accent line or tag.
- On scroll: fade + slide-in staggered (one after another).
- On hover: slight lift and maybe a thin gold border at the top.

5) ABOUT SECTION (id="about")
- Title:
  - “Why Golden Tech?”
- Two-column layout on desktop; stacked on mobile.

Left column (text):
- Paragraph 1:
  “We’re engineers first, consultants second. Golden Tech was created for teams that need a hands-on partner who can design the architecture, write the code, and ship the thing — not just hand over a slide deck.”
- Paragraph 2:
  “We focus on a small number of engagements at a time so we can go deep on your stack, infrastructure, and team, and leave you with systems that are documented, observable, and ready to grow.”

Right column (stats block):
- Three stat items, each with a bold number and a short label:
  1) “5+ years”
     - “Hands-on experience building and scaling production systems.”
  2) “99.9%+ uptime”
     - “Architectures engineered for reliability and recovery.”
  3) “From PoC to production”
     - “We help you go from idea to launch — and beyond.”

Animation:
- Section heading and text fade in.
- Stats block items can have a slight staggered fade-up.

6) CONTACT / CTA SECTION (id="contact")
- Dark card centered in the page with a thin gold border or top border.
- Heading:
  - “Tell us about your next project.”
- Paragraph:
  - “Share a bit about your product, stack, and timeline. We’ll get back to you with practical options — not generic advice.”
- Simple contact form:
  - Name (input)
  - Work email (input)
  - Company (input)
  - Project details (textarea)
- Submit button:
  - Label: “Send message”
  - Full-width on mobile, gold background, dark text, hover darken to `#E6B800`.
- Below form, muted text:
  - “Prefer email? Reach us at hello@goldentech.dev”

Footer:
- Simple, minimal footer with:
  - “© {currentYear} Golden Tech. All rights reserved.”
  - Optional small link row (e.g. Privacy, Terms).

General requirements:
- Use Tailwind for layout, spacing, and color classes (custom config for the palette is a plus).
- Ensure all sections have proper IDs for smooth scrolling from the navbar.
- Keep animations smooth and minimal; avoid anything that hurts performance or feels distracting.
- Code should be clean, reusable, and idiomatic for TanStack Start + React.
