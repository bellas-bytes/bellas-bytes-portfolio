import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences, type Experience } from "../data/experiences";

export default function ExperienceSection() {
  const [active, setActive] = useState<Experience | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full px-6 md:px-14 pt-16 md:pt-24 pb-28 md:pb-36"
    >
      {/* Light veil for legibility over the grainient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/25"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/60 mb-8"
        >
          02 — Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display text-white text-5xl sm:text-6xl md:text-7xl leading-[1] tracking-tight max-w-3xl"
        >
          Where I&apos;ve been.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
          className="mt-6 max-w-2xl text-white/65 font-light text-base md:text-lg leading-relaxed"
        >
          Click any role to read the longer version.
        </motion.p>

        {/* Timeline */}
        <ol className="relative mt-16 md:mt-20">
          {/* Vertical rail */}
          <span
            aria-hidden="true"
            className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-white/15"
          />

          {experiences.map((exp, i) => (
            <motion.li
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.1 + i * 0.08,
              }}
              className="relative pl-12 md:pl-16 pb-12 md:pb-14 last:pb-0"
            >
              {/* Marker */}
              <span
                aria-hidden="true"
                className="absolute left-[7px] md:left-[11px] top-2 h-2.5 w-2.5 rounded-full bg-white/80 ring-4 ring-black/40"
              />

              <button
                type="button"
                onClick={() => setActive(exp)}
                className="group text-left w-full focus:outline-none"
                aria-haspopup="dialog"
                aria-label={`Open details for ${exp.role} at ${exp.company}`}
              >
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50 mb-2">
                  {exp.period}
                </p>
                <h3 className="font-display text-2xl md:text-4xl text-white leading-tight transition-colors group-hover:text-white">
                  {exp.role}
                </h3>
                <p className="mt-1 text-sm md:text-base text-white/65 font-light">
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
                <p className="mt-3 max-w-2xl text-sm md:text-base text-white/60 font-light leading-relaxed">
                  {exp.summary}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] tracking-[0.35em] uppercase text-white/45 group-hover:text-white transition-colors">
                  Read more
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </button>
            </motion.li>
          ))}
        </ol>
      </div>

      <AnimatePresence>
        {active && (
          <ExperienceDialog
            experience={active}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

type DialogProps = {
  experience: Experience;
  onClose: () => void;
};

function ExperienceDialog({ experience, onClose }: DialogProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10"
    >
      {/* Backdrop — animate bg + blur radius (keep opacity:1 so backdrop-filter stays active) */}
      <motion.button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        initial={{
          backgroundColor: "rgba(0,0,0,0)",
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        }}
        animate={{
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        exit={{
          backgroundColor: "rgba(0,0,0,0)",
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 cursor-default"
      />

      {/* Card — liquid glass */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/15 bg-white/[0.08] backdrop-blur-lg backdrop-saturate-125 text-white shadow-[0_30px_80px_-25px_rgba(0,0,0,0.6)]"
      >
        {/* Specular sheen (top-left light) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/8 via-transparent to-transparent"
        />
        {/* Hairline top highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        {/* Inner ring */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5"
        />

        <div className="relative px-7 md:px-10 py-9 md:py-11">
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50 mb-3">
            {experience.period}
          </p>
          <h3
            id="experience-dialog-title"
            className="font-display text-3xl md:text-5xl text-white leading-[1.05] tracking-tight"
          >
            {experience.role}
          </h3>
          <p className="mt-2 text-sm md:text-base text-white/65 font-light">
            {experience.company}
            {experience.location ? ` · ${experience.location}` : ""}
          </p>

          <p className="mt-6 text-sm md:text-base text-white/80 font-light leading-relaxed">
            {experience.details}
          </p>

          {experience.highlights && experience.highlights.length > 0 && (
            <div className="mt-8">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/45 mb-3">
                Highlights
              </p>
              <ul className="space-y-2 text-sm md:text-base text-white/75 font-light leading-relaxed">
                {experience.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden="true" className="text-white/40 mt-1">
                      ·
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experience.tech && experience.tech.length > 0 && (
            <div className="mt-8">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/45 mb-3">
                Tech
              </p>
              <div className="flex flex-wrap gap-2">
                {experience.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs text-white/80 font-light"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Close — last child so it paints above content and decorative layers */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 h-9 w-9 inline-flex items-center justify-center rounded-full text-white/70 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
