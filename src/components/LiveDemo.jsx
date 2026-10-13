import React from 'react'
import {
  Building2, ClipboardList, Stethoscope, Syringe, Pill, Microscope, ScanLine, Scissors, Receipt, Users, Package,
  Smartphone, ArrowUpRight, Send, Link2, MousePointerClick,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import WhatsAppIcon from './WhatsAppIcon'
import { DEMO } from '../config/site'

const ROLE_ICONS = {
  admin: Building2, staff: ClipboardList, doctor: Stethoscope, nurse: Syringe, pharmacy: Pill, pathology_staff: Microscope,
  radiology_staff: ScanLine, ot_staff: Scissors, accountant: Receipt, hr: Users, store: Package, patient: Smartphone,
}

const STEPS = [
  { icon: Send, title: 'Message us on WhatsApp', desc: 'Tap the button. Your message is already typed.' },
  { icon: Link2, title: 'We send your demo link', desc: 'Our team replies with a private link to the live ERP.' },
  { icon: MousePointerClick, title: 'Explore the real software', desc: 'Click through every department with sample hospital data.' },
]

const newTab = { target: '_blank', rel: 'noopener noreferrer' }

const LiveDemo = () => (
  <section id="live-demo" className="relative overflow-hidden bg-white pt-16 sm:pt-24 lg:pt-28">
    <div className="dot-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_55%)]" aria-hidden="true" />
    <div className="container-site relative">
      <SectionHeader
        align="center"
        eyebrow="Live demo"
        title="See the real ERP, not a slideshow."
        lead="Message us on WhatsApp and we'll send you a link to the live Aushrit software with sample hospital data, so you can click through it yourself."
      />

      {/* Preview */}
      <a
        href={DEMO.request}
        {...newTab}
        className="group relative mx-auto mt-10 block max-w-[1040px] overflow-hidden rounded-[22px] bg-pine-950 p-1.5 shadow-[0_50px_100px_-40px_rgba(6,32,28,.6)] ring-1 ring-pine-900 sm:mt-14 sm:rounded-[28px] sm:p-2"
        aria-label="Request the live demo on WhatsApp"
      >
        <div className="flex items-center gap-3 px-3 py-2 sm:px-4 sm:py-2.5" aria-hidden="true">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-coral-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-marigold-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-pine-400/80" />
          </span>
          <span className="flex-1 truncate rounded-md bg-white/[0.07] px-3 py-1 text-center text-[11.5px] text-white/55 sm:text-[12.5px]">
            Aushrit City Hospital · Admin dashboard (demo)
          </span>
        </div>
        <div className="relative overflow-hidden rounded-[16px] sm:rounded-[20px]">
          <img
            src="/demo-preview.webp"
            alt="The Aushrit ERP admin dashboard with sample hospital data"
            width="1440"
            height="900"
            loading="lazy"
            className="block w-full transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-pine-950/40 transition-colors duration-300 group-hover:bg-pine-950/60">
            <span className="flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-6 text-[15px] font-bold text-white shadow-[0_20px_50px_-12px_rgba(37,211,102,.7)] transition-transform duration-300 group-hover:scale-105 sm:text-[17px]">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#25D366] sm:h-11 sm:w-11">
                <WhatsAppIcon size={22} />
              </span>
              Get the demo link on WhatsApp
            </span>
          </div>
        </div>
      </a>

      {/* How it works */}
      <ol className="mx-auto mt-8 grid max-w-[1040px] gap-3 sm:grid-cols-3 sm:gap-4">
        {STEPS.map(({ icon: Icon, title, desc }, i) => (
          <li key={title} className="flex gap-3.5 rounded-2xl bg-paper p-4 ring-1 ring-pine-100">
            <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pine-900 text-marigold-400">
              <Icon size={18} aria-hidden="true" />
              <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-marigold-500 text-[11px] font-bold text-pine-950">
                {i + 1}
              </span>
            </span>
            <span>
              <span className="block text-[14.5px] font-semibold text-pine-950">{title}</span>
              <span className="mt-0.5 block text-[13px] leading-snug text-ink/60">{desc}</span>
            </span>
          </li>
        ))}
      </ol>

      {/* Workspace picker */}
      <div className="mx-auto mt-14 max-w-[1040px] sm:mt-16">
        <h3 className="text-center text-[20px] font-bold text-pine-950 sm:text-[22px]">Want to see a particular workspace?</h3>
        <p className="mt-2 text-center text-[15px] text-ink/60">
          Pick one and we'll send the demo link pointed at the screens that person uses every day.
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {DEMO.roles.map(({ role, label }) => {
            const Icon = ROLE_ICONS[role]
            const patient = role === 'patient'
            return (
              <li key={role}>
                <a
                  href={DEMO.requestFor(label)}
                  {...newTab}
                  aria-label={`Request the ${label} demo on WhatsApp`}
                  className={`group flex items-center gap-3 rounded-2xl p-3 ring-1 transition-all duration-300 hover:-translate-y-0.5 sm:p-3.5 ${
                    patient ? 'bg-marigold-50 ring-marigold-100 hover:bg-marigold-500' : 'bg-paper ring-pine-100 hover:bg-pine-900 hover:ring-pine-900'
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white ring-1 transition-colors sm:h-10 sm:w-10 ${
                      patient
                        ? 'text-marigold-700 ring-marigold-100 group-hover:bg-pine-950 group-hover:text-marigold-400'
                        : 'text-pine-700 ring-pine-100 group-hover:bg-marigold-500 group-hover:text-pine-950 group-hover:ring-transparent'
                    }`}
                  >
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span className={`min-w-0 flex-1 text-[13.5px] font-semibold leading-tight text-pine-950 transition-colors sm:text-[14.5px] ${patient ? '' : 'group-hover:text-white'}`}>
                    {label}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className={`hidden shrink-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block ${
                      patient ? 'text-marigold-600 group-hover:text-pine-950' : 'text-pine-400 group-hover:text-marigold-400'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-[13px] text-ink/55">
          <WhatsAppIcon size={15} className="shrink-0 text-[#25D366]" />
          Choose a workspace to start a WhatsApp chat with our team. Your personal demo link will be shared shortly.
        </p>
      </div>
    </div>
  </section>
)

export default LiveDemo
