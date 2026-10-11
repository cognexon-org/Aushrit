import React, { useEffect, useRef, useState } from 'react'
import {
  Mic, Sparkles, Check, Stethoscope, FlaskConical, Pill, AlertTriangle, HeartPulse, Wand2, ShieldCheck, Send,
  ClipboardCheck, Fingerprint, PenLine, KeyRound, Stamp, FileCheck2, FileText, Smartphone, IdCard, QrCode,
  // Also needed if the video guide is restored: PlayCircle, Pause, Play, UserPlus, BedDouble, Receipt, BarChart3, MousePointer2, Captions
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import RailHint from './RailHint'

/* ---------- shared hooks ---------- */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** True while the element is on screen, so demos only animate when someone can see them. */
const useInView = (ref) => {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return inView
}

/** Runs its child demo only while that demo itself is on screen. */
const Live = ({ children }) => {
  const ref = useRef(null)
  const running = useInView(ref)
  return <div ref={ref}>{children(running)}</div>
}

/** Counter that ticks from 0 to `max` every `ms`, then loops. Frozen at `max` for reduced motion. */
const useTicker = (max, ms, running) => {
  const reduce = useRef(prefersReducedMotion())
  const [t, setT] = useState(reduce.current ? max : 0)
  useEffect(() => {
    if (!running || reduce.current) return
    const id = setInterval(() => setT((v) => (v >= max ? 0 : v + 1)), ms)
    return () => clearInterval(id)
  }, [max, ms, running])
  return t
}

/* ---------- 1. Voice-filled prescription ---------- */

const DICTATION = 'Atorvastatin 20 mg once daily at night for 30 days. Aspirin 75 mg after lunch for 30 days. Repeat lipid profile after two weeks.'
const RX = [
  { med: 'Atorvastatin', dose: '20 mg', freq: '0-0-1', when: 'Night', dur: '30 days', at: DICTATION.indexOf('.') + 1 },
  { med: 'Aspirin', dose: '75 mg', freq: '0-1-0', when: 'After lunch', dur: '30 days', at: DICTATION.indexOf('.', 60) + 1 },
]
const ORDER_AT = DICTATION.length
const VOICE_HOLD = 90

const VoiceDemo = ({ running }) => {
  const t = useTicker(DICTATION.length + VOICE_HOLD, 38, running)
  const chars = Math.min(t, DICTATION.length)
  const listening = chars < DICTATION.length

  return (
    <div className="overflow-hidden rounded-[22px] bg-pine-950 ring-1 ring-white/10" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="text-[12.5px] font-semibold text-white/80">Rx · Ravi Kumar, 45 M</span>
        <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold ${listening ? 'bg-coral-500/20 text-coral-400' : 'bg-pine-500/25 text-pine-200'}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${listening ? 'animate-pulse bg-coral-400' : 'bg-pine-300'}`} />
          {listening ? 'Listening' : 'Prescription ready'}
        </span>
      </div>

      <div className="flex items-center gap-4 px-5 pt-5">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-marigold-500 text-pine-950 ${listening ? 'animate-glow-pulse' : ''}`}>
          <Mic size={20} />
        </span>
        <div className="flex h-10 flex-1 items-center gap-[3px]">
          {Array.from({ length: 34 }).map((_, i) => (
            <span
              key={i}
              className={`w-full origin-center rounded-full bg-gradient-to-t from-pine-400 to-marigold-400 ${listening ? 'animate-wave' : ''}`}
              style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 9) * 0.09}s`, transform: listening ? undefined : 'scaleY(.2)' }}
            />
          ))}
        </div>
      </div>

      <p className="mx-5 mt-4 min-h-[66px] rounded-xl bg-white/[0.05] px-4 py-3 text-[13.5px] leading-relaxed text-white/80">
        <span className="text-white/40">“</span>
        {DICTATION.slice(0, chars)}
        {listening && <span className="ml-0.5 inline-block h-[14px] w-[2px] translate-y-[2px] animate-blink bg-marigold-400" />}
        {!listening && <span className="text-white/40">”</span>}
      </p>

      <div className="m-5 overflow-hidden rounded-xl bg-white text-[12.5px] text-ink">
        <div className="grid grid-cols-[1.4fr_.8fr_.8fr_.9fr] gap-2 bg-paper px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-pine-700">
          <span>Medicine</span><span>Dose</span><span>Freq.</span><span>Duration</span>
        </div>
        {RX.map((r) => {
          const on = chars >= r.at
          return (
            <div key={r.med} className="grid min-h-[44px] grid-cols-[1.4fr_.8fr_.8fr_.9fr] items-center gap-2 border-t border-pine-100 px-3.5 py-2">
              {on ? (
                <>
                  <span className="animate-fade-swap font-semibold text-pine-950">
                    {r.med}
                    <span className="block text-[11px] font-normal text-ink/50">{r.when}</span>
                  </span>
                  <span className="animate-fade-swap">{r.dose}</span>
                  <span className="animate-fade-swap font-mono">{r.freq}</span>
                  <span className="animate-fade-swap">{r.dur}</span>
                </>
              ) : (
                [0, 1, 2, 3].map((k) => <span key={k} className="h-2.5 rounded-full bg-pine-50" />)
              )}
            </div>
          )
        })}
        <div className="flex items-center justify-between gap-2 border-t border-pine-100 bg-paper/60 px-3.5 py-2.5">
          {chars >= ORDER_AT ? (
            <>
              <span className="flex animate-fade-swap items-center gap-1.5 font-semibold text-pine-800">
                <FlaskConical size={14} className="text-marigold-600" /> Lipid profile · in 2 weeks
              </span>
              <span className="flex animate-fade-swap items-center gap-1 rounded-full bg-pine-900 px-2.5 py-1 text-[11px] font-bold text-white">
                <Send size={11} /> Sent to lab
              </span>
            </>
          ) : (
            <span className="h-2.5 w-1/2 rounded-full bg-pine-50" />
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- 2. AI patient summary ---------- */

const SOURCES = [
  { icon: Stethoscope, label: 'OPD visit', detail: 'Chest discomfort on exertion' },
  { icon: HeartPulse, label: 'Vitals', detail: 'BP 148/92' },
  { icon: FlaskConical, label: 'Lab', detail: 'LDL 182 mg/dL' },
  { icon: Pill, label: 'Prescription', detail: 'Atorvastatin 20 mg' },
  { icon: AlertTriangle, label: 'Allergy', detail: 'Penicillin' },
]
const SUMMARY = [
  { tag: 'Presenting', text: 'Chest discomfort on exertion, first OPD visit.' },
  { tag: 'Findings', text: 'Raised LDL (182 mg/dL) and BP of 148/92.' },
  { tag: 'Plan', text: 'Atorvastatin 20 mg nightly; repeat lipid profile in 2 weeks.' },
  { tag: 'Alert', text: 'Penicillin allergy flagged on every prescription.', alert: true },
]
const S_SCAN = SOURCES.length
const S_GEN = S_SCAN + 2
const S_DONE = S_GEN + SUMMARY.length
const S_MAX = S_DONE + 5

const SummaryDemo = ({ running }) => {
  const s = useTicker(S_MAX, 650, running)
  const scanning = s < S_SCAN
  const generating = s >= S_SCAN && s < S_GEN
  const shown = Math.max(0, s - S_GEN + 1)
  const reviewed = s > S_DONE

  return (
    <div className="overflow-hidden rounded-[22px] bg-white ring-1 ring-pine-100" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-pine-100 bg-paper px-5 py-3">
        <span className="text-[12.5px] font-semibold text-pine-900">Patient record · MRN-2026-0142</span>
        <span className="text-[11.5px] text-ink/50">{SOURCES.length} sources</span>
      </div>

      <ul className="flex flex-wrap gap-2 px-5 pt-4">
        {SOURCES.map(({ icon: Icon, label, detail }, i) => {
          const active = scanning && s === i
          const read = s > i || !scanning
          return (
            <li
              key={label}
              className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-[12px] ring-1 transition-all duration-300 ${
                active ? 'scale-[1.04] bg-marigold-50 ring-marigold-400' : read ? 'bg-pine-50 ring-pine-100' : 'bg-white ring-pine-100 opacity-60'
              }`}
            >
              <Icon size={14} className={active ? 'text-marigold-700' : 'text-pine-600'} />
              <span className="font-semibold text-pine-950">{label}</span>
              <span className="text-ink/55">{detail}</span>
            </li>
          )
        })}
      </ul>

      <div className="m-5 rounded-2xl bg-gradient-to-br from-pine-900 to-pine-950 p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[13px] font-bold">
            <Sparkles size={16} className={`text-marigold-400 ${generating || scanning ? 'animate-pulse' : ''}`} /> AI summary
          </span>
          <span className="text-[11px] text-white/50">
            {scanning ? 'Reading record…' : generating ? 'Summarising…' : reviewed ? 'Doctor reviewed' : 'Draft'}
          </span>
        </div>

        <ul className="mt-4 min-h-[148px] space-y-2.5">
          {(scanning || generating) &&
            [90, 75, 84, 60].map((w, i) => (
              <li
                key={i}
                className="h-3 animate-shimmer rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,.06),rgba(255,255,255,.18),rgba(255,255,255,.06))] bg-[length:200%_100%]"
                style={{ width: `${w}%` }}
              />
            ))}
          {!scanning && !generating &&
            SUMMARY.slice(0, shown).map((b) => (
              <li key={b.tag} className="flex animate-fade-swap gap-2.5 text-[13px] leading-snug">
                <span className={`mt-px shrink-0 self-start rounded-md px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide ${b.alert ? 'bg-coral-500/25 text-coral-400' : 'bg-white/10 text-marigold-300'}`}>
                  {b.tag}
                </span>
                <span className="text-white/85">{b.text}</span>
              </li>
            ))}
        </ul>

        <div className={`mt-4 flex items-center justify-between border-t border-white/10 pt-3.5 transition-opacity duration-500 ${reviewed ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-[11.5px] text-white/50">Built from 5 records</span>
          <span className="flex items-center gap-1 rounded-full bg-marigold-500 px-2.5 py-1 text-[11px] font-bold text-pine-950">
            <Check size={12} strokeWidth={3} /> Approved by Dr. Sharma
          </span>
        </div>
      </div>
    </div>
  )
}

// Video-based guide: hidden for now. Uncomment this block and the <Card> in the section below to bring it back.
// /* ---------- 3. Video guide player ---------- */
//
// const CHAPTERS = [
//   { icon: UserPlus, title: 'Patient registration', dur: '2:40', steps: ['Search or create the patient', 'Link ABHA with OTP or QR', 'Book the OPD appointment'] },
//   { icon: Stethoscope, title: 'Doctor consultation', dur: '3:15', steps: ["Open today's patient queue", 'Dictate the prescription by voice', 'Review the AI summary and sign'] },
//   { icon: BedDouble, title: 'IPD admission and beds', dur: '2:55', steps: ['Pick a ward on the bed map', 'Assign bed and attending doctor', 'Start the nursing chart'] },
//   { icon: Pill, title: 'Pharmacy dispensing', dur: '2:10', steps: ['Open the prescription queue', 'Scan batch and dispense', 'Stock updates on its own'] },
//   { icon: Receipt, title: 'Billing and discharge', dur: '3:30', steps: ['Review the running bill', 'Collect payment or insurance', 'Sign the discharge summary'] },
//   { icon: BarChart3, title: 'Reports and MIS', dur: '1:50', steps: ['Open the admin dashboard', 'Filter by department and date', 'Export or schedule the report'] },
// ]
// // Where the demo cursor goes for each of the three steps (percent of the screen).
// const TARGETS = [
//   { x: 58, y: 18 },
//   { x: 40, y: 54 },
//   { x: 80, y: 84 },
// ]
// const STEP_MS = 2200
//
// const VideoGuide = ({ running }) => {
//   const [chapter, setChapter] = useState(0)
//   const [step, setStep] = useState(0)
//   const [playing, setPlaying] = useState(!prefersReducedMotion())
//   const live = playing && running
//
//   useEffect(() => {
//     if (!live) return
//     const id = setTimeout(() => {
//       if (step < 2) setStep(step + 1)
//       else {
//         setStep(0)
//         setChapter((c) => (c + 1) % CHAPTERS.length)
//       }
//     }, STEP_MS)
//     return () => clearTimeout(id)
//   }, [live, step])
//
//   // On phones the chapter list is a sideways row: keep the playing chapter in view (without scrolling the page).
//   const listRef = useRef(null)
//   useEffect(() => {
//     const list = listRef.current
//     const item = list?.children[chapter]
//     if (!list || !item || list.scrollWidth <= list.clientWidth) return
//     list.scrollTo({ left: item.offsetLeft - list.offsetLeft - 20, behavior: 'smooth' })
//   }, [chapter])
//
//   const pick = (i) => {
//     setChapter(i)
//     setStep(0)
//     setPlaying(true)
//   }
//
//   const ch = CHAPTERS[chapter]
//   const ChIcon = ch.icon
//   const target = TARGETS[step]
//
//   return (
//     <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
//       {/* Player */}
//       <div className="overflow-hidden rounded-[22px] bg-pine-950 ring-1 ring-white/10">
//         <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br sm:aspect-video from-pine-900 to-pine-950" aria-hidden="true">
//           {/* Mock ERP screen */}
//           <div className="absolute inset-3 flex overflow-hidden rounded-xl bg-paper sm:inset-5">
//             <div className="flex w-[14%] flex-col items-center gap-1.5 bg-pine-950 py-2.5 sm:w-[13%] sm:gap-2 sm:py-3">
//               <img src="/AUSHRIT_logo (1).png" alt="" className="hidden h-6 w-6 object-contain sm:block" />
//               {CHAPTERS.map((c, i) => {
//                 const I = c.icon
//                 return (
//                   <span key={c.title} className={`grid h-6 w-6 place-items-center rounded-lg transition-colors sm:h-8 sm:w-8 ${i === chapter ? 'bg-marigold-500 text-pine-950' : 'text-white/40'}`}>
//                     <I size={14} />
//                   </span>
//                 )
//               })}
//             </div>
//             <div className="relative flex-1 p-3 sm:p-5">
//               <div key={chapter} className="flex animate-fade-swap items-center gap-2">
//                 <ChIcon size={16} className="text-pine-700" />
//                 <span className="font-display text-[12px] font-bold text-pine-950 sm:text-[15px]">{ch.title}</span>
//               </div>
//               {/* Target 1: search / top bar */}
//               <div className={`mt-2.5 flex h-[14%] items-center rounded-lg bg-white px-3 ring-1 transition-all duration-500 sm:mt-3 ${step === 0 ? 'ring-2 ring-marigold-500' : 'ring-pine-100'}`}>
//                 <span className="h-2 w-2/5 rounded-full bg-pine-100" />
//               </div>
//               <div className="mt-2.5 grid h-[46%] grid-cols-3 gap-2 sm:mt-3 sm:gap-3">
//                 {/* Target 2: main card */}
//                 <div className={`col-span-2 flex flex-col justify-center gap-1.5 rounded-lg bg-white p-3 ring-1 transition-all duration-500 ${step === 1 ? 'ring-2 ring-marigold-500' : 'ring-pine-100'}`}>
//                   <span className="h-2 w-3/4 rounded-full bg-pine-200" />
//                   <span className="h-2 w-1/2 rounded-full bg-pine-100" />
//                   <span className="h-2 w-2/3 rounded-full bg-pine-100" />
//                 </div>
//                 <div className="flex flex-col gap-2 sm:gap-3">
//                   <span className="flex-1 rounded-lg bg-pine-100/70" />
//                   <span className="flex-1 rounded-lg bg-marigold-100/70" />
//                 </div>
//               </div>
//               {/* Target 3: action button */}
//               <div className="mt-2.5 flex justify-end sm:mt-3">
//                 <span className={`h-5 w-1/4 rounded-full transition-all duration-500 sm:h-7 ${step === 2 ? 'bg-marigold-500 ring-4 ring-marigold-500/30' : 'bg-pine-900'}`} />
//               </div>
//             </div>
//           </div>
//
//           {/* Animated cursor */}
//           <span
//             className="absolute z-10 transition-all duration-700 ease-out"
//             style={{ left: `${target.x}%`, top: `${target.y}%` }}
//           >
//             <span key={`${chapter}-${step}`} className="absolute -left-3 -top-3 h-6 w-6 animate-ping rounded-full bg-marigold-400/60" />
//             <MousePointer2 size={22} className="relative fill-white text-pine-950 drop-shadow" />
//           </span>
//
//           {/* Caption: overlaid on larger screens, below the screen on phones */}
//           <div className="absolute inset-x-0 bottom-6 hidden justify-center px-4 sm:flex">
//             <span key={`${chapter}-${step}`} className="flex animate-fade-swap items-center gap-2 rounded-lg bg-pine-950/90 px-3 py-1.5 text-[11.5px] font-medium text-white backdrop-blur sm:text-[13.5px]">
//               <Captions size={14} className="text-marigold-400" /> Step {step + 1}: {ch.steps[step]}
//             </span>
//           </div>
//         </div>
//
//         <p key={`c-${chapter}-${step}`} className="flex animate-fade-swap items-center gap-2 border-b border-white/10 px-4 py-3 text-[13px] font-medium text-white sm:hidden">
//           <Captions size={15} className="shrink-0 text-marigold-400" aria-hidden="true" />
//           <span><span className="text-marigold-300">Step {step + 1}:</span> {ch.steps[step]}</span>
//         </p>
//
//         {/* Controls */}
//         <div className="flex items-center gap-4 px-4 py-3 sm:px-5 sm:py-3.5">
//           <button
//             type="button"
//             onClick={() => setPlaying((p) => !p)}
//             className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-marigold-500 text-pine-950 transition-colors hover:bg-marigold-400"
//             aria-label={playing ? 'Pause guide preview' : 'Play guide preview'}
//           >
//             {playing ? <Pause size={16} /> : <Play size={16} className="translate-x-px" />}
//           </button>
//           <div className="flex flex-1 gap-1" aria-hidden="true">
//             {[0, 1, 2].map((i) => (
//               <span key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
//                 <span
//                   key={`${chapter}-${step}-${i}`}
//                   className="block h-full rounded-full bg-marigold-500"
//                   style={
//                     i < step
//                       ? { width: '100%' }
//                       : i === step
//                         ? { width: 0, animation: `grow ${STEP_MS}ms linear forwards`, animationPlayState: live ? 'running' : 'paused' }
//                         : { width: 0 }
//                   }
//                 />
//               </span>
//             ))}
//           </div>
//           <span className="shrink-0 text-[12px] tabular-nums text-white/55">{ch.dur}</span>
//         </div>
//       </div>
//
//       {/* Chapters */}
//       <ol ref={listRef} className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:rounded-[22px] lg:bg-white/[0.04] lg:p-2 lg:ring-1 lg:ring-white/10" aria-label="Video guide chapters">
//         {CHAPTERS.map((c, i) => {
//           const on = i === chapter
//           const I = c.icon
//           return (
//             <li key={c.title} className="w-[230px] shrink-0 lg:w-auto">
//               <button
//                 type="button"
//                 onClick={() => pick(i)}
//                 aria-current={on ? 'true' : undefined}
//                 className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${on ? 'bg-white text-pine-950' : 'bg-white/[0.04] text-white/75 ring-1 ring-white/10 hover:bg-white/[0.06] hover:text-white lg:bg-transparent lg:ring-0'}`}
//               >
//                 <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${on ? 'bg-pine-900 text-marigold-400' : 'bg-white/[0.06] text-pine-200'}`}>
//                   {on && playing ? <PlayCircle size={17} /> : <I size={17} />}
//                 </span>
//                 <span className="min-w-0 flex-1">
//                   <span className="block truncate text-[14px] font-semibold">{c.title}</span>
//                   <span className={`block text-[12px] ${on ? 'text-ink/55' : 'text-white/45'}`}>Chapter {i + 1} · {c.dur}</span>
//                 </span>
//                 {on && <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-marigold-500" aria-hidden="true" />}
//               </button>
//             </li>
//           )
//         })}
//       </ol>
//     </div>
//   )
// }

/* ---------- 3. Smart workflow showcase ---------- */

const MiniFrame = ({ title, badge, children }) => (
  <div className="flex h-[188px] flex-col overflow-hidden rounded-2xl bg-white text-ink shadow-[0_18px_40px_-24px_rgba(0,0,0,.6)]" aria-hidden="true">
    <div className="flex items-center justify-between gap-2 border-b border-pine-100 bg-paper px-3.5 py-2">
      <span className="truncate text-[11.5px] font-semibold text-pine-900">{title}</span>
      {badge}
    </div>
    <div className="relative flex-1 p-3.5">{children}</div>
  </div>
)

const NABH_ITEMS = ['Initial assessment', 'Medication chart', 'OT safety checklist', 'Discharge summary']
const NabhVisual = ({ running }) => {
  const t = useTicker(NABH_ITEMS.length + 3, 700, running)
  const done = Math.min(t, NABH_ITEMS.length)
  return (
    <MiniFrame title="Patient file · NABH checklist" badge={<span className="shrink-0 text-[10.5px] font-bold text-pine-600">{done}/{NABH_ITEMS.length}</span>}>
      <ul className="space-y-1.5">
        {NABH_ITEMS.map((it, i) => (
          <li key={it} className="flex items-center gap-2 text-[12px]">
            <span className={`grid h-4 w-4 place-items-center rounded transition-colors duration-300 ${i < done ? 'bg-pine-700 text-white' : 'ring-1 ring-pine-200'}`}>
              {i < done && <Check size={10} strokeWidth={3.5} />}
            </span>
            <span className={i < done ? 'text-pine-950' : 'text-ink/45'}>{it}</span>
          </li>
        ))}
      </ul>
      <span className="absolute inset-x-3.5 bottom-3.5 h-1.5 overflow-hidden rounded-full bg-pine-50">
        <span className="block h-full rounded-full bg-marigold-500 transition-all duration-500" style={{ width: `${(done / NABH_ITEMS.length) * 100}%` }} />
      </span>
    </MiniFrame>
  )
}

const PUNCHES = [
  { name: 'Dr. Mehra', time: 'In 09:02' },
  { name: 'Nurse Kavya', time: 'In 09:05' },
  { name: 'Ravi (Lab)', time: 'In 09:11' },
]
const BiometricVisual = ({ running }) => {
  const t = useTicker(PUNCHES.length + 2, 1100, running)
  const shown = Math.min(t, PUNCHES.length)
  return (
    <MiniFrame
      title="Biometric device · Main gate"
      badge={<span className="flex shrink-0 items-center gap-1 text-[10.5px] font-bold text-pine-600"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pine-500" /> Connected</span>}
    >
      <div className="flex h-full items-center gap-4">
        <span className="relative grid h-[84px] w-[70px] shrink-0 place-items-center overflow-hidden rounded-2xl bg-pine-950 text-marigold-400">
          <Fingerprint size={40} strokeWidth={1.5} />
          {running && <span className="absolute inset-x-1 top-0 h-0.5 animate-scan rounded-full bg-marigold-400 shadow-[0_0_12px_rgba(242,163,58,.9)]" />}
        </span>
        <ul className="min-w-0 flex-1 space-y-1.5">
          {PUNCHES.slice(0, shown).map((p) => (
            <li key={p.name} className="flex animate-fade-swap items-center justify-between gap-2 rounded-lg bg-paper px-2.5 py-1.5 text-[11.5px]">
              <span className="truncate font-semibold text-pine-950">{p.name}</span>
              <span className="shrink-0 text-pine-600">{p.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </MiniFrame>
  )
}

const SignatoryVisual = ({ running }) => {
  const t = useTicker(6, 700, running)
  const signed = t >= 2
  return (
    <MiniFrame
      title="Consent for admission"
      badge={t >= 4 ? <span className="shrink-0 animate-fade-swap text-[10.5px] font-bold text-pine-600">Signed ✓</span> : <span className="shrink-0 text-[10.5px] text-ink/40">Awaiting signature</span>}
    >
      <div className="space-y-1.5">
        {[92, 80, 86].map((w) => <span key={w} className="block h-1.5 rounded-full bg-pine-50" style={{ width: `${w}%` }} />)}
      </div>
      <svg viewBox="0 0 220 60" className="mt-1.5 h-[52px] w-full">
        <path
          d="M8 42 C 22 10, 34 10, 30 38 S 52 52, 60 26 S 78 8, 82 34 C 84 46, 96 44, 104 30 C 110 20, 118 22, 120 34 C 122 44, 134 40, 142 28 C 150 18, 160 30, 170 26 L 206 22"
          fill="none"
          stroke="#113D35"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 420, strokeDashoffset: signed ? 0 : 420, transition: signed ? 'stroke-dashoffset 1.4s ease-in-out' : 'none' }}
        />
      </svg>
      <div className="flex items-end justify-between border-t border-dashed border-pine-200 pt-1 text-[10.5px] text-ink/50">
        <span>Patient / attendant signature</span>
        <span>12 Mar, 10:42</span>
      </div>
    </MiniFrame>
  )
}

const AUTH_METHODS = [
  { icon: Smartphone, label: 'Mobile OTP' },
  { icon: IdCard, label: 'ABHA' },
  { icon: QrCode, label: 'QR code' },
  { icon: Fingerprint, label: 'Biometric' },
]
const AuthVisual = ({ running }) => {
  const t = useTicker(AUTH_METHODS.length * 3 - 1, 650, running)
  const method = Math.floor(t / 3)
  const verified = t % 3 === 2
  const { icon: MethodIcon, label } = AUTH_METHODS[method]
  return (
    <MiniFrame title="Verify patient identity" badge={<span className="shrink-0 text-[10.5px] text-ink/45">Ravi Kumar</span>}>
      <div className="grid grid-cols-4 gap-1.5">
        {AUTH_METHODS.map(({ icon: I, label: l }, i) => (
          <span key={l} className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-center text-[10px] font-semibold transition-all duration-300 ${i === method ? 'scale-105 bg-pine-900 text-white' : 'bg-paper text-ink/55'}`}>
            <I size={16} className={i === method ? 'text-marigold-400' : 'text-pine-500'} />
            {l}
          </span>
        ))}
      </div>
      <div key={`${method}-${verified}`} className={`mt-3 flex animate-fade-swap items-center gap-2 rounded-xl px-3 py-2.5 text-[12px] font-semibold ${verified ? 'bg-pine-50 text-pine-800' : 'bg-marigold-50 text-marigold-700'}`}>
        {verified ? <Check size={14} strokeWidth={3} /> : <MethodIcon size={14} className="animate-pulse" />}
        {verified ? `Identity verified via ${label}` : `Checking ${label}…`}
      </div>
    </MiniFrame>
  )
}

const SealVisual = ({ running }) => {
  const t = useTicker(6, 700, running)
  const sign = t >= 1
  const stamp = t >= 3
  return (
    <MiniFrame title="Lab report · Lipid profile" badge={<span className="shrink-0 text-[10.5px] font-bold text-pine-600">Print ready</span>}>
      <div className="space-y-1.5">
        {[['LDL cholesterol', '182 mg/dL'], ['HDL cholesterol', '41 mg/dL']].map(([k, v]) => (
          <div key={k} className="flex justify-between text-[11.5px]"><span className="text-ink/60">{k}</span><span className="font-semibold text-pine-950">{v}</span></div>
        ))}
      </div>
      <div className="absolute inset-x-3.5 bottom-3 flex items-end justify-between">
        <div>
          <svg viewBox="0 0 120 34" className="h-[30px] w-[104px]">
            <path
              d="M4 24 C 14 6, 22 30, 30 16 S 44 4, 50 20 S 66 30, 74 14 C 80 6, 90 22, 116 12"
              fill="none"
              stroke="#185246"
              strokeWidth="2.2"
              strokeLinecap="round"
              style={{ strokeDasharray: 200, strokeDashoffset: sign ? 0 : 200, transition: sign ? 'stroke-dashoffset 1.1s ease-in-out' : 'none' }}
            />
          </svg>
          <p className="border-t border-pine-200 pt-0.5 text-[10px] font-semibold text-pine-900">Dr. A. Sharma, MD</p>
        </div>
        <span
          className="grid h-[58px] w-[58px] place-items-center rounded-full border-[3px] border-double border-marigold-600 text-center text-[7.5px] font-bold uppercase leading-tight tracking-wide text-marigold-700"
          style={{ transform: `rotate(-12deg) scale(${stamp ? 1 : 1.8})`, opacity: stamp ? 0.9 : 0, transition: 'transform .35s cubic-bezier(.3,1.6,.5,1), opacity .25s' }}
        >
          City Care<br />Hospital<br />Verified
        </span>
      </div>
    </MiniFrame>
  )
}

const CLAIM_DOCS = ['Pre-authorisation form', 'Discharge summary', 'Itemised final bill', 'Investigation reports']
const ClaimVisual = ({ running }) => {
  const t = useTicker(CLAIM_DOCS.length + 4, 650, running)
  const done = Math.min(t, CLAIM_DOCS.length)
  const ready = t > CLAIM_DOCS.length
  return (
    <MiniFrame title="Insurance claim pack" badge={<span className="shrink-0 text-[10.5px] font-bold text-pine-600">{done}/{CLAIM_DOCS.length} documents</span>}>
      <ul className="space-y-1">
        {CLAIM_DOCS.map((d, i) => (
          <li key={d} className="flex items-center gap-2 text-[11.5px]">
            <FileText size={13} className={i < done ? 'text-pine-600' : 'text-ink/30'} />
            <span className={`flex-1 ${i < done ? 'text-pine-950' : 'text-ink/40'}`}>{d}</span>
            {i < done && <Check size={12} strokeWidth={3} className="animate-fade-swap text-pine-600" />}
          </li>
        ))}
      </ul>
      <span className={`absolute inset-x-3.5 bottom-3 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11.5px] font-bold transition-all duration-300 ${ready ? 'bg-marigold-500 text-pine-950' : 'bg-pine-50 text-ink/40'}`}>
        <Send size={12} /> {ready ? 'Claim pack ready to submit' : 'Collecting documents…'}
      </span>
    </MiniFrame>
  )
}

const SHOWCASE = [
  {
    icon: ClipboardCheck, title: 'NABH smart documentation', Visual: NabhVisual,
    desc: 'Assessments, medication charts, safety checklists and discharge records are captured in NABH-aligned formats as staff work, with an audit trail on every entry.',
    tags: ['Structured templates', 'Checklist tracking', 'Audit trail'],
  },
  {
    icon: Fingerprint, title: 'Biometric device integration', Visual: BiometricVisual,
    desc: 'Connect biometric devices so staff attendance and patient verification post straight into the ERP, with no manual entry.',
    tags: ['Staff attendance', 'Shift reconciliation', 'Patient verification'],
  },
  {
    icon: PenLine, title: 'Patient signatory', Visual: SignatoryVisual,
    desc: 'Patients or attendants sign consent, admission and discharge forms on screen. The signature is time-stamped and stored with the record.',
    tags: ['Consent forms', 'Time-stamped', 'Stored with the record'],
  },
  {
    icon: KeyRound, title: 'Multiple patient authentication', Visual: AuthVisual,
    desc: 'Verify patients the way that works for them, by mobile OTP, ABHA, QR code or biometric, so the right record opens every time.',
    tags: ['Mobile OTP', 'ABHA', 'QR code', 'Biometric'],
  },
  {
    icon: Stamp, title: 'Doctor digital signature and seal', Visual: SealVisual,
    desc: "Reports, prescriptions and discharge summaries print with the doctor's digital signature and the hospital seal, ready to hand over or share.",
    tags: ['Lab and radiology reports', 'Prescriptions', 'Printed documents'],
  },
  {
    icon: FileCheck2, title: 'Insurance-ready claim documents', Visual: ClaimVisual,
    desc: 'Assemble the exact documents each insurer or TPA asks for into one claim-ready pack, so claims go in complete and are settled with less back-and-forth.',
    tags: ['Insurer-wise document sets', 'Pre-auth and final claim', 'One claim pack'],
  },
]

const ShowcaseCard = ({ icon: Icon, title, desc, tags, Visual }) => (
  <article className="group flex flex-col rounded-[24px] bg-white/[0.04] p-4 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-marigold-500/40 sm:p-5">
    <Live>{(running) => <Visual running={running} />}</Live>
    <div className="mt-5 flex items-center gap-3 px-1">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-marigold-500/15 text-marigold-400 ring-1 ring-marigold-500/25 transition-colors group-hover:bg-marigold-500 group-hover:text-pine-950">
        <Icon size={19} aria-hidden="true" />
      </span>
      <h4 className="text-[17px] font-bold leading-snug text-white">{title}</h4>
    </div>
    <p className="mt-3 px-1 text-[14.5px] leading-relaxed text-white/65">{desc}</p>
    <ul className="mt-auto flex flex-wrap gap-1.5 px-1 pt-4">
      {tags.map((t) => (
        <li key={t} className="rounded-full bg-white/[0.07] px-2.5 py-1 text-[11.5px] font-medium text-white/75">{t}</li>
      ))}
    </ul>
  </article>
)

const SmartShowcase = () => (
  <div className="mt-16 sm:mt-24">
    <div className="mx-auto max-w-[720px] text-center">
      <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-marigold-300">Paperwork, identity and claims</p>
      <h3 className="mt-3 text-[clamp(24px,3vw,36px)] font-bold">Smart workflows that remove the paperwork</h3>
      <p className="mt-3 text-[16px] leading-relaxed text-white/65">
        Signatures, seals, verification and claim documents are handled inside the ERP, so every record is complete
        and ready to print or submit.
      </p>
    </div>
    <div className="rail mt-10 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {SHOWCASE.map((f) => <ShowcaseCard key={f.title} {...f} />)}
    </div>
    <RailHint dark />
  </div>
)

/* ---------- section ---------- */

const Point = ({ children }) => (
  <li className="flex gap-2.5 text-[14.5px] leading-snug text-white/75">
    <Check size={16} className="mt-0.5 shrink-0 text-marigold-400" strokeWidth={2.5} aria-hidden="true" />
    {children}
  </li>
)

const Card = ({ icon: Icon, kicker, title, desc, points, children, className = '' }) => (
  <article className={`relative flex flex-col overflow-hidden rounded-[26px] bg-white/[0.04] p-5 ring-1 ring-white/10 sm:rounded-[30px] sm:p-8 ${className}`}>
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-marigold-500 text-pine-950">
        <Icon size={20} aria-hidden="true" />
      </span>
      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-marigold-300">{kicker}</span>
    </div>
    <h3 className="mt-5 text-[clamp(22px,2.2vw,28px)] font-bold text-white">{title}</h3>
    <p className="mt-2.5 max-w-[56ch] text-[15.5px] leading-relaxed text-white/65">{desc}</p>
    {points && <ul className="mt-5 grid gap-2 sm:grid-cols-2 sm:gap-2.5">{points.map((p) => <Point key={p}>{p}</Point>)}</ul>}
    <div className="mt-6 flex-1 sm:mt-7">{children}</div>
  </article>
)

const SmartFeatures = () => {
  return (
    <section id="smart" className="relative overflow-hidden bg-pine-950 py-16 text-white sm:py-24 lg:py-28">
      <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_60%)]" aria-hidden="true" />
      <div className="glow-marigold pointer-events-none absolute -right-40 top-40 h-[560px] w-[560px] opacity-60" aria-hidden="true" />
      <div className="glow-pine pointer-events-none absolute -left-40 bottom-0 h-[560px] w-[560px]" aria-hidden="true" />

      <div className="container-site relative">
        <SectionHeader
          dark
          align="center"
          eyebrow="Smart features"
          title="Smart features that give your team hours back"
          lead="Doctors speak and the prescription fills itself. Every record gets a one-glance AI summary. And the paperwork, from consent signatures to insurance claims, takes care of itself."
        />

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-2">
          <Card
            icon={Mic}
            kicker="Voice-enabled prescriptions"
            title="Speak it. The prescription fills itself."
            desc="Dictate in plain clinical language. Aushrit transcribes it and fills medicine, dose, frequency, duration and orders into the right fields for the doctor to check and sign."
            points={['Medical speech recognition', 'Auto-fills Rx fields and orders', 'Hands-free during consultation', 'Doctor reviews before signing']}
          >
            <Live>{(running) => <VoiceDemo running={running} />}</Live>
          </Card>

          <Card
            icon={Wand2}
            kicker="AI patient summary"
            title="The whole history, in four lines."
            desc="AI reads visits, vitals, labs, prescriptions and allergies across the record and writes a short, structured summary, so the doctor walks in already briefed."
            points={['Built from the full longitudinal record', 'Flags allergies and critical values', 'Summaries for OPD, IPD and discharge', 'Doctor stays in control of every word']}
          >
            <Live>{(running) => <SummaryDemo running={running} />}</Live>
          </Card>
        </div>

        <SmartShowcase />

        {/* Video-based guide: hidden for now.
        <Card
          className="mt-4 sm:mt-6"
          icon={PlayCircle}
          kicker="Video-based guide"
          title="A video guide for every part of the ERP."
          desc="Short, chapter-by-chapter videos walk each role through their screens, from registration to reports. New staff learn on the job, at their own pace."
          points={['Chapters for every module and role', 'Step captions you can follow along', 'Open the guide from any screen', 'Ideal for onboarding and shift changes']}
        >
          <Live>{(running) => <VideoGuide running={running} />}</Live>
        </Card>
        */}

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-[14px] text-white/55">
          <ShieldCheck size={16} className="text-marigold-400" aria-hidden="true" />
          AI drafts are shown to the clinician to review, edit and sign.
        </p>
      </div>
    </section>
  )
}

export default SmartFeatures
