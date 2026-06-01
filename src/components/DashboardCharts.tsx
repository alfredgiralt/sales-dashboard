"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#6366f1",
  "#f59e0b",
  "#06b6d4",
  "#f97316",
  "#22c55e",
  "#ef4444",
  "#6b7280",
];

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function DashboardCharts({
  statusData,
  categoryData,
  riskData,
  horizonData,
}: {
  statusData: ChartData[];
  categoryData: ChartData[];
  riskData: ChartData[];
  horizonData: ChartData[];
}) {
  const riskColors: Record<string, string> = {
    Low: "#22c55e",
    Medium: "#f59e0b",
    High: "#ef4444",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="Opportunities by Status">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={statusData} layout="vertical" margin={{ left: 80 }}>
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Opportunities by Category">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              dataKey="value"
              label={({ name, value }) => `${name.split("/")[0].trim()} (${value})`}
            >
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Opportunities by Risk Level">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={riskData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {riskData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={riskColors[entry.name] || COLORS[i]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Opportunities by Close Horizon">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={horizonData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
