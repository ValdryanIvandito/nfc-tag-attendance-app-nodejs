import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: string;
};

export const StatCard = ({ title, value, icon, accent }: StatCardProps) => {
  return (
    <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className={`text-3xl font-bold ${accent ?? "text-white"}`}>
            {value}
          </p>
        </div>
        <div className="rounded-xl bg-slate-700/50 p-3">{icon}</div>
      </CardContent>
    </Card>
  );
};
