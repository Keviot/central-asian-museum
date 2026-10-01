import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, intent, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const resolvedIntent =
      intent ||
      (subject?.toLowerCase().includes("visit")
        ? "visits"
        : subject?.toLowerCase().includes("research")
        ? "research"
        : subject?.toLowerCase().includes("donation")
        ? "donation"
        : "general");

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name,
        email: email.trim().toLowerCase(),
        phone: phone || null,
        subject: subject || "General Inquiry",
        intent: resolvedIntent,
        message,
        status: "UNREAD",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been received by the curatorial office.",
      inquiryId: inquiry.id,
    });
  } catch (error: any) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again later." },
      { status: 500 }
    );
  }
}
