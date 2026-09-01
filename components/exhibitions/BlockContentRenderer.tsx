import Image from "next/image";
import {
  parseCuratorialBlocks,
  extractYouTubeId,
  ContentBlock,
} from "@/lib/cmsBlocks";

type BlockContentRendererProps = {
  essay: string;
  className?: string;
};

export function BlockContentRenderer({
  essay,
  className = "",
}: BlockContentRendererProps) {
  const blocks: ContentBlock[] = parseCuratorialBlocks(essay);

  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          // 1. PARAGRAPH BLOCK
          case "paragraph":
            return (
              <p
                key={block.id || idx}
                className="text-[15px] sm:text-[16px] leading-relaxed text-body font-normal mb-6"
              >
                {block.text}
              </p>
            );

          // 2. HEADING BLOCK
          case "heading":
            const HeadingTag = block.level === 3 ? "h3" : "h2";
            return (
              <HeadingTag
                key={block.id || idx}
                className="font-heading text-[24px] sm:text-[28px] font-semibold text-heading mt-8 mb-4 border-b border-palette-amber/40 pb-2"
              >
                {block.text}
              </HeadingTag>
            );

          // 3. INLINE IMAGE BLOCK
          case "image":
            return (
              <figure key={block.id || idx} className="my-8 space-y-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-xs border border-palette-sand/70 bg-bg-secondary shadow-xs">
                  <Image
                    src={block.url}
                    alt={block.alt || block.caption || "Exhibition detail artifact"}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover object-center"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-center font-mono text-[11.5px] uppercase tracking-wider text-palette-amber font-bold pt-1">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          // 4. YOUTUBE VIDEO EMBED BLOCK
          case "youtube": {
            const videoId = extractYouTubeId(block.videoUrl);
            if (!videoId) return null;

            return (
              <div key={block.id || idx} className="my-8 space-y-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-xs border border-palette-sand/70 bg-surface-dark shadow-md">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                    title={block.title || "Exhibition Walkthrough Video"}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {block.title && (
                  <p className="text-center font-mono text-[11.5px] uppercase tracking-wider text-palette-amber font-bold pt-1">
                    🎥 Curatorial Video: {block.title}
                  </p>
                )}
              </div>
            );
          }

          // 5. CUSTOM DATA TABLE BLOCK
          case "table":
            return (
              <div key={block.id || idx} className="my-8 overflow-x-auto border border-palette-sand/70 rounded-xs shadow-xs">
                <table className="w-full text-left text-[14px]">
                  {block.headers && block.headers.length > 0 && (
                    <thead className="bg-bg-secondary font-mono text-[11px] uppercase tracking-[0.16em] text-palette-amber border-b border-palette-sand/70">
                      <tr>
                        {block.headers.map((header, hIdx) => (
                          <th key={hIdx} className="py-3 px-4 font-bold">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody className="divide-y divide-palette-sand/40 bg-bg">
                    {block.rows?.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-bg-secondary/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-3.5 px-4 text-heading">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          // 6. BLOCKQUOTE BLOCK
          case "quote":
            return (
              <blockquote
                key={block.id || idx}
                className="my-8 border-l-4 border-palette-amber bg-bg-secondary/60 p-6 rounded-r-xs"
              >
                <p className="font-heading text-[20px] sm:text-[22px] font-normal italic leading-relaxed text-heading">
                  &ldquo;{block.text}&rdquo;
                </p>
                {block.author && (
                  <cite className="block mt-3 font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-palette-amber not-italic">
                    — {block.author}
                  </cite>
                )}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
