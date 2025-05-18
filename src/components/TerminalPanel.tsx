import { useState, useRef, useEffect } from "react";

export default function TerminalPanel({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<string[]>([
    "Welcome to IsabellaOS! ✨ Type `help` for commands.",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const commands: Record<string, string | (() => string)> = {
    help: `Available commands:\n- help\n- about\n- clear\n- coffee\n- whoami\n- github`,
    about: `I'm Isabella — a Computer Science Specialist at the UofT!\n I love to keep things moving, which is evident in my love for backend and working out`,
    whoami: "Developer, creator, sweet treat enthusiast",
    github: () => {
      window.open("https://github.com/bellas-bytes", "_blank");
      return "Opening GitHub...";
    },
    clear: "",
    coffee: () => {
      const user = "missisabellan";
      const domain = "gmail.com";
      const mail = `${user}@${domain}`;
      return `☕ Let’s chat over coffee — shoot me an email at ${mail}`;
    },
  };

  const handleCommand = () => {
    const trimmed = input.trim();
    const output =
      typeof commands[trimmed] === "function"
        ? (commands[trimmed] as () => string)()
        : (commands[trimmed] ?? `Command not found: ${trimmed}`);

    if (trimmed === "clear") {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        `$ ${trimmed}`,
        ...(output ? [String(output)] : []),
      ]);
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCommand();
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-md shadow-lg p-4 w-full max-w-2xl h-80 overflow-y-auto 
          bg-white dark:bg-[#1a2a3f] 
          text-[#0d1a26] dark:text-white 
          border border-[#cfd8e3] dark:border-[#87a5d3]
          font-mono text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={scrollRef}
          className="overflow-y-auto space-y-1 transition-all"
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-line">
              {line}
            </div>
          ))}
          <div className="flex items-center">
            <span className="mr-2 text-[#354b6b] dark:text-[#87a5d3]">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none w-full
                text-[#0d1a26] dark:text-white
                placeholder-[#5e7891] dark:placeholder-[#aab8c5]"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
