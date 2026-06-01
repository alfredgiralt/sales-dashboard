"use client";

import { useState } from "react";
import {
  STATUSES,
  PRIORITIES,
  RISK_LEVELS,
  RISK_TYPES,
  CLOSE_HORIZONS,
  RELEVANCE_LEVELS,
} from "@/lib/constants";

interface OpportunityFormProps {
  initial?: {
    name: string;
    accountId: string;
    owner: string;
    status: string;
    priority: string;
    estimatedValue: number;
    probabilityOfClose: number;
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
  };
  accounts: { id: string; name: string }[];
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
}

function toDateInput(val: Date | string | null | undefined): string {
  if (!val) return "";
  const d = new Date(val);
  return d.toISOString().split("T")[0];
}

export default function OpportunityForm({
  initial,
  accounts,
  onSave,
  onCancel,
}: OpportunityFormProps) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    accountId: initial?.accountId || accounts[0]?.id || "",
    owner: initial?.owner || "",
    status: initial?.status || "New lead",
    priority: initial?.priority || "Medium",
    estimatedValue: initial?.estimatedValue || 0,
    probabilityOfClose: initial?.probabilityOfClose || 0,
    expectedCloseHorizon: initial?.expectedCloseHorizon || "Unknown",
    opportunityType: initial?.opportunityType || "",
    businessModel: initial?.businessModel || "",
    strategicRelevance: initial?.strategicRelevance || "Medium",
    mainContact: initial?.mainContact || "",
    notes: initial?.notes || "",
    nextStep: initial?.nextStep || "",
    nextStepDueDate: toDateInput(initial?.nextStepDueDate),
    lastInteractionDate: toDateInput(initial?.lastInteractionDate),
    mainRisk: initial?.mainRisk || "",
    riskType: initial?.riskType || "",
    riskLevel: initial?.riskLevel || "Low",
    riskDescription: initial?.riskDescription || "",
    mitigationAction: initial?.mitigationAction || "",
    blocked: initial?.blocked || false,
    blockerDescription: initial?.blockerDescription || "",
  });

  const set = (field: string, value: string | number | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      estimatedValue: Number(form.estimatedValue),
      probabilityOfClose: Number(form.probabilityOfClose),
      nextStepDueDate: form.nextStepDueDate
        ? new Date(form.nextStepDueDate).toISOString()
        : null,
      lastInteractionDate: form.lastInteractionDate
        ? new Date(form.lastInteractionDate).toISOString()
        : null,
    };
    onSave(data);
  };

  const weightedValue =
    Number(form.estimatedValue) * (Number(form.probabilityOfClose) / 100);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset>
        <legend className="text-sm font-semibold text-gray-800 mb-3">
          Basic Information
        </legend>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opportunity Name *
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account *
            </label>
            <select
              required
              value={form.accountId}
              onChange={(e) => set("accountId", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner
            </label>
            <input
              value={form.owner}
              onChange={(e) => set("owner", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={form.priority}
              onChange={(e) => set("priority", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-gray-800 mb-3">
          Value & Close
        </legend>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Value (EUR)
            </label>
            <input
              type="number"
              min={0}
              value={form.estimatedValue}
              onChange={(e) => set("estimatedValue", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Probability of Close (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={form.probabilityOfClose}
              onChange={(e) => set("probabilityOfClose", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weighted Value
            </label>
            <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-700 font-medium">
              {new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0,
              }).format(weightedValue)}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Close Horizon
            </label>
            <select
              value={form.expectedCloseHorizon}
              onChange={(e) => set("expectedCloseHorizon", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CLOSE_HORIZONS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Strategic Relevance
            </label>
            <select
              value={form.strategicRelevance}
              onChange={(e) => set("strategicRelevance", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {RELEVANCE_LEVELS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Contact
            </label>
            <input
              value={form.mainContact}
              onChange={(e) => set("mainContact", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-gray-800 mb-3">
          Next Steps & Activity
        </legend>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Next Step
            </label>
            <input
              value={form.nextStep}
              onChange={(e) => set("nextStep", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={form.nextStepDueDate}
              onChange={(e) => set("nextStepDueDate", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Interaction Date
            </label>
            <input
              type="date"
              value={form.lastInteractionDate}
              onChange={(e) => set("lastInteractionDate", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Model
            </label>
            <input
              value={form.businessModel}
              onChange={(e) => set("businessModel", e.target.value)}
              placeholder="e.g. License, Managed Service, Project"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-gray-800 mb-3">
          Risk & Blockers
        </legend>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Risk Level
            </label>
            <select
              value={form.riskLevel}
              onChange={(e) => set("riskLevel", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {RISK_LEVELS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Risk Type
            </label>
            <select
              value={form.riskType}
              onChange={(e) => set("riskType", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">None</option>
              {RISK_TYPES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Risk
            </label>
            <input
              value={form.mainRisk}
              onChange={(e) => set("mainRisk", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Risk Description
            </label>
            <input
              value={form.riskDescription}
              onChange={(e) => set("riskDescription", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mitigation Action
            </label>
            <input
              value={form.mitigationAction}
              onChange={(e) => set("mitigationAction", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mt-6">
              <input
                type="checkbox"
                checked={form.blocked}
                onChange={(e) => set("blocked", e.target.checked)}
                className="rounded border-gray-300"
              />
              Blocked
            </label>
          </div>
          {form.blocked && (
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blocker Description
              </label>
              <input
                value={form.blockerDescription}
                onChange={(e) => set("blockerDescription", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-gray-800 mb-3">
          Notes
        </legend>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </fieldset>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {initial ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
