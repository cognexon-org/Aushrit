import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'
import HeroDashboard from './HeroDashboard'

const FACTS = [
  { value: '18', label: 'connected modules' },
  { value: 'M1–M3', label: 'ABDM milestones' },
  { value: 'AI + voice', label: 'clinical notes' },
]

const Hero = () => (
  <section className="relative overflow-hidden bg-pine-950 pb-20 pt-[120px] text-white sm:pb-28 sm:pt-[140px]">
    <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
    <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
      <div>
        <p className="mb-6 inline-flex animate-rise items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-[13.5px] text-pine-100">
          <span className="h-2 w-2 rounded-full bg-marigold-500" />
          Hospital ERP built for Indian hospitals
        </p>
        <h1 className="animate-rise font-display text-[clamp(38px,5.3vw,64px)] font-extrabold leading-[1.02] tracking-[-0.035em]" style={{ animationDelay: '.08s' }}>
          Run every ward, desk and department from one record.
        </h1>
        <p className="mt-6 max-w-[58ch] animate-rise text-[17.5px] leading-relaxed text-white/70" style={{ animationDelay: '.16s' }}>
          Aushrit connects OPD, IPD, OT, pharmacy, diagnostics, billing and staff on a single patient
          record, with ABDM-ready workflows, NABH-aligned documentation and voice-to-text notes for doctors.
        </p>
        <div className="mt-9 flex animate-rise flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ animationDelay: '.24s' }}>
          <Link to="/#contact" className="btn-primary w-full sm:w-auto">Book a free demo</Link>
          <Link to="/#modules" className="btn-ghost-dark w-full sm:w-auto">
            Explore modules <ArrowDown size={16} aria-hidden="true" />
          </Link>
        </div>

        <dl className="mt-12 grid max-w-[520px] animate-rise grid-cols-3 gap-3 sm:gap-4 border-t border-white/10 pt-6" style={{ animationDelay: '.32s' }}>
          {FACTS.map((f) => (
            <div key={f.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-[12px] leading-snug text-white/55 sm:text-[13px]">{f.label}</dt>
              <dd className="font-display text-[clamp(20px,2.4vw,28px)] font-bold text-marigold-400">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="animate-rise lg:pl-6" style={{ animationDelay: '.3s' }}>
        <HeroDashboard />
      </div>
    </div>
  </section>
)

export default Hero
