import { MetricCard } from '../insights-metric-card'
import { CompetitorRRChart } from '../insights-charts'
import { Pill } from '../insights-pill'
import type { Mode } from '../insights-data'

interface CompetitorsProps { mode: Mode; onUpgrade: () => void }

function PlusGate({ onUpgrade, description }: { onUpgrade: () => void; description: string }) {
  return (
    <div className="relative">
      <div className="blur-sm opacity-40 pointer-events-none select-none">
        <div className="grid grid-cols-4 gap-2 mb-3">
          <MetricCard label="Konkurenci" value="247" />
          <MetricCard label="Pozycja" value="Top 32%" valueVariant="up" />
          <MetricCard label="Lider" value="ModoStyl" />
          <MetricCard label="Przewaga" value="+68%" />
        </div>
        <div className="bg-card border border-border rounded-lg h-32" />
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

export function CompetitorsView({ mode, onUpgrade }: CompetitorsProps) {
  if (mode !== 'plus') {
    return <PlusGate onUpgrade={onUpgrade} description="Twoja pozycja vs konkurencja — ceny, RR, timing. Dane anonimizowane." />
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mb-3">
        <MetricCard label="Sprzedawcy w kategorii" value="247" bench="Sukienki damskie" />
        <MetricCard label="Twoja pozycja" value="Top 32%" bench="wg obrotu" valueVariant="up" />
        <MetricCard label="Twój RR vs liderzy" value="+16 pkt" bench="liderzy avg 28%" valueVariant="down" />
        <MetricCard label="Luka konwersji" value="–1,4 pkt" bench="vs top 10% kategorii" valueVariant="down" />
      </div>
      <div className="bg-card border border-border rounded-lg p-3 mb-2">
        <div className="text-[12px] font-medium mb-0.5">Benchmark vs wybrani konkurenci — dane anonimizowane</div>
        <div className="text-[10px] text-muted-foreground mb-2">Sprzedawcy w podobnej skali obrotów w kategorii sukienki damskie</div>
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr>
              {['Sprzedawca','Obrót/mies.','Return rate','Konwersja','Avg cena','Upload timing'].map(h => (
                <th key={h} className="text-left text-[10px] text-muted-foreground uppercase tracking-wide py-1.5 px-2 border-b border-border font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50"><td className="px-2 py-2">Seller #A</td><td className="px-2 py-2">52 400 PLN</td><td className="px-2 py-2 text-[#3B6D11]">28%</td><td className="px-2 py-2 text-[#3B6D11]">4,6%</td><td className="px-2 py-2">179 PLN</td><td className="px-2 py-2"><Pill variant="ok">W oknie</Pill></td></tr>
            <tr className="border-b border-border/50"><td className="px-2 py-2">Seller #B</td><td className="px-2 py-2">44 100 PLN</td><td className="px-2 py-2 text-[#3B6D11]">31%</td><td className="px-2 py-2">3,9%</td><td className="px-2 py-2">162 PLN</td><td className="px-2 py-2"><Pill variant="ok">W oknie</Pill></td></tr>
            <tr className="bg-[#FAECE7] text-[#993C1D] font-medium border-b border-border/50"><td className="px-2 py-2">Twój sklep</td><td className="px-2 py-2">38 400 PLN</td><td className="px-2 py-2">44%</td><td className="px-2 py-2">3,2%</td><td className="px-2 py-2">211 PLN</td><td className="px-2 py-2"><Pill variant="warn">Spóźniony</Pill></td></tr>
            <tr className="border-b border-border/50"><td className="px-2 py-2">Seller #C</td><td className="px-2 py-2">35 800 PLN</td><td className="px-2 py-2">38%</td><td className="px-2 py-2">3,4%</td><td className="px-2 py-2">195 PLN</td><td className="px-2 py-2"><Pill variant="warn">Spóźniony</Pill></td></tr>
            <tr><td className="px-2 py-2">Seller #D</td><td className="px-2 py-2">29 200 PLN</td><td className="px-2 py-2 text-[#A32D2D]">47%</td><td className="px-2 py-2">2,8%</td><td className="px-2 py-2">228 PLN</td><td className="px-2 py-2"><Pill variant="bad">Bardzo późno</Pill></td></tr>
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-1">RR vs konkurenci</div>
          <div className="flex gap-2.5 mb-1">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#D85A30]" />Twój sklep</span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#B4B2A9]" />Avg kat.</span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#639922]" />Top 10%</span>
          </div>
          <CompetitorRRChart />
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-2">Gdzie tracisz vs liderzy</div>
          <ul className="space-y-1.5">
            {[
              ['↩','RR o 16 pkt wyższy niż liderzy. Brak tabeli rozmiarów.'],
              ['◈','Avg cena 211 PLN powyżej sweet spotu. Liderzy: 162–179 PLN.'],
              ['◷','Upload timing spóźniony — liderzy uploadują 5–6 tyg. przed sezonem.'],
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
}
