/*
 * MouthScene – gemeinsame stilisierte "Blick in den offenen Mund"-Illustration
 * für Tonsillotomie- und Tonsillektomie-Reel.
 * ViewBox 0 0 360 380. Die Gaumenmandeln selbst werden von den Reels animiert
 * und zwischen <MouthBack /> und <MouthFront /> gerendert.
 */

/** Positionen der beiden Gaumenmandeln (links/rechts aus Betrachtersicht). */
export const TONSIL = {
  left: { cx: 126, cy: 208 },
  right: { cx: 234, cy: 208 },
  /** vergrößerte Mandel */
  large: { rx: 31, ry: 40 },
  /** verkleinerte Mandel (Rest nach Tonsillotomie) */
  small: { rx: 16, ry: 23 },
} as const;

export const MOUTH_VIEWBOX = "0 0 360 380";

/** Alles hinter den Mandeln: Lippen, Mundraum, Rachenwand, Gaumen, Zäpfchen. */
export function MouthBack() {
  return (
    <g>
      {/* Lippen (außen) */}
      <ellipse cx={180} cy={195} rx={152} ry={162} fill="#e08a5a" />
      <ellipse cx={180} cy={195} rx={132} ry={142} fill="#8a4a28" />

      {/* Rachen (dunkler Raum hinten) */}
      <path
        d="M 88 168 Q 180 118 272 168 Q 268 262 180 292 Q 92 262 88 168 Z"
        fill="#5f331b"
      />

      {/* Weicher Gaumen mit Bogen oben */}
      <path
        d="M 78 176 Q 180 104 282 176 L 288 92 Q 180 44 72 92 Z"
        fill="#9c552f"
      />

      {/* Obere Zahnreihe (stilisiert als unterbrochener Bogen) */}
      <path
        d="M 74 150 A 128 138 0 0 1 286 150"
        fill="none"
        stroke="#fdfbf7"
        strokeWidth={26}
        strokeDasharray="26 7"
        strokeLinecap="round"
      />

      {/* Zäpfchen (Uvula) */}
      <path
        d="M 170 148 Q 168 182 180 190 Q 192 182 190 148 Z"
        fill="#b06238"
        stroke="#8a4a28"
        strokeWidth={2}
      />

      {/* Gaumenbögen links/rechts */}
      <path
        d="M 96 172 Q 84 214 116 250"
        fill="none"
        stroke="#c56a3a"
        strokeWidth={13}
        strokeLinecap="round"
      />
      <path
        d="M 264 172 Q 276 214 244 250"
        fill="none"
        stroke="#c56a3a"
        strokeWidth={13}
        strokeLinecap="round"
      />
    </g>
  );
}

/** Alles vor den Mandeln: Zunge und Beschriftung. */
export function MouthFront({ label }: { label: string }) {
  return (
    <g>
      {/* Zunge */}
      <path
        d="M 58 266 Q 180 216 302 266 Q 296 332 180 336 Q 64 332 58 266 Z"
        fill="#e08a63"
      />
      <path
        d="M 180 252 Q 178 290 180 322"
        fill="none"
        stroke="#c56a3a"
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.5}
      />

      {/* Beschriftung mit zwei Hinweislinien auf die Mandeln */}
      <line x1={152} y1={296} x2={130} y2={244} stroke="#fdfbf7" strokeWidth={2} opacity={0.85} />
      <line x1={208} y1={296} x2={230} y2={244} stroke="#fdfbf7" strokeWidth={2} opacity={0.85} />
      <text
        x={180}
        y={314}
        textAnchor="middle"
        fill="#fdfbf7"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize={15}
        fontWeight={600}
      >
        {label}
      </text>
    </g>
  );
}
