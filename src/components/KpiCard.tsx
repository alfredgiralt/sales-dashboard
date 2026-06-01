import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  subtitle?: string;
}

export default function KpiCard({
  title,
  value,
  icon: Icon,
  color = "text-blue-600",
  subtitle,
}: KpiCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-start gap-4">
      <div className={`p-2.5 rounded-lg bg-gray-50 ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
