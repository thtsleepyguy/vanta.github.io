import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/site/motion-provider";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vanta.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VANTA — Technology, reduced to its essence",
    template: "%s — VANTA",
  },
  description:
    "VANTA is a concept consumer-electronics brand: a smartphone with a translucent back, wireless earbuds and a quiet connected object. A design study, not a product for sale.",
  applicationName: "VANTA",
  keywords: [
    "VANTA",
    "concept product design",
    "consumer electronics",
    "industrial design",
    "smartphone concept",
  ],
  openGraph: {
    title: "VANTA — Technology, reduced to its essence",
    description:
      "Less noise. More signal. A concept technology brand built around one idea: reduce the object until only what matters remains.",
    url: "/",
    siteName: "VANTA",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VANTA — Technology, reduced to its essence",
    description: "Less noise. More signal. A concept technology brand.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--paper)] text-[var(--ink)]">
        <MotionProvider>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[500] -translate-y-[200%] rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-transform duration-200 focus:translate-y-0"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
