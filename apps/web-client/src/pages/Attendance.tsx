/* src/pages/Attendance.tsx */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAttendances } from "@/hooks/useAttendances";
import { useEventStream } from "@/hooks/useEventStream";
import { AttendanceFilters } from "@/components/AttendanceFilters";
import { AttendanceTable } from "@/components/AttendanceTable";
import { AttendanceDialog } from "@/components/AttendanceDialog";
import type { Attendance } from "@/types/attendance.type";

export default function Attendance() {
  const {
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
  } = useAttendances();

  useEventStream<Attendance>("attendance:created", prependAttendance);
  useEventStream<Attendance>("attendance:updated", updateAttendance);

  const [detailAttendance, setDetailAttendance] = useState<Attendance | null>(
    null,
  );

  return (
    <>
      <AttendanceFilters
        search={search}
        onSearch={setSearch}
        department={department}
        onDepartment={(v) => {
          setDepartment(v);
          setPage(1);
        }}
        date={date}
        onDate={(v) => {
          setDate(v);
          setPage(1);
        }}
      />

      <Card className="bg-[#0F172A] text-white border border-white/10 mb-4 h-112 flex justify-between">
        <AttendanceTable data={attendanceData} onDetail={setDetailAttendance} />

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

      <AttendanceDialog
        detailAttendance={detailAttendance}
        onCloseDetail={() => setDetailAttendance(null)}
      />
    </>
  );
}
