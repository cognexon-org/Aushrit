import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { SITE, whatsappLink } from '../config/site'
import WhatsAppIcon from './WhatsAppIcon'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waHref = whatsappLink(SITE.whatsappMessage)

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.4s]" aria-hidden="true" />
        <span className="relative"><WhatsAppIcon /></span>
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-pine-950 px-3.5 py-1.5 text-[13px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
      </a>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
        className={`grid h-12 place-items-center overflow-hidden rounded-full bg-marigold-500 text-pine-950 shadow-lg transition-all duration-300 hover:bg-marigold-400 ${
          visible ? 'ml-3 w-12 opacity-100' : 'pointer-events-none ml-0 w-0 opacity-0'
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  )
}

export default ScrollToTop
