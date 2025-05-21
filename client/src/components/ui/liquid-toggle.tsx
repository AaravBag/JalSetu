import * as React from "react";
import { cn } from "@/lib/utils";

interface LiquidToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: "default" | "light";
}

const LiquidToggle = React.forwardRef<HTMLInputElement, LiquidToggleProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <input
        type="checkbox"
        role="switch"
        className={cn(
          "liquid-toggle",
          variant === "light" && "light",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

LiquidToggle.displayName = "LiquidToggle";

export { LiquidToggle }; 