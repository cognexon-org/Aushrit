// Central place for brand, contact and team details.
// Edit here and the whole site updates.

export const SITE = {
  name: 'Aushrit',
  nameDevanagari: 'आश्रित',
  tagline: 'Hospital ERP',
  city: 'Kanpur, India',
  phone: '+91 70072 13006',
  phoneHref: 'tel:+917007213006',
  // WhatsApp enquiries: country code + number, digits only.
  whatsapp: '917007213006',
  whatsappMessage: "Hi Aushrit, I'd like to know more about your Hospital ERP.",
  email: 'aushriterp@gmail.com',
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
  { label: 'AI & Voice', to: '/#smart' },
  { label: 'Modules', to: '/#modules' },
  { label: 'Features', to: '/#features' },
  { label: 'Roles', to: '/#roles' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
]
