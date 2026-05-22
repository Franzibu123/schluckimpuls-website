import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BUSINESS_CONTEXT = `Franziska ist die Gründerin von Schluck.Impuls – ganzheitliche Mundraumgesundheit für Kinder (2–15 Jahre).
Zielgruppe: Mütter und Väter im DACH-Raum, die ganzheitliche Ansätze bevorzugen.
Angebote: Online-Kurse, 1:1-Beratungen, digitale Produkte rund um Mundgesundheit bei Kindern.
Branding: Terrakotta-Orange, Salbei, warm, mutig, fachlich tief.
Ziel: 15.000€ monatlicher Umsatz in 90 Tagen.`;

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Daily task generation
  app.post("/api/daily-tasks", async (req, res) => {
    const { day, completedTasks, morningContext } = req.body as {
      day: number;
      completedTasks: string[];
      morningContext: string;
    };

    const phase =
      day <= 30 ? "Aufbau (Monat 1)" : day <= 60 ? "Wachstum (Monat 2)" : "Skalierung (Monat 3)";

    const systemPrompt = `Du bist ein erfahrener Online-Business-Coach.
${BUSINESS_CONTEXT}

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

  // Chat with bot about tasks
  app.post("/api/task-chat", async (req, res) => {
    const { message, tasks, focusTaskId, day } = req.body as {
      message: string;
      tasks: Array<{ id: string; title: string; description: string; category: string; estimated_minutes: number; revenue_impact: string }>;
      focusTaskId: string | null;
      day: number;
    };

    const focusTask = tasks.find((t) => t.id === focusTaskId) ?? tasks[0];
    const taskList = tasks.map((t, i) => `${i + 1}. [${t.id}] "${t.title}": ${t.description}`).join("\n");

    const lc = message.toLowerCase();
    const isSkip =
      ["skip", "überspringen", "überspring", "weiter", "nächste", "auslassen", "weg damit"].some((k) =>
        lc.includes(k)
      );

    const systemPrompt = `Du bist der persönliche Business-Coach von Franziska (Schluck.Impuls).
${BUSINESS_CONTEXT}
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
