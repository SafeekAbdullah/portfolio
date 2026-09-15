import {
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  Database,
  Github,
  Globe2,
  Linkedin,
  Mail,
  Menu,
  Palette,
  Phone,
  Send,
  X,
} from "lucide-react";

import { projects } from "../data/projects";
import { skills } from "../data/skills";
import { saveContactMessage } from "../services/firebaseService";
import HeroScene from "../components3d/HeroScene";

const profileImage = "/profile.jpg";

const navItems = [
  "about",
  "skills",
  "projects",
  "education",
  "services",
  "contact",
];

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  category?: string;
  accent?: string;
  features?: string[];
  solution?: string;
};

function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-3d">
        <HeroScene />
      </div>

      <div className="grid-floor" />

      <div className="scene-label">ORBIT / 01</div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>

      {copy && <p>{copy}</p>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [selected, setSelected] = useState<Project | null>(null);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  /*
   * Loading screen
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  /*
   * Navigation active section
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
      }
    );

    navItems.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  /*
   * Prevent background scrolling when modal is open
   */
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  /*
   * Contact form
   */
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.includes("@") ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      await saveContactMessage(form);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setStatus("success");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  /*
   * Convert current project data into safe display data.
   *
   * Your projects.ts does not currently contain:
   * category, accent, features or solution.
   * So we provide defaults here instead of causing errors.
   */
  const safeProjects: Project[] = (projects as Project[]).map((project) => ({
    ...project,

    category:
      project.category ||
      (project.title.toLowerCase().includes("e-commerce")
        ? "WEB APPLICATION"
        : project.title.toLowerCase().includes("student")
        ? "MANAGEMENT SYSTEM"
        : project.title.toLowerCase().includes("real estate")
        ? "WEBSITE"
        : "PROJECT"),

    accent: project.accent || "var(--accent)",

    features:
      project.features ||
      [
        "Responsive user interface",
        "Functional application workflow",
        "Database integration",
      ],

    solution:
      project.solution ||
      "Designed and developed as a practical application using the technologies listed below.",
  }));

  return (
    <>
      {/* LOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loader-mark">SA</div>

            <div className="loader-name">
              SAFEek <span>ABDULLAH</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVIGATION */}
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#home">
            <span>SA</span>
            <small>SAFEek / PORTFOLIO</small>
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {navItems.map((item) => (
              <a
                key={item}
                className={active === item ? "active" : ""}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>

          <a className="nav-cta" href="#contact">
            Let's talk <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero section-shell">
          <Scene />

          <div className="container hero-layout">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
            >
              <div className="availability">
                <span />
                AVAILABLE FOR OPPORTUNITIES
              </div>

              <p className="hero-kicker">Hi, I'm</p>

              <h1>
                Safeek
                <br />
                <em>Abdullah</em>
              </h1>

              <p className="hero-role">
                Web Developer <span>—</span> HNDIT Undergraduate
              </p>

              <p className="hero-intro">
                I build modern, responsive and user-focused web applications
                with clean design, practical functionality and scalable
                solutions.
              </p>

              <div className="hero-actions">
                <a href="#projects" className="button button-primary">
                  View my work <ArrowUpRight size={16} />
                </a>

                <a href="#contact" className="button button-ghost">
                  Contact me
                </a>
              </div>
            </motion.div>

            <motion.div
              className="profile-stage"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85, duration: 0.8 }}
            >
              <div className="profile-halo" />

              <div className="profile-frame">
                <img
                  src={profileImage}
                  alt="Safeek Abdullah - Web Developer"
                />

                <div className="profile-caption">
                  <span>01 / PROFILE</span>

                  <strong>
                    Build with
                    <br />
                    purpose.
                  </strong>
                </div>
              </div>

              <div className="float-tag tag-top">
                CODE <span>↗</span>
              </div>

              <div className="float-tag tag-bottom">
                WEB
                <br />
                <span>DEVELOPER</span>
              </div>
            </motion.div>
          </div>

          <a href="#about" className="scroll-cue">
            <span>Scroll to explore</span>
            <ChevronDown size={15} />
          </a>
        </section>

        {/* ABOUT */}
        <section id="about" className="section section-dark">
          <div className="container about-grid">
            <div>
              <SectionHeading
                eyebrow="01 / ABOUT"
                title={
                  <>
                    A developer with a
                    <br />
                    <i>practical edge.</i>
                  </>
                }
              />
            </div>

            <div className="about-copy">
              <p className="lead">
                I am an HNDIT undergraduate with a strong interest in web
                development and software development. I enjoy creating modern,
                functional and user-friendly applications while continuously
                improving my technical and problem-solving skills.
              </p>

              <div className="interest-list">
                {[
                  "Web Development",
                  "Software Development",
                  "UI / UX",
                  "Database Management",
                  "Problem Solving",
                  "Modern Web Technologies",
                ].map((item, i) => (
                  <div key={item}>
                    <span>0{i + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section section-ink">
          <div className="container">
            <SectionHeading
              eyebrow="02 / TOOLKIT"
              title={
                <>
                  Tools for turning
                  <br />
                  <i>ideas into interfaces.</i>
                </>
              }
              copy="A growing set of technologies I use to shape useful digital experiences."
            />

            <div className="skill-grid">
              {skills.map((group, i) => (
                <motion.div
                  className="skill-card"
                  key={group.group}
                  whileHover={{ y: -7 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="card-index">0{i + 1}</span>

                  <h3>{group.group}</h3>

                  <div className="skill-pills">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section section-dark">
          <div className="container">
            <div className="project-header">
              <SectionHeading
                eyebrow="03 / SELECTED WORK"
                title={
                  <>
                    Built to be
                    <br />
                    <i>useful.</i>
                  </>
                }
              />

              <span className="project-count">
                {String(safeProjects.length).padStart(2, "0")} /{" "}
                {String(safeProjects.length).padStart(2, "0")}
              </span>
            </div>

            <div className="project-list">
              {safeProjects.map((project, i) => (
                <motion.article
                  className="project-row"
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    delay: i * 0.08,
                  }}
                >
                  <div
                    className="project-visual"
                    style={
                      {
                        "--accent": project.accent,
                      } as React.CSSProperties
                    }
                  >
                    <div className="visual-grid" />

                    <div className="visual-window">
                      <span />
                      <span />
                      <span />

                      <div className="visual-lines">
                        <b />
                        <b />
                        <b />
                        <b />
                      </div>
                    </div>

                    <strong>0{project.id}</strong>
                  </div>

                  <div className="project-info">
                    <span className="eyebrow">
                      {project.category}
                    </span>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>


                    <a href={project.live}
                    target="_blank"
                        rel="noreferrer"
                        className="button button-primary ">
                        <button
                      className="text-button"
                      onClick={() => setSelected(project)}
                    >
                      Live Website<ArrowUpRight size={16} />
                    </button>
                    </a>

                    <a href={project.github}
                    target="_blank"
                        rel="noreferrer"
                        className="button button-ghost">
                        <button
                      className="text-button"
                      onClick={() => setSelected(project)}
                    >
                      Github <ArrowUpRight size={16} />
                    </button>
                    </a>
                    
                    

                    <div className="tech-line">
                      {project.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>

                    <button
                      className="text-button"
                      onClick={() => setSelected(project)}
                    >
                      View details <ArrowUpRight size={16} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="section section-ink">
          <div className="container education-grid">
            <SectionHeading
              eyebrow="04 / EDUCATION"
              title={
                <>
                  Learning by
                  <br />
                  <i>building.</i>
                </>
              }
            />

            <div className="education-card">
              <span className="timeline-dot" />

              <span className="eyebrow">CURRENTLY</span>

              <h3>
                Higher National Diploma
                <br />
                in Information Technology
              </h3>

              <p>HNDIT Undergraduate</p>

              <div className="education-line" />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section section-dark">
          <div className="container">
            <SectionHeading
              eyebrow="05 / WHAT I DO"
              title={
                <>
                  From first idea
                  <br />
                  <i>to final interface.</i>
                </>
              }
            />

            <div className="service-grid">
              {[
                {
                  icon: <Globe2 />,
                  title: "Web Development",
                  text: "Building responsive and modern websites.",
                },
                {
                  icon: <Code2 />,
                  title: "Full-Stack Development",
                  text: "Creating complete web applications with frontend, backend and database integration.",
                },
                {
                  icon: <Database />,
                  title: "Database Management",
                  text: "Designing and managing structured databases for applications.",
                },
                {
                  icon: <Palette />,
                  title: "UI / UX",
                  text: "Creating clean and user-friendly interfaces.",
                },
              ].map((service, i) => (
                <motion.div
                  className="service-card"
                  key={service.title}
                  whileHover={{ y: -6 }}
                >
                  <span className="service-icon">
                    {service.icon}
                  </span>

                  <span className="card-index">0{i + 1}</span>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div>
              <SectionHeading
                eyebrow="06 / CONTACT"
                title={
                  <>
                    Let's work
                    <br />
                    <i>together.</i>
                  </>
                }
                copy="Have a project, opportunity or idea? Feel free to get in touch."
              />

              <div className="contact-links">
                <a href="mailto:safeekabdullah11@gmail.com">
                  <Mail size={17} />
                  safeekabdullah11@gmail.com
                </a>

                <a href="tel:0789633153">
                  <Phone size={17} />
                  0789633153
                </a>

                <a
                  href="https://github.com/SafeekAbdullah"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} />
                  github.com/SafeekAbdullah
                </a>

                <a
                  href="https://www.linkedin.com/in/Safeek-Abdullah-733b55426/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={17} />
                  LinkedIn / Safeek Abdullah
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={submit}>
              <label>
                Name

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Your name"
                />
              </label>

              <label>
                Email

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Subject

                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subject: e.target.value,
                    })
                  }
                  placeholder="What can I help with?"
                />
              </label>

              <label>
                Message

                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  placeholder="Tell me a little about your idea..."
                />
              </label>

              <button
                className="button button-primary"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  "Sending..."
                ) : (
                  <>
                    Send message <Send size={16} />
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="form-message success">
                  Thank you! Your message has been sent successfully.
                </p>
              )}

              {status === "error" && (
                <p className="form-message error">
                  Please complete all fields with a valid email address.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <a className="brand" href="#home">
              <span>SA</span>
              <small>SAFEek / PORTFOLIO</small>
            </a>

            <p>Web Developer · HNDIT Undergraduate</p>
          </div>

          <div className="footer-social">
            <a
              href="https://github.com/SafeekAbdullah"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>

            <a
              href="https://www.linkedin.com/in/Safeek-Abdullah-733b55426/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>

            <a
              href="mailto:safeekabdullah11@gmail.com"
              aria-label="Email"
            >
              <Mail size={17} />
            </a>
          </div>

          <a className="back-top" href="#home">
            Back to top ↑
          </a>
        </div>

        <div className="container copyright">
          © 2026 Safeek Abdullah. All Rights Reserved.
        </div>
      </footer>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="project-modal"
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 18,
                scale: 0.97,
              }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.title} project details`}
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close project details"
              >
                <X />
              </button>

              <span className="eyebrow">
                0{selected.id} / {selected.category}
              </span>

              <h2>{selected.title}</h2>

              <p className="modal-overview">
                {selected.description}
              </p>

              <div className="modal-columns">
                <div>
                  <h4>Features</h4>

                  {(selected.features || []).map((feature) => (
                    <p key={feature}>↗ {feature}</p>
                  ))}
                </div>

                <div>
                  <h4>Approach</h4>

                  <p>
                    {selected.solution ||
                      "Developed as a practical project using the technologies listed below."}
                  </p>

                  <h4>Stack</h4>

                  <div className="tech-line">
                    {selected.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>
              </div>

              {(selected.github && selected.github !== "#") ||
              (selected.live && selected.live !== "#") ? (
                <div className="modal-links">
                  {selected.github &&
                    selected.github !== "#" && (
                      <a
                        href={selected.github}
                        target="_blank"
                        rel="noreferrer"
                        className="button button-ghost"
                      >
                        GitHub <Github size={16} />
                      </a>
                    )}

                  {selected.live &&
                    selected.live !== "#" && (
                      <a
                        href={selected.live}
                        target="_blank"
                        rel="noreferrer"
                        className="button button-primary"
                      >
                        Live website <ArrowUpRight size={16} />
                      </a>
                    )}
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

