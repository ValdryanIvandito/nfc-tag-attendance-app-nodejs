import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-900/50 text-green-400 border border-green-600";
    case "INACTIVE":
      return "bg-gray-700/50 text-gray-400 border border-gray-600";
    case "SICK":
      return "bg-yellow-900/50 text-yellow-400 border border-yellow-600";
    case "VACATION":
      return "bg-blue-900/50 text-blue-400 border border-blue-600";
    case "EMERGENCY":
      return "bg-red-900/50 text-red-400 border border-red-600";
    case "MATERNITY":
      return "bg-pink-900/50 text-pink-300 border border-pink-600";
    default:
      return "bg-gray-700/50 text-gray-300 border border-gray-600";
  }
}
