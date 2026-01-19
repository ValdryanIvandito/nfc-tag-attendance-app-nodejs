// // src/components/layout/Topbar.tsx
// import { Menu } from "lucide-react";
// import type { FC } from "react";

// interface TopbarProps {
//   onOpenMobile: () => void;
// }

// const Topbar: FC<TopbarProps> = ({ onOpenMobile }) => {
//   return (
//     <header className="w-full h-16 bg-[#0F172A] border-b border-white/10 flex items-center justify-between px-4 lg:px-6">
//       {/* Left: mobile menu button (visible on small screens) */}

//       <div className="flex items-center gap-3">
//         <button
//           className="lg:hidden text-white p-1"
//           onClick={onOpenMobile}
//           aria-label="Open menu"
//         >
//           <Menu size={24} />
//         </button>

//         <div className="text-white font-semibold text-lg">Dashboard</div>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2">
//           <img
//             src="https://i.pravatar.cc/40"
//             className="w-8 h-8 rounded-full"
//           />
//           <span className="text-white/80 text-sm">Administrator</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;

// src/components/layout/Topbar.tsx
import { Menu, Bell } from "lucide-react";
import type { FC } from "react";

interface TopbarProps {
  titlePage: string;
  onOpenMobile: () => void;
}

const Topbar: FC<TopbarProps> = ({ titlePage, onOpenMobile }) => {
  return (
    <header className="sticky top-0 z-30 w-full h-14 sm:h-16 bg-[#0F172A] border-b border-white/10 flex items-center justify-between px-3 sm:px-4 lg:px-6">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-1.5 hover:bg-white/10 rounded-md transition"
          onClick={onOpenMobile}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Page Title - Responsive text size */}
        <div className="text-white font-semibold text-base sm:text-lg">
          {titlePage}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification Icon - Hidden on very small screens */}
        <button
          className="hidden sm:flex text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-md transition relative"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {/* Notification Badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile Section */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/10">
          <img
            src="https://i.pravatar.cc/40"
            alt="User avatar"
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full ring-2 ring-white/10"
          />
          {/* Username - Hidden on very small screens */}
          <span className="hidden sm:block text-white/80 text-sm font-medium">
            Administrator
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
