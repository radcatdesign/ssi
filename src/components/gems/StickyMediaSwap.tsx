// Adapted from BYQ Supply gem "Sticky Media Swap"
// https://app.byq.supply/gems/sticky-media-swap-01
// Wipe, settle and nudge values are kept exactly as supplied. Styling is ours.
import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/motion'

const FULL_CLIP = 'inset(0% 0% 0% 0%)'

export type SwapEntry = {
  title: string
  line: string
  href: string
  src: string
  alt: string
}

export function StickyMediaSwap({ entries, linkLabel }: { entries: SwapEntry[]; linkLabel: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const mediaRefs = useRef<(HTMLImageElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(
    () => {
      const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[]
      const medias = mediaRefs.current.filter(Boolean) as HTMLImageElement[]
      if (steps.length !== entries.length || medias.length !== entries.length) return

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
      let current = 0
      let swaps = 0

      medias.forEach((img, i) => {
        gsap.set(img, {
          autoAlpha: i === 0 ? 1 : 0,
          zIndex: i === 0 ? 1 : 0,
          clipPath: FULL_CLIP,
        })
      })
      setActiveIndex(0)

      const swapTo = (index: number) => {
        if (index === current) return
        const incoming = medias[index]
        const outgoing = medias[current]
        current = index
        setActiveIndex(index)

        gsap.killTweensOf(medias)

        if (reduce.matches) {
          medias.forEach((img, i) => {
            gsap.set(img, {
              autoAlpha: i === index ? 1 : 0,
              zIndex: i === index ? 1 : 0,
              clipPath: FULL_CLIP,
              yPercent: 0,
              scale: 1,
            })
          })
          return
        }

        swaps += 1
        const fromTop = swaps % 2 === 1

        medias.forEach((img) => {
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

      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) swapTo(i)
          },
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="sms">
      <div className="sms__entries">
        {entries.map((item, i) => (
          <div
            key={item.href}
            ref={(el) => {
              stepRefs.current[i] = el
            }}
            className={`sms__step${activeIndex === i ? ' is-active' : ''}`}
          >
            <article className="sms__entry">
              <span className="sms__inline frame" data-curtain>
                <img src={item.src} alt={item.alt} loading="lazy" />
              </span>
              <h3 className="sms__title">{item.title}</h3>
              <p className="sms__line">{item.line}</p>
              <a className="link" href={item.href}>
                {linkLabel}
              </a>
            </article>
          </div>
        ))}
      </div>

      <div className="sms__stage" aria-hidden="true">
        <div className="sms__frame">
          {entries.map((item, i) => (
            <img
              key={item.href}
              ref={(el) => {
                mediaRefs.current[i] = el
              }}
              src={item.src}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
