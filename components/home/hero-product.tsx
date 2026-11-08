"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { flushSync } from "react-dom";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { PhoneStage } from "@/components/product/phone-stage";
import { products } from "@/lib/products";
import "./hero-product.css";

type ProductID = "one" | "buds";
export function HeroProduct({ selected, onSelect, contentRef }: {
  selected: ProductID;
  onSelect: (product: ProductID) => void;
  contentRef: RefObject<HTMLDivElement | null>;
}) {
  const reduced = useReducedMotion();
  const surface = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const locked = useRef(false);
  const [busy, setBusy] = useState(false);
  const product = products.find((item) => item.slug === selected)!;

  useEffect(() => () => { timeline.current?.revert(); }, []);
  useEffect(() => {
    if (!reduced || !locked.current) return;
    const frame = requestAnimationFrame(() => timeline.current?.progress(1));
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  function change(direction: number) {
    if (locked.current) return;
    const next = selected === "one" ? "buds" : "one";
    if (reduced || !surface.current) { onSelect(next); return; }
    const copy = [...(contentRef.current?.querySelectorAll<HTMLElement>("[data-carousel-copy]") ?? [])];
    if (label.current) copy.push(label.current);
    const stage = surface.current;
    timeline.current?.revert();
    locked.current = true;
    setBusy(true);
    timeline.current = gsap.timeline({
      onComplete: () => { locked.current = false; setBusy(false); },
    })
      .set([stage, ...copy], { willChange: "transform, opacity" })
      .to(stage, { opacity: 0, xPercent: direction * -3, scale: 0.96, rotationY: direction * 6, duration: 0.2, ease: "power2.in" }, 0)
      .to(copy, { opacity: 0, y: -6, duration: 0.16, ease: "power2.in" }, 0)
      .call(() => { flushSync(() => onSelect(next)); })
      .set(stage, { xPercent: direction * 3, rotationY: direction * -6, scale: 0.97 })
      .set(copy, { y: 8 })
      .to(stage, { opacity: 1, xPercent: 0, scale: 1, rotationY: 0, duration: 0.46, ease: "power3.out" })
      .to(copy, { opacity: 1, y: 0, duration: 0.32, ease: "power3.out" }, "<0.04")
      .set([stage, ...copy], { clearProps: "transform,opacity,willChange" });
  }

  return (
    <div className="vanta-carousel-carousel" role="region" aria-roledescription="carousel" aria-label="VANTA 3D products" aria-busy={busy}>
      <div ref={surface} className="vanta-carousel-surface" inert={busy}>
        <PhoneStage mode="hero" product={selected} finish={products[0].finishes[0]} interactive className="relative mx-auto h-[46svh] w-full sm:h-[54svh] lg:h-[68svh]" fallbackSide="back" fallbackLabel="VANTA ONE in Titanium, rear view with translucent back" />
      </div>
      <button type="button" className="vanta-carousel-arrow vanta-carousel-previous" aria-label="Previous product" aria-disabled={busy} onClick={() => change(-1)}><ChevronLeft aria-hidden="true" size={20} /></button>
      <button type="button" className="vanta-carousel-arrow vanta-carousel-next" aria-label="Next product" aria-disabled={busy} onClick={() => change(1)}><ChevronRight aria-hidden="true" size={20} /></button>
      <div className="vanta-carousel-selection">
        <p className="vanta-carousel-productName" aria-live="polite" aria-atomic="true"><span ref={label}>{product.name}<span className="vanta-carousel-count"> {selected === "one" ? "1" : "2"} / 2</span></span></p>
        <span className="vanta-carousel-indicator" data-product={selected} aria-hidden="true"><span /></span>
      </div>
    </div>
  );
}
