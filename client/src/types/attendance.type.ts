// src/types/attendance.type.ts
import type { Employee } from "./employee.types.ts";

export type Attendance = {
  attendance_id: number;
  uid: string;
  check_in_at: Date | undefined;
  check_out_at?: Date | undefined;
  Employee: Employee;
};

export type AttendanceListResponse = {
  attendances: Attendance[];
  totalPages: number;
  total: number;
};
