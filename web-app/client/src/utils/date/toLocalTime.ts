import { DateTime } from "luxon";

export const toLocalTime = (date?: string | Date): string => {
  if (!date) return "N/A";

  const dt =
    typeof date === "string"
      ? DateTime.fromISO(date, { zone: "utc" })
      : DateTime.fromJSDate(date);

  if (!dt.isValid) return "N/A";

  const timeZone = DateTime.local().zoneName;

  return dt.setZone(timeZone).toFormat("hh:mm:ss a");
};
