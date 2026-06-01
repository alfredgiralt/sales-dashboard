"use client";

import PageHeader from "@/components/PageHeader";
import Badge from "@/components/Badge";
import KpiCard from "@/components/KpiCard";
import { RISK_COLORS, STATUS_COLORS } from "@/lib/constants";
import {
  AlertTriangle,
  Ban,
  HelpCircle,
  Clock,
  FileQuestion,
} from "lucide-react";

interface Opportunity {
  id: string;
  name: string;
  account: { name: string };
  owner: string;
  status: string;
  mainRisk: string;
  riskType: string;
  riskLevel: string;
  riskDescription: string;
  mitigationAction: string;
  blocked: boolean;
  blockerDescription: string;
  nextStep: string;
  nextStepDueDate: string | null;
  businessModel: string;
}

export default function RisksClient({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  const now = new Date();
  const highRisk = opportunities.filter((o) => o.riskLevel === "High");
  const blocked = opportunities.filter((o) => o.blocked);
  const noNextStep = opportunities.filter((o) => !o.nextStep);
  const undefinedModel = opportunities.filter((o) => !o.businessModel);
  const overdue = opportunities.filter(
    (o) => o.nextStepDueDate && new Date(o.nextStepDueDate) < now
  );

  const riskOpps = opportunities.filter(
    (o) =>
      o.riskLevel === "High" ||
      o.riskLevel === "Medium" ||
      o.blocked ||
      !o.nextStep ||
      (o.nextStepDueDate && new Date(o.nextStepDueDate) < now)
  );

  return (
    <div>
      <PageHeader
        title="Risk Dashboard"
        subtitle="Monitor commercial and operational risks"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <KpiCard
          title="High Risk"
          value={highRisk.length}
          icon={AlertTriangle}
          color="text-red-600"
        />
        <KpiCard
          title="Blocked"
          value={blocked.length}
          icon={Ban}
          color="text-red-700"
        />
        <KpiCard
          title="No Next Step"
          value={noNextStep.length}
          icon={HelpCircle}
          color="text-amber-600"
        />
        <KpiCard
          title="No Collab. Model"
          value={undefinedModel.length}
          icon={FileQuestion}
          color="text-purple-600"
        />
        <KpiCard
          title="Overdue"
          value={overdue.length}
          icon={Clock}
          color="text-red-500"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Opportunity
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Account
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Risk Level
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Risk Type
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Risk Description
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Mitigation
              </th>
              <th className="text-center px-4 py-3 font-semibold text-gray-700">
                Blocked
              </th>
            </tr>
          </thead>
          <tbody>
            {riskOpps.map((o) => (
              <tr
                key={o.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {o.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{o.account.name}</td>
                <td className="px-4 py-3">
                  <Badge
                    label={o.status}
                    colorClass={STATUS_COLORS[o.status]}
                  />
                </td>
                <td className="px-4 py-3">
                  <Badge
                    label={o.riskLevel}
                    colorClass={RISK_COLORS[o.riskLevel]}
                  />
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {o.riskType || "—"}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-[250px]">
                  {o.riskDescription || "—"}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-[200px]">
                  {o.mitigationAction || "—"}
                </td>
                <td className="px-4 py-3 text-center">
                  {o.blocked ? (
                    <span className="text-red-500 font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
              </tr>
            ))}
            {riskOpps.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No risk items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
