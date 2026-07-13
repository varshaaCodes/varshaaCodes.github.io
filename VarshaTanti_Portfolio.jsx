import React, { useEffect, useState, useRef } from "react";
import { Github, Linkedin, Mail, Phone, ExternalLink, CheckCircle2 } from "lucide-react";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

:root{
  --ink:#10151C;
  --ink2:#161D27;
  --paper:#F1EDE4;
  --slate:#8A93A3;
  --gold:#E3A83B;
  --teal:#4FD1AE;
  --line:rgba(241,237,228,0.12);
}

.vt-root{
  background:var(--ink);
  color:var(--paper);
  font-family:'Newsreader', serif;
  min-height:100%;
  width:100%;
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
}

.vt-root *{box-sizing:border-box;}

.vt-mono{ font-family:'IBM Plex Mono', monospace; letter-spacing:0.02em; }
.vt-display{ font-family:'Space Grotesk', sans-serif; }

.vt-eyebrow{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  text-transform:uppercase;
  letter-spacing:0.18em;
  color:var(--gold);
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:18px;
}
.vt-eyebrow::before{ content:''; width:20px; height:1px; background:var(--gold); display:inline-block; }

/* Nav */
.vt-nav{
  position:sticky; top:0; z-index:50;
  display:flex; justify-content:space-between; align-items:center;
  padding:18px 6vw;
  background:rgba(16,21,28,0.85);
  backdrop-filter:blur(8px);
  border-bottom:1px solid var(--line);
}
.vt-nav-name{ font-family:'Space Grotesk', sans-serif; font-weight:600; font-size:15px; letter-spacing:0.04em; }
.vt-nav-icons{ display:flex; gap:20px; }
.vt-nav-icons a{ color:var(--slate); transition:color .25s ease, transform .25s ease; }
.vt-nav-icons a:hover{ color:var(--gold); transform:translateY(-2px); }

/* Hero */
.vt-hero{
  min-height:88vh;
  display:flex; flex-direction:column; align-items:flex-start; justify-content:center;
  padding:8vh 6vw 10vh;
  position:relative;
  overflow:hidden;
}
.vt-hero::after{
  content:'';
  position:absolute; inset:0;
  background:
    radial-gradient(circle at 85% 20%, rgba(227,168,59,0.08), transparent 45%),
    radial-gradient(circle at 10% 90%, rgba(79,209,174,0.05), transparent 40%);
  pointer-events:none;
}

.vt-card{
  font-family:'IBM Plex Mono', monospace;
  font-size:13px;
  color:var(--slate);
  border:1px solid var(--line);
  background:rgba(241,237,228,0.03);
  border-radius:6px;
  padding:16px 20px;
  min-width:300px;
  margin-bottom:36px;
}
.vt-card-row{ display:flex; align-items:center; gap:10px; min-height:20px; }
.vt-cursor{
  display:inline-block; width:7px; height:14px; background:var(--gold);
  animation:vt-blink 1s step-end infinite; margin-left:2px; vertical-align:-2px;
}
@keyframes vt-blink{ 50%{ opacity:0; } }
@keyframes vt-pop{
  0%{ transform:scale(0.6); opacity:0; }
  60%{ transform:scale(1.15); opacity:1; }
  100%{ transform:scale(1); opacity:1; }
}
.vt-check{ animation:vt-pop .45s ease forwards; color:var(--teal); }

@keyframes vt-fade-up{
  from{ opacity:0; transform:translateY(14px); }
  to{ opacity:1; transform:translateY(0); }
}
.vt-fade{ opacity:0; }
.vt-fade.vt-in{ animation:vt-fade-up .7s ease forwards; }

.vt-name{
  font-family:'Space Grotesk', sans-serif;
  font-weight:700;
  font-size:clamp(36px, 6vw, 76px);
  line-height:1.03;
  margin:0 0 10px 0;
  letter-spacing:-0.01em;
}
.vt-title{
  font-family:'IBM Plex Mono', monospace;
  color:var(--gold);
  font-size:clamp(14px, 1.6vw, 18px);
  margin-bottom:22px;
}
.vt-summary{
  max-width:640px;
  font-size:18px;
  color:var(--paper);
  opacity:0.88;
  font-style:italic;
  margin-bottom:32px;
}
.vt-cta-row{ display:flex; gap:14px; flex-wrap:wrap; }
.vt-btn{
  font-family:'IBM Plex Mono', monospace;
  font-size:13px;
  padding:12px 22px;
  border-radius:4px;
  border:1px solid var(--gold);
  color:var(--gold);
  text-decoration:none;
  transition:all .25s ease;
  display:inline-flex; align-items:center; gap:8px;
}
.vt-btn:hover{ background:var(--gold); color:var(--ink); }
.vt-btn.vt-btn-solid{ background:var(--gold); color:var(--ink); }
.vt-btn.vt-btn-solid:hover{ background:transparent; color:var(--gold); }

/* Stats */
.vt-stats{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  border-top:1px solid var(--line);
  border-bottom:1px solid var(--line);
}
.vt-stat{
  padding:34px 6vw;
  border-right:1px solid var(--line);
}
.vt-stat:last-child{ border-right:none; }
.vt-stat-num{
  font-family:'Space Grotesk', sans-serif;
  font-weight:700;
  font-size:clamp(26px, 3.2vw, 40px);
  color:var(--gold);
}
.vt-stat-label{
  font-family:'IBM Plex Mono', monospace;
  font-size:11.5px;
  color:var(--slate);
  text-transform:uppercase;
  letter-spacing:0.08em;
  margin-top:8px;
}

/* Sections */
.vt-section{ padding:11vh 6vw; }
.vt-section-alt{ background:var(--ink2); }
.vt-section-head{
  font-family:'Space Grotesk', sans-serif;
  font-weight:600;
  font-size:clamp(24px,3vw,34px);
  margin-bottom:44px;
  max-width:640px;
}

.vt-exp-card{
  border:1px solid var(--line);
  border-radius:8px;
  padding:30px 32px;
  margin-bottom:22px;
  background:rgba(241,237,228,0.02);
  transition:border-color .3s ease, transform .3s ease;
}
.vt-exp-card:hover{ border-color:rgba(227,168,59,0.45); transform:translateY(-3px); }
.vt-exp-top{ display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:14px; }
.vt-exp-title{ font-family:'Space Grotesk', sans-serif; font-weight:600; font-size:20px; color:var(--paper); }
.vt-tag{
  font-family:'IBM Plex Mono', monospace;
  font-size:10.5px;
  text-transform:uppercase;
  letter-spacing:0.08em;
  padding:5px 10px;
  border-radius:20px;
  border:1px solid rgba(79,209,174,0.4);
  color:var(--teal);
  white-space:nowrap;
  display:inline-flex;
  align-items:center;
  gap:5px;
}
.vt-exp-desc{ color:var(--paper); opacity:0.85; font-size:15.5px; max-width:760px; }
.vt-exp-impact{
  margin-top:16px;
  font-family:'IBM Plex Mono', monospace;
  font-size:12.5px;
  color:var(--gold);
  border-left:2px solid var(--gold);
  padding-left:12px;
}

/* Project */
.vt-proj-card{
  border:1px solid var(--line);
  border-radius:10px;
  padding:38px;
  background:linear-gradient(160deg, rgba(227,168,59,0.05), rgba(241,237,228,0.02));
}
.vt-proj-head{ display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:18px; }
.vt-proj-title{ font-family:'Space Grotesk', sans-serif; font-weight:700; font-size:26px; }
.vt-proj-link{ color:var(--gold); text-decoration:none; font-family:'IBM Plex Mono', monospace; font-size:13px; display:inline-flex; align-items:center; gap:6px; border-bottom:1px solid transparent; transition:border-color .2s ease; }
.vt-proj-link:hover{ border-color:var(--gold); }
.vt-proj-stack{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px; }
.vt-chip{
  font-family:'IBM Plex Mono', monospace;
  font-size:11.5px;
  padding:6px 12px;
  border-radius:4px;
  background:rgba(241,237,228,0.05);
  border:1px solid var(--line);
  color:var(--slate);
}
.vt-proj-list{ list-style:none; margin:0 0 22px 0; padding:0; display:grid; gap:10px; }
.vt-proj-list li{ font-size:15.5px; color:var(--paper); opacity:0.88; display:flex; gap:10px; }
.vt-proj-list li::before{ content:'—'; color:var(--gold); flex-shrink:0; }
.vt-proj-results{ display:flex; gap:28px; flex-wrap:wrap; border-top:1px solid var(--line); padding-top:20px; }
.vt-proj-result-num{ font-family:'Space Grotesk', sans-serif; font-weight:700; font-size:22px; color:var(--teal); }
.vt-proj-result-label{ font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--slate); text-transform:uppercase; }

/* Skills */
.vt-skill-groups{ display:grid; grid-template-columns:repeat(2,1fr); gap:28px; }
.vt-skill-group-label{ font-family:'IBM Plex Mono', monospace; font-size:12px; color:var(--gold); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:14px; }
.vt-skill-chips{ display:flex; flex-wrap:wrap; gap:10px; }

/* Education */
.vt-edu-row{ display:flex; justify-content:space-between; gap:20px; padding:20px 0; border-bottom:1px solid var(--line); flex-wrap:wrap; }
.vt-edu-row:last-child{ border-bottom:none; }
.vt-edu-school{ font-family:'Space Grotesk', sans-serif; font-weight:600; font-size:17px; }
.vt-edu-detail{ color:var(--slate); font-size:14px; }
.vt-edu-meta{ font-family:'IBM Plex Mono', monospace; font-size:13px; color:var(--gold); text-align:right; white-space:nowrap; }

.vt-cert-row{ display:flex; flex-wrap:wrap; gap:12px; margin-top:28px; }
.vt-cert-chip{
  display:flex; align-items:center; gap:8px;
  font-family:'IBM Plex Mono', monospace; font-size:12.5px;
  padding:9px 16px; border-radius:20px;
  border:1px solid rgba(227,168,59,0.35); color:var(--gold);
}

/* Footer */
.vt-footer{
  padding:9vh 6vw 6vh;
  border-top:1px solid var(--line);
  display:flex; flex-direction:column; align-items:flex-start; gap:24px;
}
.vt-footer-head{ font-family:'Space Grotesk', sans-serif; font-weight:700; font-size:clamp(28px,4vw,44px); }
.vt-footer-links{ display:flex; gap:26px; flex-wrap:wrap; }
.vt-footer-link{ display:flex; align-items:center; gap:8px; color:var(--paper); opacity:0.8; text-decoration:none; font-family:'IBM Plex Mono', monospace; font-size:13.5px; transition:opacity .2s ease, color .2s ease; }
.vt-footer-link:hover{ opacity:1; color:var(--gold); }
.vt-footer-bottom{ font-family:'IBM Plex Mono', monospace; font-size:11.5px; color:var(--slate); margin-top:20px; }

@media (max-width:820px){
  .vt-stats{ grid-template-columns:repeat(2,1fr); }
  .vt-stat{ border-bottom:1px solid var(--line); }
  .vt-skill-groups{ grid-template-columns:1fr; }
  .vt-exp-top{ flex-direction:column; }
  .vt-edu-row{ flex-direction:column; gap:6px; }
  .vt-edu-meta{ text-align:left; }
}

a:focus-visible, button:focus-visible{ outline:2px solid var(--gold); outline-offset:3px; }

@media (prefers-reduced-motion: reduce){
  .vt-cursor{ animation:none; }
  .vt-check{ animation:none; }
  .vt-fade{ opacity:1 !important; animation:none !important; }
}
`;

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`vt-fade ${visible ? "vt-in" : ""}`}
      style={{ animationDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export default function VarshaPortfolio() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setStage(3);
      return;
    }
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 1350);
    const t3 = setTimeout(() => setStage(3), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const stats = [
    { num: "300%", label: "Faster login flow" },
    { num: "651K", label: "B2B orders redirected to self-service" },
    { num: "50%", label: "Less manual PR review time" },
    { num: "40%", label: "Higher vulnerability detection" },
  ];

  const experience = [
    {
      title: "FIDO Passkey Authentication",
      status: "In Production",
      desc: "Core developer on passwordless, phishing-resistant authentication for MyBiz customers — device fingerprint tracking, MFA step-up logic, and custom error handling for platform incompatibilities.",
      impact: "Login expected up to 300% faster · help-desk ticket volume down sharply",
    },
    {
      title: "Security Settings Redesign",
      status: "Shipped",
      desc: "Migrated legacy ForgeRock authentication workflows into one unified experience — rebuilt the UI for password updates, secret question changes, and verification delivery settings.",
      impact: "Removed jarring redirects during sensitive changes · lower drop-off, more trust",
    },
    {
      title: "Digital POC Portal",
      status: "Live",
      desc: "Key developer on a unified multi-step registration workflow aimed at the 36% of unregistered business accounts, with field validation and T&C checks built into the order-approval lifecycle.",
      impact: "Redirected a YTD pipeline of 651K B2B orders toward digital self-service",
    },
  ];

  const skillGroups = [
    { label: "Languages", items: ["JavaScript", "TypeScript", "Java", "C++"] },
    { label: "Frameworks", items: ["React", "Next.js", "Angular", "Node.js"] },
    { label: "Engineering", items: ["REST APIs", "Git", "CI/CD", "Data Structures & Algorithms"] },
    { label: "AI Tools", items: ["GitHub Copilot", "Google Gemini", "GPT-4"] },
  ];

  const education = [
    {
      school: "National Institute of Technology, Durgapur",
      detail: "B.Tech, Computer Science & Engineering · CGPA 8.02/10",
      meta: "2018 — 2022",
    },
    {
      school: "DAV Model School, Durgapur",
      detail: "AISSCE (Class XII) · Aggregate 86.4%",
      meta: "2017",
    },
    {
      school: "DAV Model School, Durgapur",
      detail: "AISSE (Class X) · CGPA 9.4/10",
      meta: "2015",
    },
  ];

  return (
    <div className="vt-root">
      <style>{STYLE}</style>

      <nav className="vt-nav">
        <span className="vt-nav-name">VARSHA TANTI</span>
        <div className="vt-nav-icons">
          <a href="mailto:varsha1999tanti@gmail.com" aria-label="Email"><Mail size={17} /></a>
          <a href="https://www.linkedin.com/in/varsha-tanti-7170b118b" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a href="https://github.com/varshaaCodes" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
        </div>
      </nav>

      <header className="vt-hero">
        <div className="vt-card">
          <div className="vt-card-row">
            <span style={{ color: "var(--slate)" }}>&gt; initializing secure session</span>
            {stage === 0 && <span className="vt-cursor" />}
          </div>
          {stage >= 1 && (
            <div className="vt-card-row">
              <span style={{ color: "var(--slate)" }}>&gt; verifying credentials</span>
              {stage === 1 && <span className="vt-cursor" />}
            </div>
          )}
          {stage >= 2 && (
            <div className="vt-card-row">
              <CheckCircle2 size={15} className="vt-check" />
              <span style={{ color: "var(--teal)" }}>IDENTITY VERIFIED — welcome</span>
            </div>
          )}
        </div>

        <div className={`vt-fade ${stage >= 3 ? "vt-in" : ""}`}>
          <h1 className="vt-name">Varsha Tanti</h1>
          <div className="vt-title">SDE-2 · Frontend Engineer, Verizon</div>
          <p className="vt-summary">
            Four-plus years building scalable, secure web experiences with React, Angular
            and TypeScript — shipping passwordless authentication, redesigning account
            security, and moving B2B customers onto digital self-service.
          </p>
          <div className="vt-cta-row">
            <a className="vt-btn vt-btn-solid" href="#experience">View work</a>
            <a className="vt-btn" href="mailto:varsha1999tanti@gmail.com">
              <Mail size={14} /> Get in touch
            </a>
          </div>
        </div>
      </header>

      <section className="vt-stats">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90}>
            <div className="vt-stat">
              <div className="vt-stat-num">{s.num}</div>
              <div className="vt-stat-label">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="vt-section" id="experience">
        <div className="vt-eyebrow">EXPERIENCE_LOG</div>
        <h2 className="vt-section-head">Three years, one product — driven end to end at Verizon.</h2>

        {experience.map((e, i) => (
          <Reveal key={e.title} delay={i * 100}>
            <div className="vt-exp-card">
              <div className="vt-exp-top">
                <div className="vt-exp-title">{e.title}</div>
                <span className="vt-tag"><CheckCircle2 size={11} /> {e.status}</span>
              </div>
              <p className="vt-exp-desc">{e.desc}</p>
              <div className="vt-exp-impact">{e.impact}</div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="vt-section vt-section-alt">
        <div className="vt-eyebrow">PROJECT_LOG</div>
        <h2 className="vt-section-head">AI DevSecOps Assistant</h2>

        <Reveal>
          <div className="vt-proj-card">
            <div className="vt-proj-head">
              <div className="vt-proj-title">AI-powered PR security reviewer</div>
              <a className="vt-proj-link" href="https://github.com/varshaaCodes/ai-devsecops-assistant" target="_blank" rel="noreferrer">
                View repository <ExternalLink size={13} />
              </a>
            </div>
            <div className="vt-proj-stack">
              {["GPT-4", "FastAPI", "GitHub Actions", "Bandit", "Semgrep", "Streamlit/React"].map((t) => (
                <span className="vt-chip" key={t}>{t}</span>
              ))}
            </div>
            <ul className="vt-proj-list">
              <li>Integrated GPT-4 with a FastAPI backend for security insights, code fixes, and best-practice checks.</li>
              <li>Built an automated PR reviewer that detects vulnerabilities and analyzes code quality with intelligent fix suggestions.</li>
              <li>Wired up a CI pipeline with GitHub Actions, Bandit, and Semgrep to block high-severity issues before merge.</li>
              <li>Shipped an analytics dashboard visualizing severity trends, file-level heatmaps, and scan history.</li>
            </ul>
            <div className="vt-proj-results">
              <div>
                <div className="vt-proj-result-num">50%</div>
                <div className="vt-proj-result-label">Less review time</div>
              </div>
              <div>
                <div className="vt-proj-result-num">40%</div>
                <div className="vt-proj-result-label">Higher detection rate</div>
              </div>
              <div>
                <div className="vt-proj-result-num">0</div>
                <div className="vt-proj-result-label">Critical flaws shipped</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="vt-section">
        <div className="vt-eyebrow">SKILL_INDEX</div>
        <h2 className="vt-section-head">Toolkit</h2>
        <div className="vt-skill-groups">
          {skillGroups.map((g) => (
            <Reveal key={g.label}>
              <div>
                <div className="vt-skill-group-label">{g.label}</div>
                <div className="vt-skill-chips">
                  {g.items.map((it) => (
                    <span className="vt-chip" key={it}>{it}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="vt-section vt-section-alt">
        <div className="vt-eyebrow">CREDENTIALS</div>
        <h2 className="vt-section-head">Education</h2>
        {education.map((e) => (
          <Reveal key={e.school + e.meta}>
            <div className="vt-edu-row">
              <div>
                <div className="vt-edu-school">{e.school}</div>
                <div className="vt-edu-detail">{e.detail}</div>
              </div>
              <div className="vt-edu-meta">{e.meta}</div>
            </div>
          </Reveal>
        ))}
        <Reveal>
          <div className="vt-cert-row">
            {["Product Management Certificate", "System Design Certificate", "SpotLight Award — Verizon"].map((c) => (
              <span className="vt-cert-chip" key={c}><CheckCircle2 size={13} /> {c}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="vt-footer">
        <div className="vt-eyebrow">CONNECT</div>
        <div className="vt-footer-head">Let's build something secure and fast.</div>
        <div className="vt-footer-links">
          <a className="vt-footer-link" href="mailto:varsha1999tanti@gmail.com"><Mail size={15} /> varsha1999tanti@gmail.com</a>
          <a className="vt-footer-link" href="tel:+916296547521"><Phone size={15} /> +91 62965 47521</a>
          <a className="vt-footer-link" href="https://www.linkedin.com/in/varsha-tanti-7170b118b" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
          <a className="vt-footer-link" href="https://github.com/varshaaCodes" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
        </div>
        <div className="vt-footer-bottom">© {new Date().getFullYear()} Varsha Tanti · Built with React</div>
      </footer>
    </div>
  );
}
