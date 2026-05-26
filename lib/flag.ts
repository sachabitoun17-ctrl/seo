// Convert a 2-letter country code to its flag emoji using Regional Indicator
// Symbol Letters (U+1F1E6..U+1F1FF).
export function flagEmoji(code: string | undefined): string {
  if (!code || code.length !== 2) return '';
  const A = 0x1f1e6;
  const base = 'A'.charCodeAt(0);
  const cp1 = A + (code.toUpperCase().charCodeAt(0) - base);
  const cp2 = A + (code.toUpperCase().charCodeAt(1) - base);
  try {
    return String.fromCodePoint(cp1, cp2);
  } catch {
    return '';
  }
}
