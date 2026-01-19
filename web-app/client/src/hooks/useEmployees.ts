/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useEmployees.ts
import { useCallback, useEffect, useState } from "react";
import { employeeAPI } from "@/api/employee.api";
import type { Employee, EmployeeListResponse } from "@/types/employee.types.ts";

type UseEmployeesParams = {
  initialPage?: number;
  initialLimit?: number;
  initialSearch?: string;
  initialDepartment?: string;
  initialLeave?: string;
  initialStatus?: string;
};

export function useEmployees({
  initialPage = 1,
  initialLimit = 6,
  initialSearch = "",
  initialDepartment = "ALL",
  initialLeave = "ALL",
  initialStatus = "ACTIVE",
}: UseEmployeesParams = {}) {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState(initialSearch);
  const [department, setDepartment] = useState(initialDepartment);
  const [leave, setLeave] = useState(initialLeave);
  const [status, setStatus] = useState(initialStatus);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res: EmployeeListResponse = await employeeAPI.getAll(
        page,
        limit,
        search,
        department,
        leave,
        status,
      );
      setEmployeeData(res.employees);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, department, leave, status]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refresh = useCallback(() => {
    fetch();
  }, [fetch]);

  const remove = useCallback(
    async (employee_id: number) => {
      await employeeAPI.delete(employee_id);
      // after delete, refetch current page
      await fetch();
    },
    [fetch],
  );

  const update = useCallback(
    async (employee_id: number, leave: string) => {
      await employeeAPI.update(employee_id, leave);
      // after update, refetch
      await fetch();
    },
    [fetch],
  );

  return {
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
    loading,
    error,
    refresh,
    remove,
    update,
  };
}
