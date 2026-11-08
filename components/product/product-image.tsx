"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function ProductImage({ src, alt, className, imageClassName, sizes = "(min-width: 1440px) 760px, (min-width: 1024px) 58vw, 100vw" }: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
}) {
  const visual = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = visual.current;
    if (reduced || !element) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      animation = element.animate([
        { opacity: 0.72, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 600, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => { observer.disconnect(); animation?.cancel(); };
  }, [reduced]);

  return <div ref={visual} data-product-image className={cn("relative isolate overflow-hidden bg-[var(--paper-2)]", className)}>
    <Image src={src} alt={alt} fill sizes={sizes} loading="lazy" className={cn("object-cover", imageClassName)} />
  </div>;
}
