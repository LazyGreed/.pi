---
name: project-landing-page-designer
description: Design distinctive, project-specific landing pages by deriving the visual system, layout, interactions, and motion from the product itself instead of generic SaaS templates. Uses real project evidence to shape the hero, signature interaction, technical storytelling, responsive behavior, accessibility, and implementation guidance.
---

# Skill: Project Landing Page Designer

## Purpose

Design a distinctive landing page for a software project, developer tool, open-source product, application, framework, API, service, or technical brand.

The page must derive its visual language from the **project itself** rather than forcing the project into a generic SaaS template.

The primary goal is to identify the project's strongest idea, interaction, object, workflow, or metaphor and make that the central visual system of the page.

Do not default to:

- hero + screenshot
- bento grids
- feature-card grids
- glowing gradients
- generic terminal windows
- floating dashboard screenshots
- fake metrics
- template-style SaaS layouts

The landing page should feel specifically designed for the project.

---

# Inputs

Ask for or derive:

1. **Project**

   - name
   - repository / website
   - one-sentence description

2. **Audience**

   - developers
   - end users
   - teams
   - enterprises
   - researchers
   - creators
   - other

3. **Primary goal**

   - introduce the project
   - drive installation
   - drive GitHub visits
   - sell a product
   - collect signups
   - explain technology
   - launch a new version
   - build brand identity

4. **Current product state**

   - prototype
   - alpha
   - beta
   - released
   - mature

5. **Available evidence**

   - repository
   - documentation
   - screenshots
   - demos
   - product copy
   - changelog
   - benchmarks
   - roadmap

6. **Preferred visual direction**, if any

   - minimal
   - editorial
   - technical
   - cinematic
   - playful
   - brutalist
   - industrial
   - glass
   - monochrome
   - other

7. **Implementation constraints**

   - React / Next.js / Astro / static HTML
   - Tailwind / CSS
   - Framer Motion / GSAP / Motion
   - desktop-first / responsive
   - reduced-motion requirements

If enough information already exists, do not ask unnecessary questions.

---

# Core Rule

Before designing sections, identify:

> **What is the one thing this project does or represents that no generic landing-page template could express as well?**

That becomes the page's **signature system**.

Possible signature systems:

- a shell morphing between states
- an agent completing a task
- requests flowing through infrastructure
- documents transforming through an OCR pipeline
- code being compiled or rewritten
- nodes joining a distributed system
- a command palette controlling the page
- a canvas being progressively constructed
- data moving between services
- a timeline or state machine
- a terminal session
- an editor operation
- a physical metaphor derived from the product
- the product UI itself

The signature system should preferably persist across multiple sections.

Do not create a visually impressive metaphor that has no relationship to the product.

---

# Discovery

Study the project's real implementation before choosing a visual direction.

Determine:

- what the project actually does
- its strongest feature
- its main user workflow
- its terminology
- its architecture
- its interaction model
- its visual identity
- its most important differentiator
- current limitations
- current maturity
- what can be demonstrated rather than merely claimed

When a repository or documentation is available, use it as the primary source of truth.

Avoid inventing positioning that contradicts the implementation.

---

# Creative Direction

Derive the visual system from the project.

Define:

## Design character

Choose 3–6 qualities such as:

- precise
- quiet
- mechanical
- expressive
- editorial
- dense
- playful
- technical
- physical
- fast
- restrained
- experimental

These qualities must influence:

- typography
- spacing
- motion
- color
- composition
- copy density
- interaction style

---

## Palette

Create:

- primary ground
- secondary ground
- primary ink
- secondary ink
- muted ink
- one primary accent
- optional secondary accent
- hairline color

Prefer a small palette.

Accents should usually appear through:

- text
- indicators
- rules
- small controls
- diagrams
- state changes

Avoid making the entire page rely on large accent-colored surfaces unless the brand explicitly calls for it.

---

## Typography

Choose separate roles for:

- display
- body
- labels
- code / technical metadata

Specify:

- font family
- weight
- scale
- line height
- tracking

Typography should be one of the primary visual systems of the page, not decoration added after layout.

---

# Page Architecture

Do not automatically use the same section structure for every project.

Choose sections based on what the project needs.

Common section types:

- navigation
- experiential hero
- product statement
- interactive demonstration
- workflow
- capabilities
- architecture
- technical explanation
- benchmarks
- integrations
- comparison
- release status
- roadmap
- open-source section
- installation
- pricing
- testimonials
- FAQ
- closing statement

Usually prefer **5–8 strong sections** over many small sections.

Every section should answer a distinct question.

Example progression:

1. What is this?
2. What does using it feel like?
3. Why does it exist?
4. What can it do?
5. How does it work?
6. Why should I trust it?
7. What should I do next?

---

# Hero

The hero must communicate the project's identity before relying on feature lists.

Prefer showing the product's central concept in motion.

Possible hero patterns:

### Product-as-interface

The actual product interface becomes the hero.

Best for:

- shells
- launchers
- editors
- dashboards
- design tools
- agents

### Workflow hero

Show input → transformation → result.

Best for:

- OCR
- APIs
- developer tools
- automation
- AI systems

### System hero

Show components interacting.

Best for:

- infrastructure
- orchestration
- networking
- observability
- developer platforms

### Object hero

Use a single visual object that changes state.

Best for:

- highly interactive products
- creative tools
- utilities
- products with strong state transitions

### Editorial hero

Use typography, composition and controlled imagery.

Best for:

- libraries
- research projects
- brands
- projects without a visual UI

Do not add a large browser mockup simply because the project has a web interface.

---

# Signature Interaction

Create one memorable interaction that belongs specifically to the project.

Examples:

- drag a request through a router
- type commands into a real command palette
- scrub through an OCR correction pipeline
- morph one UI element through product states
- connect/disconnect architecture nodes
- reorder jobs
- throw away historical states
- compare raw vs processed output
- manipulate a real parameter
- simulate a task lifecycle

The interaction must teach the user something about the product.

It cannot exist solely for decoration.

---

# Motion System

Separate motion into three categories.

## 1. Scroll-bound motion

Used for:

- hero transformations
- large spatial transitions
- parallax
- diagrams
- product-state walkthroughs

Every value should be derived from scroll progress.

It must reverse naturally when scrolling upward.

Avoid long timer-based sequences pretending to be scroll interactions.

---

## 2. Interaction motion

Used for:

- hover
- drag
- press
- selection
- toggle
- resize
- opening and closing UI

Use restrained spring behaviour where appropriate.

The product's character determines whether motion feels:

- soft
- mechanical
- immediate
- elastic
- heavy
- sharp

Do not use identical spring values everywhere.

---

## 3. Entry reveals

Secondary content may reveal once.

Keep them short and subordinate to the signature interaction.

Do not create a page where every paragraph flies in from a different direction.

---

# Reduced Motion

The page must remain complete without animation.

Rules:

- no content should depend on animation to exist
- reduced-motion should render readable final states
- no-JS should remain usable where practical
- disable decorative parallax
- replace long morphs with direct state transitions
- preserve functionality

Only add motion-specific classes after confirming reduced motion is not requested.

---

# Layout

Prefer deliberate composition over grids.

Useful structures:

- asymmetrical editorial layouts
- sticky text + scrolling demonstration
- large ruled lists
- tables
- full-viewport states
- horizontal visual sequences
- oversized typography
- cropped elements
- layered desktop/canvas environments

Use cards only where the content genuinely behaves like independent objects.

Do not turn every capability into a rounded rectangle.

---

# Feature Presentation

Avoid generic:

> icon
> title
> two-line description

Instead derive feature presentation from the project.

Examples:

### Developer tool

Use commands, traces, files, diffs or state changes.

### Infrastructure

Use topology, events and system boundaries.

### OCR / document AI

Use document stages, bounding boxes, text output and correction.

### Desktop application

Use working UI states.

### API

Use request → response demonstrations.

### Framework

Use small concrete examples and architecture relationships.

### Agent

Show task → actions → state → result.

---

# Technical Sections

For technical projects, include enough engineering substance to distinguish the page from marketing copy.

Possible content:

- architecture diagram
- lifecycle
- protocols
- dependencies
- data flow
- execution model
- extension model
- performance characteristics
- security boundaries
- system requirements
- API examples

Keep these sections visually consistent with the rest of the page.

Do not suddenly switch into generic documentation styling.

---

# Architecture Diagrams

Prefer:

- thin lines
- text
- restrained nodes
- real component names
- directional movement
- state transitions

Avoid:

- glowing boxes
- fake 3D infrastructure
- excessive icons
- abstract nodes without meaning

A diagram should explain the system.

---

# Evidence Rules

Treat the project's own repository and documentation as authoritative.

Claims must be classified as:

### Verified

Directly supported by:

- source code
- documentation
- release notes
- tests
- benchmarks
- project data

These can be stated normally.

### Planned

Explicitly documented but not shipped.

Clearly label as:

- planned
- roadmap
- upcoming
- in development

### Unverified

Do not present as fact.

Never invent:

- user numbers
- download counts
- stars
- benchmarks
- customer logos
- quotes
- awards
- performance claims
- compatibility
- release dates
- enterprise adoption
- press coverage

Live statistics must be fetched from their authoritative source.

---

# Copy

Use concise project-specific language.

Prefer:

> Event driven when possible. Quiet when idle.

over:

> Revolutionize your workflow with our cutting-edge next-generation solution.

Avoid:

- revolutionize
- seamless
- game-changing
- supercharge
- next-generation
- unlock
- elevate
- powerful and intuitive
- built for everyone

unless the project itself intentionally uses that language.

Headings should be capable of standing alone.

Body copy explains rather than repeats the heading.

---

# Navigation

Keep navigation small.

Typical contents:

- project wordmark
- 3–5 anchors
- one primary action

Examples:

- Overview
- Demo
- Architecture
- Docs
- GitHub

CTA depends on product:

- Install
- Get Started
- GitHub
- Try Demo
- Download
- Join Waitlist

Do not use multiple competing CTAs.

---

# Closing Section

The closing should resolve the page's visual idea.

Prefer returning to the hero's signature object or concept.

Examples:

- object returns to its initial state
- workflow resolves into final output
- architecture collapses into the wordmark
- command session ends at a prompt
- processed document becomes clean output
- agent completes the task

The last frame should feel intentional, not like a footer appended to the page.

Use:

- one short statement
- one or two actions
- minimal footer metadata
- oversized project wordmark where appropriate

---

# Responsive Design

Do not simply shrink desktop.

For narrow layouts:

- simplify decorative layers
- reduce simultaneous states
- collapse two-column structures
- keep the signature interaction functional
- preserve typography hierarchy
- remove nonessential metadata
- keep touch targets large
- ensure drag interactions do not trap scrolling

For horizontal drag interfaces use:

`touch-action: pan-y`

when vertical page scrolling should remain available.

---

# Accessibility

Required:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient contrast
- meaningful labels
- no hover-only functionality
- reduced-motion support
- appropriate ARIA for custom controls
- touch-friendly hit targets

Interactive demonstrations must have keyboard equivalents wherever practical.

---

# Implementation Principles

Prefer the simplest technology that supports the design.

Possible stack:

- React + TypeScript
- Vite / Next.js / Astro
- CSS or Tailwind
- Motion / Framer Motion for component transitions
- GSAP only when advanced timeline/scroll control materially helps

Do not add animation libraries merely because they exist.

Use CSS for:

- basic transitions
- typography
- layout
- simple transforms

Use JavaScript for:

- stateful interactions
- drag
- scroll-linked orchestration
- simulations
- complex morphing

---

# Performance

Landing-page polish must not require wasteful runtime behaviour.

Avoid:

- continuous animation while offscreen
- uncontrolled requestAnimationFrame loops
- unnecessary canvas rendering
- oversized videos
- massive uncompressed images
- hundreds of animated DOM elements
- blur over huge surfaces where avoidable

Prefer:

- transform + opacity
- intersection-based activation
- lazy-loaded media
- responsive images
- GPU-friendly animation
- pausing simulations when offscreen

---

# Anti-Template Rules

Reject the design and rethink it if it could plausibly be used unchanged for five unrelated startups.

Specifically avoid automatically producing:

- centered headline + subtitle + two buttons
- floating screenshot beneath hero
- three-column benefit cards
- bento feature grid
- logo cloud
- testimonial carousel
- pricing cards
- FAQ accordion
- gradient CTA
- generic footer

These components are allowed only when the project's actual needs justify them.

---

# Output

Produce a complete landing-page design specification containing:

## 1. Concept

One paragraph explaining the core visual idea.

## 2. Signature system

The project-specific object, interaction, workflow or metaphor driving the page.

## 3. Style

- palette
- typography
- visual character
- surface treatment

## 4. Page structure

For every section specify:

- purpose
- layout
- content
- interaction
- motion

## 5. Hero choreography

Describe the hero state-by-state.

Include concrete motion relationships where useful.

## 6. Special components

Specify any:

- interactive demos
- draggable elements
- diagrams
- simulations
- product previews

## 7. Motion model

Separate:

- scroll-bound
- interaction
- reveal

## 8. Responsive behaviour

Describe what changes rather than merely saying "make responsive."

## 9. Accessibility

Include reduced-motion behaviour.

## 10. Evidence rules

List which claims are safe, planned or prohibited.

## 11. Implementation notes

Recommend an appropriate frontend stack and any important performance constraints.

---

# Optional Prototype Mode

When asked to produce an implementation-ready prototype specification, additionally define:

- viewport assumptions
- section heights
- sticky regions
- exact component hierarchy
- CSS variables
- breakpoints
- animation ranges
- scroll progress mappings
- spring values
- pointer interactions
- keyboard interactions
- mock data
- state machines
- reduced-motion fallbacks

For important transformations, give measurable motion rather than vague instructions.

Bad:

> Move the object significantly.

Good:

> Between hero progress 0.1 and 0.55, translate the panels from `0` to `±110%` of their own width.

---

# Optional Existing-Site Adaptation Mode

When given an existing landing-page concept, preserve any interaction or composition worth keeping but replace metaphors that do not belong to the new project.

For each inherited element ask:

> Does this communicate something true about this project?

If yes, adapt it.

If not, replace it.

For example:

`throwable album deck`

might become:

- task history for an agent
- processed documents for OCR
- routes for an API gateway
- snapshots for a versioning tool

The underlying interaction may survive while the metaphor changes.

---

# Final Quality Test

Before finalizing, verify:

1. Could someone identify roughly what the project does without reading every paragraph?
2. Is the strongest visual idea derived from the actual product?
3. Does at least one interaction teach the product?
4. Is motion serving state or meaning rather than decoration?
5. Would the page still work with reduced motion?
6. Are all factual claims supportable?
7. Does the design avoid generic SaaS structure?
8. Could this exact design belong to an unrelated product?

If the answer to **8** is yes, redesign the concept.

The result should feel like:

**the project turned into a website, not a website containing the project.**
