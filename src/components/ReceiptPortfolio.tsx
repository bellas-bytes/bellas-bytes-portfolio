import { useEffect, useState } from "react";
import { experiences } from "../data/experiences";
import { projects } from "../data/projects";
import { techStack } from "../data/techStack";
import "./ReceiptPortfolio.css";

const sections = [
  { id: "about", label: "The introduction" },
  { id: "experience", label: "Work experience" },
  { id: "projects", label: "Selected projects" },
  { id: "tech", label: "The toolkit" },
  { id: "contact", label: "Say hello" },
];
const resume =
  "https://drive.google.com/file/d/1_s1jqAfBXZsYU-LRWIn7MUyPYYsjml1A/view?usp=sharing";

function Barcode() {
  return <div className="receipt-barcode" aria-hidden="true" />;
}

function ReceiptHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="receipt-heading">
      <span>{number}</span>
      {title}
      <span aria-hidden="true">✳</span>
    </h2>
  );
}

function Printer() {
  const [progress, setProgress] = useState(0);
  const [feeding, setFeeding] = useState(false);
  useEffect(() => {
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        max > 0
          ? Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100)))
          : 100,
      );
    };
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          measure();
          frame = 0;
        });
      setFeeding(true);
      clearTimeout(timer);
      timer = setTimeout(() => setFeeding(false), 160);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  const feed = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (progress >= 100)
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    else
      window.scrollBy({
        top: window.innerHeight * 0.65,
        behavior: reduce ? "auto" : "smooth",
      });
  };

  return (
    <footer
      className={`printer ${feeding ? "is-feeding" : ""}`}
      aria-label="Receipt printer"
    >
      <div className="printer-slot" aria-hidden="true" />
      <div className="printer-body">
        <div className="printer-brand">
          <strong>bb.</strong>
          <span>
            THE LITTLE IDEA PRINTER<small>MODEL NO. 001 / TORONTO</small>
          </span>
        </div>
        <div className="printer-controls">
          <div className="printer-display">
            <span className="printer-led" />{" "}
            <span>
              {progress === 100
                ? "ALL PRINTED"
                : feeding
                  ? "PRINTING"
                  : "READY"}
            </span>
            <span>{String(progress).padStart(2, "0")}%</span>
          </div>
          <button
            type="button"
            onClick={feed}
            className="feed-button"
            aria-label={
              progress === 100
                ? "Return to top of receipt"
                : "Feed receipt: scroll down"
            }
          >
            {progress === 100 ? "REWIND ↑" : "FEED ↓"}
          </button>
        </div>
      </div>
      <div className="printer-base" aria-hidden="true">
        <span /> <span>GOOD THINGS TAKE A LITTLE PAPER.</span>
        <span />
      </div>
    </footer>
  );
}

export default function ReceiptPortfolio() {
  const [originalColors, setOriginalColors] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const current = sections
        .filter((section) => {
          const element = document.getElementById(section.id);
          return (
            element &&
            element.getBoundingClientRect().top <= window.innerHeight * 0.35
          );
        })
        .pop();
      setActiveSection(current?.id || "");
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    measure();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div
      className={`receipt-scene ${originalColors ? "original-colors" : "thermal-colors"}`}
    >
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <header className="desk-header">
        <a href="#top" aria-label="Bella's Bytes home">
          bb<span>✳</span>
        </a>
        <span>
          A SMALL RECORD OF
          <br />
          THINGS I'VE BUILT.
        </span>
        <a href={resume} target="_blank" rel="noreferrer">
          RÉSUMÉ ↗
        </a>
      </header>
      <nav className="receipt-nav" aria-label="Portfolio sections">
        <p>ON THIS RECEIPT</p>
        {sections.map((s, i) => (
          <a
            href={`#${s.id}`}
            key={s.id}
            aria-current={activeSection === s.id ? "location" : undefined}
          >
            <span>0{i + 1}</span>
            {s.label}
          </a>
        ))}
        <span className="nav-footnote">KEEP FOR YOUR RECORDS.</span>
      </nav>
      <aside className="desk-note" aria-hidden="true">
        <span>
          made of curiosity,
          <br />
          code & coffee.
        </span>
        <svg viewBox="0 0 100 100" fill="none">
          <path d="M80 8C95 55 67 75 17 68m0 0 19-13M17 68l22 9" />
        </svg>
      </aside>
      <main id="top" className="receipt-paper">
        <div className="receipt-inner">
          <header className="receipt-masthead">
            <div className="receipt-topline">
              <span>PERSONAL PORTFOLIO</span>
              <span>EST. IN TORONTO</span>
            </div>
            <div className="receipt-emblem" aria-hidden="true">
              ✳
            </div>
            <h1>
              bella’s
              <br />
              <span>bytes</span>
              <span className="masthead-dot">®</span>
            </h1>
            <p className="receipt-name">ISABELLA NGUYEN</p>
            <p className="hero-role">
              Software developer
              <br />
              <span>DevOps, infrastructure & applied AI</span>
            </p>
            <p className="hero-credentials">
              Previously at <strong>Confluent</strong> & <strong>RBC</strong>
              <br />
              Computer Science at the University of Toronto
            </p>
            <div className="hero-shortcuts" aria-label="Quick links">
              <a href="#experience">Work ↓</a>
              <a href="#projects">Projects ↓</a>
              <a href={resume} target="_blank" rel="noreferrer">
                Résumé ↗
              </a>
            </div>
            <div className="work-peek">
              {projects
                .filter((project) => project.preview)
                .map((project) => (
                  <a href={`#${project.id}`} key={project.id}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/projects/${project.preview!.image}`}
                      alt=""
                      width="400"
                      height="150"
                    />
                    <span>
                      {project.title} <span aria-hidden="true">↘</span>
                    </span>
                  </a>
                ))}
            </div>
            <p className="peek-note">a little logic. a little atmosphere.</p>
          </header>
          <section id="about" className="receipt-section">
            <ReceiptHeading number="01" title="The introduction" />
            <div className="about-title">
              Hi, I’m Isabella<span className="red-asterisk">*</span>
            </div>
            <p>
              I’m a Computer Science student at the University of Toronto,
              building things that make everyday work a little easier.
            </p>
            <p>
              I work across DevOps, backend infrastructure, and applied
              AI—creating systems and developer tools that help teams move
              faster with less friction.
            </p>
            <dl className="receipt-facts">
              <div>
                <dt>BASED IN</dt>
                <dd>Toronto, Canada</dd>
              </div>
              <div>
                <dt>STUDYING</dt>
                <dd>Computer Science, UofT</dd>
              </div>
              <div>
                <dt>OFF THE CLOCK</dt>
                <dd>Bouldering, cafés & outfits</dd>
              </div>
            </dl>
            <p className="handwritten">
              * probably thinking about my next coffee
            </p>
          </section>
          <section id="experience" className="receipt-section">
            <ReceiptHeading number="02" title="Work experience" />
            <div className="receipt-column-label">
              <span>ITEM / DESCRIPTION</span>
              <span>PERIOD</span>
            </div>
            {experiences.map((exp, i) => (
              <article className="receipt-job" key={exp.id}>
                <div className="item-heading">
                  <h3>
                    <span className="item-number">0{i + 1}</span>
                    {exp.company}
                  </h3>
                  <span>{exp.period}</span>
                </div>
                <p className="job-role">{exp.role}</p>
                <p className="job-team">
                  {exp.summary} · {exp.location}
                </p>
                <ul className="receipt-bullets">
                  {exp.highlights?.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
            <div className="receipt-subtotal">
              <span>EXPERIENCES COLLECTED</span>
              <strong>03</strong>
            </div>
          </section>
          <section id="projects" className="receipt-section">
            <ReceiptHeading number="03" title="Selected projects" />
            <div className="project-introduction">
              <p className="section-intro">
                From a small “what if” to something real.
              </p>
              <button
                type="button"
                className="color-toggle"
                aria-pressed={originalColors}
                onClick={() => setOriginalColors(!originalColors)}
              >
                {originalColors ? "Use receipt ink" : "Show original colors"}
              </button>
            </div>
            {projects.map((project, i) => (
              <article
                className={`receipt-project ${project.preview ? "visual-project" : ""}`}
                id={project.id}
                key={project.id}
              >
                {project.preview && (
                  <figure className="project-print">
                    <a
                      href={project.preview.source}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} ${project.id === "proj-1" ? "on Devpost" : "live website"}`}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/projects/${project.preview.image}`}
                        alt={project.preview.alt}
                        width={project.id === "proj-1" ? 806 : 1280}
                        height={project.id === "proj-1" ? 454 : 850}
                        loading="lazy"
                      />
                    </a>
                    <figcaption>
                      <span>{project.preview.caption}</span>
                      <span className="print-number">FIG. 0{i + 1}</span>
                    </figcaption>
                    <p className="project-annotation">{project.preview.note}</p>
                  </figure>
                )}
                <div className="item-heading">
                  <h3>
                    <span className="item-number">0{i + 1}</span>
                    {project.title}
                  </h3>
                  <span>{project.year}</span>
                </div>
                <p>
                  {project.id === "proj-4"
                    ? "A personal portfolio, printed with a little personality. DevOps, infrastructure, and applied AI on one continuous receipt."
                    : project.tagline}
                </p>
                {project.id === "proj-1" && (
                  <p className="project-outcome">
                    <strong>1,000+</strong> simulated family units for
                    evacuation planning.
                  </p>
                )}
                <details>
                  <summary>
                    Read the details <span aria-hidden="true">+</span>
                  </summary>
                  <p>
                    {project.id === "proj-4"
                      ? "Designed and built a receipt-inspired portfolio with textured paper, a stationary printer, and a scroll-driven paper feed. Built with React and TypeScript, with responsive layouts and reduced-motion support."
                      : project.description}
                  </p>
                </details>
                <p className="project-tech">{project.tech.join(" / ")}</p>
                <div className="project-links">
                  {project.links.map((link) =>
                    link.url === "#" ? (
                      <span key={link.label}>COURSE PROJECT · PRIVATE</span>
                    ) : (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label} ↗
                      </a>
                    ),
                  )}
                </div>
              </article>
            ))}
            <div className="receipt-subtotal">
              <span>IDEAS BROUGHT TO LIFE</span>
              <strong>{String(projects.length).padStart(2, "0")}</strong>
            </div>
          </section>
          <section id="tech" className="receipt-section">
            <ReceiptHeading number="04" title="The toolkit" />
            <p className="section-intro">A few ingredients I reach for.</p>
            <dl className="toolkit-list">
              {techStack.map((category) => (
                <div key={category.id}>
                  <dt>{category.title}</dt>
                  <dd>{category.items.map((item) => item.name).join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section id="contact" className="receipt-section receipt-contact">
            <ReceiptHeading number="05" title="Say hello" />
            <p className="contact-total">
              <span>NEXT UP</span>
              <strong>
                Let’s build
                <br />
                something good.
              </strong>
            </p>
            <p>
              Have an idea, an opportunity, or a café recommendation?
              <br />
              I’d love to hear it.
            </p>
            <a className="email-link" href="mailto:missisabellan@gmail.com">
              missisabellan@gmail.com ↗
            </a>
            <div className="contact-links">
              <a
                href="https://www.linkedin.com/in/nguyenisabella/"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN ↗
              </a>
              <a
                href="https://github.com/bellas-bytes"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB ↗
              </a>
              <a href={resume} target="_blank" rel="noreferrer">
                RÉSUMÉ ↗
              </a>
            </div>
            <div className="thank-you-stamp">
              THANK YOU
              <br />
              <span>FOR SCROLLING</span>
            </div>
            <Barcode />
            <p className="receipt-signoff">
              NO. 001 — ISABELLA NGUYEN — {new Date().getFullYear()}
              <br />
              MADE WITH CARE IN TORONTO.
              <br />
              <span>Come back soon. There’s always more in the works.</span>
            </p>
          </section>
        </div>
      </main>
      <Printer />
    </div>
  );
}
