// src/pages/Employee.tsx

import { employeeAPI } from "@/api/employee.api";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Employee = {
  employee_id: number;
  uid: string;
  full_name: string;
  department: string;
  position: string;
  status: string;
  created_at: string;
  update_at?: string | null;
};

export default function Employee() {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await employeeAPI.getAll(); // ini array
      setEmployeeData(res);
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <Card className="bg-[#0F172A] text-white border border-white/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>UID</TableHead>
              <TableHead>FULL NAME</TableHead>
              <TableHead>DEPARTMENT</TableHead>
              <TableHead>POSITION</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ACTION</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employeeData.map((emp) => (
              <TableRow key={emp.employee_id}>
                <TableCell>{emp.employee_id}</TableCell>
                <TableCell>{emp.uid}</TableCell>
                <TableCell>{emp.full_name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.status}</TableCell>
                <TableCell>
                  <Button>Edit Status</Button>
                </TableCell>
                <TableCell>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
