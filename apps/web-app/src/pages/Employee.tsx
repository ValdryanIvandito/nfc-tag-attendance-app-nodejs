/* src/pages/Employee.tsx */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useEmployees } from "@/hooks/useEmployees";
import { EmployeeFilters } from "@/components/EmployeeFilters";
import { EmployeeTable } from "@/components/EmployeeTable";
import { EmployeeDialogs } from "@/components/EmployeeDialogs";
import type { Employee } from "@/types/employee.types.ts";

export default function EmployeePage() {
  const {
    employeeData,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    search,
    setSearch,
    department,
    setDepartment,
    leave,
    setLeave,
    status,
    setStatus,
    remove,
    update,
  } = useEmployees({});

  // local UI state for dialogs
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [newLeave, setNewLeave] = useState<string>("");
  const [detailEmployee, setDetailEmployee] = useState<Employee | null>(null);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<number | null>(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (emp: Employee) => {
    setEditEmployee(emp);
    setNewLeave(emp.leave_status);
  };

  const handleUpdate = async () => {
    if (!editEmployee) return;
    try {
      setIsUpdating(true);
      await update(editEmployee.employee_id, newLeave);
    } finally {
      setIsUpdating(false);
      setEditEmployee(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteEmployeeId) return;
    try {
      setIsDeleting(true);
      await remove(deleteEmployeeId);
    } finally {
      setIsDeleting(false);
      setDeleteEmployeeId(null);
    }
  };

  return (
    <>
      <EmployeeFilters
        search={search}
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        department={department}
        onDepartment={(v) => {
          setDepartment(v);
          setPage(1);
        }}
        leave={leave}
        onLeave={(v) => {
          setLeave(v);
          setPage(1);
        }}
        status={status}
        onStatus={(v) => {
          setStatus(v);
          setPage(1);
        }}
      />

      <Card className="bg-[#0F172A] text-white border border-white/10 mb-4 h-112 flex justify-between">
        <EmployeeTable
          status={status}
          data={employeeData}
          onEdit={handleEdit}
          onDelete={(id) => setDeleteEmployeeId(id)}
          onDetail={(emp) => setDetailEmployee(emp)}
        />

        {/* pagination area */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
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

      <EmployeeDialogs
        editEmployee={editEmployee}
        newLeave={newLeave}
        setNewLeave={setNewLeave}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
        onCancelEdit={() => setEditEmployee(null)}
        detailEmployee={detailEmployee}
        onCloseDetail={() => setDetailEmployee(null)}
        deleteEmployeeId={deleteEmployeeId}
        onConfirmDelete={handleDelete}
        onCancelDelete={() => setDeleteEmployeeId(null)}
        isDeleting={isDeleting}
      />
    </>
  );
}
