import React, { useEffect, useId, useState } from 'react'
import { Phone, CheckCircle2, AlertCircle, Loader2, X, CalendarCheck, Clock, Stethoscope, ShieldCheck, Play } from 'lucide-react'
import { API_URL, SITE, DEMO } from '../config/site'

const EMPTY = { name: '', hospitalName: '', city: '', pincode: '', whatsapp: '' }

const validate = (d) => {
  if (!d.hospitalName || !d.name || !d.whatsapp || !d.city || !d.pincode) return 'Fill in all five fields to request a demo.'
  if (!/^[+]?[0-9]{10,15}$/.test(d.whatsapp.replace(/\s/g, ''))) return 'Enter a WhatsApp number with 10 to 15 digits.'
  if (!/^[1-9][0-9]{5}$/.test(d.pincode)) return 'Enter a 6-digit Indian pincode, for example 226001.'
  return null
}

const Field = ({ id, label, className = '', ...props }) => (
  <div className={className}>
    <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-medium text-white/75">{label}</label>
    <input id={id} className="field" {...props} />
  </div>
)

const DemoForm = ({ onResult }) => {
  const uid = useId()
  const [data, setData] = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)

  const update = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const problem = validate(data)
    if (problem) return onResult({ type: 'error', message: problem })

    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/email/send-demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) {
        onResult({ type: 'success', message: `Request received, ${data.name}. We'll message you on WhatsApp (${data.whatsapp}) to fix a demo time.` })
        setData(EMPTY)
      } else {
        onResult({ type: 'error', message: json.message || 'The request did not go through. Try again, or call us directly.' })
      }
    } catch (err) {
      console.error('Demo request failed:', err)
      onResult({ type: 'error', message: `Couldn't reach the server. Check your connection, or call ${SITE.phone}.` })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-h`} label="Hospital or clinic name" name="hospitalName" value={data.hospitalName} onChange={update} autoComplete="organization" className="sm:col-span-2" required />
        <Field id={`${uid}-n`} label="Your name" name="name" value={data.name} onChange={update} autoComplete="name" required />
        <Field id={`${uid}-w`} label="WhatsApp number" name="whatsapp" type="tel" inputMode="tel" value={data.whatsapp} onChange={update} autoComplete="tel" placeholder="+91" required />
        <Field id={`${uid}-c`} label="City" name="city" value={data.city} onChange={update} autoComplete="address-level2" required />
        <Field id={`${uid}-p`} label="Pincode" name="pincode" inputMode="numeric" maxLength={6} value={data.pincode} onChange={update} autoComplete="postal-code" required />
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
          {submitting && <Loader2 size={17} className="animate-spin" aria-hidden="true" />}
          {submitting ? 'Sending request…' : 'Request free demo'}
        </button>
        <a href={SITE.phoneHref} className="btn-ghost-dark w-full sm:w-auto">
          <Phone size={16} aria-hidden="true" /> Call {SITE.phone}
        </a>
      </div>
    </form>
  )
}

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onClose, 7000)
    return () => clearTimeout(t)
  }, [toast, onClose])

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-4 top-20 z-[60] flex justify-end sm:left-auto sm:right-6">
      {toast && (
        <div
          role={toast.type === 'error' ? 'alert' : 'status'}
          className={`pointer-events-auto flex max-w-md animate-toast-in items-start gap-3 rounded-2xl px-4 py-3.5 text-[14.5px] shadow-2xl ${
            toast.type === 'success' ? 'bg-pine-700 text-white' : 'bg-coral-600 text-white'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={20} className="mt-0.5 shrink-0" /> : <AlertCircle size={20} className="mt-0.5 shrink-0" />}
          <span className="flex-1">{toast.message}</span>
          <button type="button" onClick={onClose} className="rounded-full p-0.5 hover:bg-white/15" aria-label="Dismiss message">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

const Cta = ({ id = 'contact', isMiddleCTA = false }) => {
  const [toast, setToast] = useState(null)
  const close = React.useCallback(() => setToast(null), [])

  if (isMiddleCTA) {
    return (
      <>
        <Toast toast={toast} onClose={close} />
        <section id={id} className="bg-paper pb-16 sm:pb-24 lg:pb-28">
          <div className="container-site">
            <div className="relative overflow-hidden rounded-[32px] bg-pine-950 text-white">
              <div className="glow-marigold pointer-events-none absolute -left-32 -top-40 h-[460px] w-[460px]" aria-hidden="true" />
              <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_0%_0%,black,transparent_60%)]" aria-hidden="true" />
              <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
                <div>
                  <p className="eyebrow-dark mb-5">
                    <CalendarCheck size={14} aria-hidden="true" /> Free demo
                  </p>
                  <h2 className="font-display text-[clamp(26px,3vw,38px)] font-bold">See Aushrit running on your hospital's workflow</h2>
                  <p className="mt-4 text-[16.5px] leading-relaxed text-white/70">
                    A 30-minute walkthrough with our product team covering the departments you run, ABHA and ABDM
                    flows, NABH and Ayushman Bharat / PM-JAY documentation, insurance claims, device integrations and backup options.
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {[
                      { icon: Clock, t: '30 minutes' },
                      { icon: Stethoscope, t: 'Tailored to your departments' },
                      { icon: ShieldCheck, t: 'No payment details needed' },
                    ].map(({ icon: Icon, t }) => (
                      <li key={t} className="flex items-center gap-1.5 rounded-full bg-white/[0.07] px-3 py-1.5 text-[13px] text-white/80 ring-1 ring-white/10">
                        <Icon size={14} className="text-marigold-400" aria-hidden="true" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-white/10 pt-8 sm:rounded-[24px] sm:border-0 sm:bg-white/[0.05] sm:p-8 sm:ring-1 sm:ring-white/10 sm:backdrop-blur">
                  <DemoForm onResult={setToast} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Toast toast={toast} onClose={close} />
      <section id={id} className="relative overflow-hidden bg-pine-950 py-24 text-white sm:py-28">
        <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_30%,black,transparent_65%)]" />
        <div className="glow-marigold pointer-events-none absolute -bottom-60 -right-40 h-[560px] w-[560px] opacity-70" aria-hidden="true" />
        <div className="container-site relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow-dark mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-marigold-500" aria-hidden="true" /> Get started
            </p>
            <h2 className="font-display text-[clamp(32px,4.4vw,54px)] font-extrabold leading-[1.05]">
              Ready to move your hospital <span className="text-marigold-400">off paper?</span>
            </h2>
            <p className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-white/70">
              Tell us a little about your hospital and we'll set up a demo around the departments you run.
              Cloud or on-premise, whichever suits you.
            </p>
            <ol className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
              {['30-minute walkthrough with our product team', 'Tailored to your departments and bed count', 'Cloud, on-premise or hybrid deployment'].map((t, i) => (
                <li key={t} className="flex items-center gap-4 text-[15.5px] text-white/85">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.07] font-display text-[14px] font-bold text-marigold-400 ring-1 ring-white/15">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
            <a
              href={DEMO.url}
              target="_blank"
              rel="noopener"
              className="group mt-9 inline-flex items-center gap-2 text-[15px] font-semibold text-marigold-300 hover:text-marigold-400"
            >
              <Play size={15} fill="currentColor" aria-hidden="true" /> Prefer to explore first? Try the live demo
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="rounded-[28px] bg-white/[0.05] p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)] ring-1 ring-white/10 backdrop-blur sm:p-9">
            <h3 className="mb-6 text-[20px] font-bold">Request your free demo</h3>
            <DemoForm onResult={setToast} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Cta
