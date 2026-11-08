import { ProductImage } from "@/components/product/product-image";
import { products } from "@/lib/products";
import "./collection.css";

const styles = {
  "collection": "vanta-collection-collection",
  "header": "vanta-collection-header",
  "products": "vanta-collection-products",
  "product": "vanta-collection-product",
  "stage": "vanta-collection-stage",
  "object": "vanta-collection-object",
  "phone": "vanta-collection-phone",
  "buds": "vanta-collection-buds",
  "core": "vanta-collection-core",
  "earbud": "vanta-collection-earbud",
  "case": "vanta-collection-case",
  "dial": "vanta-collection-dial",
  "summary": "vanta-collection-summary",
  "details": "vanta-collection-details",
  "plus": "vanta-collection-plus"
};

export function Collection() {
  return (
    <section id="collection" aria-labelledby="collection-title" className={`theme-dark section-y bg-[var(--paper)] text-[var(--ink)] ${styles.collection}`}>
      <div className="shell">
        <header className={styles.header}>
          <h2 id="collection-title" className="text-display-s max-w-[12ch]">Three objects, one language.</h2>
          <p className="text-body max-w-[38ch] text-[var(--ink-2)]">ONE, BUDS, and CORE — each with its own composition, finishes, and detail view. The system holds; the expression shifts.</p>
        </header>
        <div className={styles.products}>
          {products.map((product) => (
            <article key={product.slug} className={styles.product} aria-labelledby={`collection-${product.slug}`}>
              <div className={styles.stage}>
                <div className={styles.object}>
                  {product.slug === "one" || product.slug === "buds" ? (
                    <ProductImage
                      src={product.slug === "one" ? "/images/vanta/one-collection.webp" : "/images/vanta/buds-collection.webp"}
                      alt={product.slug === "one" ? "VANTA ONE in Titanium, showing its translucent back and camera column" : "VANTA Buds with the open charging case and both earbuds"}
                      className="h-full w-full bg-[var(--paper)]"
                      imageClassName="object-contain"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  ) : (
                    <div role="img" aria-label={product.name + ", concept illustration"} className={styles.core}><span className={styles.dial} /></div>
                  )}
                </div>
              </div>
              <p className="text-small text-[var(--ink-2)]">{product.category}</p>
              <h3 id={`collection-${product.slug}`} className="text-h3 mt-3">{product.name}</h3>
              <p className="text-body mt-3">{product.line}</p>
              <p className={`text-small mt-4 text-[var(--ink-2)] ${styles.summary}`}>{product.summary}</p>
              <p className="text-small mt-6 text-[var(--ink-2)]">{product.conceptLabel}</p>
              <details className={styles.details}>
                <summary>Product details<span aria-hidden="true" className={styles.plus}>+</span></summary>
                <dl>
                  {product.specs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
                </dl>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
