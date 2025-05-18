import {
  SiPython,
  SiR,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiAnsible,
  SiTerraform,
  SiReact,
  SiNextdotjs,
  SiNumpy,
  SiPytorch,
  SiDjango,
  SiMongodb,
  SiGit,
  SiGnubash,
  SiPostgresql,
  SiJirasoftware,
  SiRedhat,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";

type SidebarProps = {
  activePanel: string | null;
  onClose: () => void;
};

export default function InfoModal({ activePanel, onClose }: SidebarProps) {
  if (!activePanel) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-md shadow-xl max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl leading-none hover:text-red-500"
        >
          ✕
        </button>

        <div className="space-y-6 mt-4">
          {activePanel === "about-me" && (
            <section>
              <h2 className="text-xl font-bold">💁‍♀️ About Me</h2>
              <p className="space-y-4">
                Hi! I'm Isabella — a Computer Science Specialist at the
                University of Toronto. I'm passionate about backend development
                and DevOps, and I love making systems run smoothly behind the
                scenes.
              </p>
              <p className="mt-2">
                Whether I'm writing infrastructure as code or building
                interactive UIs, I enjoy solving real-world problems and making
                the day-to-day easier for others.
              </p>
              <p className="mt-2">
                Outside of tech, you’ll usually find me in the gym, exploring
                night markets, or obsessing over a new productivity tool. 🧋
              </p>
            </section>
          )}

          {activePanel === "projects" && (
            <section className="max-h-[60vh] overflow-y-auto pr-2">
              <h2 className="text-xl font-bold">🚧 Projects</h2>
              <div className="space-y-4 mt-4 text-sm">
                {/* KnowItAll */}
                <div>
                  <h3 className="text-base font-semibold">
                    📚{" "}
                    <a
                      href="https://vocal-chiller-450923-k8.firebaseapp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800"
                    >
                      KnowItAll
                    </a>
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    JavaScript, Django, React, GCP
                  </p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>
                      Developed a study assistant website deployed on GCP with
                      an AI chatbot.
                    </li>
                    <li>
                      Implemented quiz generation for reinforcement learning.
                    </li>
                    <li>
                      Integrated RAG with Gemini to personalize chatbot
                      responses.
                    </li>
                  </ul>
                </div>

                {/* Scriptorium */}
                <div>
                  <h3 className="text-base font-semibold">
                    💻{" "}
                    <a
                      href="https://github.com/erinkim16/Scriptorium"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800"
                    >
                      Scriptorium
                    </a>
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    React, TypeScript, Next.js, Prisma, Docker
                  </p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>
                      Built a platform to write, run, and fork code with Docker
                      containers.
                    </li>
                    <li>Added blog posts with executable code and comments.</li>
                    <li>Scalable backend using Next.js API and Prisma ORM.</li>
                  </ul>
                </div>

                {/* UniVerse */}
                <div>
                  <h3 className="text-base font-semibold">
                    🗺️{" "}
                    <a
                      href="https://github.com/TheWeeWum/UniVerse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800"
                    >
                      UniVerse
                    </a>
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Google Maps API, Java, Git
                  </p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Created UofT campus map with reviews and favorites.</li>
                    <li>Used Google Maps API for building location display.</li>
                    <li>
                      Employed clean architecture and design patterns for
                      maintainability.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {activePanel === "education" && (
            <section>
              <h2 className="text-xl font-bold">🎓 Education</h2>
              <p>
                I'm currently in my <strong>3rd year</strong> at the{" "}
                <strong>University of Toronto</strong>, pursuing a{" "}
                <strong>Computer Science Specialist</strong> with a{" "}
                <strong>Math & Statistics Minor</strong>.
              </p>
              <p className="mt-2">
                My academic focus is in Artificial intelligence.
              </p>
            </section>
          )}
          {activePanel === "career" && (
            <section>
              <h2 className="text-xl font-bold">💼 Experience</h2>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Software Developer – DevOps: Platform Engineering (Intern)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  RBC · Toronto, ON · Jan 2025 – Present
                </p>
                <ul className="list-inside space-y-1 mt-2">
                  <li>
                    ⚙️ Automated software installation on 200+ servers using
                    Ansible, improving deployment efficiency by 90%.
                  </li>
                  <li>
                    🧱 Managed infrastructure as code for JFrog Artifactory with
                    Terraform, optimizing storage for 45 million artifacts.
                  </li>
                  <li>
                    🚀 Enhanced Artifactory accessibility by leveraging GitHub
                    Actions, streamlining support workflows and reducing ticket
                    resolution time.
                  </li>
                </ul>
              </div>
            </section>
          )}

          {activePanel === "tech-stack" && (
            <section>
              <h2 className="text-xl font-bold">🛠 Tech Stack</h2>

              <div className="space-y-5 mt-2 text-sm">
                <div>
                  <h3 className="font-semibold mb-1">Languages</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    <li className="flex items-center gap-2">
                      <SiPython /> Python
                    </li>
                    <li className="flex items-center gap-2">
                      <FaJava /> Java
                    </li>
                    <li className="flex items-center gap-2">
                      <SiR /> R
                    </li>
                    <li className="flex items-center gap-2">
                      <SiHtml5 /> HTML
                    </li>
                    <li className="flex items-center gap-2">
                      <SiCss3 /> CSS
                    </li>
                    <li className="flex items-center gap-2">
                      <SiJavascript /> JavaScript
                    </li>
                    <li className="flex items-center gap-2">
                      <SiTypescript /> TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <SiAnsible /> Ansible
                    </li>
                    <li className="flex items-center gap-2">
                      <SiTerraform /> Terraform
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Frameworks & Libraries</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    <li className="flex items-center gap-2">
                      <SiReact /> React
                    </li>
                    <li className="flex items-center gap-2">
                      <SiNextdotjs /> Next.js
                    </li>
                    <li className="flex items-center gap-2">
                      <SiDjango /> Django
                    </li>
                    <li className="flex items-center gap-2">
                      <SiNumpy /> Numpy
                    </li>
                    <li className="flex items-center gap-2">
                      <SiPytorch /> PyTorch
                    </li>
                    <li className="flex items-center gap-2">
                      <SiMongodb /> MongoDB
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Tools</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    <li className="flex items-center gap-2">
                      <SiGit /> Git
                    </li>
                    <li className="flex items-center gap-2">
                      <SiGnubash /> Bash / Unix
                    </li>
                    <li className="flex items-center gap-2">
                      <SiPostgresql /> PostgreSQL
                    </li>
                    <li className="flex items-center gap-2">
                      <SiJirasoftware /> Jira / Confluence
                    </li>
                    <li className="flex items-center gap-2">
                      <SiRedhat /> Ansible Automation Platform
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
