# Practix Design System — Color, Typography & Spacing Reference

## When to Use This Skill
Reference this whenever building UI that should match the Practix platform visual language. These are the exact values used in Practix Hub and Meridian MMM.

---

## Color System

### Foundation: Slate Neutrals
The Practix platform uses Tailwind's **slate** scale as its neutral palette — NOT gray, NOT zinc.

| Token | Hex | Usage |
|-------|-----|-------|
| `slate-50` | #f8fafc | Page background, content area |
| `slate-100` | #f1f5f9 | Alternate row backgrounds, subtle fills |
| `slate-200` | #e2e8f0 | Borders, dividers |
| `slate-300` | #cbd5e1 | Disabled text, muted borders |
| `slate-400` | #94a3b8 | Placeholder text, chart axis labels |
| `slate-500` | #64748b | Secondary/tertiary text |
| `slate-600` | #475569 | Description text, subheadings |
| `slate-700` | #334155 | Sidebar hover/active states |
| `slate-800` | #1e293b | Sidebar background, header background |
| `slate-900` | #0f172a | Primary text (headings, titles) |

### Primary Accent: Blue
Used for interactive elements, active states, focus rings, and primary actions.

| Token | Hex | Usage |
|-------|-----|-------|
| `blue-50` | #eff6ff | Selected item background |
| `blue-100` | #dbeafe | Date range fill, info backgrounds |
| `blue-400` | #60a5fa | Logo accent in sidebar |
| `blue-600` | #2563eb | Primary buttons, active nav, focus rings |
| `blue-700` | #1d4ed8 | Button hover state |

### Secondary Accent: Teal
Used in Meridian MMM for positive metrics and secondary emphasis.

| Token | Hex | Usage |
|-------|-----|-------|
| `teal-100` | #ccfbf1 | Info badges |
| `teal-500` | #14b8a6 | Secondary accent (with /60 opacity for backgrounds) |
| `teal-600` | #0d9488 | Positive metric text |
| `teal-700` | #0f766e | Strong secondary emphasis |

### Status Colors

| Status | Background | Text | Border |
|--------|-----------|------|--------|
| Success/Positive | `green-100` | `green-800` | `green-200` |
| Error/Negative | `red-50` / `red-100` | `red-700` / `red-800` | `red-200` |
| Warning | `amber-50` / `orange-50` | `orange-800` / `amber-700` | `orange-200` |
| Caution | `yellow-50` / `yellow-100` | `yellow-700` | `yellow-200` |
| Info | `blue-50` | `blue-700` | `blue-200` |

**Important**: Meridian prefers softer status colors. Use teal-500/60 + teal-700 for positive and orange-400/60 + orange-600 for negative, rather than sharp green/red. Hub uses standard green/red.

### Semantic Color Mapping (Meridian Theme System)
Meridian uses CSS variables for multi-client theming. The Practix default values:

```css
--color-header-bg: #1e293b;      /* slate-800 */
--color-header-text: #ffffff;
--color-nav-bg: #1e293b;          /* slate-800 */
--color-nav-text: #ffffff;
--color-nav-active-bg: #334155;   /* slate-700 */
--color-nav-hover-bg: #334155;    /* slate-700 */
--color-text-primary: #0f172a;    /* slate-900 */
--color-text-secondary: #475569;  /* slate-600 */
--color-text-tertiary: #94a3b8;   /* slate-400 */
--color-border-default: #e2e8f0;  /* slate-200 */
--color-bg-primary: #ffffff;
--color-bg-secondary: #f8fafc;    /* slate-50 */
```

---

## Typography

### Font Stack
System fonts only — no custom web fonts. Tailwind's default sans-serif stack:
```
font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"
```

### Type Scale

| Element | Classes | Example |
|---------|---------|---------|
| Page title | `text-xl font-semibold text-slate-800` | "Executive Dashboard" |
| Section heading | `text-lg font-semibold text-slate-800` | "Media Investment" |
| Card title | `text-sm font-medium text-slate-600` | "Total Spend" |
| KPI value | `text-2xl font-bold text-slate-900 tabular-nums` | "$4.23MM" |
| Body text | `text-sm text-slate-600` | Description paragraphs |
| Label | `text-xs font-medium text-slate-500 uppercase tracking-wider` | "WEEK OVER WEEK" |
| Table header | `text-xs font-medium text-slate-500 uppercase tracking-wide` | Column headers |
| Table cell | `text-sm text-slate-700 tabular-nums` | Data values |
| Helper text | `text-xs text-slate-400` | Timestamps, metadata |

**Critical**: Always use `tabular-nums` on numeric values and currency amounts for proper column alignment.

---

## Spacing System

### Page-Level
| Area | Value |
|------|-------|
| Page padding | `p-6` (24px) |
| Section gap | `space-y-6` (24px) |
| Card grid gap | `gap-4` or `gap-6` |

### Component-Level
| Element | Value |
|---------|-------|
| Card padding | `p-5` or `p-6` |
| Card border radius | `rounded-lg` |
| Card border | `border border-slate-200` |
| Card shadow | `shadow-sm` |
| Button padding | `px-4 py-2` (primary), `px-3 py-1.5` (secondary) |
| Input padding | `px-3 py-2` |
| Nav item padding | `px-3 py-3` |
| Icon size (nav) | `w-5 h-5` |
| Icon size (inline) | `w-4 h-4` |
| Element gaps | `gap-2` (8px) or `gap-3` (12px) |

### Grid Patterns
```
/* KPI cards - 3 or 4 columns */
grid grid-cols-1 md:grid-cols-3 gap-4

/* Feature cards */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

/* Dashboard with sidebar chart */
grid grid-cols-1 lg:grid-cols-12 gap-6
/* Main: lg:col-span-8, Side: lg:col-span-4 */
```

---

## Layout Architecture

### The Practix Layout Pattern
```
┌────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌──────────────────────────────────┐  │
│ │          │ │  Header (slate-800, h-16)        │  │
│ │ Sidebar  │ │  [Logo area]    [User Profile]   │  │
│ │ w-64     │ ├──────────────────────────────────┤  │
│ │ bg-slate │ │                                  │  │
│ │ -800     │ │  Main Content Area               │  │
│ │          │ │  bg-slate-50                      │  │
│ │ Nav items│ │  p-6                             │  │
│ │ px-3     │ │                                  │  │
│ │          │ │  [Cards, tables, charts...]      │  │
│ │          │ │                                  │  │
│ │ ──────── │ │                                  │  │
│ │ Settings │ │                                  │  │
│ │ Feedback │ │                                  │  │
│ └──────────┘ └──────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Key Layout Rules
1. **Sidebar is always present** — 256px wide (`w-64`), dark (`bg-slate-800`), sticky (`sticky top-0 h-screen`)
2. **Header** — 64px tall (`h-16`), same dark slate as sidebar (`bg-slate-800`)
3. **Content area** — `flex-1 bg-slate-50 p-6`, scrolls independently
4. **No top-nav-only layouts** — the sidebar IS the Practix identity
5. **White cards on slate-50 background** — creates depth and visual hierarchy

---

## Dark Mode
The Practix platform does NOT use a dark mode toggle. The sidebar/header are always dark; the content area is always light. Do not add dark mode support to prototypes.
