import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter } as never);

async function main() {
  const accounts = await prisma.account.findMany();
  console.log(`✓ Connected to Turso! Found ${accounts.length} accounts.`);
  for (const a of accounts) {
    console.log(`  - ${a.name} (${a.category})`);
  }
  const opps = await prisma.opportunity.findMany();
  console.log(`  ${opps.length} opportunities.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
