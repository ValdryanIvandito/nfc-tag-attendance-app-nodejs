// // src/components/layout/MobileSidebar.tsx
// import { NavLink } from "react-router-dom";
// import { X } from "lucide-react";
// import type { FC } from "react";
// import { LayoutDashboard, Users2, Clock } from "lucide-react";

// interface MobileSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const MobileSidebar: FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
//           isOpen
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//         } lg:hidden`}
//         onClick={onClose}
//       />

//       {/* Drawer */}
//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-[#0F172A] text-white border-r border-white/10 z-50 transform transition-transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:hidden`}
//         aria-hidden={!isOpen}
//       >
//         <div className="p-6 font-bold text-xl flex items-center justify-between">
//           <span>📇 NFC Attendance</span>
//           <button onClick={onClose} aria-label="Close menu" className="p-1">
//             <X />
//           </button>
//         </div>

//         <nav className="flex-1 space-y-1 p-4">
//           <NavLink
//             to="/"
//             onClick={onClose}
//             className="block p-3 rounded-lg hover:bg-white/10"
//           >
//             <div className="flex items-center gap-2">
//               <LayoutDashboard size={18} />
//               <div>Dashboard</div>
//             </div>
//           </NavLink>
//           <NavLink
//             to="/employee"
//             onClick={onClose}
//             className="block p-3 rounded-lg hover:bg-white/10"
//           >
//             <div className="flex items-center gap-2">
//               <Users2 size={18} />
//               <div>Employees</div>
//             </div>
//           </NavLink>
//           <NavLink
//             to="/attendance"
//             onClick={onClose}
//             className="block p-3 rounded-lg hover:bg-white/10"
//           >
//             <div className="flex items-center gap-2">
//               <Clock size={18} />
//               <div>Attendance</div>
//             </div>
//           </NavLink>
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default MobileSidebar;

// src/components/layout/MobileSidebar.tsx
import { NavLink } from "react-router-dom";
import { X, LayoutDashboard, Users2, Clock } from "lucide-react";
import type { FC } from "react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay with smooth fade */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } lg:hidden`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Drawer with smooth slide animation */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] max-w-[85vw] bg-[#0F172A] text-white border-r border-white/10 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden shadow-2xl`}
        aria-hidden={!isOpen}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="bg-purple-300 p-2 rounded-full">
              <svg
                width="32"
                height="32"
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
            <span className="font-bold text-base sm:text-lg">Company</span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 hover:bg-white/10 rounded-md transition text-white/70 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-white/10 text-white shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/employee"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-white/10 text-white shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <Users2 size={20} />
            <span className="font-medium">Employees</span>
          </NavLink>

          <NavLink
            to="/attendance"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-white/10 text-white shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <Clock size={20} />
            <span className="font-medium">Attendance</span>
          </NavLink>
        </nav>

        {/* Footer Section (Optional) */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg">
            <img
              src="https://i.pravatar.cc/40"
              alt="User avatar"
              className="w-10 h-10 rounded-full ring-2 ring-white/10"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                Administrator
              </p>
              <p className="text-gray-400 text-xs truncate">
                admin@company.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
