import type { ComponentProps, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<T>, "as" | "className" | "children">;

export function Container<T extends ElementType = "div">({
  as,
  className = "",
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";
  return (
    <Component
      className={`mx-auto w-full max-w-360 px-6 md:px-10 lg:px-14 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
