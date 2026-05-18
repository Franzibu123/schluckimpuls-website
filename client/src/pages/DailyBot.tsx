import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Zap, Target, Clock, TrendingUp, RefreshCw, ChevronRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface StoredProgress {
  startDate: string;
  completedByDay: Record<number, string[]>;
  currentDayData: DayData | null;
  lastGeneratedDay: number | null;
}

const STORAGE_KEY = "schluckimpuls_bot_progress";
const BRAND_ORANGE = "#de6e27";
const BRAND_SAGE = "#a2b8a2";

function getDayNumber(startDate: string): number {
  const start = new Date(startDate);
  const today = new Date();
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(diff + 1, 1), 90);
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Content: "#de6e27",
    Marketing: "#4fa8a0",
    Verkauf: "#c0392b",
    Technik: "#7f8c8d",
    Community: "#a2b8a2",
    Strategie: "#8e44ad",
  };
  return colors[category] || "#de6e27";
}

function getImpactBadge(impact: string) {
  const styles: Record<string, string> = {
    Hoch: "bg-red-100 text-red-700",
    Mittel: "bg-yellow-100 text-yellow-700",
    Niedrig: "bg-gray-100 text-gray-600",
  };
  return styles[impact] || styles["Niedrig"];
}

export default function DailyBot() {
  const [progress, setProgress] = useState<StoredProgress>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return {
      startDate: new Date().toISOString(),
      completedByDay: {},
      currentDayData: null,
      lastGeneratedDay: null,
    };
  });

  const [loading, setLoading] = useState(false);
  const [streamBuffer, setStreamBuffer] = useState("");
  const [businessContext, setBusinessContext] = useState("");
  const [showContextInput, setShowContextInput] = useState(false);
  const [view, setView] = useState<"today" | "progress">("today");

  const day = getDayNumber(progress.startDate);
  const completedToday = progress.completedByDay[day] || [];
  const totalCompleted = Object.values(progress.completedByDay).flat().length;
  const phase = day <= 30 ? 1 : day <= 60 ? 2 : 3;
  const phaseLabel = phase === 1 ? "Aufbau" : phase === 2 ? "Wachstum" : "Skalierung";

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const generateTasks = useCallback(async () => {
    setLoading(true);
    setStreamBuffer("");

    const yesterdayCompleted = progress.completedByDay[day - 1] || [];

    try {
      const response = await fetch("/api/daily-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day,
          completedTasks: yesterdayCompleted,
          businessContext,
        }),
      });

      if (!response.ok) throw new Error("API Fehler");

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const data = JSON.parse(line.slice(6));
              fullText += data.text;
              setStreamBuffer(fullText);
            } catch {}
          }
        }
      }

      // Extract JSON from the streamed response
      const jsonMatch = fullText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed: DayData = JSON.parse(jsonMatch[0]);
        setProgress((prev) => ({
          ...prev,
          currentDayData: parsed,
          lastGeneratedDay: day,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setStreamBuffer("");
    }
  }, [day, businessContext, progress.completedByDay]);

  const toggleTask = (taskId: string) => {
    setProgress((prev) => {
      const current = prev.completedByDay[day] || [];
      const updated = current.includes(taskId)
        ? current.filter((id) => id !== taskId)
        : [...current, taskId];
      return {
        ...prev,
        completedByDay: { ...prev.completedByDay, [day]: updated },
      };
    });
  };

  const resetProgress = () => {
    if (confirm("Willst du wirklich von vorne beginnen? Alle Daten werden gelöscht.")) {
      const fresh: StoredProgress = {
        startDate: new Date().toISOString(),
        completedByDay: {},
        currentDayData: null,
        lastGeneratedDay: null,
      };
      setProgress(fresh);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    }
  };

  const dayData = progress.lastGeneratedDay === day ? progress.currentDayData : null;
  const completionRate = dayData ? Math.round((completedToday.length / dayData.tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#faf8f5]" style={{ fontFamily: "DM Sans, sans-serif" }}>
      {/* Header */}
      <div className="bg-black text-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: BRAND_ORANGE }}>
              Schluck.Impuls
            </span>
            <h1 className="text-xl font-bold">90-Tage Business Bot</h1>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Ziel</div>
            <div className="text-lg font-bold" style={{ color: BRAND_ORANGE }}>
              15.000€/Monat
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-black px-6 pb-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Tag {day} von 90</span>
            <span className="font-medium" style={{ color: BRAND_SAGE }}>
              Phase {phase}: {phaseLabel}
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ width: 0 }}
              animate={{ width: `${(day / 90) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="border-b border-gray-200 bg-white px-6">
        <div className="max-w-2xl mx-auto flex gap-6">
          {(["today", "progress"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                view === v ? "border-current" : "border-transparent text-gray-500"
              }`}
              style={view === v ? { color: BRAND_ORANGE, borderColor: BRAND_ORANGE } : {}}
            >
              {v === "today" ? "Heute" : "Fortschritt"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {view === "today" && (
          <>
            {/* Generate button / context */}
            {!dayData && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: BRAND_ORANGE }}
                    >
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Tag {day} – Aufgaben generieren</div>
                      <div className="text-sm text-gray-500">Dein KI-Coach erstellt deinen Tagesplan</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowContextInput(!showContextInput)}
                    className="text-sm text-gray-500 underline mb-4 block"
                  >
                    {showContextInput ? "Kontext ausblenden" : "+ Heutigen Kontext hinzufügen (optional)"}
                  </button>

                  {showContextInput && (
                    <textarea
                      value={businessContext}
                      onChange={(e) => setBusinessContext(e.target.value)}
                      placeholder="Z.B.: Ich habe gerade 200 neue Follower auf Instagram, möchte meinen Kurs nächste Woche launchen..."
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none mb-4"
                      rows={3}
                    />
                  )}

                  <Button
                    onClick={generateTasks}
                    disabled={loading}
                    className="w-full text-white font-semibold py-3 rounded-xl"
                    style={{ backgroundColor: BRAND_ORANGE }}
                  >
                    {loading ? "Wird generiert..." : "Aufgaben für heute generieren"}
                    {!loading && <ChevronRight className="ml-2 w-4 h-4" />}
                  </Button>
                </div>

                {/* Streaming preview */}
                {streamBuffer && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border text-sm text-gray-600 font-mono whitespace-pre-wrap">
                    {streamBuffer.slice(-300)}
                  </div>
                )}
              </motion.div>
            )}

            {/* Day data loaded */}
            {dayData && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Motivation */}
                <div
                  className="rounded-2xl p-5 mb-5 text-white"
                  style={{ backgroundColor: BRAND_ORANGE }}
                >
                  <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
                    Motivation für Tag {day}
                  </div>
                  <p className="text-lg font-medium leading-snug">{dayData.motivation}</p>
                  <div className="mt-3 pt-3 border-t border-white/20 text-sm opacity-80">
                    {dayData.phase_info}
                  </div>
                </div>

                {/* Completion meter */}
                {completedToday.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-5 flex items-center gap-4">
                    <div className="relative w-14 h-14">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.9"
                          fill="none"
                          stroke={BRAND_ORANGE}
                          strokeWidth="3"
                          strokeDasharray={`${completionRate} ${100 - completionRate}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                        {completionRate}%
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {completedToday.length}/{dayData.tasks.length} erledigt
                      </div>
                      <div className="text-sm text-gray-500">
                        {completionRate === 100 ? "Perfekter Tag! Weiter so!" : "Du schaffst das!"}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tasks */}
                <div className="space-y-3 mb-5">
                  {dayData.tasks.map((task, i) => {
                    const done = completedToday.includes(task.id);
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => toggleTask(task.id)}
                        className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all ${
                          done ? "border-green-200 bg-green-50/40" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex-shrink-0">
                            {done ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span
                                className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                                style={{ backgroundColor: getCategoryColor(task.category) }}
                              >
                                {task.category}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getImpactBadge(task.revenue_impact)}`}>
                                {task.revenue_impact}er Impact
                              </span>
                            </div>
                            <div className={`font-semibold text-sm ${done ? "line-through text-gray-400" : "text-gray-900"}`}>
                              {task.title}
                            </div>
                            <div className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                              {task.description}
                            </div>
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              ca. {task.estimated_minutes} Min.
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Daily tip */}
                <div
                  className="rounded-2xl p-4 mb-5 border"
                  style={{ borderColor: BRAND_SAGE, backgroundColor: `${BRAND_SAGE}15` }}
                >
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#6b9b6b" }}>
                    Tipp des Tages
                  </div>
                  <p className="text-sm text-gray-700">{dayData.daily_tip}</p>
                </div>

                {/* Regenerate */}
                <button
                  onClick={generateTasks}
                  disabled={loading}
                  className="text-sm text-gray-400 flex items-center gap-1 hover:text-gray-600 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Neue Aufgaben generieren
                </button>
              </motion.div>
            )}
          </>
        )}

        {view === "progress" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "Aktueller Tag", value: `${day}/90`, icon: Target, color: BRAND_ORANGE },
                { label: "Aufgaben erledigt", value: totalCompleted, icon: CheckCircle2, color: "#22c55e" },
                { label: "Aktuelle Phase", value: phaseLabel, icon: TrendingUp, color: BRAND_SAGE },
                { label: "Heute erledigt", value: `${completedToday.length}/${dayData?.tasks.length ?? 5}`, icon: BarChart3, color: "#4fa8a0" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-200 p-4">
                  <Icon className="w-5 h-5 mb-2" style={{ color }} />
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>

            {/* 90-day grid */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5">
              <div className="font-semibold text-gray-900 mb-3">90-Tage Übersicht</div>
              <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(18, 1fr)" }}>
                {Array.from({ length: 90 }, (_, i) => {
                  const d = i + 1;
                  const done = progress.completedByDay[d]?.length > 0;
                  const isToday = d === day;
                  const isPast = d < day;
                  return (
                    <div
                      key={d}
                      title={`Tag ${d}`}
                      className="aspect-square rounded-sm"
                      style={{
                        backgroundColor: isToday
                          ? BRAND_ORANGE
                          : done
                          ? `${BRAND_ORANGE}80`
                          : isPast
                          ? "#e5e7eb"
                          : "#f9fafb",
                        outline: isToday ? `2px solid ${BRAND_ORANGE}` : "none",
                        outlineOffset: "1px",
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: BRAND_ORANGE }} />
                  Heute
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: `${BRAND_ORANGE}80` }} />
                  Erledigt
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm inline-block bg-gray-200" />
                  Vergangen
                </span>
              </div>
            </div>

            {/* Phase roadmap */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5">
              <div className="font-semibold text-gray-900 mb-4">Roadmap zu 15.000€</div>
              {[
                { phase: 1, label: "Aufbau", days: "Tag 1–30", goal: "Fundament & erste Einnahmen", target: "2.000–5.000€" },
                { phase: 2, label: "Wachstum", days: "Tag 31–60", goal: "Reichweite & Conversionoptimierung", target: "5.000–10.000€" },
                { phase: 3, label: "Skalierung", days: "Tag 61–90", goal: "Automatisierung & Premium", target: "10.000–15.000€+" },
              ].map(({ phase: p, label, days, goal, target }) => (
                <div
                  key={p}
                  className={`flex gap-4 pb-4 mb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0 ${
                    phase < p ? "opacity-40" : ""
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: phase >= p ? BRAND_ORANGE : "#d1d5db" }}
                  >
                    {p}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">
                      Phase {p}: {label}
                      <span className="ml-2 text-xs text-gray-400">{days}</span>
                    </div>
                    <div className="text-sm text-gray-500">{goal}</div>
                    <div className="text-xs font-semibold mt-1" style={{ color: BRAND_ORANGE }}>
                      Ziel: {target}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={resetProgress}
              className="text-xs text-red-400 hover:text-red-600 transition-colors"
            >
              Fortschritt zurücksetzen
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
