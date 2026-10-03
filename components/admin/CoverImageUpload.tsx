"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

interface CoverImageUploadProps {
  label?: string;
  required?: boolean;
  value: string;
  onChange: (url: string) => void;
  maxSizeMB?: number;
  className?: string;
}

/**
 * Fast client-side image optimizer:
 * Scales down large camera/phone photos to max 1920px and compresses to WebP in ~50ms.
 * Turns 5-10MB uploads into ~250-400KB payloads for near-instant network transmission.
 */
async function fastOptimizeImage(file: File): Promise<File> {
  if (
    !file.type.startsWith("image/") ||
    file.type.includes("svg") ||
    file.type.includes("gif") ||
    file.size < 500 * 1024
  ) {
    return file;
  }

  return new Promise((resolve) => {
    try {
      const img = new window.Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const MAX_DIMENSION = 1920;
        let { naturalWidth: width, naturalHeight: height } = img;

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              resolve(file);
              return;
            }
            const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const optimized = new File([blob], cleanName, { type: "image/webp" });
            resolve(optimized);
          },
          "image/webp",
          0.85
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(file);
      };

      img.src = objectUrl;
    } catch {
      resolve(file);
    }
  });
}

export function CoverImageUpload({
  label = "Cover Image",
  required = false,
  value,
  onChange,
  maxSizeMB = 10,
  className = "",
}: CoverImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const maxBytes = maxSizeMB * 1024 * 1024;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size against 10MB limit
    if (file.size > maxBytes) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setUploadError(
        `File size (${fileSizeMB}MB) exceeds the maximum upload limit of ${maxSizeMB}MB. Please select a smaller image under ${maxSizeMB}MB.`
      );
      e.target.value = "";
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      // 1. Instant client-side compression & downscaling (drastically speeds up network transfer)
      const fileToUpload = await fastOptimizeImage(file);

      // 2. Direct upload to Cloudinary (single network hop)
      const cldName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const cldPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (cldName && cldPreset) {
        try {
          const cldData = new FormData();
          cldData.append("file", fileToUpload);
          cldData.append("upload_preset", cldPreset);

          const cldRes = await fetch(`https://api.cloudinary.com/v1_1/${cldName}/image/upload`, {
            method: "POST",
            body: cldData,
          });

          const cldJson = await cldRes.json();
          if (cldRes.ok && cldJson.secure_url) {
            onChange(cldJson.secure_url);
            return;
          }
        } catch (cldErr) {
          console.warn("Direct Cloudinary upload failed, falling back to server route:", cldErr);
        }
      }

      // 3. Fallback: Fast upload via internal server route
      const data = new FormData();
      data.append("file", fileToUpload);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(
          json.error || `Upload failed. Please ensure the image is under ${maxSizeMB}MB.`
        );
      }

      onChange(json.url);
    } catch (err: any) {
      console.error("Cover image upload error:", err);
      setUploadError(
        err.message || `Failed to upload image. Maximum upload limit is ${maxSizeMB}MB.`
      );
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label and File Size Information */}
      <div className="flex items-center justify-between">
        <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
          {label} {required && "*"}
        </label>
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted font-medium">
          Max {maxSizeMB}MB • JPG, PNG, WEBP
        </span>
      </div>

      {/* Uploading State */}
      {isUploading ? (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-palette-amber/70 rounded-xs bg-palette-amber/5 text-center">
          <div className="h-6 w-6 border-2 border-palette-wine border-t-transparent rounded-full animate-spin mb-2" />
          <span className="text-[13px] font-mono font-bold text-palette-wine uppercase tracking-wider">
            Uploading Cover Image...
          </span>
          <span className="text-[11px] text-muted font-mono mt-1">
            Please wait while your image is uploading...
          </span>
        </div>
      ) : value ? (
        /* Image Preview State */
        <div className="flex items-center justify-between gap-4 p-3 rounded-xs border border-palette-sand/70 bg-bg-secondary">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xs border border-palette-sand bg-palette-sand/20">
            <Image
              src={value}
              alt="Cover preview"
              fill
              className="object-cover"
              unoptimized={value.startsWith("http")}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="px-3 py-1.5 rounded-xs border border-palette-sand/80 bg-white hover:border-palette-amber text-[11px] font-mono font-bold uppercase tracking-wider text-heading cursor-pointer shrink-0 transition-colors">
              <span>Change</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setUploadError(null);
              }}
              className="px-3 py-1.5 rounded-xs border border-red-400/60 bg-red-500/10 text-red-600 hover:bg-red-500/20 text-[11px] font-mono font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Icon name="trash" size={13} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Upload Zone */
        <label className="group flex flex-col items-center justify-center p-6 border-2 border-dashed border-palette-sand/80 rounded-xs bg-bg-secondary/50 hover:bg-bg-secondary hover:border-palette-amber cursor-pointer transition-colors text-center">
          <Icon
            name="upload"
            size={24}
            className="text-palette-amber group-hover:scale-105 transition-transform mb-2"
          />
          <span className="text-[13px] font-mono font-bold text-heading uppercase tracking-wider">
            Upload Cover Image
          </span>
          <span className="text-[11.5px] text-muted font-mono mt-1">
            Maximum upload limit: {maxSizeMB}MB (JPG, PNG, WEBP)
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </label>
      )}

      {/* Prominent Error Banner when file exceeds limit or upload fails */}
      {uploadError && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 p-3.5 rounded-xs border border-palette-wine/50 bg-palette-wine/10 text-palette-wine text-[12.5px] font-mono animate-in fade-in"
        >
          <div className="flex items-start gap-2.5">
            <Icon name="close" size={16} className="text-palette-wine shrink-0 mt-0.5" />
            <div>
              <p className="font-bold uppercase tracking-wider text-[11px]">
                Upload Limit Notice (Max {maxSizeMB}MB)
              </p>
              <p className="text-[12px] text-palette-wine/90 mt-0.5 leading-relaxed">
                {uploadError}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-palette-wine hover:opacity-70 text-[11px] font-bold uppercase tracking-wider shrink-0 cursor-pointer ml-2"
            title="Dismiss error"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
