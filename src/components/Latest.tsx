import { useRef } from 'react'
import { latest } from '../content'
import { reveal, useGSAP } from '../lib/motion'

export function Latest() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => reveal(ref.current), { scope: ref })
  const f = latest.featured

  return (
    <section ref={ref} className="latest" id="latest">
      <div className="wrap">
        <div className="latest__head">
          <h2 className="h2" data-rise>
            {latest.title}
          </h2>
          <a className="link" href={latest.link.href} data-fade>
            {latest.link.label}
          </a>
        </div>

        <article className="feature">
          <a className="feature__media frame" href={f.href} data-curtain tabIndex={-1} aria-hidden="true">
            <img src={f.src} alt="" />
          </a>
          <div className="feature__body">
            <time className="date">{f.date}</time>
            <h3 className="feature__title" data-rise>
              <a href={f.href}>{f.title}</a>
            </h3>
            <p className="feature__text" data-fade>
              {f.text}
            </p>
            <a className="link" href={f.href} data-fade>
              Read more
            </a>
          </div>
        </article>

        <ul className="stories">
          {latest.more.map((n) => (
            <li key={n.href} className="story">
              <a href={n.href} className="story__link">
                <span className="story__media frame" data-curtain>
                  <img src={n.src} alt={n.alt} loading="lazy" width={354} height={199} />
                </span>
                <time className="date">{n.date}</time>
                <span className="story__title">{n.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
