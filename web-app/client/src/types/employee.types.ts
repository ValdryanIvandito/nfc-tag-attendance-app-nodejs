// src/types/employee.type.ts
export type Employee = {
  employee_id: number;
  uid: string;
  full_name: string;
  department: string;
  position: string;
  leave_status: string;
  employee_status: string;
  created_at: string;
  update_at?: string | null;
};

export type EmployeeListResponse = {
  employees: Employee[];
  totalPages: number;
};
