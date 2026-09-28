import React from 'react'
import { IdCard, Mic, ClipboardCheck, Plug, Check } from 'lucide-react'
import SectionHeader from './SectionHeader'
import RailHint from './RailHint'

const CAPABILITIES = [
  {
    icon: IdCard, title: 'ABDM and ABHA interoperability',
    subtitle: 'Connect patient identity and health records through ABDM-ready workflows across M1, M2 and M3.',
    features: ['ABHA creation, discovery and linking', 'ABHA card and QR support', 'Facility Scan & Share', 'HIP care-context linking', 'FHIR health-record packaging', 'HIU consent and information requests', 'Consent, disclosure and transfer tracking'],
  },
  {
    icon: Mic, title: 'AI clinical assistant and voice-to-text',
    subtitle: 'Cut documentation time with dictation, structured transcription, AI summaries and intelligent note processing.',
    features: ['Real-time medical voice dictation', 'Voice-based prescriptions', 'Structured clinical note formatting', 'Patient and prescription summaries', 'Clinical section parsing', 'Order extraction from dictated text', 'Specialty template support'],
  },
  {
    icon: ClipboardCheck, title: 'NABH-aligned digital documentation',
    subtitle: 'Standardise records, safety workflows, signatures and audit evidence across the whole patient journey.',
    features: ['Doctor and nursing assessments', 'Medication and investigation records', 'OT readiness and safety checklists', 'Discharge documentation', 'Digital signatures and verification', 'Audit logs and version history', 'Complete patient-file PDF bundles'],
  },
  {
    icon: Plug, title: 'Integrations and resilience',
    subtitle: 'Connect devices and outside systems, and keep running through outages with secure deployment and backups.',
    features: ['Biometric attendance integration', 'Lab machine and analyser integration', 'Radiology, PACS, LIS and API support', 'Cloud, on-premise and hybrid deployment', 'Scheduled cloud backups', 'Backup health and restore assistance', 'Offline-ready workflow support'],
  },
]

const UpcomingModules = () => (
  <section id="advanced-capabilities" className="bg-white py-16 sm:py-24 lg:py-28">
    <div className="container-site">
      <SectionHeader
        align="center"
        eyebrow="Advanced capabilities"
        title="AI, compliance and connected care"
        lead="The capabilities that set a modern hospital apart, built into the same ERP rather than bolted on."
      />
      <div className="reveal rail mt-10 gap-5 sm:mt-14 md:grid-cols-2">
        {CAPABILITIES.map(({ icon: Icon, title, subtitle, features }, i) => (
          <article key={title} className="card card-hover group relative overflow-hidden p-6 sm:p-10">
            <span className="absolute right-8 top-8 font-display text-[56px] font-extrabold leading-none text-pine-50 transition-colors group-hover:text-marigold-100 sm:right-10 sm:top-10" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="icon-chip relative h-14 w-14">
              <Icon size={24} aria-hidden="true" />
            </span>
            <h3 className="relative mt-6 text-[22px] font-bold text-pine-950">{title}</h3>
            <p className="relative mt-2 max-w-[48ch] text-[15px] leading-relaxed text-ink/70">{subtitle}</p>
            <ul className="mt-7 grid gap-x-5 gap-y-2.5 border-t border-dashed border-pine-200 pt-7 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-ink/80">
                  <Check size={16} className="mt-0.5 shrink-0 text-marigold-600" strokeWidth={2.5} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <RailHint />
      <p className="mx-auto mt-8 sm:mt-10 max-w-max rounded-2xl bg-paper px-5 py-2.5 text-center text-[13.5px] sm:rounded-full sm:text-[14px] text-ink/65 ring-1 ring-pine-100">
        Capabilities are configured by plan, hospital size, deployment and integration needs.
      </p>
    </div>
  </section>
)

export default UpcomingModules
