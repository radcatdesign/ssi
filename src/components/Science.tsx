import { useRef } from 'react'
import { science } from '../content'
import { reveal, useGSAP } from '../lib/motion'
import { StickyMediaSwap } from './gems/StickyMediaSwap'

export function Science() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => reveal(ref.current), { scope: ref })

  return (
    <section ref={ref} className="science" id="science">
      <div className="wrap sec-head">
        <h2 className="h2" data-rise>
          {science.title}
        </h2>
        <div className="sec-head__side">
          <p className="lead" data-rise>
            {science.lead}
          </p>
          <a className="link" href={science.link.href} data-fade>
            {science.link.label}
          </a>
        </div>
      </div>
      <div className="wrap">
        <StickyMediaSwap entries={science.questions} linkLabel="Read more" />
      </div>
    </section>
  )
}
