import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy, Github, GraduationCap, Linkedin, Mail, Menu, Send, ShieldCheck, X } from "lucide-react";
import cityImg from "@/assets/reference-city.webp";
import waterfallImg from "@/assets/reference-waterfall.webp";
import industrialImg from "@/assets/reference-industrial.webp";
import sunsetImg from "@/assets/reference-sunset.webp";
import fantasyCity from "@/assets/cinematic-mountain-city.webp";
import fantasyHall from "@/assets/cinematic-waterfall-hall.webp";
import fantasyTemple from "@/assets/cinematic-river-temple.webp";
import bridgeLayer from "@/assets/layer-bridge.webp";
import cloudLayer from "@/assets/layer-clouds.webp";
import rockLayer from "@/assets/layer-foreground.webp";

const linkedIn = "https://www.linkedin.com/in/kamal-solanki-612ba5369/";
const github = "https://github.com/kamalsolanki143";
const email = "solankikamal55143@gmail.com";
const iitMadras = "https://study.iitm.ac.in/ds/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kamal Solanki — AI & Data Science Builder" },
      { name: "description", content: "Travel through the cinematic world of Kamal Solanki — IIT Madras Data Science student, AI builder, hackathon finalist and open-source contributor." },
      { property: "og:title", content: "Kamal Solanki — Enter the World" },
      { property: "og:description", content: "An immersive 2.5D portfolio journey through Kamal Solanki's skills, projects, achievements and IIT Madras path." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

type Project = { title: string; category: "Hackathon" | "Personal Project" | "Academic"; status: string; summary: string; bullets: string[]; tech: string[]; repo: string; demo?: string };
const projects: Project[] = [
  { title: "TalentOS-AI-BuildX26", category: "Hackathon", status: "Finalist · BuildX'26", summary: "AI-powered hiring and recruitment platform built for BuildX’26.", bullets: ["Resume screening", "Candidate-job fit analysis", "Interview insights and hiring workflows"], tech: ["TypeScript", "AI", "Recruitment workflows"], repo: `${github}/TalentOS-AI-BuildX26`, demo: "https://talent-os-ai-build-x26.vercel.app" },
  { title: "Compasscrew-v2v", category: "Hackathon", status: "Finalist", summary: "EscapeHer is an AI-powered women’s safety platform built for Vibe2Vision (SheAspire 3.0).", bullets: ["SOS activation and emergency alerts", "Live location and safe-route navigation", "AI-assisted emergency response"], tech: ["TypeScript", "AI", "Location services"], repo: `${github}/Compasscrew-v2v` },
  { title: "sentinel-ai-datathon-2026", category: "Hackathon", status: "Repository", summary: "AI-powered crime intelligence operating system for proactive policing.", bullets: ["Crime intelligence workflows", "AI-assisted analysis", "Proactive policing use case"], tech: ["Python", "AI", "Data Analysis"], repo: `${github}/sentinel-ai-datathon-2026`, demo: "https://sentinel-ai-datathon-2026.vercel.app" },
  { title: "VitalFlow-AI", category: "Hackathon", status: "Repository", summary: "Multi-agent healthcare coordination platform for diagnostic reports, risk assessment and follow-up workflows.", bullets: ["Diagnostic report analysis", "Risk-based case routing", "Escalation and follow-up tracking"], tech: ["TypeScript", "AI", "Healthcare workflows"], repo: `${github}/VitalFlow-AI`, demo: "https://vital-flow-ai-azure.vercel.app" },
  { title: "PranaMap-AI", category: "Hackathon", status: "Repository", summary: "AI-powered urban air-quality intervention platform for smart cities.", bullets: ["Urban air-quality insights", "GIS-based workflows", "Machine-learning support"], tech: ["Python", "LangGraph", "FastAPI", "Next.js", "GIS", "Machine Learning"], repo: `${github}/PranaMap-AI`, demo: "https://prana-map-ai.vercel.app" },
  { title: "Quoteflow-AI", category: "Hackathon", status: "Repository", summary: "AI-powered RFQ-to-quote agent for PDFs, emails and business requests.", bullets: ["RFQ intake", "Quotation generation", "AI-assisted business workflows"], tech: ["JavaScript", "AI", "Document workflows"], repo: `${github}/Quoteflow-AI`, demo: "https://quoteflow-ai-eight.vercel.app" },
  { title: "RoadRakshak-AI", category: "Hackathon", status: "Repository", summary: "AI-powered RoadSoS assistant built for the IIT Madras Road Safety Hackathon 2026.", bullets: ["Nearby emergency-service discovery", "SOS alerts", "Chatbot-based emergency guidance"], tech: ["JavaScript", "AI", "Road safety"], repo: `${github}/RoadRakshak-AI`, demo: "https://road-rakshak-ai.vercel.app" },
  { title: "redrob-ai-ranking-engine", category: "Hackathon", status: "Repository", summary: "AI-powered candidate ranking engine using semantic search and skill intelligence.", bullets: ["Semantic search", "Skill and career-progression analysis", "Candidate ranking workflow"], tech: ["Python", "AI", "Semantic Search"], repo: `${github}/redrob-ai-ranking-engine` },
  { title: "rule-based-ai-chatbot", category: "Personal Project", status: "Repository", summary: "Bilingual rule-based chatbot supporting English, Hinglish and Hindi inputs.", bullets: ["Language-specific responses", "Control-flow and decision logic", "Predefined conversational rules"], tech: ["Python", "AI", "Natural Language Processing"], repo: `${github}/rule-based-ai-chatbot` },
  { title: "iris-classification-ai", category: "Academic", status: "Repository", summary: "Machine-learning classification project using the Iris dataset and K-Nearest Neighbors.", bullets: ["Iris species prediction", "K-Nearest Neighbors", "Model performance evaluation"], tech: ["Python", "Machine Learning", "KNN"], repo: `${github}/iris-classification-ai` },
];

const achievements = [
  { year: "2026", title: "Google Student Ambassador", text: "Supporting student engagement and AI learning through the Gemini program." },
  { year: "2026", title: "Campus Ambassador — E-Cell IIT Bombay", text: "Promoting entrepreneurship, innovation and startup initiatives." },
  { year: "2026", title: "GirlsScript Summer of Code Contributor", text: "Contributing to open-source projects through the programme." },
  { year: "2026 →", title: "Founder — Compass Crew", text: "Leading a student community for AI, hackathons, startups and developer growth." },
];

const skills = [
  { group: "Programming", items: ["Python"], x: 8, h: 46 },
  { group: "AI & Data", items: ["Artificial Intelligence", "Machine Learning", "Data Science", "Data Analysis", "Pandas", "Scikit-learn", "NLP", "LLMs"], x: 32, h: 78 },
  { group: "Development", items: ["FastAPI", "Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"], x: 58, h: 62 },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "Vercel", "Jupyter"], x: 82, h: 50 },
];

const chapters = [
  ["home", "World"], ["about", "Who I am"], ["skills", "What I build"], ["projects", "What I built"],
  ["achievements", "Impact"], ["journey", "Journey"], ["identity", "Identity"], ["contact", "Destination"],
] as const;

function goTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

async function copyEmail(emailAddress: string) {
  try {
    await navigator.clipboard.writeText(emailAddress);
    return true;
  } catch {
    const input = document.createElement("textarea");
    input.value = emailAddress;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    return copied;
  }
}

const motes = Array.from({ length: 16 }, (_, i) => ({ left: `${(i * 41 + 7) % 100}%`, top: `${(i * 57 + 11) % 90}%`, delay: `${-(i * 1.3)}s`, dur: `${9 + (i % 6)}s`, size: 2 + (i % 3) }));

type SceneProps = {
  id: string; bg: string; children: React.ReactNode; className?: string;
  bridge?: boolean; clouds?: boolean; rocks?: "left" | "right" | "both"; tint?: string;
};

/** One chapter of the world: background → clouds → midground → content → foreground, each moving at its own speed. */
function WorldScene({ id, bg, children, className = "", bridge, clouds = true, rocks = "both", tint }: SceneProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 });
  const bgY = useTransform(p, [0, 1], ["-8%", "8%"]);
  const bgScale = useTransform(p, [0, 0.5, 1], [1.22, 1.08, 1.0]);
  const cloudY = useTransform(p, [0, 1], ["-18%", "22%"]);
  const midY = useTransform(p, [0, 1], ["30%", "-26%"]);
  const midScale = useTransform(p, [0, 1], [0.92, 1.12]);
  const fgY = useTransform(p, [0, 1], ["45%", "-55%"]);
  const fgScale = useTransform(p, [0, 1], [1, 1.35]);
  return (
    <section ref={ref} id={id} className={`world-scene ${className}`} style={tint ? ({ "--scene-tint": tint } as React.CSSProperties) : undefined}>
      <div className="layer-stack" aria-hidden>
        <motion.img className="layer-bg" src={bg} alt="" style={{ y: bgY, scale: bgScale }} loading={id === "home" ? "eager" : "lazy"} fetchPriority={id === "home" ? "high" : "low"} decoding="async" />
        <div className="layer-sky-tint" />
        {clouds && <motion.div className="layer-clouds" style={{ y: cloudY }}><img src={cloudLayer} alt="" loading="lazy" /><img src={cloudLayer} alt="" loading="lazy" /></motion.div>}
        {bridge && <motion.div className="layer-mid" style={{ y: midY, scale: midScale }}><img src={bridgeLayer} alt="" loading="lazy" /><i className="falls falls-a" /><i className="falls falls-b" /></motion.div>}
        <div className="water-sheen" />
        <div className="motes">{motes.map((m, i) => <i key={i} style={{ left: m.left, top: m.top, animationDelay: m.delay, animationDuration: m.dur, width: m.size, height: m.size }} />)}</div>
        <div className="haze" />
      </div>
      <div className="scene-body">{children}</div>
      <motion.div className="layer-fg" aria-hidden style={{ y: fgY, scale: fgScale }}>
        {(rocks === "right" || rocks === "both") && <img className="rock-right" src={rockLayer} alt="" loading="lazy" />}
        {(rocks === "left" || rocks === "both") && <img className="rock-left" src={rockLayer} alt="" loading="lazy" />}
      </motion.div>
      <div className="scene-seam" aria-hidden />
    </section>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Heading({ n, label, title, em }: { n: string; label: string; title: string; em: string }) {
  return <Reveal className="chapter-head"><p className="chapter-label"><span>{n}</span>{label}</p><h2>{title}<br /><em>{em}</em></h2></Reveal>;
}

function HeroTitle() {
  const word = (text: string, offset: number) => text.split("").map((c, i) => <motion.span key={i} initial={{ opacity: 0, y: "0.6em" }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (offset + i) * 0.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}>{c}</motion.span>);
  return <h1 className="hero-title" aria-label="Kamal Solanki"><span className="line">{word("KAMAL", 0)}</span><span className="line thin">{word("SOLANKI", 5)}</span></h1>;
}

function useFloat(p: MotionValue<number>, range: [string, string]) { return useTransform(p, [0, 1], range); }

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(projects[0]!.title);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const portraitY = useFloat(heroP, ["0%", "-18%"]);
  const titleY = useFloat(heroP, ["0%", "-40%"]);
  const list = filter === "All" ? projects : projects.filter((x) => x.category === filter);
  const current = projects.find((x) => x.title === selected) ?? projects[0]!;

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    chapters.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  const activeIndex = chapters.findIndex(([id]) => id === active);

  return (
    <main className="world">
      <motion.div className="travel-line" style={{ scaleX: scrollYProgress }} />
      <header className="world-nav">
        <button type="button" className="wordmark" onClick={() => goTo("home")}>K · Solanki</button>
        <nav id="chapter-menu" className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Chapters">
          {chapters.slice(1).map(([id, label]) => <button type="button" key={id} className={active === id ? "on" : ""} aria-current={active === id ? "location" : undefined} onClick={() => { goTo(id); setMenuOpen(false); }}>{label}</button>)}
        </nav>
        <button type="button" className="nav-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="chapter-menu" onClick={() => setMenuOpen((v) => !v)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <aside className="chapter-rail" aria-hidden>
        <b>{String(activeIndex + 1).padStart(2, "0")}</b><i /><span>{chapters[activeIndex]?.[1]}</span><em>/ 08</em>
      </aside>

      {/* 01 HERO */}
      <WorldScene id="home" bg={cityImg} bridge className="scene-hero" rocks="both">
        <div ref={heroRef} className="hero-grid">
          <motion.div className="hero-copy" style={{ y: titleY }}>
            <motion.p className="chapter-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}><span>01</span>World entry</motion.p>
            <HeroTitle />
            <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }}>
              AI & Data Science builder · Student developer<br /><span>BS Data Science & Applications — IIT Madras</span>
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 1 }}>
              <button type="button" className="cta primary" onClick={() => goTo("about")}>Enter the world <ArrowDown /></button>
              <button type="button" className="cta" onClick={() => goTo("projects")}>Explore work <ArrowUpRight /></button>
            </motion.div>
          </motion.div>
          <motion.figure className="hero-portrait" style={{ y: portraitY }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1.6 }}>
            <div className="arch-light" />
            <div className="arch"><img src="/kamal-portrait.jpg" alt="Kamal Solanki" width={681} height={1024} /></div>
            <div className="arch-ledge" />
            <figcaption>Kamal Solanki · Rajasthan, India</figcaption>
          </motion.figure>
        </div>
        <button type="button" className="scroll-cue" onClick={() => goTo("about")} aria-label="Scroll into the world"><span /></button>
      </WorldScene>

      {/* 02 ABOUT */}
      <WorldScene id="about" bg={waterfallImg} className="scene-about" rocks="left" clouds={false}>
        <div className="about-layout">
          <Reveal className="about-window">
            <div className="window-frame"><img src="/kamal-portrait.jpg" alt="Kamal Solanki" width={681} height={1024} loading="lazy" /></div>
            <span className="window-plate">IIT Madras · Foundation Level</span>
          </Reveal>
          <div className="about-text">
            <Heading n="02" label="Who I am" title="Bridging software" em="& quantitative data science." />
            <Reveal delay={0.1}><p className="lede">I’m Kamal — a Foundation Level student in IIT Madras’ BS in Data Science & Applications, combining statistics and mathematics with AI and software engineering to build things that solve real problems.</p></Reveal>
            <Reveal delay={0.2} className="inscriptions">
              <div><small>Studying</small><p>Foundation Level · Data Science · Mathematics · Computational Thinking · English</p></div>
              <div><small>Mission</small><p>Accessible, reliable, data-driven software through hands-on building.</p></div>
              <div><small>Profile</small><p>IIT Madras Student · AI & Data Science Builder · Student Developer · Hackathon Finalist · Open-Source Contributor</p></div>
            </Reveal>
          </div>
        </div>
      </WorldScene>

      {/* 03 SKILLS */}
      <WorldScene id="skills" bg={sunsetImg} className="scene-skills" rocks="right">
        <Heading n="03" label="What I build with" title="A landscape of" em="technologies." />
        <div className="tech-landscape">
          <div className="horizon" />
          {skills.map((s, i) => (
            <motion.div key={s.group} className="beacon" style={{ left: `${s.x}%`, "--h": `${s.h}%` } as unknown as import("motion/react").MotionStyle} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}>
              <div className="beacon-top"><small>0{i + 1}</small><b>{s.group}</b><ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul></div>
              <i className="beacon-beam" />
              <i className="beacon-base" />
            </motion.div>
          ))}
        </div>
      </WorldScene>

      {/* 04 PROJECTS */}
      <WorldScene id="projects" bg={industrialImg} bridge className="scene-projects" rocks="left">
        <Heading n="04" label="What I have built" title="The machine" em="archive." />
        <div className="archive">
          <div className="archive-index">
            <div className="archive-filters" role="tablist">{["All", "Hackathon", "Personal Project", "Academic"].map((f) => <button type="button" role="tab" aria-selected={filter === f} key={f} className={filter === f ? "on" : ""} onClick={() => { setFilter(f); const first = f === "All" ? projects[0] : projects.find((x) => x.category === f); if (first) setSelected(first.title); }}>{f}</button>)}</div>
            <ol>{list.map((x) => { const n = projects.indexOf(x) + 1; return <li key={x.title}><button type="button" className={x.title === current.title ? "on" : ""} onClick={() => setSelected(x.title)}><small>{String(n).padStart(2, "0")}</small><span>{x.title}</span><em>{x.status}</em></button></li>; })}</ol>
          </div>
          <AnimatePresence mode="wait">
            <motion.article key={current.title} className="archive-feature" initial={{ opacity: 0, x: 40, rotateY: -8 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -30, rotateY: 6 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <small className="feature-meta">{current.category} · {current.status}</small>
              <h3>{current.title}</h3>
              <p>{current.summary}</p>
              <ul>{current.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              <div className="feature-tech">{current.tech.join(" · ")}</div>
              <div className="feature-actions">
                <a className="cta primary" href={current.repo} target="_blank" rel="noopener noreferrer" aria-label={`View ${current.title} repository on GitHub`}><Github /> View repository</a>
                {current.demo && <a className="cta" href={current.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${current.title} live demo`}>Live demo <ArrowUpRight /></a>}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </WorldScene>

      {/* 05 ACHIEVEMENTS */}
      <WorldScene id="achievements" bg={fantasyCity} className="scene-achievements" rocks="both" clouds>
        <Heading n="05" label="Impact" title="Signals across" em="the world." />
        <Reveal className="finalist">
          <b>2×</b><div><span>Hackathon Finalist</span><p><a href={`${github}/TalentOS-AI-BuildX26`} target="_blank" rel="noopener noreferrer">BuildX'26 ↗</a><a href={`${github}/Compasscrew-v2v`} target="_blank" rel="noopener noreferrer">Compasscrew-v2v ↗</a></p></div>
        </Reveal>
        <div className="lantern-path">
          {achievements.map((a, i) => (
            <motion.div key={a.title} className="lantern" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9, delay: i * 0.12 }}>
              <i /><small>{a.year}</small><b>{a.title}</b><p>{a.text}</p>
            </motion.div>
          ))}
        </div>
      </WorldScene>

      {/* 06 JOURNEY */}
      <WorldScene id="journey" bg={fantasyHall} bridge className="scene-journey" rocks="right" clouds={false}>
        <Heading n="06" label="Education & learning journey" title="A path still" em="unfolding." />
        <div className="path">
          <i className="path-flow" />
          {[
            ["Current · 2026 — Present", "IIT Madras · BS in Data Science & Applications", "Foundation Level · Active student", true],
            ["Upcoming", "Diploma Level", "A future stage in the programme — not yet completed.", false],
            ["Future", "BS Degree Completion", "A future programme milestone — not yet completed.", false],
          ].map(([t, b, d, lit], i) => (
            <Reveal key={String(b)} delay={i * 0.15} className={lit ? "station lit" : "station"}><i /><time>{t}</time><b>{b}</b><p>{d}</p></Reveal>
          ))}
        </div>
      </WorldScene>

      {/* 07 IDENTITY */}
      <WorldScene id="identity" bg={fantasyTemple} className="scene-identity" rocks="left">
        <Heading n="07" label="Linked digital profiles" title="Identity," em="connected." />
        <div className="passports">
          {[
            { href: iitMadras, icon: GraduationCap, issuer: "IIT Madras", name: "BS in Data Science & Applications", line: "Active student", label: "Official programme", aria: "Open the official IIT Madras Data Science programme" },
            { href: github, icon: Github, issuer: "GitHub", name: "@kamalsolanki143", line: "Python · AI · Open Source", label: "Linked profile", aria: "Open Kamal Solanki GitHub profile" },
            { href: linkedIn, icon: Linkedin, issuer: "LinkedIn", name: "Kamal Solanki", line: "Founder · Ambassador · Community Builder", label: "Linked profile", aria: "Open Kamal Solanki LinkedIn profile" },
          ].map(({ icon: Icon, ...x }, i) => (
            <motion.a key={x.issuer} href={x.href} target="_blank" rel="noopener noreferrer" aria-label={x.aria} className="passport" initial={{ opacity: 0, y: 50, rotate: (i - 1) * 5 }} whileInView={{ opacity: 1, y: 0, rotate: (i - 1) * 3 }} whileHover={{ y: -10, rotate: 0, scale: 1.015 }} whileTap={{ scale: 0.985 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, delay: i * 0.12 }}>
              <span className="pp-issuer"><Icon /> {x.issuer}</span>
              <b>{x.name}</b><em>{x.line}</em>
              <span className="pp-stamp"><ShieldCheck /> {x.label}</span>
            </motion.a>
          ))}
        </div>
      </WorldScene>

      {/* 08 CONTACT */}
      <WorldScene id="contact" bg={sunsetImg} bridge className="scene-contact" rocks="both">
        <Heading n="08" label="Final destination" title="Let’s build" em="something together." />
        <Reveal delay={0.1}><p className="lede center">Open to internships, AI projects, hackathons, research, startups and open-source collaboration.</p></Reveal>
        <Reveal delay={0.2}>
           <form className="horizon-form" onSubmit={(e) => { e.preventDefault(); const d = new FormData(e.currentTarget); const name = String(d.get("name") ?? ""); const from = String(d.get("email") ?? ""); const msg = String(d.get("message") ?? ""); window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${msg}\n\nFrom: ${name} (${from})`)}`; }}>
            <input required name="name" aria-label="Your name" placeholder="Your name" maxLength={100} />
            <input required type="email" name="email" aria-label="Your email" placeholder="Your email" maxLength={255} />
            <textarea required name="message" aria-label="Message" placeholder="Tell me about your idea" rows={2} maxLength={2000} />
             <button type="submit" className="cta primary" aria-label="Open an email draft to Kamal Solanki">Send by email <Send /></button>
          </form>
        </Reveal>
        <Reveal delay={0.3} className="contact-links">
          <button type="button" aria-label="Copy Kamal Solanki's email address" aria-live="polite" onClick={async () => { setCopied(true); await copyEmail(email); }}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : email}</button>
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label="Open Kamal Solanki GitHub profile"><Github /> GitHub</a>
          <a href={linkedIn} target="_blank" rel="noopener noreferrer" aria-label="Open Kamal Solanki LinkedIn profile"><Linkedin /> LinkedIn</a>
          <a href={iitMadras} target="_blank" rel="noopener noreferrer" aria-label="Open the official IIT Madras Data Science programme"><GraduationCap /> IIT Madras</a>
          <a href={`mailto:${email}`} aria-label="Email Kamal Solanki"><Mail /> Email</a>
        </Reveal>
        <footer className="world-foot"><span>Kamal Solanki · 2026</span><button type="button" onClick={() => goTo("home")}>Back to the beginning ↑</button></footer>
      </WorldScene>
    </main>
  );
}
