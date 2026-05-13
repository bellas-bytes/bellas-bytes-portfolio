import { motion } from "framer-motion";

export type Section = "home" | "about" | "education" | "experience" | "projects" | "skills";

const NAV_ITEMS: readonly { readonly id: Section; readonly label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

interface BottomNavProps {
  readonly active: Section;
  readonly onSelect: (section: Section) => void;
}

export default function BottomNav({ active, onSelect }: BottomNavProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center gap-6 sm:gap-10 px-4 py-5"
      role="navigation"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`relative font-body text-xs sm:text-sm tracking-[0.12em] uppercase transition-colors duration-200 bg-transparent border-none cursor-pointer ${
              isActive
                ? "text-cyan-paper font-bold"
                : "text-cyan-wash/60 hover:text-cyan-wash"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
            {isActive && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-paper"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
