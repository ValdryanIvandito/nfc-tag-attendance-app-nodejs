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

export interface PaginatedEmployee {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Employee[];
}

export const employeeAPI = {
  /** GET ALL PAGINATED + FILTERING */
  getAll: async (
    page: number,
    limit: number,
    search?: string,
    department?: string,
    status?: string
  ) => {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search) params.append("search", search);
    if (department && department !== "ALL")
      params.append("department", department);
    if (status && status !== "ALL") params.append("status", status);

    const res = await axiosClient.get(`/employee?${params.toString()}`);

    return {
      page: res.data.data.page,
      limit: res.data.data.limit,
      total: res.data.data.total,
      totalPages: res.data.data.totalPages,
      employees: res.data.data.data, // array employee
    };
  },

  delete: async (employee_id: number) => {
    const res = await axiosClient.delete("/employee", {
      data: { employee_id: employee_id },
    });
    return res.data.data;
  },

  update: async (data: Partial<Employee>) => {
    const res = await axiosClient.patch("/employee", data);
    return res.data.data;
  },
};
