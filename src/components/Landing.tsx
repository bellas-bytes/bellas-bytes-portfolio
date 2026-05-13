import { motion } from "framer-motion";

interface LandingProps {
  readonly name: string;
  readonly slogan: string;
}

export default function Landing({ name, slogan }: LandingProps) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] select-none px-4">
      <motion.h1
        className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-cyan-paper tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {name}
      </motion.h1>

      <motion.p
        className="font-body text-sm sm:text-base md:text-lg text-cyan-paper mt-4 tracking-[0.15em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {slogan}
      </motion.p>
    </section>
  );
}
