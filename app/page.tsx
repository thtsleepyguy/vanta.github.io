import { Interface } from "@/components/home/interface";
import { Collection } from "@/components/home/collection";
import { Hero } from "@/components/home/hero";
import { Story } from "@/components/home/story";
import { Configure } from "@/components/home/configure";
import { CTA } from "@/components/home/cta";
import { ProductImage } from "@/components/product/product-image";

const section = (id: string, label: string, description: string) => (
  <section
    key={id}
    id={id}
    className="theme-dark relative isolate section-y overflow-hidden bg-[var(--paper)] text-[var(--ink)]"
    aria-labelledby={`${id}-title`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklch,var(--paper),black_6%)_50%,transparent_100%)]" />
    <div className="shell relative grid grid-cols-12 gap-y-16">
      <div className="col-span-12 lg:col-span-5">
        <p
          id={`${id}-title`}
          className="text-display-s font-[460] leading-[0.98] tracking-[-0.04em]"
        >
          {label}
        </p>
        <p className="mt-6 max-w-[38ch] text-body leading-[1.6] text-[var(--ink-2)]">
          {description}
        </p>
      </div>
      <div className="col-span-12 lg:col-span-7">
        <ProductImage src="/images/vanta/one-materials.webp" alt="VANTA ONE in Haze, showing the translucent back, camera column, internal traces and charging coil" className="aspect-[4/3] rounded-2xl border border-[var(--rule)]" />
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Interface />
      <Collection />
      {section(
        "design",
        "Materials and engineering.",
        "Macro close-ups of the titanium rail, the frosted back, the optical column. Exploded views. The decisions that make the object.",
      )}
      <Configure />
      <CTA />
    </>
  );
}