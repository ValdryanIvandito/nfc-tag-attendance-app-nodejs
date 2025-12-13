/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useAttendances.ts
import { useCallback, useEffect, useState } from "react";
import type {
  Attendance,
  AttendanceListResponse,
} from "@/types/attendance.type";
import { attendanceAPI } from "@/api/attendance.api";

type UseAttendancesParams = {
  initialPage?: number;
  initialLimit?: number;
  initialSearch?: string;
  initialDateStart?: string;
  initialDateEnd?: string;
};

export function useAttendances({
  initialPage = 1,
  initialLimit = 6,
  initialSearch = "",
  initialDateStart = "",
  initialDateEnd = "",
}: UseAttendancesParams = {}) {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState(initialSearch);
  const [dateStart, setDateStart] = useState(initialDateStart);
  const [dateEnd, setDateEnd] = useState(initialDateEnd);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res: AttendanceListResponse = await attendanceAPI.getAll(
        page,
        limit,
        search,
        dateStart,
        dateEnd
      );
      console.log("Fetched attendances:", res);
      setAttendanceData(res.attendances);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, dateStart, dateEnd]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    attendanceData,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    search,
    setSearch,
    dateStart,
    setDateStart,
    dateEnd,
    setDateEnd,
    loading,
    error,
  };
}
