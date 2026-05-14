import { useEffect, useState } from 'react';

export interface HeroVariant {
  id: 'a' | 'b' | 'c';
  badge: string;
  headlineMain: string;
  headlineItalic: string;
  subline: string;
  ctaPrimary: string;
}

export const heroVariants: Record<'a' | 'b' | 'c', HeroVariant> = {
  // A — current identity-driven (control)
  a: {
    id: 'a',
    badge: '🔥 Trending — Save 20% on Your First Order',
    headlineMain: 'One Strip. Dissolves in Seconds.',
    headlineItalic: 'Supports your gut, energy & skin — from within.',
    subline: 'No pills. No powder. Just peel, place & go. Designed for your daily routine.',
    ctaPrimary: 'Build My Bundle – Save 20%',
  },
  // B — benefit-led, more direct
  b: {
    id: 'b',
    badge: 'New Drop · Founder-Led Brand',
    headlineMain: 'Vitamins You\'ll Actually Take.',
    headlineItalic: 'Because pills are the worst part of feeling better.',
    subline: 'Dissolving wellness strips for energy, sleep, beauty & gut health. 30 seconds. Done.',
    ctaPrimary: 'Find My Strip – Take Quiz',
  },
  // C — problem-aware, conversion-focused for cold traffic
  c: {
    id: 'c',
    badge: '✨ As Featured in Vogue, Forbes & Well+Good',
    headlineMain: 'Stop Forgetting Your Vitamins.',
    headlineItalic: '3-second strip. Real results in 30 days.',
    subline: 'The wellness routine women actually keep. Free US shipping over $50.',
    ctaPrimary: 'Start My Routine – 20% Off',
  },
};

/**
 * Choose a hero variant via:
 *  1. ?v=a|b|c URL param (overrides everything, persists for session)
 *  2. localStorage if previously assigned
 *  3. Random assignment (33/33/33)
 *
 * Returns the active variant + a setter so admins can override.
 */
export function useHeroVariant(): HeroVariant {
  const [variantId, setVariantId] = useState<'a' | 'b' | 'c'>('a');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('v');
    if (fromUrl === 'a' || fromUrl === 'b' || fromUrl === 'c') {
      localStorage.setItem('neuvie_hero_variant', fromUrl);
      setVariantId(fromUrl);
      return;
    }

    const stored = localStorage.getItem('neuvie_hero_variant') as 'a' | 'b' | 'c' | null;
    if (stored && heroVariants[stored]) {
      setVariantId(stored);
      return;
    }

    // Random assignment
    const pick = (['a', 'b', 'c'] as const)[Math.floor(Math.random() * 3)];
    localStorage.setItem('neuvie_hero_variant', pick);
    setVariantId(pick);
  }, []);

  return heroVariants[variantId];
}
