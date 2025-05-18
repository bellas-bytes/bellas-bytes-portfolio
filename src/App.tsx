import { useRef, useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import Sidebar from './components/SideBar';
import { FiSun, FiMoon } from 'react-icons/fi';


export default function App() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const splineRef = useRef<any>(null);

  // 🌙 Dark Mode: detect system preference on first load
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handlePanelToggle = (panel?: string) => {
    if (!panel) setActivePanel(null);
    else setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const nameToPanel: Record<string, string> = {
    'projects': 'projects',
    'education': 'education',
    'terminal': 'terminal',
    'about-me': 'about-me',
    'tech-stack': 'tech-stack',
    'heart': 'heart',
    'career': 'career'
  };

  const triggerClickAnimation = (name: string) => {
    splineRef.current?.emitEvent('mouseDown', name);
    setTimeout(() => {
      splineRef.current?.emitEvent('mouseUp', name);
    }, 100);
  };

  const triggerKeyAnimation = (name: string) => {
    splineRef.current?.emitEvent('keyDown', name);
    setTimeout(() => {
      splineRef.current?.emitEvent('keyUp', name);
    }, 100);
  };

  useEffect(() => {
    const keyMap: Record<string, { panel: string; name: string }> = {
      '`': { panel: 'terminal', name: 'terminal' },
      l: { panel: 'linkedin', name: 'linkedin' },
      g: { panel: 'github', name: 'github' },
      e: { panel: 'education', name: 'education' },
      t: { panel: 'tech-stack', name: 'tech-stack' },
      p: { panel: 'projects', name: 'projects' },
      c: { panel: 'career', name: 'career' },
      Enter: { panel: 'about-me', name: 'about-me' },
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        handlePanelToggle('heart');
        triggerKeyAnimation('heart');
      } else if (keyMap[e.key]) {
        if (e.key === 'g') {
          window.open('https://github.com/bellas-bytes', '_blank');
          return;
        }
        if (e.key === 'l') {
          window.open('https://linkedin.com/in/nguyenisabella', '_blank');
          return;
        }
        handlePanelToggle(keyMap[e.key].panel);
        triggerKeyAnimation(keyMap[e.key].name);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); 

  return (
    <div className={`transition-opacity duration-500 ${darkMode ? 'opacity-100' : 'opacity-100'}`}>
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
      {activePanel && (
        <div
          className="fixed top-0 right-0 h-full w-full md:w-1/2 bg-white dark:bg-gray-900 text-black dark:text-white z-[9999] p-6 transition-transform duration-300 translate-x-0"
        >
          <Sidebar activePanel={activePanel} onClose={() => handlePanelToggle()} />
        </div>
      )}

      {/* Main layout */}
      <div className="w-screen h-screen flex items-center justify-between bg-white dark:bg-gray-950 text-black dark:text-white overflow-hidden relative transition-colors duration-300">
        {/* 🎹 Spline */}
        <div className="w-1/2 h-full z-0">
          <Spline
            scene="https://prod.spline.design/C62V1tbFur6alYMM/scene.splinecode"
            onLoad={(splineApp) => (splineRef.current = splineApp)}
            onSplineMouseDown={(e) => {
            console.log('Clicked name:', e.target?.name);
            const target = e.target as { name?: string };
            console.log('Clicked object:', target.name);

            if (!target.name) return;

            if (target.name?.toLowerCase().includes('github')) {
            window.open('https://github.com/bellas-bytes', '_blank');
            return;
          }

            if (target.name?.toLowerCase().includes('github')) {
            window.open('https://github.com/bellas-bytes', '_blank');
            return;
          }
            if (nameToPanel[target.name]) {
              handlePanelToggle(nameToPanel[target.name]);
              setTimeout(() => {
                splineRef.current?.emitEvent('mouseUp', target.name!);
              }, 100);
            }
          }}
          />
        </div>

        {/* 👋 Intro */}
        <div className="w-1/2 h-full flex items-center justify-center px-12 transition-colors duration-300">
          <div>
            <h1 className="text-5xl font-quicksand text-gray-800 dark:text-white mb-4 transition-colors">
              Hi, I'm Isabella 💻
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md transition-colors">
              I'm a frontend developer and machine learning enthusiast.
              I build things that are useful, beautiful, and fun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
