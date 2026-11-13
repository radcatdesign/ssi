import { useEffect } from 'react'
import { belief } from './content'
import { ScrollTrigger } from './lib/motion'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ScrollTextReveal } from './components/gems/ScrollTextReveal'
import { Science } from './components/Science'
import { Impact } from './components/Impact'
import { Latest } from './components/Latest'
import { Resources } from './components/Resources'
import { Support } from './components/Support'
import { Footer } from './components/Footer'

export default function App() {
  // Re-measure once fonts and late images have settled.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ScrollTextReveal text={belief.text} label="Core values">
          <a className="btn btn--ink" href={belief.link.href}>
            {belief.link.label}
          </a>
        </ScrollTextReveal>
        <Science />
        <Impact />
        <Latest />
        <Resources />
        <Support />
      </main>
      <Footer />
    </>
  )
}
