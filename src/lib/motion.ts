import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export { gsap, ScrollTrigger, SplitText, useGSAP }

export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The page's shared motion language, applied to everything inside `scope`:
 *   [data-rise]    text rises line by line out of a mask
 *   [data-curtain] image frame opens with a top-down wipe while the image settles
 *   [data-fade]    small supporting copy eases in
 * Call it from inside a useGSAP() so it is cleaned up with the component.
 */
export function reveal(scope: Element | null) {
  if (!scope || reducedMotion()) return

  scope.querySelectorAll<HTMLElement>('[data-rise]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'line',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 115,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        })
      },
    })
  })

  scope.querySelectorAll<HTMLElement>('[data-curtain]').forEach((frame) => {
    const img = frame.querySelector('img')
    const tl = gsap.timeline({
      defaults: { duration: 0.85, ease: 'power3.inOut' },
      scrollTrigger: { trigger: frame, start: 'top 85%', once: true },
    })
    tl.fromTo(
      frame,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)' },
      0,
    )
    if (img) {
      tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.25, ease: 'power2.out' }, 0)
    }
  })

  scope.querySelectorAll<HTMLElement>('[data-fade]').forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 18,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  })
}
