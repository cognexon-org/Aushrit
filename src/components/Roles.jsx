import React from 'react'
import { Building2, Stethoscope, Syringe, ClipboardList, Pill, Scissors, Microscope, Package } from 'lucide-react'
import SectionHeader from './SectionHeader'

const ROLES = [
  { icon: Building2, name: 'Hospital admin', desc: 'Full oversight with financial, staff and operational control.', tags: ['12 modules', 'Full access'] },
  { icon: Stethoscope, name: 'Doctor', desc: 'Appointments, prescriptions, OT requests and IPD patient management.', tags: ['8 modules', 'OPD + IPD'] },
  { icon: Syringe, name: 'Nurse', desc: 'Ward care, nursing notes, medication tracking and shift handovers.', tags: ['7 modules', 'Ward care'] },
  { icon: ClipboardList, name: 'Reception', desc: 'Patient registration, appointments, IPD admissions and billing.', tags: ['11 modules', 'Front desk'] },
  { icon: Pill, name: 'Pharmacist', desc: 'Inventory, POS, prescriptions, suppliers, billing and expiry control.', tags: ['13 modules', 'Pharmacy'] },
  { icon: Scissors, name: 'OT staff', desc: 'Theatre scheduling, room management and surgical records.', tags: ['9 modules', 'Surgeries'] },
  { icon: Microscope, name: 'Lab technician', desc: 'Samples, analyser results, verification, reports and critical alerts.', tags: ['7 modules', 'Pathology'] },
  { icon: Package, name: 'Store and HR', desc: 'Procurement, inventory, assets, biometric attendance, shifts and payroll.', tags: ['10 modules', 'Operations'] },
]

const Roles = () => (
  <section id="roles" className="bg-white py-16 sm:py-24 lg:py-28">
    <div className="container-site">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeader
          eyebrow="Roles"
          title="A workspace for everyone in the hospital"
          lead="Each person signs in to the screens and permissions their job needs, from the administrator running the hospital to the nurse charting vitals at 3 a.m."
        />
        <p className="hidden shrink-0 rounded-2xl bg-paper px-5 py-4 text-[14px] text-ink/70 ring-1 ring-pine-100 sm:block">
          <span className="block font-display text-[30px] font-extrabold leading-none text-pine-950">{ROLES.length}</span>
          role-based workspaces
        </p>
      </div>

      <ul className="reveal mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4">
        {ROLES.map(({ icon: Icon, name, desc, tags }) => (
          <li
            key={name}
            className="group flex flex-col rounded-[20px] bg-paper p-4 ring-1 sm:rounded-[24px] sm:p-6 ring-pine-100 transition-colors duration-300 hover:bg-pine-900"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-pine-700 sm:h-12 sm:w-12 sm:rounded-2xl ring-1 ring-pine-100 transition-colors duration-300 group-hover:bg-marigold-500 group-hover:text-pine-950 group-hover:ring-transparent">
              <Icon size={22} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[16px] font-bold sm:mt-6 sm:text-[18px] text-pine-950 transition-colors duration-300 group-hover:text-white">{name}</h3>
            <p className="mt-1.5 flex-1 text-[13px] leading-relaxed sm:text-[14.5px] text-ink/70 transition-colors duration-300 group-hover:text-white/70">{desc}</p>
            <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5">
              {tags.map((t) => (
                <span key={t} className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium sm:px-2.5 sm:text-[12px] text-pine-700 ring-1 ring-pine-100 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-pine-100 group-hover:ring-white/10">
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default Roles
