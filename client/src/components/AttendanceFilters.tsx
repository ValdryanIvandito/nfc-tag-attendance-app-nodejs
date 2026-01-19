// src/components/EmployeeFilters.tsx
import React from "react";
import { Search, Filter, ChevronDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toDateShortText } from "@/utils/date/toDateShortText";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  department: string;
  onDepartment: (v: string) => void;
  date: Date | undefined;
  onDate: (v: Date | undefined) => void;
};

export const AttendanceFilters: React.FC<Props> = ({
  search,
  onSearch,
  onDepartment,
  date,
  onDate,
}) => {
  const [open, setOpen] = React.useState(false);
  console.log("Test toDateShortText:", toDateShortText(date));

  return (
    <div className="bg-[#0F172A] text-white border border-white/10 mb-4 p-4">
      <div className="flex flex-col md:flex-row gap-3">
        {/* SEARCH BAR */}
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
          {/* DEPARTMENT FILTER */}
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
                  <SelectItem value="PRODUCT">PRODUCT</SelectItem>
                  <SelectItem value="MARKETING">MARKETING</SelectItem>
                  <SelectItem value="DESIGN">DESIGN</SelectItem>
                  <SelectItem value="OPERATIONS">OPERATIONS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* DATE PICKER */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal bg-[#0F172A] text-white border border-white/80 hover:bg-transparent hover:text-white"
                  >
                    {date ? toDateShortText(date) : "Select date"}
                    <ChevronDownIcon className="bg-slate-800 text-white" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  className="w-auto overflow-hidden p-0 bg-slate-800 text-white border-white/80"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selected) => {
                      if (!selected) return;

                      // 🔒 Normalize the date to local midday to avoid timezone shift issues (UTC offset)
                      const safeDate = new Date(
                        selected.getFullYear(),
                        selected.getMonth(),
                        selected.getDate(),
                        12,
                        0,
                        0,
                      );

                      onDate(safeDate);
                      setOpen(false);
                    }}
                    captionLayout="dropdown"
                    className="
                    bg-slate-800 text-white
                    [&_.rdp-caption_label]:text-white
                    [&_.rdp-nav_button]:text-white
                    [&_.rdp-nav_button:hover]:bg-neutral-800
                    [&_.rdp-dropdown]:bg-slate-800
                    [&_.rdp-dropdown]:text-white
                    [&_.rdp-dropdown]:border-white/20
                  "
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
