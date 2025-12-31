// Flavor icon mapping for all 13 Neuvie products - Black & White theme
export const flavorIconMap: Record<string, { emoji: string; color: string }> = {
  'Mango–Orange': { emoji: '🥭', color: 'bg-secondary text-secondary-foreground' },
  'Mango-Orange': { emoji: '🥭', color: 'bg-secondary text-secondary-foreground' },
  'Raspberry': { emoji: '🍇', color: 'bg-secondary text-secondary-foreground' },
  'Strawberry + Peppermint': { emoji: '🍓', color: 'bg-secondary text-secondary-foreground' },
  'Chocolate': { emoji: '🍫', color: 'bg-secondary text-secondary-foreground' },
  'Mixed Berry': { emoji: '🫐', color: 'bg-secondary text-secondary-foreground' },
  'Mango': { emoji: '🥭', color: 'bg-secondary text-secondary-foreground' },
  'Orange': { emoji: '🍊', color: 'bg-secondary text-secondary-foreground' },
  'Cranberry': { emoji: '🍒', color: 'bg-secondary text-secondary-foreground' },
};

export function getFlavorIcon(flavor: string): { emoji: string; color: string } {
  return flavorIconMap[flavor] || { emoji: '🍃', color: 'bg-secondary text-secondary-foreground' };
}
