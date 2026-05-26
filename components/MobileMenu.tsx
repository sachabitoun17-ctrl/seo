'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Item = { href: string; label: string; external?: boolean };
type Props = { items: Item[] };

export function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-md hover:bg-line/60 transition-colors"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          className="md:hidden fixed inset-0 top-16 z-40 bg-cream animate-fade-up"
          onClick={() => setOpen(false)}
        >
          <nav className="max-w-container mx-auto px-5 pt-6 pb-10" onClick={(e) => e.stopPropagation()}>
            <ul className="space-y-1">
              {items.map((item) => {
                const isExternal = item.external || /^https?:\/\//.test(item.href);
                const className =
                  'block py-3 text-xl font-medium tracking-tightish border-b border-line hover:text-accent transition-colors';
                return (
                  <li key={item.href}>
                    {isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener"
                        className={className}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={className}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
