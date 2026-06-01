"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import AccountForm from "@/components/AccountForm";
import { formatDate } from "@/lib/format";
import {
  CATEGORIES,
  RELEVANCE_LEVELS,
  RELEVANCE_COLORS,
} from "@/lib/constants";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

interface Account {
  id: string;
  name: string;
  category: string;
  mainContact: string;
  owner: string;
  strategicRelevance: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
  opportunities: {
    id: string;
    status: string;
    lastInteractionDate: Date | string | null;
    nextStepDueDate: Date | string | null;
  }[];
}

export default function AccountsClient({
  initialAccounts,
}: {
  initialAccounts: Account[];
}) {
  const router = useRouter();
  const [accounts, setAccounts] = useState(initialAccounts);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterRelevance, setFilterRelevance] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Account | null>(null);

  const filtered = useMemo(() => {
    return accounts.filter((a) => {
      if (search && !a.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (filterCategory && a.category !== filterCategory) return false;
      if (filterRelevance && a.strategicRelevance !== filterRelevance)
        return false;
      return true;
    });
  }, [accounts, search, filterCategory, filterRelevance]);

  const handleSave = async (data: Record<string, unknown>) => {
    if (editing) {
      const res = await fetch(`/api/accounts/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setModalOpen(false);
        setEditing(null);
        router.refresh();
        const updated = await fetch("/api/accounts").then((r) => r.json());
        setAccounts(updated);
      }
    } else {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setModalOpen(false);
        router.refresh();
        const updated = await fetch("/api/accounts").then((r) => r.json());
        setAccounts(updated);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this account and all its opportunities?")) return;
    const res = await fetch(`/api/accounts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setAccounts((prev) => prev.filter((a) => a.id !== id));
      router.refresh();
    }
  };

  const getHighestStatus = (
    opps: { status: string }[]
  ): string => {
    const order = [
      "Negotiation",
      "Validation / First Project",
      "Proposal",
      "Discovery",
      "Exploration",
      "New lead",
    ];
    for (const s of order) {
      if (opps.some((o) => o.status === s)) return s;
    }
    return opps.length > 0 ? opps[0].status : "—";
  };

  const getLatestDate = (
    opps: { lastInteractionDate: Date | string | null }[]
  ): Date | string | null => {
    const dates = opps
      .map((o) => o.lastInteractionDate)
      .filter(Boolean) as (Date | string)[];
    if (dates.length === 0) return null;
    return dates.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    )[0];
  };

  const getNextDueDate = (
    opps: { nextStepDueDate: Date | string | null }[]
  ): Date | string | null => {
    const dates = opps
      .map((o) => o.nextStepDueDate)
      .filter(Boolean) as (Date | string)[];
    if (dates.length === 0) return null;
    return dates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    )[0];
  };

  return (
    <div>
      <PageHeader
        title="Accounts"
        subtitle={`${filtered.length} accounts`}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} /> Add Account
          </button>
        }
      />

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search accounts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={filterRelevance}
          onChange={(e) => setFilterRelevance(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Relevance</option>
          {RELEVANCE_LEVELS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Account
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Category
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Contact
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Owner
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Relevance
              </th>
              <th className="text-center px-4 py-3 font-semibold text-gray-700">
                Opps
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Highest Status
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Last Activity
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">
                Next Due
              </th>
              <th className="text-center px-4 py-3 font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr
                key={a.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {a.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{a.category}</td>
                <td className="px-4 py-3 text-gray-600">{a.mainContact || "—"}</td>
                <td className="px-4 py-3 text-gray-600">{a.owner || "—"}</td>
                <td className="px-4 py-3">
                  <Badge
                    label={a.strategicRelevance}
                    colorClass={RELEVANCE_COLORS[a.strategicRelevance]}
                  />
                </td>
                <td className="px-4 py-3 text-center font-medium">
                  {a.opportunities.length}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {getHighestStatus(a.opportunities)}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {formatDate(getLatestDate(a.opportunities))}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {formatDate(getNextDueDate(a.opportunities))}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-1">
                    <button
                      onClick={() => {
                        setEditing(a);
                        setModalOpen(true);
                      }}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
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
                <td colSpan={10} className="px-4 py-8 text-center text-gray-400">
                  No accounts found.
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
        title={editing ? "Edit Account" : "New Account"}
      >
        <AccountForm
          key={editing?.id || "new"}
          initial={editing || undefined}
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
