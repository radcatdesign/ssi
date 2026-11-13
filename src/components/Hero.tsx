import { useRef } from 'react'
import { hero } from '../content'
import { gsap, ScrollTrigger, SplitText, useGSAP, reducedMotion } from '../lib/motion'

const FULL_CLIP = 'inset(0% 0% 0% 0%)'

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const imgs = gsap.utils.toArray<HTMLImageElement>('.hero__egg img')
      imgs.forEach((img, i) => gsap.set(img, { autoAlpha: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }))

      if (reducedMotion()) return

      // Page load: the line rises, the shell swings in, the egg opens.
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
        .timeline({ delay: 0.3, defaults: { duration: 0.85, ease: 'power3.inOut' } })
        .fromTo(
          '.hero__shell-wrap',
          { scale: 0.6, rotate: -34, autoAlpha: 0 },
          { scale: 1, rotate: -14, autoAlpha: 1, duration: 1.25, ease: 'power3.out' },
          0,
        )
        .fromTo('.hero__egg', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: FULL_CLIP }, 0.15)
        .fromTo(imgs[0], { scale: 1.12 }, { scale: 1, duration: 1.25, ease: 'power2.out' }, 0.15)
        .from('.hero__body > *', { autoAlpha: 0, y: 18, duration: 0.8, ease: 'power2.out', stagger: 0.1 }, 0.45)

      // The egg wipes through the photos (same wipe as the Our Science frame).
      let current = 0
      let swaps = 0
      const next = () => {
        if (imgs.length < 2) return
        const incoming = imgs[(current + 1) % imgs.length]
        const outgoing = imgs[current]
        current = (current + 1) % imgs.length
        swaps += 1
        const fromTop = swaps % 2 === 1

        gsap.killTweensOf(imgs)
        imgs.forEach((img) => {
          if (img !== incoming && img !== outgoing) {
            gsap.set(img, { autoAlpha: 0, zIndex: 0, yPercent: 0, scale: 1 })
          }
        })
        gsap.set(outgoing, { zIndex: 1, autoAlpha: 1, clipPath: FULL_CLIP })
        gsap.set(incoming, {
          zIndex: 2,
          autoAlpha: 1,
          yPercent: 0,
          scale: 1.12,
          clipPath: fromTop ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)',
        })
        gsap
          .timeline({ defaults: { duration: 0.85, ease: 'power3.inOut' } })
          .to(incoming, { clipPath: FULL_CLIP }, 0)
          .to(incoming, { scale: 1, duration: 1.25, ease: 'power2.out' }, 0)
          .to(outgoing, { yPercent: fromTop ? 7 : -7, scale: 1.05 }, 0)
          .set(outgoing, { autoAlpha: 0, zIndex: 0, yPercent: 0, scale: 1 })
      }
      const cycle = gsap.to({}, { duration: 4.5, repeat: -1, onRepeat: next })
      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? cycle.resume() : cycle.pause()),
      })

      // Scroll: the shell grows past the edges and hands off to the egg-blue section below.
      gsap.to('.hero__shell', {
        scale: 9,
        ease: 'power2.in',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__egg', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      })

      // Pointer: egg and shell lean in opposite directions.
      if (!window.matchMedia('(hover: hover)').matches) return
      const eggX = gsap.quickTo('.hero__egg', 'x', { duration: 0.9, ease: 'power3.out' })
      const eggY = gsap.quickTo('.hero__egg', 'y', { duration: 0.9, ease: 'power3.out' })
      const shellX = gsap.quickTo('.hero__shell-wrap', 'x', { duration: 1.2, ease: 'power3.out' })
      const shellY = gsap.quickTo('.hero__shell-wrap', 'y', { duration: 1.2, ease: 'power3.out' })
      const move = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        eggX(nx * -18)
        eggY(ny * -18)
        shellX(nx * 34)
        shellY(ny * 34)
      }
      root.addEventListener('pointermove', move)
      return () => root.removeEventListener('pointermove', move)
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">{hero.headline}</h1>
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
          </div>
        </div>

        <div className="hero__art">
          <div className="hero__shell-wrap" aria-hidden="true">
            <div className="hero__shell" />
          </div>
          <div className="hero__egg">
            {hero.images.map((img, i) => (
              <img
                key={img.src}
                src={img.src}
                alt={i === 0 ? img.alt : ''}
                fetchPriority={i === 0 ? 'high' : 'low'}
                onError={(e) => {
                  const el = e.currentTarget
                  if (img.fallback && el.src !== img.fallback) el.src = img.fallback
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
