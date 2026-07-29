import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
}

export function StatCard({
  title,
  value,
 icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <Icon className="h-6 w-6 text-sky-600" />
      </div>

      <h2 className="text-3xl font-bold text-slate-900">
        {value}
      </h2>
    </div>
  );
}