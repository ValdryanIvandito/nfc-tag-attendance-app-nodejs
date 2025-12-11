import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeAPI } from "@/api/employee.api";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: employeeAPI.getAll,
  });
};

export const useCreateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: employeeAPI.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
};

export const useUpdateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: employeeAPI.update,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
};

export const useDeleteEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: employeeAPI.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
};
