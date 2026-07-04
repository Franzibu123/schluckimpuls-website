/*
 * ReelFrame – gemeinsamer 9:16-Rahmen für die Instagram-Erklär-Reels.
 * Füllt die Breite des Eltern-Elements, hält exakt aspect-ratio 9/16 und
 * skaliert alle Texte über Container-Query-Einheiten (cqw, Basis 1080×1920).
 */

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/** Gesamtdauer eines Loop-Zyklus in Sekunden – für alle Reels identisch. */
export const REEL_DURATION = 7;

export interface ReelCaption {
  text: string;
  /** Start des Sichtbarkeitsfensters als Anteil des Zyklus (0–1). */
  from: number;
  /** Ende des Sichtbarkeitsfensters als Anteil des Zyklus (0–1). */
  to: number;
}

interface ReelFrameProps {
  /** Kleine Zeile über dem Titel, z. B. der Fachbegriff-Zusatz. */
  kicker: string;
  /** Haupttitel (Fraunces). */
  title: string;
  /** Ein knapper Erklärsatz unten. */
  subtitle: string;
  /** Zeitgesteuerte Zwischenüberschriften unter der Bühne. */
  captions?: ReelCaption[];
  /** Die animierte SVG-Bühne. */
  children: ReactNode;
}

/**
 * Opacity-Keyframes für ein Caption-Fenster [from, to] innerhalb des Loops.
 * Erzeugt weiche Ein-/Ausblendungen und bleibt an den Loop-Grenzen stetig.
 */
function captionKeyframes(from: number, to: number): {
  opacity: number[];
  times: number[];
} {
  const fade = 0.045;
  const times: number[] = [];
  const opacity: number[] = [];

  if (from <= 0.001) {
    // Weiches Einblenden direkt nach dem Loop-Start – Opacity ist an beiden
    // Loop-Grenzen 0, damit der Übergang Ende→Anfang nahtlos bleibt.
    times.push(0, Math.min(fade, to));
    opacity.push(0, 1);
  } else {
    times.push(0, from, Math.min(from + fade, to));
    opacity.push(0, 0, 1);
  }

  if (to >= 0.999) {
    times.push(1);
    opacity.push(1);
  } else {
    times.push(Math.max(to - fade, Math.min(from + fade, to) + 0.001), to, 1);
    opacity.push(1, 0, 0);
  }

  return { opacity, times };
}

export default function ReelFrame({
  kicker,
  title,
  subtitle,
  captions = [],
  children,
}: ReelFrameProps) {
  const frameStyle: CSSProperties = {
    aspectRatio: "9 / 16",
    containerType: "inline-size",
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-[#faf8f5] text-[#1a1a1a] select-none"
      style={frameStyle}
    >
      {/* Dezente Farbflächen im Hintergrund */}
      <div
        className="absolute rounded-full bg-[#4fa8a0]/10"
        style={{ width: "70cqw", height: "70cqw", top: "-22cqw", right: "-24cqw", filter: "blur(6cqw)" }}
      />
      <div
        className="absolute rounded-full bg-[#de6e27]/10"
        style={{ width: "60cqw", height: "60cqw", bottom: "6cqw", left: "-22cqw", filter: "blur(6cqw)" }}
      />

      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Titelblock */}
        <header style={{ padding: "9cqw 8cqw 0 8cqw" }}>
          <div className="flex items-center" style={{ gap: "2.5cqw", marginBottom: "2.5cqw" }}>
            <span className="bg-[#4fa8a0]" style={{ height: "0.3cqw", width: "7cqw" }} />
            <span
              className="font-sans font-semibold uppercase text-[#4fa8a0]"
              style={{ fontSize: "2.7cqw", letterSpacing: "0.5cqw" }}
            >
              {kicker}
            </span>
          </div>
          <h1
            className="font-serif font-black leading-[1.02] text-[#1a1a1a]"
            style={{ fontSize: "9.2cqw" }}
          >
            {title}
          </h1>
        </header>

        {/* Bühne */}
        <div
          className="relative flex flex-1 items-center justify-center"
          style={{ padding: "2cqw 5cqw" }}
        >
          {children}
        </div>

        {/* Zeitgesteuerte Zwischenzeilen */}
        <div className="relative" style={{ height: "10cqw", margin: "0 8cqw" }}>
          {captions.map((caption) => {
            const { opacity, times } = captionKeyframes(caption.from, caption.to);
            return (
              <motion.p
                key={caption.text}
                className="absolute inset-0 flex items-center justify-center text-center font-serif font-bold text-[#de6e27]"
                style={{ fontSize: "4.4cqw", lineHeight: 1.15 }}
                animate={{ opacity }}
                transition={{
                  duration: REEL_DURATION,
                  times,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {caption.text}
              </motion.p>
            );
          })}
        </div>

        {/* Erklärsatz + Wortmarke */}
        <footer style={{ padding: "3cqw 8cqw 6cqw 8cqw" }}>
          <p
            className="text-center font-sans text-[#1a1a1a]/70"
            style={{ fontSize: "3.4cqw", lineHeight: 1.45 }}
          >
            {subtitle}
          </p>
          <div
            className="flex items-center justify-center"
            style={{ marginTop: "4cqw", gap: "2cqw" }}
          >
            <span className="rounded-full bg-[#de6e27]" style={{ width: "1.6cqw", height: "1.6cqw" }} />
            <span
              className="font-serif font-bold tracking-tight text-[#1a1a1a]/80"
              style={{ fontSize: "3cqw" }}
            >
              Schluck.Impuls
            </span>
          </div>
        </footer>

        {/* Loop-Fortschritt */}
        <div className="absolute inset-x-0 bottom-0 bg-[#de6e27]/15" style={{ height: "0.7cqw" }}>
          <motion.div
            className="h-full origin-left bg-[#de6e27]"
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: REEL_DURATION, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
