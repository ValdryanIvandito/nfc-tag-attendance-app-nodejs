// src/utils/date/toLocalDate.ts
import { DateTime } from "luxon";

export function toLocalDate(date?: Date): string | undefined {
  if (!date) return undefined;

  const timeZone = DateTime.local().zoneName;

  return DateTime.fromJSDate(date).setZone(timeZone).toFormat("yyyy-MM-dd");
}
