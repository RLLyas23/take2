export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
      <p>Thank you! We have received your payment. We'll confirm your booking by email shortly.</p>
      <a href="/" className="mt-6 inline-block px-4 py-2 rounded-xl border">Back to Home</a>
    </main>
  );
}
