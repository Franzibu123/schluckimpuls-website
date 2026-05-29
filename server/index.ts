import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import Anthropic from "@anthropic-ai/sdk";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BUSINESS_CONTEXT_BASE = `Franziska ist die Gründerin von Schluck.Impuls – ganzheitliche Mundraumgesundheit für Kinder (2–15 Jahre).
Zielgruppe: Mütter und Väter im DACH-Raum, die ganzheitliche Ansätze bevorzugen.
Angebote: Online-Kurse, 1:1-Beratungen, digitale Produkte rund um Mundgesundheit bei Kindern.
Branding: Terrakotta-Orange, Salbei, warm, mutig, fachlich tief.
Ziel: 15.000€ monatlicher Umsatz in 90 Tagen.`;

function loadDossiers(): string {
  const dir = path.resolve(__dirname, "..", "data", "dossiers");
  if (!fs.existsSync(dir)) return "";
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith(".md") && f !== "README.md")
    .sort();
  if (files.length === 0) return "";
  const contents = files.map(f => {
    const name = f.replace(/^\d+_/, "").replace(".md", "");
    return `### Dossier: ${name}\n${fs.readFileSync(path.join(dir, f), "utf-8").trim()}`;
  }).join("\n\n");
  return `\n\n## Franziskas Dossiers (${files.length} Dokumente)\n${contents}`;
}

function BUSINESS_CONTEXT() {
  return BUSINESS_CONTEXT_BASE + loadDossiers();
}

// ─── Anthropic helpers ────────────────────────────────────────────────────────

async function generateDayTasks(
  day: number,
  completedYesterday: string[],
  morningContext: string
): Promise<string> {
  const phase =
    day <= 30 ? "Aufbau (Monat 1)" : day <= 60 ? "Wachstum (Monat 2)" : "Skalierung (Monat 3)";

  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system: `Du bist ein erfahrener Online-Business-Coach.
${BUSINESS_CONTEXT()}

Heute ist Tag ${day} von 90. Phase: ${phase}.
${completedYesterday.length > 0 ? `Gestern abgehakt: ${completedYesterday.join(", ")}` : ""}
${morningContext ? `Morgen-Check-in: "${morningContext}"` : ""}

Erstelle genau 5 konkrete Tagesaufgaben. Antworte NUR mit validem JSON:
{
  "motivation": "1-2 motivierende Sätze",
  "phase_info": "Wo Franziska im Plan steht",
  "tasks": [
    {
      "id": "task_1",
      "title": "Kurzer Titel (max 6 Wörter)",
      "description": "Konkret: was genau tun, wie, wo",
      "category": "Content|Marketing|Verkauf|Technik|Community|Strategie",
      "estimated_minutes": 30,
      "revenue_impact": "Hoch|Mittel|Niedrig"
    }
  ],
  "daily_tip": "Ein konkreter Tipp für heute"
}`,
    messages: [{ role: "user", content: `Tag ${day} – erstelle meinen Tagesplan.` }],
  });

  return (msg.content[0] as { text: string }).text;
}

async function chatWithBot(
  userMessage: string,
  tasks: Array<{ id: string; title: string; description: string }>,
  focusTaskId: string | null,
  day: number
): Promise<string> {
  const focusTask = tasks.find((t) => t.id === focusTaskId) ?? tasks[0];
  const taskList = tasks.map((t, i) => `${i + 1}. [${t.id}] "${t.title}": ${t.description}`).join("\n");

  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    system: `Du bist der persönliche Business-Coach von Franziska (Schluck.Impuls).
${BUSINESS_CONTEXT()}
Tag ${day} von 90.

Heutige Aufgaben:
${taskList}

Fokus-Aufgabe: "${focusTask?.title}" (ID: ${focusTask?.id})

Antworte immer auf Deutsch, freundlich und direkt (max 2-3 Sätze).
Wenn "skip", "überspringen" o.ä.: bestätige und liefere EINE Ersatzaufgabe.
Hänge ans Ende deiner Antwort (auf neuer Zeile):
REPLACE_TASK:{"id":"${focusTask?.id}","title":"...","description":"...","category":"Content|Marketing|Verkauf|Technik|Community|Strategie","estimated_minutes":30,"revenue_impact":"Hoch|Mittel|Niedrig"}
Bei anderen Fragen: hilfreich und motivierend antworten. Kein REPLACE_TASK wenn kein Skip.`,
    messages: [{ role: "user", content: userMessage }],
  });

  return (msg.content[0] as { text: string }).text;
}

// ─── Telegram Bot ─────────────────────────────────────────────────────────────

interface TelegramState {
  day: number;
  tasks: Array<{ id: string; title: string; description: string; category: string; estimated_minutes: number; revenue_impact: string }>;
  completed: string[];
  focusTaskId: string | null;
  startDate: string;
}

function formatTasksForTelegram(
  day: number,
  motivation: string,
  phase_info: string,
  tasks: TelegramState["tasks"],
  completed: string[],
  daily_tip: string
): string {
  const catEmoji: Record<string, string> = {
    Content: "✍️",
    Marketing: "📣",
    Verkauf: "💰",
    Technik: "⚙️",
    Community: "🤝",
    Strategie: "🎯",
  };
  const impactMark = (r: string) => (r === "Hoch" ? "🔴" : r === "Mittel" ? "🟡" : "⚪️");

  const taskLines = tasks
    .map((t, i) => {
      const done = completed.includes(t.id);
      const icon = catEmoji[t.category] ?? "📌";
      const check = done ? "✅" : `${i + 1}.`;
      return `${check} ${icon} *${t.title}* ${impactMark(t.revenue_impact)}\n   _${t.description}_\n   ⏱ ${t.estimated_minutes} Min.`;
    })
    .join("\n\n");

  return `🚀 *Tag ${day} / 90 – Dein Tagesplan*\n\n${motivation}\n_${phase_info}_\n\n${taskLines}\n\n💡 *Tipp:* ${daily_tip}\n\n_Tippe eine Zahl (1–5) + "skip" oder "details", z.B. "2 skip" oder "3 details"._`;
}

function setupTelegramBot(state: { botState: TelegramState | null }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log(
      "ℹ️  Telegram nicht konfiguriert. Setze TELEGRAM_BOT_TOKEN und TELEGRAM_CHAT_ID als Umgebungsvariablen."
    );
    return null;
  }

  const bot = new TelegramBot(token, { polling: true });
  const cid = chatId;

  async function sendDailyTasks(ctx?: string) {
    if (!state.botState) {
      state.botState = {
        day: 1,
        tasks: [],
        completed: [],
        focusTaskId: null,
        startDate: new Date().toISOString(),
      };
    }

    await bot.sendMessage(cid, "⏳ Einen Moment… ich erstelle deinen Tagesplan.");

    try {
      const raw = await generateDayTasks(state.botState.day, state.botState.completed, ctx ?? "");
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("JSON parse failed");

      const parsed = JSON.parse(match[0]);
      state.botState.tasks = parsed.tasks;
      state.botState.completed = [];
      state.botState.focusTaskId = parsed.tasks[0]?.id ?? null;

      const text = formatTasksForTelegram(
        state.botState.day,
        parsed.motivation,
        parsed.phase_info,
        parsed.tasks,
        [],
        parsed.daily_tip
      );

      await bot.sendMessage(cid, text, { parse_mode: "Markdown" });
    } catch (err) {
      console.error("Telegram task gen error:", err);
      await bot.sendMessage(cid, "❌ Fehler beim Generieren. Bitte versuche /tasks nochmal.");
    }
  }

  // /start command
  bot.onText(/\/start/, async () => {
    state.botState = {
      day: 1,
      tasks: [],
      completed: [],
      focusTaskId: null,
      startDate: new Date().toISOString(),
    };
    await bot.sendMessage(
      cid,
      `👋 *Hallo Franziska!*\n\nDein 90-Tage Business Bot ist aktiv.\n🎯 Ziel: *15.000€/Monat*\n\n• /tasks – Tagesplan jetzt abrufen\n• /status – Fortschritt anzeigen\n\nJeden Morgen um 7:00 Uhr schicke ich dir automatisch deinen Tagesplan. Du kannst jederzeit mit mir chatten! 🚀`,
      { parse_mode: "Markdown" }
    );
  });

  // /tasks command
  bot.onText(/\/tasks(.*)/, async (msg, match) => {
    const ctx = match?.[1]?.trim() ?? "";
    await sendDailyTasks(ctx);
  });

  // /status command
  bot.onText(/\/status/, async () => {
    if (!state.botState) {
      await bot.sendMessage(cid, "Noch keine Daten. Starte mit /tasks.");
      return;
    }
    const { day, completed, tasks } = state.botState;
    const pct = tasks.length > 0 ? Math.round((completed.length / tasks.length) * 100) : 0;
    const phase = day <= 30 ? "Aufbau" : day <= 60 ? "Wachstum" : "Skalierung";
    const bar = "█".repeat(Math.round(pct / 10)) + "░".repeat(10 - Math.round(pct / 10));
    await bot.sendMessage(
      cid,
      `📊 *Status – Tag ${day}/90*\n\nPhase: ${phase}\nHeute: ${completed.length}/${tasks.length} erledigt\n[${bar}] ${pct}%\n\n_Fortschritt zu 15.000€/Monat_`,
      { parse_mode: "Markdown" }
    );
  });

  // Handle "N skip" or "N details" or free text
  bot.on("message", async (msg) => {
    if (!msg.text) return;
    const text = msg.text.trim();

    // Ignore commands (handled above)
    if (text.startsWith("/")) return;

    if (!state.botState || state.botState.tasks.length === 0) {
      await bot.sendMessage(cid, "Starte zuerst mit /tasks um deinen Tagesplan zu erhalten.");
      return;
    }

    // Parse "N done" to mark a task complete
    const doneMatch = text.match(/^(\d)\s*(done|erledigt|check|✅)$/i);
    if (doneMatch) {
      const idx = parseInt(doneMatch[1]) - 1;
      const task = state.botState.tasks[idx];
      if (task) {
        if (!state.botState.completed.includes(task.id)) {
          state.botState.completed.push(task.id);
        }
        const pct = Math.round((state.botState.completed.length / state.botState.tasks.length) * 100);
        await bot.sendMessage(
          cid,
          `✅ *"${task.title}"* als erledigt markiert!\n${state.botState.completed.length}/${state.botState.tasks.length} erledigt (${pct}%)`,
          { parse_mode: "Markdown" }
        );
        return;
      }
    }

    // Parse "N skip" or "N details" to focus on a specific task
    const taskCmdMatch = text.match(/^(\d)\s+(.+)$/);
    if (taskCmdMatch) {
      const idx = parseInt(taskCmdMatch[1]) - 1;
      const cmd = taskCmdMatch[2];
      const task = state.botState.tasks[idx];
      if (task) {
        state.botState.focusTaskId = task.id;
        try {
          await bot.sendMessage(cid, "💬 _Moment…_", { parse_mode: "Markdown" });
          const reply = await chatWithBot(cmd, state.botState.tasks, task.id, state.botState.day);

          const replaceMatch = reply.match(/REPLACE_TASK:(\{[\s\S]*?\}(?=\s*$|\n|$))/);
          if (replaceMatch) {
            const newTask = JSON.parse(replaceMatch[1]);
            state.botState.tasks[idx] = { ...newTask, id: task.id };
            const cleanReply = reply.replace(/\nREPLACE_TASK:\{[\s\S]*\}/, "").trim();
            await bot.sendMessage(
              cid,
              `${cleanReply}\n\n↩️ *Neue Aufgabe ${idx + 1}:* ${state.botState.tasks[idx].title}\n_${state.botState.tasks[idx].description}_`,
              { parse_mode: "Markdown" }
            );
          } else {
            await bot.sendMessage(cid, reply, { parse_mode: "Markdown" });
          }
        } catch (err) {
          console.error("chat error:", err);
          await bot.sendMessage(cid, "❌ Fehler. Bitte nochmal versuchen.");
        }
        return;
      }
    }

    // Free-text chat
    try {
      await bot.sendMessage(cid, "💬 _Moment…_", { parse_mode: "Markdown" });
      const reply = await chatWithBot(text, state.botState.tasks, state.botState.focusTaskId, state.botState.day);
      const cleanReply = reply.replace(/\nREPLACE_TASK:\{[\s\S]*\}/, "").trim();
      await bot.sendMessage(cid, cleanReply, { parse_mode: "Markdown" });
    } catch (err) {
      console.error("chat error:", err);
      await bot.sendMessage(cid, "❌ Fehler. Bitte nochmal versuchen.");
    }
  });

  // Daily cron: every morning at 7:00 AM (Europe/Berlin)
  const cronTime = process.env.DAILY_TASKS_CRON ?? "0 7 * * *";
  cron.schedule(
    cronTime,
    async () => {
      if (state.botState) {
        state.botState.day = Math.min(state.botState.day + 1, 90);
      }
      await sendDailyTasks();
    },
    { timezone: "Europe/Berlin" }
  );

  console.log(`✅ Telegram Bot aktiv. Täglich um ${cronTime} (Europe/Berlin).`);
  return bot;
}

// ─── Express Server ───────────────────────────────────────────────────────────

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json());

  // Shared state for Telegram bot
  const telegramState: { botState: TelegramState | null } = { botState: null };
  setupTelegramBot(telegramState);

  // Daily task generation (web app)
  app.post("/api/daily-tasks", async (req, res) => {
    const { day, completedTasks, morningContext } = req.body as {
      day: number;
      completedTasks: string[];
      morningContext: string;
    };

    const phase =
      day <= 30 ? "Aufbau (Monat 1)" : day <= 60 ? "Wachstum (Monat 2)" : "Skalierung (Monat 3)";

    const systemPrompt = `Du bist ein erfahrener Online-Business-Coach.
${BUSINESS_CONTEXT()}

Heute ist Tag ${day} von 90. Phase: ${phase}.
${completedTasks.length > 0 ? `Gestern abgehakt: ${completedTasks.join(", ")}` : ""}
${morningContext ? `Morgen-Check-in von Franziska: "${morningContext}"` : ""}

Erstelle genau 5 konkrete, umsetzbare Tagesaufgaben. Antworte NUR mit validem JSON:
{
  "motivation": "1-2 motivierende Sätze für diesen Tag, persönlich auf Franziska zugeschnitten",
  "phase_info": "Was diese Phase bedeutet und wo Franziska gerade im Plan steht",
  "tasks": [
    {
      "id": "task_1",
      "title": "Kurzer Titel (max 6 Wörter)",
      "description": "Konkret: was genau tun, wie, wo – kein Allgemeinplatz",
      "category": "Content|Marketing|Verkauf|Technik|Community|Strategie",
      "estimated_minutes": 30,
      "revenue_impact": "Hoch|Mittel|Niedrig"
    }
  ],
  "daily_tip": "Ein konkreter Tipp für heute"
}`;

    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await anthropic.messages.stream({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: "user", content: `Tag ${day} – erstelle meinen Tagesplan.` }],
      });

      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
          res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (err) {
      console.error("daily-tasks error:", err);
      res.status(500).json({ error: "API-Fehler" });
    }
  });

  // Task chat (web app)
  app.post("/api/task-chat", async (req, res) => {
    const { message, tasks, focusTaskId, day } = req.body as {
      message: string;
      tasks: Array<{ id: string; title: string; description: string; category: string; estimated_minutes: number; revenue_impact: string }>;
      focusTaskId: string | null;
      day: number;
    };

    const focusTask = tasks.find((t) => t.id === focusTaskId) ?? tasks[0];
    const taskList = tasks.map((t, i) => `${i + 1}. [${t.id}] "${t.title}": ${t.description}`).join("\n");

    const systemPrompt = `Du bist der persönliche Business-Coach von Franziska (Schluck.Impuls).
${BUSINESS_CONTEXT()}
Tag ${day} von 90.

Aktuelle Aufgaben heute:
${taskList}

Fokus-Aufgabe: "${focusTask?.title}" (ID: ${focusTask?.id})

WICHTIGE REGELN:
- Antworte immer auf Deutsch, freundlich und direkt (max 2-3 Sätze).
- Wenn "skip", "überspringen" o.ä. → bestätige und liefere EINE Ersatzaufgabe.
  Hänge ans Ende deiner Antwort exakt dieses Muster an (auf einer neuen Zeile):
  REPLACE_TASK:{"id":"${focusTask?.id}","title":"...","description":"...","category":"Content|Marketing|Verkauf|Technik|Community|Strategie","estimated_minutes":30,"revenue_impact":"Hoch|Mittel|Niedrig"}
- Wenn nach Details/Tipps gefragt → erkläre die Fokus-Aufgabe konkreter.
- Allgemeine Motivationsfrage → kurze, energetische Antwort.
- Kein REPLACE_TASK wenn kein Skip gewünscht.`;

    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await anthropic.messages.stream({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: "user", content: message }],
      });

      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
          res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (err) {
      console.error("task-chat error:", err);
      res.status(500).json({ error: "Chat-Fehler" });
    }
  });

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
