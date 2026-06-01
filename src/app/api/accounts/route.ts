import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const accounts = await prisma.account.findMany({
    include: {
      opportunities: {
        select: { id: true, status: true, lastInteractionDate: true, nextStepDueDate: true },
      },
    },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(accounts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const account = await prisma.account.create({ data: body });
  return NextResponse.json(account, { status: 201 });
}
