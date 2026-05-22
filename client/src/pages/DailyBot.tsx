import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Target,
  Clock,
  TrendingUp,
  RefreshCw,
  BarChart3,
  Send,
  MessageSquare,
  X,
  SkipForward,
  Info,
  Lightbulb,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  estimated_minutes: number;
  revenue_impact: "Hoch" | "Mittel" | "Niedrig";
}

interface DayData {
  motivation: string;
  phase_info: string;
  tasks: Task[];
  daily_tip: string;
}

interface ChatMessage {
  role: "user" | "bot";
  content: string;
  streaming?: boolean;
}

interface StoredProgress {
  startDate: string;
  completedByDay: Record<number, string[]>;
  skippedByDay: Record<number, string[]>;
  currentDayData: DayData | null;
  lastGeneratedDay: number | null;
}

const STORAGE_KEY = "schluckimpuls_bot_v2";
const OG = "#de6e27";
const SAGE = "#a2b8a2";

function getDayNumber(startDate: string): number {
  const start = new Date(startDate);
  const today = new Date();
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(diff + 1, 1), 90);
}

function catColor(cat: string) {
  const map: Record<string, string> = {
    Content: "#de6e27",
    Marketing: "#4fa8a0",
    Verkauf: "#c0392b",
    Technik: "#7f8c8d",
    Community: "#a2b8a2",
    Strategie: "#8e44ad",
  };
  return map[cat] || OG;
}

function impactBadge(impact: string) {
  if (impact === "Hoch") return "bg-red-100 text-red-700";
  if (impact === "Mittel") return "bg-yellow-100 text-yellow-700";
  return "bg-gray-100 text-gray-500";
}

async function streamToString(
  url: string,
  body: object,
  onChunk: (text: string) => void
): Promise<string> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("API error");
  const reader = res.body!.getReader();
  const dec = new TextDecoder();
  let full = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    for (const line of dec.decode(value).split("\n")) {
      if (line.startsWith("data: ") && line !== "data: [DONE]") {
        try {
          const { text } = JSON.parse(line.slice(6));
          full += text;
          onChunk(full);
        } catch {}
      }
    }
  }
  return full;
}

export default function DailyBot() {
  const [progress, setProgress] = useState<StoredProgress>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) return JSON.parse(s);
    } catch {}
    return {
      startDate: new Date().toISOString(),
      completedByDay: {},
      skippedByDay: {},
      currentDayData: null,
      lastGeneratedDay: null,
    };
  });

  const [generating, setGenerating] = useState(false);
  const [morningContext, setMorningContext] = useState("");
  const [showCheckin, setShowCheckin] = useState(false);
  const [view, setView] = useState<"today" | "progress">("today");

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [focusTaskId, setFocusTaskId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const day = getDayNumber(progress.startDate);
  const completedToday = progress.completedByDay[day] || [];
  const totalCompleted = Object.values(progress.completedByDay).flat().length;
  const phase = day <= 30 ? 1 : day <= 60 ? 2 : 3;
  const phaseLabel = phase === 1 ? "Aufbau" : phase === 2 ? "Wachstum" : "Skalierung";
  const dayData = progress.lastGeneratedDay === day ? progress.currentDayData : null;
  const completionRate = dayData
    ? Math.round((completedToday.length / dayData.tasks.length) * 100)
    : 0;

  // Persist progress
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Auto-focus chat input when opened
  useEffect(() => {
    if (chatOpen) setTimeout(() => chatInputRef.current?.focus(), 100);
  }, [chatOpen]);

  // Auto-generate tasks on load if new day
  useEffect(() => {
    if (!dayData && !generating) {
      // Show check-in if it's the first visit today
      setShowCheckin(true);
    }
  }, []);

  const generateTasks = useCallback(async () => {
    setGenerating(true);
    setShowCheckin(false);
    const yesterdayCompleted = progress.completedByDay[day - 1] || [];

    try {
      let fullText = "";
      await streamToString(
        "/api/daily-tasks",
        { day, completedTasks: yesterdayCompleted, morningContext },
        (partial) => { fullText = partial; }
      );
      const match = fullText.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed: DayData = JSON.parse(match[0]);
        setProgress((prev) => ({
          ...prev,
          currentDayData: parsed,
          lastGeneratedDay: day,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  }, [day, morningContext, progress.completedByDay]);

  const toggleTask = (taskId: string) => {
    setProgress((prev) => {
      const cur = prev.completedByDay[day] || [];
      return {
        ...prev,
        completedByDay: {
          ...prev.completedByDay,
          [day]: cur.includes(taskId) ? cur.filter((id) => id !== taskId) : [...cur, taskId],
        },
      };
    });
  };

  const openChat = (taskId: string) => {
    setFocusTaskId(taskId);
    setChatOpen(true);
    if (chatMessages.length === 0) {
      const task = dayData?.tasks.find((t) => t.id === taskId);
      if (task) {
        setChatMessages([
          {
            role: "bot",
            content: `Ich bin für Aufgabe **"${task.title}"** bereit. Schreib "skip" um sie zu überspringen, "details" für mehr Infos, oder stell mir eine Frage dazu.`,
          },
        ]);
      }
    }
  };

  const sendChat = useCallback(
    async (text?: string) => {
      const msg = (text ?? chatInput).trim();
      if (!msg || chatLoading || !dayData) return;

      setChatInput("");
      setChatMessages((prev) => [...prev, { role: "user", content: msg }]);
      setChatLoading(true);

      const botMsgIndex = chatMessages.length + 1;
      setChatMessages((prev) => [...prev, { role: "bot", content: "", streaming: true }]);

      try {
        let fullReply = "";
        await streamToString(
          "/api/task-chat",
          { message: msg, tasks: dayData.tasks, focusTaskId, day },
          (partial) => {
            fullReply = partial;
            setChatMessages((prev) => {
              const updated = [...prev];
              updated[botMsgIndex] = { role: "bot", content: partial, streaming: true };
              return updated;
            });
          }
        );

        // Parse REPLACE_TASK action
        const replaceMatch = fullReply.match(/REPLACE_TASK:(\{.*\})/);
        if (replaceMatch) {
          try {
            const newTask: Task = JSON.parse(replaceMatch[1]);
            const cleanReply = fullReply.replace(/\nREPLACE_TASK:\{.*\}/, "").trim();
            setChatMessages((prev) => {
              const updated = [...prev];
              updated[botMsgIndex] = { role: "bot", content: cleanReply, streaming: false };
              return updated;
            });
            setProgress((prev) => {
              if (!prev.currentDayData) return prev;
              const tasks = prev.currentDayData.tasks.map((t) =>
                t.id === focusTaskId ? { ...newTask, id: focusTaskId! } : t
              );
              return {
                ...prev,
                currentDayData: { ...prev.currentDayData, tasks },
                skippedByDay: {
                  ...prev.skippedByDay,
                  [day]: [...(prev.skippedByDay[day] || []), focusTaskId!],
                },
              };
            });
          } catch {}
        } else {
          setChatMessages((prev) => {
            const updated = [...prev];
            updated[botMsgIndex] = { role: "bot", content: fullReply, streaming: false };
            return updated;
          });
        }
      } catch {
        setChatMessages((prev) => {
          const updated = [...prev];
          updated[botMsgIndex] = {
            role: "bot",
            content: "Entschuldigung, da ist etwas schiefgelaufen.",
            streaming: false,
          };
          return updated;
        });
      } finally {
        setChatLoading(false);
      }
    },
    [chatInput, chatLoading, dayData, focusTaskId, day, chatMessages.length]
  );

  const focusTask = dayData?.tasks.find((t) => t.id === focusTaskId);

  return (
    <div className="min-h-screen bg-[#faf8f5]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div className="bg-black text-white px-5 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase" style={{ color: OG }}>
              Schluck.Impuls
            </div>
            <h1 className="text-lg font-bold leading-tight">90-Tage Business Bot</h1>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Ziel</div>
            <div className="font-bold" style={{ color: OG }}>15.000€/Mo</div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-xl mx-auto mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Tag {day} / 90</span>
            <span style={{ color: SAGE }}>Phase {phase}: {phaseLabel}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <motion.div
              className="h-1.5 rounded-full"
              style={{ backgroundColor: OG }}
              initial={{ width: 0 }}
              animate={{ width: `${(day / 90) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-5">
        <div className="max-w-xl mx-auto flex gap-5">
          {(["today", "progress"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                view === v ? "" : "border-transparent text-gray-400"
              }`}
              style={view === v ? { color: OG, borderColor: OG } : {}}
            >
              {v === "today" ? "Heute" : "Fortschritt"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-xl mx-auto px-5 py-5 pb-32">
        {view === "today" && (
          <>
            {/* Morning check-in (before tasks are generated) */}
            {showCheckin && !dayData && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-200 p-5 mb-4"
              >
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: OG }}>
                  Guten Morgen, Franziska!
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Tag {day} von 90. Kurzer Check-in bevor dein Tagesplan erstellt wird:
                </p>
                <textarea
                  value={morningContext}
                  onChange={(e) => setMorningContext(e.target.value)}
                  placeholder="Wie war gestern? Gibt es heute etwas Besonderes? (optional)"
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none mb-4 focus:outline-none focus:border-orange-300"
                  rows={3}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={generateTasks}
                    disabled={generating}
                    className="flex-1 text-white text-sm font-semibold py-2.5 rounded-xl transition-opacity"
                    style={{ backgroundColor: OG, opacity: generating ? 0.7 : 1 }}
                  >
                    {generating ? "Wird erstellt…" : "Tagesplan erstellen →"}
                  </button>
                  <button
                    onClick={() => { setShowCheckin(false); generateTasks(); }}
                    className="px-4 text-sm text-gray-400 border border-gray-200 rounded-xl hover:text-gray-600"
                  >
                    Überspringen
                  </button>
                </div>
              </motion.div>
            )}

            {/* Loading state */}
            {generating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-gray-400"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-gray-200 border-t-orange-400 rounded-full mb-4"
                />
                <div className="text-sm">Dein Coach denkt nach…</div>
              </motion.div>
            )}

            {/* Tasks */}
            {dayData && !generating && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Motivation banner */}
                <div
                  className="rounded-2xl p-4 mb-4 text-white"
                  style={{ backgroundColor: OG }}
                >
                  <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">
                    Tag {day} · Motivation
                  </div>
                  <p className="font-medium leading-snug">{dayData.motivation}</p>
                  <p className="text-xs mt-2 opacity-70">{dayData.phase_info}</p>
                </div>

                {/* Progress ring */}
                {completedToday.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-3 mb-4 flex items-center gap-3">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3.5" />
                        <circle
                          cx="18" cy="18" r="15.9" fill="none"
                          stroke={OG} strokeWidth="3.5"
                          strokeDasharray={`${completionRate} ${100 - completionRate}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                        {completionRate}%
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">
                        {completedToday.length}/{dayData.tasks.length} erledigt
                      </div>
                      <div className="text-xs text-gray-400">
                        {completionRate === 100 ? "Perfekter Tag! 🎯" : `Noch ${dayData.tasks.length - completedToday.length} übrig`}
                      </div>
                    </div>
                  </div>
                )}

                {/* Task list */}
                <div className="space-y-2.5 mb-4">
                  {dayData.tasks.map((task, i) => {
                    const done = completedToday.includes(task.id);
                    const isActive = focusTaskId === task.id && chatOpen;
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className={`bg-white rounded-2xl border transition-all ${
                          done
                            ? "border-green-200"
                            : isActive
                            ? "border-orange-300 shadow-sm"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start gap-3 p-4">
                          {/* Checkbox */}
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="mt-0.5 flex-shrink-0"
                          >
                            {done ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300 hover:text-gray-400" />
                            )}
                          </button>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span
                                className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                                style={{ backgroundColor: catColor(task.category) }}
                              >
                                {task.category}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${impactBadge(task.revenue_impact)}`}>
                                {task.revenue_impact}
                              </span>
                            </div>
                            <div className={`text-sm font-semibold ${done ? "line-through text-gray-400" : "text-gray-900"}`}>
                              {task.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                              {task.description}
                            </div>
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              {task.estimated_minutes} Min.
                            </div>
                          </div>

                          {/* Chat button */}
                          <button
                            onClick={() => openChat(task.id)}
                            title="Mit Coach besprechen"
                            className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
                              isActive
                                ? "text-white"
                                : "text-gray-300 hover:text-gray-500"
                            }`}
                            style={isActive ? { backgroundColor: OG } : {}}
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Daily tip */}
                <div
                  className="rounded-2xl p-4 mb-4 border text-sm text-gray-700"
                  style={{ borderColor: SAGE, backgroundColor: `${SAGE}18` }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Lightbulb className="w-3.5 h-3.5" style={{ color: "#6b9b6b" }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b9b6b" }}>
                      Tipp des Tages
                    </span>
                  </div>
                  {dayData.daily_tip}
                </div>

                <button
                  onClick={() => setShowCheckin(true)}
                  className="text-xs text-gray-400 flex items-center gap-1 hover:text-gray-600"
                >
                  <RefreshCw className="w-3 h-3" />
                  Neue Aufgaben generieren
                </button>
              </motion.div>
            )}
          </>
        )}

        {view === "progress" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: "Aktueller Tag", value: `${day}/90`, icon: Target, color: OG },
                { label: "Gesamt erledigt", value: totalCompleted, icon: CheckCircle2, color: "#22c55e" },
                { label: "Phase", value: phaseLabel, icon: TrendingUp, color: SAGE },
                { label: "Heute", value: `${completedToday.length}/${dayData?.tasks.length ?? 5}`, icon: BarChart3, color: "#4fa8a0" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-200 p-4">
                  <Icon className="w-4 h-4 mb-2" style={{ color }} />
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              ))}
            </div>

            {/* 90-day grid */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
              <div className="text-sm font-semibold text-gray-900 mb-3">90-Tage Übersicht</div>
              <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(18, 1fr)" }}>
                {Array.from({ length: 90 }, (_, i) => {
                  const d = i + 1;
                  const done = (progress.completedByDay[d]?.length ?? 0) > 0;
                  const isToday = d === day;
                  const isPast = d < day;
                  return (
                    <div
                      key={d}
                      title={`Tag ${d}`}
                      className="aspect-square rounded-sm"
                      style={{
                        backgroundColor: isToday ? OG : done ? `${OG}80` : isPast ? "#e5e7eb" : "#f9fafb",
                        outline: isToday ? `2px solid ${OG}` : "none",
                        outlineOffset: "1px",
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex gap-4 mt-3 text-xs text-gray-400">
                {[
                  { color: OG, label: "Heute" },
                  { color: `${OG}80`, label: "Erledigt" },
                  { color: "#e5e7eb", label: "Vergangen" },
                ].map(({ color, label }) => (
                  <span key={label} className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color, display: "inline-block" }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-5">
              <div className="text-sm font-semibold text-gray-900 mb-4">Roadmap zu 15.000€</div>
              {[
                { p: 1, label: "Aufbau", days: "Tag 1–30", goal: "Fundament & erste Einnahmen", target: "2.000–5.000€" },
                { p: 2, label: "Wachstum", days: "Tag 31–60", goal: "Reichweite & Conversion", target: "5.000–10.000€" },
                { p: 3, label: "Skalierung", days: "Tag 61–90", goal: "Automatisierung & Premium", target: "10.000–15.000€+" },
              ].map(({ p, label, days, goal, target }) => (
                <div
                  key={p}
                  className={`flex gap-3 pb-3 mb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0 ${phase < p ? "opacity-35" : ""}`}
                >
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: phase >= p ? OG : "#d1d5db" }}
                  >
                    {p}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {label} <span className="text-xs font-normal text-gray-400">{days}</span>
                    </div>
                    <div className="text-xs text-gray-500">{goal}</div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: OG }}>{target}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                if (confirm("Wirklich zurücksetzen? Alle Daten werden gelöscht.")) {
                  const fresh: StoredProgress = {
                    startDate: new Date().toISOString(),
                    completedByDay: {},
                    skippedByDay: {},
                    currentDayData: null,
                    lastGeneratedDay: null,
                  };
                  setProgress(fresh);
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
                  setShowCheckin(true);
                  setView("today");
                }
              }}
              className="text-xs text-red-400 hover:text-red-600"
            >
              Fortschritt zurücksetzen
            </button>
          </motion.div>
        )}
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl"
            style={{ maxHeight: "65vh", display: "flex", flexDirection: "column" }}
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: OG }}
              >
                KI
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900">Business Coach</div>
                {focusTask && (
                  <div className="text-xs text-gray-400 truncate">Fokus: {focusTask.title}</div>
                )}
              </div>
              {/* Quick action chips */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => sendChat("skip")}
                  title="Diese Aufgabe überspringen"
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500"
                >
                  <SkipForward className="w-3 h-3" />
                  Skip
                </button>
                <button
                  onClick={() => sendChat("Mehr Details bitte")}
                  title="Mehr Details zur Aufgabe"
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500"
                >
                  <Info className="w-3 h-3" />
                  Details
                </button>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-gray-600 ml-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    } ${msg.streaming ? "opacity-80" : ""}`}
                    style={msg.role === "user" ? { backgroundColor: OG } : {}}
                  >
                    {msg.content || (msg.streaming ? "…" : "")}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-3 border-t border-gray-100 flex gap-2">
              <input
                ref={chatInputRef}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
                placeholder="Frag mich etwas, oder schreib 'skip'…"
                className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-orange-300"
                disabled={chatLoading}
              />
              <button
                onClick={() => sendChat()}
                disabled={chatLoading || !chatInput.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white disabled:opacity-40 transition-opacity"
                style={{ backgroundColor: OG }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
