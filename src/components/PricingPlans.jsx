import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Plus, Minus, ChevronDown, ArrowRight, Sparkles, BedDouble, Plug, Users, Clock, Calculator } from 'lucide-react'
import SectionHeader from './SectionHeader'
import RailHint from './RailHint'

const AMC_RATE = 0.2
const INTEGRATION_RATE = 850 // ₹ per hour, per person

const PLANS = [
  {
    beds: 'Less than 20 beds', range: [1, 19], price: 80000,
    desc: 'For clinics, nursing homes and small hospitals moving OPD, IPD, pharmacy, lab and billing onto one record.',
    suitableFor: ['Nursing homes', 'Multi-doctor clinics', 'Small hospitals with pharmacy and lab'],
    included: ['ABDM M1: ABHA creation, linking, card and QR', 'OPD, appointments and registration', 'IPD admission, ward, room and bed management', 'Doctor, nurse and registrar portals', 'Pharmacy and pathology', 'Billing, invoicing and revenue reports', 'Role-based access and audit logs', 'Longitudinal patient history', 'NABH-aligned core clinical and discharge records', 'Ayushman Bharat / PM-JAY scheme support', 'Basic AI prescription and patient summaries', 'Weekly cloud backup and restore support', 'Cloud or on-premise deployment'],
    optional: ['OT and radiology modules', 'Voice-to-text prescriptions and dictation', 'Biometric attendance integration', 'Lab machine and analyser integration', 'Daily automated backup upgrade', 'Advanced MIS and insurance claims'],
    cta: 'Get started',
  },
  {
    beds: '20–50 beds', range: [20, 50], price: 125000, popular: true,
    desc: 'For growing and multi-specialty hospitals that want full automation, AI and voice, connected devices and deeper ABDM exchange.',
    suitableFor: ['Multi-specialty hospitals', 'Hospitals with OT and diagnostics', 'Multiple departments'],
    included: ['ABDM M1: ABHA creation, linking, card and QR', 'ABDM M2: Scan & Share, HIP care contexts and FHIR exchange', 'Everything in the under-20-beds plan', 'Radiology and complete OT management', 'Store, procurement, inventory and assets', 'HR, attendance, salary and payroll', 'Insurance, TPA, pre-authorisation and claims', 'AI clinical assistant and structured summaries', 'Voice-to-text prescriptions, notes and dictation', 'NABH-aligned assessments, checklists, signatures and audit trails', 'PM-JAY and insurance claim-ready documents', 'Biometric attendance integration', 'Standard lab machine integration', 'Daily automated backups with health monitoring', 'Advanced operational and financial MIS'],
    optional: ['ABDM M3 and HIU consent-based exchange', 'Additional lab, radiology, LIS or PACS integrations', 'Multi-branch control', 'Dedicated on-premise deployment', 'Custom specialty templates and reports'],
    cta: 'Choose 20–50 beds',
  },
  {
    beds: 'More than 50 beds', range: [51, 200], price: 200000,
    desc: 'For large hospitals and groups that need full ABDM interoperability, custom AI, dedicated deployment and complex integrations.',
    suitableFor: ['Large multi-specialty hospitals', 'Multi-branch networks', 'Dedicated deployment'],
    included: ['ABDM M1, M2 and M3 with HIP and HIU consent workflows', 'Everything in the 20–50 beds plan', 'Custom AI clinical workflows, templates and summaries', 'Voice-to-text by specialty and role', 'Multi-branch dashboards and central governance', 'Multi-device biometric and lab machine integrations', 'Custom LIS, PACS, API and third-party integrations', 'Dedicated cloud, on-premise or hybrid deployment', 'Configurable retention, disaster recovery and restore help', 'Advanced security controls and audit retention', 'Custom modules, reports, permissions and approvals', 'Data migration, onboarding, staff training and priority support'],
    cta: 'Choose 50+ beds',
  },
]

const PREVIEW = 6
const MAX_BEDS = 200

const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`
const planFor = (beds) => (beds < 20 ? 0 : beds <= 50 ? 1 : 2)

const List = ({ title, items, icon: Icon, dark, muted }) => (
  <div>
    <h4 className={`mb-3 font-body text-[12px] font-bold uppercase tracking-[0.12em] ${dark ? 'text-pine-200' : 'text-pine-600'}`}>{title}</h4>
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className={`flex gap-2.5 text-[14px] leading-snug ${muted ? (dark ? 'text-white/40' : 'text-ink/40') : dark ? 'text-white/85' : 'text-ink/80'}`}>
          <span
            className={`mt-px grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full ${
              muted ? (dark ? 'bg-white/5' : 'bg-pine-50') : dark ? 'bg-marigold-500/20 text-marigold-400' : 'bg-pine-100 text-pine-700'
            }`}
          >
            <Icon size={12} strokeWidth={3} aria-hidden="true" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  </div>
)

const PlanCard = ({ p, open, onToggle, selected, onSelect }) => {
  const dark = !!p.popular
  const amc = p.price * AMC_RATE
  const hidden = p.included.length - PREVIEW + (p.optional?.length || 0)

  return (
    <article
      onClick={onSelect}
      className={`relative flex cursor-pointer flex-col rounded-[28px] p-6 transition-all duration-300 sm:p-8 ${
        dark
          ? 'bg-gradient-to-b from-pine-800 to-pine-950 text-white shadow-[0_40px_80px_-30px_rgba(6,32,28,.85)]'
          : 'bg-white hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(6,32,28,.35)]'
      } ${selected ? 'ring-[3px] ring-marigold-500' : dark ? 'ring-1 ring-pine-700' : 'ring-1 ring-pine-100'}`}
    >
      {(dark || selected) && (
        <span className="absolute inset-x-0 top-0 flex -translate-y-1/2 justify-center gap-2">
          {dark && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-marigold-500 px-3.5 py-1.5 text-[12px] font-bold text-pine-950 shadow-lg">
              <Sparkles size={13} aria-hidden="true" /> Most popular
            </span>
          )}
          {selected && (
            <span className="inline-flex animate-fade-swap items-center gap-1.5 rounded-full bg-pine-950 px-3.5 py-1.5 text-[12px] font-bold text-marigold-300 shadow-lg ring-1 ring-marigold-500/50">
              <BedDouble size={13} aria-hidden="true" /> Fits your hospital
            </span>
          )}
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${dark ? 'bg-marigold-500 text-pine-950' : 'icon-chip'}`}>
          <BedDouble size={20} aria-hidden="true" />
        </span>
        <h3 className={`text-[21px] font-bold ${dark ? 'text-white' : 'text-pine-950'}`}>{p.beds}</h3>
      </div>

      <div className={`mt-6 rounded-2xl p-5 ${dark ? 'bg-white/[0.06]' : 'bg-paper'}`}>
        <p className={`text-[12px] font-bold uppercase tracking-[0.12em] ${dark ? 'text-pine-200' : 'text-pine-600'}`}>One-time licence</p>
        <p className="mt-1.5 font-display text-[44px] font-extrabold leading-none tracking-tight">{inr(p.price)}</p>
        <div className={`mt-4 flex items-center justify-between gap-3 border-t pt-3.5 ${dark ? 'border-white/10' : 'border-pine-100'}`}>
          <span className={`text-[13.5px] font-semibold ${dark ? 'text-white/85' : 'text-pine-900'}`}>+ 20% AMC</span>
          <span className={`rounded-full px-2.5 py-1 text-[12.5px] font-bold ${dark ? 'bg-marigold-500 text-pine-950' : 'bg-pine-900 text-white'}`}>
            {inr(amc)}/year
          </span>
        </div>
      </div>

      <p className={`mt-5 text-[14.5px] leading-relaxed ${dark ? 'text-white/75' : 'text-ink/70'}`}>{p.desc}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Suitable for">
        {p.suitableFor.map((s) => (
          <li key={s} className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${dark ? 'bg-white/[0.08] text-white/80' : 'bg-pine-50 text-pine-800'}`}>{s}</li>
        ))}
      </ul>

      <Link
        to="/#contact"
        onClick={(e) => e.stopPropagation()}
        className={`group mt-6 w-full whitespace-nowrap ${dark ? 'btn-primary' : 'btn-dark'}`}
      >
        {p.cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>

      <div className={`mt-7 space-y-6 border-t pt-6 ${dark ? 'border-white/10' : 'border-pine-100'}`}>
        <List title="Included" items={open ? p.included : p.included.slice(0, PREVIEW)} icon={Check} dark={dark} />
        {open && p.optional && <List title="Optional add-ons" items={p.optional} icon={Plus} dark={dark} />}
      </div>

      {hidden > 0 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggle() }}
          aria-expanded={open}
          className={`mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-[13.5px] font-semibold ${dark ? 'text-marigold-300 hover:text-marigold-400' : 'text-pine-700 hover:text-pine-950'}`}
        >
          {open ? 'Show less on all plans' : `Show ${hidden} more details`}
          <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      )}
    </article>
  )
}

/** Slider that maps bed count to a plan. */
const BedPicker = ({ beds, setBeds }) => {
  const plan = PLANS[planFor(beds)]
  const pct = ((beds - 1) / (MAX_BEDS - 1)) * 100

  return (
    <div className="mx-auto mt-10 max-w-[760px] rounded-[26px] bg-white p-5 ring-1 ring-pine-100 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <label htmlFor="bed-count" className="text-[15px] font-semibold text-pine-950">How many beds does your hospital have?</label>
        <p className="font-display text-[30px] font-extrabold leading-none text-pine-950" aria-live="polite">
          {beds >= MAX_BEDS ? `${MAX_BEDS}+` : beds}
          <span className="ml-1.5 font-body text-[14px] font-medium text-ink/55">beds</span>
        </p>
      </div>
      <input
        id="bed-count"
        type="range"
        min={1}
        max={MAX_BEDS}
        value={beds}
        onChange={(e) => setBeds(Number(e.target.value))}
        className="mt-5 h-2.5 w-full cursor-pointer appearance-none rounded-full accent-marigold-500 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-marigold-500 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-marigold-500 [&::-webkit-slider-thumb]:shadow-[0_2px_10px_rgba(6,32,28,.35)]"
        style={{ background: `linear-gradient(to right, #F2A33A ${pct}%, #DCEDE6 ${pct}%)` }}
      />
      <div className="relative mt-2 h-4 text-[11.5px] font-medium text-ink/45" aria-hidden="true">
        {[1, 20, 50, 100, MAX_BEDS].map((v, i, all) => (
          <span
            key={v}
            className={`absolute top-0 ${i === 0 ? '' : i === all.length - 1 ? '-translate-x-full' : '-translate-x-1/2'}`}
            style={{ left: `${((v - 1) / (MAX_BEDS - 1)) * 100}%` }}
          >
            {v === MAX_BEDS ? `${v}+` : v}
          </span>
        ))}
      </div>
      <div key={plan.beds} className="mt-5 flex animate-fade-swap flex-wrap items-center justify-between gap-3 rounded-2xl bg-pine-950 px-5 py-4 text-white">
        <span className="text-[14px] text-white/70">
          Your plan: <strong className="font-semibold text-white">{plan.beds}</strong>
        </span>
        <span className="text-[14px]">
          <strong className="font-display text-[20px] font-extrabold text-marigold-400">{inr(plan.price)}</strong>
          <span className="text-white/60"> + {inr(plan.price * AMC_RATE)}/year AMC</span>
        </span>
      </div>
    </div>
  )
}

const Stepper = ({ id, label, icon: Icon, value, setValue, min, max, step = 1, unit }) => (
  <div>
    <label htmlFor={id} className="flex items-center gap-2 text-[13px] font-semibold text-white/75">
      <Icon size={15} className="text-marigold-400" aria-hidden="true" /> {label}
    </label>
    <div className="mt-2 flex items-center rounded-2xl bg-white/[0.06] p-1.5 ring-1 ring-white/10">
      <button type="button" onClick={() => setValue(Math.max(min, value - step))} className="grid h-10 w-10 place-items-center rounded-xl text-white transition-colors hover:bg-white/10" aria-label={`Fewer ${unit}`}>
        <Minus size={16} />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Math.min(max, Math.max(min, Number(e.target.value) || min)))}
        className="w-full min-w-0 bg-transparent text-center font-display text-[22px] font-bold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button type="button" onClick={() => setValue(Math.min(max, value + step))} className="grid h-10 w-10 place-items-center rounded-xl text-white transition-colors hover:bg-white/10" aria-label={`More ${unit}`}>
        <Plus size={16} />
      </button>
    </div>
  </div>
)

/** Rate card plus a quick estimator for custom integration work. */
const Integrations = () => {
  const [people, setPeople] = useState(1)
  const [hours, setHours] = useState(40)
  const total = INTEGRATION_RATE * people * hours

  return (
    <article className="relative mt-10 overflow-hidden rounded-[28px] bg-pine-950 text-white sm:rounded-[32px]">
      <div className="glow-marigold pointer-events-none absolute -right-40 -top-40 h-[460px] w-[460px]" aria-hidden="true" />
      <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-marigold-500 text-pine-950">
            <Plug size={22} aria-hidden="true" />
          </span>
          <h3 className="mt-6 text-[clamp(22px,2.4vw,28px)] font-bold">Extra integration work</h3>
          <p className="mt-3 max-w-[48ch] text-[15.5px] leading-relaxed text-white/70">
            Custom connections beyond your plan, such as additional lab machines, LIS, PACS, third-party software or
            bespoke APIs, are billed by the hour.
          </p>
          <p className="mt-7 font-display text-[48px] font-extrabold leading-none">
            {inr(INTEGRATION_RATE)}
            <span className="ml-1.5 font-body text-[16px] font-medium text-white/60">per hour, per person</span>
          </p>
        </div>

        <div className="rounded-[24px] bg-white/[0.05] p-5 ring-1 ring-white/10 sm:p-7">
          <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-marigold-300">
            <Calculator size={14} aria-hidden="true" /> Estimate the cost
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Stepper id="int-people" label="People on the work" icon={Users} value={people} setValue={setPeople} min={1} max={20} unit="people" />
            <Stepper id="int-hours" label="Hours each" icon={Clock} value={hours} setValue={setHours} min={1} max={1000} step={8} unit="hours" />
          </div>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-3 rounded-2xl bg-marigold-500 px-5 py-4 text-pine-950" aria-live="polite">
            <span className="text-[13.5px] font-medium">
              {inr(INTEGRATION_RATE)} × {people} {people === 1 ? 'person' : 'people'} × {hours} h
            </span>
            <span className="font-display text-[28px] font-extrabold leading-none">{inr(total)}</span>
          </div>
          <p className="mt-3 text-[12.5px] text-white/50">An estimate only. We confirm hours after reviewing the integration.</p>
        </div>
      </div>
    </article>
  )
}

const PricingPlans = () => {
  // One switch for every card, so the plans stay the same height whether collapsed or expanded.
  const [open, setOpen] = useState(false)
  const [beds, setBeds] = useState(30)
  const selected = planFor(beds)
  const railRef = useRef(null)

  // On phones the plans are a sideways row: bring the matching plan into view as the slider moves.
  useEffect(() => {
    const rail = railRef.current
    const card = rail?.children[selected]
    if (!rail || !card || rail.scrollWidth <= rail.clientWidth) return
    const offset = card.getBoundingClientRect().left - rail.getBoundingClientRect().left
    rail.scrollTo({ left: rail.scrollLeft + offset - parseFloat(getComputedStyle(rail).paddingLeft), behavior: 'smooth' })
  }, [selected])

  const pickPlan = (i) => setBeds(Math.round((PLANS[i].range[0] + Math.min(PLANS[i].range[1], 100)) / 2))

  return (
    <section id="pricing" className="relative overflow-hidden bg-paper py-16 sm:py-24 lg:py-28">
      <div className="dot-paper pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_40%)]" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <SectionHeader
          align="center"
          eyebrow="Pricing"
          title="Simple pricing, based on your bed count"
          lead="Pick the plan that matches your hospital's size: a one-time licence plus 20% annual maintenance (AMC)."
        />

        <div className="mx-auto mt-8 flex max-w-max flex-wrap justify-center gap-x-5 gap-y-2 rounded-2xl bg-white px-5 py-2.5 text-[13.5px] text-ink/70 ring-1 ring-pine-100 sm:rounded-full">
          {['One-time licence', '20% annual AMC', 'Priced by bed count', 'Prices exclude GST'].map((t) => (
            <span key={t} className="flex items-center gap-1.5"><Check size={15} className="text-pine-500" aria-hidden="true" /> {t}</span>
          ))}
        </div>

        <BedPicker beds={beds} setBeds={setBeds} />

        <div ref={railRef} className="rail mt-12 gap-4 pt-5 sm:mt-16 md:gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <PlanCard key={p.beds} p={p} open={open} onToggle={() => setOpen((o) => !o)} selected={i === selected} onSelect={() => pickPlan(i)} />
          ))}
        </div>
        <RailHint label="Swipe to compare plans" />

        <Integrations />
      </div>
    </section>
  )
}

export default PricingPlans
