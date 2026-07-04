/*
 * SPIEL – "Die 10.000 Schlucke" + "Was wäre wenn?"
 * Ein interaktives Aha-Erlebnis für Mütter.
 *
 * Akt 1: Zeitraffer-Simulator. Die Mutter zieht einen Alters-Slider (2→15)
 *        und sieht live, wie sich zwei Pfade – Nasenatmung vs. Mundatmung –
 *        auseinanderentwickeln. Gesichtsprofil morpht, Kennzahlen driften,
 *        ein Schluck-Zähler macht die schiere Wiederholung fühlbar.
 *
 * Akt 2: Entscheidungsbaum (Säule 5). Ein reales Szenario, mehrere Wege,
 *        jede Wahl zeigt Konsequenz + die richtigen Fragen. Mündig statt ängstlich.
 *
 * Design folgt "Bold Manifesto": Cremeweiß, Terrakotta als Warn-/Mundpfad,
 * Türkis als Lösungs-/Nasenpfad, Fraunces-Headlines, DM Sans.
 */

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, RotateCcw, Wind, AlertTriangle, HelpCircle, Check } from "lucide-react";
import { Link } from "wouter";

/* ─────────────────────────  Farben & Motion  ───────────────────────── */
const C = {
  cream: "#faf8f5",
  black: "#1a1a1a",
  terra: "#de6e27", // Mundatmung / Warnung
  tuerkis: "#4fa8a0", // Nasenatmung / Lösung
  salbei: "#a2b8a2",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ─────────────────────────  Hilfsfunktionen  ───────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

// Parametrisches Seitenprofil. s = Schweregrad (0 ideal … 1 ausgeprägte Mundatmung).
// Front (Nase→Lippen→Kinn→Kiefer) morpht; Schädel-Rückseite bleibt fix.
function facePath(s: number) {
  const upperLipY = lerp(110, 113, s);
  const mouthTopY = lerp(116, 121, s);
  const mouthBotY = lerp(120, 136, s); // Öffnung wächst
  const lowerLipY = lerp(126, 143, s);
  const chinX = lerp(127, 116, s); // Kinn weicht zurück
  const chinY = lerp(147, 172, s); // Gesicht wird länger
  const jawX = lerp(93, 86, s);
  const jawY = lerp(163, 182, s);

  return [
    `M78 26`,
    `Q104 22 121 54`, // Stirn → Braue
    `L124 68`, // Nasenwurzel
    `Q129 78 153 96`, // Nasenrücken → Spitze
    `Q150 104 128 105`, // unter der Nase
    `L134 ${upperLipY}`, // Oberlippe vor
    `Q131 ${mouthTopY} 130 ${mouthTopY}`, // Mundoberkante
    `Q124 ${(mouthTopY + mouthBotY) / 2} 130 ${mouthBotY}`, // Mundöffnung (Spalt)
    `L130 ${lowerLipY}`, // Unterlippe
    `Q133 ${lerp(136, 154, s)} ${chinX} ${chinY}`, // Kinn
    `L${jawX} ${jawY}`, // Kieferwinkel
    `Q58 ${jawY - 8} 56 152`, // unter dem Ohr
    `Q40 96 48 34`, // Hinterkopf
    `Q56 22 78 26 Z`,
  ].join(" ");
}

/* ─────────────────────────  Akt 1: Simulator  ──────────────────────── */

type Metric = { key: string; label: string; nose: number; mouthBase: number };
// nose = stabil hoch; mouthBase = Wert bei voller Ausprägung (s=1)
const METRICS: Metric[] = [
  { key: "kiefer", label: "Kieferentwicklung", nose: 94, mouthBase: 30 },
  { key: "zaehne", label: "Zahnstellung", nose: 90, mouthBase: 26 },
  { key: "schlaf", label: "Schlafqualität", nose: 92, mouthBase: 34 },
  { key: "fokus", label: "Konzentration am Tag", nose: 88, mouthBase: 38 },
];

const SWALLOWS_PER_DAY = 1500;

function useCountUp(target: number, duration = 700) {
  const [val, setVal] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    const tick = (now: number) => {
      const t = clamp01((now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      fromRef.current = target;
    };
  }, [target, duration]);
  return val;
}

function ProfileCard({
  severity,
  title,
  sub,
  color,
  icon,
}: {
  severity: number;
  title: string;
  sub: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="relative rounded-2xl p-5 md:p-6 border-2 overflow-hidden"
      style={{ borderColor: `${color}33`, background: `${color}0d` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color }}>{icon}</span>
        <span className="font-serif font-black text-lg md:text-xl" style={{ color: C.black }}>
          {title}
        </span>
      </div>
      <div className="flex justify-center">
        <svg viewBox="0 0 200 210" className="w-40 h-44 md:w-48 md:h-52" aria-hidden>
          {/* offene Mundhöhle – nur bei Mundatmung sichtbar */}
          <motion.ellipse
            cx={129}
            cy={lerp(120, 130, severity)}
            rx={4}
            ry={lerp(1, 8, severity)}
            fill={C.black}
            animate={{ opacity: severity * 0.85 }}
          />
          <motion.path
            d={facePath(severity)}
            fill="none"
            stroke={color}
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            animate={{ d: facePath(severity) }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
          />
        </svg>
      </div>
      <p className="text-sm md:text-[0.95rem] leading-relaxed mt-1" style={{ color: `${C.black}99` }}>
        {sub}
      </p>
    </div>
  );
}

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm font-medium" style={{ color: `${C.black}cc` }}>
          {label}
        </span>
        <span className="text-sm font-bold tabular-nums" style={{ color }}>
          {Math.round(value)}%
        </span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: `${C.black}0f` }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          animate={{ width: `${value}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

function Act1Simulator() {
  const [age, setAge] = useState(4);
  const progress = clamp01((age - 2) / (15 - 2));
  // Mundatmung verschlechtert sich beschleunigt über die Jahre
  const severity = clamp01(Math.pow(progress, 1.25));

  const noseMetrics = METRICS.map((m) => ({
    ...m,
    value: m.nose - (1 - progress) * 2, // minimale, gesunde Reifung
  }));
  const mouthMetrics = METRICS.map((m) => ({
    ...m,
    value: lerp(m.nose, m.mouthBase, severity),
  }));

  const swallowsTotal = SWALLOWS_PER_DAY * 365 * age;
  const animatedSwallows = useCountUp(swallowsTotal);

  return (
    <section className="py-16 md:py-24" style={{ background: C.cream }}>
      <div className="container max-w-5xl">
        {/* Kopf */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: C.terra }}>
              Akt 1 · Der Zeitraffer
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-serif font-black leading-[1.05] text-4xl md:text-6xl mb-5"
            style={{ color: C.black }}
          >
            Die 10.000 Schlucke
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: `${C.black}99` }}
          >
            Dein Kind schluckt rund <strong style={{ color: C.black }}>1.500-mal am Tag</strong>. Jeder
            einzelne Schluck formt Kiefer, Zähne und Gesicht. Zieh am Regler und sieh, wohin die Reise
            geht.
          </motion.p>
        </motion.div>

        {/* Schluck-Zähler */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center rounded-2xl py-6 md:py-8 mb-10 border-2"
          style={{ borderColor: `${C.terra}22`, background: `${C.terra}0a` }}
        >
          <div
            className="font-serif font-black tabular-nums text-4xl md:text-6xl"
            style={{ color: C.terra }}
          >
            {animatedSwallows.toLocaleString("de-DE")}
          </div>
          <p className="text-sm md:text-base mt-2" style={{ color: `${C.black}99` }}>
            Schlucke in den ersten <strong style={{ color: C.black }}>{age} Lebensjahren</strong> — jeder
            eine Wiederholung, die prägt.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="mb-12">
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-sm font-bold uppercase tracking-wide" style={{ color: `${C.black}80` }}>
              Alter deines Kindes
            </span>
            <span className="font-serif font-black text-3xl md:text-4xl" style={{ color: C.black }}>
              {age} <span className="text-lg font-sans font-medium">Jahre</span>
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={15}
            step={1}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="si-range w-full"
            aria-label="Alter des Kindes"
          />
          <div className="flex justify-between mt-2 text-xs font-medium" style={{ color: `${C.black}66` }}>
            <span>2 J.</span>
            <span>Kita</span>
            <span>Grundschule</span>
            <span>Pubertät</span>
            <span>15 J.</span>
          </div>
        </div>

        {/* Zwei Pfade */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-8">
          <ProfileCard
            severity={0}
            title="Nasenatmung"
            sub="Zunge am Gaumen, Lippen geschlossen. Kiefer wächst nach vorne, Zähne bekommen Platz, der Schlaf ist tief."
            color={C.tuerkis}
            icon={<Wind size={20} />}
          />
          <ProfileCard
            severity={severity}
            title="Mundatmung"
            sub="Offener Mund, tiefe Zunge. Über die Jahre wird das Gesicht länger, der Kiefer schmaler, die Zähne enger."
            color={C.terra}
            icon={<AlertTriangle size={20} />}
          />
        </div>

        {/* Kennzahlen im Vergleich */}
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-5 rounded-2xl p-6 md:p-8" style={{ background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full" style={{ background: C.tuerkis }} />
              <span className="font-serif font-black text-lg" style={{ color: C.black }}>Nasenatmung</span>
            </div>
            {noseMetrics.map((m) => (
              <MetricBar key={m.key} label={m.label} value={m.value} color={C.tuerkis} />
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full" style={{ background: C.terra }} />
              <span className="font-serif font-black text-lg" style={{ color: C.black }}>Mundatmung</span>
            </div>
            {mouthMetrics.map((m) => (
              <MetricBar key={m.key} label={m.label} value={m.value} color={C.terra} />
            ))}
          </div>
        </div>

        {/* Auflösung */}
        <motion.div
          key={age > 9 ? "late" : "early"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center max-w-2xl mx-auto"
        >
          <p className="text-base md:text-lg leading-relaxed" style={{ color: `${C.black}b3` }}>
            {severity < 0.25 ? (
              <>Noch ist fast alles offen. <strong style={{ color: C.tuerkis }}>Früh gegengesteuert, formt sich der Mundraum von selbst richtig.</strong></>
            ) : severity < 0.6 ? (
              <>Die Weichen werden jetzt gestellt. <strong style={{ color: C.black }}>Die gute Nachricht: Das Muster ist umlernbar</strong> – Zunge und Atmung lassen sich trainieren.</>
            ) : (
              <>Auch spät ist nicht zu spät – aber je länger das Muster läuft, desto mehr Arbeit. <strong style={{ color: C.terra }}>Der beste Zeitpunkt war gestern. Der zweitbeste ist heute.</strong></>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────  Akt 2: Entscheidungsbaum  ──────────────── */

type Node = {
  id: string;
  kind: "start" | "choice" | "outcome";
  headline: string;
  body: string;
  options?: { label: string; to: string }[];
  questions?: string[]; // "die richtigen Fragen"
  tone?: "neutral" | "good" | "warn";
};

const TREE: Record<string, Node> = {
  start: {
    id: "start",
    kind: "start",
    headline: "Der Kieferorthopäde empfiehlt eine feste Zahnspange.",
    body: "Dein Kind (9) hat einen schmalen Kiefer und schiefe Frontzähne. Die Praxis rät zur Behandlung. Du spürst: Da ist etwas – aber ist die Spange die ganze Antwort? Was tust du?",
    options: [
      { label: "Sofort zusagen – die Fachperson wird es wissen", to: "sofort" },
      { label: "Nach der Ursache fragen, bevor ich zustimme", to: "ursache" },
      { label: "Eine zweite Meinung einholen", to: "zweite" },
    ],
  },
  sofort: {
    id: "sofort",
    kind: "outcome",
    tone: "warn",
    headline: "Die Zähne werden gerade – die Ursache bleibt.",
    body: "Eine Spange richtet Zähne aus. Wenn aber Mundatmung und eine tiefe Zungenlage der Grund für den schmalen Kiefer sind, arbeitet die Zunge weiter gegen das Ergebnis. Häufige Folge: Rückfall nach dem Abnehmen. Nicht falsch – aber oft nur die halbe Geschichte.",
    questions: [
      "Was ist die Ursache für den schmalen Kiefer – nicht nur das Symptom?",
      "Wie atmet und schluckt mein Kind eigentlich?",
      "Wie verhindern wir einen Rückfall nach der Behandlung?",
    ],
  },
  ursache: {
    id: "ursache",
    kind: "outcome",
    tone: "good",
    headline: "Du kommst zum Kern – und wirst zur Partnerin auf Augenhöhe.",
    body: "Wer nach der Ursache fragt, erfährt oft: Der schmale Kiefer ist Folge von Mundatmung und tiefer Zungenlage. Dann ist die Reihenfolge entscheidend – erst die Funktion (Atmung, Zunge) angehen, dann bzw. begleitend die Zähne. Genau hier setzt myofunktionelle Arbeit an.",
    questions: [
      "Sollten wir die Funktion behandeln, bevor oder während wir die Zähne richten?",
      "Gibt es einen myofunktionellen Ansatz, der die Spange unterstützt?",
      "Woran erkenne ich, dass die Ursache wirklich adressiert ist?",
    ],
  },
  zweite: {
    id: "zweite",
    kind: "outcome",
    tone: "good",
    headline: "Eine zweite Perspektive ist kein Misstrauen – sondern Sorgfalt.",
    body: "Zwei Fachpersonen, zwei Blickwinkel. Oft ergänzt eine funktionelle (myofunktionelle / logopädische) Sicht die kieferorthopädische. Du entscheidest nicht gegen die Medizin – du entscheidest informiert. Das ist Säule 5: Eingriffe verstehen, Alternativen kennen, die richtigen Fragen stellen.",
    questions: [
      "Deckt sich die Einschätzung – oder gibt es einen zweiten Weg?",
      "Was passiert, wenn wir noch abwarten und zuerst die Funktion angehen?",
      "Welche Risiken und Alternativen nennt mir jede Seite?",
    ],
  },
};

function Act2Tree() {
  const [nodeId, setNodeId] = useState("start");
  const node = TREE[nodeId];
  const isOutcome = node.kind === "outcome";
  const toneColor = node.tone === "good" ? C.tuerkis : node.tone === "warn" ? C.terra : C.black;

  return (
    <section className="py-16 md:py-24" style={{ background: C.black }}>
      <div className="container max-w-3xl">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: C.terra }}>
            Akt 2 · Deine Entscheidung
          </span>
          <h2 className="font-serif font-black leading-[1.05] text-4xl md:text-6xl mt-4 mb-5 text-white">
            Was wäre wenn?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-white/60">
            Medizinische Entscheidungen macht keine Angst – sondern Wissen. Spiel ein Szenario durch und
            sieh, wohin jede Wahl führt.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl p-6 md:p-9"
            style={{ background: C.cream }}
          >
            {isOutcome && (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide mb-4 px-3 py-1 rounded-full"
                style={{ color: toneColor, background: `${toneColor}18` }}
              >
                {node.tone === "good" ? <Check size={13} /> : <AlertTriangle size={13} />}
                {node.tone === "good" ? "Ein guter Weg" : "Achtung – halbe Antwort"}
              </span>
            )}

            <h3 className="font-serif font-black text-2xl md:text-3xl leading-tight mb-4" style={{ color: C.black }}>
              {node.headline}
            </h3>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: `${C.black}b3` }}>
              {node.body}
            </p>

            {/* Auswahl */}
            {node.options && (
              <div className="space-y-3">
                {node.options.map((opt) => (
                  <button
                    key={opt.to}
                    onClick={() => setNodeId(opt.to)}
                    className="group w-full text-left flex items-center justify-between gap-4 rounded-xl border-2 px-5 py-4 transition-colors"
                    style={{ borderColor: `${C.black}14` }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.terra)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${C.black}14`)}
                  >
                    <span className="font-medium text-base md:text-lg" style={{ color: C.black }}>
                      {opt.label}
                    </span>
                    <ArrowRight size={20} style={{ color: C.terra }} className="shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            )}

            {/* Die richtigen Fragen */}
            {node.questions && (
              <div className="rounded-xl p-5 mb-6" style={{ background: `${C.salbei}22` }}>
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle size={18} style={{ color: C.black }} />
                  <span className="font-serif font-black text-lg" style={{ color: C.black }}>
                    Die richtigen Fragen für dein nächstes Gespräch
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {node.questions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed" style={{ color: `${C.black}cc` }}>
                      <span className="font-serif font-black shrink-0" style={{ color: C.terra }}>{i + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isOutcome && (
              <button
                onClick={() => setNodeId("start")}
                className="inline-flex items-center gap-2 text-sm font-bold"
                style={{ color: C.terra }}
              >
                <RotateCcw size={16} /> Szenario neu starten
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────  Rahmen: Nav · Hero · CTA  ──────────────── */

function SpielNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ background: `${C.cream}f2`, borderColor: `${C.black}0d` }}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium" style={{ color: `${C.black}99` }}>
          <ArrowLeft size={18} /> Zurück
        </Link>
        <span className="font-serif font-bold tracking-tight" style={{ color: C.black }}>
          Schluck.Impuls
        </span>
        <span className="w-16" />
      </div>
    </nav>
  );
}

function SpielHero() {
  return (
    <section className="pt-28 md:pt-36 pb-8 md:pb-12" style={{ background: C.cream }}>
      <div className="container max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-5"
          style={{ color: C.terra }}
        >
          Interaktiv · in 2 Minuten
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-serif font-black leading-[1.02] text-5xl md:text-7xl mb-6"
          style={{ color: C.black }}
        >
          Sieh, was <span style={{ color: C.terra }}>ein Atemzug</span> über Jahre bewirkt.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="text-lg md:text-xl leading-relaxed"
          style={{ color: `${C.black}99` }}
        >
          Kein Faktenblatt. Ein Erlebnis. Zieh am Regler, triff Entscheidungen – und spür selbst, warum
          der Mundraum deines Kindes über so viel mehr entscheidet als nur schöne Zähne.
        </motion.p>
      </div>
    </section>
  );
}

function SpielCTA() {
  return (
    <section className="py-16 md:py-24" style={{ background: C.terra }}>
      <div className="container max-w-2xl text-center">
        <h2 className="font-serif font-black leading-[1.05] text-4xl md:text-5xl mb-5 text-white">
          Aha. Und jetzt?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-white/85 leading-relaxed">
          Du hast gesehen, dass das Muster steuerbar ist. Hol dir die konkreten Übungen für zuhause –
          Schritt für Schritt, ohne von Therapie zu Therapie zu fahren.
        </p>
        <Link
          href="/danke-uebungsliste"
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-lg transition-transform hover:scale-[1.03]"
          style={{ background: "#fff", color: C.terra }}
        >
          Übungsliste holen <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────  Seite  ─────────────────────────────────── */
export default function SpielSchlucke() {
  return (
    <div style={{ background: C.cream }} className="font-sans">
      {/* Range-Styling nur für diese Seite */}
      <style>{`
        .si-range { -webkit-appearance: none; appearance: none; height: 10px; border-radius: 999px;
          background: linear-gradient(90deg, ${C.tuerkis}, ${C.terra}); outline: none; cursor: pointer; }
        .si-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 30px; height: 30px;
          border-radius: 50%; background: ${C.black}; border: 4px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,.25); cursor: grab; }
        .si-range::-webkit-slider-thumb:active { cursor: grabbing; }
        .si-range::-moz-range-thumb { width: 30px; height: 30px; border-radius: 50%; background: ${C.black};
          border: 4px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,.25); cursor: grab; }
      `}</style>
      <SpielNav />
      <SpielHero />
      <Act1Simulator />
      <Act2Tree />
      <SpielCTA />
    </div>
  );
}
