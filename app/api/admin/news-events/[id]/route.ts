import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const newsEvent = await prisma.newsEvent.findUnique({
      where: { id },
    });

    if (!newsEvent) {
      return NextResponse.json(
        { error: "News event record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ newsEvent });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news event details" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      slug,
      category,
      date,
      readTime,
      location,
      imageSrc,
      imageAlt,
      summary,
      content,
      status,
    } = body;

    const updated = await prisma.newsEvent.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        date,
        readTime,
        location,
        imageSrc,
        imageAlt,
        summary,
        content,
        status,
      },
    });

    return NextResponse.json({
      success: true,
      newsEvent: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update news event" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  try {
    const { id } = await params;
    await prisma.newsEvent.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "News event deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete news event" },
      { status: 500 }
    );
  }
}
