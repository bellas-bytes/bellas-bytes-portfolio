type SidebarProps = {
  activePanel: string | null;
  onClose: () => void;
};

export default function Sidebar({ activePanel, onClose }: SidebarProps) {
  if (!activePanel) return null;

  return (
    <div className="w-full h-full overflow-y-auto bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <button onClick={onClose} className="absolute top-4 right-4 text-xl">✕</button>

      <div className="mt-12 space-y-6">
        {activePanel === 'about-me' && (
          <section>
            <h2 className="text-xl font-bold">💁‍♀️ About Me</h2>
            <p>I'm Isabella — a frontend developer and ML enthusiast.</p>
          </section>
        )}

        {activePanel === 'projects' && (
          <section>
            <h2 className="text-xl font-bold">🚧 Projects</h2>
            <p>Here are a few things I’ve built recently...</p>
          </section>
        )}

        {activePanel === 'github' && (
          <section>
            <h2 className="text-xl font-bold">🌐 GitHub</h2>
            <a
              href="https://github.com/YOUR_USERNAME"
              target="_blank"
              className="text-blue-500 dark:text-blue-400 underline"
              rel="noreferrer"
            >
              Visit my GitHub
            </a>
          </section>
        )}

        {activePanel === 'linkedin' && (
          <section>
            <h2 className="text-xl font-bold">🔗 LinkedIn</h2>
            <a
              href="https://linkedin.com/in/YOUR_USERNAME"
              target="_blank"
              className="text-blue-500 dark:text-blue-400 underline"
              rel="noreferrer"
            >
              Connect on LinkedIn
            </a>
          </section>
        )}

        {activePanel === 'education' && (
          <section>
            <h2 className="text-xl font-bold">🎓 Education</h2>
            <p>Studying CS with a focus in ML & full-stack dev.</p>
          </section>
        )}

        {activePanel === 'career' && (
          <section>
            <h2 className="text-xl font-bold">💼 Career</h2>
            <p>Currently working at RBC.</p>
          </section>
        )}

        {activePanel === 'tech-stack' && (
          <section>
            <h2 className="text-xl font-bold">🛠 Tech Stack</h2>
            <ul className="list-disc list-inside">
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>Next.js</li>
              <li>Prisma</li>
              <li>Python / ML</li>
            </ul>
          </section>
        )}

        {activePanel === 'terminal' && (
          <section>
            <h2 className="text-xl font-bold">🖥 Terminal Mode</h2>
            <p>Coming soon: a fun fake terminal or command prompt UI!</p>
          </section>
        )}

        {activePanel === 'heart' && (
          <section>
            <h2 className="text-xl font-bold">❤️ Passion Project</h2>
            <p>This is a space for my favorite or most meaningful work.</p>
          </section>
        )}
      </div>
    </div>
  );
}
