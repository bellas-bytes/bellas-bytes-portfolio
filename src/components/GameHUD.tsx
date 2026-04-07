import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import type { SectionId } from "../hooks/useGameState";
import { socials } from "../data/portfolio";

type GameHUDProps = {
  readonly activeSection: SectionId | null;
  readonly onSelect: (id: SectionId) => void;
  readonly muted: boolean;
  readonly onToggleMute: () => void;
  readonly onPlaySfx: (name: "click") => void;
};

const NAV_ITEMS: ReadonlyArray<{
  id: SectionId;
  icon: string;
  label: string;
}> = [
  { id: "projects", icon: "\uD83D\uDCBB", label: "PROJECTS" },
  { id: "education", icon: "\uD83D\uDCD6", label: "EDUCATION" },
  { id: "tech-stack", icon: "\u2B50", label: "SKILLS" },
  { id: "experience", icon: "\u26A1", label: "EXP" },
];

export default function GameHUD({
  activeSection,
  onSelect,
  muted,
  onToggleMute,
  onPlaySfx,
}: GameHUDProps) {
  return (
    <>
      {/* Desktop: left sidebar */}
      <motion.div
        className="hidden md:flex fixed left-0 top-0 h-full w-[220px] z-[100] flex-col"
        initial={{ x: -220 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.3 }}
      >
        <div className="flex-1 bg-[#0d1117]/90 border-r border-blue-900/50 backdrop-blur-sm p-4 flex flex-col">
          {/* Title */}
          <div className="mb-6 pt-2">
            <h1 className="font-pixel text-[12px] text-blue-400 leading-relaxed">
              BELLA'S
            </h1>
            <h1 className="font-pixel text-[12px] text-white leading-relaxed">
              BYTES
            </h1>
            <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent mt-2" />
          </div>

          {/* Inventory nav */}
          <nav className="flex-1 space-y-1" aria-label="Portfolio sections">
            <p className="font-pixel text-[8px] text-gray-600 mb-2 tracking-wider">
              INVENTORY
            </p>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  className={`
                    w-full text-left px-3 py-2 rounded font-pixel text-[9px]
                    flex items-center gap-3 transition-colors
                    focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400
                    ${
                      isActive
                        ? "bg-blue-900/40 text-blue-300 border border-blue-700/50"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                    }
                  `}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onPlaySfx("click");
                    onSelect(item.id);
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Social links */}
          <div className="mt-auto pt-4 space-y-3">
            <div className="w-full h-[1px] bg-gray-800" />
            <p className="font-pixel text-[8px] text-gray-600 tracking-wider">
              LINKS
            </p>
            <div className="flex gap-3">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="GitHub profile"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Mute toggle */}
            <button
              onClick={onToggleMute}
              className="flex items-center gap-2 font-pixel text-[8px] text-gray-600 hover:text-gray-300 transition-colors"
              aria-label={muted ? "Unmute sounds" : "Mute sounds"}
            >
              {muted ? (
                <FaVolumeMute className="w-4 h-4" />
              ) : (
                <FaVolumeUp className="w-4 h-4" />
              )}
              <span>{muted ? "MUTED" : "SFX ON"}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile: bottom tab bar */}
      <motion.div
        className="md:hidden fixed bottom-0 left-0 right-0 z-[100]"
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.3 }}
      >
        <div className="bg-[#0d1117]/95 border-t border-blue-900/50 backdrop-blur-sm px-2 py-2 flex items-center justify-around">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                className={`
                  flex flex-col items-center gap-1 px-3 py-1 rounded
                  font-pixel text-[7px] transition-colors
                  focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400
                  ${isActive ? "text-blue-400" : "text-gray-500"}
                `}
                onClick={() => {
                  onPlaySfx("click");
                  onSelect(item.id);
                }}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Mobile social + mute */}
          <div className="flex gap-2 items-center">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <button
              onClick={onToggleMute}
              className="text-gray-600"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <FaVolumeMute className="w-3.5 h-3.5" />
              ) : (
                <FaVolumeUp className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
