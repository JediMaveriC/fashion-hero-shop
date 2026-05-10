import { MetricCard } from '../insights-metric-card'
import { RRChart } from '../insights-charts'
import type { CategoryData, Mode } from '../insights-data'

interface ReturnsProps { data: CategoryData; mode: Mode }

function RBar({ label, pct, benchPct, color }: { label: string; pct: number; benchPct: number; color: string }) {
  return (
    <div className="mb-1.5">
      <div className="flex justify-between text-[11px] mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-medium">{pct}% · b.{benchPct}%</span>
      </div>
      <div className="bg-secondary rounded-sm h-1.5 overflow-hidden">
        <div className="h-full rounded-sm" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

export function ReturnsView({ data, mode }: ReturnsProps) {
  const isExternal = mode === 'external'
  if (isExternal) return <div className="relative">
    <div className="blur-sm pointer-events-none select-none">
      <div className="grid grid-cols-4 gap-2 mb-3">
        <MetricCard label="Return rate" value="44%" bench="Bench: 32% · Top: 18%" valueVariant="down" />
        <MetricCard label="Zwroty/mies." value="187 szt." bench="61% powód: rozmiar" />
        <MetricCard label="Utracona prowizja" value="2 340 PLN" bench="miesięcznie" valueVariant="down" />
        <MetricCard label="Trend" value="▲ rośnie" bench="+6 pkt w 3 mies." valueVariant="down" />
      </div>
    </div>
    <ExtGate />
  </div>

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mb-3">
        <MetricCard label="Return rate" value={data.rr} bench="Bench: 32% · Top: 18%" valueVariant="down" />
        <MetricCard label="Zwroty/mies." value="187 szt." bench="61% powód: rozmiar" />
        <MetricCard label="Utracona prowizja" value="2 340 PLN" bench="miesięcznie" valueVariant="down" />
        <MetricCard label="Trend" value="▲ rośnie" bench="+6 pkt w 3 mies." valueVariant="down" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-1">RR trend (12 mies.)</div>
          <div className="flex gap-2.5 mb-2">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#E24B4A]" />Twój sklep</span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#B4B2A9]" />Benchmark</span>
          </div>
          <RRChart my={data.rrMy} bench={data.rrBData} />
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-2">Powody zwrotów</div>
          <RBar label="Nie pasuje rozmiar" pct={61} benchPct={48} color="#E24B4A" />
          <RBar label="Inne niż na zdjęciu" pct={19} benchPct={22} color="#EF9F27" />
          <RBar label="Jakość" pct={12} benchPct={15} color="#888780" />
          <RBar label="Kilka rozmiarów" pct={8} benchPct={15} color="#5DCAA5" />
          <p className="text-[11px] text-muted-foreground mt-2">
            Tabela rozmiarów → obniżka RR o 8–12 pkt → <strong className="text-[#3B6D11]">+1 800 PLN/mies.</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

function ExtGate() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-secondary/85 rounded-lg">
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
