/*
 * Tonsillektomie – vollständige Mandel-ENTFERNUNG.
 * Die Gaumenmandeln werden komplett – samt Kapsel – entfernt,
 * zurück bleibt beidseits ein leeres Mandelbett. Loop: ~7 s.
 *
 * Zeitachse (Anteile des Zyklus):
 *   0.00–0.24  vergrößerte Mandeln, sanftes Pulsieren
 *   0.22–0.42  Kapselgrenze (gestrichelt) wird sichtbar
 *   0.40–0.56  Mandel samt Kapsel wird vollständig entfernt (schrumpft/blendet aus)
 *   0.50–0.90  Ergebnis: leeres Mandelbett beidseits
 *   0.90–1.00  weiche Überblendung zurück zum Anfang
 */

import { motion } from "framer-motion";
import ReelFrame, { REEL_DURATION } from "./ReelFrame";
import { MOUTH_VIEWBOX, MouthBack, MouthFront, TONSIL } from "./MouthScene";

const LOOP = { duration: REEL_DURATION, repeat: Infinity };

/** Keyframes: Wert bleibt, schrumpft zur Entfernung, springt unsichtbar zurück. */
const removalTimes = [0, 0.4, 0.56, 0.9, 0.905, 1];
const shrink = (from: number, to: number) => [from, from, to, to, from, from];

function WholeTonsil({ cx, cy }: { cx: number; cy: number }) {
  return (
    <motion.g
      animate={{ opacity: [1, 1, 0, 0, 1] }}
      transition={{ ...LOOP, times: [0, 0.42, 0.56, 0.9, 1], ease: "easeInOut" }}
    >
      {/* Mandelkörper */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        fill="#de6e27"
        stroke="#b3541c"
        strokeWidth={3}
        animate={{
          rx: shrink(TONSIL.large.rx, 2),
          ry: shrink(TONSIL.large.ry, 2.5),
        }}
        transition={{ ...LOOP, times: removalTimes, ease: "easeInOut" }}
      />
      {/* Kapsel (gestrichelte Grenze) – wird mit entfernt */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        fill="none"
        stroke="#fdfbf7"
        strokeWidth={2.5}
        strokeDasharray="7 6"
        animate={{
          rx: shrink(TONSIL.large.rx + 6, 3),
          ry: shrink(TONSIL.large.ry + 6, 3.5),
          opacity: [0, 0, 1, 1, 0, 0],
        }}
        transition={{
          rx: { ...LOOP, times: removalTimes, ease: "easeInOut" },
          ry: { ...LOOP, times: removalTimes, ease: "easeInOut" },
          opacity: { ...LOOP, times: [0, 0.22, 0.28, 0.5, 0.56, 1], ease: "easeInOut" },
        }}
      />
    </motion.g>
  );
}

/** Leeres Mandelbett nach der Entfernung. */
function TonsilBed({ cx, cy }: { cx: number; cy: number }) {
  return (
    <motion.g
      animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
      transition={{ ...LOOP, times: [0, 0.5, 0.6, 0.88, 0.96, 1], ease: "easeInOut" }}
    >
      <ellipse cx={cx} cy={cy} rx={TONSIL.large.rx - 6} ry={TONSIL.large.ry - 6} fill="#4f2a15" />
      <ellipse
        cx={cx}
        cy={cy}
        rx={TONSIL.large.rx - 6}
        ry={TONSIL.large.ry - 6}
        fill="none"
        stroke="#e8a377"
        strokeWidth={2}
        strokeDasharray="6 6"
        opacity={0.8}
      />
    </motion.g>
  );
}

export default function TonsillektomieReel() {
  const { left, right } = TONSIL;

  return (
    <ReelFrame
      kicker="Mandel-Entfernung"
      title="Tonsillektomie"
      subtitle="Die Gaumenmandeln werden vollständig entfernt – mitsamt ihrer Kapsel."
      captions={[
        { text: "Vergrößerte Gaumenmandeln", from: 0, to: 0.24 },
        { text: "Vollständige Entfernung – samt Kapsel", from: 0.27, to: 0.55 },
        { text: "Leeres Mandelbett auf beiden Seiten", from: 0.58, to: 0.93 },
      ]}
    >
      <svg viewBox={MOUTH_VIEWBOX} className="h-full w-full" role="img" aria-label="Stilisierte Ansicht des offenen Mundes: Die Gaumenmandeln werden vollständig samt Kapsel entfernt, zurück bleibt ein leeres Mandelbett.">
        <MouthBack />

        {/* Leeres Mandelbett (erscheint nach der Entfernung) */}
        <TonsilBed cx={left.cx} cy={left.cy} />
        <TonsilBed cx={right.cx} cy={right.cy} />

        {/* Vollständige Mandeln mit Kapsel */}
        <WholeTonsil cx={left.cx} cy={left.cy} />
        <WholeTonsil cx={right.cx} cy={right.cy} />

        <MouthFront label="Gaumenmandeln" />
      </svg>
    </ReelFrame>
  );
}
