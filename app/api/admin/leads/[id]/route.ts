import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const updated = await prisma.contactInquiry.update({
      where: { id },
      data: {
        status: status === "unread" ? "UNREAD" : "READ",
      },
    });

    return NextResponse.json({
      success: true,
      lead: {
        id: updated.id,
        status: updated.status === "UNREAD" ? "unread" : "read",
      },
    });
  } catch (error: any) {
    console.error("PATCH /api/admin/leads/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update lead status" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.contactInquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Lead deleted" });
  } catch (error: any) {
    console.error("DELETE /api/admin/leads/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete lead" },
      { status: 500 }
    );
  }
}
