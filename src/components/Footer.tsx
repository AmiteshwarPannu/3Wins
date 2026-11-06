import { footer } from '../content/copy'
import { footerLinks } from '../content/site'
import { Logo } from './ui/Logo'

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-ink-950">
      <div className="shell flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between md:py-14">
        <div>
          <Logo />
          <p className="mt-3 text-[0.95rem] text-fg-muted">{footer.statement}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
            {footerLinks.map((link) => (
              <li key={link.label} className="text-sm">
                {link.href ? (
                  <a href={link.href} {...(/^https?:/.test(link.href) ? { rel: 'noopener' } : {})} className="text-fg-muted transition-colors hover:text-fg">
                    {link.label}
                  </a>
                ) : (
                  /* Not a link: this page isn't published yet, and we shouldn't imply it is. */
                  <span className="text-fg-dim">
                    {link.label} <span className="ml-1 font-mono text-[0.62rem] tracking-wide uppercase">Soon</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="shell pb-10">
        <p className="text-xs text-fg-dim">© {COPYRIGHT_YEAR} 3 Wins. All rights reserved.</p>
      </div>
    </footer>
  )
}

const COPYRIGHT_YEAR = new Date().getFullYear()
