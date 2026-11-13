import { useRef } from 'react'
import { hero } from '../content'
import { gsap, SplitText, useGSAP, reducedMotion } from '../lib/motion'

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reducedMotion()) return

      // One page-load sequence: the statement rises, the egg opens, the rest follows.
      SplitText.create('.hero__title', {
        type: 'lines',
        mask: 'lines',
        linesClass: 'line',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.09,
            delay: 0.15,
          })
        },
      })

      gsap
        .timeline({ delay: 0.35, defaults: { duration: 0.85, ease: 'power3.inOut' } })
        .fromTo('.hero__shell', { scale: 0.6, rotate: -32, autoAlpha: 0 }, { scale: 1, rotate: -14, autoAlpha: 1, duration: 1.25, ease: 'power3.out' }, 0)
        .fromTo('.hero__egg', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, 0.15)
        .fromTo('.hero__egg img', { scale: 1.12 }, { scale: 1, duration: 1.25, ease: 'power2.out' }, 0.15)
        .from('.hero__body > *', { autoAlpha: 0, y: 18, duration: 0.8, ease: 'power2.out', stagger: 0.1 }, 0.5)

      // On scroll the photo and the shell behind it drift apart.
      gsap.to('.hero__egg', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__shell', {
        yPercent: 14,
        rotate: -4,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="hero">
      <div className="wrap hero__grid">
        <h1 className="hero__title">{hero.headline}</h1>

        <div className="hero__art">
          <div className="hero__shell" aria-hidden="true" />
          <div className="hero__egg">
            <img src={hero.image.src} alt={hero.image.alt} width={541} height={577} fetchPriority="high" />
          </div>
        </div>

        <div className="hero__body">
          <p className="lead">{hero.body}</p>
          <div className="hero__actions">
            <a className="btn btn--ink" href={hero.primary.href}>
              {hero.primary.label}
            </a>
            <a className="btn btn--line" href={hero.secondary.href}>
              {hero.secondary.label}
            </a>
          </div>
          <p className="hero__founded">{hero.founded}</p>
        </div>
      </div>
    </section>
  )
}
