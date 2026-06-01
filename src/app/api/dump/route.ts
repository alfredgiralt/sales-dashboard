import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function escapeSQL(val: unknown): string {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "1" : "0";
  if (typeof val === "number") return String(val);
  if (val instanceof Date) return `'${val.toISOString()}'`;
  return `'${String(val).replace(/'/g, "''")}'`;
}

export async function GET() {
  const accounts = await prisma.account.findMany();
  const opportunities = await prisma.opportunity.findMany();

  const lines: string[] = [];
  lines.push("-- Sales Dashboard Data Dump");
  lines.push(`-- Generated: ${new Date().toISOString()}`);
  lines.push(`-- Accounts: ${accounts.length}`);
  lines.push(`-- Opportunities: ${opportunities.length}`);
  lines.push("");
  lines.push("DELETE FROM Opportunity;");
  lines.push("DELETE FROM Account;");
  lines.push("");

  lines.push("-- Accounts");
  const accCols = ["id","name","category","mainContact","contactRole","contactEmail","contactPhone","owner","strategicRelevance","notes","createdAt","updatedAt"];
  for (const a of accounts) {
    const vals = accCols.map(c => escapeSQL((a as Record<string, unknown>)[c]));
    lines.push(`INSERT INTO Account (${accCols.join(", ")}) VALUES (${vals.join(", ")});`);
  }

  lines.push("");
  lines.push("-- Opportunities");
  const oppCols = ["id","name","accountId","owner","status","priority","estimatedValue","probabilityOfClose","weightedValue","expectedCloseHorizon","opportunityType","businessModel","strategicRelevance","mainContact","notes","nextStep","nextStepDueDate","lastInteractionDate","mainRisk","riskType","riskLevel","riskDescription","mitigationAction","blocked","blockerDescription","createdAt","updatedAt"];
  for (const o of opportunities) {
    const vals = oppCols.map(c => escapeSQL((o as Record<string, unknown>)[c]));
    lines.push(`INSERT INTO Opportunity (${oppCols.join(", ")}) VALUES (${vals.join(", ")});`);
  }

  const sql = lines.join("\n");

  return new NextResponse(sql, {
    headers: {
      "Content-Type": "application/sql",
      "Content-Disposition": "attachment; filename=sales-dashboard-data-dump.sql",
    },
  });
}
