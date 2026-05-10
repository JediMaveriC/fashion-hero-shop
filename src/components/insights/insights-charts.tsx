'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ComposedChart, Cell } from 'recharts'
import { MONTHS } from './insights-data'

const ACCENT = '#D85A30'
const MUTED  = '#D3D1C7'
const GREEN  = '#639922'
const RED    = '#E24B4A'
const GRAY   = '#888780'

const tickStyle = { fontSize: 9, fill: '#6b6b6b' }
const gridColor = 'rgba(0,0,0,0.04)'

export function SalesChart({ my, bench }: { my: number[]; bench: number[] }) {
  const data = MONTHS.map((m, i) => ({ m, my: my[i], bench: bench[i] }))
  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={data} barCategoryGap="30%">
        <CartesianGrid vertical={false} stroke={gridColor} />
        <XAxis dataKey="m" tick={tickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${Number(v)/1000}k`} />
        <Tooltip formatter={(v) => [`${Number(v).toLocaleString('pl')} PLN`]} />
        <Bar dataKey="my" fill={ACCENT} radius={[2,2,0,0]} name="Twój sklep" />
        <Bar dataKey="bench" fill={MUTED} radius={[2,2,0,0]} name="Benchmark" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function RRChart({ my, bench }: { my: number[]; bench: number[] }) {
  const data = MONTHS.map((m, i) => ({ m, my: my[i], bench: bench[i] }))
  return (
    <ResponsiveContainer width="100%" height={140}>
      <LineChart data={data}>
        <CartesianGrid stroke={gridColor} />
        <XAxis dataKey="m" tick={tickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[15, 55]} />
        <Tooltip formatter={(v) => [`${v}%`]} />
        <Line type="monotone" dataKey="my" stroke={RED} strokeWidth={2} dot={{ r: 2 }} name="Twój sklep" />
        <Line type="monotone" dataKey="bench" stroke={GRAY} strokeWidth={1.5} dot={{ r: 2 }} strokeDasharray="4 3" name="Benchmark" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function SeasonChart({ data: raw }: { data: number[] }) {
  const data = MONTHS.map((m, i) => ({ m, v: raw[i] }))
  const getColor = (v: number) => v >= 150 ? ACCENT : v >= 110 ? '#EF9F27' : MUTED
  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={data} barCategoryGap="30%">
        <CartesianGrid vertical={false} stroke={gridColor} />
        <XAxis dataKey="m" tick={tickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
        <Tooltip formatter={(v) => [`${v}`]} />
        <Bar dataKey="v" radius={[2,2,0,0]} name="Indeks">
          {data.map((entry, i) => <Cell key={i} fill={getColor(entry.v)} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function ColorChart() {
  const data = [
    { color: 'Czarny', conv: 5.2, rr: 22 },
    { color: 'Granat', conv: 4.8, rr: 25 },
    { color: 'Biały',  conv: 4.1, rr: 41 },
    { color: 'Czerw.', conv: 3.2, rr: 38 },
    { color: 'Beżowy', conv: 3.8, rr: 28 },
    { color: 'Różowy', conv: 2.9, rr: 35 },
  ]
  return (
    <ResponsiveContainer width="100%" height={130}>
      <ComposedChart data={data} barCategoryGap="25%">
        <CartesianGrid vertical={false} stroke={gridColor} />
        <XAxis dataKey="color" tick={{ fontSize: 9, fill: '#6b6b6b' }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="left"  tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <YAxis yAxisId="right" orientation="right" tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip formatter={(v) => [`${v}%`]} />
        <Bar yAxisId="left"  dataKey="conv" fill={ACCENT} radius={[2,2,0,0]} name="Konwersja" />
        <Bar yAxisId="right" dataKey="rr"   fill={MUTED}  radius={[2,2,0,0]} name="Return rate" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export function PriceChart() {
  const data = [
    { range: '<99',     conv: 2.1, color: MUTED },
    { range: '99–149',  conv: 3.4, color: MUTED },
    { range: '149–199', conv: 4.1, color: GREEN },
    { range: '199–299', conv: 1.8, color: MUTED },
    { range: '299–399', conv: 1.2, color: MUTED },
    { range: '>399',    conv: 0.8, color: MUTED },
  ]
  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={data} barCategoryGap="25%">
        <CartesianGrid vertical={false} stroke={gridColor} />
        <XAxis dataKey="range" tick={{ fontSize: 9, fill: '#6b6b6b' }} axisLine={false} tickLine={false} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip formatter={(v) => [`${v}%`]} />
        <Bar dataKey="conv" name="Konwersja" radius={[3,3,0,0]}>
          {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CompetitorRRChart() {
  const data = MONTHS.map((m, i) => ({
    m,
    my:  [38,39,40,41,40,42,41,43,43,44,44,44][i],
    avg: [30,30,31,32,31,31,30,31,31,32,33,32][i],
    top: [22,21,22,23,22,22,21,22,22,23,22,22][i],
  }))
  return (
    <ResponsiveContainer width="100%" height={130}>
      <LineChart data={data}>
        <CartesianGrid stroke={gridColor} />
        <XAxis dataKey="m" tick={{ fontSize: 9, fill: '#6b6b6b' }} axisLine={false} tickLine={false} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[15, 50]} />
        <Tooltip formatter={(v) => [`${v}%`]} />
        <Line type="monotone" dataKey="my"  stroke={ACCENT} strokeWidth={2} dot={{ r: 2 }} name="Twój sklep" />
        <Line type="monotone" dataKey="avg" stroke={GRAY}   strokeWidth={1.5} dot={{ r: 2 }} strokeDasharray="4 3" name="Avg kat." />
        <Line type="monotone" dataKey="top" stroke={GREEN}  strokeWidth={1.5} dot={{ r: 2 }} strokeDasharray="2 3" name="Top 10%" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function ForecastChart() {
  const labels = ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz']
  const data = labels.map((m, i) => ({
    m,
    history:    i < 4  ? [7100,9400,11200,10800][i]                   : null,
    base:       i >= 3 ? [10800,14200,13800,9100,10400,12600][i-3]    : null,
    optimistic: i >= 3 ? [10800,15800,15200,10400,12100,14800][i-3]   : null,
  }))
  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data}>
        <CartesianGrid stroke={gridColor} />
        <XAxis dataKey="m" tick={tickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${Number(v)/1000}k`} />
        <Tooltip formatter={(v) => [v != null ? `${Number(v).toLocaleString('pl')} PLN` : '—']} />
        <Line type="monotone" dataKey="history"    stroke={ACCENT} strokeWidth={2} dot={{ r: 2 }} connectNulls={false} name="Historia" />
        <Line type="monotone" dataKey="base"       stroke={GRAY}   strokeWidth={1.5} strokeDasharray="5 4" dot={{ r: 2 }} connectNulls={false} name="Prognoza bazowa" />
        <Line type="monotone" dataKey="optimistic" stroke={GREEN}  strokeWidth={1.5} dot={{ r: 2 }} connectNulls={false} name="Scenariusz optymistyczny" />
      </LineChart>
    </ResponsiveContainer>
  )
}
