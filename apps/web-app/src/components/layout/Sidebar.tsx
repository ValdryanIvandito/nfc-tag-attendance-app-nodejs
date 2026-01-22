/* src/components/layout/Sidebar.tsx */

import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users2, Clock } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="hidden lg:flex flex-col w-64 bg-[#0F172A] text-white border-r border-white/10">
      {/* Logo Section - Fixed Structure */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-300 p-2 rounded-full">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 8a3 3 0 0 1 0 6"></path>
              <path d="M19 5a8 8 0 0 1 0 14"></path>
              <path d="M3 12h1"></path>
              <path d="M8 12h1"></path>
              <path d="M12 12h1"></path>
            </svg>
          </div>
          <h1 className="text-lg font-semibold">Company Logo</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition 
             ${
               isActive
                 ? "bg-white/10 text-white"
                 : "text-gray-400 hover:text-white"
             }`
          }
        >
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition 
             ${
               isActive
                 ? "bg-white/10 text-white"
                 : "text-gray-400 hover:text-white"
             }`
          }
        >
          <Users2 size={18} /> Employees
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition 
             ${
               isActive
                 ? "bg-white/10 text-white"
                 : "text-gray-400 hover:text-white"
             }`
          }
        >
          <Clock size={18} /> Attendance
        </NavLink>
      </nav>
    </div>
  );
}
