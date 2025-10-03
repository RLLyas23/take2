'use client';

import { useMemo, useState } from 'react';
import { BUSINESS, PRICING, TOURS } from '@/lib/config';
import PayPalCheckout from './PayPalCheckout';
import { Field, Card, Input, Select, Currency } from './UI';

export default function BookingTabs() {
  const [tab, setTab] = useState('taxi');
  return (
    <div className="grid gap-4">
      <div className="bg-white rounded-2xl shadow-sm border p-2 w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-3 gap-2 text-sm font-medium">
          {[
            { id: 'taxi', label: 'Taxi' },
            { id: 'tour', label: 'Tours' },
            { id: 'private', label: 'Private Transport' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl border transition ${
                tab === t.id ? 'bg-sky-600 text-white border-sky-600'
                              : 'bg-white hover:bg-neutral-50 border-neutral-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {tab === 'taxi' && <TaxiForm />}
      {tab === 'tour' && <TourForm />}
      {tab === 'private' && <PrivateForm />}
    </div>
  );
}

function TaxiForm() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [miles, setMiles] = useState('');
  const [minutes, setMinutes] = useState('');
  const [airport, setAirport] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const estimate = useMemo(() => {
    const base = PRICING.taxi.base;
    const dist = Number(miles || 0) * PRICING.taxi.perMile;
    const timeCost = Number(minutes || 0) * PRICING.taxi.perMinute;
    const sur = airport ? PRICING.taxi.airportSurcharge : 0;
    const total = Math.max(0, base + dist + timeCost + sur);
    return Number.isFinite(total) ? total : 0;
  }, [miles, minutes, airport]);

  const valid = pickup && dropoff && date && time && name && (phone || email);

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3">Book a Taxi</h3>
      <form className="grid gap-4" onSubmit={(e)=>e.preventDefault()}>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Pickup*">
            <Input value={pickup} onChange={e=>setPickup(e.target.value)} placeholder="Hotel, airport, address"/>
          </Field>
          <Field label="Drop‑off*">
            <Input value={dropoff} onChange={e=>setDropoff(e.target.value)} placeholder="Address or landmark"/>
          </Field>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <Field label="Date*"><Input type="date" value={date} onChange={e=>setDate(e.target.value)}/></Field>
          <Field label="Time*"><Input type="time" value={time} onChange={e=>setTime(e.target.value)}/></Field>
          <Field label="Miles (est.)"><Input type="number" min="0" step="0.1" value={miles} onChange={e=>setMiles(e.target.value)} placeholder="e.g. 12"/></Field>
          <Field label="Minutes (est.)"><Input type="number" min="0" step="1" value={minutes} onChange={e=>setMinutes(e.target.value)} placeholder="e.g. 25"/></Field>
        </div>
        <div className="flex items-center gap-2">
          <input id="airport" type="checkbox" checked={airport} onChange={e=>setAirport(e.target.checked)} />
          <label htmlFor="airport" className="text-sm">Airport pickup/drop‑off</label>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Name*"><Input value={name} onChange={e=>setName(e.target.value)}/></Field>
          <Field label="Phone"><Input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 242…"/></Field>
          <Field label="Email"><Input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></Field>
        </div>
        <PayPalCheckout amount={estimate} disabled={!valid} meta={{ type: "Taxi Ride", pickup, dropoff, date, time, name, phone, email }}/>
      </form>
      <div className="text-xs text-neutral-600 mt-2">* Estimated fare shown. Final price may vary due to traffic/route changes.</div>
    </Card>
  );
}

function TourForm() {
  const [tourId, setTourId] = useState(TOURS[0].id);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [party, setParty] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const tour = TOURS.find(t => t.id === tourId);
  const total = useMemo(() => tour.price * Number(party || 1), [tour, party]);
  const valid = date && time && name && email;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3">Book a Tour</h3>
      <form className="grid gap-4" onSubmit={(e)=>e.preventDefault()}>
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Tour*">
            <Select value={tourId} onChange={e=>setTourId(e.target.value)}>
              {TOURS.map(t => (<option key={t.id} value={t.id}>{t.title} — ${t.price.toFixed(2)}/person</option>))}
            </Select>
          </Field>
          <Field label="Date*"><Input type="date" value={date} onChange={e=>setDate(e.target.value)}/></Field>
          <Field label="Time*"><Input type="time" value={time} onChange={e=>setTime(e.target.value)}/></Field>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <Field label="Party Size"><Input type="number" min="1" max="20" value={party} onChange={e=>setParty(e.target.value)}/></Field>
          <Field label="Name*"><Input value={name} onChange={e=>setName(e.target.value)}/></Field>
          <Field label="Email*"><Input type="email" value={email} onChange={e=>setEmail(e.target.value)}/></Field>
        </div>
        <PayPalCheckout amount={total} disabled={!valid} meta={{ type: `Tour – ${tour.title}`, date, time, party, name, email }}/>
      </form>
    </Card>
  );
}

function PrivateForm() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hours, setHours] = useState(PRICING.private.minHours);
  const [pax, setPax] = useState(1);
  const [route, setRoute] = useState('Point‑to‑Point');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const total = useMemo(() => Math.max(PRICING.private.minHours, Number(hours || 0)) * PRICING.private.hourly, [hours]);
  const valid = date && time && name && email;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3">Book Private Transportation</h3>
      <form className="grid gap-4" onSubmit={(e)=>e.preventDefault()}>
        <div className="grid md:grid-cols-5 gap-4">
          <Field label="Date*"><Input type="date" value={date} onChange={e=>setDate(e.target.value)}/></Field>
          <Field label="Time*"><Input type="time" value={time} onChange={e=>setTime(e.target.value)}/></Field>
          <Field label={`Hours (min ${PRICING.private.minHours})`}><Input type="number" min={PRICING.private.minHours} value={hours} onChange={e=>setHours(e.target.value)}/></Field>
          <Field label="Passengers"><Input type="number" min="1" max="14" value={pax} onChange={e=>setPax(e.target.value)}/></Field>
          <Field label="Route Type">
            <Select value={route} onChange={e=>setRoute(e.target.value)}>
              <option>Point‑to‑Point</option><option>By the Hour</option><option>Airport Transfer</option><option>Event Shuttle</option>
            </Select>
          </Field>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Name*"><Input value={name} onChange={e=>setName(e.target.value)}/></Field>
          <Field label="Email*"><Input type="email" value={email} onChange={e=>setEmail(e.target.value)}/></Field>
        </div>
        <PayPalCheckout amount={total} disabled={!valid} meta={{ type: `Private Transport (${route})`, date, time, hours, pax, name, email }}/>
      </form>
      <div className="text-xs text-neutral-600 mt-2">Final itinerary & price will be confirmed by our team in your email.</div>
    </Card>
  );
}
