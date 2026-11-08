"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Play, Pause, RotateCcw, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./interface.css";
import { ProductImage } from "@/components/product/product-image";

const styles = {
  "layout": "vanta-os-layout",
  "stage": "vanta-os-stage",
  "phone": "vanta-os-phone",
  "camera": "vanta-os-camera",
  "status": "vanta-os-status",
  "clock": "vanta-os-clock",
  "panel": "vanta-os-panel",
  "panelTitle": "vanta-os-panelTitle",
  "elapsed": "vanta-os-elapsed",
  "actions": "vanta-os-actions",
  "primary": "vanta-os-primary",
  "control": "vanta-os-control",
  "appearance": "vanta-os-appearance",
  "switch": "vanta-os-switch",
  "home": "vanta-os-home"
};

export function Interface() {
  const [now, setNow] = useState<Date | null>(null);
  const [light, setLight] = useState(false);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const update = () => setNow(new Date());
    const initial = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1000);
    return () => { window.clearTimeout(initial); window.clearInterval(interval); };
  }, []);

  useEffect(() => {
    if (!running) return;
    const started = Date.now();
    const initial = seconds;
    const interval = window.setInterval(() => setSeconds(initial + Math.floor((Date.now() - started) / 1000)), 250);
    return () => window.clearInterval(interval);
    // Keep the starting value fixed until the stopwatch is paused or resumed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const elapsed = `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <section id="interface" aria-labelledby="interface-title" className="theme-dark relative section-y bg-[var(--paper)] text-[var(--ink)]">
      <div className={`shell ${styles.layout}`}>
        <div>
          <h2 id="interface-title" className="text-display-s max-w-[12ch]">Interface, made tangible.</h2>
          <p className="mt-6 max-w-[38ch] text-body text-[var(--ink-2)]">A clock that keeps your time. A stopwatch for a moment of focus. An appearance that changes with you.</p>
          <p className="mt-6 text-small text-[var(--ink-2)]">Interactive preview. Controls work locally in this page.</p>
          <ProductImage src="/images/vanta/one-display.webp" alt="VANTA ONE display detail with its existing clock interface and dark glass" className="mt-8 aspect-[4/3] rounded-2xl border border-[var(--rule)]" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
        <div className={styles.stage}>
          <div className={styles.phone} data-appearance={light ? "light" : "dark"} aria-label="VANTA OS interactive phone preview">
            <div className={styles.camera} aria-hidden="true" />
            <div className={styles.status}><span>VANTA OS</span><span><Timer size={14} aria-hidden="true" />{running ? "Timing" : "Ready"}</span></div>
            <div className={styles.clock}>
              <time dateTime={now?.toISOString()}>{now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : "--:--"}</time>
              <p>{now ? now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) : "Local time"}</p>
            </div>
            <div className={styles.panel}>
              <div className={styles.panelTitle}><span>Stopwatch</span><Timer size={18} aria-hidden="true" /></div>
              <p className={styles.elapsed} role="timer" aria-label="Elapsed time">{elapsed}</p>
              <div className={styles.actions}>
                <Button className={styles.primary} onClick={() => setRunning((value) => !value)} aria-pressed={running}>
                  {running ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{running ? "Pause" : "Start"}
                </Button>
                <Button className={styles.control} variant="outline" aria-label="Reset stopwatch" onClick={() => { setRunning(false); setSeconds(0); }}><RotateCcw aria-hidden="true" /></Button>
              </div>
            </div>
            <Button className={styles.appearance} variant="outline" aria-pressed={light} onClick={() => setLight((value) => !value)}>
              {light ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}<span>Light appearance</span><span className={styles.switch} aria-hidden="true"><span /></span>
            </Button>
            <div className={styles.home} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
