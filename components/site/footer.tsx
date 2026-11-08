import { SectionLink as Link } from "@/components/site/section-link";
import { site } from "@/lib/site";
import { Wordmark } from "./wordmark";

export function Footer() {
  return (
    <footer className="theme-dark border-t border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)]">
      <div className="shell py-16 md:py-24">
        <div className="grid-12">
          <div className="col-span-12 mb-16 lg:col-span-5">
            <p className="max-w-[26ch] text-[1.35rem] leading-[1.3] tracking-[-0.025em] text-[var(--ink-2)]">
              Technology, reduced to its essence.
            </p>
            <p className="mt-8 max-w-[36ch] text-[0.85rem] leading-relaxed text-[var(--muted)]">
              {site.conceptNote}
            </p>
          </div>

          <nav aria-label="Products" className="col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-8">
            <h2 className="text-[0.78rem] font-medium text-[var(--muted)]">Products</h2>
            <ul className="mt-5 space-y-3">
              {site.footer.products.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[0.95rem] text-[var(--ink-2)] transition-colors duration-200 hover:text-[var(--ink)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore" className="col-span-6 sm:col-span-4 lg:col-span-2">
            <h2 className="text-[0.78rem] font-medium text-[var(--muted)]">Explore</h2>
            <ul className="mt-5 space-y-3">
              {site.footer.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[0.95rem] text-[var(--ink-2)] transition-colors duration-200 hover:text-[var(--ink)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-12 mt-10 sm:col-span-4 lg:col-span-2 lg:mt-0">
            <h2 className="text-[0.78rem] font-medium text-[var(--muted)]">This site</h2>
            <p className="mt-5 text-[0.9rem] leading-relaxed text-[var(--ink-2)]">
              A concept launch for a brand that does not exist. No product is for sale.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-[var(--rule)] pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-[0.8rem] text-[var(--muted)]">Concept study · 2026</p>
          <div className="flex items-center gap-6 text-[0.8rem] text-[var(--muted)]">
            <Link
              href="/#notify"
              className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-[var(--ink)]"
            >
              Interest list
            </Link>
            <Link
              href="/#configure"
              className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-[var(--ink)]"
            >
              Configure
            </Link>
          </div>
        </div>
      </div>

      <div className="shell overflow-hidden pb-8">
        <Wordmark
          as="plain"
          className="block select-none text-[clamp(6rem,23vw,21rem)] leading-[0.72] text-[var(--paper-3)]"
        />
      </div>
    </footer>
  );
}
