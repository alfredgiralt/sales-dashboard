import { prisma } from "@/lib/prisma";
import RisksClient from "./RisksClient";

export const dynamic = "force-dynamic";

export default async function RisksPage() {
  const opportunities = await prisma.opportunity.findMany({
    where: {
      NOT: { status: { in: ["Closed won", "Closed lost"] } },
    },
    include: { account: { select: { name: true } } },
  });
  return <RisksClient opportunities={opportunities} />;
}
