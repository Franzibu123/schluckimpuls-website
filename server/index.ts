import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Daily task bot endpoint
  app.post("/api/daily-tasks", async (req, res) => {
    const { day, completedTasks, businessContext } = req.body as {
      day: number;
      completedTasks: string[];
      businessContext: string;
    };

    const phase =
      day <= 30 ? "Aufbau (Monat 1)" : day <= 60 ? "Wachstum (Monat 2)" : "Skalierung (Monat 3)";

    const systemPrompt = `Du bist ein erfahrener Online-Business-Coach spezialisiert auf deutschsprachige Solo-Unternehmer.
Du coachst Franziska, die Gründerin von Schluck.Impuls – einem Business rund um ganzheitliche Mundraumgesundheit für Kinder (2–15 Jahre).
Das Business richtet sich an Mütter und Väter im DACH-Raum.
Aktuelle Angebote: Online-Kurse, Beratungen, digitale Produkte rund um Mundgesundheit bei Kindern.

Dein Ziel: Franziska Schritt für Schritt zu 15.000€ monatlichem Umsatz in 90 Tagen führen.
Heute ist Tag ${day} von 90. Aktuelle Phase: ${phase}.

Gib genau 5 konkrete, umsetzbare Aufgaben für heute – basierend auf dem Businesskontext und dem aktuellen Tag.
${completedTasks.length > 0 ? `Gestern erledigte Aufgaben: ${completedTasks.join(", ")}` : ""}

Format deiner Antwort als valides JSON:
{
  "motivation": "1-2 Sätze Motivation für den heutigen Tag",
  "phase_info": "Kurze Erklärung was diese Phase im 90-Tage-Plan bedeutet",
  "tasks": [
    {
      "id": "task_1",
      "title": "Kurzer Titel",
      "description": "Konkrete Beschreibung was genau zu tun ist",
      "category": "Content|Marketing|Verkauf|Technik|Community|Strategie",
      "estimated_minutes": 30,
      "revenue_impact": "Hoch|Mittel|Niedrig"
    }
  ],
  "daily_tip": "Ein praktischer Tipp für heute"
}`;

    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await anthropic.messages.stream({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: `Tag ${day}: Erstelle meine heutigen 5 Aufgaben. Zusätzlicher Kontext: ${businessContext || "Kein zusätzlicher Kontext"}`,
          },
        ],
      });

      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (err) {
      console.error("Anthropic API error:", err);
      res.status(500).json({ error: "API-Fehler beim Generieren der Aufgaben" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
