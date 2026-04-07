import { useState, useCallback } from "react";

export type GamePhase = "loading" | "tripping" | "exploring" | "viewing";

export type SectionId =
  | "projects"
  | "education"
  | "tech-stack"
  | "experience";

export function useGameState() {
  const [phase, setPhase] = useState<GamePhase>("loading");
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const finishLoading = useCallback(() => {
    setPhase("tripping");
  }, []);

  const finishTripping = useCallback(() => {
    setPhase("exploring");
  }, []);

  const openSection = useCallback((section: SectionId) => {
    setActiveSection(section);
    setPhase("viewing");
  }, []);

  const closeSection = useCallback(() => {
    setActiveSection(null);
    setPhase("exploring");
  }, []);

  return {
    phase,
    activeSection,
    finishLoading,
    finishTripping,
    openSection,
    closeSection,
  };
}
