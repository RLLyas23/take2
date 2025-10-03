'use client';

import { useEffect, useRef, useState } from 'react';
import { BUSINESS } from '@/lib/config';

function usePayPalSdk(clientId, env) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const existing = document.getElementById('paypal-sdk');
    if (window.paypal) { setReady(true); return; }
    if (existing) { existing.addEventListener('load', () => setReady(true)); return; }
    const s = document.createElement('script');
    s.id = 'paypal-sdk';
    const base = env === 'live' ? 'https://www.paypal.com' : 'https://www.sandbox.paypal.com';
    s.src = `${base}/sdk/js?client-id=${clientId}&currency=USD&intent=CAPTURE&components=buttons`;
    s.async = true;
    s.onload = () => setReady(true);
    document.body.appendChild(s);
  }, [clientId, env]);
  return ready;
}

export default function PayPalCheckout({ amount, meta, disabled }) {
  const ref = useRef(null);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
  const env = process.env.NEXT_PUBLIC_PAYPAL_ENV || 'sandbox';
  const ready = usePayPalSdk(clientId, env);

  useEffect(() => {
    if (!ready || !ref.current || !window.paypal) return;
    ref.current.innerHTML = '';

    window.paypal.Buttons({
      style: { layout: 'horizontal', shape: 'rect' },
      onInit: (data, actions) => {
        if (disabled) actions.disable(); else actions.enable();
      },
      onClick: () => {
        if (disabled) alert('Please complete the required fields before paying.');
      },
      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{
          amount: { value: Number(amount || 0).toFixed(2) },
          description: `${BUSINESS.NAME} booking (${meta?.type || 'ride'})`,
        }],
        application_context: { brand_name: BUSINESS.NAME, user_action: 'PAY_NOW' }
      }),
      onApprove: (data, actions) => actions.order.capture().then((details) => {
        const name = details?.payer?.name?.given_name || '';
        alert(`Payment successful! Thank you ${name}. We'll confirm your booking shortly.`);
        try {
          const msg = encodeURIComponent(
            `Hi ${BUSINESS.NAME}, I just paid ${Number(amount||0).toFixed(2)} USD for ${meta?.type}. Name: ${meta?.name||''}. Date: ${meta?.date||''} ${meta?.time||''}.`
          );
          window.open(`https://wa.me/${BUSINESS.WHATSAPP_E164}?text=${msg}`, '_blank');
        } catch {}
      }),
      onError: (err) => {
        console.error(err);
        alert('There was an issue processing your payment. Please try again or contact us.');
      }
    }).render(ref.current);
  }, [ready, amount, disabled, meta]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-neutral-700">Total</span>
        <strong>${Number(amount||0).toFixed(2)}</strong>
      </div>
      <div ref={ref} className={disabled ? 'opacity-50 pointer-events-none' : ''} />
      <p className="text-xs text-neutral-600 mt-2">You can pay by card in the PayPal popup without a PayPal account.</p>
    </div>
  );
}
