import type { ReactNode } from "react";

type SectionHeadingProps = {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
  isDark?: boolean;
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className = "",
  titleAs = "h2",
  isDark = false,
}: SectionHeadingProps) {
  const TitleTag = titleAs;
  const alignmentClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
        ? "text-right items-end"
        : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignmentClass} ${className}`}>
      {kicker && (
        <div className="mb-3.5 inline-flex items-center gap-2.5">
          <span
            className="h-px w-6 bg-primary"
            aria-hidden="true"
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary md:text-[12px]">
            {kicker}
          </p>
        </div>
      )}

      <TitleTag
        className={`font-heading text-[32px] font-medium leading-[1.12] tracking-[-0.01em] sm:text-[40px] md:text-[46px] lg:text-[54px] ${
          isDark ? "text-light-text" : "text-heading"
        }`}
      >
        {title}
      </TitleTag>

      {description && (
        <p
          className={`mt-4 text-[15px] font-normal leading-relaxed md:mt-5 md:text-[17px] ${
            isDark ? "text-white/80" : "text-body"
          } ${align === "center" ? "max-w-170" : "max-w-140"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
