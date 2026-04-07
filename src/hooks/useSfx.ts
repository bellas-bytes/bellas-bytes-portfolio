import { useState, useCallback, useRef } from "react";
import { Howl } from "howler";

type SfxName = "click" | "open" | "drop" | "trip";

function createSounds(): Record<SfxName, Howl> {
  const base = process.env.PUBLIC_URL || "";
  return {
    click: new Howl({ src: [`${base}/sfx/click.wav`], volume: 0.3 }),
    open: new Howl({ src: [`${base}/sfx/open.wav`], volume: 0.3 }),
    drop: new Howl({ src: [`${base}/sfx/drop.wav`], volume: 0.4 }),
    trip: new Howl({ src: [`${base}/sfx/trip.wav`], volume: 0.4 }),
  };
}

let soundsInstance: Record<SfxName, Howl> | null = null;

function getSounds(): Record<SfxName, Howl> {
  if (!soundsInstance) {
    soundsInstance = createSounds();
  }
  return soundsInstance;
}

export type { SfxName };

export function useSfx() {
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  const play = useCallback((name: SfxName) => {
    if (!mutedRef.current) {
      try {
        getSounds()[name].play();
      } catch {
        // Silently ignore if audio fails to load
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      mutedRef.current = !prev;
      return !prev;
    });
  }, []);

  return { muted, play, toggleMute };
}
