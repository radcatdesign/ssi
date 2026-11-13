import { useRef } from 'react'
import { resources } from '../content'
import { reveal, useGSAP } from '../lib/motion'

export function Resources() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => reveal(ref.current), { scope: ref })

  return (
    <section ref={ref} className="resources" id="resources">
      <div className="wrap">
        <div className="latest__head">
          <h2 className="h2" data-rise>
            {resources.title}
          </h2>
          <a className="link" href={resources.more.href} data-fade>
            {resources.more.label}
          </a>
        </div>
        <ul className="res">
          {resources.items.map((r) => (
            <li key={r.href}>
              <a className="res__link" href={r.href}>
                <span className="res__media frame" data-curtain>
                  <img src={r.src} alt={r.alt} loading="lazy" />
                </span>
                <span className="res__title">{r.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
