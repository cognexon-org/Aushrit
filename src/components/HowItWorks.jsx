import React from 'react'
import { UserPlus, Stethoscope, Hospital, FileCheck2 } from 'lucide-react'
import SectionHeader from './SectionHeader'
import RailHint from './RailHint'

const STEPS = [
  {
    icon: UserPlus,
    title: 'Register and identify',
    desc: 'Register the patient, create or link ABHA, capture consent, insurance and demographics, and optionally verify identity through connected devices.',
  },
  {
    icon: Stethoscope,
    title: 'Consult and order',
    desc: 'Doctors review the longitudinal record, write prescriptions and place lab, radiology, admission or OT orders, all from one screen.',
  },
  {
    icon: Hospital,
    title: 'Deliver connected care',
    desc: 'Nursing, pharmacy, pathology, radiology, OT, store and billing work from one live record, with biometric and lab-machine integrations.',
  },
  {
    icon: FileCheck2,
    title: 'Discharge, share and protect',
    desc: 'Generate itemised bills and discharge documents, settle insurance or PM-JAY cases, share records through ABDM, and protect data with scheduled backups.',
  },
]

const HowItWorks = () => (
  <section id="how" className="relative overflow-hidden bg-paper py-16 sm:py-24 lg:py-28">
    <div className="dot-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]" aria-hidden="true" />
    <div className="container-site relative">
      <SectionHeader
        eyebrow="How it works"
        title="One patient journey, from front desk to discharge"
        lead="Aushrit follows the patient through every department, so each team picks up exactly where the last one left off."
      />

      <ol className="reveal rail relative mt-10 gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
        <span className="absolute left-8 right-8 top-[52px] hidden border-t-2 border-dashed border-pine-200 lg:block" aria-hidden="true" />
        {STEPS.map(({ icon: Icon, title, desc }, i) => (
          <li key={title} className="card card-hover relative flex flex-col p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="icon-chip h-12 w-12">
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className="font-display text-[44px] font-extrabold leading-none text-pine-100" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.12em] text-marigold-700">Step {i + 1}</p>
            <h3 className="mt-1.5 text-[20px] font-bold text-pine-950">{title}</h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink/70">{desc}</p>
          </li>
        ))}
      </ol>
      <RailHint />
    </div>
  </section>
)

export default HowItWorks
