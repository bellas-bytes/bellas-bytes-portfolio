import { motion, AnimatePresence } from "framer-motion";
import {
  SiPython,
  SiR,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiAnsible,
  SiTerraform,
  SiReact,
  SiNextdotjs,
  SiNumpy,
  SiPytorch,
  SiDjango,
  SiMongodb,
  SiGit,
  SiGnubash,
  SiPostgresql,
  SiJirasoftware,
  SiRedhat,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import type { SectionId } from "../hooks/useGameState";
import { projects, education, experience, techStack } from "../data/portfolio";

type SectionPanelProps = {
  readonly section: SectionId | null;
  readonly onClose: () => void;
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  SiPython,
  FaJava,
  SiR,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiAnsible,
  SiTerraform,
  SiReact,
  SiNextdotjs,
  SiDjango,
  SiNumpy,
  SiPytorch,
  SiMongodb,
  SiGit,
  SiGnubash,
  SiPostgresql,
  SiJirasoftware,
  SiRedhat,
};

const SECTION_TITLES: Record<SectionId, string> = {
  projects: "QUEST LOG",
  education: "BACKSTORY",
  "tech-stack": "SKILL TREE",
  experience: "EXP LOG",
};

const SECTION_ICONS: Record<SectionId, string> = {
  projects: "\uD83D\uDCBB",
  education: "\uD83D\uDCD6",
  "tech-stack": "\u2B50",
  experience: "\u26A1",
};

function ProjectsContent() {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.name}
          className="bg-gray-800/50 border border-gray-700/50 rounded p-3"
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-[10px] text-blue-400 hover:text-blue-300 underline"
          >
            {project.name}
          </a>
          <p className="font-pixel text-[7px] text-gray-500 mt-1">
            {project.tech}
          </p>
          <ul className="mt-2 space-y-1">
            {project.bullets.map((bullet) => (
              <li
                key={bullet}
                className="text-[11px] text-gray-300 flex items-start gap-2"
              >
                <span className="text-blue-500 mt-0.5 shrink-0">▸</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function EducationContent() {
  return (
    <div className="space-y-3">
      <div className="bg-gray-800/50 border border-gray-700/50 rounded p-4">
        <p className="font-pixel text-[10px] text-blue-400">
          {education.school}
        </p>
        <p className="text-[12px] text-white mt-2 font-medium">
          {education.degree}
        </p>
        <p className="text-[11px] text-gray-400 mt-1">
          Minor: {education.minor}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="font-pixel text-[8px] text-gray-500 bg-gray-800 px-2 py-1 rounded">
            YEAR {education.year}
          </span>
          <span className="font-pixel text-[8px] text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
            FOCUS: {education.focus.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

function TechStackContent() {
  const categories = [
    { label: "LANGUAGES", items: techStack.languages },
    { label: "FRAMEWORKS", items: techStack.frameworks },
    { label: "TOOLS", items: techStack.tools },
  ];

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div key={cat.label}>
          <p className="font-pixel text-[8px] text-gray-500 mb-2">
            {cat.label}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {cat.items.map((item) => {
              const IconComponent = ICON_MAP[item.icon];
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-[11px] text-gray-300 bg-gray-800/30 rounded px-2 py-1.5"
                >
                  {IconComponent && (
                    <IconComponent className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  )}
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="space-y-3">
      <div className="bg-gray-800/50 border border-gray-700/50 rounded p-4">
        <p className="font-pixel text-[10px] text-blue-400">
          {experience.company}
        </p>
        <p className="text-[12px] text-white mt-1 font-medium">
          {experience.title}
        </p>
        <p className="text-[10px] text-gray-500 mt-1">
          {experience.location} · {experience.period}
        </p>

        {/* EXP bar visual */}
        <div className="mt-3">
          <div className="flex justify-between mb-1">
            <span className="font-pixel text-[7px] text-gray-500">
              EXP GAINED
            </span>
          </div>
          <div className="w-full h-[8px] bg-gray-800 border border-gray-600 rounded-sm overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>

        <ul className="mt-3 space-y-2">
          {experience.bullets.map((bullet) => (
            <li
              key={bullet}
              className="text-[11px] text-gray-300 flex items-start gap-2"
            >
              <span className="text-blue-500 mt-0.5 shrink-0">▸</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const SECTION_CONTENT: Record<SectionId, () => React.JSX.Element> = {
  projects: ProjectsContent,
  education: EducationContent,
  "tech-stack": TechStackContent,
  experience: ExperienceContent,
};

export default function SectionPanel({ section, onClose }: SectionPanelProps) {
  if (!section) return null;

  const Content = SECTION_CONTENT[section];

  return (
    <AnimatePresence>
      {section && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed z-[201] top-1/2 left-1/2 w-[90vw] max-w-[500px] max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="bg-[#0d1117] border border-blue-900/60 rounded-lg shadow-[0_0_30px_rgba(74,158,255,0.15)] p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{SECTION_ICONS[section]}</span>
                  <h2 className="font-pixel text-[12px] text-white">
                    {SECTION_TITLES[section]}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="font-pixel text-[10px] text-gray-500 hover:text-red-400 transition-colors px-2 py-1"
                  aria-label="Close panel"
                >
                  [X]
                </button>
              </div>

              <div className="w-full h-[1px] bg-gray-800 mb-4" />

              {/* Content */}
              <Content />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
