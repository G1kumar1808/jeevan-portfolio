import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  "About",
  "Skills",
  "Projects",
  "Achievements",
  "Certifications",
  "Contact",
];

const SKILLS = {
  Languages: ["Java", "C", "C++", "JavaScript", "Python", "SQL"],
  "Web Tech": [
    "React.js",
    "Node.js",
    "Express.js",
    "HTML5",
    "CSS3",
    "REST APIs",
  ],
  "Cloud & Tools": [
    "AWS EC2",
    "AWS RDS",
    "IAM",
    "CloudWatch",
    "Git",
    "GitHub",
    "Linux",
    "VS Code",
  ],
  "Core CS": ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
};

const SKILL_COLORS = {
  Languages: {
    bg: "rgba(99,102,241,0.15)",
    border: "rgba(99,102,241,0.5)",
    text: "#818cf8",
  },
  "Web Tech": {
    bg: "rgba(20,184,166,0.15)",
    border: "rgba(20,184,166,0.5)",
    text: "#2dd4bf",
  },
  "Cloud & Tools": {
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.5)",
    text: "#fbbf24",
  },
  "Core CS": {
    bg: "rgba(236,72,153,0.12)",
    border: "rgba(236,72,153,0.5)",
    text: "#f472b6",
  },
};

const PROJECTS = [
  {
    title: "Happy Tails",
    emoji: "🐾",
    tagline: "Pet Marketplace & Event Booking Platform",
    desc: "A full-stack pet accessory marketplace enabling seamless pet event bookings. Features role-based dashboards for Admins, Users, and Service Providers — all backed by optimized MongoDB queries and a clean MVC architecture.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    gradient: "from-violet-600 to-indigo-600",
    accent: "#818cf8",
    glow: "rgba(99,102,241,0.3)",
    github: "https://github.com/jeevankumar-y",
    live: null,
  },
  {
    title: "Secure Task Manager",
    emoji: "☁️",
    tagline: "Cloud-Native Task System on AWS",
    desc: "A production-grade cloud task management system with JWT stateless authentication, EC2 deployment, RDS persistence, and IAM least-privilege access control. Real-time health monitoring via CloudWatch.",
    stack: ["AWS EC2", "AWS RDS", "Node.js", "JWT"],
    gradient: "from-amber-500 to-orange-600",
    accent: "#fbbf24",
    glow: "rgba(245,158,11,0.3)",
    github: "https://github.com/jeevankumar-y",
    live: null,
  },
  {
    title: "Fake News Detector",
    emoji: "🔍",
    tagline: "Multimodal AI Detection System",
    desc: "A cutting-edge multimodal system detecting fake news across text, images, graphs, and tables. Uses XLM-RoBERTa for multilingual NLP, ELA + ResNet-50 for image forgery, and CLIP for semantic image-text consistency.",
    stack: ["PyTorch", "HuggingFace", "OpenCV", "ResNet-50", "CLIP"],
    gradient: "from-teal-500 to-cyan-600",
    accent: "#2dd4bf",
    glow: "rgba(20,184,166,0.3)",
    github: "https://github.com/jeevankumar-y",
    live: null,
  },
];

const ACHIEVEMENTS = [
  {
    icon: "🏆",
    title: "190+ LeetCode Problems",
    sub: "Arrays, Dynamic Programming, Trees & more",
    color: "#fbbf24",
  },
  {
    icon: "🥇",
    title: "Gold Medal — IMO",
    sub: "International Mathematics Olympiad (School Level)",
    color: "#f59e0b",
  },
  {
    icon: "🥈",
    title: "Silver Medal — NSO",
    sub: "National Science Olympiad (School Level)",
    color: "#94a3b8",
  },
];

const CERTS = [
  {
    title: "Full Stack Web Development Bootcamp",
    org: "Udemy",
    icon: "🌐",
    color: "#818cf8",
  },
  {
    title: "100 Days of Code — Python Pro Bootcamp",
    org: "Udemy",
    icon: "🐍",
    color: "#2dd4bf",
  },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function RevealSection({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(5,5,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
        padding: "0 clamp(16px,4vw,48px)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 18,
            fontWeight: 700,
            background: "linear-gradient(135deg,#818cf8,#2dd4bf)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          JK.dev
        </span>
        {/* Desktop */}
        <div style={{ display: "flex", gap: 8 }} className="desktop-nav">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color:
                  active === l.toLowerCase()
                    ? "#818cf8"
                    : "rgba(255,255,255,0.55)",
                fontSize: 13,
                fontFamily: "'Space Mono',monospace",
                letterSpacing: "0.04em",
                padding: "6px 14px",
                borderRadius: 6,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#c7d2fe")}
              onMouseLeave={(e) =>
                (e.target.style.color =
                  active === l.toLowerCase()
                    ? "#818cf8"
                    : "rgba(255,255,255,0.55)")
              }
            >
              {l}
            </button>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("Contact");
            }}
            style={{
              background: "linear-gradient(135deg,#6366f1,#2dd4bf)",
              color: "#fff",
              borderRadius: 8,
              padding: "7px 18px",
              fontSize: 13,
              fontFamily: "'Space Mono',monospace",
              textDecoration: "none",
              fontWeight: 700,
              marginLeft: 8,
            }}
          >
            Hire Me
          </a>
        </div>
        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            padding: 4,
          }}
          className="mobile-burger"
        >
          <div
            style={{
              width: 24,
              height: 2,
              background: "#818cf8",
              marginBottom: 5,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              background: "#818cf8",
              marginBottom: 5,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              background: "#818cf8",
              borderRadius: 2,
            }}
          />
        </button>
      </div>
      {menuOpen && (
        <div
          style={{
            background: "rgba(5,5,15,0.97)",
            padding: "16px 24px 24px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                display: "block",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontFamily: "'Space Mono',monospace",
                padding: "10px 0",
                width: "100%",
                textAlign: "left",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      setPct((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 200,
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: "linear-gradient(90deg,#6366f1,#2dd4bf)",
          transition: "width 0.1s",
        }}
      />
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {[
        { top: "10%", left: "5%", size: 420, color: "rgba(99,102,241,0.07)" },
        { top: "60%", right: "5%", size: 360, color: "rgba(20,184,166,0.06)" },
        { top: "35%", left: "45%", size: 300, color: "rgba(139,92,246,0.05)" },
      ].map((o, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            top: o.top,
            left: o.left,
            right: o.right,
            animation: `floatOrb ${7 + i * 2}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function SocialLink({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        borderRadius: 10,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.7)",
        textDecoration: "none",
        fontSize: 20,
        transition: "all 0.2s",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(99,102,241,0.2)";
        e.currentTarget.style.borderColor = "#6366f1";
        e.currentTarget.style.color = "#818cf8";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {icon}
    </a>
  );
}

function Badge({ text, color = "#818cf8", bg = "rgba(99,102,241,0.15)" }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 11,
        fontFamily: "'Space Mono',monospace",
        padding: "3px 10px",
        borderRadius: 20,
        color,
        background: bg,
        border: `1px solid ${color}40`,
        fontWeight: 600,
        letterSpacing: "0.03em",
      }}
    >
      {text}
    </span>
  );
}

function SectionHeading({ label, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <div
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "#818cf8",
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        — {label} —
      </div>
      <h2
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: "clamp(28px,5vw,44px)",
          fontWeight: 800,
          color: "#f1f5f9",
          margin: "0 0 14px",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 15,
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── SECTIONS ───────────────────────────────────────────────────────────────

function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["Full Stack Developer", "AI/ML Enthusiast", "Problem Solver"];
  useEffect(() => {
    let ri = 0,
      ci = 0,
      deleting = false;
    const tick = () => {
      const cur = roles[ri];
      if (!deleting) {
        setTyped(cur.slice(0, ci + 1));
        ci++;
        if (ci === cur.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        setTyped(cur.slice(0, ci - 1));
        ci--;
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 45 : 80);
    };
    const t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px clamp(16px,6vw,80px) 40px",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Greeting badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#22c55e",
              display: "inline-block",
              boxShadow: "0 0 8px #22c55e",
            }}
          />
          <span
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 12,
              color: "#a5b4fc",
              letterSpacing: "0.06em",
            }}
          >
            Available for opportunities
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "clamp(36px,8vw,76px)",
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "0 0 10px",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#f1f5f9" }}>Yerram </span>
          <span
            style={{
              background: "linear-gradient(135deg,#818cf8 20%,#2dd4bf 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Jeevankumar
          </span>
        </h1>

        <div
          style={{
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "clamp(14px,2.5vw,20px)",
              color: "#2dd4bf",
            }}
          >
            {typed}
            <span
              style={{
                animation: "blink 1s step-end infinite",
                color: "#818cf8",
              }}
            >
              |
            </span>
          </span>
        </div>

        <p
          style={{
            color: "rgba(255,255,255,0.52)",
            fontSize: "clamp(14px,2vw,17px)",
            lineHeight: 1.75,
            maxWidth: 600,
            margin: "0 auto 40px",
          }}
        >
          B.Tech CSE student at IIIT Sri City crafting scalable web applications
          and intelligent systems. Bridging the gap between elegant frontend
          experiences and robust cloud-native backends.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 44,
          }}
        >
          <button
            onClick={() => scrollTo("projects")}
            style={{
              background: "linear-gradient(135deg,#6366f1,#4f46e5)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "13px 28px",
              fontSize: 14,
              fontFamily: "'Space Mono',monospace",
              cursor: "pointer",
              fontWeight: 700,
              transition: "all 0.2s",
              boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
            }}
            onMouseEnter={(e) =>
              (e.target.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            View Projects →
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              padding: "13px 28px",
              fontSize: 14,
              fontFamily: "'Space Mono',monospace",
              textDecoration: "none",
              fontWeight: 700,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Download CV ↓
          </a>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              background: "rgba(45,212,191,0.1)",
              color: "#2dd4bf",
              border: "1px solid rgba(45,212,191,0.3)",
              borderRadius: 10,
              padding: "13px 28px",
              fontSize: 14,
              fontFamily: "'Space Mono',monospace",
              cursor: "pointer",
              fontWeight: 700,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(45,212,191,0.18)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(45,212,191,0.1)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Contact Me
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <SocialLink
            href="https://www.linkedin.com/in/jeevankumar-yerram-5a5442284/"
            label="LinkedIn"
            icon="💼"
          />
          <SocialLink
            href="https://github.com/G1kumar1808"
            label="GitHub"
            icon="🐙"
          />
          <SocialLink
            href="https://leetcode.com/u/g1kumar1808/"
            label="LeetCode"
            icon="⚡"
          />
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: 1,
              height: 40,
              background:
                "linear-gradient(to bottom,rgba(99,102,241,0.5),transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { num: "7.38", label: "CGPA", suffix: "" },
    { num: "190", label: "LeetCode", suffix: "+" },
    { num: "3", label: "Projects", suffix: "" },
    { num: "2", label: "Certs", suffix: "" },
  ];
  return (
    <section id="about" style={{ padding: "100px clamp(16px,6vw,80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeading
            label="Who I Am"
            title="About Me"
            sub="Building tomorrow's web, today."
          />
        </RevealSection>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <RevealSection delay={100}>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "36px",
                backdropFilter: "blur(12px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: "linear-gradient(90deg,#6366f1,#2dd4bf)",
                }}
              />
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 11,
                  color: "#818cf8",
                  letterSpacing: "0.12em",
                  marginBottom: 16,
                }}
              >
                // about.js
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.85,
                  fontSize: 15,
                  marginBottom: 20,
                }}
              >
                I'm a{" "}
                <span style={{ color: "#818cf8", fontWeight: 600 }}>
                  B.Tech CSE student at IIIT Sri City
                </span>{" "}
                passionate about building software that matters. My work sits at
                the intersection of full-stack engineering and applied AI — from
                production-grade cloud systems to multimodal machine learning
                pipelines.
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.85,
                  fontSize: 15,
                  marginBottom: 28,
                }}
              >
                I thrive on solving ambiguous problems with clean, scalable
                code. Whether it's orchestrating microservices on AWS or
                fine-tuning transformer models, I bring the same rigor and
                curiosity to every layer of the stack.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "IIIT Sri City",
                  "Full Stack",
                  "Machine Learning",
                  "Cloud-Native",
                  "Open Source",
                ].map((t) => (
                  <Badge key={t} text={t} />
                ))}
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={200}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    padding: "28px 20px",
                    textAlign: "center",
                    backdropFilter: "blur(12px)",
                    transition: "transform 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: 36,
                      fontWeight: 900,
                      background: "linear-gradient(135deg,#818cf8,#2dd4bf)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.num}
                    {s.suffix}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: 12,
                      fontFamily: "'Space Mono',monospace",
                      marginTop: 6,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "100px clamp(16px,6vw,80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeading
            label="Expertise"
            title="Technical Skills"
            sub="A versatile toolkit spanning the full development spectrum."
          />
        </RevealSection>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 24,
          }}
        >
          {Object.entries(SKILLS).map(([cat, items], ci) => {
            const c = SKILL_COLORS[cat];
            return (
              <RevealSection key={cat} delay={ci * 80}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${c.border}30`,
                    borderRadius: 18,
                    padding: 28,
                    backdropFilter: "blur(12px)",
                    height: "100%",
                    transition: "all 0.25s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = c.border;
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.background = c.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${c.border}30`;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: 15,
                      fontWeight: 800,
                      color: c.text,
                      marginBottom: 18,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {cat}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {items.map((sk) => (
                      <span
                        key={sk}
                        style={{
                          fontSize: 12,
                          fontFamily: "'Space Mono',monospace",
                          padding: "5px 12px",
                          borderRadius: 20,
                          background: `${c.text}15`,
                          color: c.text,
                          border: `1px solid ${c.text}30`,
                          fontWeight: 600,
                        }}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "100px clamp(16px,6vw,80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeading
            label="My Work"
            title="Featured Projects"
            sub="From cloud infrastructure to AI pipelines — built to solve real problems."
          />
        </RevealSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {PROJECTS.map((p, i) => (
            <RevealSection key={p.title} delay={i * 100}>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 20,
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "5fr 3fr" : "3fr 5fr",
                  transition: "all 0.3s",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${p.accent}50`;
                  e.currentTarget.style.boxShadow = `0 12px 48px ${p.glow}`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Content */}
                <div
                  style={{ order: i % 2 === 0 ? 0 : 1, padding: "36px 40px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 16,
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{p.emoji}</span>
                    <Badge
                      text={`Project 0${i + 1}`}
                      color={p.accent}
                      bg={`${p.accent}15`}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: 26,
                      fontWeight: 800,
                      color: "#f1f5f9",
                      margin: "0 0 6px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      color: p.accent,
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 12,
                      marginBottom: 16,
                    }}
                  >
                    {p.tagline}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.58)",
                      lineHeight: 1.75,
                      fontSize: 14,
                      marginBottom: 24,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 24,
                    }}
                  >
                    {p.stack.map((s) => (
                      <Badge
                        key={s}
                        text={s}
                        color={p.accent}
                        bg={`${p.accent}12`}
                      />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 18px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#e2e8f0",
                        fontSize: 12,
                        fontFamily: "'Space Mono',monospace",
                        textDecoration: "none",
                        fontWeight: 700,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,0.12)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,0.06)")
                      }
                    >
                      🐙 GitHub
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "8px 18px",
                          borderRadius: 8,
                          background: `linear-gradient(135deg,${p.accent}90,${p.accent}60)`,
                          color: "#fff",
                          fontSize: 12,
                          fontFamily: "'Space Mono',monospace",
                          textDecoration: "none",
                          fontWeight: 700,
                        }}
                      >
                        🚀 Live Demo
                      </a>
                    )}
                  </div>
                </div>
                {/* Visual accent side */}
                <div
                  style={{
                    order: i % 2 === 0 ? 1 : 0,
                    background: `linear-gradient(135deg,${p.accent}10,${p.accent}05)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 200,
                    borderLeft:
                      i % 2 === 0 ? `1px solid rgba(255,255,255,0.06)` : "none",
                    borderRight:
                      i % 2 !== 0 ? `1px solid rgba(255,255,255,0.06)` : "none",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      fontSize: 80,
                      opacity: 0.15,
                      position: "absolute",
                      filter: "blur(2px)",
                    }}
                  >
                    {p.emoji}
                  </div>
                  <div style={{ position: "relative", textAlign: "center" }}>
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 20,
                        background: `linear-gradient(135deg,${p.accent}30,${p.accent}10)`,
                        border: `2px solid ${p.accent}40`,
                        margin: "0 auto 12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 36,
                      }}
                    >
                      {p.emoji}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Mono',monospace",
                        fontSize: 10,
                        color: p.accent,
                        letterSpacing: "0.1em",
                      }}
                    >
                      FEATURED
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section
      id="achievements"
      style={{ padding: "100px clamp(16px,6vw,80px)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeading label="Recognition" title="Achievements" />
        </RevealSection>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 24,
          }}
        >
          {ACHIEVEMENTS.map((a, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 18,
                  padding: "32px 28px",
                  textAlign: "center",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.25s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = `${a.color}50`;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${a.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg,${a.color},transparent)`,
                  }}
                />
                <div style={{ fontSize: 40, marginBottom: 16 }}>{a.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: 17,
                    color: "#f1f5f9",
                    marginBottom: 8,
                  }}
                >
                  {a.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {a.sub}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
        {/* Certifications merged */}
        <div style={{ marginTop: 64 }}>
          <RevealSection>
            <div
              style={{
                textAlign: "center",
                fontFamily: "'Space Mono',monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "#818cf8",
                marginBottom: 32,
                textTransform: "uppercase",
              }}
            >
              — Certifications —
            </div>
          </RevealSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 20,
            }}
          >
            {CERTS.map((c, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    alignItems: "center",
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${c.color}25`,
                    borderRadius: 16,
                    padding: "22px 24px",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${c.color}55`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${c.color}25`;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: `${c.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#f1f5f9",
                        marginBottom: 4,
                      }}
                    >
                      {c.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Mono',monospace",
                        fontSize: 11,
                        color: c.color,
                      }}
                    >
                      {c.org}
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };
  return (
    <section
      id="contact"
      style={{ padding: "100px clamp(16px,6vw,80px) 60px" }}
    >
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeading
            label="Get In Touch"
            title="Let's Build Something"
            sub="Open to full-time roles, internships, and exciting collaborations."
          />
        </RevealSection>
        <RevealSection delay={100}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 32,
            }}
          >
            {[
              {
                icon: "✉️",
                label: "Email",
                val: "jeevankumar.y23@iiits.in",
                href: "mailto:jeevankumar.y23@iiits.in",
              },
              {
                icon: "💼",
                label: "LinkedIn",
                val: "jeevankumar-y",
                href: "https://www.linkedin.com/in/jeevankumar-yerram-5a5442284/",
              },
              {
                icon: "🐙",
                label: "GitHub",
                val: "jeevankumar-y",
                href: "https://github.com/G1kumar1808",
              },
              {
                icon: "⚡",
                label: "LeetCode",
                val: "190+ problems solved",
                href: "https://leetcode.com/u/g1kumar1808/",
              },
            ].map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                  padding: "18px 20px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 10,
                      color: "#818cf8",
                      marginBottom: 2,
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}
                  >
                    {c.val}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {!sent ? (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "36px",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                {[
                  { key: "name", placeholder: "Your name", label: "Name" },
                  {
                    key: "email",
                    placeholder: "your@email.com",
                    label: "Email",
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label
                      style={{
                        fontFamily: "'Space Mono',monospace",
                        fontSize: 10,
                        color: "#818cf8",
                        letterSpacing: "0.08em",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      {f.label.toUpperCase()}
                    </label>
                    <input
                      value={form[f.key]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [f.key]: e.target.value }))
                      }
                      placeholder={f.placeholder}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 10,
                        padding: "12px 14px",
                        color: "#f1f5f9",
                        fontSize: 14,
                        fontFamily: "'Space Mono',monospace",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                      onBlur={(e) =>
                        (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                      }
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 10,
                    color: "#818cf8",
                    letterSpacing: "0.08em",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  MESSAGE
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    color: "#f1f5f9",
                    fontSize: 14,
                    fontFamily: "'Space Mono',monospace",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>
              <button
                onClick={submit}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg,#6366f1,#4f46e5)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "14px",
                  fontSize: 14,
                  fontFamily: "'Space Mono',monospace",
                  cursor: "pointer",
                  fontWeight: 700,
                  transition: "all 0.2s",
                  boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Send Message →
              </button>
            </div>
          ) : (
            <div
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: 20,
                padding: "48px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  color: "#22c55e",
                  marginBottom: 8,
                }}
              >
                Message Sent!
              </h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
            </div>
          )}
        </RevealSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "28px clamp(16px,6vw,80px)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          color: "rgba(255,255,255,0.25)",
          fontSize: 12,
          fontFamily: "'Space Mono',monospace",
        }}
      >
        Designed & Built by{" "}
        <span style={{ color: "#818cf8" }}>Yerram Jeevankumar</span> ·{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "skills",
      "projects",
      "achievements",
      "contact",
    ];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #05050f; color: #f1f5f9; font-family: 'Space Mono', monospace; scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05050f; }
        ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 2px; }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes floatOrb { from { transform: translateY(0) scale(1); } to { transform: translateY(-30px) scale(1.05); } }
        @keyframes scrollPulse { 0%,100% { opacity:0.3 } 50% { opacity:0.9 } }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
          section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="grid-template-columns: 5fr 3fr"],
          section > div > div > div[style*="grid-template-columns: 5fr 3fr"],
          section > div > div[style*="grid-template-columns: 3fr 5fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <ScrollProgress />
      <FloatingOrbs />
      <Navbar active={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
