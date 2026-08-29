import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ inquiries });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inquiries from database" },
      { status: 500 }
    );
  }
}
