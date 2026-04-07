import { motion } from "framer-motion";

type PixelCharacterProps = {
  readonly state: "walking" | "tripping" | "fallen";
  readonly className?: string;
};

/**
 * Pure-CSS pixel character. Does NOT handle its own rotation —
 * the parent is responsible for positioning and rotate transforms.
 * This component only changes visual appearance per state
 * (leg animation, facial expression).
 */
export default function PixelCharacter({
  state,
  className = "",
}: PixelCharacterProps) {
  const isFallen = state === "fallen" || state === "tripping";

  return (
    <div
      className={`relative ${className}`}
      style={{ width: 32, height: 76 }}
    >
      <div className="pixel-character" aria-hidden="true">
        {/* Head */}
        <div
          className="absolute w-[32px] h-[32px] rounded-sm"
          style={{
            background: "#f5d6c3",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            imageRendering: "pixelated",
          }}
        >
          {/* Hair */}
          <div
            className="absolute w-full h-[10px] top-0 left-0 rounded-t-sm"
            style={{ background: "#2a1a0e" }}
          />
          {/* Eyes */}
          <div
            className="absolute w-[4px] h-[4px]"
            style={{
              background: "#1a1a2e",
              top: 14,
              left: 8,
            }}
          />
          <div
            className="absolute w-[4px] h-[4px]"
            style={{
              background: "#1a1a2e",
              top: 14,
              left: 20,
            }}
          />
          {/* Mouth — grimace when fallen */}
          <div
            className="absolute w-[8px] h-[2px]"
            style={{
              background: isFallen ? "#cc4444" : "#cc6666",
              top: 22,
              left: 12,
              borderRadius: isFallen ? 0 : "0 0 4px 4px",
            }}
          />
        </div>

        {/* Body */}
        <div
          className="absolute w-[28px] h-[24px]"
          style={{
            background: "#4a9eff",
            top: 32,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* Legs */}
        <div
          className="absolute"
          style={{
            top: 56,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {state === "walking" ? (
            <>
              <motion.div
                className="absolute w-[10px] h-[20px]"
                style={{ background: "#1a1a2e", left: -2 }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute w-[10px] h-[20px]"
                style={{ background: "#1a1a2e", left: 12 }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
            </>
          ) : (
            <>
              <div
                className="absolute w-[10px] h-[20px]"
                style={{ background: "#1a1a2e", left: -2 }}
              />
              <div
                className="absolute w-[10px] h-[20px]"
                style={{ background: "#1a1a2e", left: 12 }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
