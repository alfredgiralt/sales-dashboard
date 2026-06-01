import { PrismaClient } from "@prisma/client";
import { writeFileSync } from "fs";

const prisma = new PrismaClient();

function escapeSQL(val: unknown): string {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "1" : "0";
  if (typeof val === "number") return String(val);
  if (val instanceof Date) return `'${val.toISOString()}'`;
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function main() {
  const accounts = await prisma.account.findMany();
  const opportunities = await prisma.opportunity.findMany();

  const lines: string[] = [];
  lines.push("-- Sales Dashboard Data Dump");
  lines.push(`-- Generated: ${new Date().toISOString()}`);
  lines.push(`-- Accounts: ${accounts.length}`);
  lines.push(`-- Opportunities: ${opportunities.length}`);
  lines.push("");

  lines.push("-- Clear existing data");
  lines.push("DELETE FROM Opportunity;");
  lines.push("DELETE FROM Account;");
  lines.push("");

  lines.push("-- Accounts");
  for (const a of accounts) {
    const cols = ["id","name","category","mainContact","contactRole","contactEmail","contactPhone","owner","strategicRelevance","notes","createdAt","updatedAt"];
    const vals = cols.map(c => escapeSQL((a as Record<string, unknown>)[c]));
    lines.push(`INSERT INTO Account (${cols.join(", ")}) VALUES (${vals.join(", ")});`);
  }

  lines.push("");
  lines.push("-- Opportunities");
  for (const o of opportunities) {
    const cols = ["id","name","accountId","owner","status","priority","estimatedValue","probabilityOfClose","weightedValue","expectedCloseHorizon","opportunityType","businessModel","strategicRelevance","mainContact","notes","nextStep","nextStepDueDate","lastInteractionDate","mainRisk","riskType","riskLevel","riskDescription","mitigationAction","blocked","blockerDescription","createdAt","updatedAt"];
    const vals = cols.map(c => escapeSQL((o as Record<string, unknown>)[c]));
    lines.push(`INSERT INTO Opportunity (${cols.join(", ")}) VALUES (${vals.join(", ")});`);
  }

  const output = lines.join("\n");
  writeFileSync("prisma/data-dump.sql", output, "utf-8");
  console.log(`Dump written to prisma/data-dump.sql`);
  console.log(`  ${accounts.length} accounts`);
  console.log(`  ${opportunities.length} opportunities`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
