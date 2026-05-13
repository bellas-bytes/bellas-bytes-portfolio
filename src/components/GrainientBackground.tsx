import Grainient from "./Grainient";

export default function GrainientBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Grainient
        color1="#a2b1b9"
        color2="#718da1"
        color3="#4b6070"
        timeSpeed={0.15}
        colorBalance={0.0}
        warpStrength={0.7}
        warpFrequency={5.0}
        warpSpeed={2.0}
        warpAmplitude={70.0}
        blendAngle={20.0}
        blendSoftness={0.12}
        rotationAmount={350.0}
        noiseScale={1.6}
        grainAmount={0.06}
        grainScale={2.0}
        grainAnimated={false}
        contrast={1.2}
        gamma={1.0}
        saturation={0.9}
        centerX={0.0}
        centerY={0.0}
        zoom={0.9}
      />
    </div>
  );
}
