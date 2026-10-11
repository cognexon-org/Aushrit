// Central place for brand, contact and team details.
// Edit here and the whole site updates.

export const SITE = {
  name: 'Aushrit',
  nameDevanagari: 'आश्रित',
  tagline: 'Hospital ERP',
  city: 'Kanpur, India',
  phone: '+91 95111 09240',
  phoneHref: 'tel:+919511109240',
  // WhatsApp enquiries: country code + number, digits only.
  whatsapp: '919511109240',
  whatsappMessage: "Hi Aushrit, I'd like to know more about your Hospital ERP.",
  email: 'admin@cognexon.in',
  year: new Date().getFullYear(),
}

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Optional per person: bio (one or two lines), linkedin (full URL), photo (path in /public).
export const TEAM = [
  { name: 'Sparsh Gupta', role: 'Founder', bio: '', linkedin: '', photo: '' },
  { name: 'Pranshu Pandey', role: 'Founder', bio: '', linkedin: '', photo: '' },
  { name: 'Shivam Singh Thakur', role: 'Co-founder', bio: '', linkedin: '', photo: '' },
  { name: 'Gopal Raj Singh', role: 'Co-founder', bio: '', linkedin: '', photo: '' },
]

// Primary navigation. Links with a hash scroll to a section on the home page.
export const NAV_LINKS = [
  { label: 'How it works', to: '/#how' },
  { label: 'Smart features', to: '/#smart' },
  { label: 'Modules', to: '/#modules' },
  { label: 'Features', to: '/#features' },
  { label: 'Roles', to: '/#roles' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
]

// Live demo: the real ERP prototype in backend-free demo mode, built into public/demo (npm run demo:build).
// Links are full page loads (plain <a>), not router links, because the demo is a separate app.
export const demoLink = (role, path) => `/demo${path}?role=${role}`

export const DEMO = {
  url: demoLink('admin', '/dashboard/admin'),
  patientPortal: { url: '/demo/patient/login', mobile: '9876501234', otp: '123456' },
  roles: [
    { role: 'admin', label: 'Hospital admin', path: '/dashboard/admin' },
    { role: 'staff', label: 'Front desk', path: '/dashboard/staff' },
    { role: 'doctor', label: 'Doctor', path: '/dashboard/doctor' },
    { role: 'nurse', label: 'Nurse', path: '/dashboard/nurse' },
    { role: 'pharmacy', label: 'Pharmacy', path: '/dashboard/pharmacy' },
    { role: 'pathology_staff', label: 'Pathology lab', path: '/dashboard/pathology' },
    { role: 'radiology_staff', label: 'Radiology', path: '/dashboard/radiology' },
    { role: 'ot_staff', label: 'Operation theatre', path: '/dashboard/ot' },
    { role: 'accountant', label: 'Finance', path: '/dashboard/finance' },
    { role: 'hr', label: 'HR', path: '/dashboard/hr' },
    { role: 'store', label: 'Central store', path: '/dashboard/store' },
  ],
}
