/**
 * SEO metadata formatting helpers ensuring search engine character limits:
 * - Title: <= 60 characters (Google desktop & mobile SERP cutoff)
 * - Description: <= 155 characters (Prevents SERP snippet truncation)
 */

export function formatSeoTitle(rawTitle: string): string {
  let title = (rawTitle || '').trim();
  if (!title) return 'Sadman Zaman Khan';

  // If already <= 60 and contains personal branding, return as-is
  if (title.length <= 60 && (/sadman zaman khan/i.test(title) || /sadman khan/i.test(title))) {
    return title;
  }

  // Strip existing branding suffixes to isolate base title
  const baseTitle = title
    .replace(/\s*(—|-|\|)\s*(Sadman Zaman Khan|Sadman Khan|Case Study).*$/i, '')
    .trim();

  // 1. Try appending full brand (21 chars)
  const fullBrand = `${baseTitle} | Sadman Zaman Khan`;
  if (fullBrand.length <= 60) return fullBrand;

  // 2. Try appending concise brand (14 chars)
  const shortBrand = `${baseTitle} | Sadman Khan`;
  if (shortBrand.length <= 60) return shortBrand;

  // 3. Cleanly truncate base title at word boundary if still too long
  const maxBase = 60 - ' | Sadman Khan'.length; // 46 chars
  const truncatedBase = baseTitle.slice(0, maxBase - 1).trim();
  const lastSpace = truncatedBase.lastIndexOf(' ');
  const cleanBase = lastSpace > 25 ? truncatedBase.slice(0, lastSpace).trim() : truncatedBase;
  return `${cleanBase}… | Sadman Khan`;
}

export function formatMetaDescription(text: string, max = 155): string {
  if (!text) return '';
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= max) return cleaned;
  const sub = cleaned.slice(0, max - 1);
  const lastSpace = sub.lastIndexOf(' ');
  if (lastSpace > max * 0.7) {
    return `${sub.slice(0, lastSpace).trim()}…`;
  }
  return `${sub.trim()}…`;
}
