"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { products } from "@/lib/products";
import { PhoneStage } from "@/components/product/phone-stage";
import { SectionLink } from "@/components/site/section-link";

const phone = products[0];

export function Configure() {
  const [finish, setFinish] = useState(phone.finishes[0]);
  const [storage, setStorage] = useState(phone.storage![0].value);
  const [view, setView] = useState("back");
  const optionClass = "relative inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 rounded-lg border border-[var(--rule)] bg-[var(--paper-2)] px-4 py-3 text-sm text-[var(--ink-2)] transition-colors hover:border-[var(--ink-2)] has-[:checked]:border-[var(--ink)] has-[:checked]:text-[var(--ink)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-[var(--focus)]";

  return (
    <section id="configure" className="theme-dark relative section-y bg-[var(--paper)] text-[var(--ink)]" aria-labelledby="configure-title">
      <div className="shell grid grid-cols-12 items-center gap-y-10 lg:gap-x-12">
        <div className="col-span-12 min-w-0 lg:col-span-5">
          <h2 id="configure-title" className="text-display-s">Choose your ONE.</h2>
          <p className="mt-6 max-w-[38ch] text-body text-[var(--ink-2)]">Choose a finish and storage, then turn the object to explore it.</p>
          <fieldset className="mt-9">
            <legend className="mb-3 text-sm">Finish</legend>
            <div className="flex flex-wrap gap-3">
              {phone.finishes.map((item) => <label key={item.id} className={optionClass}>
                <input className="sr-only" type="radio" name="finish" value={item.id} checked={finish.id === item.id} onChange={() => setFinish(item)} />
                <span className="size-4 rounded-full border border-[var(--rule)]" style={{ backgroundColor: `var(--finish-${item.id})` }} aria-hidden="true" />
                {item.name}
                {finish.id === item.id ? <Check size={14} aria-hidden="true" /> : null}
              </label>)}
            </div>
          </fieldset>
          <fieldset className="mt-7">
            <legend className="mb-3 text-sm">Storage</legend>
            <div className="flex flex-wrap gap-3">
              {phone.storage!.map((item) => <label key={item.value} className={optionClass}>
                <input className="sr-only" type="radio" name="storage" value={item.value} checked={storage === item.value} onChange={() => setStorage(item.value)} />
                {item.value}
              </label>)}
            </div>
          </fieldset>
          <p className="mt-7 text-sm text-[var(--ink-2)]" role="status" aria-live="polite" aria-atomic="true">VANTA ONE / {finish.name} / {storage}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">Concept preview only. Selections stay on this page; no order is placed.</p>
          <SectionLink href="/#notify" className="btn btn-primary mt-7">Notify me</SectionLink>
        </div>
        <div className="col-span-12 min-w-0 lg:col-span-7">
          <PhoneStage mode="config" finish={finish} view={view} interactive className="h-[24rem] w-full sm:h-[32rem]" fallbackSide={view === "front" ? "front" : "back"} />
          <div className="mt-5 flex flex-wrap justify-center gap-3" role="group" aria-label="Product view">
            {phone.views.map((item) => <button key={item.id} type="button" aria-pressed={view === item.id} onClick={() => setView(item.id)} className="min-h-11 rounded-full border border-[var(--rule)] px-5 text-sm text-[var(--ink-2)] transition-colors hover:border-[var(--ink-2)] aria-pressed:border-[var(--ink)] aria-pressed:text-[var(--ink)]">{item.label}</button>)}
          </div>
        </div>
      </div>
    </section>
  );
}
