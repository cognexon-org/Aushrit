import React from 'react'
import { Mic, ShieldCheck, Users, BedDouble, Scissors } from 'lucide-react'

// status: o = occupied, f = free, c = cleaning, r = reserved
const WARDS = [
  { name: 'Ward A', beds: 'ooofoocoo' },
  { name: 'Ward B', beds: 'oorofoooo' },
  { name: 'ICU', beds: 'ooocfo' },
]

const bedStyle = {
  o: 'bg-pine-600 text-white',
  f: 'bg-white text-pine-700 ring-1 ring-inset ring-pine-200',
  c: 'bg-marigold-400 text-pine-950',
  r: 'bg-pine-50 text-pine-600 [outline:1.5px_dashed_#4F9C84] [outline-offset:-2px]',
}

const LEGEND = [
  { k: 'o', label: 'Occupied' },
  { k: 'f', label: 'Free' },
  { k: 'c', label: 'Cleaning' },
  { k: 'r', label: 'Reserved' },
]

const KPIS = [
  { icon: Users, label: "Today's OPD", value: '124', note: '+12% vs yesterday' },
  { icon: BedDouble, label: 'IPD patients', value: '38', note: '3 admitted today' },
  { icon: Scissors, label: 'OT scheduled', value: '7', note: '2 in progress' },
]

const QUEUE = [
  { token: '14', name: 'Ravi Kumar', doc: 'Dr. Sharma', time: '10:30', state: 'In room' },
  { token: '15', name: 'Meena Verma', doc: 'Dr. Sharma', time: '10:45', state: 'Vitals done' },
  { token: '16', name: 'Aarav Singh', doc: 'Dr. Khan', time: '10:50', state: 'Waiting' },
]

// running offset so beds fill in one continuous sequence across wards
const WARD_OFFSETS = WARDS.map((_, i) => WARDS.slice(0, i).reduce((n, w) => n + w.beds.length, 0))

const HeroDashboard = () => {
  const total = WARDS.reduce((n, w) => n + w.beds.length, 0)
  const occupied = WARDS.reduce((n, w) => n + [...w.beds].filter((b) => b === 'o').length, 0)
  const pct = Math.round((occupied / total) * 100)

  return (
    <div className="relative mx-auto w-full max-w-[580px]" role="img" aria-label="Preview of the Aushrit hospital dashboard with OPD, IPD and OT counts, a live bed board and the OPD queue">
      <div className="rounded-[28px] bg-white p-4 shadow-[0_40px_80px_-30px_rgba(0,0,0,.55)] sm:p-5" aria-hidden="true">
        {/* header */}
        <div className="flex items-center justify-between gap-3 border-b border-pine-100/80 px-1 pb-3.5 mb-3.5">
          <div className="flex items-center gap-2.5">
            <img
              src="/AUSHRIT_logo (1).png"
              alt="Aushrit Hospital ERP"
              className="h-8 w-8 object-contain rounded-lg shadow-sm"
            />
            <div>
              <div className="font-display text-[15px] font-bold leading-tight text-pine-950">City Care Hospital</div>
              <div className="flex items-center gap-1.5 text-[11.5px] text-ink/60">
                <span className="font-semibold text-pine-700">Aushrit Hospital ERP</span>
                <span className="text-pine-300">•</span>
                <span>Admin console</span>
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pine-50 px-2.5 py-1 text-[11.5px] font-semibold text-pine-700">
            <span className="h-1.5 w-1.5 rounded-full bg-pine-500" /> Live
          </span>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-2.5">
          {KPIS.map(({ icon: Icon, label, value, note }) => (
            <div key={label} className="rounded-2xl bg-paper p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-ink/60">
                <Icon size={13} /> <span className="truncate">{label}</span>
              </div>
              <div className="mt-1 font-display text-[26px] font-bold leading-none text-pine-950">{value}</div>
              <div className="mt-1.5 truncate text-[10.5px] text-pine-600">{note}</div>
            </div>
          ))}
        </div>

        {/* Bed board */}
        <div className="mt-3 rounded-2xl border border-pine-100 p-3.5">
          <div className="mb-3 flex items-baseline justify-between">
            <div className="font-display text-[14px] font-bold text-pine-950">Bed board</div>
            <div className="text-[12px] text-ink/60">
              <span className="font-display text-[15px] font-bold text-pine-700">{pct}%</span> occupancy
            </div>
          </div>
          <div className="space-y-2">
            {WARDS.map((ward, wi) => (
              <div key={ward.name} className="flex items-center gap-2.5">
                <div className="w-[52px] shrink-0 text-[11px] font-semibold text-ink/60">{ward.name}</div>
                <div className="flex flex-1 flex-wrap gap-1.5">
                  {[...ward.beds].map((s, i) => {
                    const delay = 450 + (WARD_OFFSETS[wi] + i) * 45
                    return (
                      <span
                        key={i}
                        className={`grid h-7 w-7 place-items-center rounded-lg text-[9.5px] font-bold animate-bed-in sm:h-8 sm:w-8 ${bedStyle[s]}`}
                        style={{ animationDelay: `${delay}ms` }}
                      >
                        {ward.name[0] === 'I' ? `I${i + 1}` : `${ward.name.slice(-1)}${i + 1}`}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {LEGEND.map((l) => (
              <span key={l.k} className="flex items-center gap-1.5 text-[10.5px] text-ink/60">
                <span className={`h-2.5 w-2.5 rounded-[4px] ${bedStyle[l.k]}`} /> {l.label}
              </span>
            ))}
          </div>
        </div>

        {/* Queue */}
        <div className="mt-3 rounded-2xl bg-paper p-3.5">
          <div className="mb-2 font-display text-[14px] font-bold text-pine-950">OPD queue</div>
          <ul className="divide-y divide-pine-100">
            {QUEUE.map((q) => (
              <li key={q.token} className="flex items-center gap-3 py-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pine-900 text-[11px] font-bold text-white">
                  {q.token}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-semibold text-pine-950">{q.name}</span>
                  <span className="block truncate text-[11px] text-ink/55">{q.doc}, {q.time}</span>
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${
                    q.state === 'In room' ? 'bg-pine-600 text-white' : q.state === 'Waiting' ? 'bg-marigold-100 text-marigold-700' : 'bg-pine-100 text-pine-700'
                  }`}
                >
                  {q.state}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* floating chips */}
      <div
        className="absolute -bottom-7 left-6 hidden items-center gap-3 rounded-2xl bg-pine-800 px-4 py-3 text-white shadow-2xl ring-1 ring-white/10 animate-rise md:flex"
        style={{ animationDelay: '1.5s' }}
        aria-hidden="true"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-marigold-500 text-pine-950">
          <Mic size={17} />
        </span>
        <span>
          <span className="block text-[12.5px] font-semibold">Dictating prescription</span>
          <span className="mt-1 flex h-3 items-end gap-[3px]">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <span key={i} className="w-[3px] origin-bottom rounded-full bg-marigold-400 animate-wave" style={{ height: '100%', animationDelay: `${i * 0.12}s` }} />
            ))}
          </span>
        </span>
      </div>

      <div
        className="absolute -right-4 -top-5 hidden items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12.5px] font-semibold text-pine-900 shadow-xl ring-1 ring-pine-100 animate-rise sm:flex"
        style={{ animationDelay: '1.8s' }}
        aria-hidden="true"
      >
        <ShieldCheck size={16} className="text-pine-600" /> ABHA linked to record
      </div>
    </div>
  )
}

export default HeroDashboard
