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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const [deleteEmployee, setDeleteEmployee] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  // FILTER DATA
  const filteredEmployeeData =
    status === "ALL"
      ? employeeData.filter((emp) => emp.status !== "INACTIVE")
      : employeeData;

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await employeeAPI.getAll(
        page,
        limit,
        search,
        department,
        status
      );

      setEmployeeData(res.employees);
      setTotalPages(res.totalPages);
    };

    fetchEmployees();
  }, [page, limit, search, department, status]);

  const deleteHandler = async () => {
    if (!deleteEmployee) return;

    try {
      setIsDeleting(true);
      await employeeAPI.delete(deleteEmployee);

      // Setelah delete → refresh data
      const res = await employeeAPI.getAll(page, limit);
      setEmployeeData(res.employees);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
      setDeleteEmployee(null);
    }
  };

  const updateStatusHandler = async () => {
    if (!editEmployee) return;

    try {
      setIsUpdating(true);

      await employeeAPI.update({
        employee_id: editEmployee.employee_id,
        status: newStatus,
      });

      // Refresh data
      const res = await employeeAPI.getAll(
        page,
        limit,
        search,
        department,
        status
      );
      setEmployeeData(res.employees);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setIsUpdating(false);
      setEditEmployee(null);
    }
  };

  return (
    <>
      <Card className="bg-[#0F172A] text-white border border-white/10 mb-6 px-4">
        {/* SEARCH INPUT */}
        <div className="flex gap-4">
          <Input
            placeholder="Search employees..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <Select
            onValueChange={(val) => {
              setDepartment(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Department</SelectLabel>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Status</SelectLabel>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                <SelectItem value="SICK">SICK</SelectItem>
                <SelectItem value="VACATION">VACATION</SelectItem>
                <SelectItem value="MATERNITY">MATERNITY</SelectItem>
                <SelectItem value="EMERGENCY">EMERGENCY</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* EMPLOYEE DATA */}
      <Card className="bg-[#0F172A] text-white border border-white/10 mb-6 px-4">
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
            {filteredEmployeeData.map((emp) => (
              <TableRow key={emp.employee_id}>
                <TableCell>{emp.employee_id}</TableCell>
                <TableCell>{emp.uid}</TableCell>
                <TableCell>{emp.full_name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.status}</TableCell>
                <TableCell>
                  <Button
                    className="bg-transparent hover:bg-transparent border border-blue-300 text-blue-300 hover:text-blue-500"
                    onClick={() => {
                      setEditEmployee(emp);
                      setNewStatus(emp.status); // prefill status
                    }}
                  >
                    Edit Status
                  </Button>
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="bg-transparent hover:bg-transparent border border-red-600 text-red-600 hover:text-red-800"
                        onClick={() => setDeleteEmployee(emp.employee_id)}
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>

                    {/* MODAL CONTENT */}
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Employee?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this employee?
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setDeleteEmployee(null)}
                        >
                          Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                          onClick={deleteHandler}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Yes, Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!editEmployee} onOpenChange={() => setEditEmployee(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee Status</DialogTitle>
            <DialogDescription>
              Update status for <b>{editEmployee?.full_name}</b>
            </DialogDescription>
          </DialogHeader>

          {/* SELECT STATUS */}
          <Select value={newStatus} onValueChange={(v) => setNewStatus(v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
              <SelectItem value="SICK">SICK</SelectItem>
              <SelectItem value="FUNERAL">FUNERAL</SelectItem>
              <SelectItem value="MATERNITY">MATERNITY</SelectItem>
              <SelectItem value="VACATION">VACATION</SelectItem>
              <SelectItem value="EMERGENCY">EMERGENCY</SelectItem>
              <SelectItem value="INACTIVE">INACTIVE</SelectItem>
            </SelectContent>
          </Select>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditEmployee(null)}>
              Cancel
            </Button>

            <Button onClick={updateStatusHandler} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PAGINATION BAR */}
      <Card className="bg-[#0F172A] text-white border border-white/10">
        <div className="flex items-center justify-between px-4">
          {/* LEFT - PER PAGE INPUT */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-20 px-2 py-1 rounded border border-white/30 bg-transparent text-white"
              value={limit}
              min={1}
              onChange={(e) => {
                const newLimit = Number(e.target.value);
                if (newLimit > 0) {
                  setLimit(newLimit);
                  setPage(1);
                }
              }}
            />
            <span className="text-white/70 text-sm">Per Page</span>
          </div>

          {/* RIGHT - PAGINATION CONTROL */}
          <div className="flex items-center gap-3">
            {/* Prev Button */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Prev
            </button>

            {/* PAGE DISPLAY */}
            <span className="text-white/80 text-sm">
              {page} / {totalPages}
            </span>

            {/* Next Button */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-3 py-1 rounded ${
                page === totalPages
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}
