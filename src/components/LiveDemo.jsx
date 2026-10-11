import React from 'react'
import {
  Building2, ClipboardList, Stethoscope, Syringe, Pill, Microscope, ScanLine, Scissors, Receipt, Users, Package,
  Smartphone, ArrowUpRight, Play, Database, RotateCcw, ExternalLink,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import { DEMO, demoLink } from '../config/site'

const ROLE_ICONS = {
  admin: Building2, staff: ClipboardList, doctor: Stethoscope, nurse: Syringe, pharmacy: Pill, pathology_staff: Microscope,
  radiology_staff: ScanLine, ot_staff: Scissors, accountant: Receipt, hr: Users, store: Package,
}

const NOTES = [
  { icon: Database, text: 'Sample hospital data only' },
  { icon: RotateCcw, text: 'Reset it any time' },
  { icon: ExternalLink, text: 'Opens in a new tab' },
]

const newTab = { target: '_blank', rel: 'noopener' }

const LiveDemo = () => (
  <section id="live-demo" className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
    <div className="dot-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_55%)]" aria-hidden="true" />
    <div className="container-site relative">
      <SectionHeader
        align="center"
        eyebrow="Live demo"
        title="Don't take our word for it. Click through the real ERP."
        lead="This is the actual Aushrit software running in your browser with sample hospital data. Nothing to install, no sign-up."
      />

      {/* Preview */}
      <a
        href={DEMO.url}
        {...newTab}
        className="group relative mx-auto mt-10 block max-w-[1040px] overflow-hidden rounded-[22px] bg-pine-950 p-1.5 shadow-[0_50px_100px_-40px_rgba(6,32,28,.6)] ring-1 ring-pine-900 sm:mt-14 sm:rounded-[28px] sm:p-2"
        aria-label="Launch the live demo in a new tab"
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
          <div className="absolute inset-0 flex items-center justify-center bg-pine-950/35 transition-colors duration-300 group-hover:bg-pine-950/55">
            <span className="flex items-center gap-3 rounded-full bg-marigold-500 py-3 pl-3 pr-6 text-[15px] font-bold text-pine-950 shadow-[0_20px_50px_-12px_rgba(242,163,58,.7)] transition-transform duration-300 group-hover:scale-105 sm:text-[17px]">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-pine-950 text-marigold-400 sm:h-11 sm:w-11">
                <Play size={18} className="translate-x-px" fill="currentColor" aria-hidden="true" />
              </span>
              Launch live demo
            </span>
          </div>
        </div>
      </a>

      <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="About the demo">
        {NOTES.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2 text-[13.5px] text-ink/65">
            <Icon size={15} className="text-pine-500" aria-hidden="true" /> {text}
          </li>
        ))}
      </ul>

      {/* Role picker */}
      <div className="mx-auto mt-14 max-w-[1040px] sm:mt-16">
        <h3 className="text-center text-[20px] font-bold text-pine-950 sm:text-[22px]">Or jump straight into a workspace</h3>
        <p className="mt-2 text-center text-[15px] text-ink/60">Each role opens the screens that person uses every day.</p>

        <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {DEMO.roles.map(({ role, label, path }) => {
            const Icon = ROLE_ICONS[role]
            return (
              <li key={role}>
                <a
                  href={demoLink(role, path)}
                  {...newTab}
                  className="group flex items-center gap-3 rounded-2xl bg-paper p-3 ring-1 ring-pine-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-900 hover:ring-pine-900 sm:p-3.5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-pine-700 ring-1 ring-pine-100 transition-colors group-hover:bg-marigold-500 sm:h-10 sm:w-10 group-hover:text-pine-950 group-hover:ring-transparent">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 text-[13.5px] font-semibold leading-tight text-pine-950 transition-colors group-hover:text-white sm:text-[14.5px]">{label}</span>
                  <ArrowUpRight size={16} className="hidden shrink-0 text-pine-400 transition-all sm:block group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-marigold-400" aria-hidden="true" />
                </a>
              </li>
            )
          })}
          <li className="col-span-2 sm:col-span-3 lg:col-span-1">
            <a
              href={DEMO.patientPortal.url}
              {...newTab}
              className="group flex h-full items-center gap-3 rounded-2xl bg-marigold-50 p-3 ring-1 ring-marigold-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-marigold-500 sm:p-3.5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-marigold-700 ring-1 ring-marigold-100 transition-colors group-hover:bg-pine-950 group-hover:text-marigold-400">
                <Smartphone size={19} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold text-pine-950 sm:text-[14.5px]">Patient portal</span>
                <span className="block text-[11.5px] text-ink/60 group-hover:text-pine-950/75">
                  Mobile {DEMO.patientPortal.mobile} · OTP {DEMO.patientPortal.otp}
                </span>
              </span>
              <ArrowUpRight size={16} className="shrink-0 text-marigold-600 group-hover:text-pine-950" aria-hidden="true" />
            </a>
          </li>
        </ul>

        <p className="mt-6 text-center text-[13px] text-ink/50">
          The demo runs entirely in your browser. Records you add are stored only on your device, and some actions are
          simplified for the demo.
        </p>
      </div>
    </div>
  </section>
)

export default LiveDemo
