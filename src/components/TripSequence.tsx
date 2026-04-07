import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelCharacter from "./PixelCharacter";

type TripSequenceProps = {
  readonly onComplete: () => void;
  readonly onPlaySfx: (name: "trip" | "drop") => void;
};

// Timeline:
// 0ms       — walking across screen
// 600ms     — trips (stumbles, tilts)
// 900ms     — skids forward face-down with dust
// 1400ms    — lands with impact flash
// 1800ms    — camera zooms in
// 2600ms    — transition to exploring (items burst there)

type Phase = "walking" | "tripping" | "skidding" | "fallen" | "zoomed";

export default function TripSequence({
  onComplete,
  onPlaySfx,
}: TripSequenceProps) {
  const [phase, setPhase] = useState<Phase>("walking");

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onPlaySfxRef = useRef(onPlaySfx);
  onPlaySfxRef.current = onPlaySfx;

  useEffect(() => {
    let cancelled = false;
    const t = (ms: number, fn: () => void) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      return id;
    };

    const timers = [
      t(600, () => {
        setPhase("tripping");
        onPlaySfxRef.current("trip");
      }),
      t(900, () => setPhase("skidding")),
      t(1400, () => setPhase("fallen")),
      t(1800, () => setPhase("zoomed")),
      t(2600, () => onCompleteRef.current()),
    ];

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const isDown = phase === "skidding" || phase === "fallen" || phase === "zoomed";

  const charVariants = {
    walking: { x: -100, y: 0, rotate: 0 },
    tripping: { x: 0, y: -10, rotate: -15 },
    skidding: { x: 160, y: 20, rotate: 90 },
    fallen: { x: 160, y: 20, rotate: 90 },
    zoomed: { x: 160, y: 20, rotate: 90 },
  };

  const sceneVariants = {
    normal: { scale: 1, x: 0, y: 0 },
    zoomed: { scale: 1.8, x: -100, y: -20 },
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a1a] z-[9999] overflow-hidden">
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={phase === "zoomed" ? "zoomed" : "normal"}
        variants={sceneVariants}
        transition={
          phase === "zoomed"
            ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0 }
        }
      >
        {/* Ground */}
        <div
          className="absolute w-[200%] h-[2px] bg-gray-700"
          style={{ top: "calc(50% + 40px)", left: "-50%" }}
        />

        {/* Dust / skid marks */}
        <AnimatePresence>
          {isDown && (
            <motion.div
              className="absolute"
              style={{ top: "calc(50% + 30px)", left: "calc(50% - 60px)" }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.4, scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-[120px] h-[3px] bg-gradient-to-r from-gray-600 to-transparent rounded-full" />
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-[4px] h-[4px] rounded-full bg-gray-600"
                  style={{ left: 20 + i * 20, top: -4 }}
                  initial={{ opacity: 0.6, y: 0 }}
                  animate={{ opacity: 0, y: -15 - Math.random() * 10 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character */}
        <motion.div
          className="absolute"
          style={{ top: "calc(50% - 36px)", left: "calc(50% - 80px)" }}
          animate={charVariants[phase]}
          transition={
            phase === "tripping"
              ? { duration: 0.25, ease: "easeIn" }
              : phase === "skidding"
                ? { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
                : { duration: 0.3 }
          }
        >
          <PixelCharacter
            state={isDown ? "fallen" : phase === "tripping" ? "tripping" : "walking"}
          />
        </motion.div>

        {/* Impact flash */}
        <AnimatePresence>
          {phase === "fallen" && (
            <motion.div
              className="absolute w-[60px] h-[60px] rounded-full"
              style={{
                top: "calc(50% - 10px)",
                left: "calc(50% + 60px)",
                background:
                  "radial-gradient(circle, rgba(74,158,255,0.3) 0%, transparent 70%)",
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
