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
    const exhibition = await prisma.exhibition.findUnique({
      where: { id },
      include: {
        highlights: true,
      },
    });

    if (!exhibition) {
      return NextResponse.json(
        { error: "Exhibition not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ exhibition });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch exhibition details" },
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
      subtitle,
      slug,
      category,
      dateRange,
      location,
      imageSrc,
      imageAlt,
      description,
      curatorialEssay,
      curator,
      status,
      badgeLabel,
      featuredOnHome,
      highlights,
    } = body;

    const updated = await prisma.exhibition.update({
      where: { id },
      data: {
        title,
        subtitle,
        slug,
        category,
        dateRange,
        location,
        imageSrc,
        imageAlt,
        description,
        curatorialEssay,
        curator,
        status,
        badgeLabel,
        featuredOnHome,
      },
      include: {
        highlights: true,
      },
    });

    return NextResponse.json({
      success: true,
      exhibition: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update exhibition" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  try {
    const { id } = await params;
    await prisma.exhibition.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Exhibition deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete exhibition" },
      { status: 500 }
    );
  }
}
