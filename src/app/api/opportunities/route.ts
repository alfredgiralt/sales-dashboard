import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const opportunities = await prisma.opportunity.findMany({
    include: { account: { select: { id: true, name: true, category: true } } },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(opportunities);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const weightedValue =
    (body.estimatedValue || 0) * ((body.probabilityOfClose || 0) / 100);
  const opportunity = await prisma.opportunity.create({
    data: { ...body, weightedValue },
  });
  return NextResponse.json(opportunity, { status: 201 });
}
