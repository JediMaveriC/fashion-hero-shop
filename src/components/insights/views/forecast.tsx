import { MetricCard } from '../insights-metric-card'
import { ForecastChart } from '../insights-charts'
import type { Mode } from '../insights-data'

interface ForecastProps { mode: Mode; onUpgrade: () => void }

function PlusGate({ onUpgrade, description }: { onUpgrade: () => void; description: string }) {
  return (
    <div className="relative">
      <div className="blur-sm opacity-40 pointer-events-none select-none">
        <div className="grid grid-cols-4 gap-2 mb-3">
          <MetricCard label="Prognoza Q3" value="52 000" />
          <MetricCard label="Wzrost" value="+22%" valueVariant="up" />
          <MetricCard label="Najlepszy mies." value="Czerwiec" />
          <MetricCard label="Ryzyko" value="Średnie" />
        </div>
        <div className="bg-card border border-border rounded-lg h-28" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-card border border-border rounded-xl p-5 text-center max-w-[260px]">
          <div className="text-xl mb-1.5">🔒</div>
          <div className="text-[13px] font-medium mb-1">Dostępne w PLUS</div>
          <div className="text-[11px] text-muted-foreground mb-3 leading-relaxed">{description}</div>
          <button onClick={onUpgrade} className="w-full text-[12px] py-2 bg-[#D85A30] text-white rounded-md font-medium mb-1">
            Przejdź na PLUS — 399 PLN/mies
          </button>
          <div className="text-[10px] text-muted-foreground">anuluj kiedy chcesz</div>
        </div>
      </div>
    </div>
  )
}

export function ForecastView({ mode, onUpgrade }: ForecastProps) {
  if (mode !== 'plus') {
    return <PlusGate onUpgrade={onUpgrade} description="Prognoza sprzedaży na 3 miesiące na podstawie trendów kategorii." />
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mb-3">
        <MetricCard label="Prognoza maj 2026" value="14 200 PLN" bench="+12% vs maj 2025" valueVariant="up" />
        <MetricCard label="Prognoza czerwiec" value="13 800 PLN" bench="koniec sezonu letniego" valueVariant="up" />
        <MetricCard label="Prognoza lipiec" value="9 100 PLN" bench="martwy sezon" valueVariant="neutral" />
        <MetricCard label="Q3 łącznie" value="37 100 PLN" bench="przy obecnym trendzie" />
      </div>
      <div className="bg-card border border-border rounded-lg p-3 mb-2">
        <div className="text-[12px] font-medium mb-0.5">Prognoza sprzedaży — maj–wrzesień 2026</div>
        <div className="text-[10px] text-muted-foreground mb-2">Prognoza bazowa i scenariusz z optymalizacją RR + timingiem</div>
        <div className="flex gap-2.5 mb-2">
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#D85A30]" />Historia</span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#B4B2A9]" />Prognoza bazowa</span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#639922]" />Scenariusz optymistyczny</span>
        </div>
        <ForecastChart />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-2">Czynniki ryzyka</div>
          <ul className="space-y-1.5">
            {[
              ['⚠','Lipiec — indeks 75. Przygotuj się na 35% niższy obrót vs maj.'],
              ['⚠','Rosnący RR (+2 pkt/kwartał) może obniżyć prognozę o 8–12%.'],
              ['↑','Forte aktywnie rekrutuje sprzedawców sukienek.'],
            ].map(([icon, text], i) => (
              <li key={i} className="flex gap-2 text-[11px] text-muted-foreground leading-snug border-b border-border/50 pb-1.5 last:border-0 last:pb-0">
                <span className="flex-shrink-0">{icon}</span><span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-2">Scenariusz optymistyczny</div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Przy obniżeniu RR do 32% i prawidłowym timingu:<br /><br />
            <strong className="text-[#3B6D11] text-[13px]">+6 800 PLN/kwartał</strong><br />
            <span className="text-[10px]">vs prognoza bazowa</span>
          </p>
        </div>
      </div>
    </div>
  )
}
