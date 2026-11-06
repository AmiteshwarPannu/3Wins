import type { ReactNode } from 'react'

type SmartLinkProps = {
  href: string | null
  children: ReactNode
  className?: string
  disabledClassName?: string
  disabledTitle?: string
  onClick?: () => void
}

const isExternal = (href: string) => /^https?:\/\//.test(href)

/** A link that shows an honest disabled state when its destination isn't configured. */
export function SmartLink({ href, children, className, disabledClassName, disabledTitle = 'Not configured yet', onClick }: SmartLinkProps) {
  if (!href) {
    return (
      <span aria-disabled="true" title={disabledTitle} className={disabledClassName ?? className}>
        {children}
      </span>
    )
  }
  return (
    <a href={href} className={className} onClick={onClick} {...(isExternal(href) ? { rel: 'noopener' } : {})}>
      {children}
    </a>
  )
}
