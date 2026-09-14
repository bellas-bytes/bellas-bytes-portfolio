import { useEffect, useState } from "react";
import Grainient from "./Grainient";

export default function GrainientBackground() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  return (
    <div
      aria-hidden="true"
      className="receipt-ambience"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      {!reducedMotion && (
        <Grainient
          color1="#d4dde1"
          color2="#a9b9c6"
          color3="#829dad"
          timeSpeed={0.12}
          colorBalance={0.0}
          warpStrength={0.7}
          warpFrequency={5.0}
          warpSpeed={2.0}
          warpAmplitude={70.0}
          blendAngle={20.0}
          blendSoftness={0.12}
          rotationAmount={350.0}
          noiseScale={1.6}
          grainAmount={0.035}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.05}
          gamma={1.0}
          saturation={0.9}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
        />
      )}
    </div>
  );
}
