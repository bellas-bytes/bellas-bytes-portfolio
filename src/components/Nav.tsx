import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Icon } from "./Icon";

const sectionLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
];

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
        <button
          type="button"
          onClick={() => scrollToId("top")}
          aria-label="Scroll to top"
          className="font-display text-base text-white hover:text-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
        >
          Isabella
        </button>
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/isabella-nguyen/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/65 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
          >
            <Icon icon={FaLinkedinIn} className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/bellas-bytes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/65 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
          >
            <Icon icon={FaGithub} className="h-4 w-4" />
          </a>
        </div>
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
          <button
            type="button"
            onClick={() => scrollToId("top")}
            aria-label="Scroll to top"
            className="font-display text-sm xl:text-lg text-white hover:text-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
          >
            <span className="xl:hidden">IN</span>
            <span className="hidden xl:inline">Isabella</span>
          </button>

          <ul className="flex flex-col items-start gap-3 xl:gap-2.5">
            {sectionLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(link.id)}
                  aria-label={link.label}
                  className="group relative flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
                >
                  <span
                    aria-hidden="true"
                    className="block h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors"
                  />
                  <span className="hidden xl:inline text-[10px] tracking-[0.35em] uppercase text-white/55 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="xl:hidden pointer-events-none absolute left-full ml-3 whitespace-nowrap text-[10px] tracking-[0.35em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    {link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Socials — stacked vertically in collapsed sidebar, side-by-side at xl+ */}
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-3 xl:pt-2">
            <a
              href="https://www.linkedin.com/in/isabella-nguyen/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/55 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
            >
              <Icon icon={FaLinkedinIn} className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/bellas-bytes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/55 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
            >
              <Icon icon={FaGithub} className="h-4 w-4" />
            </a>
          </div>
        </motion.nav>
      </div>
    </>
  );
}
