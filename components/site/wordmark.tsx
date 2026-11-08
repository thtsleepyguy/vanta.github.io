import type { MouseEventHandler } from "react";
import { SectionLink as Link } from "@/components/site/section-link";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  as = "link",
  onClick,
}: {
  className?: string;
  as?: "link" | "plain";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const content = (
    <span
      className={cn(
        "inline-flex items-baseline font-medium tracking-[-0.055em]",
        className,
      )}
      aria-hidden={as === "link" ? undefined : false}
    >
      VANTA
    </span>
  );

  if (as === "plain") return content;

  return (
    <Link
      href="/#main"
      onClick={onClick}
      aria-label="VANTA home"
      className="inline-flex min-h-11 items-center text-current no-underline"
    >
      {content}
    </Link>
  );
}
