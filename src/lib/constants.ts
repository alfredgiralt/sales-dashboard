export const STATUSES = [
  "New lead",
  "Exploration",
  "Discovery",
  "Proposal",
  "Validation / First Project",
  "Negotiation",
  "Closed won",
  "Closed lost",
  "On hold",
] as const;

export const PRIORITIES = ["Low", "Medium", "High"] as const;

export const RELEVANCE_LEVELS = ["Low", "Medium", "High"] as const;

export const RISK_LEVELS = ["Low", "Medium", "High"] as const;

export const CLOSE_HORIZONS = [
  "This month",
  "This quarter",
  "Next quarter",
  "Later",
  "Unknown",
] as const;

export const RISK_TYPES = [
  "Timing risk",
  "Partial client interest",
  "Internal technical resistance",
  "Collaboration model undefined",
  "Too many opportunities open",
  "Technical capacity constraint",
  "No clear decision-maker",
  "Data access dependency",
  "Procurement complexity",
  "Low urgency",
  "Other",
] as const;

export const CATEGORIES = [
  "Digital Consultancies",
  "Public Sector",
  "Media / Platforms",
  "Blue Sky / Strategic Opportunities",
] as const;

export const STATUS_COLORS: Record<string, string> = {
  "New lead": "bg-blue-100 text-blue-800",
  "Exploration": "bg-purple-100 text-purple-800",
  "Discovery": "bg-indigo-100 text-indigo-800",
  "Proposal": "bg-amber-100 text-amber-800",
  "Validation / First Project": "bg-cyan-100 text-cyan-800",
  "Negotiation": "bg-orange-100 text-orange-800",
  "Closed won": "bg-green-100 text-green-800",
  "Closed lost": "bg-red-100 text-red-800",
  "On hold": "bg-gray-100 text-gray-600",
};

export const PRIORITY_COLORS: Record<string, string> = {
  Low: "bg-gray-100 text-gray-700",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
};

export const RISK_COLORS: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
};

export const RELEVANCE_COLORS: Record<string, string> = {
  Low: "bg-gray-100 text-gray-700",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-purple-100 text-purple-800",
};
