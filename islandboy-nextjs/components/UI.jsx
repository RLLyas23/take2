'use client';

export function Field({ label, children }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

export function Card({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 w-full max-w-3xl mx-auto">
      {children}
    </div>
  );
}

export function Input(props) {
  return (
    <input
      {...props}
      className={`px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-600/60 border-neutral-300 ${props.className||''}`}
    />
  );
}

export function Select(props) {
  return (
    <select
      {...props}
      className={`px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-600/60 border-neutral-300 ${props.className||''}`}
    />
  );
}

export function Currency({ amount }) {
  return <span>${Number(amount||0).toFixed(2)}</span>;
}
