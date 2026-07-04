import type { ComponentType } from "react";
import TonsillotomieReel from "./TonsillotomieReel";
import TonsillektomieReel from "./TonsillektomieReel";
import AdenotomieReel from "./AdenotomieReel";
import PaukenroehrchenReel from "./PaukenroehrchenReel";

export { default as ReelFrame, REEL_DURATION } from "./ReelFrame";
export { TonsillotomieReel, TonsillektomieReel, AdenotomieReel, PaukenroehrchenReel };

export interface ReelDefinition {
  slug: string;
  title: string;
  teaser: string;
  Component: ComponentType;
}

/** Alle Erklär-Reels mit ihren Einzelrouten unter /reels/<slug>. */
export const REELS: ReelDefinition[] = [
  {
    slug: "tonsillotomie",
    title: "Tonsillotomie",
    teaser: "Mandel-Verkleinerung: Ein Teil wird abgetragen, die Kapsel bleibt.",
    Component: TonsillotomieReel,
  },
  {
    slug: "tonsillektomie",
    title: "Tonsillektomie",
    teaser: "Mandel-Entfernung: Die Gaumenmandeln werden vollständig entfernt.",
    Component: TonsillektomieReel,
  },
  {
    slug: "adenotomie",
    title: "Adenotomie",
    teaser: "Die Rachenmandel im Nasenrachen wird entfernt – freie Nasenatmung.",
    Component: AdenotomieReel,
  },
  {
    slug: "paukenroehrchen",
    title: "Paukenröhrchen",
    teaser: "Ein Röhrchen im Trommelfell belüftet das Mittelohr.",
    Component: PaukenroehrchenReel,
  },
];
