import { PaperTexture } from "@paper-design/shaders-react";

interface PaperCardProps {
  readonly children: React.ReactNode;
  /** Slight rotation in degrees for that pinned-to-a-page look. Default: -1 */
  readonly tilt?: number;
  /** Seed for the paper texture — vary per card for unique textures */
  readonly seed?: number;
}

export default function PaperCard({
  children,
  tilt = -1,
  seed = 5.8,
}: PaperCardProps) {
  return (
    <div
      className="relative"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {/* Tape strip */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-20 h-6 rounded-sm opacity-50"
        style={{
          background: "linear-gradient(135deg, rgba(200,190,170,0.7), rgba(220,210,190,0.5))",
          backdropFilter: "blur(1px)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      />

      <PaperTexture
        className="rounded-none"
        style={{
          boxShadow: "4px 6px 16px rgba(0,0,0,0.25), 1px 1px 4px rgba(0,0,0,0.15)",
        }}
        colorBack="#f5f0e6"
        colorFront="#c4b8a8"
        contrast={0.45}
        roughness={0.7}
        fiber={0.5}
        fiberSize={0.2}
        crumples={0.2}
        crumpleSize={0.5}
        folds={0.2}
        foldCount={2}
        fade={0}
        seed={seed}
        scale={0.6}
        fit="cover"
        speed={0}
      >
        <div className="relative z-10 px-8 py-10 sm:px-10 sm:py-12">
          {children}
        </div>
      </PaperTexture>
    </div>
  );
}
