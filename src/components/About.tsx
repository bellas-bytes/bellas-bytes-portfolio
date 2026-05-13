import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full px-6 md:px-14 pt-[35vh] pb-20 md:pb-24"
    >
      {/* Long fade from hero's pure black into the grainient — keeps the scroll seamless */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] bg-gradient-to-b from-black via-black/70 to-transparent"
      />
      {/* Slight darkening so text stays readable over the grainient */}
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
          01 — About
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display text-white text-5xl sm:text-6xl md:text-7xl leading-[1] tracking-tight max-w-3xl"
        >
          Hi, I&apos;m Isabella.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
          className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16 text-white/75 font-light leading-relaxed"
        >
          <div className="space-y-5 text-base md:text-lg">
          <p>
            I&apos;m a Computer Science student at the University of Toronto, focused on building things
            that make everyday work a little easier.
          </p>
          <p>
            I work across DevOps, backend infrastructure, and applied AI, creating scalable systems
            and developer tools that help teams move faster with less friction.
          </p>
          <p>
            Off-keyboard, you&apos;ll find me bouldering, exploring new cafes, or putting together
            an outfit I&apos;m probably overthinking.
          </p>
          </div>

          <div className="space-y-6 text-sm md:text-base">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/45 mb-2">
                Education
              </p>
              <p>HBSc Computer Science · University of Toronto</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/45 mb-2">
                Focus
              </p>
              <p>DevOps · Cloud Infra · AI Systems</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/45 mb-2">
                Based
              </p>
              <p>Toronto, Canada</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
