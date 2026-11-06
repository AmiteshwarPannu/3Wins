import { logoSrc } from '../../lib/assets'

/** Placeholder mark until src/assets/logo.* exists. */
export function Logo({ className = '' }: { className?: string }) {
  if (logoSrc) {
    return <img src={logoSrc} alt="3 Wins" className={`h-7 w-auto ${className}`} />
  }
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden="true" className="flex h-[18px] items-end gap-[3px]">
        <span className="h-[8px] w-[4px] rounded-full bg-win-400/55" />
        <span className="h-[13px] w-[4px] rounded-full bg-win-400/80" />
        <span className="h-[18px] w-[4px] rounded-full bg-win-400" />
      </span>
      <span className="text-[1.05rem] font-semibold tracking-[-0.03em] text-fg">3 Wins</span>
    </span>
  )
}
