# Practix Data Visualization Patterns

## When to Use This Skill
Use this when building any charts, graphs, KPI displays, or numeric formatting for Practix-style prototypes.

---

## Chart Library: Recharts

All Practix data visualization uses **Recharts 3.x**. Do not use Chart.js, D3 directly, Plotly, or Nivo.

```bash
npm install recharts
```

### Standard Chart Wrapper

Every chart should be wrapped in a card container with a responsive container:

```jsx
import { ResponsiveContainer } from 'recharts'

<div className="bg-white rounded-lg border border-slate-200 shadow-sm">
  <div className="px-5 py-4 border-b border-slate-200">
    <h3 className="text-lg font-semibold text-slate-800">Chart Title</h3>
    <p className="text-sm text-slate-500 mt-0.5">Supporting description</p>
  </div>
  <div className="p-5">
    <ResponsiveContainer width="100%" height={320}>
      {/* Chart component here */}
    </ResponsiveContainer>
  </div>
</div>
```

---

## Chart Color Palette

Use these colors consistently across all charts. They're derived from the Practix theme:

```javascript
const CHART_COLORS = {
  // Primary series colors (use in order for multi-series charts)
  series: [
    '#3b82f6', // blue-500 — primary/default
    '#14b8a6', // teal-500 — secondary
    '#8b5cf6', // violet-500 — tertiary
    '#f59e0b', // amber-500 — quaternary
    '#ef4444', // red-500 — fifth
    '#10b981', // emerald-500 — sixth
    '#6366f1', // indigo-500
    '#ec4899', // pink-500
  ],

  // Semantic colors
  revenue: '#3b82f6',    // blue — always for revenue/primary metric
  spend: '#ef4444',      // red — always for spend/cost
  roi: '#10b981',        // green — always for ROI/efficiency
  positive: '#10b981',   // green
  negative: '#ef4444',   // red
  forecast: '#94a3b8',   // slate-400 — for projected/forecast data

  // Grid and axis
  grid: '#f1f5f9',       // slate-100
  axis: '#94a3b8',       // slate-400
  axisLine: '#e2e8f0',   // slate-200
}
```

---

## Line Chart

```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

<ResponsiveContainer width="100%" height={320}>
  <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
    <XAxis
      dataKey="date"
      tick={{ fontSize: 10, fill: '#94a3b8' }}
      axisLine={{ stroke: '#e2e8f0' }}
      tickLine={false}
    />
    <YAxis
      tick={{ fontSize: 10, fill: '#94a3b8' }}
      axisLine={false}
      tickLine={false}
      tickFormatter={(v) => fmtCompact(v)}
    />
    <Tooltip
      contentStyle={{
        fontSize: 12,
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
      formatter={(value) => fmtCurrency(value)}
    />
    <Legend wrapperStyle={{ fontSize: 12 }} />
    <Line
      type="monotone"
      dataKey="revenue"
      stroke="#3b82f6"
      strokeWidth={2}
      dot={false}
      name="Revenue"
    />
    <Line
      type="monotone"
      dataKey="spend"
      stroke="#ef4444"
      strokeWidth={2}
      dot={false}
      name="Spend"
    />
  </LineChart>
</ResponsiveContainer>
```

---

## Bar Chart

```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

<ResponsiveContainer width="100%" height={320}>
  <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
    <XAxis
      dataKey="channel"
      tick={{ fontSize: 10, fill: '#94a3b8' }}
      axisLine={{ stroke: '#e2e8f0' }}
      tickLine={false}
    />
    <YAxis
      tick={{ fontSize: 10, fill: '#94a3b8' }}
      axisLine={false}
      tickLine={false}
      tickFormatter={(v) => fmtCompact(v)}
    />
    <Tooltip
      contentStyle={{
        fontSize: 12,
        borderRadius: 8,
        border: '1px solid #e2e8f0',
      }}
    />
    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

---

## Area Chart (with Forecast)

Used for time series with projected data. Forecast portion uses dashed stroke and lighter fill.

```jsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

<ResponsiveContainer width="100%" height={320}>
  <AreaChart data={data}>
    <defs>
      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} />
    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
    <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="url(#colorActual)" strokeWidth={2} />
    <Area type="monotone" dataKey="forecast" stroke="#94a3b8" fill="url(#colorForecast)" strokeWidth={2} strokeDasharray="5 5" />
  </AreaChart>
</ResponsiveContainer>
```

---

## Sparkline (Inline Mini Chart)

Used inside table cells for trend visualization.

```jsx
import { LineChart, Line, ResponsiveContainer } from 'recharts'

function SparklineChart({ data, color = '#3b82f6', height = 32 }) {
  return (
    <ResponsiveContainer width={80} height={height}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

---

## Custom Tooltip Pattern

For richer tooltip formatting:

```jsx
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
      <p className="text-xs font-medium text-slate-500 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-600">{entry.name}:</span>
          <span className="font-semibold text-slate-800 tabular-nums">
            {fmtCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

// Usage: <Tooltip content={<CustomTooltip />} />
```

---

## Number Formatting Utilities

Copy this file into every prototype. These are the exact formatters used across Practix.

```javascript
// src/utils/formatters.js

/**
 * Format currency with K/MM/B suffixes.
 * $1,234 → "$1.23K", $1,234,567 → "$1.23MM", $1,234,567,890 → "$1.23B"
 */
export function fmtCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) return '--'
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}MM`
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(2)}K`
  return `${sign}$${abs.toFixed(2)}`
}

/**
 * Format compact number with K/M/B suffixes (no dollar sign).
 * 1,234 → "1.2K", 1,234,567 → "1.2M"
 */
export function fmtCompact(value) {
  if (value === null || value === undefined || isNaN(value)) return '--'
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (abs >= 1e9) return `${sign}${(abs / 1e9).toFixed(1)}B`
  if (abs >= 1e6) return `${sign}${(abs / 1e6).toFixed(1)}M`
  if (abs >= 1e3) return `${sign}${(abs / 1e3).toFixed(1)}K`
  return `${sign}${abs.toFixed(0)}`
}

/**
 * Format as percentage with 1 decimal.
 * 0.1234 → "12.3%"
 */
export function fmtPct(value) {
  if (value === null || value === undefined || isNaN(value)) return '--'
  return `${(value * 100).toFixed(1)}%`
}

/**
 * Format full currency with commas.
 * 1234.5 → "$1,234.50"
 */
export function fmtCurrencyFull(value) {
  if (value === null || value === undefined || isNaN(value)) return '--'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format integer with commas.
 * 1234567 → "1,234,567"
 */
export function fmtNumber(value) {
  if (value === null || value === undefined || isNaN(value)) return '--'
  return new Intl.NumberFormat('en-US').format(value)
}
```

---

## Gauge Chart (SVG)

Used in Prism for composite health scores. 270-degree arc with 4 color segments.

```jsx
function GaugeChart({ score, size = 160 }) {
  const center = size / 2
  const radius = center - 16
  const circumference = radius * 2 * Math.PI * 0.75 // 270 degrees
  const startAngle = 135 // degrees
  const sweepAngle = 270

  // 4 color segments
  const segments = [
    { color: '#ef4444', range: [0, 25] },    // red
    { color: '#f59e0b', range: [25, 50] },    // amber
    { color: '#14b8a6', range: [50, 75] },    // teal
    { color: '#10b981', range: [75, 100] },   // green
  ]

  const needleAngle = startAngle + (score / 100) * sweepAngle

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background arc segments */}
      {segments.map((seg, i) => {
        const startPct = seg.range[0] / 100
        const endPct = seg.range[1] / 100
        const startDeg = startAngle + startPct * sweepAngle
        const endDeg = startAngle + endPct * sweepAngle
        return (
          <path
            key={i}
            d={describeArc(center, center, radius, startDeg, endDeg)}
            fill="none"
            stroke={seg.color}
            strokeWidth={12}
            strokeLinecap="round"
            opacity={0.2}
          />
        )
      })}

      {/* Active arc up to score */}
      <path
        d={describeArc(center, center, radius, startAngle, needleAngle)}
        fill="none"
        stroke={getScoreColor(score)}
        strokeWidth={12}
        strokeLinecap="round"
      />

      {/* Center value */}
      <text x={center} y={center + 4} textAnchor="middle" className="text-2xl font-bold" fill="#0f172a">
        {score}
      </text>
      <text x={center} y={center + 20} textAnchor="middle" className="text-xs" fill="#94a3b8">
        / 100
      </text>
    </svg>
  )
}

function getScoreColor(score) {
  if (score >= 75) return '#10b981'
  if (score >= 50) return '#14b8a6'
  if (score >= 25) return '#f59e0b'
  return '#ef4444'
}
```

---

## Chart Dos and Don'ts

**DO:**
- Always wrap charts in `<ResponsiveContainer>` for fluid sizing
- Use `strokeDasharray="3 3"` on CartesianGrid
- Use slate-100 (`#f1f5f9`) for grid lines
- Use slate-400 (`#94a3b8`) for axis text at `fontSize: 10`
- Remove axis lines (`axisLine={false}`) on YAxis for cleaner look
- Use `dot={false}` on Line charts for cleaner appearance
- Use `radius={[4, 4, 0, 0]}` on Bar for rounded tops
- Format all values in tooltips using the formatting utilities
- Use `tabular-nums` class on any rendered numeric values

**DON'T:**
- Don't use default Recharts colors — always specify the Practix palette
- Don't use 3D effects, gradients on bars, or decorative chart elements
- Don't use pie charts for more than 5 segments (use horizontal bar instead)
- Don't put chart titles inside the chart — put them in the card header above
- Don't use Recharts' built-in Legend styling without overriding font size to 12px
