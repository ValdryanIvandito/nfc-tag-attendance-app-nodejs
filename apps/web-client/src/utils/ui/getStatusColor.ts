/* src/utils/ui/getStatusColor.ts */

export const getStatusColor = (status: string): string => {
  switch (status) {
    // EMPLOYEE STATUS
    case "ACTIVE":
      return "bg-green-900/50 text-green-400 border border-green-600";

    case "INACTIVE":
      return "bg-gray-700/50 text-gray-400 border border-gray-600";

    // LEAVE STATUS
    case "SICK":
      return "bg-yellow-900/50 text-yellow-400 border border-yellow-600";

    case "ANNUAL":
      return "bg-blue-900/50 text-blue-400 border border-blue-600";

    case "MATERNITY":
      return "bg-pink-900/50 text-pink-300 border border-pink-600";

    case "PATERNITY":
      return "bg-cyan-900/50 text-cyan-300 border border-cyan-600";

    case "BEREAVEMENT":
      return "bg-purple-900/50 text-indigo-300 border border-indigo-600";

    case "MARRIAGE":
      return "bg-rose-900/50 text-rose-300 border border-rose-600";

    case "PARENTAL":
      return "bg-indigo-900/50 text-pink-300 border border-pink-600";

    case "STUDY":
      return "bg-teal-900/50 text-teal-300 border border-teal-600";

    case "RELIGIOUS":
      return "bg-orange-900/50 text-orange-300 border border-orange-600";

    default:
      return "bg-gray-700/50 text-gray-300 border border-gray-600";
  }
};
