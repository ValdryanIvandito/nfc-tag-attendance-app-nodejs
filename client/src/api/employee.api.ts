// src/api/employee.api.ts

import { axiosClient } from "./_axiosClient";

export interface Employee {
  employee_id: number;
  uid: string;
  full_name: string;
  department: string;
  position: string;
  status: string;
  created_at: string;
  update_at?: string | null;
}

export const employeeAPI = {
  getAll: async (): Promise<Employee[]> => {
    const res = await axiosClient.get("/employee");
    return res.data.data;
  },

  create: async (data: Partial<Employee>) => {
    const res = await axiosClient.post("/employee", data);
    return res.data.data;
  },

  update: async (data: Partial<Employee>) => {
    const res = await axiosClient.patch("/employee", data);
    return res.data.data;
  },

  delete: async (uid: string) => {
    const res = await axiosClient.delete("/employee", {
      data: { uid },
    });
    return res.data.data;
  },
};
