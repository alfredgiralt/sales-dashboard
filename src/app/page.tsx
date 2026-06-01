import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";
import DashboardCharts from "@/components/DashboardCharts";
import KpiCard from "@/components/KpiCard";
import {
  Building2,
  Target,
  AlertTriangle,
  Clock,
  TrendingUp,
  DollarSign,
  Flame,
  CalendarClock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const accounts = await prisma.account.findMany();
  const opportunities = await prisma.opportunity.findMany({
    include: { account: { select: { name: true, category: true } } },
  });

  const activeOpps = opportunities.filter(
    (o) => !["Closed won", "Closed lost", "On hold"].includes(o.status)
  );
  const highPriority = activeOpps.filter((o) => o.priority === "High");
  const highRisk = activeOpps.filter((o) => o.riskLevel === "High");

  const now = new Date();
  const overdueOpps = activeOpps.filter(
    (o) => o.nextStepDueDate && new Date(o.nextStepDueDate) < now
  );
  const closingThisQuarter = activeOpps.filter(
    (o) =>
      o.expectedCloseHorizon === "This quarter" ||
      o.expectedCloseHorizon === "This month"
  );

  const totalPipeline = activeOpps.reduce(
    (sum, o) => sum + o.estimatedValue,
    0
  );
  const weightedPipeline = activeOpps.reduce(
    (sum, o) => sum + o.weightedValue,
    0
  );

  const statusCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  const riskCounts: Record<string, number> = {};
  const horizonCounts: Record<string, number> = {};

  for (const o of activeOpps) {
    statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
    const cat = o.account?.category || "Unknown";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    riskCounts[o.riskLevel] = (riskCounts[o.riskLevel] || 0) + 1;
    horizonCounts[o.expectedCloseHorizon] =
      (horizonCounts[o.expectedCloseHorizon] || 0) + 1;
  }

  const toChartData = (counts: Record<string, number>) =>
    Object.entries(counts).map(([name, value]) => ({ name, value }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="Active Accounts"
          value={accounts.length}
          icon={Building2}
          color="text-blue-600"
        />
        <KpiCard
          title="Active Opportunities"
          value={activeOpps.length}
          icon={Target}
          color="text-indigo-600"
        />
        <KpiCard
          title="High Priority"
          value={highPriority.length}
          icon={Flame}
          color="text-orange-600"
        />
        <KpiCard
          title="High Risk"
          value={highRisk.length}
          icon={AlertTriangle}
          color="text-red-600"
        />
        <KpiCard
          title="Overdue Next Steps"
          value={overdueOpps.length}
          icon={Clock}
          color="text-red-500"
        />
        <KpiCard
          title="Closing This Quarter"
          value={closingThisQuarter.length}
          icon={CalendarClock}
          color="text-green-600"
        />
        <KpiCard
          title="Total Pipeline"
          value={formatCurrency(totalPipeline)}
          icon={DollarSign}
          color="text-emerald-600"
        />
        <KpiCard
          title="Weighted Pipeline"
          value={formatCurrency(weightedPipeline)}
          icon={TrendingUp}
          color="text-teal-600"
        />
      </div>

      <DashboardCharts
        statusData={toChartData(statusCounts)}
        categoryData={toChartData(categoryCounts)}
        riskData={toChartData(riskCounts)}
        horizonData={toChartData(horizonCounts)}
      />
    </div>
  );
}
