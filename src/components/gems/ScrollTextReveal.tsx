// Adapted from BYQ Supply gem "Scroll Text Reveal"
// https://app.byq.supply/gems/scroll-text-reveal-01
// Motion values are kept exactly as supplied. Styling is ours.
import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, reducedMotion } from '../../lib/motion'

type Props = { text: string; children?: ReactNode; label?: string }

export function ScrollTextReveal({ text, children, label }: Props) {
  const rootRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const afterRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const pin = pinRef.current
      const stage = stageRef.current
      const h2 = h2Ref.current
      if (!pin || !stage || !h2) return

      // Split headline into word-mask pairs
      const words = text.trim().split(/\s+/)
      h2.textContent = ''
      const inners: HTMLSpanElement[] = []
      words.forEach((w, idx) => {
        const wordSpan = document.createElement('span')
        wordSpan.className = 'str__word'
        const innerSpan = document.createElement('span')
        innerSpan.className = 'str__inner'
        innerSpan.textContent = w
        wordSpan.appendChild(innerSpan)
        h2.appendChild(wordSpan)
        if (idx < words.length - 1) h2.appendChild(document.createTextNode(' '))
        inners.push(innerSpan)
      })

      if (reducedMotion()) {
        gsap.set(inners, { yPercent: 0 })
        return
      }

      gsap.set(inners, { yPercent: 115 })
      if (afterRef.current) gsap.set(afterRef.current, { autoAlpha: 0, y: 16 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: 'bottom bottom',
          pin: stage,
          scrub: 0.8,
        },
      })

      tl.to(inners, {
        yPercent: 0,
        ease: 'power3.out',
        duration: 1,
        stagger: 0.35,
      })
      if (afterRef.current) {
        tl.to(afterRef.current, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' })
        tl.to({}, { duration: 0.5 })
      } else {
        tl.to({}, { duration: 1.5 })
      }
    },
    { scope: rootRef, dependencies: [text] },
  )

  return (
    <section ref={rootRef} className="str" aria-label={label}>
      <div ref={pinRef} className="str__pin">
        <div ref={stageRef} className="str__stage">
          <div className="wrap">
            <h2 ref={h2Ref} className="str__headline" aria-label={text}>
              {text}
            </h2>
            {children ? (
              <div ref={afterRef} className="str__after">
                {children}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
