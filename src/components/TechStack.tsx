import { motion } from "framer-motion";
import { techStack, type TechCategory } from "../data/techStack";
import { Icon } from "./Icon";

export default function TechStack() {
  return (
    <section
      id="stack"
      className="relative w-full pt-16 md:pt-24 pb-40 md:pb-56"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/25"
      />

      {/* Bottom fade — dissolves the grainient into black so the Contact section starts seamlessly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 md:h-72 bg-gradient-to-b from-transparent via-black/70 to-black"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/60 mb-8"
        >
          04 — Stack
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display text-white text-5xl sm:text-6xl md:text-7xl leading-[1] tracking-tight max-w-3xl"
        >
          The tools I reach for.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
          className="mt-6 max-w-2xl text-white/65 font-light text-base md:text-lg leading-relaxed"
        >
          What I use most often — grouped by where they live in the stack.
        </motion.p>

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-4 md:gap-6">
          {techStack.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: TechCategory;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: 0.05 + index * 0.06,
        ease: "easeOut",
      }}
      className={`relative rounded-2xl border border-white/15 bg-white/[0.05] backdrop-blur-md backdrop-saturate-125 p-6 md:p-7 overflow-hidden shadow-[0_20px_50px_-25px_rgba(0,0,0,0.55)] ${
        category.wide ? "md:col-span-2" : ""
      }`}
    >
      {/* Sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/6 via-transparent to-transparent"
      />
      {/* Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      {/* Inner ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5"
      />

      <div className="relative">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/55 mb-4">
          {category.title}
        </p>
        <div className="flex flex-wrap gap-2">
          {category.items.map((item) => (
            <span
              key={item.name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs text-white/85 font-light"
            >
              {item.Icon && (
                <Icon icon={item.Icon} className="h-3.5 w-3.5 text-white/70" />
              )}
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
