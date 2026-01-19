// src/components/EmployeeActions.tsx
import React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onDetail: () => void;
};

export const AttendanceAction: React.FC<Props> = ({ onDetail }) => {
  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Button
        size="sm"
        className="md:hidden bg-transparent hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 px-2"
        onClick={onDetail}
      >
        <Info className="w-4 h-4" />
      </Button>
    </div>
  );
};
