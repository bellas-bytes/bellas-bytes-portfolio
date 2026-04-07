import { motion } from "framer-motion";
import type { SectionId } from "../hooks/useGameState";

type DroppedItemsProps = {
  readonly onSelect: (id: SectionId) => void;
  readonly activeSection: SectionId | null;
  readonly onPlaySfx: (name: "click") => void;
};

const ITEMS: ReadonlyArray<{
  id: SectionId;
  emoji: string;
  label: string;
  x: number;
  y: number;
}> = [
  { id: "projects", emoji: "\uD83D\uDCBB", label: "Projects", x: 20, y: 55 },
  { id: "education", emoji: "\uD83D\uDCD6", label: "Education", x: 38, y: 62 },
  { id: "tech-stack", emoji: "\u2B50", label: "Skills", x: 56, y: 52 },
  { id: "experience", emoji: "\u26A1", label: "EXP", x: 74, y: 60 },
];

const ORIGIN_X = 45;
const ORIGIN_Y = 45;

const FLOAT_DURATIONS = [6, 7.5, 5.5, 8];

export default function DroppedItems({
  onSelect,
  activeSection,
  onPlaySfx,
}: DroppedItemsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {ITEMS.map((item, i) => {
        const isActive = activeSection === item.id;

        return (
          <motion.button
            key={item.id}
            className={`
              absolute pointer-events-auto cursor-pointer
              flex flex-col items-center gap-1
              group transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a1a]
              rounded-lg p-2
            `}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            initial={{
              x: `${(ORIGIN_X - item.x) * 3}px`,
              y: `${(ORIGIN_Y - item.y) * 3}px`,
              scale: 0,
              opacity: 0,
              rotate: 180 * (i % 2 === 0 ? 1 : -1),
            }}
            animate={{
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 14,
              delay: 0.1 + i * 0.12,
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              onPlaySfx("click");
              onSelect(item.id);
            }}
            aria-label={`Open ${item.label}`}
          >
            {/* Idle bobbing float */}
            <motion.div
              className="flex flex-col items-center gap-1"
              animate={{
                y: [0, -6, 0, 6, 0],
                x: [0, 4, 0, -4, 0],
                rotate: [0, 3, 0, -3, 0],
              }}
              transition={{
                duration: FLOAT_DURATIONS[i],
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <motion.span
                className="text-4xl md:text-5xl drop-shadow-[0_0_8px_rgba(74,158,255,0.5)]"
                animate={
                  isActive
                    ? {
                        filter: [
                          "drop-shadow(0 0 8px rgba(74,158,255,0.8))",
                          "drop-shadow(0 0 16px rgba(74,158,255,1))",
                          "drop-shadow(0 0 8px rgba(74,158,255,0.8))",
                        ],
                      }
                    : {}
                }
                transition={isActive ? { duration: 1.5, repeat: Infinity } : {}}
                role="img"
                aria-hidden="true"
              >
                {item.emoji}
              </motion.span>
              <motion.span
                className={`
                  font-pixel text-[8px] md:text-[10px]
                  ${isActive ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"}
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.12 }}
              >
                {item.label}
              </motion.span>
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}
