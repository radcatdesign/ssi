import { useRef, useState } from 'react'
import { nav, donate, site } from '../content'
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from '../lib/motion'

export function Header() {
  const ref = useRef<HTMLElement>(null)
  const donateRef = useRef<HTMLAnchorElement>(null)
  const [open, setOpen] = useState(false)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      // Tuck the bar away on the way down, bring it back on the way up.
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate(self) {
          const y = self.scroll()
          el.classList.toggle('is-stuck', y > 24)
          if (reducedMotion()) return
          const hide = self.direction === 1 && y > 240 && !el.classList.contains('is-open')
          gsap.to(el, { yPercent: hide ? -110 : 0, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
        },
      })

      // The donate button leans toward the pointer.
      const btn = donateRef.current
      if (!btn || reducedMotion() || !window.matchMedia('(hover: hover)').matches) return
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' })
      const move = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.3)
      }
      const leave = () => {
        xTo(0)
        yTo(0)
      }
      btn.addEventListener('pointermove', move)
      btn.addEventListener('pointerleave', leave)
      return () => {
        btn.removeEventListener('pointermove', move)
        btn.removeEventListener('pointerleave', leave)
      }
    },
    { scope: ref },
  )

  useGSAP(
    () => {
      if (!open || reducedMotion()) return
      gsap.from('.menu__link', { yPercent: 110, duration: 0.7, ease: 'power3.out', stagger: 0.05 })
    },
    { scope: ref, dependencies: [open] },
  )

  return (
    <header ref={ref} className={`header${open ? ' is-open' : ''}`}>
      <div className="wrap header__bar">
        <a className="header__logo" href={site.url} aria-label={`${site.name} home`}>
          <img src={site.logo} alt={site.name} />
        </a>
        <nav className="header__nav" aria-label="Main">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a ref={donateRef} className="btn btn--solid header__donate" href={donate.href}>
          {donate.label}
        </a>
        <button
          className="header__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div id="menu" className="menu" hidden={!open}>
        <nav className="wrap" aria-label="Mobile">
          {nav.map((item) => (
            <span key={item.href} className="menu__row">
              <a className="menu__link" href={item.href}>
                {item.label}
              </a>
            </span>
          ))}
          <span className="menu__row">
            <a className="menu__link menu__link--donate" href={donate.href}>
              {donate.label}
            </a>
          </span>
        </nav>
      </div>
    </header>
  )
}
