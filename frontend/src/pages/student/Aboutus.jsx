import { Link } from "react-router-dom";
import { styles } from "../../styles/aboutUsStyles";
import gekleangImg from "../../assets/gekleang.jpg";

export default function AboutUs() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dashboardPath = user
    ? user.role_id === 1 || user.role_id === 3
      ? "/admin/dashboard"
      : "/student/dashboard"
    : "/login";
  const backLabel = user ? "← Back to Dashboard" : "← Back to Login";
  const stats = [
    { value: "AI-Powered", label: "Career Guidance" },
    { value: "Grade 12", label: "Target Students" },
    { value: "4+", label: "Core Features" },
    { value: "Smart", label: "Recommendations" },
  ];

  const features = [
    {
      icon: "🤖",
      title: "AI Career Recommendation",
      description:
        "AhGib uses artificial intelligence to analyze student interests, skills, and academic performance to suggest suitable career paths.",
      gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    },
    {
      icon: "🎓",
      title: "University Recommendation",
      description:
        "Students can explore suitable universities and majors based on their career goals.",
      gradient: "linear-gradient(135deg, #3B82F6, #06B6D4)",
    },
    {
      icon: "📊",
      title: "Student Assessment",
      description:
        "Students complete assessments that help identify their strengths and future opportunities.",
      gradient: "linear-gradient(135deg, #10B981, #34D399)",
    },
    {
      icon: "🔐",
      title: "Secure Platform",
      description:
        "AhGib provides secure authentication and role-based access for students and administrators.",
      gradient: "linear-gradient(135deg, #F59E0B, #F97316)",
    },
  ];

  const technologies = [
    { name: "React", color: "#61DAFB" },
    { name: "Node.js", color: "#68A063" },
    { name: "Express.js", color: "#9CA3AF" },
    { name: "PostgreSQL", color: "#336791" },
    { name: "JWT Authentication", color: "#F59E0B" },
    { name: "OpenAI API", color: "#10B981" },
  ];

  const team = [
    {
      name: "Mong Gekleang",
      role: "Backend Developer",
      bio: "Focused on backend development and database design for AhGib.",
      image: gekleangImg,
      email: "monggekleang.mong@student.cadt.edu.kh",
    },
    {
      name: "Ponha Roth",
      role: "Frontend Developer",
      bio: "Works on frontend development and UI/UX for the platform.",
      image: gekleangImg,
      email: "ponharoth.nin@student.cadt.edu.kh",
    },
    {
      name: "Vanny Deth",
      role: "AI & System Design",
      bio: "Contributes to system design and AI-powered recommendation logic.",
      image: gekleangImg,
      email: "vannydet.no@student.cadt.edu.kh",
    },
  ];

  return (
    <div style={styles.container}>
      {/* embedded CSS for animations & hover effects */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .about-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .about-team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(79,70,229,0.12);
        }
        .about-team-card:hover .about-team-image-wrap {
          transform: scale(1.08);
          box-shadow: 0 12px 40px rgba(99,102,241,0.4);
        }
        .about-team-card:hover .about-team-email {
          background: linear-gradient(135deg, #E0E7FF, #DDD6FE);
          border-color: #A5B4FC;
          color: #4F46E5;
        }
        .about-tech-badge:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .about-stat-item {
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }
        .about-stat-item:nth-child(1) { animation-delay: 0.1s; }
        .about-stat-item:nth-child(2) { animation-delay: 0.2s; }
        .about-stat-item:nth-child(3) { animation-delay: 0.3s; }
        .about-stat-item:nth-child(4) { animation-delay: 0.4s; }
        .about-hero-badge {
          animation: slideDown 0.5s ease forwards;
        }
        .about-section {
          animation: fadeInUp 0.6s ease forwards;
        }
      `}</style>

      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <Link to={dashboardPath} style={styles.backLink}>{backLabel}</Link>
        <div style={styles.heroBg} />
        <div style={styles.heroShape1} />
        <div style={styles.heroShape2} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.heroBadge} className="about-hero-badge">
            Welcome to AhGib
          </span>
          <h1 style={styles.heroTitle}>
            About <span style={styles.heroTitleAccent}>AhGib</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Helping Grade 12 students discover their future through
            AI-powered career guidance.
          </p>
          <div style={styles.heroActions}>
            <a href="#features" style={styles.heroBtnPrimary}>
              Explore Features
            </a>
            <a href="#contact" style={styles.heroBtnSecondary}>
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={styles.statsBar}>
        {stats.map((stat) => (
          <div key={stat.label} className="about-stat-item" style={styles.statItem}>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section style={styles.section} className="about-section">
        <div style={styles.sectionInner}>
          <div style={styles.sectionNumber}>01</div>
          <h2 style={styles.sectionHeading}>Who We Are</h2>
          <div style={styles.divider} />
          <p style={styles.sectionText}>
            AhGib is an AI-powered career guidance platform designed to help
            Grade 12 students make better decisions about their education and
            future careers. By combining student assessments, academic
            information, and artificial intelligence, AhGib provides
            personalized recommendations for career paths and universities.
          </p>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section style={styles.missionWrap} className="about-section">
        <div style={styles.missionCard}>
          <div style={styles.missionIcon}>🎯</div>
          <h2 style={styles.missionHeading}>Our Mission</h2>
          <p style={styles.missionText}>
            Our mission is to support students in choosing the right career
            direction by providing accessible, intelligent, and personalized
            guidance.
          </p>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" style={styles.section} className="about-section">
        <div style={styles.sectionInner}>
          <div style={styles.sectionNumber}>02</div>
          <h2 style={styles.sectionHeading}>Our Features</h2>
          <div style={styles.divider} />

          <div style={styles.featureGrid}>
            {features.map((item) => (
              <div key={item.title} className="about-card" style={styles.featureCard}>
                <div style={{ ...styles.featureIcon, background: item.gradient }}>
                  {item.icon}
                </div>
                <h3 style={styles.featureTitle}>{item.title}</h3>
                <p style={styles.featureText}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section style={styles.sectionAlt} className="about-section">
        <div style={styles.sectionInner}>
          <div style={styles.sectionNumber}>03</div>
          <h2 style={styles.sectionHeading}>Meet Our Team</h2>
          <div style={styles.divider} />
          <p style={styles.sectionText}>
            The people behind AhGib, building tools to help students plan
            their future.
          </p>

          <div style={styles.teamGrid}>
            {team.map((member) => (
              <div key={member.name} className="about-team-card" style={styles.teamCard}>
                <div style={styles.teamImageWrap} className="about-team-image-wrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    style={styles.teamImage}
                  />
                </div>
                <h3 style={styles.teamName}>{member.name}</h3>
                <div style={styles.teamRole}>{member.role}</div>
                <p style={styles.teamBio}>{member.bio}</p>
                <a href={`mailto:${member.email}`} style={styles.teamEmail} className="about-team-email">
                  ✉️ {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY ===== */}
      <section style={styles.section} className="about-section">
        <div style={styles.sectionInner}>
          <div style={styles.sectionNumber}>04</div>
          <h2 style={styles.sectionHeading}>Technology Stack</h2>
          <div style={styles.divider} />

          <div style={styles.techContainer}>
            {technologies.map((tech) => (
              <span
                key={tech.name}
                className="about-tech-badge"
                style={styles.techBadge(tech.color)}
              >
                <span style={styles.techDot(tech.color)} />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISION ===== */}
      <section style={styles.sectionAlt} className="about-section">
        <div style={styles.sectionInner}>
          <div style={styles.sectionNumber}>05</div>
          <h2 style={styles.sectionHeading}>Future Vision</h2>
          <div style={styles.divider} />
          <p style={styles.sectionText}>
            In the future, AhGib aims to expand with more advanced AI
            recommendations, scholarship information, and additional tools to
            support students throughout their education journey.
          </p>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={styles.section} className="about-section">
        <div style={styles.contactCard}>
          <div style={styles.contactIconLarge}>💬</div>
          <h2 style={styles.contactHeading}>Get In Touch</h2>
          <p style={styles.contactSubtitle}>
            Have questions or feedback? We'd love to hear from you.
          </p>

          <div style={styles.contactGrid}>
            <div style={styles.contactItem}>
              <div style={styles.contactItemIcon}>📧</div>
              <div>
                <div style={styles.contactLabel}>Email</div>
                {team.map((member) => (
                  <div key={member.email} style={styles.contactValue}>
                    <a href={`mailto:${member.email}`} style={styles.contactLink}>
                      {member.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.contactItem}>
              <div style={styles.contactItemIcon}>📞</div>
              <div>
                <div style={styles.contactLabel}>Phone</div>
                <a href="tel:+85587356899" style={styles.contactLink}>
                  +855 87 356 899
                </a>
              </div>
            </div>

            <div style={styles.contactItem}>
              <div style={styles.contactItemIcon}>📍</div>
              <div>
                <div style={styles.contactLabel}>Location</div>
                <div style={styles.contactValue}>
                  Cambodia Academy of Digital Technology, Phnom Penh
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerBrand}>AhGib</div>
          <div style={styles.footerText}>
            © 2026 AhGib &mdash; Cambodia Academy of Digital Technology
          </div>
        </div>
      </footer>
    </div>
  );
}