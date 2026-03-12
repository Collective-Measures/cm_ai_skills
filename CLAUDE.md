# CM AI Skills — Shared Claude Code Skills Library

## Purpose
This repository contains reusable Claude Code skills documents for building prototypes and tools that visually integrate with the Collective Measures Practix platform.

These skills are designed to be referenced by Claude Code agents across the agency — especially those assisting non-developers (strategists, directors, analysts) who are building functional prototypes.

## How to Use These Skills

### For Developers Setting Up a New Prototype Project
Copy or symlink the relevant skill files into your project's `.claude/` directory, or reference them in your project's `CLAUDE.md`:

```markdown
# In your project's CLAUDE.md
See /Users/bill.roehl/code/cm_ai_skills/skills/ for Practix platform design standards.
When building UI, follow the Practix design system documented there.
```

### For Non-Developers
Tell your Claude Code agent: "Build this following the Practix design system. Read the skills files in the CM AI Skills shared Drive folder: https://drive.google.com/drive/u/0/folders/0AGf8K3k5ulRuUk9PVA"

## Skills Index

| Skill | File | Purpose |
|-------|------|---------|
| Prototype Scaffold | `skills/practix-prototype-scaffold.md` | Project setup, tech stack, and file structure for new prototypes |
| Design System | `skills/practix-design-system.md` | Colors, typography, spacing, and design tokens |
| Component Patterns | `skills/practix-component-patterns.md` | Reusable UI component code (sidebar, cards, tables, forms) |
| Data Visualization | `skills/practix-data-viz.md` | Recharts patterns, KPI cards, and number formatting |
| Quality Checklist | `skills/practix-quality-checklist.md` | Pre-review checklist to catch common prototype issues |

## Platform References
- **Practix Hub** (main portal): `~/code/cm_practix_hub`
- **Meridian MMM** (analytics tool): `~/code/cm_meridian`
- **Live Hub**: https://hub.collectivemeasures.com
- **Live MMM**: https://mmm.collectivemeasures.com
