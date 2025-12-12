// src/pages/Employee.tsx
import { employeeAPI } from "@/api/employee.api";
import { useEffect, useState } from "react";
import { Search, Filter, Info, Pencil, Trash2 } from "lucide-react";

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
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const [deleteEmployee, setDeleteEmployee] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [detailEmployee, setDetailEmployee] = useState<Employee | null>(null);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-900/50 text-green-400 border border-green-600";
      case "INACTIVE":
        return "bg-gray-700/50 text-gray-400 border border-gray-600";
      case "SICK":
        return "bg-yellow-900/50 text-yellow-400 border border-yellow-600";
      case "VACATION":
        return "bg-blue-900/50 text-blue-400 border border-blue-600";
      case "EMERGENCY":
        return "bg-red-900/50 text-red-400 border border-red-600";
      case "MATERNITY":
        return "bg-pink-900/50 text-pink-300 border border-pink-600";
      default:
        return "bg-gray-700/50 text-gray-300 border border-gray-600";
    }
  };

  return (
    <>
      {/* SEARCH & FILTER SECTION - RESPONSIVE */}
      <Card className="bg-[#0F172A] text-white border border-white/10 mb-4 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input - Full width on mobile */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9"
            />
          </div>

          {/* Filter Section - Stack on mobile, row on tablet+ */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Select
                onValueChange={(val) => {
                  setDepartment(val);
                  setPage(1);
                }}
              >
                <SelectTrigger className="pl-9 w-full sm:w-[180px]">
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
            </div>

            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Select
                onValueChange={(val) => {
                  setStatus(val);
                  setPage(1);
                }}
              >
                <SelectTrigger className="pl-9 w-full sm:w-[180px]">
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
          </div>
        </div>
      </Card>

      <Card className="bg-[#0F172A] text-white border border-white/10 mb-4 h-112 flex justify-between">
        {/* EMPLOYEE TABLE - RESPONSIVE */}
        <div className="overflow-x-auto">
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
                <TableHead className="min-w-[200px] text-center">
                  ACTION
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {employeeData.map((emp) => (
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

                  {/* ACTION BUTTONS - Responsive */}
                  <TableCell>
                    <div className="flex items-center justify-center gap-1 flex-wrap">
                      {/* Detail Button - Only on small screens */}
                      <Button
                        size="sm"
                        className="xl:hidden bg-transparent hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 px-2"
                        onClick={() => setDetailEmployee(emp)}
                      >
                        <Info className="w-4 h-4" />
                      </Button>

                      {/* Edit Button */}
                      <Button
                        size="sm"
                        className="bg-transparent hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 px-2"
                        onClick={() => {
                          setEditEmployee(emp);
                          setNewStatus(emp.status);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                        <span className="hidden sm:inline ml-1">Edit</span>
                      </Button>

                      {/* Delete Button */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-transparent hover:bg-red-500/10 text-red-500 hover:text-red-400 px-2"
                            onClick={() => setDeleteEmployee(emp.employee_id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline ml-1">
                              Delete
                            </span>
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="bg-slate-800 text-white border border-white/10">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Employee?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-white">
                              Are you sure you want to delete{" "}
                              <strong>{emp.full_name}</strong>? This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel
                              className="text-black hover:bg-slate-300"
                              onClick={() => setDeleteEmployee(null)}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={deleteHandler}
                              disabled={isDeleting}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* PAGINATION - RESPONSIVE */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
          {/* Per Page Input */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-16 px-2 py-1 rounded border border-white/30 bg-transparent text-white text-center"
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
            <span className="text-white/70 text-sm whitespace-nowrap">
              Per Page
            </span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-1.5 rounded text-sm font-medium transition ${
                page === 1
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Prev
            </button>

            <span className="text-white/80 text-sm font-medium min-w-[60px] text-center">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-1.5 rounded text-sm font-medium transition ${
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

      {/* EDIT STATUS DIALOG */}
      <Dialog open={!!editEmployee} onOpenChange={() => setEditEmployee(null)}>
        <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white border border-white/10">
          <DialogHeader>
            <DialogTitle>Edit Employee Status</DialogTitle>
            <DialogDescription className="text-white">
              Update status for <strong>{editEmployee?.full_name}</strong>
            </DialogDescription>
          </DialogHeader>

          <Select value={newStatus} onValueChange={(v) => setNewStatus(v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-white">
              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
              <SelectItem value="SICK">SICK</SelectItem>
              <SelectItem value="FUNERAL">FUNERAL</SelectItem>
              <SelectItem value="MATERNITY">MATERNITY</SelectItem>
              <SelectItem value="VACATION">VACATION</SelectItem>
              <SelectItem value="EMERGENCY">EMERGENCY</SelectItem>
              <SelectItem value="INACTIVE">INACTIVE</SelectItem>
            </SelectContent>
          </Select>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setEditEmployee(null)}
              className="w-full sm:w-auto text-black hover:bg-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={updateStatusHandler}
              disabled={isUpdating}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DETAIL DIALOG - Mobile Only */}
      <Dialog
        open={!!detailEmployee}
        onOpenChange={() => setDetailEmployee(null)}
      >
        <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white border border-white/10">
          <DialogHeader>
            <DialogTitle>Employee Detail</DialogTitle>
          </DialogHeader>

          {detailEmployee && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white">ID:</span>
                <span className="font-medium">
                  {detailEmployee.employee_id}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white">UID:</span>
                <span className="font-mono text-xs">{detailEmployee.uid}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white">Full Name:</span>
                <span className="font-medium">{detailEmployee.full_name}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white">Department:</span>
                <span>{detailEmployee.department}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white">Position:</span>
                <span>{detailEmployee.position}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    detailEmployee.status
                  )}`}
                >
                  {detailEmployee.status}
                </span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDetailEmployee(null)}
              className="w-full text-black hover:bg-slate-300"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
