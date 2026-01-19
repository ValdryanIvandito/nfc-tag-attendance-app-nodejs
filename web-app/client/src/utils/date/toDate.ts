// src/utils/date/toDate.ts
import { DateTime } from "luxon";

export function toDate(date?: Date): string | undefined {
  if (!date) return undefined;

  return DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");
}