import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Plus, Minus, ChevronDown, CloudUpload, ArrowRight, Sparkles, Building } from 'lucide-react'
import SectionHeader from './SectionHeader'
import RailHint from './RailHint'

const PLANS = [
  {
    name: 'Basic OPD Clinic', badge: 'Launch offer', oldPrice: '₹25,000', price: '₹15,000', period: 'per year + GST',
    desc: 'For small clinics and single-doctor OPDs that mainly need registration, appointments, consultation records and OPD billing.',
    suitableFor: ['Small OPD clinics', 'Single-doctor clinics', 'Consultation centres', 'Daily registration and billing'],
    included: ['ABDM M1: ABHA creation, linking, card and QR', 'OPD patient registration', 'Appointment management', 'Doctor consultation workflow', 'Digital prescription', 'Patient history', 'OPD billing', 'Basic reports', 'Admin dashboard'],
    notIncluded: ['Pharmacy module', 'Pathology module', 'OT module', 'IPD bed management', 'Multi-department setup'],
    cta: 'Start with Basic OPD',
  },
  {
    name: 'Basic OPD Multi-Device', badge: 'Launch offer', oldPrice: '₹30,000', price: '₹20,000', period: 'per year + GST', popular: true,
    desc: 'For clinics where the doctor, receptionist and billing desk each work on their own system.',
    suitableFor: ['Clinics with a reception and a doctor desk', 'OPD centres using two or more devices', 'Faster front-desk and consultation coordination'],
    included: ['ABDM M1: ABHA creation, linking, card and QR', 'OPD patient registration', 'Appointment scheduling', 'Doctor portal', 'Reception dashboard', 'Digital prescription', 'OPD billing', 'Patient history', 'Basic reports', 'Multi-device access'],
    notIncluded: ['Pharmacy module', 'Pathology module', 'OT module', 'Full IPD management'],
    cta: 'Start with Multi-Device',
  },
  {
    name: 'Standard Hospital', oldPrice: '₹50,000', price: '₹35,000', period: 'per year + GST',
    desc: 'For small and mid-size hospitals that need complete core operations plus digital compliance and clinical foundations.',
    suitableFor: ['Multi-doctor hospitals', 'Nursing homes', 'Small multi-department hospitals', 'Hospitals with pharmacy and lab'],
    included: ['ABDM M1: ABHA creation, linking, card and QR', 'OPD, appointments and registration', 'IPD admission, ward, room and bed management', 'Doctor, nurse and registrar portals', 'Pharmacy and pathology', 'Billing, invoicing and revenue reports', 'Role-based access and audit logs', 'Longitudinal patient history', 'NABH-aligned core clinical and discharge records', 'Basic AI prescription and patient summaries', 'Weekly cloud backup and restore support', 'Cloud-ready and offline-ready workflows'],
    optional: ['OT and radiology modules', 'Voice-to-text prescriptions and dictation', 'Biometric attendance integration', 'Lab machine and analyser integration', 'Daily automated backup upgrade', 'Advanced MIS and insurance claims'],
    cta: 'Choose Standard Hospital',
  },
  {
    name: 'Advanced Hospital', badge: 'Smart hospital', oldPrice: '₹1,00,000', price: '₹50,000', period: 'per year + GST',
    desc: 'For multi-specialty and larger hospitals that want full automation, AI workflows, connected devices and deeper ABDM exchange.',
    suitableFor: ['Multi-specialty hospitals', 'Hospitals with OT and diagnostics', 'Multiple departments', 'Full digital transformation'],
    included: ['ABDM M1: ABHA creation, linking, card and QR', 'ABDM M2: Scan & Share, HIP care contexts and FHIR exchange', 'Everything in Standard Hospital', 'Radiology and complete OT management', 'Store, procurement, inventory and assets', 'HR, attendance, salary and payroll', 'Insurance, TPA, pre-authorisation and claims', 'AI clinical assistant and structured summaries', 'Voice-to-text prescriptions, notes and dictation', 'NABH-aligned assessments, checklists, signatures and audit trails', 'Biometric attendance integration', 'Standard lab machine integration', 'Daily automated backups with health monitoring', 'Advanced operational and financial MIS'],
    optional: ['ABDM M3 and HIU consent-based exchange', 'Additional lab, radiology, LIS or PACS integrations', 'Multi-branch control', 'Dedicated on-premise deployment', 'Custom specialty templates and reports'],
    cta: 'Choose Advanced Hospital',
  },
]

const ENTERPRISE = {
  name: 'Enterprise', price: 'Custom', period: 'quoted per network',
  desc: 'For hospital groups and institutions that need full ABDM interoperability, custom AI, dedicated deployment and complex integrations.',
  suitableFor: ['Hospital groups and multi-branch networks', 'Large multi-specialty hospitals', 'Complex clinical workflows', 'Dedicated deployment and integrations'],
  included: ['ABDM M1, M2 and M3 with HIP and HIU consent workflows', 'Everything in Advanced Hospital', 'Custom AI clinical workflows, templates and summaries', 'Voice-to-text by specialty and role', 'Multi-branch dashboards and central governance', 'Multi-device biometric and lab machine integrations', 'Custom LIS, PACS, API and third-party integrations', 'Dedicated cloud, on-premise or hybrid deployment', 'Configurable retention, disaster recovery and restore help', 'Advanced security controls and audit retention', 'Custom modules, reports, permissions and approvals', 'Data migration, onboarding, staff training and priority support'],
  cta: 'Talk to us about Enterprise',
}

const BACKUP = ['Daily automated cloud backup', 'Backup health checks', 'Encrypted offsite copy', 'Guided restore assistance', 'Configurable retention', 'Continuity and recovery review']

const PREVIEW = 6

const toNumber = (s) => Number(s.replace(/[^0-9]/g, ''))
const savings = (p) => (p.oldPrice ? Math.round((1 - toNumber(p.price) / toNumber(p.oldPrice)) * 100) : 0)

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

const PlanCard = ({ p, open, onToggle }) => {
  const dark = !!p.popular
  const off = savings(p)
  const hidden = p.included.length - PREVIEW + (p.optional?.length || 0) + (p.notIncluded?.length || 0)

  return (
    <article
      className={`relative flex flex-col rounded-[28px] p-6 transition-transform duration-300 sm:p-7 xl:p-8 ${
        dark
          ? 'bg-gradient-to-b from-pine-800 to-pine-950 text-white shadow-[0_40px_80px_-30px_rgba(6,32,28,.85)] ring-2 ring-marigold-500 xl:-translate-y-4'
          : 'bg-white ring-1 ring-pine-100 hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(6,32,28,.35)]'
      }`}
    >
      {dark && (
        <span className="absolute inset-x-0 top-0 flex -translate-y-1/2 justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-marigold-500 px-4 py-1.5 text-[12.5px] font-bold text-pine-950 shadow-lg">
            <Sparkles size={14} aria-hidden="true" /> Most popular
          </span>
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className={`text-[20px] font-bold ${dark ? 'text-white' : 'text-pine-950'}`}>{p.name}</h3>
        {p.badge && (
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-bold ${dark ? 'bg-white/10 text-marigold-300' : 'bg-marigold-50 text-marigold-700 ring-1 ring-marigold-100'}`}>
            {p.badge}
          </span>
        )}
      </div>

      <div className={`mt-6 rounded-2xl p-4 ${dark ? 'bg-white/[0.06]' : 'bg-paper'}`}>
        <div className="flex flex-wrap items-center gap-2">
          {p.oldPrice && <s className={`text-[14px] ${dark ? 'text-white/45' : 'text-ink/40'}`}>{p.oldPrice}</s>}
          {off > 0 && (
            <span className={`rounded-md px-1.5 py-0.5 text-[11.5px] font-bold ${dark ? 'bg-marigold-500 text-pine-950' : 'bg-pine-900 text-white'}`}>
              Save {off}%
            </span>
          )}
        </div>
        <p className="mt-1.5 font-display text-[40px] font-extrabold leading-none tracking-tight">{p.price}</p>
        <p className={`mt-1.5 text-[13px] ${dark ? 'text-white/60' : 'text-ink/55'}`}>{p.period}</p>
      </div>

      <p className={`mt-5 text-[14.5px] leading-relaxed ${dark ? 'text-white/75' : 'text-ink/70'}`}>{p.desc}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Suitable for">
        {p.suitableFor.map((s) => (
          <li key={s} className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${dark ? 'bg-white/[0.08] text-white/80' : 'bg-pine-50 text-pine-800'}`}>{s}</li>
        ))}
      </ul>

      <Link to="/#contact" className={`group mt-6 w-full whitespace-nowrap !px-4 !text-[14px] ${dark ? 'btn-primary' : 'btn-dark'}`}>
        {p.cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>

      <div className={`mt-7 space-y-6 border-t pt-6 ${dark ? 'border-white/10' : 'border-pine-100'}`}>
        <List title="Included" items={open ? p.included : p.included.slice(0, PREVIEW)} icon={Check} dark={dark} />
        {open && p.optional && <List title="Optional add-ons" items={p.optional} icon={Plus} dark={dark} />}
        {open && p.notIncluded && <List title="Not included" items={p.notIncluded} icon={Minus} dark={dark} muted />}
      </div>

      {hidden > 0 && (
        <button
          type="button"
          onClick={onToggle}
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

const PricingPlans = () => {
  // One switch for every card, so the plans stay the same height whether collapsed or expanded.
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((o) => !o)

  return (
  <section id="pricing" className="relative overflow-hidden bg-paper py-16 sm:py-24 lg:py-28">
    <div className="dot-paper pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_40%)]" aria-hidden="true" />
    <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-8">
      <SectionHeader
        align="center"
        eyebrow="Pricing"
        title="Plans for clinics, smart hospitals and networks"
        lead="Pick the level of automation, ABDM, AI, voice, device integration and backup you need now. Upgrade whenever the hospital grows."
      />

      <div className="mx-auto mt-8 flex max-w-max flex-wrap justify-center gap-x-5 gap-y-2 rounded-2xl bg-white px-5 py-2.5 sm:rounded-full text-[13.5px] text-ink/70 ring-1 ring-pine-100">
        {['Annual billing', 'Launch pricing on all plans', 'Upgrade any time'].map((t) => (
          <span key={t} className="flex items-center gap-1.5"><Check size={15} className="text-pine-500" aria-hidden="true" /> {t}</span>
        ))}
      </div>

      <div className="rail mt-8 gap-4 pt-5 sm:mt-12 md:grid-cols-2 md:gap-6 md:pt-4 xl:grid-cols-4">
        {PLANS.map((p) => <PlanCard key={p.name} p={p} open={open} onToggle={toggle} />)}
      </div>
      <RailHint label="Swipe to compare plans" />

      {/* Enterprise */}
      <article className="relative mt-10 overflow-hidden rounded-[28px] bg-pine-950 text-white sm:mt-8 sm:rounded-[32px]">
        <div className="glow-marigold pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px]" aria-hidden="true" />
        <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="flex flex-col">
            <span className="icon-chip h-14 w-14">
              <Building size={26} aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-[28px] font-bold">{ENTERPRISE.name}</h3>
            <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-white/70">{ENTERPRISE.desc}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Suitable for">
              {ENTERPRISE.suitableFor.map((s) => (
                <li key={s} className="rounded-full bg-white/[0.08] px-2.5 py-1 text-[12px] font-medium text-white/80">{s}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-5 lg:mt-auto lg:pt-10">
              <div>
                <p className="font-display text-[44px] font-extrabold leading-none">{ENTERPRISE.price}</p>
                <p className="mt-1.5 text-[13.5px] text-white/55">{ENTERPRISE.period}</p>
              </div>
              <Link to="/#contact" className="btn-primary group w-full sm:w-auto">
                {ENTERPRISE.cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="rounded-[20px] bg-white/[0.04] p-5 ring-1 ring-white/10 sm:rounded-[24px] sm:p-8">
            <h4 className="font-body text-[12px] font-bold uppercase tracking-[0.12em] text-pine-200">Included</h4>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {ENTERPRISE.included.map((it) => (
                <li key={it} className="flex gap-2.5 text-[14px] leading-snug text-white/85">
                  <span className="mt-px grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-marigold-500/20 text-marigold-400">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {/* Backup add-on */}
      <aside className="mt-6 grid items-center gap-6 rounded-[28px] bg-white p-6 ring-1 ring-pine-100 sm:mt-8 sm:gap-8 sm:rounded-[32px] sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:gap-12">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-marigold-50 text-marigold-700 ring-1 ring-marigold-100">
          <CloudUpload size={30} aria-hidden="true" />
        </span>
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-marigold-700">Add-on</p>
          <h3 className="mt-1.5 text-[clamp(22px,2.4vw,28px)] font-bold text-pine-950">Enhanced backup and disaster recovery</h3>
          <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink/70">
            For clinic and Standard plans: more frequent automated backups, an encrypted offsite copy, backup
            monitoring and guided recovery.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {BACKUP.map((t) => (
              <li key={t} className="flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-[13px] text-ink/80 ring-1 ring-pine-100">
                <Check size={14} className="text-pine-500" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[24px] bg-paper p-6 text-center lg:min-w-[220px]">
          <p className="font-display text-[40px] font-extrabold leading-none text-pine-950">
            ₹5,000<span className="ml-1 text-[16px] font-medium text-ink/50">/year</span>
          </p>
          <Link to="/#contact" className="btn-dark mt-5 w-full">Add backup</Link>
        </div>
      </aside>
    </div>
  </section>
  )
}

export default PricingPlans
