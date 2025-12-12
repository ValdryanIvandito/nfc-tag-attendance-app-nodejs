// // src/components/layout/MainLayout.tsx
// import type { ReactNode } from "react";
// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";
// import MobileSidebar from "./MobileSidebar";

// interface Props {
//   children: ReactNode;
// }

// export default function MainLayout({ children }: Props) {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="flex bg-[#0B1120] text-white min-h-screen">
//       {/* Desktop sidebar (hidden on small screens) */}
//       <Sidebar />

//       {/* Mobile drawer */}
//       <MobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

//       {/* Content area */}
//       <div className="flex-1 flex flex-col">
//         <Topbar onOpenMobile={() => setMobileOpen(true)} />
//         <main className="p-4 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// }

// src/components/layout/MainLayout.tsx
import type { ReactNode } from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileSidebar from "./MobileSidebar";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex bg-[#0B1120] text-white min-h-screen">
      {/* Desktop sidebar - Show from large screens (1024px+) */}
      <Sidebar />

      {/* Mobile/Tablet drawer - Show below large screens */}
      <MobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenMobile={() => setMobileOpen(true)} />

        {/* Main content with proper padding and max-width for readability */}
        <main className="flex-1 p-3 sm:p-4 overflow-auto">
          <div className="max-w-[1600px] mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
