import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = ComponentProps<"a"> & {
  href: string;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover focus-visible:outline-accent",
  ghost:
    "bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 focus-visible:outline-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] uppercase rounded-[3px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
