import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameState } from "./hooks/useGameState";
import { useSfx } from "./hooks/useSfx";
import LoadingScreen from "./components/LoadingScreen";
import TripSequence from "./components/TripSequence";
import GameHUD from "./components/GameHUD";
import DroppedItems from "./components/DroppedItems";
import SectionPanel from "./components/SectionPanel";
import PixelCharacter from "./components/PixelCharacter";

export default function App() {
  const {
    phase,
    activeSection,
    finishLoading,
    finishTripping,
    openSection,
    closeSection,
  } = useGameState();

  const { muted, play, toggleMute } = useSfx();

  // Play drop SFX when exploring phase mounts (items burst out)
  const hasPlayedDrop = useRef(false);
  useEffect(() => {
    if (phase === "exploring" && !hasPlayedDrop.current) {
      hasPlayedDrop.current = true;
      play("drop");
    }
  }, [phase, play]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0a0a1a]">
      <AnimatePresence mode="wait">
        {/* Phase 1: Loading */}
        {phase === "loading" && (
          <LoadingScreen key="loading" onComplete={finishLoading} />
        )}

        {/* Phase 2: Trip & skid */}
        {phase === "tripping" && (
          <TripSequence
            key="tripping"
            onComplete={finishTripping}
            onPlaySfx={play}
          />
        )}
      </AnimatePresence>

      {/* Phase 3 & 4: Exploring / Viewing */}
      {(phase === "exploring" || phase === "viewing") && (
        <>
          {/* Game HUD sidebar */}
          <GameHUD
            activeSection={activeSection}
            onSelect={openSection}
            muted={muted}
            onToggleMute={toggleMute}
            onPlaySfx={play}
          />

          {/* Main area */}
          <main
            className="ml-0 md:ml-[220px] h-full pb-[70px] md:pb-0 relative"
            role="main"
          >
            {/* Ground scene */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Subtle ground */}
              <div className="absolute bottom-[30%] w-full h-[2px] bg-gray-800/50" />

              {/* Fallen character on the ground */}
              <div
                className="absolute"
                style={{
                  bottom: "31%",
                  left: "45%",
                  transform: "rotate(90deg)",
                  transformOrigin: "center center",
                }}
              >
                <PixelCharacter state="fallen" />
              </div>

              {/* Intro text — fades in after items land */}
              <motion.div
                className="absolute top-[12%] left-0 right-0 text-center px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h1 className="font-pixel text-[14px] md:text-[18px] text-white leading-loose">
                  Hi, I'm Isabella!
                </h1>
                <p className="font-pixel text-[8px] md:text-[9px] text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
                  Backend + DevOps developer — I make the behind-the-scenes run
                  smoother
                </p>
              </motion.div>
            </div>

            {/* Items burst from character to final positions */}
            <DroppedItems
              onSelect={openSection}
              activeSection={activeSection}
              onPlaySfx={play}
            />
          </main>

          {/* Section panel overlay */}
          <SectionPanel section={activeSection} onClose={closeSection} />
        </>
      )}
    </div>
  );
}
