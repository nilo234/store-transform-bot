// Flavor icon mapping for all 13 Neuvie products
export const flavorIconMap: Record<string, { emoji: string; color: string }> = {
  'Mango–Orange': { emoji: '🥭', color: 'bg-orange-100 text-orange-700' },
  'Mango-Orange': { emoji: '🥭', color: 'bg-orange-100 text-orange-700' },
  'Raspberry': { emoji: '🍇', color: 'bg-pink-100 text-pink-700' },
  'Strawberry + Peppermint': { emoji: '🍓', color: 'bg-red-100 text-red-700' },
  'Chocolate': { emoji: '🍫', color: 'bg-amber-100 text-amber-800' },
  'Mixed Berry': { emoji: '🫐', color: 'bg-purple-100 text-purple-700' },
  'Mango': { emoji: '🥭', color: 'bg-yellow-100 text-yellow-700' },
  'Orange': { emoji: '🍊', color: 'bg-orange-100 text-orange-600' },
  'Cranberry': { emoji: '🍒', color: 'bg-red-100 text-red-600' },
};

export function getFlavorIcon(flavor: string): { emoji: string; color: string } {
  return flavorIconMap[flavor] || { emoji: '🍃', color: 'bg-primary/10 text-primary' };
}
