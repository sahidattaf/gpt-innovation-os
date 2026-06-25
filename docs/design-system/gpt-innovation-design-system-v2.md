# GPT Innovation by Attaf — Design System v2.0

**Owner:** Sahid Attaf  
**Brand:** GPT Innovation by Attaf  
**Status:** Draft for implementation  
**Updated:** 2026-06-24

---

## 1. Purpose

This document defines the visual and operational design system for **GPT Innovation by Attaf**. It should be treated as the single source of truth for websites, apps, dashboards, flyers, proposals, client assets, social graphics, AI service pages, and internal operating systems.

The design system supports:

- GPT Innovation by Attaf
- Hospitality OS
- BOSSA AI OS
- GPT Marketplace
- Pietermaai Business Hub
- Future client dashboards, portals, and automation products

---

## 2. Overall Assessment

**Score: 9.6 / 10**

The current system already includes:

- Design tokens
- Typography
- Components
- Layout templates
- Brand guidelines
- Spacing system

This is enough to build a consistent website, app, dashboard, and marketing asset library.

---

## 3. Color Tokens

### Core Colors

```css
:root {
  --navy: #0F172A;
  --navy-700: #1E293B;
  --white: #FFFFFF;
  --bg-light: #F8FAFC;

  --ai-blue: #2563EB;
  --ai-blue-hover: #1D4ED8;
  --ai-blue-soft: #DBEAFE;

  --cyan: #22D3EE;
  --cyan-soft: #CFFAFE;

  --purple: #7C3AED;
  --purple-soft: #EDE9FE;

  --green: #10B981;
  --green-soft: #D1FAE5;

  --warning: #F59E0B;
  --warning-soft: #FEF3C7;

  --danger: #DC2626;
  --danger-soft: #FEE2E2;
}
```

### Slate Scale

```css
:root {
  --slate-100: #F1F5F9;
  --slate-200: #E2E8F0;
  --slate-300: #CBD5E1;
  --slate-400: #94A3B8;
  --slate-500: #64748B;
  --slate-600: #475569;
  --slate-700: #334155;
  --slate-900: #0F172A;
}
```

### Semantic Tokens

```css
:root {
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-accent: #22D3EE;
  --color-automation: #7C3AED;

  --surface-page: #F8FAFC;
  --surface-card: #FFFFFF;
  --surface-raised: #FFFFFF;
  --surface-inverse: #0F172A;
  --surface-tint: #DBEAFE;

  --border-subtle: #E2E8F0;
  --border-default: #CBD5E1;

  --success: #10B981;
  --info: #2563EB;
}
```

---

## 4. Typography

| Token | Font | Use |
|---|---|---|
| Display | Space Grotesk | Headlines, hero sections, big titles |
| Body | Plus Jakarta Sans | Paragraphs, cards, navigation, UI labels |
| Mono | JetBrains Mono | Code, token labels, system prompts, technical blocks |

### Type Rules

- Use strong display headings for strategic sections.
- Keep body text clean, practical, and easy to scan.
- Use mono only for code, prompts, tokens, and implementation notes.

---

## 5. Spacing System

Use a **4px base grid**.

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

---

## 6. Radii and Shadows

### Radii

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 999px;
}
```

### Shadows

```css
:root {
  --shadow-soft: 0 8px 24px rgba(15, 23, 42, 0.08);
  --shadow-card: 0 12px 32px rgba(15, 23, 42, 0.10);
  --shadow-glow-blue: 0 0 40px rgba(37, 99, 235, 0.22);
  --shadow-glow-cyan: 0 0 40px rgba(34, 211, 238, 0.22);
}
```

---

## 7. Logo Specifications

Add a dedicated logo section to the visual system.

### Required Logo Variants

- Primary logo
- Logo full lockup
- Logo icon only
- Logo on white
- Logo on navy
- Monochrome version
- Favicon / app icon

### Logo Usage Rules

- Minimum width: 120px for full logo
- Minimum icon size: 32px
- Clear space: equal to the height of the logo mark
- Do not stretch, rotate, recolor randomly, or place on busy backgrounds

---

## 8. Icon Library

Use **Lucide Icons** as the default icon system.

### Core Icon Set

- Brain
- Bot
- Building2
- Hotel
- ChefHat
- Globe
- Cloud
- Database
- BarChart3
- Sparkles
- Rocket
- Shield
- Zap
- Phone
- Mail
- Calendar
- Workflow
- MessageCircle
- FileText
- LayoutDashboard

---

## 9. AI Illustration and Photography Style

### Photography

- Real people
- Real business settings
- Hospitality and real estate contexts
- Luxury but not exaggerated
- Natural lighting
- Minimal editing
- Curaçao / Caribbean environment when relevant

### Illustrations

- Glass UI
- Wireframes
- AI particles
- Blue gradients
- Floating dashboards
- Modern isometric
- No childish cartoons
- No overused robot clichés

---

## 10. Motion Guidelines

| Interaction | Rule |
|---|---|
| Hover | 150ms |
| Card hover | Scale 1.02 |
| Fade | 250ms |
| Page transition | 400ms |
| Loading skeleton | Pulse |
| Button hover | Lift 2px |
| Dropdown | Ease-out |

Keep motion subtle, premium, and useful.

---

## 11. Grid System

| Device | Grid |
|---|---|
| Desktop | 12 columns |
| Tablet | 8 columns |
| Mobile | 4 columns |

### Containers

- Max container: 1280px
- Content width: 720px
- Section padding desktop: 80px vertical
- Section padding mobile: 48px vertical

---

## 12. Brand Voice

GPT Innovation by Attaf should sound:

- Professional
- Helpful
- Innovative
- Practical
- Friendly
- Business-focused
- ROI-aware
- Automation-focused
- Clear and direct

Avoid:

- Empty hype
- Excessive buzzwords
- Overpromising
- Confusing technical language for non-technical clients

Core language themes:

- Save time
- Improve operations
- Automate follow-up
- Build smarter workflows
- Turn AI into daily business value
- Measure what matters

---

## 13. Components

### Buttons and Badges

- Primary button
- Secondary button
- Ghost button
- Icon button
- CTA badge
- Status badge
- AI-powered badge

### Inputs

- Text input
- Textarea
- Select
- Search input
- Checkbox
- Toggle
- Form field with label, helper, and error state

### Brand Cards and Flows

- ServiceCard
- PackageCard
- AutomationFlow
- AgentCard
- IndustryCard
- TestimonialCard
- PricingCard
- KPIWidget

---

## 14. Brand Layouts

### Existing Layouts

- AI Tool Stack
- Client Proposal Slide
- Service Flyer
- Small Business Packages
- Website Hero
- WhatsApp Outreach

### Missing Layouts to Add

- Landing Page
- Pricing Page
- Contact Page
- Case Study
- Dashboard
- CRM
- Chat Interface
- Admin Panel
- Proposal
- Invoice
- Email Template
- Newsletter
- Blog
- FAQ
- 404
- Login
- Register

---

## 15. Industry Templates

### Hospitality

- Restaurant
- Hotel
- Beach Club
- Resort
- Food Truck

### Real Estate

- Agent
- Developer
- Broker
- Property Listing
- Investment

### Small Business

- Retail
- Accounting
- Healthcare
- Construction
- Legal
- Car Rental
- Logistics

---

## 16. AI Components

This is where the GPT Innovation brand becomes unique.

- AI Chat Widget
- Voice Assistant
- Workflow Timeline
- Automation Builder
- Prompt Library
- Agent Cards
- Knowledge Base
- AI KPI Dashboard
- Task Automation
- Meeting Summary
- Voice Recorder
- Proposal Generator

---

## 17. Dashboard Widgets

- Today's Leads
- Open Projects
- AI Automations
- Revenue
- Pipeline
- WhatsApp
- Google Reviews
- Website Analytics
- Tasks
- Calendar
- Invoices
- Support Tickets

---

## 18. Export Kits

### Web

- React
- Tailwind
- HTML
- Figma

### Print

- Canva
- PowerPoint
- Notion
- PDF

### Social

- Instagram
- LinkedIn
- Facebook
- WhatsApp
- YouTube
- TikTok

---

## 19. Final Structure

```text
GPT Innovation Design System

├── Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Grid
│   ├── Shadows
│   ├── Radii
│   ├── Motion
│   └── Icons
│
├── Brand
│   ├── Logo
│   ├── Voice
│   ├── Photography
│   ├── Illustration
│   └── AI Identity
│
├── Components
│   ├── Buttons
│   ├── Inputs
│   ├── Cards
│   ├── Tables
│   ├── Dashboard Widgets
│   ├── AI Widgets
│   └── Forms
│
├── Layouts
│   ├── Website
│   ├── Dashboard
│   ├── Landing Page
│   ├── Proposal
│   ├── Flyer
│   ├── Pricing
│   ├── Contact
│   └── Case Study
│
├── Industries
│   ├── Hospitality
│   ├── Real Estate
│   ├── Retail
│   ├── Healthcare
│   ├── Logistics
│   └── Professional Services
│
└── Marketing
    ├── Social
    ├── Presentation
    ├── Brochure
    ├── Email
    ├── Business Card
    └── WhatsApp
```

---

## 20. Claude Design Cloud Prompt

Use this prompt inside Claude Design / Cloud Design.

```text
You are designing the official GPT Innovation by Attaf design system.

Create a premium, modern, AI-first design system for an AI consulting and automation company based in Curaçao.

Brand: GPT Innovation by Attaf
Positioning: Practical AI partner for small and medium businesses.
Industries: hospitality, real estate, restaurants, car rental, logistics, retail, healthcare, construction, professional services.

Use these design tokens:

Colors:
--navy #0F172A
--navy-700 #1E293B
--white #FFFFFF
--bg-light #F8FAFC
--ai-blue #2563EB
--ai-blue-hover #1D4ED8
--ai-blue-soft #DBEAFE
--cyan #22D3EE
--cyan-soft #CFFAFE
--purple #7C3AED
--purple-soft #EDE9FE
--green #10B981
--warning #F59E0B
--danger #DC2626

Typography:
Display: Space Grotesk
Body: Plus Jakarta Sans
Mono: JetBrains Mono

Create:
1. Website hero
2. Service flyer
3. Small business package pricing grid
4. WhatsApp outreach graphic
5. AI tool stack diagram
6. Client proposal slide
7. Dashboard UI preview
8. AI chat widget
9. Agent cards
10. Case study layout

Style:
Premium, clean, practical, trustworthy, modern, AI-first.
Use soft gradients, glass cards, navy/blue/cyan accents, rounded corners, subtle shadows, and a 4px spacing grid.

Avoid:
Cartoons, excessive hype, random colors, messy gradients, childish robot visuals, and generic tech clutter.

Output:
A complete reusable design system with tokens, components, layouts, and usage notes.
```

---

## 21. Cloud Design Setup Steps

### Step 1 — Open Claude Design

Open your Claude Design / Cloud Design workspace and choose **Design System** as the starting context.

### Step 2 — Paste the Master Prompt

Paste the prompt from section 20.

### Step 3 — Generate Foundations First

Ask Claude:

```text
Generate only the Foundations section first: colors, typography, spacing, grid, radii, shadows, and motion.
```

### Step 4 — Generate Components

Ask:

```text
Now generate reusable components: buttons, cards, inputs, badges, pricing cards, service cards, AI agent cards, and dashboard widgets.
```

### Step 5 — Generate Brand Layouts

Ask:

```text
Now generate the six brand layouts: Website Hero, Service Flyer, Small Business Packages, WhatsApp Outreach, AI Tool Stack, and Client Proposal Slide.
```

### Step 6 — Generate Industry Variants

Ask:

```text
Create industry-specific variants for Hospitality, Real Estate, Car Rental, Restaurant, Logistics, Retail, and Professional Services.
```

### Step 7 — Export

Export assets for:

- Website
- Canva
- Figma
- Notion
- PDF
- Social media
- Client proposals

---

## 22. Implementation Recommendation

Use this design system as the visual operating layer for all GPT Innovation assets.

Recommended order:

1. Finalize logo variants
2. Generate website hero
3. Generate service flyer
4. Generate pricing cards
5. Generate proposal slide
6. Generate WhatsApp outreach graphic
7. Build Tailwind token file
8. Connect to GPT Innovation website repository

---

## 23. Tailwind Token Starter

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        'navy-700': '#1E293B',
        'ai-blue': '#2563EB',
        'ai-blue-hover': '#1D4ED8',
        'ai-blue-soft': '#DBEAFE',
        cyan: '#22D3EE',
        'cyan-soft': '#CFFAFE',
        purple: '#7C3AED',
        'purple-soft': '#EDE9FE',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#DC2626',
        slate: {
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          900: '#0F172A'
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px'
      },
      boxShadow: {
        soft: '0 8px 24px rgba(15, 23, 42, 0.08)',
        card: '0 12px 32px rgba(15, 23, 42, 0.10)',
        'glow-blue': '0 0 40px rgba(37, 99, 235, 0.22)',
        'glow-cyan': '0 0 40px rgba(34, 211, 238, 0.22)'
      }
    }
  }
};
```

---

## 24. Next Action

Treat this as **Design System v2.0** and use it to generate the first production assets:

1. GPT Innovation service flyer
2. GPT Innovation website hero
3. GPT Innovation pricing cards
4. GPT Innovation proposal slide
5. GPT Innovation WhatsApp outreach graphic
