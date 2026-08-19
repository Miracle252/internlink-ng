export const APPLICATIONS_COOKIE_NAME = "internlink-applications";

export type ApplicationRecord = {
  id: string;
  internshipId: string;
  status:
    | "Applied"
    | "Under Review"
    | "Interview"
    | "Accepted"
    | "Rejected";
  date: string;
};

export function parseApplications(
  value?: string
): ApplicationRecord[] {
  if (!value) {
    return [];
  }

  try {
    const decodedValue = decodeURIComponent(value);
    const parsed: unknown = JSON.parse(decodedValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is ApplicationRecord => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const application = item as Record<string, unknown>;

      return (
        typeof application.id === "string" &&
        typeof application.internshipId === "string" &&
        typeof application.status === "string" &&
        typeof application.date === "string"
      );
    });
  } catch {
    return [];
  }
}