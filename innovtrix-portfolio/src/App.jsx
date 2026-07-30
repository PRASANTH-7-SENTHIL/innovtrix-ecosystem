import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#050505] text-zinc-100 bg-grid-pattern relative overflow-hidden transition-all duration-300">
        
        {/* Global Gold Ambient Glows in corners and center */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-[#FFBA00]/5 pointer-events-none z-0"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-[#FFBA00]/5 pointer-events-none z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] bg-[#FFBA00]/3 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-[#FFBA00]/5 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-[#FFBA00]/5 pointer-events-none z-0"></div>

        {/* Navigation */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow pt-24 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Legal mode="privacy" />} />
            <Route path="/terms" element={<Legal mode="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  )
}
