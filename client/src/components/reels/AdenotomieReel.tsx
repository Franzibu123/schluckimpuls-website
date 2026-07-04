/*
 * Adenotomie – Entfernung der Rachenmandel („Polypen").
 * Seitliches Kopfprofil: Die vergrößerte Rachenmandel sitzt im Nasenrachen
 * (hinter der Nase, oberhalb des Gaumens) und blockiert die Nasenatmung.
 * Nach der Entfernung fließt die Luft frei durch die Nase. Loop: ~7 s.
 *
 * Zeitachse (Anteile des Zyklus):
 *   0.00–0.36  Blockade: Luft kommt nur bis zur Rachenmandel, diese pulsiert
 *   0.36–0.52  Entfernung: Rachenmandel schrumpft, entfernter Anteil gestrichelt
 *   0.52–0.94  freie Nasenatmung: Luftstrom fließt durch Nase und Rachen
 *   0.94–1.00  weiche Überblendung zurück zum Anfang
 */

import { motion } from "framer-motion";
import ReelFrame, { REEL_DURATION } from "./ReelFrame";

const LOOP = { duration: REEL_DURATION, repeat: Infinity };

/** Atemweg: Nasenloch → Nasenhöhle → Nasenrachen → Rachen abwärts. */
const AIRWAY_FULL =
  "M 92 178 C 126 168 162 158 202 162 C 216 164 220 178 220 196 C 220 240 214 278 208 332";
/** Blockierter Atemweg: endet vor der vergrößerten Rachenmandel. */
const AIRWAY_BLOCKED = "M 92 178 C 124 169 154 160 186 161";

/** Wandernde Luft-Punkte entlang eines Pfades (nahtlos: 10 Zyklen pro Loop). */
function AirFlow({ d, times, opacity }: { d: string; times: number[]; opacity: number[] }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#4fa8a0"
      strokeWidth={6}
      strokeLinecap="round"
      strokeDasharray="3 15"
      animate={{ strokeDashoffset: [0, -180], opacity }}
      transition={{
        strokeDashoffset: { ...LOOP, ease: "linear" },
        opacity: { ...LOOP, times, ease: "easeInOut" },
      }}
    />
  );
}

export default function AdenotomieReel() {
  return (
    <ReelFrame
      kicker="Rachenmandel entfernen"
      title="Adenotomie"
      subtitle="Die vergrößerte Rachenmandel im Nasenrachen wird entfernt – für freie Nasenatmung und weniger Infekte."
      captions={[
        { text: "Die Rachenmandel blockiert die Nase", from: 0, to: 0.34 },
        { text: "Sie wird sanft entfernt", from: 0.37, to: 0.52 },
        { text: "Freie Nasenatmung", from: 0.55, to: 0.94 },
      ]}
    >
      <svg viewBox="0 0 360 380" className="h-full w-full" role="img" aria-label="Stilisiertes Kopfprofil: Die vergrößerte Rachenmandel im Nasenrachen wird entfernt, danach strömt die Luft frei durch die Nase.">
        {/* Kopfprofil */}
        <path
          d="M 168 38
             C 116 46 92 92 96 132
             C 96 140 90 150 84 160
             C 76 172 80 180 92 182
             C 88 190 96 194 92 202
             C 88 210 98 216 94 224
             C 90 236 102 246 116 250
             C 136 258 156 262 170 272
             C 184 288 192 308 196 336
             L 296 336
             C 298 260 306 180 292 118
             C 276 62 222 32 168 38 Z"
          fill="#f2ddc9"
          stroke="#d9b491"
          strokeWidth={2.5}
        />
        {/* Haar */}
        <path
          d="M 168 38 C 222 32 276 62 292 118 C 297 140 298 158 298 172
             L 266 152 C 262 98 220 62 166 58 Z"
          fill="#a2b8a2"
        />
        {/* Ohr (angedeutet) */}
        <path
          d="M 246 196 C 262 188 272 200 264 216 C 258 228 246 230 242 220"
          fill="#e8c3a0"
          stroke="#d9b491"
          strokeWidth={2}
        />

        {/* Zunge (Mund geschlossen, angedeutet) */}
        <ellipse cx={146} cy={224} rx={44} ry={15} fill="#e8a377" opacity={0.85} />
        {/* Gaumen: Grenze zwischen Mundraum und Nasenraum */}
        <path d="M 104 200 L 198 203" stroke="#e0c0a4" strokeWidth={9} strokeLinecap="round" />

        {/* Atemweg (heller Kanal) */}
        <path
          d={AIRWAY_FULL}
          fill="none"
          stroke="#faf6ee"
          strokeWidth={24}
          strokeLinecap="round"
        />

        {/* Entfernter Anteil (gestrichelte Kontur, erscheint kurz bei der Entfernung) */}
        <motion.circle
          cx={212}
          cy={152}
          r={25}
          fill="none"
          stroke="#de6e27"
          strokeWidth={2.5}
          strokeDasharray="6 6"
          animate={{ opacity: [0, 0, 0.9, 0.9, 0, 0] }}
          transition={{ ...LOOP, times: [0, 0.38, 0.43, 0.55, 0.62, 1], ease: "easeInOut" }}
        />

        {/* Rachenmandel (Adenoide): vergrößert → klein */}
        <motion.circle
          cx={212}
          cy={152}
          fill="#de6e27"
          stroke="#b3541c"
          strokeWidth={3}
          animate={{
            r: [25, 27, 25, 27, 25, 25, 9, 9, 25],
          }}
          transition={{ ...LOOP, times: [0, 0.07, 0.14, 0.21, 0.28, 0.36, 0.52, 0.94, 1], ease: "easeInOut" }}
        />

        {/* Luftstrom: blockiert bzw. frei */}
        <AirFlow d={AIRWAY_BLOCKED} times={[0, 0.36, 0.46, 0.94, 1]} opacity={[1, 1, 0, 0, 1]} />
        <AirFlow d={AIRWAY_FULL} times={[0, 0.46, 0.56, 0.94, 1]} opacity={[0, 0, 1, 1, 0]} />

        {/* „Luft"-Hinweis vor der Nase */}
        <g>
          <path
            d="M 46 172 C 58 168 68 172 78 176"
            fill="none"
            stroke="#4fa8a0"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <path d="M 70 168 L 79 176 L 68 180" fill="none" stroke="#4fa8a0" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
          <text x={34} y={158} fill="#4fa8a0" fontFamily="'DM Sans', system-ui, sans-serif" fontSize={14} fontWeight={700}>
            Luft
          </text>
        </g>

        {/* Beschriftung Rachenmandel */}
        <g>
          <line x1={262} y1={78} x2={224} y2={136} stroke="#1a1a1a" strokeWidth={1.8} opacity={0.6} />
          <text x={228} y={58} textAnchor="middle" fill="#1a1a1a" fontFamily="'DM Sans', system-ui, sans-serif" fontSize={15} fontWeight={600}>
            Rachenmandel
          </text>
          <text x={228} y={74} textAnchor="middle" fill="#1a1a1a" opacity={0.6} fontFamily="'DM Sans', system-ui, sans-serif" fontSize={12}>
            im Nasenrachen
          </text>
        </g>
      </svg>
    </ReelFrame>
  );
}
