import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const opportunity = await prisma.opportunity.findUnique({
    where: { id },
    include: { account: true },
  });
  if (!opportunity) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(opportunity);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const weightedValue =
    (body.estimatedValue || 0) * ((body.probabilityOfClose || 0) / 100);
  const opportunity = await prisma.opportunity.update({
    where: { id },
    data: { ...body, weightedValue },
  });
  return NextResponse.json(opportunity);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.opportunity.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
