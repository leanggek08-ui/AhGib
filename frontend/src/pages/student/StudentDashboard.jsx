import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { styles } from "../../styles/studentDashboardStyles";

// NOTE: stats, the sample "Career Report" preview, and testimonials below are
// placeholder demo content carried over from the Figma design (it was written
// for a Malaysian audience — "RM", Malaysian universities, etc). Swap these
// for real numbers/quotes (and Cambodia-specific copy) once you have them.

const benefits = [
  {
    icon: "🧠",
    title: "AI-Powered Insights",
    desc: "Our advanced AI analyzes your personality, strengths, and interests to deliver precision-matched career guidance.",
    bg: "#F1EFFA",
  },
  {
    icon: "🎓",
    title: "Universities at a Glance",
    desc: "Explore a comprehensive database of universities with detailed programme breakdowns.",
    bg: "#DBEAFE",
  },
  {
    icon: "🎯",
    title: "Precision Matching",
    desc: "Get matched to careers aligned with your unique personality profile — with accuracy scores and AI explanations.",
    bg: "#D1FAE5",
  },
  {
    icon: "📈",
    title: "Real Market Data",
    desc: "Career recommendations backed by current job market trends, salary benchmarks, and demand data.",
    bg: "#FEF3C7",
  },
];

const steps = [
  {
    num: "01",
    title: "Take the Assessment",
    desc: "Answer a short set of AI-curated questions about your personality, interests, and goals.",
  },
  {
    num: "02",
    title: "Get Your AI Report",
    desc: "Receive a detailed personality analysis with your top career matches, scores, and a personalized explanation.",
  },
  {
    num: "03",
    title: "Explore Universities",
    desc: "Browse universities and programmes that best match your chosen career path and academic strengths.",
  },
  {
    num: "04",
    title: "Decide with Confidence",
    desc: "Use your personalized insights to make an informed, confident decision about your academic and career future.",
  },
];

const stats = [
  { value: "15,000+", label: "Students Guided" },
  { value: "500+", label: "Universities Listed" },
  { value: "200+", label: "Careers Mapped" },
  { value: "94%", label: "Satisfaction Rate" },
];

const testimonials = [
  {
    name: "Haziq Azri",
    role: "Form 5 Student",
    text: "AhGib helped me realize I'm naturally suited for data science. I now know exactly which programmes to target. The assessment was shockingly accurate!",
  },
  {
    name: "Nurul Ain",
    role: "Year 1, Computer Science",
    text: "I was completely confused about which major to pick. After the AhGib assessment, I had a clear, confident direction. Best tool I've ever used as a student.",
  },
  {
    name: "Ryan Khor",
    role: "Grade 12 Graduate",
    text: "The career report identified strengths I never even knew I had. The university recommendations were spot-on and gave me real, actionable next steps.",
  },
];

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = user?.username || "there";

  const [report, setReport] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem("latestCareerReport");
    if (cached) {
      try {
        setReport(JSON.parse(cached));
      } catch {
        setReport(null);
      }
    }
  }, []);

  return (
    <StudentLayout>
      <style>{`
        .benefit-card {
          transition: all 0.2s ease;
        }
        .benefit-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px -12px rgba(83,19,192,.18);
          border-color: #C4B5FD;
        }
      `}</style>
      {/* ===== Hero ===== */}
      <section style={styles.hero}>
        <div style={styles.heroBlob1} />
        <div style={styles.heroBlob2} />

        <div style={styles.heroInner}>
          <div>
            <span style={styles.eyebrowPill}>
              <span style={styles.eyebrowText}>
                ✨ AI-Powered Career Guidance
              </span>
            </span>

            <h1 style={styles.greeting}>
              Welcome back, {firstName} — discover your{" "}
              <span style={styles.greetingAccent}>perfect career path</span>
            </h1>

            <p style={styles.subtitle}>
              AhGib uses advanced AI to help Grade 12 and university students
              uncover their ideal careers, explore universities, and make
              confident decisions about their future.
            </p>

            <div style={styles.heroActions}>
              <Link
                to="/student/features"
                state={{ mode: "assessment" }}
                style={styles.primaryBtn}
              >
                ✨ Start Free Assessment
              </Link>
              <Link to="/student/features" style={styles.ghostLink}>
                ▶ Explore Universities
              </Link>
              <Link to="/profile" style={styles.ghostLink}>
                👤 My Profile
              </Link>
            </div>

            <div style={styles.statsRow}>
              {stats.map((s) => (
                <div key={s.label}>
                  <p style={styles.statValue}>{s.value}</p>
                  <p style={styles.statLabel}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.glassCol}>
  {report ? (
    <div style={styles.glassCard}>
      <div style={styles.glassCardHeadRow}>
        <div style={styles.glassIcon}>🧠</div>
        <div>
          <p style={styles.glassTitle}>Your Career Report</p>
          <p style={styles.glassSubtitle}>
            {report.summary ? report.summary.slice(0, 60) + "…" : "Latest results"}
          </p>
        </div>
      </div>

      {(report.top_careers || []).slice(0, 3).map((c) => (
        <div key={c.name} style={styles.matchRow}>
          <span style={styles.matchLabel}>{c.name}</span>
        </div>
      ))}

      <Link
        to="/student/features"
        state={{ mode: "assessment" }}
        style={{ ...styles.ghostLink, marginTop: "12px", display: "inline-block" }}
      >
        Retake Assessment →
      </Link>
    </div>
  ) : (
    <div style={styles.glassCard}>
      <div style={styles.glassCardHeadRow}>
        <div style={styles.glassIcon}>🧠</div>
        <div>
          <p style={styles.glassTitle}>No report yet</p>
          <p style={styles.glassSubtitle}>
            Take your first AI career assessment to see personalized results here.
          </p>
        </div>
      </div>
      <Link
        to="/student/features"
        state={{ mode: "assessment" }}
        style={{ ...styles.primaryBtn, marginTop: "12px", display: "inline-block" }}
      >
        ✨ Start Free Assessment
      </Link>
    </div>
  )}
</div>
        </div>
      </section>

      {/* ===== Why AhGib ===== */}
      <section style={styles.section}>
        <div style={styles.sectionHead}>
          <span style={styles.sectionLabel}>Why AhGib</span>
          <h2 style={styles.sectionTitle}>
            Everything you need to make the
            <br />
            <span style={styles.sectionTitleAccent}>right career choice</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            From AI-powered assessments to comprehensive university search,
            AhGib gives students all the tools they need to make informed,
            confident decisions.
          </p>
        </div>

        <div style={styles.benefitsGrid}>
          {benefits.map((b) => (
            <div key={b.title} style={styles.benefitCard} className="benefit-card">
              <div style={styles.benefitIconWrap(b.bg)}>{b.icon}</div>
              <div style={styles.benefitTitle}>{b.title}</div>
              <p style={styles.benefitDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section style={styles.stepsWrap}>
        <div style={styles.stepsInner}>
          <div style={styles.sectionHead}>
            <span style={styles.sectionLabel}>How It Works</span>
            <h2 style={styles.sectionTitle}>
              From uncertainty to clarity
              <br />
              <span style={styles.sectionTitleAccent}>in 4 simple steps</span>
            </h2>
          </div>

          <div style={styles.stepsGrid}>
            {steps.map((s) => (
              <div key={s.num} style={styles.stepCard} className="benefit-card">
                <span style={styles.stepNum}>{s.num}</span>
                <div style={styles.stepTitle}>{s.title}</div>
                <p style={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section style={styles.section}>
        <div style={styles.sectionHead}>
          <span style={styles.sectionLabel}>Student Stories</span>
          <h2 style={styles.sectionTitle}>
            Trusted by students who've used AhGib
          </h2>
        </div>

        <div style={styles.testimonialsGrid}>
          {testimonials.map((t) => (
            <div key={t.name} style={styles.testimonialCard}>
              <div style={styles.starsRow}>★★★★★</div>
              <p style={styles.testimonialText}>"{t.text}"</p>
              <div style={styles.testimonialFooter}>
                <div style={styles.avatarCircle}>{t.name.charAt(0)}</div>
                <div>
                  <p style={styles.testimonialName}>{t.name}</p>
                  <p style={styles.testimonialRole}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ ...styles.ctaWrap, marginBottom: "-40px"}}>
        <h2 style={styles.ctaTitle}>Ready to discover your future?</h2>
        <p style={styles.ctaText}>
          Join thousands of students who have already found their career
          direction with AhGib. Free to get started.
        </p>
        <div style={styles.ctaActions}>
          <Link
            to="/student/features"
            state={{ mode: "assessment" }}
            style={styles.primaryBtn}
          >
            ✨ Start Free Assessment
          </Link>
          <Link
            to="/student/features"
            style={{ ...styles.ghostLink, color: "rgba(255,255,255,.85)" }}
          >
            Browse Universities →
          </Link>
        </div>
      </section>
    </StudentLayout>
  );
}
