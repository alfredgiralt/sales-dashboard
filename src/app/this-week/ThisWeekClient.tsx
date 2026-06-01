"use client";

import PageHeader from "@/components/PageHeader";
import Badge from "@/components/Badge";
import { formatDate, daysUntil } from "@/lib/format";
import {
  STATUS_COLORS,
  PRIORITY_COLORS,
  RISK_COLORS,
} from "@/lib/constants";
import {
  AlertCircle,
  Clock,
  Flame,
  AlertTriangle,
  Ban,
  Ghost,
} from "lucide-react";

interface Opportunity {
  id: string;
  name: string;
  account: { name: string };
  owner: string;
  status: string;
  priority: string;
  nextStep: string;
  nextStepDueDate: string | null;
  lastInteractionDate: string | null;
  riskLevel: string;
  blocked: boolean;
  weightedValue: number;
  estimatedValue: number;
}

interface FocusItem {
  opportunity: Opportunity;
  reasons: { label: string; icon: React.ReactNode; color: string }[];
}

export default function ThisWeekClient({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000);

  const focusItems: FocusItem[] = [];

  for (const opp of opportunities) {
    const reasons: FocusItem["reasons"] = [];
    const days = daysUntil(opp.nextStepDueDate);

    if (days !== null && days < 0) {
      reasons.push({
        label: "Overdue next step",
        icon: <AlertCircle size={14} />,
        color: "text-red-600 bg-red-50",
      });
    } else if (days !== null && days <= 7) {
      reasons.push({
        label: `Due in ${days} day${days !== 1 ? "s" : ""}`,
        icon: <Clock size={14} />,
        color: "text-amber-600 bg-amber-50",
      });
    }

    if (opp.priority === "High") {
      reasons.push({
        label: "High priority",
        icon: <Flame size={14} />,
        color: "text-orange-600 bg-orange-50",
      });
    }

    if (opp.riskLevel === "High") {
      reasons.push({
        label: "High risk",
        icon: <AlertTriangle size={14} />,
        color: "text-red-600 bg-red-50",
      });
    }

    if (opp.blocked) {
      reasons.push({
        label: "Blocked",
        icon: <Ban size={14} />,
        color: "text-red-700 bg-red-50",
      });
    }

    if (opp.weightedValue >= 50000) {
      reasons.push({
        label: "High weighted value",
        icon: <Flame size={14} />,
        color: "text-emerald-600 bg-emerald-50",
      });
    }

    if (
      !opp.lastInteractionDate ||
      new Date(opp.lastInteractionDate) < thirtyDaysAgo
    ) {
      reasons.push({
        label: "No recent activity",
        icon: <Ghost size={14} />,
        color: "text-gray-500 bg-gray-100",
      });
    }

    if (reasons.length > 0) {
      focusItems.push({ opportunity: opp, reasons });
    }
  }

  focusItems.sort((a, b) => {
    const aOverdue = a.reasons.some((r) => r.label === "Overdue next step");
    const bOverdue = b.reasons.some((r) => r.label === "Overdue next step");
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;
    return b.reasons.length - a.reasons.length;
  });

  return (
    <div>
      <PageHeader
        title="This Week Focus"
        subtitle={`${focusItems.length} opportunities need attention`}
      />

      {focusItems.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            No opportunities need immediate attention. Great job!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {focusItems.map(({ opportunity: o, reasons }) => (
            <div
              key={o.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{o.name}</h3>
                    <Badge
                      label={o.status}
                      colorClass={STATUS_COLORS[o.status]}
                    />
                    <Badge
                      label={o.priority}
                      colorClass={PRIORITY_COLORS[o.priority]}
                    />
                    <Badge
                      label={o.riskLevel}
                      colorClass={RISK_COLORS[o.riskLevel]}
                    />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{o.account.name}</span>
                    <span>Owner: {o.owner || "—"}</span>
                    <span>Due: {formatDate(o.nextStepDueDate)}</span>
                    <span>Last activity: {formatDate(o.lastInteractionDate)}</span>
                  </div>
                  {o.nextStep && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Next step:</span>{" "}
                      {o.nextStep}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  {reasons.map((r, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${r.color}`}
                    >
                      {r.icon}
                      {r.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
