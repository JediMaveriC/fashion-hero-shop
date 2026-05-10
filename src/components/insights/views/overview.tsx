import { MetricCard } from '../insights-metric-card'
import { SalesChart } from '../insights-charts'
import type { CategoryData, Mode } from '../insights-data'

interface OverviewProps { data: CategoryData; mode: Mode }

export function OverviewView({ data, mode }: OverviewProps) {
  const isExternal = mode === 'external'
  return (
    <div>
      <div className="bg-[#FAEEDA] border border-[#FAC775] rounded-md px-3 py-2 mb-3 flex gap-2 items-start">
        <span className="text-sm flex-shrink-0">⚠</span>
        <p className="text-[11px] text-[#633806] leading-snug">
          Return rate (44%) o 12 pkt powyżej benchmarku. Kosztuje Cię <strong>2 340 PLN prowizji/mies.</strong>
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-3">
        <MetricCard label="Obrót (90 dni)" value={data.revenue} delta={data.revD} bench={data.revB} valueVariant="default" />
        <MetricCard label="Return rate"    value={data.rr}      delta={data.rrD}  bench={data.rrBLabel}  valueVariant="down" blurred={isExternal} />
        <MetricCard label="Konwersja"      value={data.conv}    delta={data.convD} bench={data.convB} valueVariant="neutral" blurred={isExternal} />
        <MetricCard label="Prowizja netto" value={data.prov}    delta={data.provD} bench={data.provB} valueVariant="down" blurred={isExternal} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-1">Sprzedaż miesięczna</div>
          <div className="flex gap-2.5 mb-2">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#D85A30]" />Twój sklep</span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#D3D1C7]" />Benchmark</span>
          </div>
          <SalesChart my={data.salesMy} bench={data.salesB} />
        </div>
        <div className={`bg-card border border-border rounded-lg p-3 ${isExternal ? 'blur-sm pointer-events-none select-none' : ''}`}>
          <div className="text-[12px] font-medium mb-1">Szybkie wskaźniki</div>
          <ul className="space-y-2">
            {[
              ['↩', 'RR ', <><strong>44%</strong> – górne 20% kategorii. Powód: rozmiar (61%).</>],
              ['◷', '', <>Peak kategorii: <strong>kwiecień–czerwiec</strong>. Zadbaj o stan mag.</>],
              ['⊞', '', <>Rozmiar <strong>M</strong> – 38% zwrotów, 22% sprzedaży.</>],
              ['◈', '', <>Sweet spot: <strong>149–199 PLN</strong> (4,1% konwersji).</>],
            ].map(([icon, , text], i) => (
              <li key={i} className="flex gap-2 items-start text-[11px] text-muted-foreground leading-snug border-b border-border/50 pb-1.5 last:border-0 last:pb-0">
                <span className="flex-shrink-0">{icon as string}</span>
                <span>{text as React.ReactNode}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
