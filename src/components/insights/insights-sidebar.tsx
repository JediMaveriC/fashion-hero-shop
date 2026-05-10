import { cn } from '@/lib/utils'
import type { Mode, View } from './insights-data'

interface SidebarProps {
  activeView: View
  mode: Mode
  onViewChange: (view: View) => void
}

const freeNav: { view: View; icon: string; label: string }[] = [
  { view: 'overview', icon: '◎', label: 'Przegląd' },
  { view: 'returns',  icon: '↩', label: 'Zwroty' },
  { view: 'season',   icon: '◷', label: 'Sezonowość' },
]

const catNav: { view: View; icon: string; label: string }[] = [
  { view: 'sizes',  icon: '⊞', label: 'Rozmiary i kolory' },
  { view: 'prices', icon: '◈', label: 'Ceny' },
]

const plusNav: { view: View; icon: string; label: string }[] = [
  { view: 'competitors', icon: '⊛', label: 'Konkurencja' },
  { view: 'forecast',    icon: '↗', label: 'Prognoza' },
  { view: 'ai',          icon: '◈', label: 'Rekomendacje AI' },
]

function NavItem({ item, active, locked, onClick }: {
  item: { view: View; icon: string; label: string }
  active: boolean
  locked?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[12px] text-left transition-colors',
        active
          ? 'bg-[#FAECE7] text-[#993C1D]'
          : 'text-muted-foreground hover:bg-secondary'
      )}
    >
      <span className="w-3.5 text-center flex-shrink-0 text-[12px]">{item.icon}</span>
      <span className="flex-1">{item.label}</span>
      {locked && <span className="text-[10px] text-muted-foreground/50">🔒</span>}
    </button>
  )
}

export function InsightsSidebar({ activeView, mode, onViewChange }: SidebarProps) {
  const isPlus = mode === 'plus'

  return (
    <div className="w-44 bg-card border-r border-border px-2 py-3 flex-shrink-0 min-h-[calc(100vh-88px)]">
      <div className="mb-3.5">
        <div className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-widest px-2 mb-1">Mój sklep</div>
        {freeNav.map((item) => (
          <NavItem key={item.view} item={item} active={activeView === item.view} onClick={() => onViewChange(item.view)} />
        ))}
      </div>
      <div className="mb-3.5">
        <div className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-widest px-2 mb-1">Kategoria</div>
        {catNav.map((item) => (
          <NavItem key={item.view} item={item} active={activeView === item.view} onClick={() => onViewChange(item.view)} />
        ))}
      </div>
      <div className="mb-3.5">
        <div className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-widest px-2 mb-1">PLUS</div>
        {plusNav.map((item) => (
          <NavItem key={item.view} item={item} active={activeView === item.view} locked={!isPlus} onClick={() => onViewChange(item.view)} />
        ))}
      </div>
      {isPlus && (
        <div>
          <div className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-widest px-2 mb-1">Eksport</div>
          <button className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[12px] text-muted-foreground hover:bg-secondary">
            <span className="w-3.5 text-center flex-shrink-0">↓</span>
            Generuj PDF
          </button>
        </div>
      )}
    </div>
  )
}
