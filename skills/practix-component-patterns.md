# Practix Component Patterns — Copy-Paste Reference

## When to Use This Skill
Use these exact component patterns when building UI for Practix-style prototypes. These are extracted from the production Practix Portal and Practix MMM codebases. Copy, adapt, and extend — but do not deviate from the structural patterns.

---

## Layout Shell

The outermost wrapper. Every prototype must use this pattern.

```jsx
// src/components/layout/Layout.jsx
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-slate-800 shadow-sm h-16 px-6 flex items-center justify-end">
          {/* User profile / breadcrumbs go here */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300">user@collectivemeasures.com</span>
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
```

---

## Sidebar Navigation

```jsx
// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BarChart3, Settings, MessageSquare } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analysis', icon: BarChart3, label: 'Analysis' },
  // Add feature-specific nav items here
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-white sticky top-0 h-screen flex flex-col">
      {/* Logo Area */}
      <div className="px-4 py-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <div>
          <div className="text-lg font-bold">Practix</div>
          <div className="text-xs text-slate-400 font-medium tracking-wider">TOOL NAME</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 space-y-1 border-t border-slate-700">
        <button className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white w-full">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white w-full">
          <MessageSquare className="w-5 h-5" />
          Feedback
        </button>
      </div>
    </aside>
  )
}
```

---

## KPI Card

The core metric display unit across all Practix tools.

```jsx
// src/components/shared/KPICard.jsx
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function KPICard({ title, value, change, changeLabel = 'vs. prior period', icon: Icon }) {
  const isPositive = change > 0
  const isNeutral = change === 0 || change === null || change === undefined

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-600">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
      </div>
      <div className="text-2xl font-bold text-slate-900 tabular-nums">{value}</div>
      {!isNeutral && (
        <div className="flex items-center gap-1.5 mt-2">
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            isPositive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-slate-400">{changeLabel}</span>
        </div>
      )}
    </div>
  )
}

// Usage:
// <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//   <KPICard title="Total Spend" value="$4.23MM" change={12.5} icon={DollarSign} />
//   <KPICard title="Performance" value="$3.18MM" change={-2.1} icon={TrendingUp} />
//   <KPICard title="Brand" value="$1.05MM" change={8.3} icon={Megaphone} />
// </div>
```

---

## Health Badge / Score Badge

Used in scorecards and status displays. 5-tier system.

```jsx
// src/components/shared/HealthBadge.jsx
export default function HealthBadge({ score }) {
  const tier = getTier(score)

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${tier.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${tier.dot}`} />
      {score}
    </span>
  )
}

function getTier(score) {
  if (score >= 90) return { classes: 'bg-green-100 text-green-800', dot: 'bg-green-500', label: 'Excellent' }
  if (score >= 75) return { classes: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500', label: 'Good' }
  if (score >= 60) return { classes: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500', label: 'Fair' }
  if (score >= 40) return { classes: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500', label: 'Needs Attention' }
  return { classes: 'bg-red-100 text-red-800', dot: 'bg-red-500', label: 'Critical' }
}
```

---

## Data Table

Standard table pattern with sorting and row highlighting.

```jsx
// Pattern for data tables
<div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
  <div className="px-5 py-4 border-b border-slate-200">
    <h3 className="text-lg font-semibold text-slate-800">Table Title</h3>
  </div>
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-200 bg-slate-50">
          <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
            Column
          </th>
          <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
            Value
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50 transition-colors">
            <td className="px-5 py-3 text-sm text-slate-700">{row.name}</td>
            <td className="px-5 py-3 text-sm text-slate-700 tabular-nums text-right">
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
```

---

## Buttons

```jsx
{/* Primary action */}
<button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
  <Plus className="w-4 h-4" />
  Add Item
</button>

{/* Secondary action */}
<button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
  <Download className="w-4 h-4" />
  Export
</button>

{/* Destructive action */}
<button className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
  <Trash2 className="w-4 h-4" />
  Delete
</button>

{/* Icon-only button */}
<button className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
  <RefreshCw className="w-4 h-4" />
</button>

{/* Disabled state — add to any button */}
<button disabled className="... disabled:opacity-50 disabled:cursor-not-allowed">
```

---

## Form Inputs

```jsx
{/* Text input */}
<div className="space-y-1.5">
  <label className="block text-sm font-medium text-slate-700">
    Field Label
  </label>
  <input
    type="text"
    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
    placeholder="Enter value..."
  />
</div>

{/* Select */}
<select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
  <option>Option 1</option>
</select>

{/* Form grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* inputs here */}
</div>
```

---

## Card / Section Container

```jsx
{/* Standard content card */}
<div className="bg-white rounded-lg border border-slate-200 shadow-sm">
  <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
    <h3 className="text-lg font-semibold text-slate-800">Section Title</h3>
    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
      View All
    </button>
  </div>
  <div className="p-5">
    {/* Card content */}
  </div>
</div>

{/* Color-coded section (for category grouping) */}
<div className="bg-indigo-50 rounded-lg border border-indigo-100 p-5">
  <h4 className="text-sm font-semibold text-indigo-800 mb-3">Category Name</h4>
  {/* content */}
</div>
```

---

## Empty / Loading / Error States

```jsx
{/* Loading skeleton */}
<div className="animate-pulse space-y-3">
  <div className="h-4 bg-slate-200 rounded w-1/3" />
  <div className="h-8 bg-slate-200 rounded w-1/2" />
  <div className="h-3 bg-slate-200 rounded w-1/4" />
</div>

{/* Empty state */}
<div className="text-center py-12">
  <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-4" />
  <h3 className="text-sm font-medium text-slate-900 mb-1">No data yet</h3>
  <p className="text-sm text-slate-500">Data will appear here once available.</p>
</div>

{/* Error state */}
<div className="bg-red-50 border border-red-200 rounded-lg p-4">
  <div className="flex items-center gap-2">
    <AlertCircle className="w-4 h-4 text-red-600" />
    <span className="text-sm font-medium text-red-700">Something went wrong</span>
  </div>
  <p className="text-sm text-red-600 mt-1">Error details here.</p>
</div>

{/* Warning/info banner */}
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
  <div>
    <p className="text-sm font-medium text-yellow-800">Heads up</p>
    <p className="text-sm text-yellow-700 mt-1">Additional context here.</p>
  </div>
</div>
```

---

## Modal / Panel Overlay

```jsx
{/* Modal backdrop + panel */}
{isOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/50" onClick={onClose} />
    <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Modal Title</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>
      <div className="p-6">
        {/* Modal content */}
      </div>
      <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
```

---

## Tabs

```jsx
const [activeTab, setActiveTab] = useState('overview')

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings' },
]

<div className="border-b border-slate-200">
  <nav className="flex gap-6 px-5">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`py-3 text-sm font-medium border-b-2 transition-colors ${
          activeTab === tab.id
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-slate-500 hover:text-slate-700'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </nav>
</div>
```
