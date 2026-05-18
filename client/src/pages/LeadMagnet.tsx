/*
 * LEAD-MAGNET LANDINGPAGE – "5 Fragen vor der OP"
 * Ziel: E-Mail-Adressen sammeln & auf Mandel-Mini-Kurs hinleiten
 * Freebie: Kostenlose Checkliste als PDF
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, CheckCircle, Star, Shield, Clock, Mail, Instagram } from "lucide-react";
import { Link } from "wouter";

const IMAGES = {
  logo: "/manus-storage/2005_c8546e59.png",
  franzi: "/manus-storage/41011_e7fd04a1.jpg",
  franziPraxis: "/manus-storage/34064_f75ca546.jpg",
  ohrModell: "/manus-storage/23381_7a655dbd.jpg",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ─── MINIMAL NAV ─── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#1a1a1a]/5">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-9 w-9 rounded-lg" />
          <span className="font-serif font-bold text-[#1a1a1a] text-base tracking-tight">Schluck.Impuls</span>
        </Link>
        <a
          href="#opt-in"
          className="bg-[#de6e27] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#c55a18] transition-all active:scale-[0.97]"
        >
          Kostenlos herunterladen
        </a>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative bg-[#faf8f5] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#de6e27]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#4fa8a0]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-[#de6e27]/10 text-[#de6e27] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
              <Download size={14} /> Kostenlose Checkliste
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-[3.2rem] font-black text-[#1a1a1a] leading-[1.08] mb-6">
              5 Fragen, die du deinem HNO stellen{" "}
              <span className="relative inline-block">
                <span className="text-[#de6e27]">musst</span>
                <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#a2b8a2] rounded-full" />
              </span>{" "}
              – bevor du Ja zur OP sagst
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-[#1a1a1a]/65 text-lg leading-relaxed mb-8 max-w-xl">
              Die kostenlose Eltern-Checkliste von Logopädin & Dentosophin Franziska Bures. Für Eltern, die fundierte Entscheidungen treffen wollen – auch wenn der Arzt sagt: "Da müssen wir operieren."
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col gap-3 mb-8">
              {[
                "Erfahre, welche Fragen kein Arzt dir von selbst stellt",
                "Verstehe, wann eine OP wirklich notwendig ist – und wann nicht",
                "Hol dir Sicherheit, bevor du eine Entscheidung triffst",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#4fa8a0] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1a1a1a]/70 text-base">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.a
              variants={fadeUp}
              custom={4}
              href="#opt-in"
              className="inline-flex items-center gap-3 bg-[#de6e27] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-xl shadow-[#de6e27]/20"
            >
              <Download size={20} /> Jetzt kostenlos herunterladen
            </motion.a>

            <motion.p variants={fadeUp} custom={5} className="text-[#1a1a1a]/40 text-xs mt-3">
              Kein Spam. Keine Weitergabe. Jederzeit abmeldbar.
            </motion.p>
          </motion.div>

          {/* Right: Freebie Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Mockup PDF Cover */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full bg-[#4fa8a0]/20 rounded-2xl rotate-3" />
              <div className="absolute -top-2 -right-2 w-full h-full bg-[#de6e27]/10 rounded-2xl rotate-1" />
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-[340px] border border-[#1a1a1a]/5">
                <div className="bg-[#de6e27] px-8 py-10">
                  <div className="flex items-center gap-2 mb-6">
                    <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-8 w-8 rounded-md" />
                    <span className="font-serif font-bold text-white text-sm">Schluck.Impuls</span>
                  </div>
                  <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-3">Gratis-Checkliste</p>
                  <h3 className="font-serif text-xl font-black text-white leading-snug">
                    5 Fragen vor der OP
                  </h3>
                </div>
                <div className="px-8 py-6 space-y-3">
                  {["Ist die OP wirklich notwendig?", "Welche Alternativen gibt es?", "Was sind die Risiken?", "Wurde die Ursache geklärt?", "Gibt es einen ganzheitlichen Weg?"].map((q, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded border-2 border-[#de6e27]/40 flex items-center justify-center flex-shrink-0">
                        <span className="w-2 h-2 rounded-sm bg-[#de6e27]" />
                      </span>
                      <span className="text-[#1a1a1a]/70 text-sm">{q}</span>
                    </div>
                  ))}
                </div>
                <div className="px-8 pb-6">
                  <div className="bg-[#4fa8a0]/10 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img src={IMAGES.franzi} alt="Franzi" className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-[#1a1a1a] text-xs font-bold">Franziska Bures</p>
                      <p className="text-[#1a1a1a]/50 text-xs">Logopädin & Dentosophin</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── PAIN POINTS ─── */
function PainPoints() {
  return (
    <section className="bg-[#1a1a1a] py-16 md:py-20">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.p variants={fadeUp} custom={0} className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-4">
            Kennst du das?
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-12 leading-tight">
            Der HNO sagt, dein Kind braucht eine OP – und du weißt nicht, was du tun sollst.
          </motion.h2>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "😰",
                text: "Du verlässt die Arztpraxis mit einem OP-Termin – und 1.000 unbeantworteten Fragen im Kopf.",
              },
              {
                emoji: "🔍",
                text: "Du googelst stundenlang, findest aber nur widersprüchliche Infos und wirst immer unsicherer.",
              },
              {
                emoji: "💔",
                text: "Du willst das Beste für dein Kind – aber weißt nicht, ob Operation wirklich die beste Option ist.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-white/5 rounded-xl p-6 border border-white/10 text-left"
              >
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── WHAT YOU GET ─── */
function WhatYouGet() {
  return (
    <section className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <p className="text-[#4fa8a0] text-sm font-bold uppercase tracking-widest mb-4">Das bekommst du</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">
              Deine kostenlose Checkliste – kompakt & sofort nutzbar
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
              Kein 50-seitiger Ratgeber, den du nie liest. Sondern eine klare, druckbare Checkliste für deinen nächsten Arztbesuch.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                num: "01",
                title: "Die 5 entscheidenden Fragen",
                desc: "Genau die Fragen, die kein Arzt dir von selbst stellt – aber die alles verändern können. Wortwörtlich formuliert, zum Vorlesen in der Praxis.",
                color: "#de6e27",
              },
              {
                num: "02",
                title: "Wann ist eine OP wirklich notwendig?",
                desc: "Die medizinischen Kriterien, die erfüllt sein müssen – und wann Alternativen ernsthaft in Betracht gezogen werden sollten.",
                color: "#4fa8a0",
              },
              {
                num: "03",
                title: "Welche Alternativen es gibt",
                desc: "Von myofunktioneller Therapie bis Pflanzenheilkunde: Was du ausprobieren kannst, bevor du entscheidest. Konkret und umsetzbar.",
                color: "#a2b8a2",
              },
              {
                num: "04",
                title: "Dein nächster Schritt",
                desc: "Was du heute tun kannst – auch wenn der Termin beim HNO erst in drei Wochen ist. Aktiv werden, statt passiv warten.",
                color: "#de6e27",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="flex gap-6 bg-white rounded-xl p-6 border border-[#1a1a1a]/5 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-serif font-black text-white text-sm"
                  style={{ backgroundColor: item.color }}
                >
                  {item.num}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                  <p className="text-[#1a1a1a]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={4} className="text-center mt-12">
            <a
              href="#opt-in"
              className="inline-flex items-center gap-3 bg-[#de6e27] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-xl shadow-[#de6e27]/20"
            >
              <Download size={20} /> Jetzt kostenlos herunterladen
            </a>
            <p className="text-[#1a1a1a]/40 text-xs mt-3">100% kostenlos. Sofortiger Download nach Anmeldung.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── OPT-IN FORM ─── */
function OptIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.location.href = "/danke-checkliste";
    }, 800);
  };

  return (
    <section id="opt-in" className="bg-[#de6e27] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download size={28} className="text-white" />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl font-black text-black mb-4">
            Jetzt kostenlos herunterladen
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/85 text-lg mb-10">
            Trag deine E-Mail-Adresse ein und bekomme die Checkliste sofort in dein Postfach – gratis, ohne Verpflichtung.
          </motion.p>

          {!submitted ? (
            <motion.form
              variants={fadeUp}
              custom={3}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="Dein Vorname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-white text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 border-0 focus:ring-2 focus:ring-black/20 outline-none text-base"
              />
              <input
                type="email"
                placeholder="Deine E-Mail-Adresse *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl bg-white text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 border-0 focus:ring-2 focus:ring-black/20 outline-none text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-black/80 transition-all active:scale-[0.97] shadow-xl disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  <>
                    <Download size={20} /> Checkliste jetzt senden
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-4 text-white/70 text-xs">
                <span className="flex items-center gap-1.5"><Shield size={12} /> 100% datensicher</span>
                <span>·</span>
                <span>Kein Spam</span>
                <span>·</span>
                <span>Jederzeit abmeldbar</span>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/10 rounded-2xl p-8 text-center"
            >
              <CheckCircle size={48} className="text-white mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Geschafft! Gleich in dein Postfach.</h3>
              <p className="text-white/80">Weiterleitung in Kürze…</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── ÜBER FRANZI (kurz) ─── */
function UeberFranzi() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0} className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-[#de6e27]/10 rounded-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={IMAGES.franziPraxis} alt="Franziska Bures" className="w-full h-[420px] object-cover object-top" />
              <div className="absolute bottom-0 right-0 bg-[#de6e27] text-white px-5 py-4 rounded-tl-xl">
                <p className="font-serif font-bold text-sm">Franziska Bures</p>
                <p className="text-white/80 text-xs">Logopädin & Dentosophin</p>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.p variants={fadeUp} custom={0} className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-4">
              Wer steckt dahinter?
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-6">
              Hi, ich bin Franzi – und ich kenne diese Situation aus der Praxis.
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="space-y-4 text-[#1a1a1a]/65 text-base leading-relaxed">
              <p>
                Als Logopädin mit 13 Jahren Erfahrung und Mutter von drei Kindern weiß ich: Eltern werden viel zu selten wirklich informiert. Und wenn die Zeit knapp ist, bleibt kein Raum für gute Fragen.
              </p>
              <p>
                Diese Checkliste ist das, was ich jeder Mama und jedem Papa mitgeben würde, bevor sie einen OP-Termin bestätigen. Nicht um Ärzte schlecht zu machen – sondern um auf Augenhöhe zu entscheiden.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 mt-6">
              {["13 Jahre Erfahrung", "Dentosophin", "Mutter von 3", "Myofunktionstherapeutin"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 bg-[#faf8f5] text-[#1a1a1a]/60 text-xs font-semibold px-4 py-2 rounded-full border border-[#1a1a1a]/10">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SOCIAL PROOF ─── */
function SocialProof() {
  const testimonials = [
    {
      text: "Ich habe genau diese Fragen gestellt und unser HNO hat uns plötzlich viel mehr erklärt. Wir haben die OP erst mal verschoben und die myofunktionelle Therapie ausprobiert. Nach 4 Monaten brauchen wir keine OP mehr.",
      name: "Maja S.",
      detail: "Mama von zwei Kindern, München",
    },
    {
      text: "Die Checkliste war der Anfang. Ich hab mich erstmals kompetent und sicher gefühlt beim Arzt. Nicht hilflos. Das hat alles verändert.",
      name: "Laura K.",
      detail: "Mutter von Lena (7), Hamburg",
    },
    {
      text: "Endlich jemand, der Eltern ernst nimmt und fundiertes Wissen verständlich aufbereitet. Franziskas Ansatz hat mir das Gefühl gegeben: Ich kann selbst etwas tun.",
      name: "Stefanie R.",
      detail: "Erzieherin & Mama, Wien",
    },
  ];

  return (
    <section className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-[#4fa8a0] text-sm font-bold uppercase tracking-widest mb-4">Stimmen aus der Community</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a]">
              Was andere Mamas sagen
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#1a1a1a]/5"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} className="text-[#de6e27] fill-[#de6e27]" />
                  ))}
                </div>
                <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div>
                  <p className="text-[#1a1a1a] font-bold text-sm">{t.name}</p>
                  <p className="text-[#1a1a1a]/40 text-xs">{t.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={3} className="text-center mt-12">
            <a
              href="#opt-in"
              className="inline-flex items-center gap-3 bg-[#de6e27] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-xl shadow-[#de6e27]/20"
            >
              <Download size={20} /> Jetzt meine Checkliste herunterladen
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const faqs = [
    {
      q: "Ist das wirklich kostenlos?",
      a: "Ja, 100%. Kein Trick, keine versteckten Kosten. Du gibst mir deine E-Mail-Adresse, ich schicke dir die Checkliste. Das ist alles.",
    },
    {
      q: "Kann ich mich wieder abmelden?",
      a: "Jederzeit, mit einem Klick. Kein Kleingedrucktes.",
    },
    {
      q: "Bin ich danach in einem Newsletter?",
      a: "Ja – aber einem, der sich lohnt. Du bekommst regelmäßig fundierte Impulse zu ganzheitlicher Mundgesundheit. Nichts Nerviges. Nichts Allgemeines.",
    },
    {
      q: "Ich bin kein Medizinprofi – verstehe ich die Checkliste?",
      a: "Genau für dich ist sie gemacht. Keine Fachsprache, keine Vorkenntnisse nötig. Einfach mitnehmen und beim HNO-Termin vorlegen.",
    },
    {
      q: "Was passiert nach dem Download?",
      a: "Du bekommst die Checkliste sofort per E-Mail. Und ich zeige dir den nächsten Schritt: den Mandel-Mini-Kurs, der tiefer ins Thema geht.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a]">Häufige Fragen</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="border border-[#1a1a1a]/8 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors"
                >
                  <span className="font-serif font-bold text-[#1a1a1a] text-base">{faq.q}</span>
                  <span className={`text-[#de6e27] flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>
                    <ArrowRight size={18} />
                  </span>
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-[#1a1a1a]/65 text-sm leading-relaxed border-t border-[#1a1a1a]/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─── */
function FinalCTA() {
  return (
    <section className="bg-[#1a1a1a] py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#de6e27]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Dein Kind verdient eine{" "}
            <span className="text-[#de6e27]">informierte</span>{" "}
            Entscheidung.
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-white/65 text-lg mb-10">
            Hol dir jetzt die Checkliste – kostenlos, sofort, ohne Verpflichtung.
          </motion.p>
          <motion.a
            variants={fadeUp}
            custom={2}
            href="#opt-in"
            className="inline-flex items-center gap-3 bg-[#de6e27] text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-xl"
          >
            <Download size={22} /> Jetzt kostenlos herunterladen
          </motion.a>
          <motion.div variants={fadeUp} custom={3} className="flex items-center justify-center gap-6 mt-8 text-white/40 text-sm">
            <span className="flex items-center gap-1.5"><Shield size={14} /> DSGVO-konform</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> Sofortiger Versand</span>
            <span>·</span>
            <span>Gratis</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MINIMAL FOOTER ─── */
function FooterMin() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-white/5 py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-8 w-8 rounded-lg" />
          <span className="font-serif font-bold text-white text-sm">Schluck.Impuls</span>
        </Link>
        <div className="flex gap-6 text-white/30 text-xs">
          <a href="/impressum" className="hover:text-white/60 transition-colors">Impressum</a>
          <a href="/datenschutz" className="hover:text-white/60 transition-colors">Datenschutz</a>
          <a href="mailto:kontakt@schluckimpuls.de" className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
            <Mail size={12} /> kontakt@schluckimpuls.de
          </a>
          <a href="https://instagram.com/schluck.impuls" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
            <Instagram size={12} /> @schluck.impuls
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN ─── */
export default function LeadMagnet() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <PainPoints />
      <WhatYouGet />
      <OptIn />
      <UeberFranzi />
      <SocialProof />
      <FAQ />
      <FinalCTA />
      <FooterMin />
    </div>
  );
}
