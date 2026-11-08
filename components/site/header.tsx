"use client";

import { SectionLink as Link } from "@/components/site/section-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { site } from "@/lib/site";
import { Wordmark } from "./wordmark";
import { AnimatedWordmark } from "./animated-wordmark";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mounted = useHydrated();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const lastScroll = useRef(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Reset route-dependent state before rendering the new route.
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname);
    setOpen(false);
  }

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
    const delta = value - lastScroll.current;
    if (open) {
      setHidden(false);
    } else if (value > 180 && delta > 6) {
      setHidden(true);
    } else if (delta < -6 || value < 120) {
      setHidden(false);
    }
    lastScroll.current = value;
  });

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 320, damping: 36, mass: 0.7 }
        }
        className={cn(
          "theme-dark fixed inset-x-0 top-0 z-[300] text-[var(--ink)]",
          "transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-[var(--rule)] bg-[color-mix(in_oklch,var(--paper),transparent_22%)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <AnimatedWordmark className="text-[1.3rem]" as="link" />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {site.nav.map((item, index) => (
              <motion.span
                key={item.href}
                initial={reduced || !mounted ? false : { opacity: 0, y: -6 }}
                animate={reduced || !mounted ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2 + index * 0.06,
                }}
              >
                <Link
                  href={item.href}
                  className="nav-link inline-flex min-h-11 items-center text-[0.9rem] font-medium text-[var(--ink-2)] transition-colors duration-200 hover:text-[var(--ink)]"
                >
                  {item.label}
                </Link>
              </motion.span>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#notify"
              className="hidden min-h-11 items-center text-[0.9rem] font-medium text-[var(--ink)] underline decoration-[var(--rule)] decoration-1 underline-offset-[0.35em] transition-colors duration-200 hover:decoration-[var(--accent)] sm:inline-flex"
            >
              Join the interest list
            </Link>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--rule)] bg-[color-mix(in_oklch,var(--paper),transparent_55%)] text-[var(--ink)] transition-colors duration-200 hover:border-[var(--ink-2)] lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu aria-hidden="true" size={19} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="theme-dark fixed inset-0 z-[400] overflow-y-auto bg-[var(--paper)] text-[var(--ink)]"
          >
            <div className="shell flex min-h-dvh flex-col py-6">
              <div className="flex h-[3rem] items-center justify-between">
                <Wordmark className="text-[1.3rem]" onClick={() => setOpen(false)} />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--rule)] transition-colors duration-200 hover:border-[var(--ink-2)]"
                  aria-label="Close menu"
                >
                  <X aria-hidden="true" size={20} strokeWidth={1.5} />
                </button>
              </div>

              <nav
                aria-label="Mobile"
                className="mt-14 flex flex-col border-t border-[var(--rule)]"
              >
                {site.nav.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduced ? 0 : 0.05 + index * 0.05,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between border-b border-[var(--rule)] py-5 text-[2.4rem] font-normal tracking-[-0.045em]"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto grid gap-8 pt-16">
                <Link
                  href="/#notify"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Join the interest list
                </Link>
                <p className="max-w-[34ch] text-[0.85rem] leading-relaxed text-[var(--muted)]">
                  {site.conceptNote}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
