import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    const leads = inquiries.map((item: any) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      intent: item.intent || "general",
      status: item.status === "UNREAD" ? "unread" : "read",
      date: item.createdAt.toISOString(),
      message: item.message,
      subject: item.subject,
    }));

    return NextResponse.json({ leads });
  } catch (error: any) {
    console.error("GET /api/admin/leads error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load leads" },
      { status: 500 }
    );
  }
}
