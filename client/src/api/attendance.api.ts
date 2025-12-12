import { axiosClient } from "./_axiosClient";
import type { Attendance } from "@/types/attendance.type";

export const attendanceAPI = {
  getAll: async (): Promise<Attendance[]> => {
    const res = await axiosClient.get("/attendance");
    return res.data;
  },

  create: async (data: { uid: string }) => {
    const res = await axiosClient.post("/attendance", data);
    return res.data;
  },

  update: async (data: { uid: string; check_out_at?: string }) => {
    const res = await axiosClient.patch("/attendance", data);
    return res.data;
  },
};
