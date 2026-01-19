// src/components/EmployeeFilters.tsx
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  department: string;
  onDepartment: (v: string) => void;
  leave: string;
  onLeave: (v: string) => void;
  status: string;
  onStatus: (v: string) => void;
};

export const EmployeeFilters: React.FC<Props> = ({
  search,
  onSearch,
  onDepartment,
  onLeave,
  onStatus,
}) => {
  return (
    <div className="bg-[#0F172A] text-white border border-white/10 mb-4 p-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Select onValueChange={(val) => onDepartment(val)}>
              <SelectTrigger className="pl-9 w-full sm:w-[180px]">
                <SelectValue placeholder="All Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Department</SelectLabel>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="ENGINEERING">ENGINEERING</SelectItem>
                  <SelectItem value="DESIGN">DESIGN</SelectItem>
                  <SelectItem value="PRODUCT">PRODUCT</SelectItem>
                  <SelectItem value="MARKETING">MARKETING</SelectItem>
                  <SelectItem value="OPERATIONS">OPERATIONS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Select onValueChange={(val) => onLeave(val)}>
              <SelectTrigger className="pl-9 w-full sm:w-[180px]">
                <SelectValue placeholder="All Leave" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select leave Status</SelectLabel>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="SICK">SICK</SelectItem>
                  <SelectItem value="MATERNITY">MATERNITY</SelectItem>
                  <SelectItem value="PATERNITY">PATERNITY</SelectItem>
                  <SelectItem value="ANNUAL">ANNUAL</SelectItem>
                  <SelectItem value="BEREAVEMENT">BEREAVEMENT</SelectItem>
                  <SelectItem value="MARRIAGE">MARRIAGE</SelectItem>
                  <SelectItem value="PARENTAL">PARENTAL</SelectItem>
                  <SelectItem value="STUDY">STUDY</SelectItem>
                  <SelectItem value="RELIGIOUS">RELIGIOUS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Select onValueChange={(val) => onStatus(val)}>
              <SelectTrigger className="pl-9 w-full sm:w-[180px]">
                <SelectValue placeholder="ACTIVE" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Employee Status</SelectLabel>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
