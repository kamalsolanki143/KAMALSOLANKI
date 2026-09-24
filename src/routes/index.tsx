import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { lazy, Suspense, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import mountainCity from "@/assets/cinematic-mountain-city.jpg";
import waterfallHall from "@/assets/cinematic-waterfall-hall.jpg";
import industrialGallery from "@/assets/cinematic-industrial-gallery.jpg";
import riverTemple from "@/assets/cinematic-river-temple.jpg";

const PortfolioScene = lazy(() => import("@/components/portfolio-scene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kamal Solanki — Data Science & Full-Stack Developer" },
      { name: "description", content: "The cinematic portfolio of Kamal Solanki, an IIT Madras Data Science student building intelligent digital products." },
      { property: "og:title", content: "Kamal Solanki — Data Science & Full-Stack Developer" },
      { property: "og:description", content: "Explore Kamal Solanki’s work across AI, data science, statistics, and full-stack development." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const nav = ["About", "Projects", "Skills", "Journey", "Contact"];
const projects = [
  { n: "01", title: "Sentinel AI", kind: "Security intelligence", repo: "https://github.com/kamalsolanki143/sentinel-ai-datathon-2026" },
  { n: "02", title: "VitalFlow AI", kind: "Predictive health analytics", repo: "https://github.com/kamalsolanki143/VitalFlow-AI" },
  { n: "03", title: "TalentOS AI", kind: "Intelligent talent systems", repo: "https://github.com/kamalsolanki143/TalentOS-AI-BuildX26" },
  { n: "04", title: "PranaMap AI", kind: "Environmental intelligence", repo: "https://github.com/kamalsolanki143/PranaMap-AI" },
];

function goTo(id: string) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
}

function Scene({ id, image, number, children, align = "left", className = "" }: { id: string; image: string; number: string; children: React.ReactNode; align?: "left" | "right" | "center"; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.12, 1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-3%", "3%"]);

  return (
    <section ref={ref} id={id} className={`cinematic-scene scene-${align} ${className}`}>
      <motion.img src={image} alt="" width={1920} height={1080} loading={id === "home" ? "eager" : "lazy"} className="scene-image" style={{ scale, y }} />
      <div className="scene-shade" />
      <div className="scene-index"><span>{number}</span><i /></div>
      <motion.div className="scene-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.35 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </section>
  );
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <main className="world-shell">
      <motion.div className="scroll-line" style={{ scaleX: scrollYProgress }} />
      <div className="world-canvas" aria-hidden="true">
        <ClientOnly fallback={null}><Suspense fallback={null}><PortfolioScene /></Suspense></ClientOnly>
      </div>

      <header className="minimal-nav">
        <Button variant="ghost" className="wordmark" onClick={() => goTo("home")}>Kamal Solanki</Button>
        <span className="nav-sigil" aria-hidden="true">▲</span>
        <nav className={menuOpen ? "nav-menu open" : "nav-menu"} aria-label="Primary navigation">
          {nav.map((item) => <Button variant="ghost" key={item} onClick={() => { goTo(item); setMenuOpen(false); }}>{item}</Button>)}
        </nav>
        <Button variant="outline" size="sm" className="contact-jump" onClick={() => goTo("contact")}>Contact</Button>
        <Button variant="ghost" size="icon" className="nav-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>

      <Scene id="home" image={mountainCity} number="00" align="center" className="opening-scene">
        <p className="chapter-label">Data science · Statistics · Full-stack</p>
        <h1>KAMAL<br /><span>SOLANKI</span></h1>
        <p className="opening-copy">Building intelligent systems where data, code<br />and human curiosity converge.</p>
        <Button className="discover-button" onClick={() => goTo("about")}>Enter the world <ArrowDown /></Button>
      </Scene>

      <Scene id="about" image={waterfallHall} number="01" align="left">
        <p className="chapter-label">About the explorer</p>
        <h2>Ideas flow.<br /><em>I build.</em></h2>
        <p className="scene-copy">I’m a Foundation Level student in the BS Data Science & Applications program at IIT Madras. I turn statistics, computational thinking and ambitious ideas into working digital experiences.</p>
        <div className="quiet-tags"><span>IIT Madras</span><span>Data Science</span><span>Statistics</span></div>
      </Scene>

      <Scene id="projects" image={industrialGallery} number="02" align="right" className="projects-world">
        <p className="chapter-label">Selected experiments</p>
        <h2>Machines with<br /><em>a purpose.</em></h2>
        <div className="project-list">
          {projects.map((project) => (
            <a href={project.repo} target="_blank" rel="noreferrer" key={project.title}>
              <small>{project.n}</small><span><b>{project.title}</b>{project.kind}</span><ArrowUpRight />
            </a>
          ))}
        </div>
      </Scene>

      <Scene id="skills" image={riverTemple} number="03" align="left" className="skills-world">
        <p className="chapter-label">The toolkit</p>
        <h2>Crafted across<br /><em>disciplines.</em></h2>
        <div className="skill-streams">
          <div><span>Build</span><p>Python · React · Next.js · FastAPI</p></div>
          <div><span>Analyze</span><p>Statistics · Machine Learning · Pandas</p></div>
          <div><span>Ship</span><p>Git · Vercel · Jupyter · VS Code</p></div>
        </div>
      </Scene>

      <Scene id="journey" image={waterfallHall} number="04" align="right" className="journey-world">
        <p className="chapter-label">Academic journey</p>
        <h2>A path still<br /><em>unfolding.</em></h2>
        <div className="journey-line">
          <div><time>2026</time><span><b>Foundations · IIT Madras</b>Statistics, Mathematics, Computational Thinking</span></div>
          <div><time>Next</time><span><b>Diploma in Data Science</b>Machine learning, databases and applied modeling</span></div>
          <div><time>2027</time><span><b>BS Data Science & Applications</b>The north star</span></div>
        </div>
      </Scene>

      <Scene id="contact" image={mountainCity} number="05" align="center" className="contact-world">
        <p className="chapter-label">The next chapter</p>
        <h2>Let’s create<br /><em>what’s next.</em></h2>
        <form className="cinematic-form" onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const name = String(data.get("name") ?? "");
          const email = String(data.get("email") ?? "");
          const message = String(data.get("message") ?? "");
          setSent(true);
          window.location.href = `mailto:solankikamal55143@gmail.com?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)}`;
        }}>
          <div><input required name="name" aria-label="Name" placeholder="Your name" /><input required type="email" name="email" aria-label="Email" placeholder="Email address" /></div>
          <textarea required name="message" aria-label="Message" placeholder="Tell me about your idea" rows={2} />
          <Button type="submit">{sent ? "Message ready" : "Send message"}<Send /></Button>
        </form>
        <div className="contact-links">
          <a href="mailto:solankikamal55143@gmail.com" aria-label="Email"><Mail /></a>
          <a href="https://github.com/kamalsolanki143" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
          <a href="https://www.linkedin.com/in/kamal-solanki" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
        </div>
      </Scene>
      <footer><span>Kamal Solanki · 2026</span><span>Rajasthan, India</span></footer>
    </main>
  );
}