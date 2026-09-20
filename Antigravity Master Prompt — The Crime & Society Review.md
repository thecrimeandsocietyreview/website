You are a **principal product designer, senior React frontend architect, and high-end editorial-platform UI engineer with 10+ years of experience** building premium research, publishing, institutional, SaaS, and knowledge platforms.

Build a complete, highly polished, production-quality **frontend-only academic journal website** for:

# THE CRIME & SOCIETY REVIEW

An interdisciplinary scholarly rolling-publication journal focused on crime, criminality, victimisation, justice, and society.

The website must feel like a **world-class scholarly research platform**, not a conventional university website, not an old-fashioned journal CMS, and absolutely not a stereotypical “crime website.”

The visual experience should communicate:

**Intellectual authority + evidence + interdisciplinarity + modern research + editorial credibility + technological sophistication.**

The website should be visually distinctive enough that someone can immediately recognize it as a premium publication platform.

---

# 1. NON-NEGOTIABLE TECHNOLOGY REQUIREMENTS

Build only the frontend.

### Required stack

- React
- Vite
- Tailwind CSS
- React Router
- JavaScript or TypeScript, preferably TypeScript
- Lucide React for icons
- CSS/SVG for visualizations wherever practical
- Local mock JSON/data objects for all content
- localStorage for lightweight persistence where useful
- No backend
- No database
- No authentication server
- No API calls
- No external CMS
- No payment integration
- No actual Crossref integration
- No actual ORCID OAuth
- No actual DOI minting
- No actual plagiarism detection
- No actual AI API
- No actual peer-review backend

All backend-dependent features should exist as **convincing frontend simulations using local mock data and UI states**.

The UI should make it obvious that these are interface demonstrations, not fake live integrations.

---

# 2. CORE PRODUCT PHILOSOPHY

Do NOT design this as:

- a generic blog
- a generic university department website
- an OJS clone
- a generic Bootstrap journal
- a dark “crime investigation” website
- a website filled with meaningless glassmorphism
- a dashboard template
- huge hero images with little scholarly content

Instead design it as:

> **A digital research environment where readers do not merely consume articles — they explore evidence, perspectives, relationships, citations, methodologies, and evolving scholarship.**

The defining conceptual feature is the **Rashomon Approach**.

The journal explicitly recognizes that complex crime-related phenomena cannot always be understood through one disciplinary lens.

Therefore the UI should repeatedly reinforce:

**ONE PHENOMENON → MULTIPLE PERSPECTIVES → CONNECTED EVIDENCE → DEEPER UNDERSTANDING**

This should become a recognizable visual language throughout the site.

---

# 3. BRAND / VISUAL DIRECTION

Create a premium academic identity with a subtle editorial/intellectual atmosphere.

## Preferred palette

Use a restrained sophisticated palette:

### Primary
- Deep ink navy / near-black
- Warm ivory
- Soft paper
- Charcoal

### Accent
Use a muted antique brass / warm amber accent very sparingly.

Optional secondary accent:
- muted oxblood / deep burgundy

Do NOT use bright red as a primary color.

Do NOT use cliché crime imagery.

Do NOT use:
- blood splatter
- guns
- handcuffs
- police tape
- criminal silhouettes
- fingerprints everywhere
- detective clichés
- dramatic “true crime” visual language

The subject is crime and society, but the brand is **academic and evidence-driven**.

The website must look appropriate for:
- researchers
- professors
- students
- legal scholars
- forensic scientists
- psychologists
- sociologists
- policy researchers
- practitioners
- institutions

---

# 4. TYPOGRAPHY

Use a sophisticated dual-type system.

### Display / article typography

Prefer:

**Source Serif 4 / Source Serif Pro / Charter-style serif**

Use for:
- article titles
- research article body
- long-form editorial content
- pull quotes
- scholarly passages

### Interface typography

Use:

**Inter**

Use for:
- navigation
- buttons
- filters
- metadata
- labels
- dashboards
- tables
- controls
- statistics

Typography must have a strong hierarchy.

Do not make every heading enormous.

Create calm editorial rhythm.

For article reading, maintain approximately:

- 65–75 characters per line
- generous 1.55–1.65 line-height
- comfortable paragraph spacing
- strong but restrained heading hierarchy

These reading constraints come directly from the research blueprint.

---

# 5. DESIGN PRINCIPLES

Use these principles across the entire product:

### 01 — Editorial calm

The page should never feel crowded.

### 02 — Evidence first

Metadata, authorship, DOI, publication date, methodology and citations should be visually meaningful.

### 03 — Progressive disclosure

Do not show everything simultaneously.

Reveal deeper information through:
- drawers
- expandable panels
- hover cards
- command palette
- inspector panels
- tabs
- contextual overlays

### 04 — Motion with purpose

Use subtle motion.

No excessive animations.

Use:
- 150–250ms transitions
- opacity transitions
- translateY 4–10px
- subtle scale
- spring-like drawer opening
- animated status changes

Avoid:
- huge page animations
- excessive parallax
- constantly moving elements
- distracting floating objects

### 05 — Research feels interactive

Interactions should make scholarship easier to understand, not merely decorate the interface.

---

# 6. GLOBAL NAVIGATION

Create a premium navigation system.

Desktop:

Left:
**THE CRIME & SOCIETY REVIEW**

Center navigation:

- Research
- Explore
- Archive
- About
- Submit

Right:

- Search
- Theme
- Menu / Account

Potential secondary navigation inside Research:

- Latest
- Featured Research
- Reviews
- Theory
- Methodology
- Commentary
- Blogs
- Perspectives

Mobile:
Use a clean full-screen navigation drawer.

The nav should become compact/sticky while scrolling.

Add subtle backdrop blur only where useful.

---

# 7. GLOBAL SEARCH / COMMAND PALETTE

Create a keyboard-accessible command palette.

Shortcut:

**⌘K / Ctrl+K**

When activated, open a centered premium search panel.

Sections:

### Search
“Search articles, authors, topics, concepts…”

### Quick navigation

- Latest Research
- Archive
- Explore
- Editorial Board
- Submit
- Ethics
- Aims & Scope

### Search results

Display:
- article title
- author
- discipline
- year
- article type
- matching keyword
- DOI badge

Support mock:
- keyword search
- author search
- discipline search
- methodology search

Use local mock data only.

---

# 8. HOME PAGE

The homepage is the most important page.

It must feel editorially sophisticated within the first 3 seconds.

Do NOT create a generic hero with one giant background photograph.

Instead use a **research-intelligence hero**.

## HERO

Layout:

Left approximately 55%:

Small eyebrow:

INTERDISCIPLINARY JOURNAL · ROLLING PUBLICATION

Large editorial headline:

**Understanding crime from more than one point of view.**

Supporting text based on the journal's actual mission:

The Crime & Society Review is an interdisciplinary scholarly journal examining crime, criminality, victimisation, justice, and society through multiple forms of evidence and disciplinary perspectives.

Right side:

Create a sophisticated **Rashomon visual**.

Do not use a conventional illustration.

Create an abstract SVG/network composition:

Central node:

**CRIME**

Around it:

- LAW
- FORENSICS
- PSYCHOLOGY
- SOCIOLOGY
- POLICING
- VICTIMOLOGY
- TECHNOLOGY
- POLICY

The nodes should subtly animate/pulse.

Hover a node:
- highlight connection lines
- slightly enlarge node
- show a small contextual tooltip

Click a node:
- navigate to Explore with that discipline filtered

This is a major signature element of the homepage.

---

# 9. HERO SECONDARY STRIP

Below hero create a slim editorial information strip.

Example:

**ROLLING PUBLICATION**

No issue waiting.

**MULTIDISCIPLINARY**

Multiple lenses. One phenomenon.

**EVIDENCE-INFORMED**

Research grounded in reason and evidence.

These should be elegant typographic blocks.

---

# 10. “LATEST RESEARCH” SECTION

Create a premium article grid.

Heading:

**Latest Research**

Subheading:

Recent scholarship across crime, justice and society.

Cards should include:

- Article type
- Publication date
- Title
- 1–2 line abstract excerpt
- Authors
- discipline tags
- reading time
- e-locator
- DOI-style identifier
- small arrow interaction

Cards should not all look identical.

Create subtle variations:
- large featured article
- two standard cards
- one “research note”
- one perspective article

Hover:
- card rises 3–5px
- arrow moves
- title underline or accent line animates
- metadata remains calm

---

# 11. RASHOMON FEATURE SECTION

This should be one of the most visually distinctive sections on the website.

Heading:

**One phenomenon. Many ways of seeing.**

Explain the conceptual approach using the actual journal philosophy.

Create a large interactive visual:

Central circle:

**A SINGLE CRIME-RELATED PHENOMENON**

Around it create six/seven disciplinary lenses:

LEGAL
FORENSIC
BEHAVIOURAL
SOCIOLOGICAL
POLICING
VICTIMOLOGICAL
TECHNOLOGICAL

When the user selects a perspective:

- the selected lens becomes primary
- surrounding nodes dim
- related research cards appear below
- contextual copy changes
- the connecting graph changes

Example:

Selected:

**FORENSIC**

Show:
“Evidence, laboratory methodologies, biological data and quantitative measurement.”

Selected:

**LEGAL**

Show:
“Statutory interpretation, procedural thresholds, case law and institutional mandates.”

Do this without backend.

Use local perspective data.

The journal explicitly defines the Rashomon Approach around these multiple disciplinary interpretations.

---

# 12. FEATURED ARTICLE / DEEP READING PREVIEW

Create a sophisticated split section.

Left:
Large serif title.

Right:
Mini interactive article preview.

Show:
- abstract
- author metadata
- citations
- methodology
- “Read in Rashomon Lens”
- “View citation context”

Add an animated scroll indicator.

This section should visually transition from marketing/homepage into actual scholarship.

---

# 13. EXPLORE PAGE

Route:

`/explore`

This should feel like a scholarly discovery engine.

Top:

Large title:

**Explore the research**

Search input.

Below:

filter toolbar.

Filters:

- Discipline
- Article type
- Methodology
- Year
- Perspective
- Author
- Topic
- Publication status

Create a dynamic result layout.

Left:
Filter rail

Center:
Research results

Right:
Optional “Research Map” panel.

Allow:
- list view
- compact view
- conceptual graph view

Use local mock state.

---

# 14. CONCEPT KNOWLEDGE GRAPH

Create a route or section:

`/explore/concepts`

Build an elegant SVG-based interactive knowledge graph.

Do NOT use a massive heavy 3D library.

Use lightweight SVG/canvas.

Nodes represent:

- concepts
- disciplines
- methods
- articles
- authors
- legal concepts
- forensic concepts
- technologies

Example central node:

**Predictive Policing**

Connected to:

- Algorithmic Bias
- Criminal Justice
- Surveillance
- Machine Learning
- Policing
- Ethics
- Civil Liberties

Hover:
show metadata.

Click:
open concept drawer.

The research blueprint proposes this type of interdisciplinary concept graph to reveal non-obvious connections across the archive.

Keep the graph lightweight.

---

# 15. ARCHIVE PAGE

Route:

`/archive`

This should not look like a boring list of PDF issues.

The journal is designed around rolling/continuous publication, so the archive should feel digital-first.

Top:

**Research Archive**

Controls:
- Search
- Year
- Discipline
- Article Type
- Methodology
- Topic

Show timeline / years.

Then article groups.

Every article:
- Title
- Authors
- year
- type
- discipline
- e-locator
- DOI
- status

Create a “Latest volume” treatment.

Also include:
“Continuous Publication”

Explain that articles can be presented as part of an open annual volume rather than depending entirely on traditional issue structures. This follows the research blueprint’s continuous-publication model.

---

# 16. ARTICLE PAGE — THE MOST IMPORTANT UI

Route:

`/article/:slug`

Build an advanced scholarly reader.

Do NOT create a normal blog article page.

Implement a responsive **three-zone reading environment**:

### LEFT

Research navigator.

Contains:
- Contents
- Sections
- Reading time
- Figures
- Tables
- References
- Related concepts

Sticky while reading.

### CENTER

Main article.

Constrain reading width.

Display:

- Article type
- title
- subtitle
- authors
- affiliations
- ORCID-style badges
- publication date
- Version of Record
- DOI
- e-locator
- license
- abstract
- keywords
- article body
- figures
- tables
- references

### RIGHT

Context Inspector.

Initially collapsed on smaller screens.

When user interacts with:
- citation
- figure
- table
- methodology
- concept
- author

open contextual information here.

This tri-pane concept is explicitly recommended in the research blueprint.

---

# 17. ARTICLE READING HEADER

At the top of article reader show:

`RESEARCH ARTICLE`

Large title.

Authors with small circular initials/avatar treatment.

Below:

`The Crime & Society Review · 2026 · e10492`

Then small metadata row:

- Version of Record
- Published
- DOI
- Open Access
- CC license

Create a subtle “Article status” chip.

---

# 18. ARTICLE READING TOOLBAR

Sticky reading toolbar:

- Contents
- Search in article
- Rashomon Lens
- Citation mode
- Annotation mode
- Reading theme
- Text size
- PDF
- Share

At mobile turn this into a bottom toolbar / compact drawer.

---

# 19. RASHOMON READING LENS

This is the signature feature.

Inside an article create:

**Rashomon Lens**

Controls:

`Neutral`
`Legal`
`Forensic`
`Behavioural`
`Sociological`
`Victimological`
`Technological`

When active, visually emphasize tagged article sections.

Since this is frontend-only, create mock semantic tags on article paragraphs.

Example:

A paragraph can have:

```ts
{
  text: "...",
  lenses: ["legal", "sociological"]
}
```

Selected lens changes visual emphasis.

Do not literally remove content.

Instead:
- relevant paragraphs increase emphasis
- related passages get subtle accent indicators
- unrelated passages reduce opacity slightly
- selected terminology gets underline
- inspector displays “Why this passage is relevant”

Allow:

**Neutral View**
to restore the normal reading experience.

Also create:

**Side-by-Side Perspective**

Two synchronized article columns.

Left:
Legal Lens.

Right:
Sociological Lens.

Scrolling one column should visually synchronize with the other.

This is a frontend simulation.

---

# 20. SMART CITATION INTERACTION

In the article body, create citations like:

`[14]`

Hover desktop:

show small citation card.

Click:

open right inspector.

Inspector includes:

**Citation 14**

Title

Authors

Year

Journal

DOI

Then:

### Citation context

Supporting
Mentioning
Contrasting

These are UI categories based on the research proposal for smart citation analysis.

Clearly label these as:
**Demo citation context**

since there is no live Scite integration.

Add:

“Open DOI”

as a disabled/mock button or external placeholder.

---

# 21. FIGURE / TABLE INSPECTOR

When clicking a figure inside the article:

Right inspector transforms into:

**Figure 02**

Large visual preview.

Caption.

Description.

Data points.

Buttons:

- Expand
- View data
- Download SVG — demo
- Cite figure

Do not force the reader to leave their position.

---

# 22. ARTICLE ANNOTATIONS

Create a mock scholarly annotation mode inspired by W3C-style annotation systems.

User clicks:

**Annotate**

Then selecting a paragraph opens a small inline popover:

“Add a scholarly note…”

Controls:
- Public note
- Private note
- Question
- Methodological observation
- Citation suggestion

Use localStorage to persist demo annotations.

Show a few preloaded example annotations.

Do NOT implement a real social network.

The research specifically proposes paragraph-level scholarly annotation and author clarification threads.

---

# 23. LIVING DOCUMENT / VERSION COMPARISON

Create a polished demo route:

`/article/:slug/versions`

Title:

**Article Evolution**

Two version selectors:

Version 1
Version 2

Show:

- Added passage
- Revised claim
- Removed passage
- Updated citation

Use Git-inspired visual diff.

Colors must be subtle and accessible, not aggressive.

Create a changelog sidebar.

Example:

`15 Mar 2026`
“Methodology section updated.”

`02 Apr 2026`
“Additional evidence added.”

`18 May 2026`
“Clarification to limitations.”

This feature is based on the research proposal for living scholarly documents and visual diffing.

---

# 24. ARTICLE “RESEARCH OBJECT” PANEL

At bottom of every article create:

**Explore this research**

Cards:

- Concepts
- Disciplines
- Methodology
- Related articles
- Cited references
- Citing articles
- Authors
- Datasets
- Supplementary materials

Make it feel like an interconnected scholarly object rather than a page ending at “References.”

---

# 25. AUTHOR PROFILE

Route:

`/author/:slug`

Premium researcher profile.

Include:

- name
- affiliation
- ORCID badge
- biography
- expertise
- publications
- disciplines
- research concepts
- contribution roles

Create:

**Research footprint**

with elegant metrics:

Publications
Citations
Topics
Collaborations

Use mock data.

Do not create fake institutional claims.

---

# 26. ABOUT PAGE

Route:

`/about`

Use the actual journal content from the supplied journal-details document as the authoritative source.

Sections:

1. About The Crime & Society Review
2. Aims & Scope
3. Editorial Philosophy
4. Rashomon Approach
5. Journal History
6. Publisher

Do not invent:
- founding dates
- people
- institutional affiliations
- ISSN
- offices
- rankings
- indexing status
- impact factor
- claims of accreditation

unless the source materials explicitly provide them.

The journal's philosophy emphasizes intellectual rigour, methodological integrity, interdisciplinarity, critical inquiry, scholarly openness, and evidence/reason as central principles.

---

# 27. AIMS & SCOPE PAGE

Route:

`/about/aims-scope`

Create beautiful reading-oriented layout.

Show the journal disciplines as an interactive constellation.

Include categories supported by the journal details:

- Criminology
- Criminal Justice
- Policing
- Forensic Science
- Forensic Psychology
- Law
- Sociology
- Victimology
- Penology
- Corrections
- Crime Prevention
- Cybercrime
- Cybersecurity
- Behavioural Sciences
- Criminal Investigation
- Organised Crime
- Terrorism and Extremism Studies
- Juvenile Justice
- Gender and Crime
- Emerging Criminality

On hover:
highlight connections.

Do not use dozens of colored badges.

---

# 28. EDITORIAL PHILOSOPHY PAGE

Create an elegant long-form editorial page.

Use large pull quotes.

Highlight concepts:

**Rigour**

**Integrity**

**Interdisciplinarity**

**Critical Inquiry**

**Scholarly Openness**

Make it look like an institutional manifesto, not a text dump.

---

# 29. RASHOMON APPROACH PAGE

Route:

`/about/rashomon`

Make this one of the signature pages.

Hero:

**The same phenomenon. Different vantage points.**

Then demonstrate:

### Legal lens

### Forensic lens

### Psychological lens

### Sociological lens

### Policing lens

### Victimological lens

Each panel interacts with the central visual.

Below explain that multiple perspectives are not automatically equal in evidentiary validity; rather, the approach examines how they complement, challenge, or complicate an explanation. This nuance is explicitly present in the journal source material.

---

# 30. EDITORIAL BOARD

Route:

`/editorial-board`

Create a premium directory.

Use mock profiles.

Every profile supports:

- name
- role
- field
- institution placeholder
- ORCID-style icon
- expertise

Important:

If real names are not provided in the source data, do NOT invent real people.

Use clearly marked demo placeholders.

Include:
- Editor-in-Chief
- Associate Editors
- Editorial Board
- Advisory Board

---

# 31. ETHICS & INTEGRITY

Route:

`/publishing/ethics`

Make this visually authoritative.

Sections:

- Research integrity
- Authorship
- Conflicts of interest
- Data integrity
- Image integrity
- Corrections
- Retractions
- Post-publication updates
- Editorial independence

Create a “Research Integrity Lifecycle” visualization:

Submission
→ Review
→ Publication
→ Monitoring
→ Correction
→ Retraction if necessary

The research blueprint specifically emphasizes transparent ethics, corrections/retractions registries, and governance structures.

---

# 32. POLICIES AREA

Create:

`/publishing/policies`

Cards:

- Peer Review Policy
- Publication Ethics
- Authorship
- Conflict of Interest
- Data Sharing
- Open Access
- Copyright & Licensing
- Corrections
- Retractions
- Self-Archiving
- Accessibility

Each opens a reading page or modal.

---

# 33. SUBMIT PAGE

Route:

`/submit`

This is a conversion page but must remain scholarly.

Hero:

**Submit your research**

Supporting message.

Show the process:

01
Prepare

02
Submit

03
Editorial Assessment

04
Peer Review

05
Revision

06
Publication

Create elegant step indicators.

CTA:

**Begin submission**

Secondary:
**Submission requirements**

---

# 34. FRONTEND-ONLY SUBMISSION WIZARD

Build a highly polished demo wizard.

Route:

`/submit/new`

Steps:

### Step 01 — Manuscript

Upload zone.

Drag & drop.

Show file preview.

### Step 02 — Metadata

Fields:

- Title
- Abstract
- Keywords
- Article type
- Discipline
- Methodology

### Step 03 — Authors

Add author rows.

Fields:

- Name
- Email
- Affiliation
- ORCID-style identifier

### Step 04 — Declarations

- conflict of interest
- data availability
- funding
- ethics statement
- acknowledgements

### Step 05 — Files

- manuscript
- figures
- supplementary material

### Step 06 — Review & Submit

Summary card.

Progress indicator.

Create realistic frontend validation.

Persist draft using localStorage.

Do not actually submit anywhere.

On submission:

show a beautiful confirmation screen:

**Submission received — demo**

with generated local tracking ID.

---

# 35. AUTHOR DASHBOARD

Route:

`/dashboard/author`

This dashboard should NOT look like generic SaaS analytics.

Use editorial styling.

Overview cards:

- Active submissions
- Under review
- Revision requested
- Published articles

Then:

### Submission timeline

Visual status:

Submitted
→ Editorial screening
→ Reviewer invitation
→ Peer review
→ Decision
→ Revision
→ Production

Create realistic mock statuses.

Add:

**Recent activity**

**Upcoming action**

**Messages**

**Your publications**

---

# 36. REVIEWER WORKSPACE

Route:

`/dashboard/reviewer`

Build a frontend simulation of a reviewer console.

Layout:

Left:
submission navigation.

Center:
manuscript.

Right:
review form.

Review form sections:

- Significance
- Originality
- Methodological rigour
- Clarity
- Evidence
- Limitations
- Recommendation

Create inline comment interaction.

Add “Review complete” progress indicator.

No actual submission.

---

# 37. EDITOR DASHBOARD

Route:

`/dashboard/editor`

Create an editorial command center.

Top KPIs:

- New submissions
- In review
- Revision
- Overdue
- Accepted
- Published

Then show a Kanban-style board:

**Submitted**
**Screening**
**Review**
**Revision**
**Production**
**Published**

Add drag-and-drop UI as a frontend interaction.

This is based on the research proposal for a real-time editorial Kanban interface.

---

# 38. REVIEWER MATCHING MOCK UI

Inside editor dashboard add:

**Reviewer suggestions**

Display 3 demo reviewer cards.

Each:
- expertise
- discipline
- topic match
- previous review count
- availability
- conflict status

Label clearly:

**Demo recommendation**

Do not imply that actual AI is running.

---

# 39. ANALYTICS

Create frontend analytics views.

Do not overwhelm.

Use elegant charts.

Metrics:

- submissions over time
- review turnaround
- publication volume
- article views
- citations
- top disciplines
- topic clusters

Use lightweight CSS/SVG charts rather than huge visualization frameworks wherever possible.

Research documentation recommends author/editor dashboards and rich KPI visualization.

---

# 40. ARTICLE TYPES

Create a consistent article-type taxonomy.

Examples supported by the journal material:

- Original Research
- Empirical Study
- Theoretical Contribution
- Conceptual Analysis
- Methodological Study
- Systematic Review
- Critical Review
- Commentary
- Blog / Research Insight

These should be visually distinguishable but restrained.

---

# 41. RESEARCH STORIES / BLOG

Create:

`/insights`

This is separate from peer-reviewed articles.

Use a magazine/editorial treatment.

Categories:
- Research Insight
- Field Note
- Commentary
- Interview
- Method
- Perspective

Again, do not invent claims about real research.

Use demo data where needed.

---

# 42. MULTI-LANGUAGE UI

Build the interface architecture so language switching is easy.

Implement a demo language selector.

For the first version:
English only is acceptable.

But structure text resources as objects so future i18n can be added without rewriting components.

---

# 43. READING THEMES

Implement three reading modes inspired by the research recommendations:

### Pristine Light

Warm-white / paper-like.

### Warm Sepia

Soft warm reading background.

### Deep OLED Dark

Dark, high-contrast reading environment.

Theme preference should persist using localStorage.

Ensure readability and focus states remain visible.

---

# 44. ACCESSIBILITY

Target WCAG 2.1 AA-level design.

Implement:

- semantic HTML
- keyboard navigation
- visible focus states
- aria labels
- accessible modal behavior
- accessible dropdowns
- accessible buttons
- sufficient contrast
- reduced-motion preference
- proper heading hierarchy
- alt text
- readable font sizes
- no information communicated by color alone

The research specifically calls for semantic structure, keyboard navigation, accessible figures, and multiple reading themes.

---

# 45. RESPONSIVE DESIGN

Do NOT simply shrink desktop layouts.

Design intentionally for:

### Mobile

375px+

### Tablet

768px+

### Laptop

1280px+

### Large desktop

1440–1920px+

Article reader:

Desktop:
three-pane

Tablet:
two-pane / collapsible inspector

Mobile:
single-column reading + bottom contextual drawer

Concept graph:
mobile-friendly zoom/pan or alternative list representation.

Submission wizard:
single column.

Dashboards:
cards collapse elegantly.

Tables:
horizontal scroll or card transformation.

---

# 46. MICROINTERACTIONS

Implement polished but subtle interactions.

Examples:

### Article card

Hover → arrow moves 4px.

### Search

Typing → result list subtly updates.

### Filter

Selected filter animates into active state.

### Submission

Completed step → checkmark animation.

### Upload

Progress bar → success state.

### Rashomon Lens

Lens changes → contextual content softly transitions.

### Inspector

Slide from right with 200–250ms transition.

### Theme

Smooth color transition.

### Knowledge graph

Node hover → connected nodes become emphasized.

### Button

Small press feedback.

No gratuitous animations.

---

# 47. SCROLL EXPERIENCE

Use natural scrolling.

For selected pages use subtle scroll-spy.

Article:

Left contents menu automatically highlights current section.

Do not use scroll-jacking.

Do not hijack mouse wheel.

Do not create unnecessarily long animation sequences.

---

# 48. SEARCH EXPERIENCE

Search UI should include:

Search input.

Suggestion categories:

Articles
Authors
Concepts
Disciplines
Methods

Mock results.

When selecting a result, navigate appropriately.

Highlight matching search terms.

---

# 49. FOOTER

Create a large editorial footer.

Column 1:
The Crime & Society Review

Mission statement.

Column 2:
Research
- Latest
- Archive
- Explore
- Articles
- Insights

Column 3:
Publishing
- Submit
- Peer Review
- Ethics
- Policies

Column 4:
Journal
- About
- Aims & Scope
- Rashomon Approach
- Editorial Board

Bottom:

Copyright

Privacy

Accessibility

Contact

License information where appropriate.

Keep it elegant.

---

# 50. PERFORMANCE REQUIREMENTS

This is extremely important.

The website should look premium **without becoming heavy**.

Avoid unnecessary large packages.

Prefer:
- CSS
- Tailwind
- SVG
- lightweight React state
- lazy loading
- code splitting
- route-level lazy imports

Do not load large visualization libraries globally if an SVG implementation can do the same job.

Do not use autoplay background videos.

Do not use huge unoptimized images.

Do not add excessive decorative assets.

Use:
- lazy images
- responsive image sizes
- SVG icons
- CSS gradients
- CSS textures
- minimal external assets

Target a fast initial load.

---

# 51. IMAGE DIRECTION

Do NOT rely on stock crime photos.

Use imagery only where genuinely useful.

Preferred visual subjects:

- archival documents
- research environments
- forensic textures
- abstract evidence structures
- maps
- data
- institutional architecture
- laboratories
- books
- manuscripts
- abstract interdisciplinary systems

Images should support scholarship rather than sensationalize crime.

For decorative hero visuals, prefer generated SVG/CSS compositions.

---

# 52. DATA ARCHITECTURE

Create a clean local data structure.

Example:

```ts
types/
  article.ts
  author.ts
  submission.ts
  reviewer.ts
  concept.ts
  perspective.ts

data/
  articles.ts
  authors.ts
  submissions.ts
  concepts.ts
  perspectives.ts
  editorialBoard.ts
  policies.ts
```

Example article object:

```ts
{
  id: "article-001",
  slug: "demo-article",
  type: "Original Research",
  title: "...",
  abstract: "...",
  authors: [...],
  publicationDate: "...",
  year: 2026,
  volume: "1",
  locator: "e1001",
  doi: "demo-doi",
  disciplines: ["Criminology", "Law"],
  methodology: "Empirical",
  concepts: [...],
  perspectives: [...],
  sections: [...]
}
```

Keep all UI data separate from components.

---

# 53. IMPORTANT CONTENT RULE

The supplied journal-details document is the source of truth for:

- About
- Aims & Scope
- Editorial Philosophy
- Rashomon Approach
- Journal History
- Publisher

Do not silently fabricate facts.

For demonstration articles, authors, editors, DOIs, metrics, citation counts, institutions, etc.:

Use obvious demo/sample data.

Do not present fictional records as real published scholarship.

---

# 54. COMPONENT SYSTEM

Build reusable components.

Suggested structure:

```text
src/
  app/
  components/
    navigation/
    article/
    archive/
    explore/
    rashomon/
    search/
    cards/
    forms/
    dashboard/
    charts/
    overlays/
    ui/
  pages/
  data/
  hooks/
  lib/
  types/
  styles/
```

Reusable components should include:

- Button
- Badge
- Chip
- Tooltip
- Modal
- Drawer
- Dropdown
- Tabs
- Accordion
- SearchCommand
- ArticleCard
- AuthorCard
- CitationCard
- CitationInspector
- ArticleNavigator
- RashomonSwitcher
- KnowledgeGraph
- Timeline
- StatusBadge
- DataTable
- SubmissionStepper
- ReviewPanel
- ThemeSwitcher
- ReadingToolbar

---

# 55. DESIGN TOKENS

Create centralized design tokens.

Examples:

```css
--background
--foreground
--surface
--surface-muted
--border
--accent
--accent-soft
--serif
--sans
--reading-width
--radius-small
--radius-medium
--shadow-soft
```

Do not scatter arbitrary colors everywhere.

Maintain consistent spacing.

Use a restrained radius system.

Avoid excessive rounded cards.

Academic UI should have some sharper editorial edges.

---

# 56. CARD DESIGN

Cards should vary depending on content.

Research article:
minimal editorial card.

Dashboard:
slightly more structured.

Policy:
document-style card.

Concept:
interactive node/card.

Author:
profile card.

Do not make every component:
`rounded-2xl bg-white shadow-xl`

That creates a generic AI-generated SaaS aesthetic.

---

# 57. VISUAL MOTIFS

Create a recurring visual language based on:

- fine editorial rules
- thin borders
- page-number-like metadata
- e-locator markers
- subtle grid structures
- annotation marks
- citation brackets
- evidence markers
- perspective nodes
- document margins
- research timelines

Use these sparingly.

---

# 58. “SCHOLARLY SIGNAL” DETAILS

Add tiny high-end details:

Article cards can show:

`RESEARCH ARTICLE`

`CSR · 2026 · e10492`

Use monospace or compact sans typography for identifiers.

Author:
`ORCID`

License:
`CC`

Status:
`VERSION OF RECORD`

These tiny metadata elements should make the site feel credible and research-native.

---

# 59. DOI / METADATA UI

On article pages create:

**Persistent identifiers**

DOI
ORCID
e-locator

**Metadata**

Publication date
Article type
Volume
License
Keywords

Do not build real integrations.

Make them polished static/demo interfaces.

The research recommends treating DOIs, ORCID, ROR and CRediT as first-class scholarly identifiers.

---

# 60. CRediT CONTRIBUTOR PANEL

On author information create an expandable section:

**Contributor Roles**

Example:

Conceptualization
Methodology
Investigation
Analysis
Writing
Visualization

Use mock roles.

Keep the UI compact.

---

# 61. ARTICLE METRICS

Create a compact article impact panel:

Views
Downloads
Citations
Shares

Do NOT imply these are real.

Label them:

**Demo metrics**

or populate only when using demonstration articles.

---

# 62. EMPTY STATES

Every major interactive page must have beautiful empty states.

Examples:

“No manuscripts in this stage.”

“No annotations yet.”

“No articles match these filters.”

“No saved research.”

Avoid generic:

“Oops!”

Instead use calm scholarly language.

---

# 63. LOADING STATES

Implement skeleton loaders for:

- Article cards
- Search
- Explore results
- Dashboard
- Author profiles
- Article inspector

No giant loading spinner.

Use subtle skeleton shimmer.

---

# 64. ERROR STATES

Create:

- search error
- missing article
- missing author
- invalid route
- failed local operation

Design them professionally.

---

# 65. 404 PAGE

Create a sophisticated editorial 404.

Example:

Large:

**404**

Small line:

“This page could not be located in the archive.”

Actions:

Return to Research

Explore Archive

Search

---

# 66. DARK MODE

Dark mode must not simply invert colors.

Use:

deep ink background
soft warm-white text
muted borders
subtle brass accents

Article dark reading mode should be especially comfortable.

Support:

system preference

manual toggle

persistent local preference

---

# 67. MOTION ACCESSIBILITY

Respect:

`prefers-reduced-motion`

When enabled:
- disable large transitions
- disable graph pulsing
- disable parallax
- keep functional transitions minimal

---

# 68. PAGE TRANSITIONS

Use simple route transition:

fade + 4px vertical movement.

No theatrical full-screen wipe.

---

# 69. DEMO CONTENT

Populate the application enough that every page feels complete on first launch.

Use several demo articles, authors, concepts, submissions and policies.

Do not use Lorem Ipsum.

Create believable scholarly placeholder text appropriate to criminology/social science.

Clearly distinguish demo records from official journal claims.

---

# 70. INITIAL LANDING EXPERIENCE

When the app opens:

1. Elegant navbar.
2. Research-oriented hero.
3. Rashomon visual.
4. Latest research.
5. Interdisciplinary exploration.
6. Featured article.
7. Research archive preview.
8. Publishing CTA.
9. Footer.

The homepage should have enough content to demonstrate the entire design system.

---

# 71. INTERACTION QUALITY

Before considering the project complete, test:

- all navigation links
- search
- filters
- article cards
- article reader
- citation inspector
- figure inspector
- Rashomon lens
- annotations
- version comparison
- submission wizard
- localStorage draft
- author dashboard
- reviewer dashboard
- editor Kanban
- theme switching
- mobile menu
- responsive layout
- keyboard navigation
- modal close behavior
- drawers
- command palette

Nothing should be a dead-looking button.

If functionality is not connected to a backend, simulate it locally and give appropriate feedback.

---

# 72. ROUTES

Implement at least these routes:

```text
/
 /research
 /research/latest
 /research/featured
 /research/insights

 /explore
 /explore/concepts

 /archive

 /article/:slug
 /article/:slug/versions

 /author/:slug

 /about
 /about/aims-scope
 /about/editorial-philosophy
 /about/rashomon
 /about/history
 /about/publisher

 /editorial-board

 /publishing/ethics
 /publishing/policies
 /publishing/open-access
 /publishing/peer-review

 /submit
 /submit/new

 /dashboard/author
 /dashboard/reviewer
 /dashboard/editor

 /contact
```

Routes can reuse components but should look like intentional pages, not placeholder screens.

---

# 73. CONTACT PAGE

Create a professional institutional contact page.

Sections:

General enquiries
Editorial enquiries
Submission support
Publishing questions

Use frontend-only contact form.

Inputs:
- name
- email
- enquiry type
- subject
- message

On submit:
show frontend success state.

Do not actually send email.

---

# 74. MOBILE NAVIGATION

On mobile:

Header:

Logo

Search

Menu

Menu opens full-height drawer with:

Research
Explore
Archive
About
Publishing
Submit

Account/dashboard if applicable.

Add a small journal description.

---

# 75. DESKTOP HEADER BEHAVIOUR

At top:

transparent / editorial header.

After scroll:

slightly opaque surface
thin bottom border
compact height
subtle blur

Do not overdo blur.

---

# 76. ARTICLE READER MOBILE BEHAVIOUR

On mobile article:

top metadata
title
authors
abstract
body

Bottom sticky toolbar:

Contents
Lens
Citation
Theme

Inspector becomes bottom sheet.

Citation cards become bottom sheets.

Figures open full-screen lightbox.

---

# 77. INTERACTIVE DATA SANDBOX DEMO

Create a demo section inside selected articles:

**Interactive Evidence**

Include:
- a small chart
- dataset table
- slider
- toggle
- variable selector

Example:

`Population`
`Time`
`Scenario`

Changing the slider updates a simple SVG visualization.

No actual scientific calculation required.

Label it:

**Interactive demonstration**

The research proposes executable notebooks and browser-based research sandboxes as a next-generation capability.

---

# 78. RESEARCH MAP

Create an optional homepage/explore module:

**The research landscape**

Show topics as connected nodes.

Allow:
- hover
- filter
- click
- zoom

Keep implementation lightweight.

---

# 79. VISUAL DIFFERENTIATION

The most important thing:

Do NOT make this look like an AI-generated website template.

Avoid predictable patterns such as:

- giant centered heading
- three colorful cards
- enormous rounded rectangles
- excessive gradients
- random floating blobs
- glassmorphism everywhere
- generic purple/blue AI colors

Use **editorial sophistication**.

Think:

high-end academic journal
+
research knowledge platform
+
modern institutional publication
+
digital reading environment

---

# 80. FIRST IMPRESSION TEST

When viewing the homepage with no scrolling, the user should immediately understand:

1. What the journal is.
2. What makes it different.
3. That it is interdisciplinary.
4. That research is central.
5. That the website itself is technologically advanced.

The central visual should communicate the Rashomon philosophy immediately.

---

# 81. CODE QUALITY

Use:

- reusable components
- clean props
- typed data
- semantic HTML
- no huge monolithic components
- no duplicated markup
- reusable utility functions
- centralized data
- route-level lazy loading
- sensible comments only where necessary

Do not generate a single 3,000-line App.tsx.

Break the system into proper modules.

---

# 82. NO BACKEND RULE

Do not create:

- Express server
- API server
- PostgreSQL
- MongoDB
- Firebase backend
- Supabase backend
- authentication server
- Stripe
- Crossref API calls
- ORCID OAuth
- Scite API
- Hypothesis API
- OpenAI API

The website must run completely as a frontend application.

Where these systems are discussed in the UI, create polished **demo states**.

---

# 83. FRONTEND SIMULATION RULE

For backend-like features:

Submission:
→ localStorage

Dashboard:
→ mock data

Peer review:
→ mock data

Annotations:
→ localStorage

Theme:
→ localStorage

Search:
→ local filtering

Knowledge graph:
→ local graph data

Metrics:
→ static/demo data

Version history:
→ local version objects

No network dependency.

---

# 84. SEO-FRIENDLY STRUCTURE

Even though this is a React frontend, structure pages semantically.

Use:

- proper `<title>`
- meta description
- canonical-looking URL structure
- semantic headings
- article markup
- accessible navigation
- meaningful page content

For demo purposes, article pages should contain metadata fields corresponding to the research platform's recommended scholarly metadata model.

The research specifically identifies Highwire Press-style citation metadata, Dublin Core, DOI, ORCID and stable article URLs as important discovery considerations.

Do not implement a fake backend metadata pipeline.

---

# 85. FINAL UI POLISH PASS

After implementing all pages:

Perform a visual consistency pass.

Check:

- typography
- spacing
- borders
- button sizes
- icon alignment
- mobile breakpoints
- hover states
- keyboard focus
- drawer animations
- card hierarchy
- dark mode
- loading states
- empty states
- form validation

Remove anything that looks generic.

Reduce visual noise.

Make whitespace intentional.

---

# 86. QUALITY BAR

The finished result should feel comparable in visual sophistication to a premium modern editorial/research platform.

It should have:

**Strong typography**

**Sophisticated information architecture**

**High-quality microinteractions**

**Research-native interactions**

**A distinctive Rashomon visual system**

**Advanced article reading interface**

**Excellent mobile behavior**

**Excellent accessibility**

**Fast frontend performance**

**Clean React architecture**

**Beautiful responsive layouts**

---

# 87. DEVELOPMENT ORDER

Build in this order:

### Phase 1

Design system

- colors
- typography
- spacing
- buttons
- navigation
- cards
- overlays
- themes

### Phase 2

Core public experience

- homepage
- research
- archive
- explore
- about
- editorial board
- policies

### Phase 3

Signature research experience

- article reader
- tri-pane layout
- citations
- inspector
- Rashomon Lens
- annotations
- concept graph
- version comparison

### Phase 4

Frontend workflow simulations

- submission
- author dashboard
- reviewer dashboard
- editor dashboard
- Kanban
- analytics

### Phase 5

Polish

- responsive behavior
- accessibility
- loading states
- empty states
- microinteractions
- performance
- code cleanup

---

# 88. ACCEPTANCE CRITERIA

The project is NOT complete merely because every route renders.

It is complete when:

### Design

The website looks premium, coherent and distinctive.

### Content

The journal's identity and supplied source material are accurately represented.

### UX

Navigation and discovery are intuitive.

### Research

The Rashomon concept is actually expressed through interaction rather than merely mentioned in text.

### Article reading

The article interface feels substantially better than a conventional PDF/article page.

### Interactivity

Major controls work.

### Responsiveness

The mobile experience is intentionally designed.

### Accessibility

Keyboard navigation and semantic structure work.

### Performance

There is no unnecessary heavy dependency or asset loading.

### Architecture

Components and data are organized cleanly.

### Backend

There is absolutely no backend dependency.

---

# 89. MOST IMPORTANT DESIGN INSTRUCTION

Do not treat the novel features as a list of gimmicks.

Integrate them into one coherent product concept.

The flow should feel like:

**DISCOVER**

→ find research

**UNDERSTAND**

→ read deeply

**COMPARE**

→ use Rashomon perspectives

**VERIFY**

→ inspect citations/evidence

**CONNECT**

→ explore concepts

**DISCUSS**

→ annotations

**TRACE**

→ article versions

**SUBMIT**

→ contribute new scholarship

That is the experience this product should deliver.

---

# 90. FINAL IMPLEMENTATION INSTRUCTION TO ANTIGRAVITY

Start by generating the complete React + Tailwind application.

Do not stop at wireframes.

Do not create placeholder rectangles where a real component can be built.

Do not produce only the homepage.

Build the complete frontend experience described above.

Use realistic mock data.

Use the supplied journal source material faithfully for official journal copy.

Do not invent institutional facts.

Make every major interaction functional within the frontend.

Keep the application lightweight.

Prioritize the quality of:

1. Homepage
2. Article reader
3. Rashomon Lens
4. Explore
5. Archive
6. Submission workflow
7. Dashboards
8. About/Rashomon pages

The final product should communicate:

> **The Crime & Society Review is not simply a place where research is published. It is a sophisticated digital environment for examining crime, justice and society from multiple perspectives.**

Build it accordingly.