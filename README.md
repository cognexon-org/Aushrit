# Aushrit — Hospital ERP website

Marketing site for **Aushrit** (आश्रित), an AI-enabled, ABDM-ready hospital ERP.
Built with React 18, Vite 5, Tailwind CSS 3, React Router and lucide-react icons.

## Run locally

```bash
npm install
cp .env.example .env      # set VITE_API_URL to your backend
npm run dev               # http://localhost:5173
```

Production build: `npm run build` (output in `dist/`), preview with `npm run preview`, lint with `npm run lint`.

## Where to edit

| What | File |
| --- | --- |
| Brand name, phone, email, city | `src/config/site.js` → `SITE` |
| Founders and co-founders (bio, LinkedIn, photo) | `src/config/site.js` → `TEAM` |
| Navigation links | `src/config/site.js` → `NAV_LINKS` |
| Colours and fonts | `tailwind.config.js` |
| Modules list | `src/components/Modules.jsx` |
| Plans and prices | `src/components/PricingPlans.jsx` |
| FAQ | `src/pages/Pricing.jsx` |
| Logo and favicon | `src/components/Logo.jsx`, `public/favicon.svg`, `public/logo.svg` |

## Demo request form

Both forms `POST` JSON to `${VITE_API_URL}/email/send-demo-request` with:

```json
{ "hospitalName": "", "name": "", "whatsapp": "", "city": "", "pincode": "" }
```

The backend should respond `{ "success": true }` or `{ "success": false, "message": "..." }`.

## Deploy

`vercel.json` includes the SPA rewrite so `/about` and `/pricing` work on refresh.
Set `VITE_API_URL` in the Vercel project's environment variables.
"# Aushrit" 
