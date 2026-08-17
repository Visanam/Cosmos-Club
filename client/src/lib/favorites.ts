export const FAVORITES_STORAGE_KEY = "visanam-favourite-characters";

export function toggleFavoriteId(current: string[], id: string) {
  return current.includes(id) ? current.filter((value) => value !== id) : [...current, id];
}

export function readFavoriteIds(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
}

export function writeFavoriteIds(ids: string[]) {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Device storage can be unavailable in private browser modes.
  }
}
