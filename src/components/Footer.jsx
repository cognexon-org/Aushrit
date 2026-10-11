import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import Logo from './Logo'
import { SITE, DEMO } from '../config/site'

const PRODUCT = [
  { label: 'All modules', to: '/#modules' },
  { label: 'Smart features', to: '/#smart' },
  { label: 'Core features', to: '/#features' },
  { label: 'User roles', to: '/#roles' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Book a demo', to: '/#contact' },
  { label: 'Live demo', href: DEMO.url },
]

const CAPABILITIES = [
  { label: 'AI summaries and voice Rx', to: '/#smart' },
  { label: 'Insurance-ready claims', to: '/#smart' },
  { label: 'ABDM and ABHA', to: '/#modules' },
  { label: 'NABH and PM-JAY', to: '/#features' },
  { label: 'OPD, IPD and OT', to: '/#modules' },
  { label: 'Pharmacy and diagnostics', to: '/#modules' },
  { label: 'Integrations and backups', to: '/#modules' },
]

const COMPANY = [
  { label: 'About us', to: '/about' },
  { label: 'Pricing and FAQ', to: '/pricing' },
  { label: 'Contact', to: '/#contact' },
]

const linkCls = 'text-[14.5px] text-white/60 transition-colors hover:text-marigold-400'
const headCls = 'mb-4 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-marigold-400'
const iconCls = 'grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-marigold-400 ring-1 ring-white/10'

const Footer = () => (
  <footer className="relative overflow-hidden bg-pine-950 text-white">
    <div className="glow-pine pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] opacity-60" aria-hidden="true" />
    <div className="container-site relative">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/10 pb-12 pt-14 sm:gap-12 sm:pb-14 sm:pt-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        <div className="col-span-2 lg:col-span-1">
          <Logo className="h-14 sm:h-16 lg:h-[70px] w-auto max-w-[280px]" />
          <p className="mt-5 max-w-[34ch] text-[14.5px] leading-relaxed text-white/60">
            Hospital ERP for India with ABDM-ready interoperability, NABH-aligned records, Ayushman Bharat / PM-JAY support, AI and voice
            assistance, connected devices and cloud or on-premise deployment.
          </p>
        </div>

        <nav aria-label="Product">
          <h2 className={headCls}>Product</h2>
          <ul className="space-y-2.5">
            {PRODUCT.map((l) => (
              <li key={l.label}>
                {l.href
                  ? <a href={l.href} target="_blank" rel="noopener" className={linkCls}>{l.label}</a>
                  : <Link to={l.to} className={linkCls}>{l.label}</Link>}
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Capabilities" className="order-last col-span-2 sm:order-none sm:col-span-1">
          <h2 className={headCls}>Capabilities</h2>
          <ul className="space-y-2.5">
            {CAPABILITIES.map((c) => <li key={c.label}><Link to={c.to} className={linkCls}>{c.label}</Link></li>)}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className={headCls}>Company</h2>
          <ul className="space-y-2.5">
            {COMPANY.map((l) => <li key={l.label}><Link to={l.to} className={linkCls}>{l.label}</Link></li>)}
          </ul>
        </nav>

        <div className="col-span-2 sm:col-span-1">
          <h2 className={headCls}>Contact</h2>
          <ul className="space-y-3 text-[14.5px] text-white/60">
            <li className="flex items-center gap-3">
              <span className={iconCls}><MapPin size={15} aria-hidden="true" /></span>{SITE.city}
            </li>
            <li>
              <a href={SITE.phoneHref} className="flex items-center gap-3 hover:text-white">
                <span className={iconCls}><Phone size={15} aria-hidden="true" /></span>{SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-white">
                <span className={iconCls}><Mail size={15} aria-hidden="true" /></span>{SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 py-7 text-[13.5px] text-white/45 md:flex-row">
        <p>© {SITE.year} {SITE.name}. All rights reserved.</p>
        <p className="font-deva text-[15px] text-white/40" lang="hi">हर विभाग, एक रिकॉर्ड।</p>
      </div>
    </div>
  </footer>
)

export default Footer
