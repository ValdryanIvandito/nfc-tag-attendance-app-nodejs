/* src/pages/Home.tsx */

import { useDashboard } from "@/hooks/useDashboard";
import { StatCard } from "@/components/StatCard";
import {
  Users,
  UserCheck,
  HeartPulse,
  Baby,
  Plane,
  AlertTriangle,
  Heart,
  GraduationCap,
  Landmark,
} from "lucide-react";

export default function Home() {
  const { dashboardData } = useDashboard();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      <StatCard
        title="Active Employees"
        value={Number(dashboardData?.totalActive ?? 0)}
        accent="text-emerald-400"
        icon={<Users className="h-6 w-6 text-emerald-400" />}
      />

      <StatCard
        title="Present Today"
        value={Number(dashboardData?.presentToday ?? 0)}
        accent="text-sky-400"
        icon={<UserCheck className="h-6 w-6 text-sky-400" />}
      />

      <StatCard
        title="Total Leave"
        value={Number(dashboardData?.totalLeave ?? 0)}
        accent="text-amber-400"
        icon={<Plane className="h-6 w-6 text-amber-400" />}
      />

      <StatCard
        title="Annual Leave"
        value={Number(dashboardData?.totalAnnual ?? 0)}
        accent="text-blue-400"
        icon={<Plane className="h-6 w-6 text-blue-400" />}
      />

      <StatCard
        title="Sick Leave"
        value={Number(dashboardData?.totalSick ?? 0)}
        accent="text-red-400"
        icon={<HeartPulse className="h-6 w-6 text-red-400" />}
      />

      <StatCard
        title="Maternity Leave"
        value={Number(dashboardData?.totalMaternity ?? 0)}
        accent="text-pink-400"
        icon={<Baby className="h-6 w-6 text-pink-400" />}
      />

      <StatCard
        title="Paternity Leave"
        value={Number(dashboardData?.totalPaternity ?? 0)}
        accent="text-cyan-400"
        icon={<Baby className="h-6 w-6 text-cyan-400" />}
      />

      <StatCard
        title="Bereavement Leave"
        value={Number(dashboardData?.totalBereavement ?? 0)}
        accent="text-purple-400"
        icon={<AlertTriangle className="h-6 w-6 text-purple-400" />}
      />

      <StatCard
        title="Marriage Leave"
        value={Number(dashboardData?.totalMarriage ?? 0)}
        accent="text-rose-400"
        icon={<Heart className="h-6 w-6 text-rose-400" />}
      />

      <StatCard
        title="Parental Leave"
        value={Number(dashboardData?.totalParental ?? 0)}
        accent="text-indigo-400"
        icon={<Baby className="h-6 w-6 text-indigo-400" />}
      />

      <StatCard
        title="Study Leave"
        value={Number(dashboardData?.totalStudy ?? 0)}
        accent="text-teal-400"
        icon={<GraduationCap className="h-6 w-6 text-teal-400" />}
      />

      <StatCard
        title="Religious Leave"
        value={Number(dashboardData?.totalReligious ?? 0)}
        accent="text-orange-400"
        icon={<Landmark className="h-6 w-6 text-orange-400" />}
      />
    </div>
  );
}
