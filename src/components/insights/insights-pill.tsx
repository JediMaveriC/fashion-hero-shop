import { cn } from '@/lib/utils'

type PillVariant = 'ok' | 'warn' | 'bad' | 'info'

interface PillProps {
  variant: PillVariant
  children: React.ReactNode
}

const styles: Record<PillVariant, string> = {
  ok:   'bg-[#EAF3DE] text-[#3B6D11]',
  warn: 'bg-[#FAEEDA] text-[#854F0B]',
  bad:  'bg-[#FCEBEB] text-[#A32D2D]',
  info: 'bg-[#E6F1FB] text-[#185FA5]',
}

export function Pill({ variant, children }: PillProps) {
  return (
    <span className={cn('inline-block text-[10px] px-1.5 py-px rounded-full font-medium', styles[variant])}>
      {children}
    </span>
  )
}
