# Practix Prototype Scaffold

## When to Use This Skill
Use this when starting a new prototype, tool, or internal app that should look and feel like part of the Practix platform. This ensures non-developer prototypes are "testing-ready" from the start.

## Tech Stack (Must Match)

Every Practix prototype MUST use this stack:

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.x |
| Build Tool | Vite | 6.x |
| Styling | Tailwind CSS | 4.x |
| Icons | Lucide React | 0.530+ |
| Charts | Recharts | 3.x |
| Routing | React Router | 7.x |

### Why This Stack Matters
The Practix Hub and Meridian MMM both use React + Tailwind + Recharts + Lucide. Using the same stack means components can be extracted from prototypes into the platform with minimal rewrite. Do NOT use:
- Material UI / MUI
- Chakra UI
- Bootstrap
- Chart.js (use Recharts)
- Font Awesome (use Lucide)
- Next.js (use Vite + React Router)

## Project Initialization

```bash
npm create vite@latest my-prototype -- --template react
cd my-prototype
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install react-router-dom recharts lucide-react
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 3000 }
})
```

### src/index.css
```css
@import "tailwindcss";

/* Practix flash animation for table row highlighting */
@keyframes flash-orange {
  0% { background-color: rgb(255 237 213); }
  100% { background-color: transparent; }
}
```

## File Structure

```
my-prototype/
├── public/
│   └── favicon.ico          # Use Practix favicon
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx       # Main layout wrapper
│   │   │   ├── Sidebar.jsx      # Dark sidebar navigation
│   │   │   └── Header.jsx       # Top header bar (optional — Hub uses sidebar-only)
│   │   ├── shared/
│   │   │   ├── KPICard.jsx      # Metric display card
│   │   │   ├── StatusBadge.jsx  # Health/status indicators
│   │   │   └── DateRangePicker.jsx  # (if needed)
│   │   └── [feature]/           # Feature-specific components
│   ├── pages/                   # Route-level page components
│   ├── utils/
│   │   └── formatters.js        # Number/currency formatting
│   ├── App.jsx                  # Root with router + layout
│   └── index.css                # Tailwind import + custom animations
├── index.html
├── vite.config.js
└── package.json
```

## App.jsx Starter Template

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

## Deployment Target
Prototypes should deploy to Netlify for quick sharing. Use the Practix subdomain pattern:
- `[tool-name].collectivemeasuresqa.netlify.app` for QA/review
- Production integration happens later via the Hub team

## Key Principles

1. **Match the Hub layout** — dark sidebar on left, light content on right. No top-nav-only layouts.
2. **Use Tailwind utilities** — no custom CSS files per component. All styling via className.
3. **Lucide icons only** — consistent with both Hub and Meridian.
4. **Recharts for all charts** — matches the platform's data viz library.
5. **Slate color palette** — the platform's neutral foundation. Not gray, not zinc. Slate.
6. **No custom fonts** — system font stack only (Tailwind default).
7. **Code-split pages** — use React.lazy() for each page route.
