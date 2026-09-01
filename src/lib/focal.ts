/**
 * Focal-point coordinate helpers.
 *
 * The DB column `cover_focal_position` is free-form TEXT and stores values like
 * "35% 62%". Older rows may still hold the legacy keywords `center | top | bottom`;
 * `normalizeFocal` maps those forward so the value can be dropped straight into
 * CSS `object-position` without further work.
 */

export const DEFAULT_FOCAL = '50% 50%';

const LEGACY_MAP: Record<string, string> = {
  center: '50% 50%',
  top: '50% 0%',
  bottom: '50% 100%',
  left: '0% 50%',
  right: '100% 50%',
};

/** Returns a CSS-ready `object-position` string. Falls back to centered. */
export function normalizeFocal(raw: string | null | undefined): string {
  if (!raw) return DEFAULT_FOCAL;
  const trimmed = raw.trim();
  if (!trimmed) return DEFAULT_FOCAL;
  const lower = trimmed.toLowerCase();
  if (LEGACY_MAP[lower]) return LEGACY_MAP[lower];
  return trimmed;
}

/** Parse a normalized focal value into numeric percentages. */
export function parseFocal(raw: string | null | undefined): { x: number; y: number } {
  const v = normalizeFocal(raw);
  const m = v.match(/(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%/);
  if (!m) return { x: 50, y: 50 };
  return {
    x: clamp(parseFloat(m[1])),
    y: clamp(parseFloat(m[2])),
  };
}

export function formatFocal(x: number, y: number): string {
  return `${clamp(x).toFixed(1)}% ${clamp(y).toFixed(1)}%`;
}

function clamp(n: number): number {
  if (Number.isNaN(n)) return 50;
  return Math.max(0, Math.min(100, n));
}
