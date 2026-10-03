import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return NextResponse.json(
        {
          error: `File size (${fileSizeMB}MB) exceeds the maximum upload limit of 10MB. Please choose an image smaller than 10MB.`,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cloudinary Credentials Check
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (cloudName && uploadPreset) {
      try {
        const cldFormData = new FormData();
        const blob = new Blob([buffer], { type: file.type || "image/jpeg" });
        cldFormData.append("file", blob, file.name);
        cldFormData.append("upload_preset", uploadPreset);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const cldRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: cldFormData,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const cldData = await cldRes.json();
        if (cldRes.ok && cldData.secure_url) {
          return NextResponse.json({
            success: true,
            url: cldData.secure_url,
            filename: cldData.public_id,
          });
        }
      } catch (cldErr) {
        console.warn("Cloudinary upload failed, falling back to local uploads:", cldErr);
      }
    }

    // Local Storage Fallback
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, "-");
    const filename = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);
    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      filename: filename,
    });
  } catch (error: any) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

