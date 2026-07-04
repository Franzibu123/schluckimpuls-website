/*
 * Einzelansicht /reels/<slug> – nur das 9:16-Reel, zentriert auf dunkelneutralem
 * Hintergrund, ohne Website-Chrome. Für die randlose Bildschirmaufnahme
 * im Hochformat (ein Loop = 7 Sekunden).
 */

import { useParams } from "wouter";
import { REELS } from "@/components/reels";
import NotFound from "@/pages/NotFound";

export default function ReelSingle() {
  const { slug } = useParams<{ slug: string }>();
  const reel = REELS.find((entry) => entry.slug === slug);

  if (!reel) {
    return <NotFound />;
  }

  const { Component } = reel;

  return (
    <div
      className="flex w-screen items-center justify-center overflow-hidden bg-[#161412]"
      style={{ height: "100dvh" }}
    >
      {/* Exakte 9:16-Fläche: füllt die Höhe, wird bei schmalen Fenstern über die Breite begrenzt */}
      <div style={{ width: "min(100vw, calc(100dvh * 9 / 16))" }}>
        <Component />
      </div>
    </div>
  );
}
