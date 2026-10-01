import Image from "next/image";

export type FloorMarkProps = {
  /** If single level mark is needed (1 to 4) */
  level?: 1 | 2 | 3 | 4;
  /** Active level for stacked multi-level animation (1 to 4) */
  activeLevel?: number;
  /** Size in pixels (width & height) */
  size?: number;
  /** Tone: "light" = dark ink on pale surfaces, "dark" = light ink on photos / dark surfaces */
  tone?: "light" | "dark";
  className?: string;
};

export function FloorMark({
  level,
  activeLevel = 1,
  size = 56,
  tone = "dark",
  className = "",
}: FloorMarkProps) {
  const suffix = tone === "dark" ? "-dark" : "";

  // Single static level mark
  if (level) {
    return (
      <Image
        src={`/images/logo/level-${level}${suffix}.webp`}
        width={size}
        height={size}
        alt={`Level ${level} of 4`}
        className={`floor-mark block object-contain ${className}`}
        loading="lazy"
      />
    );
  }

  // Interactive stacked floor mark with smooth transition
  return (
    <span
      className={`floor-mark floor-mark--stack relative block ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      role="img"
      aria-label={`Level ${activeLevel} of 4`}
    >
      {[1, 2, 3, 4].map((lvl) => {
        const isActive = lvl === activeLevel;
        return (
          <img
            key={lvl}
            src={`/images/logo/level-${lvl}${suffix}.webp`}
            width={size}
            height={size}
            alt=""
            aria-hidden="true"
            className={`floor-mark__img absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-out ${
              isActive ? "is-active opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          />
        );
      })}
    </span>
  );
}
