/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { attendanceAPI } from "@/api/attendance.api";
import { toLocalDate } from "@/utils/date/toLocalDate";
import type {
  Attendance,
  AttendanceListResponse,
} from "@/types/attendance.type";

export function useAttendances() {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const [, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  /* ================= FETCH ================= */
  const fetchAttendances = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res: AttendanceListResponse = await attendanceAPI.getAll(
        page,
        limit,
        search,
        department,
        toLocalDate(date),
      );

      setAttendanceData(res.attendances);
      setTotal(res.total);
      setTotalPages(Math.max(1, Math.ceil(res.total / limit)));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, department, date]);

  /* ================= REALTIME ================= */
  const prependAttendance = useCallback(
    (attendance: Attendance) => {
      if (page !== 1) return;

      setAttendanceData((prev) => {
        if (prev.some((a) => a.attendance_id === attendance.attendance_id)) {
          return prev;
        }

        if (!attendance.check_in_at) return prev;

        if (date) {
          const selectedDateISO = toLocalDate(date);
          const attendanceDateISO = toLocalDate(
            new Date(attendance.check_in_at),
          );
          if (selectedDateISO !== attendanceDateISO) return prev;
        }

        return [attendance, ...prev].slice(0, limit);
      });
    },
    [page, date, limit],
  );

  const updateAttendance = useCallback((updated: Attendance) => {
    setAttendanceData((prev) =>
      prev.map((item) =>
        item.attendance_id === updated.attendance_id
          ? { ...item, ...updated }
          : item,
      ),
    );
  }, []);

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  return {
    attendanceData,
    prependAttendance,
    updateAttendance,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    search,
    setSearch,
    department,
    setDepartment,
    date,
    setDate,
    loading,
    error,
  };
}
