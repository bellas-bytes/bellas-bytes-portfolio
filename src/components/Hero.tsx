import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const GIF_SRC =
  "https://i.pinimg.com/originals/37/55/ce/3755ceb460354b7eb87f16cdb1ea0b59.gif";

function scrollToAbout() {
  document
    .getElementById("about")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <img
        src={GIF_SRC}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-125 z-0"
      />

      {/* Cinematic darkening layers (reduced) */}
      <div className="absolute inset-0 z-10 bg-black/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/45 via-transparent to-transparent" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_45%,_rgba(0,0,0,0.5)_100%)]" />

      {/* Bottom fade: dissolves GIF into pure black so the section seams disappear */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45%] bg-gradient-to-b from-transparent via-black/70 to-black" />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-end px-8 md:px-14 py-6 text-white/70"
      >
        <span className="hidden md:inline text-xs tracking-[0.35em] uppercase">
          2026
        </span>
      </motion.div>

      {/* Center content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.6 }}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/60 mb-6"
        >
          DevOps · Infra · AI
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="font-display text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight"
        >
          Isabella Nguyen
          <br />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.9 }}
          className="mt-8 max-w-xl text-sm md:text-base text-white/65 font-light leading-relaxed"
        >
          Building the Behind the Scenes
        </motion.p>

      </div>

      {/* Motion scroll cue — sits in the fade zone */}
      <motion.button
        type="button"
        onClick={scrollToAbout}
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.6 }}
        className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-white/65 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full px-3 py-2"
      >
        <span className="text-[10px] tracking-[0.5em] uppercase">Scroll</span>
        <div className="relative h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-0 h-1/2 w-px bg-white/80"
          />
        </div>
      </motion.button>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-14 pb-8 text-white/55"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">
          Est. Toronto
        </span>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/isabella-nguyen/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/70 hover:text-white transition-colors duration-300 hover:-translate-y-0.5 transform-gpu"
          >
            <FaLinkedinIn className="h-4 w-4 md:h-5 md:w-5" />
          </a>
          <a
            href="https://github.com/bellas-bytes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/70 hover:text-white transition-colors duration-300 hover:-translate-y-0.5 transform-gpu"
          >
            <FaGithub className="h-4 w-4 md:h-5 md:w-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
