import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import PixelCharacter from "./PixelCharacter";

type LoadingScreenProps = {
  readonly onComplete: () => void;
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let current = 0;
    let done = false;

    const interval = setInterval(() => {
      current += 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        if (!done) {
          done = true;
          setTimeout(() => onCompleteRef.current(), 0);
        }
        return;
      }
      setProgress(current);
    }, 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a1a] z-[9999] flex flex-col items-center justify-center gap-8">
      {/* Walking character */}
      <div className="relative w-[300px] h-[80px]">
        <motion.div
          className="absolute bottom-0"
          animate={{ x: [0, 260] }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <PixelCharacter state="walking" />
        </motion.div>

        {/* Ground line */}
        <div className="absolute bottom-0 w-full h-[2px] bg-gray-700" />
      </div>

      {/* Loading bar */}
      <div className="w-[280px]">
        <div className="flex justify-between mb-2">
          <span className="font-pixel text-[10px] text-blue-400">
            LOADING INVENTORY...
          </span>
          <span className="font-pixel text-[10px] text-gray-500">
            {progress}%
          </span>
        </div>
        <div className="w-full h-[12px] bg-gray-800 border border-gray-600 p-[2px]">
          <motion.div
            className="h-full bg-blue-500"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Retro hint text */}
      <motion.p
        className="font-pixel text-[8px] text-gray-600"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        PRESS START... or just wait
      </motion.p>
    </div>
  );
}
