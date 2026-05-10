import { cn } from '@/lib/utils'
import type { Mode } from './insights-data'

interface ModeBarProps {
  mode: Mode
  onModeChange: (mode: Mode) => void
}

const modes: { value: Mode; label: string }[] = [
  { value: 'free', label: 'Sprzedawca Free' },
  { value: 'plus', label: 'Sprzedawca PLUS' },
  { value: 'external', label: 'Osoba z zewnątrz' },
]

export function InsightsModeBar({ mode, onModeChange }: ModeBarProps) {
  return (
    <div className="bg-card border-b border-border px-4 py-1.5 flex items-center gap-1.5">
      <span className="text-[11px] text-muted-foreground mr-1">Demo:</span>
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onModeChange(m.value)}
          className={cn(
            'text-[11px] px-2.5 py-1 rounded-full border transition-colors',
            mode === m.value
              ? 'bg-[#D85A30] text-white border-[#D85A30]'
              : 'bg-transparent text-muted-foreground border-border hover:text-foreground'
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
