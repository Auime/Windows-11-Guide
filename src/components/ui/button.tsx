import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

type ButtonVariantProps = Pick<ButtonProps, "variant" | "size"> & {
  className?: string;
};

function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: ButtonVariantProps = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

    // Variants
    variant === "default" && "bg-primary-500 text-white hover:bg-primary-600",
    variant === "destructive" && "bg-red-500 text-white hover:bg-red-600",
    variant === "outline" && "border border-gray-300 bg-transparent hover:bg-gray-100",
    variant === "secondary" && "bg-gray-200 text-gray-900 hover:bg-gray-300",
    variant === "ghost" && "hover:bg-gray-100 hover:text-gray-900",
    variant === "link" && "text-primary-500 underline-offset-4 hover:underline",

    // Sizes
    size === "default" && "h-9 px-4 py-2",
    size === "sm" && "h-8 rounded-md px-3 text-sm",
    size === "lg" && "h-10 rounded-md px-8",
    size === "icon" && "h-9 w-9",

    className
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
