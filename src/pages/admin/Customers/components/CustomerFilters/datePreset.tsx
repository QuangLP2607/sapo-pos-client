export type DatePreset =
  | "ALL"
  | "THIS_WEEK"
  | "LAST_WEEK"
  | "THIS_MONTH"
  | "LAST_MONTH"
  | "THIS_YEAR";

const toISO = (d?: Date) => (d ? d.toISOString() : undefined);

const startOfWeek = (d: Date) => {
  const date = new Date(d);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

const endOfWeek = (d: Date) => {
  const date = startOfWeek(d);
  date.setDate(date.getDate() + 6);
  date.setHours(23, 59, 59, 999);
  return date;
};

export function resolveDatePreset(preset: DatePreset): {
  startDate?: string;
  endDate?: string;
} {
  const now = new Date();

  switch (preset) {
    case "THIS_WEEK":
      return {
        startDate: toISO(startOfWeek(now)),
        endDate: toISO(endOfWeek(now)),
      };

    case "LAST_WEEK": {
      const last = new Date(now);
      last.setDate(now.getDate() - 7);
      return {
        startDate: toISO(startOfWeek(last)),
        endDate: toISO(endOfWeek(last)),
      };
    }

    case "THIS_MONTH":
      return {
        startDate: toISO(new Date(now.getFullYear(), now.getMonth(), 1)),
        endDate: toISO(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
      };

    case "LAST_MONTH":
      return {
        startDate: toISO(new Date(now.getFullYear(), now.getMonth() - 1, 1)),
        endDate: toISO(new Date(now.getFullYear(), now.getMonth(), 0)),
      };

    case "THIS_YEAR":
      return {
        startDate: toISO(new Date(now.getFullYear(), 0, 1)),
        endDate: toISO(new Date(now.getFullYear(), 11, 31)),
      };

    default:
      return {};
  }
}
