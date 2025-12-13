// src/types/attendance.type.ts
import type { Employee } from "./employee.types.ts";

export type Attendance = {
  Employee: any;
  attendance_id: number;
  uid: string;
  check_in_at: string;
  check_out_at?: string | null;
  employee: Employee;
};

export type AttendanceListResponse = {
  attendances: Attendance[];
  totalPages: number;
};
