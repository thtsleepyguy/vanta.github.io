"use client";

import { useRef, useState, type FormEvent } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useHydrated } from "@/lib/use-hydrated";

export function CTA() {
  const hydrated = useHydrated();
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = emailRef.current;
    if (!input) return;
    input.value = input.value.trim();
    setChecked(false);
    if (!input.validity.valid) {
      setError(input.validity.valueMissing ? "Enter your email address." : "Enter a valid email address, such as you@example.com.");
      input.focus();
      return;
    }
    setError("");
    setChecked(true);
  }

  return (
    <section
      id="notify"
      className="theme-dark relative isolate section-y overflow-hidden bg-[var(--paper)] text-[var(--ink)]"
      aria-labelledby="notify-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--accent),transparent_92%)_0%,transparent_70%)]" />
      <div className="shell relative grid grid-cols-12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-6">
          <h2
            id="notify-title"
            className="text-display font-[460] leading-[0.94] tracking-[-0.045em]"
          >
            The future feels different.
          </h2>
          <p className="mt-6 max-w-[38ch] text-body leading-[1.6] text-[var(--ink-2)]">
            VANTA is a concept study. Join the interest list to follow the work.
            No product is for sale.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <form
            className="glass-panel rounded-2xl p-8 md:p-12"
            noValidate
            onSubmit={submit}
          >
            <label htmlFor="email" className="block mb-2 text-label text-[var(--muted)]">
              Email address
            </label>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                ref={emailRef}
                id="email"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "signup-note signup-error" : "signup-note signup-status"}
                onChange={() => { setError(""); setChecked(false); }}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-lg border border-[var(--rule)] bg-[var(--paper)] px-5 py-4 text-[var(--ink)] placeholder-[var(--muted)] focus:border-[var(--focus)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]/30 transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={!hydrated}
                className="btn btn-primary min-h-12 shrink-0 gap-3 px-8 disabled:opacity-50"
              >
                Notify me {checked ? <Check size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
              </button>
            </div>
            <p id="signup-note" className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              Preview only. No email service is connected. Your address is not sent or saved.
            </p>
            <p id="signup-error" role="alert" className="mt-3 text-sm text-[var(--ink)]">{error}</p>
            <p id="signup-status" role="status" aria-live="polite" aria-atomic="true" className="mt-3 min-h-12 text-sm leading-relaxed text-[var(--ink)]">
              {checked ? "Email format checked. Signup is not connected, so you have not been added to an interest list." : ""}
            </p>
            <noscript><p className="mt-3 text-sm">Enable JavaScript to check your email address. No signup service is connected.</p></noscript>
          </form>
        </div>
      </div>
    </section>
  );
}