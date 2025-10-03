'use client';

import BookingTabs from '@/components/BookingTabs';
import { BUSINESS, TOURS } from '@/lib/config';

function WhatsAppButton({ compact=false }) {
  const msg = encodeURIComponent(`Hi ${BUSINESS.NAME}! I'd like to book.`);
  return (
    <a
      href={`https://wa.me/${BUSINESS.WHATSAPP_E164}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      className={`${compact ? "px-3 py-1.5 text-sm" : "px-5 py-2"} rounded-2xl bg-neutral-900 text-white font-semibold`}
    >
      WhatsApp
    </a>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-sky-600 text-white grid place-items-center font-bold">IB</div>
          <div className="font-semibold">{BUSINESS.NAME}</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#book" className="hover:text-sky-700">Book</a>
          <a href="#tours" className="hover:text-sky-700">Tours</a>
          <a href="#contact" className="hover:text-sky-700">Contact</a>
          <WhatsAppButton compact />
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10">
        <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format&fit=crop" alt="Coastal road" className="h-[56vh] w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="mx-auto max-w-6xl px-4 h-[56vh] grid content-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-sm">Reliable Taxi & Private Tours in {BUSINESS.BASE_CITY}</h1>
          <p className="mt-3 text-lg opacity-95">Book on‑site, pay with PayPal, and chat on WhatsApp — fast, safe, and friendly.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#book" className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow">Book a Ride</a>
            <a href="#tours" className="px-5 py-3 rounded-2xl bg-white/90 hover:bg-white text-neutral-900 font-semibold shadow">Explore Tours</a>
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </section>
  );
}

function ToursGrid() {
  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">Popular Tours</h2>
        <a href="#book" className="text-sm font-medium text-sky-700 hover:text-sky-800">Book a tour →</a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {TOURS.map(t => (
          <article key={t.id} className="rounded-2xl overflow-hidden border bg-white hover:shadow-md transition">
            <img src={t.img} alt={t.title} className="h-40 w-full object-cover" />
            <div className="p-4 grid gap-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{t.title}</h3>
                <div className="text-sm">⭐ {t.rating}</div>
              </div>
              <p className="text-sm text-neutral-600">{t.blurb}</p>
              <ul className="text-xs text-neutral-600 list-disc ml-5">
                {t.includes.map(i => <li key={i}>{i}</li>)}
              </ul>
              <div className="flex items-center justify-between pt-2">
                <div className="font-semibold">${t.price.toFixed(2)}/person</div>
                <a href="#book" className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm font-semibold">Book</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ContactCard() {
  const message = encodeURIComponent(`Hi ${BUSINESS.NAME}, I have a question about booking.`);
  return (
    <div id="contact" className="bg-white rounded-2xl shadow-sm border p-6 grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold">Contact Us</h3>
        <p className="text-sm text-neutral-600 mt-1">
          We’re based in {BUSINESS.BASE_CITY}. Message us for custom itineraries, special events, or group rates.
        </p>
        <div className="mt-4 grid gap-2 text-sm">
          <a href={`mailto:${BUSINESS.CONTACT_EMAIL}?subject=${encodeURIComponent("Booking inquiry")}`} className="underline">
            {BUSINESS.CONTACT_EMAIL}
          </a>
          <a href={`https://wa.me/${BUSINESS.WHATSAPP_E164}?text=${message}`} target="_blank" rel="noreferrer" className="underline">
            WhatsApp chat
          </a>
        </div>
      </div>
      <div className="grid gap-2 text-sm">
        <div className="font-medium">Hours</div>
        <div>Mon–Sun · 6:00 AM – 11:00 PM</div>
        <div className="font-medium mt-3">Service Area</div>
        <div>{BUSINESS.BASE_CITY} & surrounding islands</div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <main className="mx-auto max-w-6xl px-4">
        <section id="book" className="-mt-12 mb-16">
          <BookingTabs />
        </section>
        <section id="tours" className="mb-20">
          <ToursGrid />
        </section>
        <section className="mb-24">
          <ContactCard />
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-2 gap-4 items-center">
          <div className="text-sm text-neutral-600">© {new Date().getFullYear()} {BUSINESS.NAME}. All rights reserved.</div>
          <div className="flex gap-3 md:justify-end">
            <WhatsAppButton compact />
            <a className="px-3 py-1.5 rounded-2xl border bg-white text-sm" href={`mailto:${BUSINESS.CONTACT_EMAIL}?subject=${encodeURIComponent("General inquiry")}`}>Email us</a>
          </div>
        </div>
      </footer>
    </>
  );
}
