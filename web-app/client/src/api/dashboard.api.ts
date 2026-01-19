// src/api/dashboard.api.ts
import type { Dashboard } from "@/types/dashboard.type";
import { axiosClient } from "./_axiosClient";
import { DateTime } from "luxon";

export const dashboardAPI = {
  getAll: async () => {
    const params = new URLSearchParams();
    const datetime = DateTime.local().toISO();
    const timezone = DateTime.local().zoneName;
    params.append("datetime", String(datetime));
    params.append("timezone", String(timezone));

    const res = await axiosClient.get(`/dashboard?${params.toString()}`);

    return res.data.data as Dashboard;
  },
};
