import ThermalImage from "./ThermalImage";
import GrainientBackground from "./GrainientBackground";
import { useEffect, useState } from "react";
import { leadership } from "../data/leadership";
import { experiences } from "../data/experiences";
import { projects } from "../data/projects";
import { techStack } from "../data/techStack";
import "./ReceiptPortfolio.css";

const sections = [
  { id: "about", label: "The introduction" },
  { id: "experience", label: "Work experience" },
  { id: "projects", label: "Selected projects" },
  { id: "leadership", label: "Leadership" },
  { id: "tech", label: "The toolkit" },
  { id: "beyond", label: "Beyond the keyboard" },
  { id: "contact", label: "Say hello" },
];
const resume =
  "https://drive.google.com/file/d/17ypWgHG-ujflH0Wkr4K4N0RLhLtYUR4o/view?usp=sharing";

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
  // Full-size printer on arrival; it tucks down once you start reading.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setCompact(window.scrollY > 120);
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
      className={`printer${feeding ? " is-feeding" : ""}${compact ? " is-compact" : ""}`}
      aria-label="Receipt printer"
    >
      <div className="printer-slot" aria-hidden="true" />
      <div className="printer-body">
        <div className="printer-brand">
          <strong>bb.</strong>
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
    </footer>
  );
}

export default function ReceiptPortfolio() {
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
    <div className="receipt-scene thermal-colors">
      <GrainientBackground />
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <header className="desk-header">
        <a href="#top" aria-label="Bella's Bytes home">
          bb<span>✳</span>
        </a>
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
      </nav>
      <aside className="desk-note" aria-hidden="true">
        <div className="coffee-card">
          <p className="coffee-card-brand">coffee card</p>
          <p className="coffee-card-line">
            made of curiosity,
            <br />
            code & coffee.
          </p>
          <div className="coffee-card-slots">
            <span className="is-punched" />
            <span className="is-punched" />
            <span className="is-punched" />
            <span />
            <span />
          </div>
          <p className="coffee-card-note">come back for a refill.</p>
        </div>
      </aside>
      <main id="top" className="receipt-paper">
        <div className="receipt-inner">
          <header className="receipt-masthead">
            <div className="receipt-topline">
              <span>PERSONAL PORTFOLIO</span>
              <span>EST. IN TORONTO</span>
            </div>
            <h1>
              bella’s
              <br />
              <span>bytes</span>
              <span className="masthead-dot">®</span>
            </h1>
            <p className="receipt-name">ISABELLA NGUYEN</p>
            <p>
              Developer. Curious human.
              <br />
              I build the infrastructure and tools that help teams ship faster.
            </p>
            <div className="receipt-order">
              <span>DEVOPS / INFRA / AI</span>
            </div>
            <p className="receipt-welcome">
              A little about me. A few things I’ve made.
              <br />
              Thanks for stopping by.
            </p>
          </header>
          <section id="about" className="receipt-section">
            <ReceiptHeading number="01" title="The introduction" />
            <figure className="intro-portrait">
              <ThermalImage
                src={`${process.env.PUBLIC_URL}/images/portraits/isabella.png`}
                alt="Isabella wearing glasses and making a peace sign"
                width="960"
                height="720"
                loading="eager"
              />
            </figure>
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
            <p>
              Outside of tech, I enjoy bouldering, exploring new restaurants,
              and getting creative with my outfits. I also love learning to
              dance and am taking on hip-hop at the moment. Somewhere in
              between, my next hair colour is still up for debate.
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
                <dt>EXPECTED GRADUATION</dt>
                <dd>December 2026</dd>
              </div>
            </dl>
            <div className="intro-footnote">
              <p>
                <span className="footnote-mark" aria-hidden="true">
                  *
                </span>
                probably thinking about my next coffee
              </p>
            </div>
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
            </div>
            {projects.map((project, i) => (
              <article
                className={`receipt-project ${project.preview ? "visual-project" : ""}`}
                id={project.id}
                key={project.id}
              >
                <div className="item-heading">
                  <h3>
                    <span className="item-number">0{i + 1}</span>
                    {project.title}
                  </h3>
                  <span className="project-meta">
                    {project.status && (
                      <span className="project-status">{project.status}</span>
                    )}
                    <span>{project.year}</span>
                  </span>
                </div>
                <p>
                  {project.id === "proj-4"
                    ? "A personal portfolio, printed with a little personality. DevOps, infrastructure, and applied AI on one continuous receipt."
                    : project.tagline}
                </p>
                {project.preview && (
                  <figure className="project-print">
                    <a
                      href={project.preview.source}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} ${project.id === "proj-1" ? "on Devpost" : "live website"}`}
                    >
                      <ThermalImage
                        src={`${process.env.PUBLIC_URL}/images/projects/${project.preview.image}`}
                        alt={project.preview.alt}
                        width={project.id === "proj-1" ? 806 : 960}
                        height={project.id === "proj-1" ? 454 : 638}
                        loading="lazy"
                      />
                    </a>
                    <figcaption>
                      <span>{project.preview.caption}</span>
                      <span className="print-number">FIG. 0{i + 1}</span>
                    </figcaption>
                  </figure>
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
          <section id="leadership" className="receipt-section">
            <ReceiptHeading number="04" title="Leadership" />
            <div className="receipt-column-label">
              <span>ROLE / COMMUNITY</span>
              <span>PERIOD</span>
            </div>
            {leadership.map((entry, i) => (
              <article className="receipt-job" key={entry.id}>
                <div className="item-heading">
                  <h3>
                    <span className="item-number">0{i + 1}</span>
                    {entry.organization}
                  </h3>
                  <span>{entry.period}</span>
                </div>
                <p className="job-role">{entry.role}</p>
                <p className="job-team">
                  {entry.team} · {entry.location}
                </p>
                <ul className="receipt-bullets">
                  {entry.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
          <section id="tech" className="receipt-section">
            <ReceiptHeading number="05" title="The toolkit" />
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
          <section id="beyond" className="receipt-section">
            <ReceiptHeading number="06" title="Beyond the keyboard" />
            <article className="receipt-essay">
              <p className="essay-label">A PERSONAL NOTE · 2 MIN READ</p>
              <h3>On the other side of the counter</h3>
              <p>
                One of my regulars came in one day and announced that she was
                engaged. I still think about that.
              </p>
              <details className="essay-details">
                <summary>
                  <span className="essay-read">Read the story</span>
                  <span className="essay-hide">Close the story</span>
                </summary>
                <div className="essay-body">
                  <p>
                    It’s easy for me to get consumed by tech. Between what I’m
                    building, what I’m learning, and the community around it, it
                    can start to feel like my whole world. Working behind a
                    counter gives me a chance to step into someone else’s day.
                  </p>
                  <p>
                    I love the everyday parts of it. Remembering a regular’s
                    order. Helping someone new find something they might like.
                    Having a conversation that has nothing to do with school,
                    careers, or the latest thing in tech.
                  </p>
                  <p>
                    She was one of those regulars. She would come in and talk
                    about her day, often with her boyfriend, and over time those
                    conversations became a familiar part of work. Then one day,
                    she came in and announced that they were engaged.
                  </p>
                  <p>
                    Someone I knew through these little everyday visits had a
                    huge piece of news, and I got to hear it. I had seen small
                    pieces of her life as they happened, and now I was there
                    for this one, too.
                  </p>
                  <p>
                    Those are the stories I love being around for. You never
                    know whether the person walking through the door is on an
                    ordinary visit or having a day they’ll remember for years.
                    Most of the time, it’s an ordinary visit. I enjoy those,
                    too.
                  </p>
                  <p>
                    After I left the job, I heard that regulars had asked where
                    I was. It was such a small thing, but it meant a lot. Those
                    conversations had become part of their routines, just as
                    they had become part of mine.
                  </p>
                  <p>
                    It’s nice to be known for something beyond being a
                    developer. To some people, I’m a familiar face who remembers
                    their order, has a recommendation ready, or takes a moment
                    to hear about their day. That part of who I am matters to
                    me.
                  </p>
                  <p>
                    I love building things. I also love remembering someone’s
                    order and asking how their day has been.
                  </p>
                </div>
              </details>
            </article>
          </section>
          <section id="contact" className="receipt-section receipt-contact">
            <ReceiptHeading number="07" title="Say hello" />
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
              <span className="stamp-ink">
                THANK YOU
                <br />
                <span>FOR SCROLLING</span>
              </span>
            </div>
            <Barcode />
            <p className="receipt-signoff">
              ISABELLA NGUYEN — {new Date().getFullYear()}
              <br />
              MADE WITH CARE IN TORONTO.
            </p>
          </section>
        </div>
      </main>
      <Printer />
    </div>
  );
}
