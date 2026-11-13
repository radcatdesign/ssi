import { useRef } from 'react'
import { footer, nav, site } from '../content'
import { gsap, SplitText, reveal, useGSAP, reducedMotion } from '../lib/motion'

export function Footer() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      reveal(ref.current)
      if (reducedMotion()) return
      SplitText.create('.footer__mark', {
        type: 'chars',
        mask: 'chars',
        charsClass: 'char',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.chars, {
            yPercent: 110,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.025,
            scrollTrigger: { trigger: '.footer__mark', start: 'top 96%', once: true },
          })
        },
      })
    },
    { scope: ref },
  )

  return (
    <footer ref={ref} className="footer">
      <div className="wrap">
        <div className="footer__news">
          <h2 className="h2" data-rise>
            {footer.newsletter.title}
          </h2>
          <div className="footer__news-side">
            <p className="lead">{footer.newsletter.text}</p>
            <a className="btn btn--egg" href={footer.newsletter.cta.href}>
              {footer.newsletter.cta.label}
            </a>
          </div>
        </div>

        <div className="footer__cols">
          <address className="footer__col">
            {footer.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <span>
              Tel <a href={`tel:+1${footer.phone.replace(/\D/g, '')}`}>{footer.phone}</a>
            </span>
            <span>Fax {footer.fax}</span>
            <a href={`mailto:${footer.email}`}>{footer.email}</a>
          </address>
          <nav className="footer__col" aria-label="Footer">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <nav className="footer__col" aria-label="Social">
            {footer.social.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="footer__mark" aria-hidden="true">
          {site.name}
        </p>

        <div className="footer__legal">
          <p>{footer.legal}</p>
          <p>{footer.nonprofit}</p>
          <a href={footer.privacy.href}>{footer.privacy.label}</a>
        </div>
      </div>
    </footer>
  )
}
