import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sectionLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

function AvailabilityDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-1 w-1 shrink-0 rounded-full bg-sky-300/50"
    />
  );
}

function scrollToId(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Nav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -70% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile — subtle gradient behind the top nav so text stays readable over lighter content */}
      <div
        aria-hidden="true"
        className="md:hidden pointer-events-none fixed top-0 left-0 right-0 h-24 z-30 bg-gradient-to-b from-black/70 via-black/35 to-transparent"
      />

      {/* Mobile (< md) — minimal top nav */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
        aria-label="Primary"
        className="md:hidden fixed top-4 left-4 right-4 z-40 flex items-center justify-between"
      >
        <div className="flex flex-col items-start gap-1">
          <button
            type="button"
            onClick={() => scrollToId("top")}
            aria-label="Scroll to top"
            className="font-display text-base text-white hover:text-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
          >
            Isabella
          </button>
          <span
            className="inline-flex items-center gap-1.5"
            aria-label="Open to new grad roles"
          >
            <AvailabilityDot />
            <span className="text-[8px] tracking-[0.3em] uppercase text-white/45 font-semibold">
              Open to New Grad Roles
            </span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => scrollToId("contact")}
          aria-label="Contact"
          aria-current={activeId === "contact" ? "true" : undefined}
          className={`text-[10px] tracking-[0.35em] uppercase transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 hover:text-white rounded-full border px-3 py-1.5 ${
            activeId === "contact"
              ? "text-white font-semibold border-white/30 bg-white/15 backdrop-blur-md backdrop-saturate-125 shadow-[0_4px_18px_-6px_rgba(255,255,255,0.15)]"
              : "text-white/65 border-transparent bg-transparent"
          }`}
        >
          Contact
        </button>
      </motion.nav>

      {/* Desktop (md+) — left sidebar */}
      <div className="hidden md:block fixed left-5 xl:left-10 top-1/2 -translate-y-1/2 z-40">
        <motion.nav
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
          aria-label="Primary"
          className="flex flex-col items-start gap-6 xl:gap-8"
        >
          <div className="flex flex-col items-start gap-1.5">
            <button
              type="button"
              onClick={() => scrollToId("top")}
              aria-label="Scroll to top"
              className="font-display text-sm xl:text-lg text-white hover:text-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
            >
              <span className="xl:hidden">IN</span>
              <span className="hidden xl:inline">Isabella</span>
            </button>

            <div
              className="group relative flex items-center gap-1.5"
              aria-label="Open to new grad roles"
            >
              <AvailabilityDot />
              <span className="hidden xl:inline text-[8px] tracking-[0.3em] uppercase text-white/45 font-semibold">
                Open to New Grad Roles
              </span>
              <span
                aria-hidden="true"
                className="xl:hidden pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap text-[8px] tracking-[0.3em] uppercase text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full border border-white/15 bg-black/40 backdrop-blur-md backdrop-saturate-125 px-3 py-1.5 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)]"
              >
                Open to New Grad Roles
              </span>
            </div>
          </div>

          <ul className="flex flex-col items-start gap-3 xl:gap-2.5">
            {sectionLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(link.id)}
                    aria-label={link.label}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-1.5 w-1.5 rounded-full transition-colors group-hover:bg-white ${
                        isActive ? "bg-white" : "bg-white/40"
                      }`}
                    />
                    <span
                      className={`hidden xl:inline text-[10px] tracking-[0.35em] uppercase rounded-full border px-3 py-1 transition-all group-hover:text-white ${
                        isActive
                          ? "text-white font-semibold border-white/25 bg-white/15 backdrop-blur-md backdrop-saturate-125 shadow-[0_4px_18px_-6px_rgba(255,255,255,0.15)]"
                          : "text-white/55 border-transparent bg-transparent"
                      }`}
                    >
                      {link.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`xl:hidden pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap text-[10px] tracking-[0.35em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full border backdrop-blur-md backdrop-saturate-125 px-3 py-1.5 ${
                        isActive
                          ? "font-semibold border-white/30 bg-white/15 shadow-[0_6px_20px_-8px_rgba(255,255,255,0.2)]"
                          : "border-white/15 bg-black/40 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)]"
                      }`}
                    >
                      {link.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

        </motion.nav>
      </div>
    </>
  );
}
