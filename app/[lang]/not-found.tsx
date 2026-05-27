import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-sm uppercase tracking-widest text-muted">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tightish">Page not found</h1>
        <p className="mt-3 text-muted">The page you are looking for does not exist or has moved.</p>
        <Link href="/en" className="mt-6 inline-block text-accent underline underline-offset-4">
          Back to home
        </Link>
      </div>
    </main>
  );
}
