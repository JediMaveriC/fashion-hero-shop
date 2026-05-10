import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string
  delta?: string
  bench?: string
  valueVariant?: 'up' | 'down' | 'neutral' | 'default'
  blurred?: boolean
}

export function MetricCard({ label, value, delta, bench, valueVariant = 'default', blurred }: MetricCardProps) {
  const valueColor = {
    up: 'text-[#3B6D11]',
    down: 'text-[#A32D2D]',
    neutral: 'text-muted-foreground',
    default: 'text-foreground',
  }[valueVariant]

  return (
    <div className={cn('bg-card border border-border rounded-lg p-3', blurred && 'blur-sm pointer-events-none select-none')}>
      <div className="text-[10px] text-muted-foreground mb-0.5">{label}</div>
      <div className={cn('text-lg font-medium leading-tight mb-0.5', valueColor)}>{value}</div>
      {delta && <div className="text-[11px] text-muted-foreground">{delta}</div>}
      {bench && <div className="text-[10px] text-muted-foreground mt-0.5">{bench}</div>}
    </div>
  )
}
