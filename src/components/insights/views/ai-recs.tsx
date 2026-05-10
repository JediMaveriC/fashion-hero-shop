import { MetricCard } from '../insights-metric-card'
import { Pill } from '../insights-pill'
import type { Mode } from '../insights-data'

interface AIRecsProps { mode: Mode; onUpgrade: () => void }

const recs = [
  { icon: '📏', priority: 'high' as const, title: 'Dodaj szczegółową tabelę rozmiarów do wszystkich produktów', desc: '61% zwrotów to problem z rozmiarem vs benchmark 48%. Sprzedawcy którzy dodali tabelę obniżyli RR średnio o 10 pkt w 3 tygodnie.', impact: '+1 800 PLN prowizji/mies.' },
  { icon: '◷', priority: 'high' as const, title: 'Uploaduj kolekcję jesienną do 15 sierpnia', desc: 'W 2025 spóźnienie o 2 tygodnie kosztowało ~2 100 PLN sprzedaży. Liderzy uploadują FW w sierpniu, przed peakiem wrześniowym.', impact: '+2 100 PLN/sezon' },
  { icon: '◈', priority: 'high' as const, title: 'Przenieś 8–10 produktów do przedziału 149–199 PLN', desc: 'Tylko 18% produktów w sweet spocie. Liderzy mają 35–45%. Twoja średnia cena 211 PLN przekracza optimum kategorii.', impact: '+820 PLN prowizji/mies.' },
  { icon: '⊞', priority: 'medium' as const, title: 'Zwiększ dostępność rozmiaru S w kolekcji wiosennej', desc: 'Rozmiar S konwertuje najlepiej (4,8%) ale ma najwyższy udział braków w magazynie. Kategoria out-of-stock w S w maju.', impact: null },
  { icon: '📷', priority: 'medium' as const, title: 'Popraw zdjęcia białych produktów', desc: 'Białe produkty mają RR 41% vs 28% dla czarnych. Główna przyczyna: "inny kolor niż na zdjęciu".', impact: null },
  { icon: '⊛', priority: 'low' as const, title: 'Obserwuj Seller #A — zmienił strategię cenową w marcu', desc: 'Lider obniżył avg cenę z 195 do 179 PLN i odnotował +18% konwersji. Twoja pozycja może spaść jeśli trend się utrzyma.', impact: null },
]

const borderColor = { high: '#D85A30', medium: '#EF9F27', low: '#5DCAA5' }

function PlusGate({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <div className="relative">
      <div className="blur-sm opacity-40 pointer-events-none select-none space-y-2">
        <div className="bg-card border border-border rounded-lg h-20" />
        <div className="bg-card border border-border rounded-lg h-28" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-card border border-border rounded-xl p-5 text-center max-w-[260px]">
          <div className="text-xl mb-1.5">🔒</div>
          <div className="text-[13px] font-medium mb-1">Dostępne w PLUS</div>
          <div className="text-[11px] text-muted-foreground mb-3 leading-relaxed">Rekomendacje AI: produkty, ceny, redukcja return rate.</div>
          <button onClick={onUpgrade} className="w-full text-[12px] py-2 bg-[#D85A30] text-white rounded-md font-medium mb-1">
            Przejdź na PLUS — 399 PLN/mies
          </button>
          <div className="text-[10px] text-muted-foreground">anuluj kiedy chcesz</div>
        </div>
      </div>
    </div>
  )
}

export function AIRecsView({ mode, onUpgrade }: AIRecsProps) {
  if (mode !== 'plus') return <PlusGate onUpgrade={onUpgrade} />

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mb-3">
        <MetricCard label="Rekomendacji" value="7" bench="3 wysokiego priorytetu" />
        <MetricCard label="Szacowany efekt" value="+4 120 PLN" bench="prowizji/mies. po wdrożeniu" valueVariant="up" />
        <MetricCard label="Najszybszy win" value="Tabela rozm." bench="efekt w 2–4 tygodnie" />
        <MetricCard label="Ostatnia analiza" value="Dziś" bench="dane z 24.04.2026" />
      </div>
      <div className="bg-card border border-border rounded-lg p-3">
        <div className="text-[12px] font-medium mb-0.5">Rekomendacje spersonalizowane dla Twojego sklepu</div>
        <div className="text-[10px] text-muted-foreground mb-3">Posortowane wg potencjalnego wpływu na prowizję netto</div>
        <div className="space-y-2">
          {recs.map((rec, i) => (
            <div key={i} className="flex gap-2.5 items-start p-2.5 bg-card border border-border rounded-lg" style={{ borderLeftWidth: 2, borderLeftColor: borderColor[rec.priority] }}>
              <span className="text-base flex-shrink-0 mt-0.5">{rec.icon}</span>
              <div className="flex-1">
                <div className="text-[12px] font-medium mb-0.5">{rec.title}</div>
                <div className="text-[11px] text-muted-foreground leading-snug mb-1.5">{rec.desc}</div>
                <div className="flex items-center gap-2">
                  {rec.priority === 'high' && <Pill variant="bad">Wysoki priorytet</Pill>}
                  {rec.priority === 'medium' && <Pill variant="warn">Średni priorytet</Pill>}
                  {rec.priority === 'low' && <Pill variant="info">Do obserwacji</Pill>}
                  {rec.impact && <span className="text-[10px] text-[#3B6D11]">{rec.impact}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
