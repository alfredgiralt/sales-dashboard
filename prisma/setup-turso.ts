import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function main() {
  console.log("Creating tables in Turso...");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS Account (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      mainContact TEXT NOT NULL DEFAULT '',
      contactRole TEXT NOT NULL DEFAULT '',
      contactEmail TEXT NOT NULL DEFAULT '',
      contactPhone TEXT NOT NULL DEFAULT '',
      owner TEXT NOT NULL DEFAULT '',
      strategicRelevance TEXT NOT NULL DEFAULT 'Medium',
      notes TEXT NOT NULL DEFAULT '',
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL
    )
  `);
  console.log("  ✓ Account table created");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS Opportunity (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      accountId TEXT NOT NULL,
      owner TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'New lead',
      priority TEXT NOT NULL DEFAULT 'Medium',
      estimatedValue REAL NOT NULL DEFAULT 0,
      probabilityOfClose INTEGER NOT NULL DEFAULT 0,
      weightedValue REAL NOT NULL DEFAULT 0,
      expectedCloseHorizon TEXT NOT NULL DEFAULT 'Unknown',
      opportunityType TEXT NOT NULL DEFAULT '',
      businessModel TEXT NOT NULL DEFAULT '',
      strategicRelevance TEXT NOT NULL DEFAULT 'Medium',
      mainContact TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      nextStep TEXT NOT NULL DEFAULT '',
      nextStepDueDate DATETIME,
      lastInteractionDate DATETIME,
      mainRisk TEXT NOT NULL DEFAULT '',
      riskType TEXT NOT NULL DEFAULT '',
      riskLevel TEXT NOT NULL DEFAULT 'Low',
      riskDescription TEXT NOT NULL DEFAULT '',
      mitigationAction TEXT NOT NULL DEFAULT '',
      blocked BOOLEAN NOT NULL DEFAULT false,
      blockerDescription TEXT NOT NULL DEFAULT '',
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL,
      CONSTRAINT Opportunity_accountId_fkey FOREIGN KEY (accountId) REFERENCES Account (id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);
  console.log("  ✓ Opportunity table created");

  console.log("Done! Turso database is ready.");
}

main().catch(console.error);
