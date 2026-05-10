import { Pill } from '../insights-pill'
import { PriceChart } from '../insights-charts'
import type { CategoryData, Mode } from '../insights-data'

interface PricesProps { data: CategoryData; mode: Mode }

export function PricesView({ data: _data, mode }: PricesProps) {
  const isExternal = mode === 'external'
  const content = (
    <div>
      <div className="bg-card border border-border rounded-lg p-3 mb-2">
        <div className="text-[12px] font-medium mb-2">Konwersja per przedział cenowy</div>
        <PriceChart />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-2">Rozkład cen Twojego sklepu</div>
          {[
            { label: '<99 PLN',   pct: 12, highlight: false },
            { label: '99–149',    pct: 28, highlight: false },
            { label: '149–199',   pct: 18, highlight: true },
            { label: '199–299',   pct: 31, highlight: false },
            { label: '>299',      pct: 11, highlight: false },
          ].map((row, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between items-center text-[11px] mb-0.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  {row.label}
                  {row.highlight && <Pill variant="ok">Sweet spot</Pill>}
                </span>
                <span>{row.pct}%</span>
              </div>
              <div className="bg-secondary rounded-sm h-1.5 overflow-hidden">
                <div className="h-full rounded-sm" style={{ width: `${row.pct}%`, background: row.highlight ? '#639922' : '#B4B2A9' }} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-2">Rekomendacja</div>
          <ul className="space-y-1.5">
            {[
              ['↑','Tylko 18% w sweet spocie. Top sprzedawcy: 35–45%.'],
              ['⚠','199–299 PLN — konwersja 1,8% vs bench 3,4%.'],
              ['↓','<99 PLN — wysoki RR (48%), segment łowczyń okazji.'],
            ].map(([icon, text], i) => (
              <li key={i} className="flex gap-2 text-[11px] text-muted-foreground leading-snug border-b border-border/50 pb-1.5 last:border-0 last:pb-0">
                <span className="flex-shrink-0">{icon}</span><span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  if (isExternal) return (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none">{content}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-secondary/85 rounded-lg z-10">
        <div className="bg-card border border-border rounded-xl p-5 text-center max-w-[280px]">
          <div className="text-xl mb-1.5">🔒</div>
          <div className="text-[13px] font-medium mb-1">Dane dostępne po rejestracji</div>
          <button className="w-full text-[11px] py-1.5 bg-[#D85A30] text-white rounded-md font-medium">Dołącz jako sprzedawca</button>
        </div>
      </div>
    </div>
  )
  return content
}
