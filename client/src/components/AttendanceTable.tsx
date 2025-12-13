// src/components/EmployeeTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { extractTime } from "@/lib/utils";
import { AttendanceAction } from "./AttendanceAction";
import type { Attendance } from "@/types/attendance.type";

type Props = {
  data: Attendance[];
  onDetail: (att: Attendance) => void;
};

export const AttendanceTable: React.FC<Props> = ({ data, onDetail }) => {
  return (
    <div className="overflow-x-auto p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">NAME</TableHead>
            <TableHead className="min-w-[120px] hidden md:table-cell">
              DEPARTMENT
            </TableHead>
            <TableHead className="min-w-[120px] hidden md:table-cell">
              POSITION
            </TableHead>
            <TableHead className="min-w-[120px]">CHECK_IN</TableHead>
            <TableHead className="min-w-[120px] hidden md:table-cell">
              CHECK_OUT
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((att) => (
            <TableRow key={att.attendance_id}>
              <TableCell className="font-medium">
                {att.Employee.full_name}
              </TableCell>
              <TableCell className="font-medium hidden md:table-cell">
                {att.Employee.department}
              </TableCell>
              <TableCell className="font-medium hidden md:table-cell">
                {att.Employee.position}
              </TableCell>
              <TableCell className="font-medium">
                {extractTime(att.check_in_at)}
              </TableCell>
              <TableCell className="font-medium hidden md:table-cell">
                {att.check_out_at ? extractTime(att.check_out_at) : "N/A"}
              </TableCell>
              <TableCell>
                <AttendanceAction onDetail={() => onDetail(att)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
