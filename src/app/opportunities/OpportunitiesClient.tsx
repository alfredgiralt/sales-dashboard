"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import OpportunityForm from "@/components/OpportunityForm";
import { formatCurrency, formatDate, daysUntil } from "@/lib/format";
import {
  STATUSES,
  PRIORITIES,
  RISK_LEVELS,
  CLOSE_HORIZONS,
  STATUS_COLORS,
  PRIORITY_COLORS,
  RISK_COLORS,
} from "@/lib/constants";
import { Plus, Search, Pencil, Trash2, AlertCircle, Clock, Ban } from "lucide-react";

interface Opportunity {
  id: string;
  name: string;
  accountId: string;
  account: { id: string; name: string; category: string };
  owner: string;
  status: string;
  priority: string;
  estimatedValue: number;
  probabilityOfClose: number;
  weightedValue: number;
  expectedCloseHorizon: string;
  opportunityType: string;
  businessModel: string;
  strategicRelevance: string;
  mainContact: string;
  notes: string;
  nextStep: string;
  nextStepDueDate: Date | string | null;
  lastInteractionDate: Date | string | null;
  mainRisk: string;
  riskType: string;
  riskLevel: string;
  riskDescription: string;
  mitigationAction: string;
  blocked: boolean;
  blockerDescription: string;
}

type SortField = "nextStepDueDate" | "weightedValue" | "priority" | "name";

export default function OpportunitiesClient({
  initialOpportunities,
  accounts,
}: {
  initialOpportunities: Opportunity[];
  accounts: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [opps, setOpps] = useState(initialOpportunities);
  const [search, setSearch] = useState("");
  const [filterAccount, setFilterAccount] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterRisk, setFilterRisk] = useState("");
  const [filterHorizon, setFilterHorizon] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("nextStepDueDate");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);

  const priorityOrder: Record<string, number> = { High: 0, Medium: 1, Low: 2 };

  const filtered = useMemo(() => {
    let result = opps.filter((o) => {
      if (
        search &&
        !o.name.toLowerCase().includes(search.toLowerCase()) &&
        !o.account.name.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (filterAccount && o.accountId !== filterAccount) return false;
      if (filterStatus && o.status !== filterStatus) return false;
      if (filterPriority && o.priority !== filterPriority) return false;
      if (filterRisk && o.riskLevel !== filterRisk) return false;
      if (filterHorizon && o.expectedCloseHorizon !== filterHorizon)
        return false;
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "weightedValue") return b.weightedValue - a.weightedValue;
      if (sortBy === "priority")
        return (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2);
      if (sortBy === "nextStepDueDate") {
        if (!a.nextStepDueDate && !b.nextStepDueDate) return 0;
        if (!a.nextStepDueDate) return 1;
        if (!b.nextStepDueDate) return -1;
        return (
          new Date(a.nextStepDueDate).getTime() -
          new Date(b.nextStepDueDate).getTime()
        );
      }
      return 0;
    });
    return result;
  }, [opps, search, filterAccount, filterStatus, filterPriority, filterRisk, filterHorizon, sortBy]);

  const refreshData = async () => {
    const res = await fetch("/api/opportunities");
    if (res.ok) setOpps(await res.json());
  };

  const handleSave = async (data: Record<string, unknown>) => {
    const url = editing
      ? `/api/opportunities/${editing.id}`
      : "/api/opportunities";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setModalOpen(false);
      setEditing(null);
      await refreshData();
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this opportunity?")) return;
    const res = await fetch(`/api/opportunities/${id}`, { method: "DELETE" });
    if (res.ok) {
      setOpps((prev) => prev.filter((o) => o.id !== id));
      router.refresh();
    }
  };

  const getDueDateFlag = (date: Date | string | null) => {
    const days = daysUntil(date);
    if (days === null) return null;
    if (days < 0)
      return (
        <span className="inline-flex items-center gap-1 text-red-600">
          <AlertCircle size={14} /> Overdue
        </span>
      );
    if (days <= 7)
      return (
        <span className="inline-flex items-center gap-1 text-amber-600">
          <Clock size={14} /> {days}d
        </span>
      );
    return null;
  };

  return (
    <div>
      <PageHeader
        title="Opportunities"
        subtitle={`${filtered.length} opportunities`}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} /> Add Opportunity
          </button>
        }
      />

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterAccount}
          onChange={(e) => setFilterAccount(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Accounts</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Risk Levels</option>
          {RISK_LEVELS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={filterHorizon}
          onChange={(e) => setFilterHorizon(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Horizons</option>
          {CLOSE_HORIZONS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortField)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="nextStepDueDate">Sort: Due Date</option>
          <option value="weightedValue">Sort: Weighted Value</option>
          <option value="priority">Sort: Priority</option>
          <option value="name">Sort: Name</option>
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Opportunity</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Account</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Owner</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Priority</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Value</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Prob.</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Weighted</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Horizon</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Next Step</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Due Date</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Risk</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-700">Flags</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr
                key={o.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate">
                  {o.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{o.account.name}</td>
                <td className="px-4 py-3 text-gray-600">{o.owner || "—"}</td>
                <td className="px-4 py-3">
                  <Badge label={o.status} colorClass={STATUS_COLORS[o.status]} />
                </td>
                <td className="px-4 py-3">
                  <Badge label={o.priority} colorClass={PRIORITY_COLORS[o.priority]} />
                </td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {formatCurrency(o.estimatedValue)}
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {o.probabilityOfClose}%
                </td>
                <td className="px-4 py-3 text-right font-medium text-gray-800">
                  {formatCurrency(o.weightedValue)}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {o.expectedCloseHorizon}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-[180px] truncate">
                  {o.nextStep || "—"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <div className="flex items-center gap-2">
                    {formatDate(o.nextStepDueDate)}
                    {getDueDateFlag(o.nextStepDueDate)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge label={o.riskLevel} colorClass={RISK_COLORS[o.riskLevel]} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-1">
                    {o.blocked && (
                      <span title="Blocked" className="text-red-500">
                        <Ban size={15} />
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-1">
                    <button
                      onClick={() => {
                        setEditing(o);
                        setModalOpen(true);
                      }}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(o.id)}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={14} className="px-4 py-8 text-center text-gray-400">
                  No opportunities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        title={editing ? "Edit Opportunity" : "New Opportunity"}
        wide
      >
        <OpportunityForm
          key={editing?.id || "new"}
          initial={editing || undefined}
          accounts={accounts}
          onSave={handleSave}
          onCancel={() => {
            setModalOpen(false);
            setEditing(null);
          }}
        />
      </Modal>
    </div>
  );
}
