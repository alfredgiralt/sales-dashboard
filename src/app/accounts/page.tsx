import { prisma } from "@/lib/prisma";
import AccountsClient from "./AccountsClient";

export const dynamic = "force-dynamic";

export default async function AccountsPage() {
  const accounts = await prisma.account.findMany({
    include: {
      opportunities: {
        select: {
          id: true,
          status: true,
          lastInteractionDate: true,
          nextStepDueDate: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });
  return <AccountsClient initialAccounts={accounts} />;
}
