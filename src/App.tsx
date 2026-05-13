import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import GrainientBackground from "./components/GrainientBackground";

export default function App() {
  return (
    <>
      {/* Persistent grainient backdrop (fixed, behind everything) */}
      <GrainientBackground />

      <Nav />

      <main className="relative text-white">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <TechStack />
      </main>
    </>
  );
}
