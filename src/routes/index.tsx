import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Children, lazy, Suspense, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Award, BookOpen, Check, ChevronDown, Code2, Copy, Github, GraduationCap, Linkedin, Mail, MapPin, Menu, Rocket, Send, ShieldCheck, Sparkles, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import mountainCity from "@/assets/reference-city.jpg";
import waterfallHall from "@/assets/reference-waterfall.jpg";
import industrialGallery from "@/assets/reference-industrial.jpg";
import riverTemple from "@/assets/reference-sunset.jpg";
import portrait from "@/assets/kamal-portrait.png.asset.json";

const PortfolioScene = lazy(() => import("@/components/portfolio-scene"));
const linkedIn = "https://www.linkedin.com/in/kamal-solanki-612ba5369";
const github = "https://github.com/kamalsolanki143";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kamal Solanki — AI, Data Science & Full-Stack Portfolio" },
      { name: "description", content: "The cinematic 3D portfolio of Kamal Solanki, an IIT Madras Data Science student, AI builder and open-source contributor." },
      { property: "og:title", content: "Kamal Solanki — AI, Data Science & Full-Stack Portfolio" },
      { property: "og:description", content: "Explore Kamal Solanki’s projects, skills, academic journey, leadership and verified digital identities." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

type Project = { title: string; category: "Hackathon" | "Personal Project" | "Academic"; status: string; summary: string; bullets: string[]; tech: string[]; repo: string };
const projects: Project[] = [
  { title: "sentinel-ai-datathon-2026", category: "Hackathon", status: "Prototype", summary: "Threat detection and anomaly analytics prototype developed for Datathon 2026.", bullets: ["Datathon log sample ingestion", "Machine-learning anomaly classifier", "Telemetry risk dashboard"], tech: ["Python", "Machine Learning", "FastAPI", "Data Science"], repo: `${github}/sentinel-ai-datathon-2026` },
  { title: "VitalFlow-AI", category: "Hackathon", status: "Prototype", summary: "Predictive health indicator analytics portal evaluating physiological metrics and risk factors.", bullets: ["Multi-variable health intake", "Python model pipeline", "Probability risk breakdown"], tech: ["Python", "Data Science", "Machine Learning"], repo: `${github}/VitalFlow-AI` },
  { title: "TalentOS-AI-BuildX26", category: "Hackathon", status: "Prototype", summary: "AI-powered talent assessment and recruitment workspace built for BuildX26.", bullets: ["Automated technical evaluation", "FastAPI service endpoints", "Candidate scoring dashboard"], tech: ["Python", "FastAPI", "Next.js", "React"], repo: `${github}/TalentOS-AI-BuildX26` },
  { title: "PranaMap-AI", category: "Hackathon", status: "In Development", summary: "Environmental and air-quality intelligence mapping system powered by AI models.", bullets: ["Air-quality AQI visualization", "Predictive environmental pipeline", "Geospatial map interface"], tech: ["Python", "AI", "Data Science", "React"], repo: `${github}/PranaMap-AI` },
  { title: "Quoteflow-AI", category: "Hackathon", status: "In Development", summary: "Intelligent quotation automation and document workflow platform.", bullets: ["Automated pricing estimation", "PDF document generation", "Clean workflow dashboard"], tech: ["Python", "FastAPI", "Next.js", "React"], repo: `${github}/Quoteflow-AI` },
  { title: "RoadRakshak-AI", category: "Hackathon", status: "Prototype", summary: "AI-assisted road safety analytics system predicting hazard risk levels.", bullets: ["Hazard risk prediction", "Road anomaly telemetry", "Real-time safety alerts"], tech: ["Python", "AI", "Machine Learning"], repo: `${github}/RoadRakshak-AI` },
  { title: "redrob-ai-ranking-engine", category: "Hackathon", status: "Completed", summary: "AI-driven candidate ranking engine prioritizing technical skill profiles.", bullets: ["Quantitative match scoring", "Skill matrix extraction", "Transparent ranking output"], tech: ["Python", "AI", "Data Science", "Algorithm"], repo: `${github}/redrob-ai-ranking-engine` },
  { title: "Compasscrew-v2v", category: "Hackathon", status: "Completed", summary: "Collaborative navigation and vehicle-to-vehicle spatial coordination system.", bullets: ["Spatial coordinate tracking", "Vehicle fleet dashboard", "Responsive interactive UI"], tech: ["Python", "React", "Next.js"], repo: `${github}/Compasscrew-v2v` },
  { title: "rule-based-ai-chatbot", category: "Personal Project", status: "Completed", summary: "Rule-based artificial intelligence chatbot processing structured queries.", bullets: ["Intent pattern matching", "Deterministic rule lookup", "Fast response generation"], tech: ["Python", "AI", "NLP"], repo: `${github}/rule-based-ai-chatbot` },
  { title: "iris-classification-ai", category: "Academic", status: "Completed", summary: "Supervised machine-learning benchmark predicting iris flower species.", bullets: ["Multi-class classification", "Confusion matrix generation", "Model accuracy evaluation"], tech: ["Python", "Scikit-learn", "Pandas", "Data Science"], repo: `${github}/iris-classification-ai` },
];

const recognition = [
  { icon: GraduationCap, type: "Academic", year: "2026 — Present", title: "IIT Madras Foundation Progress", text: "Pursuing the Foundation Level of the BS in Data Science & Applications with Statistics, Mathematics and Computational Thinking." },
  { icon: Sparkles, type: "Ambassador", year: "2026", title: "Google Student Ambassador", text: "Supporting student engagement and AI learning initiatives through the Gemini program." },
  { icon: Rocket, type: "Leadership", year: "2026", title: "Campus Ambassador — E-Cell IIT Bombay", text: "Promoting entrepreneurship, innovation and startup initiatives." },
  { icon: Code2, type: "Open Source", year: "2026", title: "GirlScript Summer of Code Contributor", text: "Contributing through pull requests and collaborative development during GSSoC 2026." },
  { icon: Users, type: "Founder", year: "2026 — Present", title: "Founder — Compass Crew", text: "Leading a student community focused on AI, hackathons, technology, startups and developer growth." },
  { icon: Award, type: "Community", year: "2026", title: "Global Campus Ambassador — Swytchcode", text: "Supporting developer engagement and community initiatives as a Global Campus Ambassador." },
];

const nav = ["About", "Projects", "Skills", "Journey", "Recognition", "Identity", "Contact"];
function goTo(id: string) { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); }

const fireflies = Array.from({ length: 14 }, (_, i) => ({ left: `${(i * 37) % 100}%`, top: `${20 + ((i * 53) % 70)}%`, delay: `${-(i * 0.9)}s`, dur: `${7 + (i % 5)}s` }));

function Scene({ id, image, number, children, aside, align = "left", className = "" }: { id: string; image: string; number: string; children: React.ReactNode; aside?: React.ReactNode; align?: "left" | "right" | "center"; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.18, 1.02, 1.14]);
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);
  const blur = useTransform(scrollYProgress, [0, 0.22, 0.8, 1], reduced ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"] : ["blur(8px)", "blur(0px)", "blur(0px)", "blur(6px)"]);
  const px = useMotionValue(0), py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 }), sy = useSpring(py, { stiffness: 60, damping: 18 });
  const farX = useTransform(sx, (v) => v * -14), farY = useTransform(sy, (v) => v * -10);
  const nearX = useTransform(sx, (v) => v * 28), nearY = useTransform(sy, (v) => v * 16);
  const tiltY = useTransform(sx, (v) => v * 2.2), tiltX = useTransform(sy, (v) => v * -1.6);
  const onMove = (e: React.PointerEvent) => { if (reduced || e.pointerType !== "mouse") return; const r = e.currentTarget.getBoundingClientRect(); px.set((e.clientX - r.left) / r.width - 0.5); py.set((e.clientY - r.top) / r.height - 0.5); };
  return <section ref={ref} id={id} className={`cinematic-scene scene-${align} ${className}`}>
    <motion.div className="presentation-frame" onPointerMove={onMove} onPointerLeave={() => { px.set(0); py.set(0); }} style={{ rotateX: tiltX, rotateY: tiltY, filter: blur }} initial={{ opacity: 0, scale: 0.9, rotateX: 6 }} whileInView={{ opacity: 1, scale: 1, rotateX: 0 }} viewport={{ amount: 0.14 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
      <div className="frame-topline"><span className="frame-mark">▲</span><span>{number} / 07</span></div>
      <div className="scene-visual">
        <motion.div className="scene-layer" style={{ x: farX, y: farY }}>
          <motion.img src={image} alt="" width={1536} height={1024} loading={id === "home" ? "eager" : "lazy"} className="scene-image kenburns" style={{ scale, y }} />
        </motion.div>
        <div className="light-rays" /><div className="water-shimmer" />
        <motion.div className="scene-layer near-layer" style={{ x: nearX, y: nearY }}>
          <img src={image} alt="" className="scene-image near-image" loading="lazy" />
        </motion.div>
        <div className="scene-depth-layer" /><div className="scene-shade" /><div className="mist mist-a" /><div className="mist mist-b" />
        <div className="fireflies" aria-hidden>{fireflies.map((f, i) => <i key={i} style={{ left: f.left, top: f.top, animationDelay: f.delay, animationDuration: f.dur }} />)}</div>
        <div className="film-grain" />
      </div>
      <motion.div className="scene-content" initial="hidden" whileInView="show" viewport={{ amount: 0.15, once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}>
        {Children.map(children, (child) => <motion.div className="stagger-item" variants={{ hidden: { opacity: 0, y: 28, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}>{child}</motion.div>)}
      </motion.div>
      {aside}
      <div className="scene-index"><span>{number}</span><i /></div>
    </motion.div>
  </section>;
}

function GlowTitle() {
  const reduced = useReducedMotion();
  const word = (text: string, offset: number, cls?: string) => <span className={cls}>{text.split("").map((c, i) => <motion.span key={i} className="glow-letter" initial={reduced ? false : { opacity: 0, y: 40, rotateX: -90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.35 + (offset + i) * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{c}</motion.span>)}</span>;
  return <h1 className="glow-title" aria-label="Kamal Solanki"><span className="title-bloom" aria-hidden />{word("KAMAL", 0)}<br />{word("SOLANKI", 5, "outline-word")}</h1>;
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(projects[0]?.title ?? null);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll();
  const filtered = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  return <main className="world-shell">
    <motion.div className="scroll-line" style={{ scaleX: scrollYProgress }} />
    <div className="world-canvas" aria-hidden="true"><ClientOnly fallback={null}><Suspense fallback={null}><PortfolioScene /></Suspense></ClientOnly></div>
    <header className="minimal-nav">
      <Button variant="ghost" className="wordmark" onClick={() => goTo("home")}>Kamal Solanki</Button><span className="nav-sigil">◇</span>
      <nav className={menuOpen ? "nav-menu open" : "nav-menu"} aria-label="Primary navigation">{nav.map((item) => <Button variant="ghost" key={item} onClick={() => { goTo(item); setMenuOpen(false); }}>{item}</Button>)}</nav>
      <Button variant="outline" size="sm" className="contact-jump" onClick={() => goTo("contact")}>Contact</Button>
      <Button variant="ghost" size="icon" className="nav-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</Button>
    </header>

    <Scene id="home" image={mountainCity} number="00" align="left" className="opening-scene hero-with-portrait" aside={
      <motion.div className="hero-portrait" initial={{ opacity: 0, x: 80, rotateY: -25, scale: 0.9 }} animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }} transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div className="hero-portrait-inner" animate={{ y: [0, -16, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <span className="hero-halo" aria-hidden /><span className="portrait-ring" aria-hidden />
          <img src={portrait.url} alt="Kamal Solanki" />
          <span className="hero-chip chip-a">AI · ML</span><span className="hero-chip chip-b">IIT Madras</span><span className="hero-chip chip-c">Full-Stack</span>
        </motion.div>
      </motion.div>
    }>
      <p className="chapter-label">IIT Madras · AI · Data science · Full-stack</p>
      <GlowTitle />
      <p className="opening-copy">BS Data Science student crafting intelligent systems,<br />immersive products and open-source experiments.</p>
      <div className="hero-actions"><Button className="discover-button" onClick={() => goTo("about")}>Enter the world <ArrowDown /></Button><Button variant="outline" className="discover-button" onClick={() => goTo("projects")}>Explore work</Button></div>
      <button type="button" className="scroll-cue" onClick={() => goTo("about")} aria-label="Scroll to about"><span /><em>Scroll</em></button>
    </Scene>

    <Scene id="about" image={waterfallHall} number="01" align="left" className="about-world">
      <motion.figure className="portrait-card" initial={{ opacity: 0, y: 60, rotateY: -18 }} whileInView={{ opacity: 1, y: 0, rotateY: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div className="portrait-float" animate={{ y: [0, -14, 0], rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <span className="portrait-ring" aria-hidden />
          <img src={portrait.url} alt="Kamal Solanki portrait" loading="lazy" />
          <figcaption><Sparkles /> Kamal Solanki · IIT Madras</figcaption>
        </motion.div>
      </motion.figure>
      <p className="chapter-label">Who is Kamal?</p><h2>Ideas flow.<br /><em>I build.</em></h2>
      <p className="scene-copy">I’m a Foundation Level student in IIT Madras’ BS in Data Science & Applications, bridging quantitative thinking with AI and full-stack engineering to solve real-world problems.</p>
      <div className="profile-grid">
        <article><BookOpen /><b>Academic focus</b><p>Statistics 1 · Mathematics 1 · Computational Thinking · English 1</p></article>
        <article><Rocket /><b>Mission</b><p>Build accessible, reliable, data-driven software through hands-on learning.</p></article>
        <article><MapPin /><b>Based in</b><p>Rajasthan, India · Open to ambitious collaborations worldwide.</p></article>
      </div>
    </Scene>

    <Scene id="projects" image={industrialGallery} number="02" align="right" className="projects-world long-scene">
      <p className="chapter-label">GitHub open-source showcase</p><h2>Machines with<br /><em>a purpose.</em></h2>
      <div className="filter-row">{["All", "Hackathon", "Personal Project", "Academic"].map((item) => <Button key={item} size="sm" variant={filter === item ? "default" : "outline"} onClick={() => setFilter(item)}>{item}</Button>)}</div>
      <motion.div layout className="project-list">
        <AnimatePresence mode="popLayout">{filtered.map((project, index) => {
          const open = expanded === project.title;
          return <motion.article layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} key={project.title} className={open ? "project-entry open" : "project-entry"}>
            <button type="button" onClick={() => setExpanded(open ? null : project.title)} aria-expanded={open}><small>{String(index + 1).padStart(2, "0")}</small><span><b>{project.title}</b><em>{project.category} · {project.status}</em></span><ChevronDown /></button>
            <AnimatePresence>{open && <motion.div className="project-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              <p>{project.summary}</p><ul>{project.bullets.map((bullet) => <li key={bullet}><Check />{bullet}</li>)}</ul><div className="tech-row">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
              <a href={project.repo} target="_blank" rel="noreferrer">View repository <ArrowUpRight /></a>
            </motion.div>}</AnimatePresence>
          </motion.article>;
        })}</AnimatePresence>
      </motion.div>
    </Scene>

    <Scene id="skills" image={riverTemple} number="03" align="left" className="skills-world">
      <p className="chapter-label">Technical skills & learning stack</p><h2>Crafted across<br /><em>disciplines.</em></h2>
      <div className="skill-streams">
        <div><span>Programming</span><p>Python</p></div><div><span>AI & Data</span><p>Artificial Intelligence · Data Science · Machine Learning · Statistics · Pandas · Scikit-learn · NLP · AI/LLMs</p></div>
        <div><span>Development</span><p>FastAPI · Next.js · React · TypeScript · Tailwind CSS</p></div><div><span>Tools</span><p>Git · GitHub · VS Code · Vercel · Jupyter</p></div>
      </div>
    </Scene>

    <Scene id="journey" image={waterfallHall} number="04" align="right" className="journey-world">
      <p className="chapter-label">Education & learning journey</p><h2>A path still<br /><em>unfolding.</em></h2>
      <div className="journey-line">
        <div><time>2026 — Present</time><span><b>BS Data Science & Applications · IIT Madras</b>Foundation Level · Statistics, Mathematics and Computational Thinking</span></div>
        <div><time>2026 — Present</time><span><b>Personal Projects & Hackathons</b>Building Python, FastAPI, React and AI applications through continuous practice.</span></div>
        <div><time>Next</time><span><b>Applied Data Science</b>Machine learning, databases and production-ready intelligent systems.</span></div>
      </div>
      <div className="quiet-tags"><span>#Statistics1</span><span>#Mathematics1</span><span>#ComputationalThinking</span><span>#English1</span><span>#Python</span></div>
    </Scene>

    <Scene id="recognition" image={industrialGallery} number="05" align="center" className="recognition-world long-scene">
      <p className="chapter-label">Leadership · Community · Recognition</p><h2>Impact beyond<br /><em>the code.</em></h2>
      <div className="recognition-grid">{recognition.map(({ icon: Icon, ...item }, index) => <motion.article key={item.title} initial={{ opacity: 0, rotateX: -12, y: 22 }} whileInView={{ opacity: 1, rotateX: 0, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}><Icon /><div><small>{item.type} · {item.year}</small><b>{item.title}</b><p>{item.text}</p></div></motion.article>)}</div>
    </Scene>

    <Scene id="identity" image={riverTemple} number="06" align="left" className="identity-world">
      <p className="chapter-label">Verified digital passports</p><h2>Identity,<br /><em>verified.</em></h2>
      <div className="identity-stack">
        <a href="https://study.iitm.ac.in/ds/" target="_blank" rel="noreferrer"><GraduationCap /><span><small>IIT Madras · Active Student</small><b>BS in Data Science</b><em>ID 26F2001172</em></span><ShieldCheck /></a>
        <a href={github} target="_blank" rel="noreferrer"><Github /><span><small>GitHub Developer</small><b>@kamalsolanki143</b><em>Python · TypeScript · AI · Open Source</em></span><ArrowUpRight /></a>
        <a href={linkedIn} target="_blank" rel="noreferrer"><Linkedin /><span><small>LinkedIn Professional</small><b>Kamal Solanki</b><em>Founder · Ambassador · Community Builder</em></span><ArrowUpRight /></a>
      </div>
    </Scene>

    <Scene id="contact" image={mountainCity} number="07" align="center" className="contact-world">
      <p className="chapter-label">Direct connection</p><h2>Let’s build<br /><em>something amazing.</em></h2>
      <p className="contact-intro">Open to internships, AI projects, hackathons, startups and open-source collaborations.</p>
      <div className="interest-row"><span>Internships</span><span>AI Projects</span><span>Hackathons</span><span>Startups</span></div>
      <form className="cinematic-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const name = String(data.get("name") ?? ""); const email = String(data.get("email") ?? ""); const message = String(data.get("message") ?? ""); setSent(true); window.location.href = `mailto:solankikamal55143@gmail.com?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)}`; }}>
        <div><input required name="name" aria-label="Name" placeholder="Your name" /><input required type="email" name="email" aria-label="Email" placeholder="Email address" /></div><textarea required name="message" aria-label="Message" placeholder="Tell me about your idea" rows={2} /><Button type="submit">{sent ? "Message ready" : "Send message"}<Send /></Button>
      </form>
      <div className="contact-direct"><Button variant="outline" onClick={async () => { await navigator.clipboard.writeText("solankikamal55143@gmail.com"); setCopied(true); }}>{copied ? <Check /> : <Copy />}{copied ? "Email copied" : "Copy email"}</Button><a href={github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href={linkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a><a href="mailto:solankikamal55143@gmail.com" aria-label="Email"><Mail /></a></div>
    </Scene>
    <footer><span>Kamal Solanki · 2026</span><span>Rajasthan, India · Built with curiosity</span></footer>
  </main>;
}