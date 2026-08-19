export const SAVED_COOKIE_NAME = "internlink-saved";

export function parseSavedIds(value?: string): string[] {
  if (!value) {
    return [];
  }

  try {
    const decodedValue = decodeURIComponent(value);

    const parsed: unknown = JSON.parse(decodedValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (id): id is string => typeof id === "string"
    );
  } catch {
    return [];
  }
}