type Props = { className?: string; size?: number };

export function LogoMark({ className = '', size = 24 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M 6 19 Q 11 14 16 19 Q 21 24 26 19"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="22" cy="11" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={22} className="text-accent" />
      <span className="font-semibold tracking-tightest text-[1.05rem]">slowmadly</span>
    </span>
  );
}
