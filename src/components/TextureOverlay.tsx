import { GrainGradient } from "@paper-design/shaders-react";

export default function TextureOverlay() {
  return (
    <>
      {/* Grain gradient behind everything */}
      <div className="fixed inset-0 z-0" aria-hidden>
        <GrainGradient
          style={{ width: "100%", height: "100%" }}
          colors={["#f0ebe1"]}
          colorBack="#1e3a5a"
          softness={0.7}
          intensity={0.15}
          noise={0.5}
          shape="wave"
          speed={1}
        />
      </div>

      {/* Cyanotype photo on top */}
      {/* <div
        className="fixed inset-0 z-[1]"
        aria-hidden
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          // transform: "rotate(90deg)",
        }}
      /> */}
    </>
  );
}
