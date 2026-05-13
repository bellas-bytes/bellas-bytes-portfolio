import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Icon } from "./Icon";

const GIF_SRC =
  "https://i.pinimg.com/originals/4e/40/1d/4e401db1402b22c39edf1f003d928a0e.gif";

const RESUME_URL =
  "https://drive.google.com/file/d/1wk-JEgFoY7eCf8HANBrzT8ei9SE1Dlcz/view?usp=sharing";

const LINKEDIN_URL = "https://www.linkedin.com/in/nguyenisabella/";
const GITHUB_URL = "https://github.com/bellas-bytes";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <img
        src={GIF_SRC}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-125 z-0"
      />

      {/* Cinematic darkening — mirrors the Hero stack */}
      <div className="absolute inset-0 z-10 bg-black/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/45" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_45%,_rgba(0,0,0,0.5)_100%)]" />

      {/* Top fade — mirror of hero's bottom fade so the GIF dissolves into pure black */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[45%] bg-gradient-to-b from-black via-black/70 to-transparent" />

      {/* Bottom darkening so footer signature stays readable */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[25%] bg-gradient-to-b from-transparent via-black/40 to-black" />

      {/* Center content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/60 mb-6"
        >
          05 — Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight"
        >
          Let&apos;s build
          <br />
          together.
        </motion.h2>

        <motion.a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="group mt-12 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/[0.03] px-6 py-3 text-[10px] tracking-[0.4em] uppercase text-white/80 backdrop-blur-sm transition hover:border-white/50 hover:bg-white/[0.08] hover:text-white"
        >
          View Resume
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          className="mt-14 flex flex-col items-center gap-5"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/50">
            Contact Me
          </p>
          <div className="flex items-center gap-7">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
            >
              <Icon icon={FaLinkedinIn} className="h-5 w-5" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
            >
              <Icon icon={FaGithub} className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom signature */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-14 pb-8 text-white/45"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">
          © 2026 Isabella Nguyen
        </span>
        <span className="text-[10px] tracking-[0.4em] uppercase">
          Built in Toronto
        </span>
      </motion.div>
    </section>
  );
}
