/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/EmployeeDialogs.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Employee } from "@/types/employee.types.ts";
import { getStatusColor } from "@/utils/utils";

type Props = {
  editEmployee: Employee | null;
  newStatus: string;
  setNewStatus: (v: string) => void;
  onUpdate: () => Promise<void>;
  isUpdating: boolean;
  onCancelEdit: () => void;

  detailEmployee: Employee | null;
  onCloseDetail: () => void;

  deleteEmployeeId: number | null;
  onConfirmDelete: () => Promise<void>;
  onCancelDelete: () => void;
  isDeleting: boolean;
};

export const EmployeeDialogs: React.FC<Props> = ({
  editEmployee,
  newStatus,
  setNewStatus,
  onUpdate,
  isUpdating,
  onCancelEdit,
  detailEmployee,
  onCloseDetail,
  deleteEmployeeId,
  onConfirmDelete,
  onCancelDelete,
  isDeleting,
}) => {
  return (
    <>
      {/* EDIT */}
      <Dialog open={!!editEmployee} onOpenChange={onCancelEdit}>
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
              onClick={onCancelEdit}
              className="w-full sm:w-auto text-black hover:bg-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={onUpdate}
              disabled={isUpdating}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DETAIL */}
      <Dialog open={!!detailEmployee} onOpenChange={onCloseDetail}>
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
              onClick={onCloseDetail}
              className="w-full text-black hover:bg-slate-300"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM (AlertDialog) */}
      <AlertDialog
        open={!!deleteEmployeeId}
        onOpenChange={onCancelDelete as any}
      >
        <AlertDialogContent className="bg-slate-800 text-white border border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Employee?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              Are you sure you want to delete this employee? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="text-black hover:bg-slate-300"
              onClick={onCancelDelete}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
