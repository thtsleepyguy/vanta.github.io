import { cn } from "@/lib/utils";
import type { Finish } from "@/lib/products";

type PhoneFallbackProps = {
  finish: Finish;
  side?: "front" | "back";
  className?: string;
  label?: string;
};

export function PhoneFallback({
  finish,
  side = "front",
  className,
  label,
}: PhoneFallbackProps) {
  return (
    <div
      className={cn(
        "relative aspect-[1.56/3.18] w-full select-none",
        `finish-${finish.id}`,
        className,
      )}
      style={{ borderRadius: "14% / 6.9%" }}
      role="img"
      aria-label={label ?? `VANTA ONE, ${finish.name} finish`}
    >
      <div
        className="absolute inset-0 border border-white/10 shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
        style={{
          borderRadius: "14% / 6.9%",
          background:
            "linear-gradient(112deg, color-mix(in oklch, var(--finish), white 34%) 0%, var(--finish) 21%, color-mix(in oklch, var(--finish), black 24%) 43%, var(--finish) 64%, color-mix(in oklch, var(--finish), white 22%) 82%, color-mix(in oklch, var(--finish), black 32%) 100%)",
        }}
      >
        {side === "front" ? (
          <div
            className="absolute inset-[2.2%] overflow-hidden bg-[#07080a]"
            style={{ borderRadius: "12.6% / 6.2%" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#111a21_0%,#080a0e_46%,#050608_100%)]" />
            <div className="absolute inset-0 opacity-80 [background:repeating-linear-gradient(90deg,transparent_0,transparent_16px,rgba(160,214,238,0.05)_16px,rgba(160,214,238,0.05)_18px)] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_72%,transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(128deg,rgba(255,255,255,0.09),transparent_38%,transparent_72%,rgba(143,216,242,0.05))]" />
            <div className="relative flex h-full flex-col justify-between px-[8%] py-[7%]">
              <div>
                <p className="text-[2rem] font-light leading-none tracking-[-0.04em] text-[var(--ink)] sm:text-[2.3rem]">
                  07:24
                </p>
                <p className="mt-[5%] text-[0.55rem] font-medium text-white/45 sm:text-[0.65rem]">
                  MON 07 NOV
                </p>
                <div className="mt-[8%] h-px w-[34%] bg-white/15" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[0.6rem] font-medium text-white/75">VANTA OS</p>
                  <p className="text-[0.55rem] text-white/35">Focus is on</p>
                </div>
                <div className="h-3 w-8 rounded-full border border-white/20" />
              </div>
            </div>
            <div className="absolute left-1/2 top-[2.5%] size-[3.5%] -translate-x-1/2 rounded-full bg-black" />
            <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.14)_0%,transparent_18%,transparent_82%,rgba(255,255,255,0.045)_100%)]" />
          </div>
        ) : (
          <div
            className="absolute inset-[1.8%] overflow-hidden"
            style={{
              borderRadius: "13% / 6.4%",
              background:
                "linear-gradient(145deg, color-mix(in oklch, var(--finish), white 18%) 0%, color-mix(in oklch, var(--finish), transparent 34%) 38%, color-mix(in oklch, var(--finish), black 12%) 100%)",
            }}
          >
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 opacity-70 [background:repeating-linear-gradient(90deg,transparent_0,transparent_9px,rgba(255,255,255,0.018)_9px,rgba(255,255,255,0.018)_10px)]" />

            <div className="absolute left-[9%] top-[6%] w-[38%] rounded-[24%] border border-white/15 bg-[linear-gradient(150deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02))] p-[8%] shadow-[0_18px_40px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <div className="aspect-square w-full rounded-full border border-white/20 bg-[radial-gradient(circle_at_35%_30%,#1a2930,#050709_62%)]">
                <div className="m-[18%] aspect-square rounded-full border border-[var(--accent)]/50" />
              </div>
              <div className="mt-[9%] aspect-square w-full rounded-full border border-white/20 bg-[radial-gradient(circle_at_35%_30%,#152027,#050709_62%)]">
                <div className="m-[18%] aspect-square rounded-full border border-white/15" />
              </div>
            </div>

            <div className="absolute inset-x-[13%] top-[38%] bottom-[8%] opacity-80">
              <div className="absolute inset-x-0 top-0 h-[52%] rounded-[8%] border border-white/10 bg-[#0f1a17]">
                <div className="absolute inset-[8%] opacity-60 [background:repeating-linear-gradient(90deg,transparent_0,transparent_13px,rgba(184,132,74,0.4)_13px,rgba(184,132,74,0.4)_14px)]" />
              </div>
              <div className="absolute inset-x-[4%] bottom-0 h-[42%] rounded-[8%] border border-white/10 bg-[#b7b1a5]">
                <div className="absolute inset-[18%] rounded-sm border border-black/20" />
                <div className="absolute left-1/2 top-1/2 aspect-square w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#8a5c33]/70" />
                <div className="absolute left-1/2 top-1/2 aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8a5c33]/50" />
              </div>
            </div>

            <p className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-[0.55rem] font-medium tracking-[0.24em] text-white/35">
              VANTA
            </p>
            <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.16)_0%,transparent_27%,transparent_65%,rgba(255,255,255,0.06)_100%)]" />
          </div>
        )}
      </div>

      <div className="absolute -right-[1%] top-[22%] h-[9%] w-[1.6%] rounded-r-sm bg-[var(--finish)] shadow-sm" />
      <div className="absolute -right-[1%] top-[34%] h-[6%] w-[1.6%] rounded-r-sm bg-[var(--finish)]" />
      <div className="absolute -left-[1%] top-[27%] h-[4%] w-[1.4%] rounded-l-sm bg-[var(--finish)]" />
    </div>
  );
}
