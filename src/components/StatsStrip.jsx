import React from 'react'

const STATS = [
  { value: 'M1–M3', label: 'ABDM interoperability' },
  { value: '18', label: 'connected modules' },
  { value: '8', label: 'role-based workspaces' },
  { value: '3', label: 'ways to deploy: cloud, on-premise, hybrid' },
]

const StatsStrip = () => (
  <section aria-label="Aushrit at a glance" className="bg-paper pb-16 sm:pb-24 lg:pb-28">
    <div className="container-site">
      <dl className="relative grid grid-cols-2 overflow-hidden rounded-[24px] bg-gradient-to-br sm:rounded-[32px] from-marigold-400 to-marigold-600 lg:grid-cols-4">
        <div className="dot-paper pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`relative flex flex-col-reverse justify-end p-5 sm:p-10 ${i % 2 ? 'border-l border-pine-950/10' : ''} ${i > 1 ? 'border-t border-pine-950/10 lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
          >
            <dt className="mt-2 text-[13px] leading-snug sm:text-[14.5px] text-pine-950/75">{s.label}</dt>
            <dd className="font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none tracking-tight text-pine-950">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
)

export default StatsStrip
