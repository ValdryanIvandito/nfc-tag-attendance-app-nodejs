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
import { EmployeeActions } from "./EmployeeActions";
import { getStatusColor } from "@/utils/utils";
import type { Employee } from "@/types/employee.types.ts";

type Props = {
  data: Employee[];
  onEdit: (emp: Employee) => void;
  onDelete: (employee_id: number) => void; // open dialog
  onDetail: (emp: Employee) => void;
};

export const EmployeeTable: React.FC<Props> = ({
  data,
  onEdit,
  onDelete,
  onDetail,
}) => {
  return (
    <div className="overflow-x-auto px-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[60px] hidden xl:table-cell">
              ID
            </TableHead>
            <TableHead className="min-w-[100px] hidden xl:table-cell">
              UID
            </TableHead>
            <TableHead className="min-w-[150px]">NAME</TableHead>
            <TableHead className="min-w-[120px] hidden md:table-cell">
              DEPARTMENT
            </TableHead>
            <TableHead className="min-w-[120px] hidden lg:table-cell">
              POSITION
            </TableHead>
            <TableHead className="min-w-[100px] hidden xl:table-cell">
              STATUS
            </TableHead>
            <TableHead className="min-w-[200px] text-center">ACTION</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((emp) => (
            <TableRow key={emp.employee_id}>
              <TableCell className="hidden xl:table-cell font-medium">
                {emp.employee_id}
              </TableCell>
              <TableCell className="hidden xl:table-cell text-xs text-gray-400">
                {emp.uid}
              </TableCell>
              <TableCell className="font-medium">{emp.full_name}</TableCell>
              <TableCell className="hidden md:table-cell">
                {emp.department}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-sm text-gray-300">
                {emp.position}
              </TableCell>
              <TableCell className="hidden xl:table-cell">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                    emp.status
                  )}`}
                >
                  {emp.status}
                </span>
              </TableCell>

              <TableCell>
                <EmployeeActions
                  onDetail={() => onDetail(emp)}
                  onEdit={() => onEdit(emp)}
                  onDeleteClick={() => onDelete(emp.employee_id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
