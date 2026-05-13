import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import GrainientBackground from "./components/GrainientBackground";

export default function App() {
  return (
    <>
      {/* Persistent grainient backdrop (fixed, behind everything) */}
      <GrainientBackground />

      <main className="relative text-white">
        <Hero />
        <About />
        <Experience />
      </main>
    </>
  );
}
