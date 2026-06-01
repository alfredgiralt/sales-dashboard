"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Target,
  CalendarCheck,
  AlertTriangle,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/accounts", label: "Accounts", icon: Building2 },
  { href: "/opportunities", label: "Opportunities", icon: Target },
  { href: "/this-week", label: "This Week Focus", icon: CalendarCheck },
  { href: "/risks", label: "Risks", icon: AlertTriangle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-slate-800 text-slate-300 flex flex-col shrink-0 min-h-screen">
      <div className="px-5 py-5 border-b border-slate-700">
        <h1 className="text-lg font-bold text-white tracking-tight">
          Sales Dashboard
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">Pipeline Tracker</p>
      </div>
      <nav className="flex-1 py-3">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-slate-700 text-white font-medium border-r-2 border-blue-400"
                  : "hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-5 py-4 border-t border-slate-700 text-xs text-slate-500">
        v1.0 — Internal Use
      </div>
    </aside>
  );
}
