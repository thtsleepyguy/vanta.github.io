"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionLink as Link } from "@/components/site/section-link";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

const LETTERS = ["V", "A", "N", "T", "A"] as const;

export function AnimatedWordmark({
  className,
  as = "link",
}: {
  className?: string;
  as?: "link" | "plain";
}) {
  const reduced = useReducedMotion();
  const mounted = useHydrated();
  const containerRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !sweepRef.current) return;
    const el = sweepRef.current;
    el.style.transform = "translateX(-120%)";
    el.style.opacity = "1";
    requestAnimationFrame(() => {
      el.style.transition = "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1) 1.1s";
      el.style.transform = "translateX(120%)";
    });
  }, [reduced, mounted]);

  if (!mounted || reduced) {
    return (
      <WordmarkStatic className={className} as={as} />
    );
  }

  const content = (
    <div
      ref={containerRef}
      className={cn("relative inline-flex items-baseline font-medium tracking-[-0.055em]", className)}
      aria-hidden={as === "link" ? undefined : false}
      style={{ overflow: "visible" }}
    >
      {/* Light sweep overlay */}
      <div
        ref={sweepRef}
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(90deg, transparent 0%, oklch(0.95 0.01 80 / 0.35) 40%, oklch(0.98 0.02 90 / 0.55) 50%, oklch(0.95 0.01 80 / 0.35) 60%, transparent 100%)",
          width: "100%",
          height: "100%",
          transform: "translateX(-120%)",
          opacity: "0",
        }}
        aria-hidden="true"
      />

      {/* Letters with masked reveal */}
      <span className="relative z-10 flex items-baseline" style={{ letterSpacing: "-0.055em" }}>
        {LETTERS.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.12 + index * 0.07,
            }}
            style={{ display: "inline-block", willChange: "opacity, transform, filter" }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </div>
  );

  if (as === "plain") return content;

  return (
    <Link
      href="/#main"
      aria-label="VANTA home"
      className="inline-flex min-h-11 items-center text-current no-underline"
    >
      {content}
    </Link>
  );
}

function WordmarkStatic({
  className,
  as = "link",
}: {
  className?: string;
  as?: "link" | "plain";
}) {
  const content = (
    <span
      className={cn("inline-flex items-baseline font-medium tracking-[-0.055em]", className)}
      aria-hidden={as === "link" ? undefined : false}
    >
      VANTA
    </span>
  );

  if (as === "plain") return content;

  return (
    <Link
      href="/#main"
      aria-label="VANTA home"
      className="inline-flex min-h-11 items-center text-current no-underline"
    >
      {content}
    </Link>
  );
}