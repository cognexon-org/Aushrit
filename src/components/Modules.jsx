import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarClock, BedDouble, Stethoscope, HeartPulse, Pill, FlaskConical, ScanLine, Scissors, Receipt,
  Package, Fingerprint, IdCard, Mic, Landmark, Settings2, Plug, CloudUpload, BarChart3, Check,
} from 'lucide-react'
import SectionHeader from './SectionHeader'

export const MODULES = [
  {
    icon: CalendarClock, title: 'OPD and appointments', fullTitle: 'OPD and appointment management',
    desc: 'Manage walk-in patients, scheduled appointments, doctor availability, consultation tokens, follow-ups, patient history and connected OPD billing from one dashboard.',
    includes: ['OPD patient registration', 'Appointment booking and rescheduling', 'Doctor schedules and conflict checks', 'Token and queue management', 'Vitals and consultation records', 'Follow-up tracking', 'OPD billing and receipts'],
  },
  {
    icon: BedDouble, title: 'IPD and beds', fullTitle: 'IPD, ward and bed management',
    desc: 'Run the complete inpatient journey from admission and bed allocation to medication, transfers, clearance, discharge and a digital patient file.',
    includes: ['IPD admission', 'Ward, room and bed allocation', 'Bed transfer and reservation', 'Nursing and doctor assessments', 'Vitals, EWS and medication charts', 'Running bill and clearances', 'Discharge summary and patient file'],
  },
  {
    icon: Stethoscope, title: 'Doctor portal', fullTitle: 'Doctor portal',
    desc: 'Give doctors a unified clinical workspace for appointments, longitudinal records, prescriptions, investigations, IPD rounds and procedure requests.',
    includes: ["Today's appointments and schedules", 'Longitudinal patient history', 'Digital prescriptions', 'Diagnosis and ICD-11 support', 'Lab and radiology orders', 'IPD rounds and progress notes', 'OT and procedure requests'],
  },
  {
    icon: HeartPulse, title: 'Nursing', fullTitle: 'Nursing and ward care',
    desc: 'Support daily ward care with assigned patient lists, assessments, vitals, medication administration, nursing notes and structured shift handovers.',
    includes: ['Assigned patient list', 'Nursing admission assessment', 'Vitals and EWS tracking', 'Medication administration records', 'Nursing notes and care records', 'Shift handover', 'Lab sample and OT coordination'],
  },
  {
    icon: Pill, title: 'Pharmacy', fullTitle: 'Pharmacy management',
    desc: 'Connect prescriptions directly with dispensing, POS billing, inventory, purchasing, suppliers, batch control, returns and IPD pharmacy clearance.',
    includes: ['Medicine and NLEM master', 'Prescription queue and dispensing', 'POS and IPD pharmacy billing', 'Batch and expiry tracking', 'Low-stock and expiry alerts', 'Suppliers and purchase orders', 'Returns, ledgers and clearance'],
  },
  {
    icon: FlaskConical, title: 'Pathology and lab', fullTitle: 'Pathology and laboratory',
    desc: 'Manage test orders, accessioning, sample collection, analyser workflows, results, verification, critical alerts, external referrals and report delivery.',
    includes: ['Lab test and category masters', 'Accessioning and sample collection', 'Specimen and worklist queues', 'Result entry and verification', 'Critical result acknowledgement', 'PDF report generation', 'External lab referral and handover'],
  },
  {
    icon: ScanLine, title: 'Radiology', fullTitle: 'Radiology and imaging',
    desc: 'Schedule and track X-ray, CT, MRI, ultrasound and other imaging with technician assignment, worklists, reporting and billing.',
    includes: ['Imaging test and category masters', 'Radiology orders and scheduling', 'Technician assignment', 'Modality worklists', 'Examination status tracking', 'Report verification and release', 'Imaging billing and history'],
  },
  {
    icon: Scissors, title: 'Operation theatre', fullTitle: 'Operation theatre management',
    desc: 'Manage OT requests, scheduling, rooms, surgical teams, safety checks, anaesthesia, operative notes, recovery, specimens, inventory and billing.',
    includes: ['OT requests and scheduling', 'Room and surgical team allocation', 'Pre-anaesthesia assessment', 'OT readiness and safety checklists', 'Anaesthesia and operative records', 'Recovery and specimen tracking', 'OT packet, reports and billing'],
  },
  {
    icon: Receipt, title: 'Billing and finance', fullTitle: 'Billing, finance and insurance',
    desc: 'Centralise OPD, IPD, pharmacy, lab, radiology, procedure and OT billing with payments, advances, refunds, expenses, insurance, claims and MIS.',
    includes: ['Unified invoices and payment collection', 'IPD running bills and patient ledgers', 'Advances, refunds and discounts', 'Income and expense management', 'Payers, rate cards and pre-authorisation', 'Claims tracking and settlement', 'Financial dashboards and exports'],
  },
  {
    icon: Package, title: 'Store and procurement', fullTitle: 'Store, procurement and assets',
    desc: 'Control consumables, departmental stock, purchase workflows, vendors, goods receipt, transfers, stock counts, recalls and assets.',
    includes: ['Store items, categories and locations', 'Department requisitions and issues', 'Purchase requisitions and RFQs', 'Vendor quotation comparison', 'Purchase orders and GRN', 'Stock transfers, counts and recalls', 'Asset register and maintenance logs'],
  },
  {
    icon: Fingerprint, title: 'HR and biometrics', fullTitle: 'HR, biometric attendance and payroll',
    desc: 'Manage employees, shifts, attendance, biometric devices, leave, payroll, commissions, payslips and staff self-service in one place.',
    includes: ['Employee and staff profiles', 'Biometric device integration', 'Attendance and reconciliation', 'Shift and availability management', 'Leave applications and balances', 'Payroll and salary processing', 'Payslips and employee self-service'],
  },
  {
    icon: IdCard, title: 'ABDM and ABHA', fullTitle: 'ABDM and ABHA interoperability',
    desc: 'Support ABDM patient identity, care-context linking, consent-driven health information exchange and interoperable digital health records.',
    includes: ['ABHA creation, discovery and linking', 'ABHA profile, card and QR', 'Facility Scan & Share', 'HIP care-context linking', 'FHIR health-record packaging', 'HIU consent and data-request workflows', 'Disclosure, consent and transfer tracking'],
  },
  {
    icon: Mic, title: 'AI and voice', fullTitle: 'AI clinical assistant and voice-to-text',
    desc: 'Help clinicians document faster with real-time dictation, structured transcription, AI summaries, clinical section formatting and order extraction.',
    includes: ['Voice-filled prescription fields', 'Real-time voice dictation', 'Medical speech-to-text', 'Structured clinical note formatting', 'Prescription and patient summaries', 'Clinical section parsing', 'Order extraction from dictated notes', 'Specialty template support'],
  },
  {
    icon: Landmark, title: 'NABH and PM-JAY', fullTitle: 'NABH documentation and Ayushman Bharat / PM-JAY',
    desc: 'Standardise NABH-aligned documentation and run Ayushman Bharat PM-JAY and state-scheme cases, from beneficiary registration and package billing to pre-authorisation and reports.',
    includes: ['NABH-aligned clinical templates', 'Doctor and nursing assessments', 'OT and discharge checklists', 'PM-JAY beneficiary registration', 'Package-wise scheme billing', 'Pre-authorisation documents', 'NABH and scheme-wise reports'],
  },
  {
    icon: Settings2, title: 'Admin and access', fullTitle: 'Hospital administration and access control',
    desc: 'Control hospital setup, departments, doctors, staff, permissions, charges, masters, approvals, audit logs, imports and configuration.',
    includes: ['Department and HOD setup', 'Doctor and staff management', 'Role and action-level permissions', 'Hospital, ward, room and bed setup', 'Clinical and charge masters', 'Bulk data import with rollback', 'Approvals, audit logs and support tickets'],
  },
  {
    icon: Plug, title: 'Device integrations', fullTitle: 'Lab, biometric and system integrations',
    desc: 'Connect hospital devices and external systems through configurable interfaces, so data arrives automatically instead of being typed in.',
    includes: ['Lab analyser and machine integration', 'Biometric attendance devices', 'Radiology and PACS integration support', 'LIS and third-party API integration', 'SMS and notification services', 'Calendar and external system sync', 'Custom integration workflows'],
  },
  {
    icon: CloudUpload, title: 'Backup and security', fullTitle: 'Cloud, on-premise, backup and security',
    desc: 'Deploy in cloud, on-premise or hybrid environments with scheduled backups, restore support, encryption and audit trails.',
    includes: ['Cloud, on-premise and hybrid deployment', 'Configurable backup retention', 'Scheduled cloud backups', 'Backup health and restore support', 'Role-based security and audit logs', 'Encrypted ABDM and clinical records', 'Deployment and continuity tooling'],
  },
  {
    icon: BarChart3, title: 'Reports and MIS', fullTitle: 'Reports, analytics and MIS',
    desc: 'See real-time operational, clinical, inventory, workforce and financial numbers with configurable dashboards, scheduled reports and exports.',
    includes: ['Executive and department dashboards', 'Revenue and billing reports', 'OPD and IPD analytics', 'Pharmacy and inventory reports', 'Lab and radiology reports', 'HR, attendance and payroll reports', 'Scheduled exports and historical snapshots'],
  },
]

const Modules = () => {
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])
  const mod = MODULES[active]
  const Icon = mod.icon

  const select = (i) => {
    setActive(i)
    tabRefs.current[i]?.focus()
    tabRefs.current[i]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  const onKeyDown = (e) => {
    const last = MODULES.length - 1
    if (['ArrowDown', 'ArrowRight'].includes(e.key)) { e.preventDefault(); select(active === last ? 0 : active + 1) }
    if (['ArrowUp', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); select(active === 0 ? last : active - 1) }
    if (e.key === 'Home') { e.preventDefault(); select(0) }
    if (e.key === 'End') { e.preventDefault(); select(last) }
  }

  return (
    <section id="modules" className="bg-paper py-16 sm:py-24 lg:py-28">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Modules"
            title="Eighteen modules. One hospital record."
            lead="Start with the departments you need today and switch on the rest as you grow. Every module reads and writes the same patient record."
          />
          <p className="hidden shrink-0 text-[14px] text-ink/60 lg:block lg:pb-2">Use the arrow keys to move between modules.</p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-[300px_1fr]">
          <div
            role="tablist"
            aria-label="Aushrit modules"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:max-h-[640px] lg:flex-col lg:gap-0.5 lg:overflow-y-auto lg:overflow-x-visible lg:rounded-[26px] lg:bg-white lg:p-2 lg:ring-1 lg:ring-pine-100"
          >
            {MODULES.map((m, i) => {
              const MIcon = m.icon
              const on = i === active
              return (
                <button
                  key={m.title}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`mod-tab-${i}`}
                  aria-selected={on}
                  aria-controls="mod-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`group flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-left text-[14.5px] font-semibold transition-all lg:rounded-2xl lg:py-2.5 ${
                    on
                      ? 'bg-pine-50 text-pine-950 ring-1 ring-pine-200'
                      : 'bg-white text-ink/70 ring-1 ring-pine-100 hover:text-pine-950 lg:bg-transparent lg:ring-0 lg:hover:bg-paper'
                  }`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl transition-colors ${on ? 'bg-pine-900 text-marigold-400' : 'bg-paper text-pine-500 ring-1 ring-pine-100'}`}>
                    <MIcon size={16} aria-hidden="true" />
                  </span>
                  <span className="whitespace-nowrap">{m.title}</span>
                  {on && <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-marigold-500 lg:block" aria-hidden="true" />}
                </button>
              )
            })}
          </div>

          <div
            id="mod-panel"
            role="tabpanel"
            aria-labelledby={`mod-tab-${active}`}
            className="flex flex-col overflow-hidden rounded-[28px] ring-1 ring-pine-100"
          >
            <div key={active} className="flex h-full animate-fade-swap flex-col">
              <div className="relative overflow-hidden bg-pine-950 p-6 text-white sm:p-10">
                <div className="glow-marigold pointer-events-none absolute -right-24 -top-24 h-72 w-72" aria-hidden="true" />
                <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_70%)]" aria-hidden="true" />
                <div className="relative flex items-start gap-4 sm:gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-marigold-500 text-pine-950 sm:h-16 sm:w-16">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-marigold-300">
                      Module {String(active + 1).padStart(2, '0')} / {MODULES.length}
                    </p>
                    <h3 className="mt-1.5 text-[clamp(24px,2.6vw,32px)] font-bold text-white">{mod.fullTitle}</h3>
                  </div>
                </div>
                <p className="relative mt-6 max-w-[62ch] text-[16px] leading-relaxed text-white/70">{mod.desc}</p>
              </div>

              <div className="flex flex-1 flex-col bg-white p-6 sm:p-10">
                <h4 className="font-body text-[12px] font-bold uppercase tracking-[0.12em] text-pine-600">What's included</h4>
                <ul className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-2 sm:gap-3">
                  {mod.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 rounded-xl bg-paper px-3 py-2.5 text-[14px] text-ink/85 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-[14.5px]">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pine-100 text-pine-700">
                        <Check size={14} strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:pt-10 sm:items-center sm:justify-between">
                  <p className="text-[14px] text-ink/60">Shares the same record as every other module.</p>
                  <Link to="/#contact" className="btn-dark w-full sm:w-auto">Book a demo of this module</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Modules
