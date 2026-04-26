/**
 * Detects whether the current visitor arrived from a paid social ad.
 * Used for ad-continuity (matching trust bar) and bundle-preselect on PDPs.
 *
 * Triggers when:
 *  - utm_source is one of: facebook, instagram, tiktok, meta, fb, ig, snap, pinterest, youtube
 *  - utm_medium contains "paid", "social", "cpc", "cpm", or "ads"
 *  - referrer is from a known social domain
 *  - explicit ?ad=1 query flag (for QA/manual testing)
 *  - sessionStorage flag set on a previous page in this session
 */

const PAID_SOURCES = new Set([
  'facebook', 'instagram', 'tiktok', 'meta', 'fb', 'ig',
  'snap', 'snapchat', 'pinterest', 'youtube', 'yt', 'reddit',
]);

const PAID_MEDIUMS = ['paid', 'social', 'cpc', 'cpm', 'ads', 'ppc'];

const SOCIAL_REFERRERS = [
  'facebook.com', 'instagram.com', 'tiktok.com', 't.co', 'twitter.com',
  'x.com', 'snapchat.com', 'pinterest.com', 'youtube.com', 'reddit.com',
  'l.facebook.com', 'lm.facebook.com', 'l.instagram.com',
];

const SESSION_KEY = 'neuvie_paid_traffic';

export interface AdTrafficInfo {
  isPaidSocial: boolean;
  source: string | null;
}

export function detectAdTraffic(): AdTrafficInfo {
  if (typeof window === 'undefined') return { isPaidSocial: false, source: null };

  // Persisted across navigations within the same session
  try {
    const cached = sessionStorage.getItem(SESSION_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as AdTrafficInfo;
      return parsed;
    }
  } catch { /* ignore */ }

  const params = new URLSearchParams(window.location.search);
  const utmSource = (params.get('utm_source') || '').toLowerCase();
  const utmMedium = (params.get('utm_medium') || '').toLowerCase();
  const explicit = params.get('ad') === '1' || params.get('paid') === '1';

  let isPaidSocial = false;
  let source: string | null = null;

  if (explicit) {
    isPaidSocial = true;
    source = utmSource || 'ad';
  } else if (PAID_SOURCES.has(utmSource)) {
    isPaidSocial = true;
    source = utmSource;
  } else if (PAID_MEDIUMS.some(m => utmMedium.includes(m))) {
    isPaidSocial = true;
    source = utmSource || utmMedium;
  } else {
    try {
      const ref = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : '';
      if (ref && SOCIAL_REFERRERS.some(s => ref.endsWith(s))) {
        isPaidSocial = true;
        source = ref.replace(/^www\./, '').split('.')[0];
      }
    } catch { /* ignore */ }
  }

  const info: AdTrafficInfo = { isPaidSocial, source };

  if (isPaidSocial) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(info)); } catch { /* ignore */ }
  }

  return info;
}

/** Friendly label for the ad source (e.g. "Instagram", "TikTok"). */
export function getSourceLabel(source: string | null): string {
  if (!source) return 'Social';
  const map: Record<string, string> = {
    facebook: 'Facebook', fb: 'Facebook', meta: 'Meta',
    instagram: 'Instagram', ig: 'Instagram',
    tiktok: 'TikTok',
    snap: 'Snapchat', snapchat: 'Snapchat',
    pinterest: 'Pinterest',
    youtube: 'YouTube', yt: 'YouTube',
    reddit: 'Reddit',
    twitter: 'X', x: 'X',
  };
  return map[source.toLowerCase()] || source.charAt(0).toUpperCase() + source.slice(1);
}
