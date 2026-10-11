import React from 'react'
import { Plus, Phone } from 'lucide-react'
import PricingPlans from '../components/PricingPlans'
import Cta from '../components/Cta'
import SectionHeader from '../components/SectionHeader'
import { SITE } from '../config/site'

const FAQS = [
  {
    q: `Does ${SITE.name} support ABDM and ABHA workflows?`,
    a: 'Yes. Depending on the plan, you get ABHA creation and linking, QR support, Scan & Share, HIP care-context linking, FHIR health records and consent-based HIU workflows.',
  },
  {
    q: `How does ${SITE.name} support NABH?`,
    a: 'Through NABH-aligned digital documentation: structured doctor and nursing assessments, medication charts, OT safety checklists, discharge records, digital signatures, audit logs and complete patient-file packets.',
  },
  {
    q: 'Which AI and voice features are available?',
    a: 'AI-assisted patient and prescription summaries, structured clinical documentation, medical voice-to-text, dictated prescriptions and notes, clinical-section parsing and order extraction. Availability depends on the plan.',
  },
  {
    q: 'Can you connect biometric devices and lab machines?',
    a: 'Yes. The 20–50 beds and 50+ beds plans connect biometric attendance devices and lab analysers. LIS, PACS, radiology and other third-party integrations beyond your plan are billed at ₹850 per hour, per person.',
  },
  {
    q: 'How are backups and deployment handled?',
    a: 'Cloud, on-premise and hybrid deployment are all supported. Plans include weekly or daily automated backups, encrypted offsite copies, backup health monitoring, configurable retention, restore help and disaster-recovery support.',
  },
  {
    q: 'Can we upgrade or customise later?',
    a: 'Yes. Add departments, beds, AI and voice, ABDM milestones, device integrations, reports, branches, deployment options and custom workflows as the hospital grows.',
  },
  {
    q: 'What happens if the internet goes down?',
    a: 'Supported workflows such as registration, billing and pharmacy keep working offline. Work is stored securely on the device and syncs automatically when the connection returns.',
  },
  {
    q: 'How does pricing work?',
    a: 'You pay a one-time licence based on your bed count (₹80,000 under 20 beds, ₹1,25,000 for 20–50 beds, ₹2,00,000 above 50 beds), plus an annual maintenance charge (AMC) of 20% of the licence. GST is charged extra.',
  },
]

const Pricing = () => (
  <>
    <section className="relative overflow-hidden bg-pine-950 pb-20 pt-[140px] text-white">
      <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_65%)]" />
      <div className="container-site relative max-w-[900px]">
        <h1 className="animate-rise font-display text-[clamp(38px,5.4vw,64px)] font-extrabold leading-[1.04] tracking-[-0.03em]">
          Pay for the hospital you run, not the one you might become.
        </h1>
        <p className="mt-6 max-w-[62ch] animate-rise text-[17.5px] leading-relaxed text-white/70" style={{ animationDelay: '.1s' }}>
          Start with connected OPD, then add IPD, ABDM M1 to M3, NABH-aligned documentation, AI and voice,
          device integrations, multi-branch control and enterprise backup as you grow.
        </p>
      </div>
    </section>

    <PricingPlans />

    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions hospitals ask us"
            lead="ABDM, NABH, AI and voice, integrations, deployment, backups and upgrades."
          />
          <div className="mt-8 rounded-[24px] bg-paper p-6 ring-1 ring-pine-100">
            <p className="font-display text-[18px] font-bold text-pine-950">Still have a question?</p>
            <p className="mt-1.5 text-[14.5px] text-ink/70">Talk to our team directly.</p>
            <a href={SITE.phoneHref} className="btn-dark mt-5 w-full">
              <Phone size={16} aria-hidden="true" /> Call {SITE.phone}
            </a>
          </div>
        </div>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-[20px] bg-paper px-6 ring-1 ring-pine-100 transition-colors open:bg-white open:shadow-[0_20px_50px_-30px_rgba(6,32,28,.35)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[17.5px] font-bold text-pine-950 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-pine-700 ring-1 ring-pine-100 transition-colors group-open:bg-pine-900 group-open:text-marigold-400 group-open:ring-pine-900">
                  <Plus size={18} className="transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
                </span>
              </summary>
              <p className="pb-6 pr-10 text-[15.5px] leading-relaxed text-ink/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <Cta />
  </>
)

export default Pricing
