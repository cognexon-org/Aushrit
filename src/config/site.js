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

// WhatsApp chat link with a pre-typed message.
export const whatsappLink = (message) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`

// Live demo is shared on request: visitors message us on WhatsApp and we reply with the demo link.
// The prototype itself (public/demo, built with npm run demo:build) is not linked anywhere on the site.
const demoMessage = (workspace) =>
  workspace
    ? `Hello Aushrit team, I would like to request a live demo of the Aushrit Hospital ERP, specifically the ${workspace} workspace. Kindly share the demo link. Thank you.`
    : 'Hello Aushrit team, I would like to request a live demo of the Aushrit Hospital ERP. Kindly share the demo link. Thank you.'

export const DEMO = {
  request: whatsappLink(demoMessage()),
  requestFor: (workspace) => whatsappLink(demoMessage(workspace)),
  roles: [
    { role: 'admin', label: 'Hospital admin' },
    { role: 'staff', label: 'Front desk' },
    { role: 'doctor', label: 'Doctor' },
    { role: 'nurse', label: 'Nurse' },
    { role: 'pharmacy', label: 'Pharmacy' },
    { role: 'pathology_staff', label: 'Pathology lab' },
    { role: 'radiology_staff', label: 'Radiology' },
    { role: 'ot_staff', label: 'Operation theatre' },
    { role: 'accountant', label: 'Finance' },
    { role: 'hr', label: 'HR' },
    { role: 'store', label: 'Central store' },
    { role: 'patient', label: 'Patient portal' },
  ],
}
