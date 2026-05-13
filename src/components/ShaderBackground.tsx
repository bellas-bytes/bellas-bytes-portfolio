import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

const gradientProps = {
  animate: "on",
  axesHelper: "off",
  bgColor1: "#020407",
  bgColor2: "#020407",
  brightness: 0.8,
  cAzimuthAngle: 270,
  cDistance: 0.5,
  cPolarAngle: 180,
  cameraZoom: 15.1,
  color1: "#123149",
  color2: "#0b1f2e",
  color3: "#d8e6ea",
  destination: "onCanvas",
  embedMode: "off",
  envPreset: "city",
  format: "gif",
  fov: 45,
  frameRate: 10,
  gizmoHelper: "hide",
  grain: "on",
  lightType: "env",
  pixelDensity: 1,
  positionX: -0.1,
  positionY: 0,
  positionZ: 0,
  range: "disabled",
  rangeEnd: 40,
  rangeStart: 0,
  reflection: 0.4,
  rotationX: 0,
  rotationY: 130,
  rotationZ: 70,
  shader: "defaults",
  type: "sphere",
  uAmplitude: 3.2,
  uDensity: 0.8,
  uFrequency: 5.5,
  uSpeed: 0.3,
  uStrength: 0.3,
  uTime: 0,
  wireframe: false,
} as const;

export default function ShaderBackground() {
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
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ShaderGradient {...(gradientProps as any)} />
      </ShaderGradientCanvas>
    </div>
  );
}
