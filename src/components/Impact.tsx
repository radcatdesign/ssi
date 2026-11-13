import { useRef } from 'react'
import { impact } from '../content'
import { gsap, reveal, useGSAP, reducedMotion } from '../lib/motion'
import { OdometerCounter } from './gems/OdometerCounter'

export function Impact() {
  const ref = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      reveal(ref.current)

      const stage = stageRef.current
      const track = trackRef.current
      if (!stage || !track || reducedMotion()) return

      // Wide screens: the years travel sideways while the section holds still.
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        stage.classList.add('is-pinned')
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        tl.to(track, { x: () => -distance() }, 0)
        tl.fromTo('.tl__bar', { scaleX: 0 }, { scaleX: 1 }, 0)
        return () => stage.classList.remove('is-pinned')
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="impact" id="impact">
      <div className="wrap sec-head">
        <h2 className="h2" data-rise>
          {impact.title}
        </h2>
        <div className="sec-head__side">
          <p className="lead" data-rise>
            {impact.lead}
          </p>
          <a className="link" href={impact.link.href} data-fade>
            {impact.link.label}
          </a>
        </div>
      </div>

      <ul className="wrap stats">
        {impact.stats.map((s) => (
          <li key={s.label} className="stat">
            <p className="stat__num">
              {s.before ? <span className="stat__before">{s.before}</span> : null}
              <OdometerCounter value={s.value} label={`${s.before} ${s.value}${s.after}`.trim()} />
              {s.after ? <span aria-hidden="true">{s.after}</span> : null}
            </p>
            <p className="stat__label">{s.label}</p>
          </li>
        ))}
      </ul>

      <div ref={stageRef} className="tl">
        <ol ref={trackRef} className="tl__track">
          {impact.milestones.map((m) => (
            <li key={m.year} className="tl__item">
              <p className="tl__year">{m.year}</p>
              <div className="tl__media frame">
                <img src={m.src} alt="" loading="lazy" />
              </div>
              <h3 className="tl__title">
                <a href={m.href}>{m.title}</a>
              </h3>
              <p className="tl__text">{m.text}</p>
            </li>
          ))}
        </ol>
        <div className="tl__rail" aria-hidden="true">
          <div className="tl__bar" />
        </div>
      </div>
    </section>
  )
}
