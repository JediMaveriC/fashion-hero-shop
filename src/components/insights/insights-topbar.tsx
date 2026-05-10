import { cn } from '@/lib/utils'
import type { Mode } from './insights-data'

interface TopbarProps {
  mode: Mode
}

export function InsightsTopbar({ mode }: TopbarProps) {
  const isPlus = mode === 'plus'
  const isExternal = mode === 'external'

  return (
    <div className="bg-card border-b border-border px-4 flex items-center justify-between h-11 sticky top-0 z-50">
      <div className="flex items-center gap-1.5 text-[14px] font-medium">
        <div className="w-2 h-2 rounded-full bg-[#D85A30] flex-shrink-0" />
        FashionHero Insights
      </div>
      <div className="flex items-center gap-2">
        <span className={cn(
          'text-[11px] px-2 py-0.5 rounded-full font-medium cursor-pointer border',
          isPlus
            ? 'bg-[#FAECE7] text-[#993C1D] border-[#F5C4B3]'
            : 'bg-secondary text-muted-foreground border-border'
        )}>
          {isExternal ? 'Gość' : isPlus ? 'PLUS' : 'Free'}
        </span>
        {!isExternal && (
          <div className="w-6 h-6 rounded-full bg-[#F5C4B3] flex items-center justify-center text-[10px] font-medium text-[#712B13]">
            MK
          </div>
        )}
      </div>
    </div>
  )
}
