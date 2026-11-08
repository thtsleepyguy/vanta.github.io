"use client";

import NextLink from "next/link";
import { flushSync } from "react-dom";
import type { ComponentProps } from "react";

export function SectionLink({ onClick, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink {...props} onClick={(event) => {
    if (onClick) flushSync(() => onClick(event));
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.currentTarget.target === "_blank") return;
    const url = new URL(event.currentTarget.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    if (location.hash !== url.hash) history.pushState(null, "", url.hash);
    requestAnimationFrame(() => {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    });
  }} />;
}
