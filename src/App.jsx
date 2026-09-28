import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import NotFound from './pages/NotFound'

function useHashScroll() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      // Wait a frame so the target page has rendered.
      const id = setTimeout(() => {
        const el = document.querySelector(location.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
      return () => clearTimeout(id)
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash, location.key])
}

function useReveal() {
  const location = useLocation()
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])
}

function App() {
  useHashScroll()
  useReveal()

  return (
    <div className="font-body">
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
