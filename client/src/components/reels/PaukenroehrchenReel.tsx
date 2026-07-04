/*
 * Paukenröhrchen (Tympanostomie) – Belüftung des Mittelohrs.
 * Querschnitt: Ohrmuschel → Gehörgang → Trommelfell → Paukenhöhle (Mittelohr)
 * mit Paukenerguss. Ein winziges Röhrchen im Trommelfell lässt die Flüssigkeit
 * ablaufen und belüftet das Mittelohr. Loop: ~7 s.
 *
 * Zeitachse (Anteile des Zyklus):
 *   0.00–0.28  Paukenerguss: Flüssigkeit hinter dem Trommelfell
 *   0.26–0.44  Röhrchen wandert durch den Gehörgang zum Trommelfell
 *   0.44–0.90  Flüssigkeit läuft ab, Luft strömt ein, Hörschnecke „hört" wieder
 *   0.90–1.00  weiche Überblendung zurück zum Anfang
 */

import { motion } from "framer-motion";
import ReelFrame, { REEL_DURATION } from "./ReelFrame";

const LOOP = { duration: REEL_DURATION, repeat: Infinity };
const FONT = "'DM Sans', system-ui, sans-serif";

/** Kontur der Paukenhöhle (Mittelohr) – auch als ClipPath für die Flüssigkeit. */
const CHAMBER_D =
  "M 234 158 Q 266 138 296 150 Q 312 190 300 234 Q 264 248 238 230 Z";

export default function PaukenroehrchenReel() {
  return (
    <ReelFrame
      kicker="Tympanostomie"
      title="Paukenröhrchen"
      subtitle="Ein winziges Röhrchen im Trommelfell belüftet das Mittelohr – die Flüssigkeit läuft ab, das Hören wird besser."
      captions={[
        { text: "Paukenerguss: Flüssigkeit im Mittelohr", from: 0, to: 0.26 },
        { text: "Winziges Röhrchen im Trommelfell", from: 0.29, to: 0.48 },
        { text: "Belüftet – besseres Hören", from: 0.51, to: 0.93 },
      ]}
    >
      <svg viewBox="0 0 360 380" className="h-full w-full" role="img" aria-label="Stilisierter Ohr-Querschnitt: Ein Paukenröhrchen im Trommelfell lässt die Flüssigkeit aus dem Mittelohr ablaufen und belüftet es.">
        <defs>
          <clipPath id="paukenhoehle-clip">
            <path d={CHAMBER_D} />
          </clipPath>
        </defs>

        {/* Querschnitt-Karte */}
        <rect x={16} y={78} width={328} height={254} rx={22} fill="#f5ede1" stroke="#e0d5c2" strokeWidth={2} />

        {/* Schallwellen von außen (wandern Richtung Ohr) */}
        <motion.g
          animate={{ x: [0, 26], opacity: [0, 1, 1, 0] }}
          transition={{
            x: { duration: REEL_DURATION / 4, repeat: Infinity, ease: "linear" },
            opacity: { duration: REEL_DURATION / 4, repeat: Infinity, times: [0, 0.25, 0.75, 1], ease: "linear" },
          }}
        >
          <path d="M 30 176 Q 44 198 30 220" fill="none" stroke="#4fa8a0" strokeWidth={3.5} strokeLinecap="round" />
          <path d="M 44 182 Q 54 198 44 214" fill="none" stroke="#4fa8a0" strokeWidth={3.5} strokeLinecap="round" opacity={0.6} />
        </motion.g>

        {/* Ohrmuschel */}
        <path
          d="M 108 118 C 62 120 38 168 46 210 C 52 244 76 266 104 260
             L 108 238 C 84 236 70 212 78 188 C 84 168 96 158 110 158 Z"
          fill="#e8a377"
          stroke="#c56a3a"
          strokeWidth={3}
        />

        {/* Gehörgang */}
        <path d="M 104 198 L 224 198" stroke="#faf6ee" strokeWidth={32} strokeLinecap="round" />
        <line x1={104} y1={182} x2={222} y2={182} stroke="#d9cfc0" strokeWidth={2} />
        <line x1={104} y1={214} x2={222} y2={214} stroke="#d9cfc0" strokeWidth={2} />

        {/* Paukenhöhle (Mittelohr) */}
        <path d={CHAMBER_D} fill="#efe6d6" stroke="#d9cfc0" strokeWidth={2.5} />

        {/* Flüssigkeit (Paukenerguss): Pegel sinkt nach dem Einsetzen */}
        <g clipPath="url(#paukenhoehle-clip)">
          <motion.rect
            x={228}
            width={110}
            height={120}
            fill="#4fa8a0"
            opacity={0.55}
            animate={{ y: [172, 172, 238, 238, 172] }}
            transition={{ ...LOOP, times: [0, 0.44, 0.74, 0.94, 1], ease: "easeInOut" }}
          />
        </g>

        {/* Gehörknöchelchen (angedeutet) */}
        <g opacity={0.75}>
          <path d="M 240 172 L 252 164 L 264 170" fill="none" stroke="#c56a3a" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={240} cy={172} r={4} fill="#c56a3a" />
          <circle cx={252} cy={164} r={4} fill="#c56a3a" />
          <circle cx={264} cy={170} r={4} fill="#c56a3a" />
        </g>

        {/* Ohrtrompete (Ablauf Richtung Nasenrachen) */}
        <path d="M 288 232 C 300 258 314 278 328 296" fill="none" stroke="#faf6ee" strokeWidth={13} strokeLinecap="round" />
        {/* Ablaufende Flüssigkeit */}
        <motion.path
          d="M 288 232 C 300 258 314 278 328 296"
          fill="none"
          stroke="#4fa8a0"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="3 12"
          animate={{ strokeDashoffset: [0, -150], opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{
            strokeDashoffset: { ...LOOP, ease: "linear" },
            opacity: { ...LOOP, times: [0, 0.46, 0.52, 0.72, 0.8, 1], ease: "easeInOut" },
          }}
        />

        {/* Hörschnecke (Innenohr, angedeutete Spirale) */}
        <g transform="translate(318 196)">
          <path
            d="M -12 0 a 12 12 0 1 1 12 12 a 8 8 0 1 1 8 -8 a 4 4 0 1 0 -4 4"
            fill="none"
            stroke="#a2b8a2"
            strokeWidth={4}
            strokeLinecap="round"
          />
          {/* „Hört wieder"-Impulse */}
          <motion.g
            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
            transition={{ ...LOOP, times: [0, 0.54, 0.6, 0.88, 0.94, 1], ease: "easeInOut" }}
          >
            <motion.circle
              cx={0}
              cy={4}
              fill="none"
              stroke="#4fa8a0"
              strokeWidth={2.5}
              animate={{ r: [10, 22], opacity: [0.8, 0] }}
              transition={{ duration: REEL_DURATION / 4, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.g>
        </g>

        {/* Trommelfell */}
        <path d="M 222 170 L 232 226" stroke="#de6e27" strokeWidth={5} strokeLinecap="round" />

        {/* Röhrchen: wandert durch den Gehörgang und sitzt dann im Trommelfell */}
        <motion.g
          animate={{ x: [-104, -104, 0, 0, -104], opacity: [0, 0, 1, 1, 1, 0, 0] }}
          transition={{
            x: { ...LOOP, times: [0, 0.28, 0.42, 0.955, 1], ease: "easeInOut" },
            opacity: { ...LOOP, times: [0, 0.24, 0.29, 0.42, 0.92, 0.955, 1], ease: "easeInOut" },
          }}
        >
          <rect x={219} y={186} width={5} height={23} rx={2} fill="#de6e27" stroke="#b3541c" strokeWidth={1.5} />
          <rect x={231} y={189} width={5} height={23} rx={2} fill="#de6e27" stroke="#b3541c" strokeWidth={1.5} />
          <rect x={221.5} y={193} width={12} height={10} rx={2.5} fill="#e8a377" stroke="#b3541c" strokeWidth={1.5} />
        </motion.g>

        {/* Luft strömt durch das Röhrchen ins Mittelohr */}
        <motion.path
          d="M 130 198 L 224 198 C 244 194 258 188 272 182"
          fill="none"
          stroke="#4fa8a0"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="3 13"
          animate={{ strokeDashoffset: [0, -160], opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{
            strokeDashoffset: { ...LOOP, ease: "linear" },
            opacity: { ...LOOP, times: [0, 0.5, 0.58, 0.88, 0.94, 1], ease: "easeInOut" },
          }}
        />

        {/* Beschriftungen */}
        <g fontFamily={FONT} fill="#1a1a1a">
          <text x={158} y={252} textAnchor="middle" fontSize={14} fontWeight={600} opacity={0.75}>
            Gehörgang
          </text>
          <line x1={210} y1={118} x2={223} y2={164} stroke="#1a1a1a" strokeWidth={1.8} opacity={0.55} />
          <text x={196} y={108} textAnchor="middle" fontSize={14} fontWeight={600} opacity={0.85}>
            Trommelfell
          </text>
          <line x1={278} y1={122} x2={272} y2={148} stroke="#1a1a1a" strokeWidth={1.8} opacity={0.55} />
          <text x={280} y={112} textAnchor="middle" fontSize={14} fontWeight={600} opacity={0.85}>
            Mittelohr
          </text>
          <text x={276} y={318} textAnchor="middle" fontSize={12} fontWeight={500} opacity={0.6}>
            Ohrtrompete
          </text>
        </g>
      </svg>
    </ReelFrame>
  );
}
