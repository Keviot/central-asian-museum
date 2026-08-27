import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: "left" | "right";
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = BaseProps &
  ComponentProps<typeof Link> & {
    href: string;
  };

type ActionButtonProps = BaseProps &
  ComponentProps<"button"> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | ActionButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-btn-bg text-white hover:bg-(--museum-btn-hover) shadow-sm hover:shadow focus-visible:outline-btn-bg",
  secondary:
    "bg-gold text-white hover:bg-(--museum-btn-secondary-hover) focus-visible:outline-gold",
  outline:
    "bg-transparent text-heading border border-(--museum-border-strong) hover:border-btn-bg hover:text-btn-bg hover:bg-bg-secondary focus-visible:outline-btn-bg",
  ghost:
    "bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 focus-visible:outline-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[12px] gap-2 tracking-[0.06em]",
  md: "px-7 py-3.5 text-[13px] gap-2.5 tracking-[0.08em]",
  lg: "px-9 py-4 text-[14px] gap-3 tracking-[0.09em]",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const content = (
    <>
      {icon && iconPosition === "left" && (
        <Icon
          name={icon}
          size={size === "sm" ? 14 : 16}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <Icon
          name={icon}
          size={size === "sm" ? 14 : 16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  const sharedClasses = `group inline-flex items-center justify-center font-medium uppercase rounded-[3px] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 select-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in props && typeof props.href === "string") {
    const { href, ...linkProps } = props as LinkButtonProps;
    return (
      <Link href={href} className={sharedClasses} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ActionButtonProps;
  return (
    <button type="button" className={sharedClasses} {...buttonProps}>
      {content}
    </button>
  );
}
