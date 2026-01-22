/* src/components/EmployeeActions.tsx */

import React from "react";
import { Info, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  status: string;
  onDetail: () => void;
  onEdit: () => void;
  onDeleteClick: () => void;
};

export const EmployeeActions: React.FC<Props> = ({
  status,
  onDetail,
  onEdit,
  onDeleteClick,
}) => {
  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Button
        size="sm"
        className="xl:hidden bg-transparent hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 px-2"
        onClick={onDetail}
      >
        <Info className="w-4 h-4" />
        <span className="hidden sm:inline ml-1">Detail</span>
      </Button>

      {status === "ACTIVE" && (
        <>
          <Button
            size="sm"
            className="bg-transparent hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 px-2"
            onClick={onEdit}
          >
            <Pencil className="w-4 h-4" />
            <span className="hidden sm:inline ml-1">Edit</span>
          </Button>
        </>
      )}

      {status === "ACTIVE" && (
        <>
          <Button
            size="sm"
            className="bg-transparent hover:bg-red-500/10 text-red-500 hover:text-red-400 px-2"
            onClick={onDeleteClick}
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline ml-1">Delete</span>
          </Button>
        </>
      )}
    </div>
  );
};
