import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import PreviewCarousel from "@/components/preview-carousel"
import Features from "@/components/features"
import Statistics from "@/components/statistics"
import Analysis from "@/components/analysis"
import Testimonials from "@/components/testimonials"
import Benefits from "@/components/benefits"
import Feedback from "@/components/feedback"
import FAQ from "@/components/faq"
import FinalCta from "@/components/final-cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PreviewCarousel />
        <Features />
        <Statistics />
        <Analysis />
        <Testimonials />
        <Feedback />
        <Benefits />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
