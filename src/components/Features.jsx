import React from 'react'
import { IdCard, ClipboardCheck, Bot, Mic, Lock, Zap, Plug, Cloud, WifiOff, PlayCircle, FileAudio } from 'lucide-react'
import SectionHeader from './SectionHeader'
import RailHint from './RailHint'

const FEATURES = [
  { icon: FileAudio, title: 'Voice-enabled prescriptions', desc: 'Doctors dictate the prescription and Aushrit fills medicine, dose, frequency, duration and follow-up orders into the right fields, ready to review and sign.' },
  { icon: Bot, title: 'AI patient summaries', desc: 'Visits, vitals, labs, prescriptions and allergies condensed into a short structured summary, so clinicians review records faster.' },
  { icon: PlayCircle, title: 'Video guide for every module', desc: 'Chapter-by-chapter video walkthroughs for each role and screen, from registration to reports, so new staff get productive quickly.' },
  { icon: IdCard, title: 'ABDM and ABHA interoperability', desc: 'ABHA creation and linking, Scan & Share, HIP care contexts, FHIR records, HIU consent workflows and traceable health-information exchange.' },
  { icon: ClipboardCheck, title: 'NABH-aligned workflows', desc: 'Standard assessments, medication charts, OT safety checks, discharge records, digital signatures, audit trails and complete patient files.' },
  { icon: Mic, title: 'Voice-to-text documentation', desc: 'Doctors and nurses dictate prescriptions, notes, vitals and clinical sections with real-time medical transcription.' },
  { icon: Lock, title: 'Role-based access and audit', desc: 'Everyone gets exactly the access their job needs, with action-level permissions, signature checks, audit logs and document history.' },
  { icon: Zap, title: 'Real-time department sync', desc: 'Prescriptions, orders, beds, results, medication tasks, stock, bills and clearances update across departments instantly.' },
  { icon: Plug, title: 'Hospital device integrations', desc: 'Biometric attendance, lab analysers, imaging and PACS workflows, and external systems through configurable integrations and APIs.' },
  { icon: Cloud, title: 'Cloud, on-premise and backups', desc: 'Cloud, on-premise or hybrid deployment with scheduled backups, restore help, backup health checks and continuity support.' },
  { icon: WifiOff, title: 'Offline-ready operations', desc: 'Keep supported workflows running through internet drops, store work securely on the device, and sync once you are back online.' },
]

const Features = () => (
  <section id="features" className="relative overflow-hidden bg-pine-950 py-24 text-white sm:py-28">
    <div className="glow-pine pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px]" aria-hidden="true" />
    <div className="glow-marigold pointer-events-none absolute -bottom-48 -right-32 h-[520px] w-[520px] opacity-60" aria-hidden="true" />
    <div className="container-site relative">
      <SectionHeader
        dark
        align="center"
        eyebrow="Key features"
        title="Built for digital, compliant, intelligent hospitals"
        lead="Connected operations, ABDM interoperability, NABH-aligned records, AI and voice, secure integrations and your choice of deployment."
      />
      <ul className="reveal rail mt-10 gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, desc }, i) => (
          <li
            key={title}
            className={`group relative overflow-hidden rounded-[24px] p-6 ring-1 transition-colors duration-300 sm:p-8 ${
              i < 3 ? 'bg-gradient-to-br from-pine-800 to-pine-900 ring-white/15' : 'bg-white/[0.04] ring-white/10 hover:bg-white/[0.07]'
            } ${i === 0 ? 'md:col-span-2' : ''}`}
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-marigold-500/15 text-marigold-400 ring-1 ring-marigold-500/25 transition-colors group-hover:bg-marigold-500 group-hover:text-pine-950">
              <Icon size={22} aria-hidden="true" />
            </span>
            <h3 className="mt-6 flex flex-wrap items-center gap-2 text-[19px] font-bold">
              {title}
              {i < 3 && <span className="rounded-full bg-marigold-500 px-2 py-0.5 font-body text-[10.5px] font-bold uppercase tracking-wider text-pine-950">Smart</span>}
            </h3>
            <p className="mt-2.5 max-w-[60ch] text-[15px] leading-relaxed text-white/65">{desc}</p>
          </li>
        ))}
      </ul>
      <RailHint dark />
    </div>
  </section>
)

export default Features
