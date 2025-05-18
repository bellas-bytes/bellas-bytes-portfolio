import Spline from "@splinetool/react-spline";

export default function SplineScene({
  onSelectKey,
}: {
  onSelectKey: (key: string) => void;
}) {
  return (
    <Spline scene="https://prod.spline.design/C62V1tbFur6alYMM/scene.splinecode" />
  );
}
