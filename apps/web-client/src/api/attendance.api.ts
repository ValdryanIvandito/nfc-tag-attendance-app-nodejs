/* src/api/attendance.api.ts */

import { axiosClient } from "./_axiosClient";
import { DateTime } from "luxon";

export const attendanceAPI = {
  getAll: async (
    page: number,
    limit: number,
    search?: string,
    department?: string,
    date?: string,
  ) => {
    const timezone = DateTime.local().zoneName;
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search) {
      params.append("search", search);
    }

    if (department && department !== "ALL") {
      params.append("department", department);
    }

    if (date) {
      params.append("date", date);
    }

    params.append("timezone", timezone);

    const res = await axiosClient.get(`/attendance`, { params });

    return {
      page: res.data.data.page,
      limit: res.data.data.limit,
      total: res.data.data.total,
      totalPages: res.data.data.totalPages,
      attendances: res.data.data.data,
    };
  },
};
