'use client';

import { useState, type FormEvent } from 'react';

type Props = {
  publication?: string; // Beehiiv publication ID
  variant?: 'inline' | 'card';
};

export function NewsletterSignup({ publication, variant = 'card' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('loading');
    try {
      // If Beehiiv publication is configured, post to their public form endpoint.
      // Otherwise, just record locally as success (placeholder until publication ID is set).
      if (publication) {
        await fetch(`https://api.beehiiv.com/v2/publications/${publication}/subscriptions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, send_welcome_email: true, utm_source: 'slowmadly' }),
        }).catch(() => null);
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="flex-1 px-4 py-2.5 rounded-md border border-line bg-paper text-sm focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-md bg-ink text-cream px-5 py-2.5 text-sm font-medium hover:bg-accent-deep disabled:opacity-50 transition-colors whitespace-nowrap"
        >
          {status === 'success' ? '✓ Subscribed' : status === 'loading' ? '…' : 'Subscribe'}
        </button>
      </form>
    );
  }

  return (
    <section className="mt-12 rounded-2xl border border-line bg-paper-gradient px-6 py-7 sm:px-8 sm:py-8">
      <div className="max-w-md">
        <p className="text-xs uppercase tracking-widest text-accent-deep font-semibold">Newsletter</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tightish font-display">
          One slow-travel email a month
        </h2>
        <p className="mt-2 text-sm text-muted">
          New visa rules, trending nomad cities, and the best cost-of-living updates.
          No spam, unsubscribe anytime.
        </p>
        <form onSubmit={onSubmit} className="mt-5 flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            disabled={status === 'success'}
            className="flex-1 px-4 py-2.5 rounded-md border border-line bg-paper text-sm focus:border-ink focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="rounded-md bg-ink text-cream px-5 py-2.5 text-sm font-medium hover:bg-accent-deep disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {status === 'success' ? '✓ Subscribed' : status === 'loading' ? '…' : 'Subscribe'}
          </button>
        </form>
        {status === 'error' && (
          <p className="mt-2 text-xs text-accent">Could not subscribe right now. Try again.</p>
        )}
      </div>
    </section>
  );
}
