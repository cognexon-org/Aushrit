import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarClock, BedDouble, HeartPulse, IdCard, Landmark, Lock, Receipt, Pill, BarChart3, Plug, CloudUpload, Check,
  ChevronLeft, ChevronRight, Users, ArrowRight,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import RailHint from './RailHint'

const CATEGORIES = ['Clinical care', 'Compliance & schemes', 'Operations & finance', 'Platform']

const FEATURES = [
  {
    cat: 'Clinical care', icon: CalendarClock, title: 'OPD and smart queues', short: 'Walk-ins, appointments and tokens in one live queue.',
    desc: 'Register patients, book and reschedule appointments, manage doctor availability and run token queues, with OPD billing connected to the same visit.',
    points: ['Registration with ABHA linking', 'Doctor schedules and conflict checks', 'Token and queue management', 'Follow-ups and OPD billing'],
    roles: ['Reception', 'Doctor'],
  },
  {
    cat: 'Clinical care', icon: BedDouble, title: 'IPD and live bed board', short: 'Every ward, room and bed, visible in real time.',
    desc: 'Run the full inpatient journey from admission and bed allocation through transfers, running bills and clearances to discharge and a digital patient file.',
    points: ['Admission and bed allocation', 'Bed transfers and reservations', 'Running bill and clearances', 'Discharge summary and patient file'],
    roles: ['Reception', 'Nurse', 'Admin'],
  },
  {
    cat: 'Clinical care', icon: HeartPulse, title: 'Nursing and medication charts', short: 'Vitals, EWS and medication rounds without paper.',
    desc: 'Give nurses their assigned patients, assessments, vitals with early-warning scores, medication administration records and structured shift handovers.',
    points: ['Assigned patient lists', 'Vitals and EWS tracking', 'Medication administration records', 'Structured shift handover'],
    roles: ['Nurse'],
  },
  {
    cat: 'Compliance & schemes', icon: IdCard, title: 'ABDM and ABHA, M1 to M3', short: 'Digital health IDs and consent-based record sharing.',
    desc: 'Create and link ABHA, support Scan & Share at the front desk, link care contexts as a HIP, package FHIR records and run consent-based HIU exchange.',
    points: ['ABHA creation, linking, card and QR', 'Facility Scan & Share', 'HIP care contexts and FHIR records', 'HIU consent-based exchange'],
    roles: ['Reception', 'Admin'],
  },
  {
    cat: 'Compliance & schemes', icon: Landmark, title: 'NABH and Ayushman Bharat / PM-JAY', short: 'Accreditation-ready records and scheme cases, together.',
    desc: 'Keep NABH-aligned clinical records and run Ayushman Bharat PM-JAY and other government-scheme cases from the same patient file, documented from admission to discharge.',
    points: ['NABH-aligned assessments and records', 'PM-JAY beneficiary details on the record', 'Package-wise scheme billing', 'NABH and scheme-wise reports'],
    roles: ['Reception', 'Billing', 'Admin'],
  },
  {
    cat: 'Compliance & schemes', icon: Lock, title: 'Role-based access and audit', short: 'Everyone sees exactly what their job needs.',
    desc: 'Action-level permissions for every role, with approval flows, audit logs and full document history.',
    points: ['Role and action-level permissions', 'Audit logs and document history', 'Approval workflows', 'Secure staff sign-in'],
    roles: ['Admin'],
  },
  {
    cat: 'Operations & finance', icon: Receipt, title: 'Unified billing', short: 'Every charge, from every department, on one bill.',
    desc: 'Centralise OPD, IPD, pharmacy, lab, radiology and OT billing with advances, refunds, discounts, payer rate cards and daily collection reports.',
    points: ['One invoice across departments', 'Advances, refunds and discounts', 'Payer and rate-card management', 'Collections and day-end reports'],
    roles: ['Reception', 'Admin'],
  },
  {
    cat: 'Operations & finance', icon: Pill, title: 'Pharmacy, lab and inventory', short: 'Orders flow straight to dispensing and testing.',
    desc: 'Prescriptions land in the pharmacy queue and lab orders in the worklist, while stock, batches, expiry and purchasing stay up to date on their own.',
    points: ['Prescription queue and POS billing', 'Batch, expiry and low-stock alerts', 'Lab worklists and verified reports', 'Store, purchase orders and GRN'],
    roles: ['Pharmacist', 'Lab technician', 'Store'],
  },
  {
    cat: 'Operations & finance', icon: BarChart3, title: 'Reports and MIS dashboards', short: 'Live numbers for every department.',
    desc: 'Real-time operational, clinical, inventory, workforce and financial reporting with configurable dashboards and scheduled exports.',
    points: ['Executive and department dashboards', 'Revenue, OPD and IPD analytics', 'Inventory and HR reports', 'Scheduled exports'],
    roles: ['Admin'],
  },
  {
    cat: 'Platform', icon: Plug, title: 'Lab and system integrations', short: 'Results arrive from machines, not from typing.',
    desc: 'Connect lab analysers, radiology and PACS workflows, LIS and third-party systems through configurable integrations and APIs.',
    points: ['Lab analysers and machines', 'Radiology and PACS support', 'LIS and third-party APIs', 'SMS and notification services'],
    roles: ['Lab technician', 'Admin'],
  },
  {
    cat: 'Platform', icon: CloudUpload, title: 'Cloud, on-premise and backups', short: 'Deploy your way, with your data protected.',
    desc: 'Run in the cloud, on-premise or hybrid, with scheduled automated backups, backup health monitoring and restore support.',
    points: ['Cloud, on-premise or hybrid', 'Scheduled automated backups', 'Backup health monitoring', 'Restore and recovery support'],
    roles: ['Admin'],
  },
]

const AUTOPLAY_MS = 6000

const Features = () => {
  const [cat, setCat] = useState('All')
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const [hover, setHover] = useState(false)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const railRef = useRef(null)

  const list = useMemo(() => (cat === 'All' ? FEATURES : FEATURES.filter((f) => f.cat === cat)), [cat])
  const pos = Math.max(0, list.indexOf(FEATURES[active]))
  const feature = list[pos]
  const Icon = feature.icon
  const playing = auto && !hover && inView

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(false)
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  // Autoplay walks through the visible features until someone picks one.
  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => setActive(FEATURES.indexOf(list[(pos + 1) % list.length])), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [playing, pos, list])

  // On phones the tiles are a sideways row: keep the active one in view without scrolling the page.
  useEffect(() => {
    const rail = railRef.current
    const tile = rail?.children[pos]
    if (!rail || !tile || rail.scrollWidth <= rail.clientWidth) return
    const offset = tile.getBoundingClientRect().left - rail.getBoundingClientRect().left
    rail.scrollTo({ left: rail.scrollLeft + offset - parseFloat(getComputedStyle(rail).paddingLeft), behavior: 'smooth' })
  }, [pos, cat])

  const choose = (f) => {
    setActive(FEATURES.indexOf(f))
    setAuto(false)
  }
  const pickCat = (c) => {
    setCat(c)
    const first = c === 'All' ? FEATURES[0] : FEATURES.find((f) => f.cat === c)
    setActive(FEATURES.indexOf(first))
  }
  const step = (d) => choose(list[(pos + d + list.length) % list.length])

  return (
    <section id="features" ref={sectionRef} className="relative overflow-hidden bg-pine-950 py-16 text-white sm:py-24 lg:py-28">
      <div className="glow-pine pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px]" aria-hidden="true" />
      <div className="glow-marigold pointer-events-none absolute -bottom-48 -right-32 h-[520px] w-[520px] opacity-60" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeader
          dark
          align="center"
          eyebrow="Core features"
          title="The features that run your hospital"
          lead="The everyday capabilities every department relies on, from the front desk to the boardroom. Pick one to see what it does and who uses it."
        />

        {/* Category filter */}
        <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:mt-12 sm:flex-wrap sm:justify-center sm:px-0" role="group" aria-label="Filter features by category">
          {['All', ...CATEGORIES].map((c) => {
            const on = c === cat
            const count = c === 'All' ? FEATURES.length : FEATURES.filter((f) => f.cat === c).length
            return (
              <button
                key={c}
                type="button"
                onClick={() => pickCat(c)}
                aria-pressed={on}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold transition-all duration-300 ${
                  on ? 'bg-marigold-500 text-pine-950 shadow-[0_8px_24px_-10px_rgba(242,163,58,.7)]' : 'bg-white/[0.05] text-white/75 ring-1 ring-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {c}
                <span className={`rounded-full px-1.5 text-[11.5px] font-bold ${on ? 'bg-pine-950/15' : 'bg-white/10'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        <div
          className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-8"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Feature tiles */}
          <div className="min-w-0">
            <ul
              key={cat}
              ref={railRef}
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {list.map((f, i) => {
                const on = f === feature
                const TIcon = f.icon
                return (
                  <li key={f.title} className="w-[72%] max-w-[280px] shrink-0 snap-start animate-rise lg:w-auto lg:max-w-none" style={{ animationDelay: `${i * 45}ms` }}>
                    <button
                      type="button"
                      onClick={() => choose(f)}
                      aria-pressed={on}
                      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[20px] p-4 text-left transition-all duration-300 sm:p-5 ${
                        on
                          ? 'bg-white text-pine-950 shadow-[0_20px_50px_-24px_rgba(242,163,58,.55)]'
                          : 'bg-white/[0.04] text-white ring-1 ring-white/10 hover:-translate-y-0.5 hover:bg-white/[0.08]'
                      }`}
                    >
                      {on && <span className="absolute inset-y-0 left-0 w-1 bg-marigold-500" aria-hidden="true" />}
                      <span className="flex items-center justify-between">
                        <span className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${on ? 'bg-pine-900 text-marigold-400' : 'bg-marigold-500/15 text-marigold-400 group-hover:bg-marigold-500 group-hover:text-pine-950'}`}>
                          <TIcon size={19} aria-hidden="true" />
                        </span>
                        <span className={`font-display text-[13px] font-bold ${on ? 'text-pine-300' : 'text-white/25'}`}>
                          {String(FEATURES.indexOf(f) + 1).padStart(2, '0')}
                        </span>
                      </span>
                      <span className="mt-4 block text-[15.5px] font-bold leading-snug">{f.title}</span>
                      <span className={`mt-1 block text-[13px] leading-snug ${on ? 'text-ink/60' : 'text-white/55'}`}>{f.short}</span>
                      {on && playing && (
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-pine-100" aria-hidden="true">
                          <span key={`${f.title}-p`} className="block h-full bg-marigold-500" style={{ width: 0, animation: `grow ${AUTOPLAY_MS}ms linear forwards` }} />
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
            <RailHint dark label="Swipe for more features" />
          </div>

          {/* Spotlight */}
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <article className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-pine-800 to-pine-900 p-6 ring-1 ring-white/15 sm:p-9" aria-live="polite">
              <div className="glow-marigold pointer-events-none absolute -right-24 -top-24 h-72 w-72" aria-hidden="true" />
              <div key={feature.title} className="relative animate-fade-swap">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-marigold-300">{feature.cat}</span>
                  <span className="font-display text-[13px] font-bold tabular-nums text-white/50">
                    {String(pos + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
                  </span>
                </div>

                <span className="mt-7 grid h-16 w-16 animate-floaty place-items-center rounded-[20px] bg-marigold-500 text-pine-950 shadow-[0_18px_40px_-16px_rgba(242,163,58,.8)]">
                  <Icon size={30} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[clamp(24px,2.6vw,32px)] font-bold">{feature.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-white/70">{feature.desc}</p>

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {feature.points.map((p, i) => (
                    <li key={p} className="flex animate-rise gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3 text-[14px] leading-snug text-white/90" style={{ animationDelay: `${120 + i * 70}ms` }}>
                      <span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-marigold-500/20 text-marigold-400">
                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[13px] font-semibold text-white/55">
                    <Users size={15} aria-hidden="true" /> Used by
                  </span>
                  {feature.roles.map((r) => (
                    <span key={r} className="rounded-full bg-white/10 px-2.5 py-1 text-[12.5px] font-medium text-white/85">{r}</span>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-6">
                <div className="flex gap-2">
                  <button type="button" onClick={() => step(-1)} className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.08] text-white ring-1 ring-white/10 transition-colors hover:bg-white/15" aria-label="Previous feature">
                    <ChevronLeft size={20} />
                  </button>
                  <button type="button" onClick={() => step(1)} className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.08] text-white ring-1 ring-white/10 transition-colors hover:bg-white/15" aria-label="Next feature">
                    <ChevronRight size={20} />
                  </button>
                </div>
                <Link to="/#contact" className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-marigold-300 hover:text-marigold-400">
                  See it in a demo <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
