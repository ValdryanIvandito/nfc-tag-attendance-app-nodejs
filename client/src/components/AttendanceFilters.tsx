// src/components/EmployeeFilters.tsx
import React from "react";
import { Search, Filter, ChevronDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toLocalDateShortText } from "@/utils/utils";
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
  onDate,
}) => {
  const [open, setOpen] = React.useState(false);
  const [datePick, setDatePick] = React.useState<Date | undefined>(undefined);

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
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal bg-[#0F172A] text-white border border-white/80 hover:bg-transparent hover:text-white"
                  >
                    {datePick
                      ? toLocalDateShortText(datePick)
                      : toLocalDateShortText(new Date())}
                    <ChevronDownIcon className="bg-slate-800 text-white" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  className=" w-auto overflow-hidden p-0 bg-slate-800 text-white border-white/80 hover:text-white"
                >
                  <Calendar
                    mode="single"
                    selected={datePick}
                    captionLayout="dropdown"
                    className="
                            bg-slate-800 text-white

                            [&_.rdp-caption_label]:text-white
                            [&_.rdp-nav_button]:text-white
                            [&_.rdp-nav_button:hover]:bg-neutral-800

                            /* dropdown trigger */
                            [&_.rdp-dropdown]:bg-slate-800
                            [&_.rdp-dropdown]:text-white
                            [&_.rdp-dropdown]:border-white/20

                            /* dropdown content (yang PUTIH itu) */
                            [&_[data-radix-select-content]]:bg-slate-800
                            [&_[data-radix-select-viewport]]:bg-slate-800
                            [&_[data-radix-select-item]]:text-white
                            [&_[data-radix-select-item]:hover]:bg-neutral-800
                            [&_[data-radix-select-item][data-state=checked]]:bg-neutral-700
                          "
                    onSelect={(date) => {
                      onDate(date);
                      setDatePick(date);
                      setOpen(false);
                    }}
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
