import { useRef, useState, useEffect } from "react";
import InfoModal from "./components/InfoModal";
import { FiSun, FiMoon } from "react-icons/fi";
import React, { Suspense } from "react";
import TypingLoader from "./components/TypingLoader";
import TerminalPanel from "./components/TerminalPanel";

const LazySpline = React.lazy(() => import("@splinetool/react-spline"));

export default function App() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [splineReady, setSplineReady] = useState(false);
  const [delayPassed, setDelayPassed] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [mouseHearts, setMouseHearts] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const heartIdRef = useRef(0);

  const splineRef = useRef<any>(null);

  // 🌙 Dark Mode: detect system preference on first load
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const timer = setTimeout(() => setDelayPassed(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const id = heartIdRef.current++;
      const newHeart = { x: e.clientX, y: e.clientY, id };
      setMouseHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setMouseHearts((prev) => prev.filter((heart) => heart.id !== id));
      }, 1000);
    };

    if (activePanel === "heart") {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activePanel]);

  const handlePanelToggle = (panel?: string) => {
    if (!panel) setActivePanel(null);
    else setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const nameToPanel: Record<string, string> = {
    projects: "projects",
    education: "education",
    "about-me": "about-me",
    "tech-stack": "tech-stack",
    career: "career",
  };

  const triggerClickAnimation = (name: string) => {
    splineRef.current?.emitEvent("mouseDown", name);
    setTimeout(() => {
      splineRef.current?.emitEvent("mouseUp", name);
    }, 100);
  };

  const triggerKeyAnimation = (name: string) => {
    splineRef.current?.emitEvent("keyDown", name);
    setTimeout(() => {
      splineRef.current?.emitEvent("keyUp", name);
    }, 100);
  };

  const isLoading = !(splineReady && delayPassed);

  return (
    <div
      className={`transition-opacity duration-500 ${darkMode ? "opacity-100" : "opacity-100"}`}
    >
      {/* 🌗 Dark mode toggle button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 left-4 z-[10000] p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow transition-all duration-300"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <FiSun className="w-5 h-5 transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <FiMoon className="w-5 h-5 transition-transform duration-300 rotate-180 scale-110" />
        )}
      </button>

      {/* 📂 Sidebar overlay */}
      {activePanel && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
          onClick={() => handlePanelToggle()}
        />
      )}

      {/* 📂 Sidebar */}
      <InfoModal
        activePanel={activePanel}
        onClose={() => handlePanelToggle()}
      />
      {/* Main layout */}
      <div className="flex flex-col md:flex-row items-center justify-center w-screen h-screen overflow-hidden bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-300 px-4 py-6 md:px-12 md:py-0 gap-4 md:gap-4">
        {/* 👋 Intro */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 py-1 md:px-8 md:py-0 transition-colors duration-300">
          <div>
            <h1 className="text-5xl font-quicksand text-gray-800 dark:text-white mb-4 transition-colors">
              Hi, I'm Isabella 💻
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md transition-colors">
              I'm a frontend developer and machine learning enthusiast. I build
              things that are useful, beautiful, and fun.
            </p>
          </div>
        </div>
        {/* 🎹 Spline */}
        <div className="w-full md:w-1/2 overflow-hidden h-[50vh] md:h-[75vh] z-0 scale-[1.2] md:scale-[1] transition-transform duration-300">
          <Suspense fallback={null}>
            <LazySpline
              scene="https://prod.spline.design/C62V1tbFur6alYMM/scene.splinecode"
              onLoad={(app) => {
                splineRef.current = app;
                setTimeout(() => setSplineReady(true), 300);
              }}
              onSplineMouseDown={(e) => {
                console.log("Clicked name:", e.target?.name);
                const target = e.target as { name?: string };
                console.log("Clicked object:", target.name);

                if (!target.name) return;

                if (nameToPanel[target.name]) {
                  handlePanelToggle(nameToPanel[target.name]);
                  setTimeout(() => {
                    splineRef.current?.emitEvent("mouseUp", target.name!);
                  }, 100);
                }
              }}
              onSplineMouseUp={(e) => {
                const target = e.target as { name?: string };
                if (!target.name) return;

                // External links triggered on mouseUp
                if (target.name === "github") {
                  window.open("https://github.com/bellas-bytes", "_blank");
                }

                if (target.name === "linkedin") {
                  window.open(
                    "https://linkedin.com/in/nguyenisabella",
                    "_blank",
                  );
                }

                if (target.name === "terminal") {
                  setShowTerminal((prev) => !prev);
                  triggerKeyAnimation("terminal");
                }
              }}
            />
          </Suspense>
        </div>

        {isLoading && <TypingLoader />}
        {showTerminal && (
          <div className="fixed bottom-0 left-0 right-0 z-[10001] px-4 pb-6">
            <TerminalPanel onClose={() => setShowTerminal(false)} />
          </div>
        )}
      </div>

      {activePanel === "heart" && (
        <div className="pointer-events-none fixed inset-0 z-[9998]">
          {mouseHearts.map((heart) => (
            <span
              key={heart.id}
              className="absolute animate-heart-float text-pink-400 select-none"
              style={{
                left: heart.x,
                top: heart.y,
                transform: "translate(-50%, -50%)",
                fontSize: "1.5rem",
                pointerEvents: "none",
              }}
            >
              💕
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
