# Practix Prototype Quality Checklist

## When to Use This Skill
Run through this checklist before sharing any prototype for review. It catches the most common issues that make prototypes look "off-brand" relative to the Practix platform. This should be the last step before requesting a code review or stakeholder demo.

---

## Layout & Structure

- [ ] **Dark sidebar present** — w-64, bg-slate-800, sticky, full height
- [ ] **Sidebar has logo area** — Practix branding with tool name subtitle
- [ ] **Sidebar has nav items** — with Lucide icons, active/hover states using slate-700
- [ ] **Header bar present** — h-16, bg-slate-800, matching sidebar darkness
- [ ] **Content area** — bg-slate-50 with p-6 padding
- [ ] **No top-nav-only layout** — sidebar is mandatory
- [ ] **No floating/centered card layout** — content fills the right panel

## Colors

- [ ] **Using slate scale** — NOT gray, NOT zinc, NOT neutral
- [ ] **Sidebar/header bg-slate-800** — not black, not slate-900
- [ ] **Primary accent is blue-600** — not indigo, not purple, not cyan
- [ ] **Status colors correct** — green for success, red for error, amber for warning
- [ ] **Text hierarchy uses slate** — 900 for primary, 600 for secondary, 400/500 for tertiary
- [ ] **White cards on slate-50 background** — not gray backgrounds on white
- [ ] **No custom/brand colors from other tools** — keep to the Practix palette

## Typography

- [ ] **No custom fonts loaded** — system font stack only
- [ ] **tabular-nums on all numeric values** — currency, percentages, counts
- [ ] **Uppercase tracking-wider on labels** — section labels, column headers
- [ ] **KPI values use text-2xl font-bold** — large and prominent
- [ ] **Body text is text-sm** — not text-base (too large for data-dense UIs)

## Components

- [ ] **Cards use rounded-lg border border-slate-200 shadow-sm** — consistent elevation
- [ ] **Buttons use the correct pattern** — blue-600 primary, border secondary
- [ ] **Inputs have focus:ring-2 focus:ring-blue-500** — consistent focus state
- [ ] **Tables use divide-y divide-slate-100** — not heavy borders
- [ ] **Loading states use animate-pulse skeletons** — not spinners (unless long-running)
- [ ] **Empty states have icon + message** — not just blank space

## Data & Charts

- [ ] **Using Recharts** — not Chart.js, not D3 directly, not Plotly
- [ ] **Chart colors match Practix palette** — blue/teal/violet/amber series
- [ ] **Grid lines are slate-100** — light and subtle
- [ ] **Axis text is 10px slate-400** — not default Recharts styling
- [ ] **Tooltips are styled** — rounded-lg, border-slate-200, fontSize 12
- [ ] **Numbers formatted correctly** — $K/$MM/$B for currency, proper decimals
- [ ] **Null/NaN values show "--"** — never "NaN", "undefined", or blank

## Icons

- [ ] **Using Lucide React** — not Font Awesome, not Heroicons, not Material Icons
- [ ] **Nav icons are w-5 h-5** — standard navigation size
- [ ] **Inline icons are w-4 h-4** — in buttons, badges, table cells
- [ ] **Icons paired with text in buttons** — never icon-only for primary actions

## Responsiveness

- [ ] **Grid responsive at md: breakpoint** — cards stack on narrow screens
- [ ] **Tables have overflow-x-auto wrapper** — horizontal scroll on narrow screens
- [ ] **Sidebar does not collapse** — it's always 256px (mobile optimization is not needed for internal tools)

## Code Quality

- [ ] **No inline styles** — all styling via Tailwind className utilities
- [ ] **No CSS files per component** — index.css is the only CSS file
- [ ] **Pages use React.lazy()** — code-split route components
- [ ] **Formatters imported from utils/formatters.js** — centralized, not inline
- [ ] **No console.log left in code** — clean console output
- [ ] **No hardcoded data** — use mock data files or constants, ready to swap for API calls

## Common Mistakes to Avoid

| Mistake | Correct Approach |
|---------|-----------------|
| Using MUI/Bootstrap components | Use Tailwind utility classes |
| Top navigation bar only | Always use left sidebar |
| Gray-100 content background | Use slate-50 |
| Default Recharts colors | Specify Practix chart palette |
| Comic Sans or unusual fonts | System font stack (Tailwind default) |
| Bright green/red for status | Use the 5-tier health badge system |
| Charts without card wrappers | Wrap every chart in a white card |
| Numbers without formatting | Use fmtCurrency/fmtCompact/fmtPct |
| Missing loading states | Add skeleton loaders to every async section |
| Interactive elements without hover states | Add hover:bg-slate-50 or appropriate hover |

---

## Quick Visual Test

Open your prototype next to https://hub.collectivemeasures.com and ask:

1. Does my sidebar look the same? (dark, same width, same nav pattern)
2. Does my content area feel the same? (light background, white cards, same spacing)
3. Do my buttons, inputs, and tables match?
4. If someone saw both side-by-side, would they believe they're part of the same platform?

If the answer to #4 is "no," revisit the design system skill and fix the discrepancies before submitting for review.
