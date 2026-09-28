import React from 'react'
import { Hospital, Building2, Network, Check } from 'lucide-react'
import SectionHeader from './SectionHeader'
import RailHint from './RailHint'

const USE_CASES = [
  {
    icon: Hospital, title: 'Small and mid-size hospitals', subtitle: '50 to 200 beds',
    points: [
      'Digitise OPD, IPD, pharmacy, lab, billing and discharge without changing how your staff already work',
      'Start with ABHA-enabled registration, NABH-aligned core records, role-based access and scheduled backups',
      'Add voice-to-text, biometrics, OT, radiology or lab-machine integration when you need them',
      'See bed occupancy, revenue, appointments, stock and patient history live',
    ],
  },
  {
    icon: Building2, title: 'Multi-specialty hospitals', subtitle: '100+ beds with diagnostics',
    points: [
      'Doctors, nursing, OT, radiology, pathology, pharmacy, store, HR, insurance and finance on one record',
      'AI assistance and voice-to-text for faster prescriptions, notes and summaries',
      'Biometric attendance, analyser integration, ABDM Scan & Share, HIP care contexts and FHIR exchange',
      'Standard assessments, checklists, digital signatures, audit trails and daily automated backups',
    ],
  },
  {
    icon: Network, title: 'Hospital groups and networks', subtitle: 'Multi-branch and enterprise',
    points: [
      'Central governance, reports, permissions and onboarding across branches',
      'Dedicated cloud, on-premise or hybrid deployment with your own backup and recovery policy',
      'Multiple biometric devices, lab machines, LIS, PACS and third-party systems through custom APIs',
      'Full ABDM M1–M3, consent-based exchange, custom AI templates and enterprise audit retention',
    ],
  },
]

const UseCases = () => (
  <section className="bg-white py-16 sm:py-24 lg:py-28">
    <div className="container-site">
      <SectionHeader
        eyebrow="Use cases"
        title="Sized for the hospital you run today"
        lead="The same platform scales from a 50-bed nursing home to a multi-branch network."
      />
      <div className="reveal rail mt-10 gap-5 sm:mt-14 lg:grid-cols-3">
        {USE_CASES.map(({ icon: Icon, title, subtitle, points }, i) => {
          const dark = i === 1
          return (
            <article
              key={title}
              className={`flex flex-col overflow-hidden rounded-[28px] ring-1 transition-transform duration-300 hover:-translate-y-1 ${dark ? 'bg-pine-950 text-white ring-pine-900' : 'bg-white ring-pine-100'}`}
            >
              <div className={`relative overflow-hidden p-6 sm:p-8 ${dark ? 'bg-gradient-to-br from-pine-800 to-pine-950' : 'bg-paper'}`}>
                {dark && <div className="glow-marigold pointer-events-none absolute -right-20 -top-20 h-60 w-60" aria-hidden="true" />}
                <div className="relative flex items-center justify-between">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${dark ? 'bg-marigold-500 text-pine-950' : 'icon-chip'}`}>
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[12.5px] font-semibold ${dark ? 'bg-white/10 text-marigold-300' : 'bg-white text-pine-700 ring-1 ring-pine-100'}`}>
                    {subtitle}
                  </span>
                </div>
                <h3 className={`relative mt-6 text-[22px] font-bold ${dark ? 'text-white' : 'text-pine-950'}`}>{title}</h3>
              </div>
              <ul className="space-y-3.5 p-6 sm:space-y-4 sm:p-8">
                {points.map((p) => (
                  <li key={p} className={`flex gap-3 text-[15px] leading-relaxed ${dark ? 'text-white/80' : 'text-ink/80'}`}>
                    <span className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full ${dark ? 'bg-marigold-500/20 text-marigold-400' : 'bg-pine-100 text-pine-700'}`}>
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
      <RailHint />
    </div>
  </section>
)

export default UseCases
