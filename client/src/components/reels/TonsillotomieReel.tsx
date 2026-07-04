/*
 * Tonsillotomie – Mandel-VERKLEINERUNG.
 * Die vergrößerten Gaumenmandeln werden nur teilweise abgetragen,
 * ein Rest mit Kapsel bleibt erhalten. Loop: ~7 s.
 *
 * Zeitachse (Anteile des Zyklus):
 *   0.00–0.26  vergrößerte Mandeln, sanftes Pulsieren
 *   0.26–0.40  Schnittlinie zeichnet sich über beide Mandeln
 *   0.40–0.56  äußerer Anteil wird abgetragen (blendet aus), Rest wird sichtbar
 *   0.56–0.90  Ergebnis: kleine Mandeln, mehr Platz (Pfeil), Salbei-Ring
 *   0.90–1.00  weiche Überblendung zurück zum Anfang
 */

import { motion } from "framer-motion";
import ReelFrame, { REEL_DURATION } from "./ReelFrame";
import { MOUTH_VIEWBOX, MouthBack, MouthFront, TONSIL } from "./MouthScene";

const LOOP = { duration: REEL_DURATION, repeat: Infinity };

/** Vergrößerte Mandel: pulsiert anfangs, blendet während der Abtragung aus. */
function LargeTonsil({ cx, cy }: { cx: number; cy: number }) {
  return (
    <motion.g
      animate={{ opacity: [1, 1, 0, 0, 1] }}
      transition={{ ...LOOP, times: [0, 0.4, 0.54, 0.9, 1], ease: "easeInOut" }}
    >
      <motion.ellipse
        cx={cx}
        cy={cy}
        fill="#de6e27"
        stroke="#b3541c"
        strokeWidth={3}
        animate={{
          rx: [TONSIL.large.rx, TONSIL.large.rx + 2.5, TONSIL.large.rx, TONSIL.large.rx + 2.5, TONSIL.large.rx, TONSIL.large.rx],
          ry: [TONSIL.large.ry, TONSIL.large.ry + 3, TONSIL.large.ry, TONSIL.large.ry + 3, TONSIL.large.ry, TONSIL.large.ry],
        }}
        transition={{ ...LOOP, times: [0, 0.07, 0.14, 0.21, 0.28, 1], ease: "easeInOut" }}
      />
      {/* Krypten (Oberflächenstruktur) */}
      <circle cx={cx - 8} cy={cy - 12} r={3} fill="#b3541c" opacity={0.55} />
      <circle cx={cx + 7} cy={cy + 2} r={3} fill="#b3541c" opacity={0.55} />
      <circle cx={cx - 4} cy={cy + 16} r={3} fill="#b3541c" opacity={0.55} />
    </motion.g>
  );
}

/** Verbleibender Mandelrest mit Kapsel – liegt dauerhaft unter der großen Mandel. */
function RestTonsil({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse
        cx={cx}
        cy={cy}
        rx={TONSIL.small.rx}
        ry={TONSIL.small.ry}
        fill="#e8a377"
        stroke="#b3541c"
        strokeWidth={2.5}
      />
      {/* Salbei-Ring: „verheilt, Kapsel erhalten" */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        rx={TONSIL.small.rx + 7}
        ry={TONSIL.small.ry + 7}
        fill="none"
        stroke="#a2b8a2"
        strokeWidth={3.5}
        animate={{ opacity: [0, 0, 0.9, 0.9, 0, 0] }}
        transition={{ ...LOOP, times: [0, 0.58, 0.64, 0.84, 0.92, 1], ease: "easeInOut" }}
      />
    </g>
  );
}

/** Schnittlinie, die den abzutragenden Anteil markiert. */
function CutLine({ d }: { d: string }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#fdfbf7"
      strokeWidth={3.5}
      strokeLinecap="round"
      animate={{
        pathLength: [0, 0, 1, 1],
        opacity: [0, 0, 1, 1, 0, 0],
      }}
      transition={{
        pathLength: { ...LOOP, times: [0, 0.26, 0.4, 1], ease: "easeInOut" },
        opacity: { ...LOOP, times: [0, 0.26, 0.3, 0.46, 0.54, 1], ease: "easeInOut" },
      }}
    />
  );
}

export default function TonsillotomieReel() {
  const { left, right } = TONSIL;

  return (
    <ReelFrame
      kicker="Mandel-Verkleinerung"
      title="Tonsillotomie"
      subtitle="Die Gaumenmandeln werden nur verkleinert – schonend, weniger Blutung, schnellere Heilung."
      captions={[
        { text: "Vergrößerte Gaumenmandeln", from: 0, to: 0.26 },
        { text: "Nur ein Teil wird abgetragen", from: 0.29, to: 0.55 },
        { text: "Kapsel bleibt – mehr Platz im Rachen", from: 0.58, to: 0.93 },
      ]}
    >
      <svg viewBox={MOUTH_VIEWBOX} className="h-full w-full" role="img" aria-label="Stilisierte Ansicht des offenen Mundes: Die vergrößerten Gaumenmandeln werden teilweise abgetragen und bleiben verkleinert erhalten.">
        <MouthBack />

        {/* Mandelrest (immer vorhanden, wird nach der Abtragung sichtbar) */}
        <RestTonsil cx={left.cx - 5} cy={left.cy} />
        <RestTonsil cx={right.cx + 5} cy={right.cy} />

        {/* Vergrößerte Mandeln (Ausgangszustand) */}
        <LargeTonsil cx={left.cx} cy={left.cy} />
        <LargeTonsil cx={right.cx} cy={right.cy} />

        {/* Schnittlinien am inneren Rand des verbleibenden Rests */}
        <CutLine d="M 136 174 Q 146 208 136 242" />
        <CutLine d="M 224 174 Q 214 208 224 242" />

        {/* „Mehr Platz"-Pfeil zwischen den verkleinerten Mandeln */}
        <motion.g
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{ ...LOOP, times: [0, 0.6, 0.66, 0.84, 0.92, 1], ease: "easeInOut" }}
        >
          <line x1={148} y1={208} x2={212} y2={208} stroke="#4fa8a0" strokeWidth={4} strokeLinecap="round" />
          <path d="M 156 200 L 146 208 L 156 216" fill="none" stroke="#4fa8a0" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 204 200 L 214 208 L 204 216" fill="none" stroke="#4fa8a0" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        <MouthFront label="Gaumenmandeln" />
      </svg>
    </ReelFrame>
  );
}
