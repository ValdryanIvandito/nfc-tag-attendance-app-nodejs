import { axiosClient } from "./_axiosClient";

export interface Attendance {
  attendance_id: number;
  uid: string;
  check_in_at: string;
  check_out_at?: string | null;
}

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
