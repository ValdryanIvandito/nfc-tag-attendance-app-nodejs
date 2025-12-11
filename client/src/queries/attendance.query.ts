import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceAPI } from "@/api/attendance.api";

export const useAttendance = () => {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: attendanceAPI.getAll,
  });
};

export const useCheckIn = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: attendanceAPI.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["attendance"] }),
  });
};

export const useCheckOut = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: attendanceAPI.update,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["attendance"] }),
  });
};
