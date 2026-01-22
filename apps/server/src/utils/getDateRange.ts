/** src/utils/getDateRange.ts */

import { DateTime } from "luxon";

interface DateRange {
  start: Date;
  end: Date;
}

function getDateRange(date: string, zone: string = "utc"): DateRange {
  const dt = DateTime.fromISO(date, { zone });

  return {
    start: dt.startOf("day").toJSDate(),
    end: dt.endOf("day").toJSDate(),
  };
}

export default getDateRange;
