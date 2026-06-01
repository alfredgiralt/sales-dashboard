import { prisma } from "@/lib/prisma";
import ThisWeekClient from "./ThisWeekClient";

export const dynamic = "force-dynamic";

export default async function ThisWeekPage() {
  const opportunities = await prisma.opportunity.findMany({
    where: {
      NOT: { status: { in: ["Closed won", "Closed lost"] } },
    },
    include: { account: { select: { name: true } } },
  });
  return <ThisWeekClient opportunities={opportunities} />;
}
