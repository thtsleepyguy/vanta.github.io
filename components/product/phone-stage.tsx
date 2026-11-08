"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import type { Finish } from "@/lib/products";
import { PhoneFallback } from "./phone-fallback";

const PhoneCanvas = dynamic(
  () => import("./phone-canvas").then((module) => module.PhoneCanvas),
  { ssr: false },
);

const subscribeToWebGL = () => () => {};
let webglSupport: boolean | undefined;
function getWebGLSupport() {
  if (webglSupport === undefined) {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    webglSupport = Boolean(context);
  }
  return webglSupport;
}
const getServerWebGLSupport = () => false;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const getServerReducedMotion = () => false;

type PhoneStageProps = {
  mode: "hero" | "story" | "config";
  product?: "one" | "buds";
  finish: Finish;
  view?: string;
  interactive?: boolean;
  progress?: { current: number };
  className?: string;
  fallbackSide?: "front" | "back";
  fallbackLabel?: string;
};

export function PhoneStage({
  mode,
  product = "one",
  finish,
  view,
  interactive,
  progress,
  className,
  fallbackSide = "front",
  fallbackLabel,
}: PhoneStageProps) {
  const container = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(mode === "hero");
  const [entered, setEntered] = useState(mode === "hero");
  const [pageVisible, setPageVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const webgl = useSyncExternalStore(
    subscribeToWebGL,
    getWebGLSupport,
    getServerWebGLSupport,
  );
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true);
      if (mode === "hero" && !reduced) {
        // Trigger fade-in after mount
        requestAnimationFrame(() => setShowContent(true));
      } else {
        setShowContent(true);
      }
    }, mode === "hero" ? 120 : 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [mode, reduced]);

  useEffect(() => {
    if (!container.current) return;
    const element = container.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
          if (entry.isIntersecting) setEntered(true);
        });
      },
      { rootMargin: "150px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const active = visible && pageVisible;
  const showCanvas = mounted && entered && webgl === true;
  const isHero = mode === "hero";

  return (
    <div ref={container} className={cn("relative", className)} data-rendering={showCanvas ? (active ? "active" : "paused") : "pending"}>
      {showCanvas ? (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            isHero && !reduced && showContent ? "opacity-100" : "opacity-0",
            !isHero || reduced ? "opacity-100" : "",
          )}
          style={{
            opacity: isHero && !reduced ? (showContent ? 1 : 0) : 1,
            transition: isHero && !reduced
              ? "opacity 1600ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
          }}
        >
          <PhoneCanvas
            active={active}
            mode={mode}
            product={product}
            finish={finish}
            view={view}
            interactive={interactive}
            progress={progress}
            reduced={reduced}
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-[6%]">
          {product === "buds" ? <p className="max-w-[24ch] text-center text-sm text-[var(--ink-2)]">VANTA BUDS — 3D preview requires WebGL.</p> : <PhoneFallback
            finish={finish}
            side={fallbackSide}
            label={fallbackLabel}
            className="max-h-full w-auto max-w-full"
          />}
        </div>
      )}

      {interactive ? (
        <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[0.72rem] text-[var(--muted)]">
          Drag to rotate
        </p>
      ) : null}
    </div>
  );
}
