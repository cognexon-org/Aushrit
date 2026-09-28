import React, { useCallback, useEffect, useRef, useState } from 'react'
import { UserPlus, Stethoscope, FlaskConical, Pill, Receipt, Mic, Bot, IdCard, ClipboardList, Calendar, TestTube, Plug, FileText, Send, CheckCircle2, BedDouble, ClipboardCheck } from 'lucide-react'
import SectionHeader from './SectionHeader'

const WORKFLOWS = [
  {
    icon: UserPlus,
    title: 'ABHA-enabled registration',
    desc: 'Front desk registers the patient, creates or links ABHA, captures consent and insurance, and opens one medical record.',
    screen: 'Reception: patient and ABHA registration',
    items: [
      { icon: UserPlus, label: 'Ravi Kumar, 45 M, new patient', badge: 'MRN-2026-0142' },
      { icon: IdCard, label: 'ABHA created and linked to record', badge: 'Verified' },
      { icon: ClipboardList, label: 'Consent and insurance captured', badge: 'Active' },
      { icon: Calendar, label: 'Appointment with Dr. Sharma, 10:30', badge: 'Confirmed' },
    ],
  },
  {
    icon: Stethoscope,
    title: 'Doctor consultation',
    desc: 'The doctor reviews history, dictates notes, checks an AI summary, and places prescriptions, tests, admission or OT orders.',
    screen: 'Doctor console: Ravi Kumar',
    items: [
      { icon: Mic, label: 'Prescription dictated and auto-filled', badge: 'Voice' },
      { icon: Bot, label: 'AI patient and prescription summary', badge: 'Reviewed' },
      { icon: TestTube, label: 'Lab order: lipid profile, blood sugar', badge: 'Sent to lab' },
      { icon: BedDouble, label: 'Admit to Ward C, bed 14', badge: 'Admitted' },
    ],
  },
  {
    icon: FlaskConical,
    title: 'Lab processing',
    desc: 'The lab tracks the sample, imports analyser results, flags critical values and releases the report to the doctor.',
    screen: 'Pathology: test processing',
    items: [
      { icon: TestTube, label: 'Lipid profile sample collected', badge: 'Processing', tone: 'warn' },
      { icon: Plug, label: 'Analyser result imported', badge: 'Integrated' },
      { icon: FileText, label: 'LDL 182 mg/dL, above range', badge: 'Critical', tone: 'alert' },
      { icon: Send, label: 'Report sent to Dr. Sharma', badge: 'Delivered' },
    ],
  },
  {
    icon: Pill,
    title: 'Pharmacy dispensing',
    desc: 'The pharmacist sees the prescription in the queue, dispenses, and stock updates on its own. No paper slips.',
    screen: 'Pharmacy: dispensing',
    items: [
      { icon: ClipboardList, label: 'Prescription from Dr. Sharma', badge: 'Queued' },
      { icon: Pill, label: 'Atorvastatin 20 mg × 30, stock 248', badge: 'Available' },
      { icon: Pill, label: 'Aspirin 75 mg × 30, stock 512', badge: 'Available' },
      { icon: CheckCircle2, label: 'Dispensed, inventory updated', badge: 'Done' },
    ],
  },
  {
    icon: Receipt,
    title: 'Billing and discharge',
    desc: 'Charges consolidate, clearances complete, the NABH-aligned discharge summary is signed and the record is ready for ABDM sharing.',
    screen: 'Billing, discharge and record sharing',
    items: [
      { icon: BedDouble, label: 'Room charges, Ward C, 3 days', badge: '₹4,500' },
      { icon: FlaskConical, label: 'Diagnostics and pharmacy', badge: '₹1,850' },
      { icon: ClipboardCheck, label: 'Discharge summary completed', badge: 'Signed' },
      { icon: IdCard, label: 'FHIR record ready for ABDM', badge: 'Ready' },
    ],
    total: { label: 'Total after insurance', badge: '₹3,650 due' },
  },
]

const badgeTone = (tone) =>
  tone === 'warn' ? 'bg-marigold-500/20 text-marigold-300' : tone === 'alert' ? 'bg-coral-500/25 text-coral-400' : 'bg-white/10 text-pine-100'

const Workflow = () => {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useRef(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  const next = useCallback(() => setCurrent((c) => (c + 1) % WORKFLOWS.length), [])

  useEffect(() => {
    if (paused || reduce.current) return
    const t = setInterval(next, 5500)
    return () => clearInterval(t)
  }, [paused, next])

  const wf = WORKFLOWS[current]

  return (
    <section id="workflow" className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="container-site">
        <SectionHeader
          align="center"
          eyebrow="Live workflow"
          title="Watch one action set off the next"
          lead="A registration becomes a consultation, an order becomes a lab report, a prescription becomes a dispensed medicine, and it all lands on one bill."
        />

        <div
          className="mt-10 sm:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <ol className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:justify-center sm:px-0 sm:flex-wrap">
            {WORKFLOWS.map((w, i) => {
              const on = i === current
              const WIcon = w.icon
              return (
                <li key={w.title} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-current={on ? 'step' : undefined}
                    className={`relative flex items-center gap-2.5 overflow-hidden rounded-full py-2 pl-2 pr-4 text-[14px] font-semibold transition-colors ${
                      on ? 'bg-pine-900 text-white' : i < current ? 'bg-pine-50 text-pine-800 ring-1 ring-pine-100' : 'bg-paper text-ink/60 ring-1 ring-pine-100 hover:text-pine-950'
                    }`}
                  >
                    <span className={`grid h-8 w-8 place-items-center rounded-full ${on ? 'bg-marigold-500 text-pine-950' : 'bg-white text-pine-500'}`}>
                      <WIcon size={16} aria-hidden="true" />
                    </span>
                    {w.title}
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="mt-6 grid items-stretch gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div key={`d-${current}`} className="flex animate-fade-swap flex-col rounded-[28px] bg-paper p-6 ring-1 ring-pine-100 sm:p-10">
              <p className="hidden font-display text-[64px] font-extrabold leading-none text-pine-100 sm:block" aria-hidden="true">
                {String(current + 1).padStart(2, '0')}
              </p>
              <h3 className="text-[22px] font-bold text-pine-950 sm:mt-4 sm:text-[26px]">{wf.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70 sm:text-[16px]">{wf.desc}</p>
              <div className="mt-auto pt-6 sm:pt-10">
                <div className="flex items-center justify-between text-[13px] font-medium text-ink/55">
                  <span>Step {current + 1} of {WORKFLOWS.length}</span>
                  <button type="button" onClick={next} className="font-semibold text-pine-700 hover:text-pine-950">Next step →</button>
                </div>
                <div className="mt-3 flex gap-1.5" aria-hidden="true">
                  {WORKFLOWS.map((_, i) => (
                    <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= current ? 'bg-marigold-500' : 'bg-pine-100'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] bg-pine-950 shadow-[0_40px_80px_-40px_rgba(6,32,28,.7)]">
              <div className="glow-pine pointer-events-none absolute -right-32 -top-32 h-96 w-96" aria-hidden="true" />
              <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-3.5">
                <div className="flex items-center gap-2.5">
                  <img src="/AUSHRIT_logo (1).png" alt="Aushrit ERP" className="h-6 w-6 object-contain" />
                  <span className="text-[13px] font-semibold tracking-wide text-white">
                    AUSHRIT <span className="font-normal text-pine-300">Hospital ERP</span>
                  </span>
                </div>
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-marigold-500" />
                </span>
              </div>
              <div key={current} className="relative min-h-[340px] animate-fade-swap p-4 sm:min-h-[380px] sm:p-8" aria-live="polite">
                <div className="font-display text-[17px] font-bold text-white sm:text-[19px]">{wf.screen}</div>
                <ul className="mt-6 space-y-2.5">
                  {wf.items.map((it) => {
                    const IIcon = it.icon
                    return (
                      <li key={it.label} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3 py-3 text-[13.5px] text-white/85 ring-1 ring-white/5 sm:px-4 sm:py-3.5 sm:text-[14.5px]">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-marigold-500/15 text-marigold-400">
                          <IIcon size={17} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">{it.label}</span>
                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${badgeTone(it.tone)}`}>{it.badge}</span>
                      </li>
                    )
                  })}
                  {wf.total && (
                    <li className="flex items-center gap-3 rounded-2xl bg-marigold-500 px-4 py-3.5 text-[15px] font-semibold text-pine-950">
                      <Receipt size={18} className="shrink-0" aria-hidden="true" />
                      <span className="flex-1">{wf.total.label}</span>
                      <span className="font-display text-[17px] font-bold">{wf.total.badge}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Workflow
