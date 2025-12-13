// src/components/EmployeeDialogs.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { extractTime } from "@/utils/utils";
import type { Attendance } from "@/types/attendance.type";

type Props = {
  detailAttendance: Attendance | null;
  onCloseDetail: () => void;
};

export const AttendanceDialog: React.FC<Props> = ({
  detailAttendance,
  onCloseDetail,
}) => {
  return (
    <>
      {/* DETAIL */}
      <Dialog open={!!detailAttendance} onOpenChange={onCloseDetail}>
        <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white border border-white/10">
          <DialogHeader>
            <DialogTitle>Attendance Detail</DialogTitle>
          </DialogHeader>

          {detailAttendance && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white">NAME:</span>
                <span className="font-medium">
                  {detailAttendance.Employee.full_name}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white">DEPARTMENT:</span>
                <span className="font-mono text-xs">
                  {detailAttendance.Employee.department}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white">POSITION:</span>
                <span className="font-medium">
                  {detailAttendance.Employee.position}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white">CHECK_IN:</span>
                <span>{extractTime(detailAttendance.check_in_at)}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white">CHECK_OUT:</span>
                <span>
                  {detailAttendance.check_out_at
                    ? extractTime(detailAttendance.check_out_at)
                    : "N/A"}
                </span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={onCloseDetail}
              className="w-full text-black hover:bg-slate-300"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
