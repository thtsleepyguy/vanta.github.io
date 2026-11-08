import * as React from "react";

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const PREMIUM_BUTTON_STYLES = {
  base:
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  primary:
    "bg-[var(--ink)] text-[var(--paper)] hover:bg-[color-mix(in_oklch,var(--ink),var(--paper)_12%)] shadow-[0_8px_30px_oklch(0.15_0.01_250_/0.28),0_2px_8px_oklch(0.15_0.01_250_/0.15)]",
  secondary:
    "border border-[var(--rule)] text-[var(--ink)] bg-transparent hover:bg-[color-mix(in_oklch,var(--paper-2),transparent_20%)] hover:border-[var(--ink-2)] shadow-[0_4px_20px_oklch(0.15_0.01_250_/0.12),0_1px_4px_oklch(0.15_0.01_250_/0.08)]",
  sizes: {
    sm: "min-h-8 px-4 py-2 text-sm",
    md: "min-h-9 px-6 py-2 text-base",
    lg: "min-h-10 px-8 py-3 text-lg",
  },
};

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${PREMIUM_BUTTON_STYLES.base} ${PREMIUM_BUTTON_STYLES.sizes[size]} ${
          variant === "primary" ? PREMIUM_BUTTON_STYLES.primary : PREMIUM_BUTTON_STYLES.secondary
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

export { PremiumButton };
