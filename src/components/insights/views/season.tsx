import { SeasonChart } from '../insights-charts'
import { Pill } from '../insights-pill'
import type { CategoryData, Mode } from '../insights-data'

interface SeasonProps { data: CategoryData; mode: Mode }

export function SeasonView({ data, mode }: SeasonProps) {
  const isExternal = mode === 'external'
  const content = (
    <div>
      <div className="bg-card border border-border rounded-lg p-3 mb-2">
        <div className="text-[12px] font-medium mb-0.5">Sezonowość kategorii — indeks sprzedaży</div>
        <div className="text-[10px] text-muted-foreground mb-2">100 = średni miesiąc</div>
        <SeasonChart data={data.season} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-2">Kiedy uploadować?</div>
          <ul className="space-y-1.5">
            {[
              ['↑','Luty — kolekcja wiosenna (peak: marzec–maj)'],
              ['↑','Sierpień — kolekcja jesienna'],
              ['↓','Lipiec — najsłabszy miesiąc, czas na przeceny'],
              ['⚡','Październik — stock przed Black Friday'],
            ].map(([icon, text], i) => (
              <li key={i} className="flex gap-2 text-[11px] text-muted-foreground leading-snug border-b border-border/50 pb-1 last:border-0 last:pb-0">
                <span className="flex-shrink-0">{icon}</span><span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-2">Twoje uploady vs sezon</div>
          {[
            { label: 'Wiosna 2026',     pct: 85, pill: <Pill variant="ok">W oknie</Pill>,         color: '#639922' },
            { label: 'Jesień 2025',     pct: 55, pill: <Pill variant="warn">2 tyg. za późno</Pill>, color: '#EF9F27' },
            { label: 'Black Friday 2025', pct: 30, pill: <Pill variant="bad">Spóźniony</Pill>,     color: '#E24B4A' },
          ].map((row, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between text-[11px] mb-0.5">
                <span className="text-muted-foreground">{row.label}</span>{row.pill}
              </div>
              <div className="bg-secondary rounded-sm h-1.5 overflow-hidden">
                <div className="h-full rounded-sm" style={{ width: `${row.pct}%`, background: row.color }} />
              </div>
            </div>
          ))}
          <p className="text-[11px] text-muted-foreground mt-1">Utrata przez spóźnienia: <strong className="text-[#A32D2D]">~4 200 PLN</strong> w 2025</p>
        </div>
      </div>
    </div>
  )

  if (isExternal) return (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none">{content}</div>
      <ExtGate />
    </div>
  )
  return content
}

function ExtGate() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-secondary/85 rounded-lg z-10">
      <div className="bg-card border border-border rounded-xl p-5 text-center max-w-[280px]">
        <div className="text-xl mb-1.5">🔒</div>
        <div className="text-[13px] font-medium mb-1">Dane dostępne po rejestracji</div>
        <div className="text-[11px] text-muted-foreground mb-3 leading-relaxed">Kup raport PDF lub dołącz jako sprzedawca żeby zobaczyć pełne dane.</div>
        <button className="w-full text-[11px] py-1.5 bg-card border border-[#D85A30] text-[#D85A30] rounded-md font-medium mb-1.5">Kup raport PDF — 299 PLN</button>
        <button className="w-full text-[11px] py-1.5 bg-[#D85A30] text-white rounded-md font-medium">Dołącz jako sprzedawca</button>
      </div>
    </div>
  )
}
