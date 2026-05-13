import { motion, AnimatePresence } from "framer-motion";
import type { Section } from "./BottomNav";
import { about, education, experience, projects, techStack, socials } from "../data/portfolio";
import { SiGithub, SiLinkedin } from "react-icons/si";
import PaperCard from "./PaperCard";

interface SectionViewProps {
  readonly section: Section;
}

export default function SectionView({ section }: SectionViewProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section}
        className="min-h-[calc(100vh-64px)] flex items-start justify-center px-6 py-16 sm:py-24 overflow-hidden"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-full max-w-2xl">
          {section === "about" && (
            <PaperCard tilt={-1.2} seed={3.1}>
              <AboutContent />
            </PaperCard>
          )}
          {section === "education" && (
            <PaperCard tilt={0.8} seed={5.8}>
              <EducationContent />
            </PaperCard>
          )}
          {section === "experience" && (
            <PaperCard tilt={-0.6} seed={7.4}>
              <ExperienceContent />
            </PaperCard>
          )}
          {section === "projects" && (
            <PaperCard tilt={1.1} seed={2.2}>
              <ProjectsContent />
            </PaperCard>
          )}
          {section === "skills" && (
            <PaperCard tilt={-0.9} seed={9.1}>
              <SkillsContent />
            </PaperCard>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------- Section content blocks ---------- */

function SectionTitle({ children }: { readonly children: string }) {
  return (
    <h2 className="font-display text-4xl sm:text-5xl text-cyan-deep mb-8">
      {children}
    </h2>
  );
}

function AboutContent() {
  return (
    <div>
      <SectionTitle>About</SectionTitle>
      <p className="text-cyan-deep/80 leading-relaxed">{about.bio}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {about.interests.map((interest) => (
          <span
            key={interest}
            className="text-sm text-cyan-deep/80 px-3 py-1 rounded-full border border-cyan-deep/20 bg-cyan-deep/5"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}

function EducationContent() {
  return (
    <div>
      <SectionTitle>Education</SectionTitle>
      <p className="text-cyan-deep text-lg font-medium">{education.school}</p>
      <p className="text-cyan-deep/70 mt-1">
        {education.degree}, {education.minor} minor
      </p>
      <p className="text-cyan-deep/50 mt-1 text-sm">
        {education.year} &middot; Focus: {education.focus}
      </p>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div>
      <SectionTitle>Experience</SectionTitle>
      <p className="text-cyan-deep text-lg font-medium">{experience.title}</p>
      <p className="text-cyan-deep/70 mt-1">
        {experience.company} &middot; {experience.location}
      </p>
      <p className="text-cyan-deep/50 text-sm mt-1">{experience.period}</p>
      <ul className="mt-4 space-y-3">
        {experience.bullets.map((b) => (
          <li key={b} className="text-cyan-deep/80 text-sm leading-relaxed pl-4 border-l-2 border-cyan-deep/20">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div>
      <SectionTitle>Projects</SectionTitle>
      <div className="space-y-8">
        {projects.map((p) => (
          <div key={p.name}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-deep text-lg font-medium hover:underline"
            >
              {p.name}
            </a>
            <p className="text-cyan-deep/50 text-xs mt-1 tracking-wider uppercase">
              {p.tech}
            </p>
            <ul className="mt-2 space-y-2">
              {p.bullets.map((b) => (
                <li key={b} className="text-cyan-deep/80 text-sm leading-relaxed pl-4 border-l-2 border-cyan-deep/20">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsContent() {
  const categories = [
    { label: "Languages", items: techStack.languages },
    { label: "Frameworks", items: techStack.frameworks },
    { label: "Tools", items: techStack.tools },
  ] as const;

  return (
    <div>
      <SectionTitle>Skills</SectionTitle>
      <div className="space-y-6">
        {categories.map(({ label, items }) => (
          <div key={label}>
            <h3 className="text-cyan-deep/60 text-xs tracking-[0.2em] uppercase mb-3">
              {label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map(({ name }) => (
                <span
                  key={name}
                  className="text-sm text-cyan-deep/80 px-3 py-1 rounded-full border border-cyan-deep/20 bg-cyan-deep/5"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="mt-10 flex gap-4">
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-deep/60 hover:text-cyan-deep transition-colors"
          aria-label="GitHub"
        >
          <SiGithub size={20} />
        </a>
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-deep/60 hover:text-cyan-deep transition-colors"
          aria-label="LinkedIn"
        >
          <SiLinkedin size={20} />
        </a>
      </div>
    </div>
  );
}
