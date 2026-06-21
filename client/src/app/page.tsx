import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import PreviewList from "@/components/preview-list"
import Features from "@/components/features"
import Analysis from "@/components/analysis"
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
        <PreviewList />
        <Features />
        <Analysis />
        <Feedback />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
