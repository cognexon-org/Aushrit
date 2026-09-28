import React from 'react'
import { WifiOff, UserPlus, Receipt, Stethoscope, Check, RefreshCw, Info } from 'lucide-react'

const BENEFITS = [
  'Keep key workflows running when the internet drops',
  'No front-desk queue while registration waits for a signal',
  'Billing and pharmacy carry on without interruption',
  'Data syncs on its own once the connection returns',
  'Made for towns and campuses with patchy connectivity',
]

const QUEUE = [
  { icon: UserPlus, title: 'Patient registration', sub: 'Aarav Sharma, OPD', state: 'pending' },
  { icon: Receipt, title: 'OPD billing', sub: 'Receipt INV-4021', state: 'pending' },
  { icon: Stethoscope, title: 'Doctor consultation', sub: 'Dr. Mehra, saved', state: 'synced' },
]

const OfflineReady = () => (
  <section id="offline-ready" className="relative overflow-hidden bg-paper py-16 sm:py-24 lg:py-28">
    <div className="dot-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_85%_50%,black,transparent_55%)]" aria-hidden="true" />
    <div className="container-site relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
      <div>
        <p className="eyebrow mb-5">
          <WifiOff size={14} className="text-marigold-600" aria-hidden="true" /> Offline-ready
        </p>
        <h2 className="section-title">Internet down? The hospital keeps working.</h2>
        <p className="section-lead">
          A hospital can't stop because the broadband did. Aushrit's offline-ready workflows let your team
          keep registering, billing and dispensing through connectivity problems.
        </p>
        <ul className="mt-8 grid gap-2.5 sm:mt-9 sm:grid-cols-2 sm:gap-3">
          {BENEFITS.map((b, i) => (
            <li
              key={b}
              className={`flex items-start gap-3 rounded-2xl bg-white p-3.5 text-[14.5px] sm:p-4 sm:text-[15px] leading-snug text-ink/85 ring-1 ring-pine-100 ${i === BENEFITS.length - 1 ? 'sm:col-span-2' : ''}`}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pine-900 text-marigold-400">
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <div className="glow-marigold pointer-events-none absolute -inset-10" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_-40px_rgba(6,32,28,.5)] ring-1 ring-pine-100" aria-label="Example: offline mode with records waiting to sync" role="img">
          <div className="flex items-center justify-between bg-pine-950 px-5 py-4 text-white sm:px-8 sm:py-5" aria-hidden="true">
            <div className="flex items-center gap-4">
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-marigold-500 text-pine-950">
                <WifiOff size={22} />
                <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-coral-500 ring-2 ring-pine-950" />
              </span>
              <div>
                <div className="font-display text-[19px] font-bold">Working offline</div>
                <div className="text-[13.5px] text-marigold-300">Connection lost. Saving on this device.</div>
              </div>
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1 sm:flex">
              <img src="/AUSHRIT_logo (1).png" alt="" className="h-5 w-5 object-contain" />
              <span className="text-[12px] font-semibold text-white/85">Aushrit ERP</span>
            </div>
          </div>
          <ul className="space-y-2.5 p-4 sm:space-y-3 sm:p-8" aria-hidden="true">
            {QUEUE.map(({ icon: Icon, title, sub, state }) => (
              <li key={title} className={`flex items-center gap-3 rounded-2xl p-3 sm:gap-4 sm:p-4 ${state === 'synced' ? 'bg-pine-50' : 'bg-marigold-50/70 ring-1 ring-marigold-100'}`}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-pine-700 ring-1 ring-pine-100">
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold text-pine-950 sm:text-[15px]">{title}</span>
                  <span className="block truncate text-[12.5px] text-ink/55 sm:text-[13px]">{sub}</span>
                </span>
                {state === 'synced' ? (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[12.5px] font-semibold text-pine-700 ring-1 ring-pine-200"><Check size={14} /> Synced</span>
                ) : (
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-marigold-100 px-2.5 py-1 text-[12.5px] font-semibold text-marigold-700"><RefreshCw size={13} /> <span className="sm:hidden">Pending</span><span className="hidden sm:inline">Waiting to sync</span></span>
                )}
              </li>
            ))}
          </ul>
          <p className="mx-4 mb-4 flex gap-2.5 rounded-2xl border border-dashed border-pine-200 p-3.5 text-[13.5px] leading-relaxed text-pine-800 sm:mx-8 sm:mb-8 sm:p-4 sm:text-[14px]" aria-hidden="true">
            <Info size={18} className="mt-0.5 shrink-0" />
            Your work is stored securely on this device and uploads automatically as soon as the internet is back.
          </p>
        </div>
      </div>
    </div>
  </section>
)

export default OfflineReady
