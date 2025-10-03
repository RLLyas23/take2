import './globals.css';

export const metadata = {
  title: 'Island Boy Transportation & Tours',
  description: 'Reliable Taxi & Private Tours in Nassau, New Providence, Bahamas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
