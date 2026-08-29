"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlockContentRenderer } from "./BlockContentRenderer";
import type { ExhibitionItem, ArtifactHighlight } from "@/lib/exhibitions";

type ExhibitionDetailViewerProps = {
  exhibition: ExhibitionItem;
};

export function ExhibitionDetailViewer({ exhibition }: ExhibitionDetailViewerProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<ArtifactHighlight | null>(
    exhibition.highlights && exhibition.highlights.length > 0 ? exhibition.highlights[0] : null
  );

  return (
    <div className="w-full">
      {/* 1. Curatorial Audio Guide Player Bar */}
      {exhibition.audioGuide && (
        <section className="bg-surface-dark text-white border-b border-border-subtle py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between rounded-xs border border-palette-sand/20 bg-white/5 p-6 backdrop-blur-md">
              {/* Audio Track Metadata */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-palette-amber text-surface-dark transition-transform hover:scale-105"
                  aria-label={isPlayingAudio ? "Pause Audio Guide" : "Play Audio Guide"}
                >
                  <Icon name={isPlayingAudio ? "close" : "sparkles"} size={24} />
                </button>

                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-palette-amber">
                    <span className="h-1.5 w-1.5 rounded-full bg-palette-amber animate-pulse" />
                    <span>Official Audio Guide • {exhibition.audioGuide.duration}</span>
                  </div>
                  <h3 className="font-heading text-[18px] sm:text-[20px] font-medium text-white leading-tight mt-0.5">
                    {exhibition.audioGuide.title}
                  </h3>
                  <p className="text-[12.5px] text-palette-sand/80 mt-1">
                    Narrated by <strong className="text-white">{exhibition.audioGuide.narrator}</strong>
                  </p>
                </div>
              </div>

              {/* Controls & Transcript Toggle */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest text-palette-sand hover:text-palette-amber transition-colors border-b border-palette-sand/40 pb-0.5"
                >
                  <Icon name="book-open" size={14} />
                  <span>{showTranscript ? "Hide Transcript" : "Read Transcript"}</span>
                </button>

                <Button
                  href="/contact?intent=visits"
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Book Curator Walkthrough
                </Button>
              </div>
            </div>

            {/* Audio Transcript Drawer */}
            {showTranscript && (
              <div className="mt-4 p-6 rounded-xs border border-palette-sand/20 bg-surface-dark/95 text-[14px] leading-relaxed text-palette-sand/90 font-mono transition-all">
                <p className="text-[11px] uppercase tracking-widest text-palette-amber mb-2 font-bold">
                  Curatorial Audio Transcript
                </p>
                &ldquo;{exhibition.audioGuide.transcriptSnippet}&rdquo;
              </div>
            )}
          </div>
        </section>
      )}

      {/* 2. Curatorial Essay & Architectural Overview */}
      <section className="py-20 sm:py-24 bg-bg border-b border-border-subtle">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Multi-Paragraph Essay */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-palette-amber" aria-hidden="true" />
                <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.24em] text-palette-amber">
                  Curatorial Narrative & Historical Context
                </p>
              </div>

              <BlockContentRenderer essay={exhibition.curatorialEssay} />

              {/* Download Exhibition Catalog Banner */}
              <div className="mt-10 p-6 sm:p-7 rounded-xs border border-palette-sand/70 bg-bg-secondary flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="font-heading text-[19px] font-semibold text-heading">
                    Download Official Exhibition Catalog (PDF)
                  </h4>
                  <p className="text-[13.5px] text-body mt-1">
                    Includes 120-page high-resolution color plates, artifact provenance maps, and scholarly essays.
                  </p>
                </div>
                <Button href="/contact?intent=research" variant="primary" size="sm" icon="arrow-right" className="shrink-0">
                  Request Catalog
                </Button>
              </div>
            </div>

            {/* Right Column: Line-Based Overview Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="pt-6 border-t border-palette-sand/70">
                <h3 className="font-heading text-[20px] font-medium text-heading mb-5">
                  Exhibition Overview
                </h3>

                <div className="space-y-4 text-[14px]">
                  <div className="flex justify-between border-b border-palette-sand/60 pb-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] font-bold text-palette-amber">
                      Status
                    </span>
                    <span className="font-medium text-heading">{exhibition.status}</span>
                  </div>

                  <div className="flex justify-between border-b border-palette-sand/60 pb-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] font-bold text-palette-amber">
                      Gallery Room
                    </span>
                    <span className="font-medium text-heading">{exhibition.location}</span>
                  </div>

                  <div className="flex justify-between border-b border-palette-sand/60 pb-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] font-bold text-palette-amber">
                      Lead Curator
                    </span>
                    <span className="font-medium text-heading">{exhibition.curator}</span>
                  </div>

                  <div className="pt-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] font-bold text-palette-amber block mb-1">
                      Admission & Audio Guide
                    </span>
                    <p className="text-body leading-snug">
                      Included with Museum General Ticket. Guided walkthroughs daily at 11:00 AM & 3:00 PM.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-palette-sand/70">
                <div className="flex items-center gap-3 text-palette-amber mb-3">
                  <Icon name="landmark" size={18} />
                  <h3 className="font-heading text-[18px] font-medium text-heading">
                    Research & Press Loans
                  </h3>
                </div>
                <p className="text-[13.5px] leading-relaxed text-body">
                  For high-res press images, scholarly citations, or private viewing appointments, contact{" "}
                  <a href="mailto:curatorial@centralasianmuseum.org" className="text-palette-wine underline font-medium">
                    curatorial@centralasianmuseum.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Architectural Chronological Timeline (No White Card Boxes) */}
      {exhibition.timeline && exhibition.timeline.length > 0 && (
        <section className="py-20 sm:py-24 bg-bg-secondary border-b border-border-subtle">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker="Historical Era Chronology"
              title="Milestones of the Trade Route"
              description="Trace the multi-century evolution of Sogdian trade networks, Timurid architecture, and Bukhara silk weaving."
            />

            {/* Continuous Architectural Timeline Line */}
            <div className="mt-16 relative">
              {/* Connecting Top Line */}
              <div className="hidden lg:block absolute top-[9px] left-0 right-0 h-[2px] bg-palette-amber/40 z-0" aria-hidden="true" />

              <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8 relative z-10">
                {exhibition.timeline.map((step, idx) => (
                  <div key={idx} className="flex flex-col">
                    {/* Timeline Node Point */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-5 w-5 rounded-full border-2 border-palette-amber bg-bg flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-palette-amber" />
                      </div>
                      <span className="font-mono text-[12.5px] font-bold text-palette-amber">
                        {step.era}
                      </span>
                    </div>

                    {/* Timeline Text Content (Resting on Canvas) */}
                    <div className="pl-8 lg:pl-0 pt-2 border-l-2 border-palette-amber/40 lg:border-l-0">
                      <h4 className="font-heading text-[20px] font-semibold text-heading leading-tight">
                        {step.heading}
                      </h4>
                      <p className="text-[13.5px] leading-relaxed text-body mt-3">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Frameless Masterwork Relic Showcase & Inspector */}
      {exhibition.highlights && exhibition.highlights.length > 0 && (
        <section className="py-20 sm:py-24 bg-bg border-b border-border-subtle">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker="Featured Relics & Masterworks"
              title="Key Artifacts on Display"
              description="Click any masterwork below to inspect detailed material analysis, accession records, and provenance."
            />

            <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
              {/* Left Column: Frameless Relic Tiles */}
              <div className="lg:col-span-7 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {exhibition.highlights.map((relic) => {
                  const isSelected = activeArtifact?.id === relic.id;
                  return (
                    <button
                      key={relic.id}
                      type="button"
                      onClick={() => setActiveArtifact(relic)}
                      className={`group text-left cursor-pointer flex flex-col justify-start transition-all duration-300 ${
                        isSelected ? "opacity-100" : "opacity-75 hover:opacity-100"
                      }`}
                    >
                      {/* Image Container with Top Amber Accent Line */}
                      <div className={`relative aspect-4/3 w-full overflow-hidden rounded-xs bg-bg-secondary border transition-all duration-300 ${
                        isSelected ? "border-palette-amber shadow-md" : "border-palette-sand/60 group-hover:border-palette-amber"
                      }`}>
                        <Image
                          src={relic.imageSrc}
                          alt={relic.imageAlt}
                          fill
                          sizes="240px"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 bg-surface-dark/85 px-2 py-0.5 text-[9px] font-mono text-palette-sand rounded-xs">
                          {relic.date}
                        </div>

                        {/* Selection Indicator Pill */}
                        {isSelected && (
                          <div className="absolute bottom-2 right-2 bg-palette-amber text-white p-1 rounded-full shadow-xs">
                            <Icon name="check" size={12} />
                          </div>
                        )}
                      </div>

                      {/* Title & Provenance */}
                      <div className={`mt-3 pt-2 ${isSelected ? "border-t-2 border-palette-amber" : "border-t border-palette-sand/40"}`}>
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-palette-amber font-bold leading-tight">
                          {relic.provenance}
                        </p>
                        <h4 className={`mt-1 font-heading text-[17px] font-medium leading-[1.25] transition-colors ${
                          isSelected ? "text-palette-amber font-semibold" : "text-heading group-hover:text-palette-amber"
                        }`}>
                          {relic.title}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Architectural Specimen Ledger Inspector Box */}
              {activeArtifact && (
                <div className="lg:col-span-5 p-8 rounded-xs border border-palette-sand/70 bg-bg-secondary flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between border-b border-palette-sand/70 pb-3.5 mb-5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-palette-amber font-bold">
                        Masterwork Detail Spec
                      </span>
                      {activeArtifact.accessionNumber && (
                        <span className="font-mono text-[11px] text-muted">
                          {activeArtifact.accessionNumber}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-[24px] sm:text-[26px] font-semibold text-heading leading-snug">
                      {activeArtifact.title}
                    </h3>

                    <div className="mt-5 space-y-3 text-[13.5px]">
                      <p className="flex flex-wrap justify-between border-b border-palette-sand/50 pb-2">
                        <strong className="text-heading font-medium">Provenance:</strong>
                        <span className="text-body font-normal">{activeArtifact.provenance}</span>
                      </p>
                      <p className="flex flex-wrap justify-between border-b border-palette-sand/50 pb-2">
                        <strong className="text-heading font-medium">Historical Era:</strong>
                        <span className="text-body font-normal">{activeArtifact.date}</span>
                      </p>
                      {activeArtifact.material && (
                        <p className="flex flex-wrap justify-between border-b border-palette-sand/50 pb-2">
                          <strong className="text-heading font-medium">Material Composition:</strong>
                          <span className="text-body font-normal">{activeArtifact.material}</span>
                        </p>
                      )}
                      {activeArtifact.dimensions && (
                        <p className="flex flex-wrap justify-between border-b border-palette-sand/50 pb-2">
                          <strong className="text-heading font-medium">Dimensions:</strong>
                          <span className="text-body font-normal">{activeArtifact.dimensions}</span>
                        </p>
                      )}
                    </div>

                    <p className="mt-5 text-[14px] leading-relaxed text-body pt-2">
                      {activeArtifact.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-palette-sand/70 flex justify-between items-center text-[12px]">
                    <span className="text-palette-amber font-medium">On View in {exhibition.location}</span>
                    <Link href="/contact?intent=research" className="text-palette-wine underline font-semibold hover:text-heading">
                      Inquire High-Res Scan →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
