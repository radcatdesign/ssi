import { useRef } from 'react'
import { support, donate } from '../content'
import { reveal, useGSAP } from '../lib/motion'

export function Support() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => reveal(ref.current), { scope: ref })
  const g = support.gala

  return (
    <section ref={ref} className="support" id="support">
      <div className="wrap support__grid">
        <div className="support__main">
          <h2 className="h2" data-rise>
            {support.title}
          </h2>
          <p className="support__text" data-rise>
            {support.text}
          </p>
          <div className="hero__actions" data-fade>
            <a className="btn btn--paper" href={donate.href}>
              {donate.label}
            </a>
            <a className="btn btn--line" href={support.primary.href}>
              {support.primary.label}
            </a>
          </div>
        </div>

        <article className="gala">
          <a className="gala__media frame" href={g.href} data-curtain tabIndex={-1} aria-hidden="true">
            <img src={g.src} alt="" loading="lazy" width={354} height={199} />
          </a>
          <h3 className="gala__title">
            <a href={g.href}>{g.title}</a>
          </h3>
          <p className="gala__text">{g.text}</p>
        </article>
      </div>
    </section>
  )
}
