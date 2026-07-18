/** Formatting helpers. The app's currency is the Philippine Peso (₱). */

export const PESO = '₱';

/** "₱38,420" (no decimals) — used for headline balances and budget rows. */
export function peso(amount: number): string {
  return PESO + Math.round(amount).toLocaleString('en-PH');
}

/** "₱38,420.50" (2 decimals) — used where cents matter. */
export function pesoCents(amount: number): string {
  return (
    PESO +
    amount.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/** "+₱2,340" / "-₱1,890" with an explicit sign. */
export function pesoSigned(amount: number): string {
  const sign = amount < 0 ? '-' : '+';
  return sign + peso(Math.abs(amount));
}

/** Whole-number percent, clamped 0–100 for progress bars/rings. */
export function pct(value: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((value / total) * 100)));
}
