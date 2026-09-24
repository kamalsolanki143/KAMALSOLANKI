import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { lazy, Suspense, useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PortfolioScene = lazy(() => import("@/components/portfolio-scene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kamal Solanki — Data Science & Full-Stack Developer" },
      { name: "description", content: "Portfolio of Kamal Solanki, an IIT Madras Data Science student building AI, statistics, and full-stack projects." },
      { property: "og:title", content: "Kamal Solanki — Data Science & Full-Stack Developer" },
      { property: "og:description", content: "Explore Kamal Solanki’s AI, data science, statistics, and full-stack projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const nav = ["About", "Projects", "Skills", "Journey", "Contact"];

const projects = [
  { n: "01", title: "Sentinel AI", type: "SECURITY / ML", description: "Threat detection and anomaly analytics for network telemetry, built at Datathon 2026.", tech: ["Python", "FastAPI", "ML"], href: "https://github.com/kamalsolanki143/sentinel-ai-datathon-2026", color: "project-violet" },
  { n: "02", title: "VitalFlow AI", type: "HEALTH / ANALYTICS", description: "Predictive health indicator analytics with multivariate risk insights and model-driven metrics.", tech: ["Python", "Data Science", "ML"], href: "https://github.com/kamalsolanki143/VitalFlow-AI", color: "project-amber" },
  { n: "03", title: "TalentOS AI", type: "TALENT / AUTOMATION", description: "An intelligent candidate assessment workspace engineered for the BuildX26 hackathon.", tech: ["FastAPI", "Next.js", "React"], href: "https://github.com/kamalsolanki143/TalentOS-AI-BuildX26", color: "project-blue" },
  { n: "04", title: "PranaMap AI", type: "CLIMATE / GEO", description: "Environmental intelligence mapping regional air quality and predictive pollution indices.", tech: ["Python", "AI", "React"], href: "https://github.com/kamalsolanki143/PranaMap-AI", color: "project-rose" },
];

const skillGroups = [
  { title: "Build", skills: ["Python", "React", "Next.js", "FastAPI"] },
  { title: "Analyze", skills: ["Data Science", "Statistics", "Machine Learning", "Pandas"] },
  { title: "Ship", skills: ["Git & GitHub", "Vercel", "VS Code", "Jupyter"] },
];

function scrollTo(id: string) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-3px)`;
  };
  return <div ref={ref} onMouseMove={handleMove} onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }} className={`glass-panel tilt-card ${className}`}>{children}</div>;
}

function SectionTitle({ index, eyebrow, title, accent }: { index: string; eyebrow: string; title: string; accent: string }) {
  return <div className="section-heading"><div className="section-kicker"><span>{index}</span>{eyebrow}</div><h2>{title}<br /><em>{accent}</em></h2></div>;
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const update = () => setScroll((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <main className="portfolio-shell">
      <div className="scroll-progress" style={{ transform: `scaleX(${scroll / 100})` }} />
      <header className="site-nav">
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Go to top"><span>KS</span><b>Kamal Solanki</b></button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          {nav.map((item) => <button key={item} onClick={() => { scrollTo(item); setMenuOpen(false); }}>{item}</button>)}
        </nav>
        <div className="nav-actions">
          <a href="mailto:solankikamal55143@gmail.com" className="availability"><i /> Available</a>
          <Button variant="ghost" size="icon" className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="scene-wrap" aria-hidden="true">
          <ClientOnly fallback={<div className="scene-fallback" />}><Suspense fallback={<div className="scene-fallback" />}><PortfolioScene /></Suspense></ClientOnly>
        </div>
        <div className="hero-grid" aria-hidden="true" />
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="eyebrow"><Sparkles /> IIT Madras · Data Science</p>
          <h1><span>KAMAL</span><strong>SOLANKI</strong></h1>
          <p className="hero-sub">I turn <b>data into direction</b> and ideas into<br className="desktop-break" /> intelligent digital experiences.</p>
          <div className="hero-actions">
            <Button size="lg" onClick={() => scrollTo("projects")}>Explore my work <ArrowDown /></Button>
            <Button size="lg" variant="outline" asChild><a href="https://github.com/kamalsolanki143" target="_blank" rel="noreferrer"><Github /> GitHub</a></Button>
          </div>
        </motion.div>
        <div className="hero-meta"><span>Rajasthan, India</span><span>Scroll to explore</span><span>© 2026</span></div>
      </section>

      <section id="about" className="section-wrap about-section">
        <SectionTitle index="01" eyebrow="The person behind the pixels" title="CURIOUS BY NATURE." accent="BUILDER BY CHOICE." />
        <div className="about-grid">
          <TiltCard className="about-identity">
            <div className="monogram">KS<div className="monogram-ring" /></div>
            <div><p className="micro-label">CURRENTLY</p><h3>Foundation Level Student</h3><p>BS in Data Science & Applications<br />Indian Institute of Technology Madras</p></div>
          </TiltCard>
          <TiltCard className="about-story">
            <Tabs defaultValue="story">
              <TabsList className="tabs-list"><TabsTrigger value="story">Story</TabsTrigger><TabsTrigger value="focus">Focus</TabsTrigger><TabsTrigger value="now">Now</TabsTrigger></TabsList>
              <TabsContent value="story"><p className="big-copy">I’m Kamal — a student who believes the best way to understand a concept is to <mark>build something real with it.</mark></p><p>From probability and computational thinking to AI-powered products, I’m creating at the intersection of rigorous analysis and expressive interfaces.</p></TabsContent>
              <TabsContent value="focus"><p className="big-copy">Bridging <mark>statistics, software engineering, and practical AI.</mark></p><p>I care about clear models, thoughtful products, and learning in public through hands-on projects.</p></TabsContent>
              <TabsContent value="now"><p className="big-copy">Currently studying at <mark>IIT Madras</mark> and shipping ambitious prototypes.</p><p>Open to internships, hackathons, open-source collaborations, and technical conversations.</p></TabsContent>
            </Tabs>
            <div className="interest-row">{["AI Systems", "Statistics", "Full-Stack", "Hackathons"].map((x) => <span key={x}>{x}</span>)}</div>
          </TiltCard>
        </div>
      </section>

      <section id="projects" className="section-wrap projects-section">
        <SectionTitle index="02" eyebrow="Selected experiments" title="FEATURED" accent="PROJECTS." />
        <div className="projects-grid">
          {projects.map((project) => <motion.a key={project.title} href={project.href} target="_blank" rel="noreferrer" className={`project-card ${project.color}`} whileHover={{ y: -8 }}>
            <div className="project-visual"><span className="project-number">{project.n}</span><div className="data-orbit"><i /><i /><i /></div><ArrowUpRight className="project-arrow" /></div>
            <div className="project-info"><span>{project.type}</span><h3>{project.title}</h3><p>{project.description}</p><div>{project.tech.map((t) => <b key={t}>{t}</b>)}</div></div>
          </motion.a>)}
        </div>
        <a className="text-link" href="https://github.com/kamalsolanki143?tab=repositories" target="_blank" rel="noreferrer">View all repositories <ArrowUpRight /></a>
      </section>

      <section id="skills" className="section-wrap skills-section">
        <SectionTitle index="03" eyebrow="Tools of the trade" title="SKILL" accent="CONSTELLATION." />
        <div className="skills-layout">
          <div className="skills-copy"><p>Learning broadly. Building deliberately.</p><h3>Technology becomes meaningful when it solves a human problem.</h3></div>
          <div className="skill-groups">{skillGroups.map((group, i) => <TiltCard key={group.title} className="skill-card"><span>0{i + 1}</span><h3>{group.title}</h3><div>{group.skills.map((skill) => <b key={skill}>{skill}</b>)}</div></TiltCard>)}</div>
        </div>
      </section>

      <section id="journey" className="section-wrap journey-section">
        <SectionTitle index="04" eyebrow="Academic trajectory" title="THE ROAD" accent="AHEAD." />
        <div className="timeline">
          <article className="timeline-item active"><span>2026</span><div><small>LEVEL 01 · IN PROGRESS</small><h3>Foundations at IIT Madras</h3><p>Statistics 1, Mathematics 1, Computational Thinking, and English 1 — developing the analytical core for data science.</p><div className="course-row"><b>Statistics</b><b>Mathematics</b><b>Python</b></div></div></article>
          <article className="timeline-item"><span>NEXT</span><div><small>LEVEL 02 · TARGET</small><h3>Diploma in Data Science</h3><p>Advancing into machine learning foundations, business data, databases, and applied modeling.</p></div></article>
          <article className="timeline-item"><span>2027</span><div><small>THE NORTH STAR</small><h3>BS in Data Science & Applications</h3><p>Building toward advanced AI, statistical modeling, and meaningful industry capstone work.</p></div></article>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <p className="eyebrow"><i /> OPEN TO IDEAS & COLLABORATIONS</p>
          <h2>LET’S BUILD<br /><em>SOMETHING REAL.</em></h2>
          <div className="contact-grid">
            <div><p>Have an idea, opportunity, or technical rabbit hole worth exploring? I’d love to hear about it.</p><div className="social-row"><a href="mailto:solankikamal55143@gmail.com" aria-label="Email"><Mail /></a><a href="https://github.com/kamalsolanki143" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href="https://www.linkedin.com/in/kamal-solanki" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a></div></div>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <label>Name<input required name="name" placeholder="Your name" /></label>
              <label>Email<input required type="email" name="email" placeholder="you@example.com" /></label>
              <label>Message<textarea required name="message" placeholder="Tell me about your idea..." rows={4} /></label>
              <Button type="submit" size="lg">{sent ? "Message ready" : "Send message"} <Send /></Button>
              {sent && <p className="form-note">Thanks — email Kamal directly at solankikamal55143@gmail.com to continue.</p>}
            </form>
          </div>
        </div>
      </section>
      <footer><span>© 2026 Kamal Solanki</span><button onClick={() => scrollTo("home")}>Back to top <ArrowDown className="rotate-180" /></button><span>Built with curiosity</span></footer>
    </main>
  );
}
