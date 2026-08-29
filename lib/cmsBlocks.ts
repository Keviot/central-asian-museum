export type ParagraphBlock = {
  id: string;
  type: "paragraph";
  text: string;
};

export type HeadingBlock = {
  id: string;
  type: "heading";
  level: 2 | 3;
  text: string;
};

export type ImageBlock = {
  id: string;
  type: "image";
  url: string;
  caption?: string;
  alt?: string;
};

export type YouTubeBlock = {
  id: string;
  type: "youtube";
  videoUrl: string;
  title?: string;
};

export type TableBlock = {
  id: string;
  type: "table";
  headers: string[];
  rows: string[][];
};

export type QuoteBlock = {
  id: string;
  type: "quote";
  text: string;
  author?: string;
};

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | YouTubeBlock
  | TableBlock
  | QuoteBlock;

// Extract YouTube Video ID from any URL format (youtube.com, youtu.be, shorts, embed)
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Parse string (JSON array or plain text paragraphs) into ContentBlock[]
export function parseCuratorialBlocks(rawEssayStr: string): ContentBlock[] {
  if (!rawEssayStr) return [];

  try {
    const parsed = JSON.parse(rawEssayStr);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (e) {
    // If raw string is plain text paragraphs, convert to ParagraphBlock[]
  }

  return rawEssayStr
    .split("\n\n")
    .filter((p) => p.trim().length > 0)
    .map((text, idx) => ({
      id: `p-${idx}-${Date.now()}`,
      type: "paragraph",
      text: text.trim(),
    }));
}

// Serialize ContentBlock[] to JSON string for database storage
export function serializeCuratorialBlocks(blocks: ContentBlock[]): string {
  return JSON.stringify(blocks);
}
