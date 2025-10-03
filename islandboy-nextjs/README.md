# Island Boy Transportation & Tours — Next.js

A ready-to-deploy Next.js (App Router) site for bookings + PayPal Smart Buttons + WhatsApp.

## Quick Start
```bash
npm i
cp .env.example .env.local
# paste your PayPal Client ID
# NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
# NEXT_PUBLIC_PAYPAL_ENV=sandbox
npm run dev
```

## Deploy to Vercel
- Import this repo into Vercel
- Add env vars in Project Settings:
  - `NEXT_PUBLIC_PAYPAL_CLIENT_ID` (Sandbox for testing, Live later)
  - `NEXT_PUBLIC_PAYPAL_ENV` (`sandbox` or `live`)
- Deploy. Connect your custom domain.

## Edit Business Info
- `lib/config.js` — name, WhatsApp, email, base city, pricing, tours

## Files
- `app/page.js` — homepage with Booking Tabs
- `components/PayPalCheckout.jsx` — loads PayPal SDK and renders Smart Buttons
- `components/BookingTabs.jsx` — Taxi, Tours, Private forms
- `styles/globals.css` — Tailwind
- `lib/config.js` — business details and pricing
