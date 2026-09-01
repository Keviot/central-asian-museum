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
      {/* 1. Curatorial Audio Guide Player Bar (Light Theme) */}
      {exhibition.audioGuide && (
        <section className="bg-bg-secondary border-b border-palette-sand/70 py-6 sm:py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between rounded-xs border border-palette-sand/80 bg-bg p-6 shadow-xs">
              {/* Audio Track Metadata */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-palette-wine text-white transition-transform hover:scale-105 shadow-sm"
                  aria-label={isPlayingAudio ? "Pause Audio Guide" : "Play Audio Guide"}
                >
                  <Icon name={isPlayingAudio ? "close" : "sparkles"} size={20} />
                </button>

                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-palette-amber font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-palette-amber animate-pulse" />
                    <span>Official Audio Guide • {exhibition.audioGuide.duration}</span>
                  </div>
                  <h3 className="font-heading text-[18px] sm:text-[20px] font-medium text-heading leading-tight mt-0.5">
                    {exhibition.audioGuide.title}
                  </h3>
                  <p className="text-[12.5px] text-body mt-0.5">
                    Narrated by <strong className="text-heading font-medium">{exhibition.audioGuide.narrator}</strong>
                  </p>
                </div>
              </div>

              {/* Controls & Transcript Toggle */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest text-palette-wine hover:underline transition-colors font-bold"
                >
                  <Icon name="book-open" size={14} />
                  <span>{showTranscript ? "Hide Transcript" : "Read Transcript"}</span>
                </button>

                <Button
                  href="/contact?intent=visits"
                  variant="outline"
                  size="sm"
                >
                  Book Curator Walkthrough
                </Button>
              </div>
            </div>

            {/* Audio Transcript Drawer */}
            {showTranscript && (
              <div className="mt-4 p-6 rounded-xs border border-palette-sand/80 bg-bg text-[14px] leading-relaxed text-body font-mono transition-all">
                <p className="text-[11px] uppercase tracking-widest text-palette-amber mb-2 font-bold">
                  Curatorial Audio Transcript
                </p>
                &ldquo;{exhibition.audioGuide.transcriptSnippet}&rdquo;
              </div>
            )}
          </div>
        </section>
      )}



      {/* 3. Main Curatorial Essay & Overview Section */}
      <section className="py-16 sm:py-20 bg-bg border-b border-palette-sand/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Essay & Catalog Download */}
            <div className="lg:col-span-8 space-y-10">
              {/* Short Description (Card Summary) */}
              {exhibition.description && (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-px w-8 bg-palette-amber" aria-hidden="true" />
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-palette-amber">
                      Short Description
                    </p>
                  </div>
                  <p className="text-[17px] sm:text-[19px] leading-relaxed text-heading font-serif italic border-l-2 border-palette-amber/60 pl-4 py-1">
                    {exhibition.description}
                  </p>
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-palette-amber" aria-hidden="true" />
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-palette-amber">
                    Curatorial Narrative & Historical Context
                  </p>
                </div>

                <BlockContentRenderer essay={exhibition.curatorialEssay} />
              </div>


            </div>

            {/* Right Column Sidebar: Overview + Research + Masterwork Detail Spec at Bottom */}
            <div className="lg:col-span-4 space-y-8">
              {/* Sidebar Item 1: Exhibition Overview */}
              <div className="p-6 rounded-xs border border-palette-sand/80 bg-bg-secondary shadow-xs">
                <h3 className="font-heading text-[20px] font-semibold text-heading mb-4 pb-3 border-b border-palette-sand/70">
                  Exhibition Overview
                </h3>

                <div className="space-y-3.5 text-[13.5px]">
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

                  <div className="pt-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] font-bold text-palette-amber block mb-1">
                      Admission & Audio Guide
                    </span>
                    <p className="text-body leading-snug text-[13px]">
                      Included with Museum General Ticket. Guided walkthroughs daily at 11:00 AM & 3:00 PM.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar Item 2: Research & Press Loans */}
              <div className="p-6 rounded-xs border border-palette-sand/80 bg-bg-secondary shadow-xs">
                <div className="flex items-center gap-2.5 text-palette-amber mb-2">
                  <Icon name="landmark" size={18} />
                  <h3 className="font-heading text-[18px] font-semibold text-heading">
                    Research & Press Loans
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed text-body">
                  For high-res press images, scholarly citations, or private viewing appointments, contact{" "}
                  <a href="mailto:curatorial@centralasianmuseum.org" className="text-palette-wine underline font-medium">
                    curatorial@centralasianmuseum.org
                  </a>
                </p>
              </div>

              {/* Sidebar Item 3: MASTERWORK DETAIL SPEC (Placed right at the bottom of the right sidebar!) */}
              {activeArtifact && (
                <div className="p-6 rounded-xs border-2 border-palette-amber/60 bg-white shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b border-palette-sand/70 pb-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-palette-amber font-bold flex items-center gap-1.5">
                      <Icon name="sparkles" size={13} />
                      Masterwork Detail Spec
                    </span>
                    {activeArtifact.accessionNumber && (
                      <span className="font-mono text-[10.5px] text-muted">
                        {activeArtifact.accessionNumber}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-heading text-[22px] font-semibold text-heading leading-tight">
                      {activeArtifact.title}
                    </h3>
                  </div>

                  <div className="space-y-2 text-[13px]">
                    <p className="flex justify-between border-b border-palette-sand/50 pb-1.5">
                      <strong className="text-heading font-medium">Provenance:</strong>
                      <span className="text-body font-normal">{activeArtifact.provenance}</span>
                    </p>
                    <p className="flex justify-between border-b border-palette-sand/50 pb-1.5">
                      <strong className="text-heading font-medium">Historical Era:</strong>
                      <span className="text-body font-normal">{activeArtifact.date}</span>
                    </p>
                    {activeArtifact.material && (
                      <p className="flex justify-between border-b border-palette-sand/50 pb-1.5">
                        <strong className="text-heading font-medium">Material:</strong>
                        <span className="text-body font-normal">{activeArtifact.material}</span>
                      </p>
                    )}
                    {activeArtifact.dimensions && (
                      <p className="flex justify-between border-b border-palette-sand/50 pb-1.5">
                        <strong className="text-heading font-medium">Dimensions:</strong>
                        <span className="text-body font-normal">{activeArtifact.dimensions}</span>
                      </p>
                    )}
                  </div>

                  <p className="text-[13px] leading-relaxed text-body pt-1">
                    {activeArtifact.description}
                  </p>

                  <div className="pt-3 border-t border-palette-sand/70 flex justify-between items-center text-[11.5px]">
                    <span className="text-palette-amber font-bold font-mono">On View in {exhibition.location}</span>
                    <Link href="/contact?intent=research" className="text-palette-wine underline font-semibold hover:text-heading">
                      Inquire High-Res Scan →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Architectural Chronological Timeline */}
      {exhibition.timeline && exhibition.timeline.length > 0 && (
        <section className="py-16 sm:py-20 bg-bg-secondary border-b border-palette-sand/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker="Historical Era Chronology"
              title="Milestones of the Trade Route"
              description="Trace the multi-century evolution of Sogdian trade networks, Timurid architecture, and Bukhara silk weaving."
            />

            {/* Architectural Timeline */}
            <div className="mt-12 relative">
              <div className="hidden lg:block absolute top-2.25 left-0 right-0 h-0.5 bg-palette-amber/40 z-0" aria-hidden="true" />

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8 relative z-10">
                {exhibition.timeline.map((step, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-5 w-5 rounded-full border-2 border-palette-amber bg-bg flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-palette-amber" />
                      </div>
                      <span className="font-mono text-[12.5px] font-bold text-palette-amber">
                        {step.era}
                      </span>
                    </div>

                    <div className="pl-8 lg:pl-0 pt-2 border-l-2 border-palette-amber/40 lg:border-l-0">
                      <h4 className="font-heading text-[19px] font-semibold text-heading leading-tight">
                        {step.heading}
                      </h4>
                      <p className="text-[13.5px] leading-relaxed text-body mt-2">
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
    </div>
  );
}

