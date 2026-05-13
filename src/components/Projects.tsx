import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "../data/projects";

const ROTATE_MS = 6000;

export default function Projects() {
  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const others = useMemo(() => projects.filter((p) => !p.featured), []);

  return (
    <section
      id="projects"
      className="relative w-full pt-16 md:pt-24 pb-28 md:pb-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/25"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/60 mb-8"
        >
          03 — Selected work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display text-white text-5xl sm:text-6xl md:text-7xl leading-[1] tracking-tight max-w-3xl"
        >
          Things I&apos;ve built.
        </motion.h2>

        {/* Showcase carousel */}
        {featured.length > 0 && (
          <div className="mt-12 md:mt-16">
            <FeaturedCarousel projects={featured} />
          </div>
        )}

        {/* Other projects — expandable */}
        {others.length > 0 && (
          <div className="mt-20 md:mt-24">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/60 mb-6"
            >
              More projects
            </motion.p>
            <ul className="space-y-3">
              {others.map((project, i) => (
                <ExpandableProject
                  key={project.id}
                  project={project}
                  index={i}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCarousel({ projects: featured }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Bumped on manual nav so the auto-rotate timer restarts from the new slide
  const [interactionKey, setInteractionKey] = useState(0);

  useEffect(() => {
    if (paused || featured.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % featured.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, featured.length, interactionKey]);

  const goTo = (i: number) => {
    setActive(((i % featured.length) + featured.length) % featured.length);
    setInteractionKey((k) => k + 1);
  };
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const current = featured[active];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured projects"
    >
      <div className="relative min-h-[460px] md:min-h-[480px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-lg backdrop-saturate-125 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)] overflow-hidden"
            aria-roledescription="slide"
            aria-label={`${active + 1} of ${featured.length}: ${current.title}`}
          >
            {/* Glass decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/8 via-transparent to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5"
            />

            <div className="relative p-8 md:p-12 flex flex-col min-h-[460px] md:min-h-[480px]">
              {current.year && (
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/45 mb-4">
                  {current.year}
                </p>
              )}
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.05] tracking-tight">
                {current.title}
              </h3>
              <p className="mt-3 text-base md:text-lg text-white/75 font-light leading-snug max-w-2xl">
                {current.tagline}
              </p>
              <p className="mt-5 text-sm md:text-base text-white/70 font-light leading-relaxed max-w-2xl">
                {current.description}
              </p>

              <div className="mt-auto pt-8">
                {current.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {current.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-[11px] text-white/80 font-light"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {current.links.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {current.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-white/75 hover:text-white transition-colors border-b border-white/20 hover:border-white/60 pb-1"
                      >
                        {link.label}
                        <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Side arrows — desktop only, sit in the card's padding area */}
        {featured.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous project"
              className="hidden md:flex absolute -left-14 lg:-left-16 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white/75 hover:text-white hover:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next project"
              className="hidden md:flex absolute -right-14 lg:-right-16 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white/75 hover:text-white hover:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Controls row: mobile arrows + dots */}
      {featured.length > 1 && (
        <div className="mt-6 flex justify-center items-center gap-4">
          {/* Mobile prev */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous project"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white/75 hover:text-white hover:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {featured.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${p.title}`}
                aria-current={i === active ? "true" : undefined}
                className="group p-2 -m-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-8 bg-white/80"
                      : "w-1.5 bg-white/25 group-hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Mobile next */}
          <button
            type="button"
            onClick={next}
            aria-label="Next project"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white/75 hover:text-white hover:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function ExpandableProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const contentId = `proj-row-${project.id}`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
      className="relative rounded-2xl border border-white/15 bg-white/[0.05] backdrop-blur-md backdrop-saturate-125 overflow-hidden"
    >
      {/* Sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/6 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="relative w-full text-left px-6 md:px-7 py-5 md:py-6 flex items-center justify-between gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl"
      >
        <div className="min-w-0">
          {project.year && (
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/45 mb-1.5">
              {project.year}
            </p>
          )}
          <h4 className="font-display text-xl md:text-2xl text-white leading-tight tracking-tight">
            {project.title}
          </h4>
          <p className="mt-1 text-sm md:text-base text-white/65 font-light truncate">
            {project.tagline}
          </p>
        </div>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/15 bg-white/5 text-white/70"
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
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, ease: "easeOut" },
            }}
            className="relative overflow-hidden"
          >
            <div className="px-6 md:px-7 pb-6 md:pb-7 pt-1">
              <p className="text-sm md:text-base text-white/75 font-light leading-relaxed">
                {project.description}
              </p>

              {project.tech.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-[11px] text-white/80 font-light"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {project.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-white/75 hover:text-white transition-colors border-b border-white/20 hover:border-white/60 pb-1"
                    >
                      {link.label}
                      <span aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
