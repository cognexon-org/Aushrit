import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronRight } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import Logo from './Logo'
import { NAV_LINKS, SITE, DEMO } from '../config/site'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (to) => {
    const [path, hash] = to.split('#')
    if (hash) return location.pathname === '/' && location.hash === `#${hash}`
    return location.pathname === path
  }

  const linkClass = (to) =>
    `whitespace-nowrap rounded-full px-2.5 py-2 text-[14px] font-medium transition-colors xl:px-3.5 xl:text-[14.5px] ${
      isActive(to) ? 'bg-white/10 text-white' : 'text-white/75 hover:text-white'
    }`

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? 'bg-pine-950/95 shadow-[0_1px_0_rgba(255,255,255,.08)] backdrop-blur' : 'bg-pine-950'
      }`}
    >
      <nav className="container-site flex h-[76px] sm:h-[82px] items-center justify-between" aria-label="Main">
        <Link to="/" aria-label={`${SITE.name} home`} className="flex shrink-0 items-center">
          <Logo className="h-12 sm:h-14 lg:h-[50px] xl:h-[58px] w-auto max-w-[240px]" />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={() => linkClass(l.to)}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-2.5">
          <a
            href={SITE.phoneHref}
            title={`Call ${SITE.phone}`}
            aria-label={`Call ${SITE.phone}`}
            className="hidden h-10 w-10 place-items-center rounded-full text-white/75 ring-1 ring-white/20 transition-colors hover:bg-white/10 hover:text-white xl:grid"
          >
            <Phone size={16} aria-hidden="true" />
          </a>
          <a
            href={DEMO.request}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Request the live demo on WhatsApp"
            title="Request the live demo on WhatsApp"
            className="btn-ghost-dark whitespace-nowrap !px-3 !py-2.5 text-[14px] xl:!px-4"
          >
            <WhatsAppIcon size={16} className="text-[#25D366]" />
            <span className="hidden xl:inline">Live demo</span>
          </a>
          <Link to="/#contact" className="btn-primary whitespace-nowrap !px-5 !py-2.5 text-[14px]">
            Book a demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

    </header>

    {/* Kept outside <header>: its backdrop-blur would otherwise trap this fixed panel inside the header box. */}
    <div
      id="mobile-menu"
      className={`fixed inset-x-0 bottom-0 top-[76px] z-[45] overflow-y-auto bg-pine-950 transition-[opacity,transform] duration-300 sm:top-[82px] lg:hidden ${
        open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
      hidden={!open}
    >
      <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]" aria-hidden="true" />
      <ul className="container-site relative flex flex-col gap-1 py-6">
        {NAV_LINKS.map((l, i) => (
          <li key={l.to} className={open ? 'animate-rise' : ''} style={{ animationDelay: `${i * 40}ms` }}>
            <Link
              to={l.to}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-[22px] font-semibold transition-colors ${
                isActive(l.to) ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              {l.label}
              <ChevronRight size={20} className="text-marigold-400" aria-hidden="true" />
            </Link>
          </li>
        ))}
        <li className="mt-6 flex flex-col gap-3 px-1">
          <Link to="/#contact" onClick={() => setOpen(false)} className="btn-primary w-full">Book a demo</Link>
          <a href={DEMO.request} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-ghost-dark w-full">
            <WhatsAppIcon size={17} className="text-[#25D366]" /> Get the live demo on WhatsApp
          </a>
          <a href={SITE.phoneHref} className="btn-ghost-dark w-full">
            <Phone size={16} aria-hidden="true" /> Call {SITE.phone}
          </a>
        </li>
      </ul>
    </div>
    </>
  )
}

export default Navbar
