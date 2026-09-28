import React from 'react'
import { Link } from 'react-router-dom'
import { HeartHandshake, Lock, Sparkles, Hospital, Linkedin, Target, Eye } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import RailHint from '../components/RailHint'
import Logo from '../components/Logo'
import { SITE, TEAM } from '../config/site'

const VALUES = [
  { icon: Hospital, title: 'Patient first', desc: 'Every product decision starts with what it changes for the patient in the bed or the queue.' },
  { icon: Lock, title: 'Data you can trust', desc: 'Medical records deserve role-based access, audit trails, encryption and tested backups.' },
  { icon: Sparkles, title: 'Useful innovation', desc: 'AI and voice only where they save a clinician real time, never as decoration.' },
  { icon: HeartHandshake, title: 'Partnership', desc: 'We work alongside hospital teams through setup, training and every stage after go-live.' },
]

const initials = (name) => {
  const parts = name.split(' ').filter(Boolean)
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
}

const Person = ({ p, big }) => (
  <li
    className={`relative flex flex-col overflow-hidden rounded-[28px] transition-transform duration-300 hover:-translate-y-1 ${
      big ? 'bg-pine-950 p-8 text-white sm:p-10' : 'bg-white p-7 ring-1 ring-pine-100'
    }`}
  >
    {big && <div className="glow-marigold pointer-events-none absolute -right-24 -top-24 h-72 w-72" aria-hidden="true" />}
    <div className="relative flex items-center gap-5">
      {p.photo ? (
        <img src={p.photo} alt="" className={`${big ? 'h-20 w-20' : 'h-16 w-16'} rounded-2xl object-cover`} />
      ) : (
        <span
          className={`grid place-items-center rounded-2xl font-display font-bold ${
            big ? 'h-20 w-20 bg-marigold-500 text-[28px] text-pine-950' : 'icon-chip h-16 w-16 text-[22px]'
          }`}
          aria-hidden="true"
        >
          {initials(p.name)}
        </span>
      )}
      <div>
        <h3 className={`font-bold ${big ? 'text-[26px] text-white' : 'text-[20px] text-pine-950'}`}>{p.name}</h3>
        <p className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold ${big ? 'bg-white/10 text-marigold-300' : 'bg-pine-50 text-pine-700'}`}>{p.role}</p>
      </div>
    </div>
    {p.bio && <p className={`relative mt-6 text-[15px] leading-relaxed ${big ? 'text-white/70' : 'text-ink/70'}`}>{p.bio}</p>}
    {p.linkedin && (
      <a href={p.linkedin} target="_blank" rel="noreferrer" className={`relative mt-5 inline-flex items-center gap-2 text-[14px] font-semibold ${big ? 'text-white/80 hover:text-white' : 'text-pine-700 hover:text-pine-950'}`}>
        <Linkedin size={16} aria-hidden="true" /> LinkedIn<span className="sr-only">: {p.name}</span>
      </a>
    )}
  </li>
)

const About = () => {
  const founders = TEAM.filter((t) => t.role === 'Founder')
  const cofounders = TEAM.filter((t) => t.role !== 'Founder')

  return (
    <>
      <section className="relative overflow-hidden bg-pine-950 pb-24 pt-[140px] text-white">
        <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_20%,black,transparent_65%)]" />
        <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 className="animate-rise font-display text-[clamp(38px,5.6vw,66px)] font-extrabold leading-[1.03] tracking-[-0.03em]">
              A hospital runs on people. We build the system they lean on.
            </h1>
            <p className="mt-6 max-w-[56ch] animate-rise text-[17.5px] leading-relaxed text-white/70" style={{ animationDelay: '.1s' }}>
              Aushrit means “one who is supported”. Our job is to give every doctor, nurse and desk in an
              Indian hospital software they can depend on, so their attention stays on patients.
            </p>
          </div>
          <div className="hidden items-center justify-center lg:flex">
            <Logo className="h-auto w-full max-w-[460px] drop-shadow-[0_20px_45px_rgba(20,184,166,0.35)]" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-site grid gap-5 md:grid-cols-2">
          {[
            { icon: Target, label: 'Our mission', text: 'Give healthcare providers dependable, easy-to-use technology that simplifies operations, improves patient care and supports better outcomes across India.' },
            { icon: Eye, label: 'Our vision', text: 'Become the hospital ERP Indian hospitals trust most, connecting clinics, nursing homes and multi-specialty networks into paperless, ABDM-connected care.' },
          ].map(({ icon: Icon, label, text }, i) => (
            <div key={label} className={`reveal relative overflow-hidden rounded-[28px] p-8 sm:p-10 ${i ? 'bg-paper ring-1 ring-pine-100' : 'bg-pine-50 ring-1 ring-pine-100'}`}>
              <span className="icon-chip h-12 w-12">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-[28px] font-bold text-pine-950">{label}</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink/75">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-pine-950 py-16 text-white sm:py-24">
        <div className="glow-pine pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px]" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeader dark eyebrow="Values" title="What we hold ourselves to" />
          <ul className="reveal rail mt-10 gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="group rounded-[24px] bg-white/[0.04] p-7 ring-1 ring-white/10 transition-colors hover:bg-white/[0.07]">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-marigold-500/15 text-marigold-400 ring-1 ring-marigold-500/25 transition-colors group-hover:bg-marigold-500 group-hover:text-pine-950">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="font-display text-[28px] font-extrabold text-white/10" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 text-[19px] font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{desc}</p>
              </li>
            ))}
          </ul>
          <RailHint dark />
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24" aria-labelledby="team-heading">
        <div className="container-site">
          <div className="max-w-[760px]">
            <p className="eyebrow mb-5"><span className="h-1.5 w-1.5 rounded-full bg-marigold-500" aria-hidden="true" /> Team</p>
            <h2 id="team-heading" className="section-title">The team behind {SITE.name}</h2>
            <p className="section-lead">Founded in {SITE.city.split(',')[0]} to give Indian hospitals software built around how they actually work.</p>
          </div>

          <h3 className="mt-14 text-[12px] font-bold uppercase tracking-[0.14em] text-pine-600">Founders</h3>
          <ul className="mt-4 grid gap-5 md:grid-cols-2">
            {founders.map((p) => <Person key={p.name} p={p} big />)}
          </ul>

          <h3 className="mt-12 text-[12px] font-bold uppercase tracking-[0.14em] text-pine-600">Co-founders</h3>
          <ul className="mt-4 grid gap-5 md:grid-cols-2">
            {cofounders.map((p) => <Person key={p.name} p={p} />)}
          </ul>
        </div>
      </section>

      <section className="bg-paper pb-16 sm:pb-24">
        <div className="container-site">
          <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-marigold-400 to-marigold-600 p-8 sm:p-12 md:flex-row md:items-center">
            <div className="dot-paper pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-[clamp(28px,3.4vw,40px)] font-bold text-pine-950">Want to build this with us?</h2>
              <p className="mt-2 max-w-[52ch] text-[17px] text-pine-950/75">We're always glad to hear from people who want to fix how hospitals run.</p>
            </div>
            <Link to="/#contact" className="btn-dark relative w-full shrink-0 sm:w-auto">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
