import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { links, navItems } from '../content/site'
import { Logo } from './ui/Logo'
import { SmartLink } from './ui/SmartLink'

const SIGN_IN_TITLE = 'Set VITE_SIGN_IN_URL to link this to your app'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)
  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5">
      <div
        className={`mx-auto max-w-[68rem] overflow-hidden rounded-[1.4rem] transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          solid
            ? 'bg-ink-900/75 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.09),0_20px_50px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <nav aria-label="Main" className="flex h-14 items-center justify-between pr-2 pl-4 md:pr-2.5 md:pl-5">
          <a href="#top" aria-label="3 Wins, back to top" className="rounded-md">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-full px-3.5 py-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <SmartLink
              href={links.signIn}
              disabledTitle={SIGN_IN_TITLE}
              className="hidden rounded-full px-3.5 py-2 text-sm text-fg transition-colors hover:text-win-300 sm:block"
              disabledClassName="hidden cursor-not-allowed rounded-full px-3.5 py-2 text-sm text-fg-dim sm:block"
            >
              Sign In
            </SmartLink>
            <a href={links.getStarted} className="btn btn-primary btn-sm">
              Get Started
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
              className="grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-white/8 lg:hidden"
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <div id="mobile-menu" hidden={!open} className="border-t border-white/8 px-2 pt-2 pb-3 lg:hidden">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close} className="block rounded-xl px-3 py-3 text-[1.05rem] tracking-[-0.01em] text-fg transition-colors hover:bg-white/5">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <SmartLink
                href={links.signIn}
                onClick={close}
                disabledTitle={SIGN_IN_TITLE}
                className="block rounded-xl px-3 py-3 text-[1.05rem] tracking-[-0.01em] text-fg hover:bg-white/5"
                disabledClassName="block cursor-not-allowed rounded-xl px-3 py-3 text-[1.05rem] tracking-[-0.01em] text-fg-dim"
              >
                Sign In
              </SmartLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
