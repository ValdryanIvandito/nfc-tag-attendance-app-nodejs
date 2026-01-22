/* src/utils/date/toDateShortText.ts */

import { DateTime } from "luxon";

export function toDateShortText(date?: Date): string | undefined {
  if (!date) return undefined;

  const locale =
    typeof navigator !== "undefined"
      ? navigator.language
      : Intl.DateTimeFormat().resolvedOptions().locale;

  return DateTime.fromJSDate(date).setLocale(locale).toFormat("dd LLL yyyy");
}
