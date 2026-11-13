// Adapted from BYQ Supply gem "Odometer Counter"
// https://app.byq.supply/gems/odometer-counter-01
// Motion values are kept exactly as supplied. Styling is ours.
import { useRef } from 'react'
import { gsap, useGSAP, reducedMotion } from '../../lib/motion'

const SPINS = 2

type Props = { value: string; label: string }

export function OdometerCounter({ value, label }: Props) {
  const odoRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const odo = odoRef.current
      if (!odo) return

      const digits = (value || '0').replace(/\D/g, '').split('').map(Number)
      if (!digits.length) return

      const n = digits.length
      const reelData: { reel: HTMLSpanElement; d: number }[] = []
      odo.innerHTML = ''

      digits.forEach((d, i) => {
        const digit = document.createElement('span')
        digit.className = 'odo__digit'
        const reel = document.createElement('span')
        reel.className = 'odo__reel'
        for (let c = 0; c <= SPINS; c++) {
          for (let k = 0; k <= 9; k++) {
            const num = document.createElement('span')
            num.className = 'odo__num'
            num.textContent = String(k)
            reel.appendChild(num)
          }
        }
        digit.appendChild(reel)
        odo.appendChild(digit)
        reelData.push({ reel, d })

        const posFromRight = n - i
        if (posFromRight > 1 && (posFromRight - 1) % 3 === 0) {
          const sep = document.createElement('span')
          sep.className = 'odo__sep'
          sep.textContent = ','
          odo.appendChild(sep)
        }
      })

      const firstNum = reelData[0]?.reel.querySelector<HTMLElement>('.odo__num')
      if (!firstNum) return
      const targetY = (d: number) => -(SPINS * 10 + d) * firstNum.offsetHeight

      if (reducedMotion()) {
        reelData.forEach((r) => gsap.set(r.reel, { y: () => targetY(r.d) }))
        return
      }

      gsap.set(
        reelData.map((r) => r.reel),
        { y: 0 },
      )

      const tl = gsap.timeline({
        scrollTrigger: { trigger: odo, start: 'top 80%', once: true },
      })
      reelData.forEach((r, i) => {
        tl.to(
          r.reel,
          { y: () => targetY(r.d), duration: 0.85 + i * 0.1, ease: 'power4.out' },
          0,
        )
      })
    },
    { scope: odoRef, dependencies: [value] },
  )

  return <span ref={odoRef} className="odo" role="img" aria-label={label} />
}
