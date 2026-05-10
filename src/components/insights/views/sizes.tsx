import { cn } from '@/lib/utils'
import { ColorChart } from '../insights-charts'
import type { CategoryData, Mode } from '../insights-data'

interface SizesProps { data: CategoryData; mode: Mode }

export function SizesView({ data, mode }: SizesProps) {
  const isExternal = mode === 'external'
  const content = (
    <div>
      <div className="bg-card border border-border rounded-lg p-3 mb-2">
        <div className="text-[12px] font-medium mb-2">Konwersja per rozmiar — benchmark kategorii</div>
        <div className="grid grid-cols-6 gap-1.5 mt-1">
          {data.sizes.map((s, i) => {
            if (s.value === 0) return <div key={i} />
            return (
              <div key={i} className={cn(
                'border rounded-md p-1.5 text-center',
                s.best  ? 'border-[#97C459] bg-[#EAF3DE]' : '',
                s.worst ? 'border-[#F09595] bg-[#FCEBEB]' : 'border-border',
              )}>
                <div className="text-[10px] text-muted-foreground mb-0.5">{s.label}</div>
                <div className={cn('text-[12px] font-medium', s.best ? 'text-[#3B6D11]' : s.worst ? 'text-[#A32D2D]' : '')}>
                  {s.value.toFixed(1)}%
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-1">Kolory — konwersja vs RR</div>
          <div className="flex gap-2.5 mb-1">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#D85A30]" />Konwersja</span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-[#D3D1C7]" />Return rate</span>
          </div>
          <ColorChart />
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="text-[12px] font-medium mb-2">Rekomendacje</div>
          <ul className="space-y-1.5">
            {[
              ['↑','S i M — 2x lepsza konwersja niż skrajne rozmiary'],
              ['↑','Czarny, granatowy — wysoka konwersja, niski RR'],
              ['⚠','Biały — dobra konwersja, ale RR 41%. Zadbaj o zdjęcia.'],
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
