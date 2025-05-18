// components/TypingLoader.tsx
import { useEffect, useState } from 'react';

const fullText = "Warming up Isabella’s keyboard... ⌨️";

export default function TypingLoader() {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 50); // typing speed
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-950 z-[9999] flex items-center justify-center">
      <span className="text-xl font-mono text-gray-700 dark:text-gray-200">{text}</span>
    </div>
  );
}
