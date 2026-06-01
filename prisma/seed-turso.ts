import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join } from "path";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function main() {
  const sqlPath = join(__dirname, "data-dump.sql");
  const sql = readFileSync(sqlPath, "utf-8");

  const statements = sql
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("--"))
    .map((line) => line.trim());

  console.log(`Executing ${statements.length} SQL statements against Turso...`);

  let count = 0;
  for (const stmt of statements) {
    await client.execute(stmt);
    count++;
    if (count % 5 === 0) process.stdout.write(`  ${count}/${statements.length}\r`);
  }

  console.log(`\n✓ Done! ${count} statements executed.`);

  // Verify
  const accounts = await client.execute("SELECT COUNT(*) as c FROM Account");
  const opps = await client.execute("SELECT COUNT(*) as c FROM Opportunity");
  console.log(`  Accounts: ${accounts.rows[0].c}`);
  console.log(`  Opportunities: ${opps.rows[0].c}`);
}

main().catch(console.error);
