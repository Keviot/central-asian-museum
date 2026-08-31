"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  ContentBlock,
  parseCuratorialBlocks,
  serializeCuratorialBlocks,
  extractYouTubeId,
} from "@/lib/cmsBlocks";

type BlockContentEditorProps = {
  value: string;
  onChange: (serializedValue: string) => void;
};

export function BlockContentEditor({ value, onChange }: BlockContentEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(true);

  useEffect(() => {
    setBlocks(parseCuratorialBlocks(value));
  }, []);

  const updateBlocks = (newBlocks: ContentBlock[]) => {
    setBlocks(newBlocks);
    onChange(serializeCuratorialBlocks(newBlocks));
  };

  const addParagraph = () => {
    const newBlock: ContentBlock = {
      id: `p-${Date.now()}`,
      type: "paragraph",
      text: "",
    };
    updateBlocks([...blocks, newBlock]);
  };

  const addHeading = () => {
    const newBlock: ContentBlock = {
      id: `h-${Date.now()}`,
      type: "heading",
      level: 2,
      text: "",
    };
    updateBlocks([...blocks, newBlock]);
  };

  const addImage = () => {
    const newBlock: ContentBlock = {
      id: `img-${Date.now()}`,
      type: "image",
      url: "/images/exhibitions/silk-road-transformed.png",
      caption: "Artifact detail view in Gallery A",
      alt: "Museum artifact",
    };
    updateBlocks([...blocks, newBlock]);
  };

  const addYouTube = () => {
    const newBlock: ContentBlock = {
      id: `yt-${Date.now()}`,
      type: "youtube",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Curator Exhibition Walkthrough Video",
    };
    updateBlocks([...blocks, newBlock]);
  };

  const addTable = () => {
    const newBlock: ContentBlock = {
      id: `tbl-${Date.now()}`,
      type: "table",
      headers: ["Artifact Name", "Provenance Site", "Date / Era"],
      rows: [
        ["Sogdian Silver Pitcher", "Panjakent, Tajikistan", "7th Century CE"],
        ["Samarkand Cobalt Tile", "Registan, Uzbekistan", "14th Century CE"],
      ],
    };
    updateBlocks([...blocks, newBlock]);
  };

  const addQuote = () => {
    const newBlock: ContentBlock = {
      id: `q-${Date.now()}`,
      type: "quote",
      text: "The Silk Road was far more than a commercial conduit—it was an engine of artistic hybridity across Asia.",
      author: "Dr. Alisher Narzullaev",
    };
    updateBlocks([...blocks, newBlock]);
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(index, 1);
    newBlocks.splice(targetIndex, 0, moved);
    updateBlocks(newBlocks);
  };

  const deleteBlock = (index: number) => {
    const newBlocks = blocks.filter((_, idx) => idx !== index);
    updateBlocks(newBlocks);
  };

  const updateBlockData = (index: number, updatedFields: Partial<ContentBlock>) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], ...updatedFields } as ContentBlock;
    updateBlocks(newBlocks);
  };

  const handleImageUpload = async (index: number, file: File) => {
    setUploadingIndex(index);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        updateBlockData(index, { url: data.url });
      } else {
        alert(data.error || "Image upload failed");
      }
    } catch (err) {
      alert("Error uploading image file");
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Quick Section Reorder Summary Bar */}
      {blocks.length > 1 && (
        <div className="p-4 rounded-xs border border-palette-sand/70 bg-bg-secondary space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-palette-amber font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-palette-amber animate-pulse" />
              <span>Quick Section Reordering Bar ({blocks.length} Sections Total)</span>
            </span>
            <span className="text-[12px] text-muted hidden sm:inline">Use ▲ / ▼ buttons to rearrange sections</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {blocks.map((block, index) => (
              <div
                key={block.id || index}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs border border-palette-sand/80 bg-bg text-[12px] font-mono font-bold text-heading shadow-2xs hover:border-palette-amber transition-all"
              >
                <span className="capitalize">#{index + 1} {block.type}</span>
                <div className="flex items-center gap-1 border-l border-palette-sand/60 pl-1.5">
                  <button
                    type="button"
                    onClick={() => moveBlock(index, "up")}
                    disabled={index === 0}
                    className="p-0.5 text-palette-amber hover:text-palette-wine disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    <Icon name="chevron-up" size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlock(index, "down")}
                    disabled={index === blocks.length - 1}
                    className="p-0.5 text-palette-amber hover:text-palette-wine disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    <Icon name="chevron-down" size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Block Stream Editor List */}
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div
            key={block.id || index}
            className="relative p-5 rounded-xs border border-palette-sand/70 bg-bg shadow-xs space-y-4"
          >
            {/* Block Controls Header */}
            <div className="flex items-center justify-between border-b border-palette-sand/40 pb-2.5">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] font-bold text-palette-amber flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-xs bg-palette-amber/15 border border-palette-amber/30 text-palette-amber font-mono font-bold">
                  Block #{index + 1} • {block.type}
                </span>
              </span>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted font-bold mr-1 hidden sm:inline">
                  Reorder:
                </span>

                <button
                  type="button"
                  onClick={() => moveBlock(index, "up")}
                  disabled={index === 0}
                  className="px-2.5 py-1 rounded-xs border border-palette-sand/70 bg-bg-secondary hover:border-palette-amber hover:bg-bg text-[11px] font-mono uppercase font-bold text-heading disabled:opacity-30 flex items-center gap-1 transition-all"
                  title="Move Section Up"
                >
                  <Icon name="chevron-up" size={13} />
                  <span>Move Up</span>
                </button>

                <button
                  type="button"
                  onClick={() => moveBlock(index, "down")}
                  disabled={index === blocks.length - 1}
                  className="px-2.5 py-1 rounded-xs border border-palette-sand/70 bg-bg-secondary hover:border-palette-amber hover:bg-bg text-[11px] font-mono uppercase font-bold text-heading disabled:opacity-30 flex items-center gap-1 transition-all"
                  title="Move Section Down"
                >
                  <Icon name="chevron-down" size={13} />
                  <span>Move Down</span>
                </button>

                {/* Trash Delete Icon */}
                <button
                  type="button"
                  onClick={() => deleteBlock(index)}
                  className="p-1.5 text-red-500 hover:text-white hover:bg-red-600 rounded-xs transition-colors ml-2"
                  title="Delete Section Block"
                >
                  <Icon name="trash" size={16} />
                </button>
              </div>
            </div>

            {/* BLOCK TYPE 1: PARAGRAPH */}
            {block.type === "paragraph" && (
              <textarea
                rows={4}
                value={block.text}
                onChange={(e) => updateBlockData(index, { text: e.target.value })}
                placeholder="Enter paragraph text..."
                className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary p-3.5 text-[14.5px] text-heading focus:border-palette-amber focus:outline-none"
              />
            )}

            {/* BLOCK TYPE 2: HEADING */}
            {block.type === "heading" && (
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={block.level}
                  onChange={(e) =>
                    updateBlockData(index, { level: Number(e.target.value) as 2 | 3 })
                  }
                  className="rounded-xs border border-palette-sand/70 bg-bg-secondary px-3 py-2 text-[13px] font-mono text-heading"
                >
                  <option value={2}>H2 Subheading</option>
                  <option value={3}>H3 Section Header</option>
                </select>
                <input
                  type="text"
                  value={block.text}
                  onChange={(e) => updateBlockData(index, { text: e.target.value })}
                  placeholder="Subheading title..."
                  className="flex-1 rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2 text-[16px] font-heading font-semibold text-heading focus:border-palette-amber focus:outline-none"
                />
              </div>
            )}

            {/* BLOCK TYPE 3: INLINE IMAGE WITH FILE UPLOADER & DELETE ICON */}
            {block.type === "image" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Image Source & File Upload */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10.5px] uppercase tracking-wider text-palette-amber font-bold">
                      Image URL or Upload Local Image File
                    </label>

                    <input
                      type="text"
                      value={block.url}
                      onChange={(e) => updateBlockData(index, { url: e.target.value })}
                      placeholder="/images/exhibitions/..."
                      className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-3 py-2 text-[13px] font-mono text-heading focus:border-palette-amber focus:outline-none"
                    />

                    {/* Native File Upload Input */}
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-palette-amber/60 bg-palette-amber/10 hover:bg-palette-amber/20 text-[12px] font-mono font-bold uppercase tracking-wider text-palette-amber cursor-pointer transition-all">
                        <Icon name="upload" size={14} />
                        <span>{uploadingIndex === index ? "Uploading..." : "Upload Image File"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleImageUpload(index, e.target.files[0]);
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      {block.url && (
                        <button
                          type="button"
                          onClick={() => updateBlockData(index, { url: "" })}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xs border border-red-400/50 text-red-600 hover:bg-red-500/10 text-[11px] font-mono uppercase font-bold"
                          title="Remove Image"
                        >
                          <Icon name="trash" size={13} />
                          <span>Clear Image</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Caption & Alt Text */}
                  <div className="space-y-2">
                    <div>
                      <label className="block font-mono text-[10.5px] uppercase tracking-wider text-palette-amber font-bold mb-1">
                        Image Caption Text
                      </label>
                      <input
                        type="text"
                        value={block.caption || ""}
                        onChange={(e) => updateBlockData(index, { caption: e.target.value })}
                        placeholder="e.g. Fig 1.2: Glazed Sogdian Pitcher Detail"
                        className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-3 py-2 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Image Preview Card */}
                {block.url ? (
                  <div className="p-3 rounded-xs border border-palette-sand/60 bg-bg-secondary flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={block.url}
                        alt={block.alt || "Preview"}
                        className="h-16 w-24 object-cover rounded-xs border border-palette-sand/70"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                      <div>
                        <p className="font-mono text-[11.5px] text-heading font-bold">Image Preview</p>
                        <p className="font-mono text-[10.5px] text-muted truncate max-w-md">{block.url}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => updateBlockData(index, { url: "" })}
                      className="p-1.5 text-red-500 hover:text-red-700"
                      title="Delete image"
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            {/* BLOCK TYPE 4: YOUTUBE VIDEO */}
            {block.type === "youtube" && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[10.5px] uppercase tracking-wider text-palette-amber font-bold mb-1">
                      YouTube Video URL or ID *
                    </label>
                    <input
                      type="text"
                      value={block.videoUrl}
                      onChange={(e) => updateBlockData(index, { videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-3 py-2 text-[13px] font-mono text-heading focus:border-palette-amber focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10.5px] uppercase tracking-wider text-palette-amber font-bold mb-1">
                      Video Title / Curator Caption
                    </label>
                    <input
                      type="text"
                      value={block.title || ""}
                      onChange={(e) => updateBlockData(index, { title: e.target.value })}
                      placeholder="e.g. Curatorial Walkthrough Video"
                      className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-3 py-2 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
                    />
                  </div>
                </div>

                {extractYouTubeId(block.videoUrl) ? (
                  <div className="p-3 rounded-xs border border-palette-sand/60 bg-bg-secondary">
                    <p className="font-mono text-[11px] text-emerald-700 font-bold mb-2 flex items-center gap-1.5">
                      <Icon name="check" size={14} />
                      <span>Valid YouTube Video ID: {extractYouTubeId(block.videoUrl)}</span>
                    </p>
                    <div className="relative aspect-video max-w-sm overflow-hidden rounded-xs border border-palette-sand/70">
                      <iframe
                        src={`https://www.youtube.com/embed/${extractYouTubeId(block.videoUrl)}`}
                        title={block.title || "YouTube Preview"}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : (
                  <p className="font-mono text-[11px] text-red-500">
                    Enter a valid YouTube URL (e.g. https://www.youtube.com/watch?v=...)
                  </p>
                )}
              </div>
            )}

            {/* BLOCK TYPE 5: DATA TABLE */}
            {block.type === "table" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-palette-amber font-bold">
                    Custom Data Table Editor ({block.headers.length} Columns x {block.rows.length} Rows)
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newHeaders = [...block.headers, `Header ${block.headers.length + 1}`];
                        const newRows = block.rows.map((row) => [...row, "-"]);
                        updateBlockData(index, { headers: newHeaders, rows: newRows });
                      }}
                      className="px-2.5 py-1 text-[10.5px] font-mono uppercase font-bold rounded-xs border border-palette-sand/70 bg-bg hover:border-palette-amber text-heading"
                    >
                      + Add Column
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const emptyRow = block.headers.map(() => "");
                        updateBlockData(index, { rows: [...block.rows, emptyRow] });
                      }}
                      className="px-2.5 py-1 text-[10.5px] font-mono uppercase font-bold rounded-xs border border-palette-sand/70 bg-bg hover:border-palette-amber text-heading"
                    >
                      + Add Row
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto border border-palette-sand/70 rounded-xs">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-bg-secondary font-mono text-[11px] uppercase text-palette-amber border-b border-palette-sand/70">
                      <tr>
                        {block.headers.map((header, hIdx) => (
                          <th key={hIdx} className="p-2 min-w-35">
                            <div className="flex items-center gap-1.5 border-b border-palette-amber/40 pb-1">
                              <input
                                type="text"
                                value={header}
                                onChange={(e) => {
                                  const newHeaders = [...block.headers];
                                  newHeaders[hIdx] = e.target.value;
                                  updateBlockData(index, { headers: newHeaders });
                                }}
                                className="w-full bg-transparent font-bold focus:outline-none text-heading"
                                placeholder={`Column ${hIdx + 1}`}
                              />
                              {block.headers.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newHeaders = block.headers.filter((_, i) => i !== hIdx);
                                    const newRows = block.rows.map((row) => row.filter((_, i) => i !== hIdx));
                                    updateBlockData(index, { headers: newHeaders, rows: newRows });
                                  }}
                                  className="p-1 text-red-400 hover:text-red-600 transition-colors"
                                  title={`Delete Column ${hIdx + 1}`}
                                >
                                  <Icon name="trash" size={13} />
                                </button>
                              )}
                            </div>
                          </th>
                        ))}
                        <th className="p-2 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-palette-sand/40">
                      {block.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2">
                              <input
                                type="text"
                                value={cell}
                                onChange={(e) => {
                                  const newRows = [...block.rows];
                                  newRows[rIdx][cIdx] = e.target.value;
                                  updateBlockData(index, { rows: newRows });
                                }}
                                className="w-full bg-transparent focus:outline-none text-heading"
                              />
                            </td>
                          ))}
                          <td className="p-2 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                const newRows = block.rows.filter((_, idx) => idx !== rIdx);
                                updateBlockData(index, { rows: newRows });
                              }}
                              className="text-red-500 hover:text-red-700"
                              title="Delete row"
                            >
                              <Icon name="trash" size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* BLOCK TYPE 6: QUOTE */}
            {block.type === "quote" && (
              <div className="space-y-3">
                <textarea
                  rows={3}
                  value={block.text}
                  onChange={(e) => updateBlockData(index, { text: e.target.value })}
                  placeholder="Enter blockquote / curatorial callout text..."
                  className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary p-3 text-[15px] font-heading font-medium italic text-heading focus:border-palette-amber focus:outline-none"
                />
                <input
                  type="text"
                  value={block.author || ""}
                  onChange={(e) => updateBlockData(index, { author: e.target.value })}
                  placeholder="Author / Attribution (e.g. Dr. Alisher Narzullaev)"
                  className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-3 py-2 text-[13px] text-heading focus:border-palette-amber focus:outline-none"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {blocks.length === 0 && (
        <div className="p-8 text-center rounded-xs border border-dashed border-palette-sand/70 bg-bg-secondary">
          <p className="font-heading text-[18px] text-heading">No Content Blocks Added</p>
          <p className="text-[13px] text-muted mt-1">Use the toolbar buttons below to add text, images, YouTube videos, or tables.</p>
        </div>
      )}

      {/* BIG PROMINENT "+ ADD NEW CONTENT SECTION" BUTTON WITH COLLAPSIBLE DROPDOWN DRAWER */}
      <div className="mt-8 rounded-xs border-2 border-palette-wine shadow-md bg-white overflow-hidden">
        {/* BIG PROMINENT HEADER BUTTON */}
        <button
          type="button"
          onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
          className="w-full text-left p-5 sm:p-6 bg-palette-wine text-white hover:bg-palette-wine/95 font-mono text-[16px] sm:text-[18px] uppercase tracking-[0.16em] font-bold transition-colors flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-palette-amber text-white shadow-xs">
              <Icon name="sparkles" size={18} />
            </div>
            <span>+ ADD NEW CONTENT SECTION</span>
          </div>

          <div className="flex items-center gap-3 text-[12.5px] font-mono tracking-widest text-palette-sand">
            <span className="hidden sm:inline-block bg-black/20 px-3 py-1 rounded-xs border border-white/20">
              {isAddMenuOpen ? "Close Options ▲" : "Click to Expand Options ▼"}
            </span>
            <Icon name={isAddMenuOpen ? "chevron-up" : "chevron-down"} size={22} className="text-palette-amber" />
          </div>
        </button>

        {/* COLLAPSIBLE DROPDOWN OPTIONS DRAWER */}
        {isAddMenuOpen && (
          <div className="p-6 bg-[#F3EFE8] border-t border-palette-sand/70 space-y-4 animate-in fade-in duration-200">
            <p className="text-[13.5px] text-body font-heading text-lg">
              Click any block button below to append a new content section to the bottom of the curatorial essay.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* + TEXT: Clean Deep Wine Card */}
              <button
                type="button"
                onClick={addParagraph}
                className="px-4 py-3 text-[13px] font-mono uppercase tracking-wider font-bold rounded-xs bg-palette-wine text-white hover:bg-palette-wine/90 border border-palette-wine/80 shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Icon name="edit" size={15} />
                <span>+ Text Block</span>
              </button>

              {/* + HEADING: Soft Blush Rose Card */}
              <button
                type="button"
                onClick={addHeading}
                className="px-4 py-3 text-[13px] font-mono uppercase tracking-wider font-bold rounded-xs bg-[#D3A7A8] text-white hover:bg-[#c49697] border border-[#b8898a] shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>+ Subheading</span>
              </button>

              {/* + IMAGE: Silk Road Golden Amber Card */}
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-3 text-[13px] font-mono uppercase tracking-wider font-bold rounded-xs bg-palette-amber text-white hover:bg-palette-amber/90 border border-palette-amber/80 shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Icon name="image" size={15} />
                <span>+ Inline Image</span>
              </button>

              {/* + YOUTUBE: Rich Crimson Red Card */}
              <button
                type="button"
                onClick={addYouTube}
                className="px-4 py-3 text-[13px] font-mono uppercase tracking-wider font-bold rounded-xs bg-red-700 text-white hover:bg-red-600 border border-red-500/80 shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Icon name="video" size={15} />
                <span>+ YouTube Video</span>
              </button>

              {/* + TABLE: Samarkand Lapis Blue Card */}
              <button
                type="button"
                onClick={addTable}
                className="px-4 py-3 text-[13px] font-mono uppercase tracking-wider font-bold rounded-xs bg-palette-lapis text-white hover:bg-palette-lapis/90 border border-palette-lapis/80 shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Icon name="grid" size={15} />
                <span>+ Data Table</span>
              </button>

              {/* + QUOTE: Museum Earthy Sage Card */}
              <button
                type="button"
                onClick={addQuote}
                className="px-4 py-3 text-[13px] font-mono uppercase tracking-wider font-bold rounded-xs bg-palette-moss text-white hover:bg-palette-moss/90 border border-palette-moss/80 shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>+ Blockquote</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
