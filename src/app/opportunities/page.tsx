import { prisma } from "@/lib/prisma";
import OpportunitiesClient from "./OpportunitiesClient";

export const dynamic = "force-dynamic";

export default async function OpportunitiesPage() {
  const opportunities = await prisma.opportunity.findMany({
    include: { account: { select: { id: true, name: true, category: true } } },
    orderBy: { updatedAt: "desc" },
  });
  const accounts = await prisma.account.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
  return (
    <OpportunitiesClient
      initialOpportunities={opportunities}
      accounts={accounts}
    />
  );
}
