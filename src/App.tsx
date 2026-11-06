import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ProblemSection } from './components/ProblemSection'
import { ThreeWinsDemo } from './components/ThreeWinsDemo'
import { HowItWorks } from './components/HowItWorks'
import { StreakVisualization } from './components/StreakVisualization'
import { Features } from './components/Features'
import { BrandMoment } from './components/BrandMoment'
import { Testimonials } from './components/Testimonials'
import { Pricing } from './components/Pricing'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

export function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a href="#main" className="btn btn-primary btn-sm fixed top-3 left-3 z-[60] -translate-y-20 focus:translate-y-0">
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <ProblemSection />
          <ThreeWinsDemo />
          <HowItWorks />
          <StreakVisualization />
          <Features />
          <BrandMoment />
          <Testimonials />
          <Pricing />
          <FinalCTA />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
