import StudentLayout from "../../layouts/StudentLayout";
import { styles } from "../../styles/aboutUsStyles";
import gekleangImg from "../../assets/gekleang.jpg";

const values = [
  {
    icon: "❤️",
    title: "Student-First",
    text: "Every feature we build starts with one question: does this genuinely help students make better, more confident decisions?",
  },
  {
    icon: "🧠",
    title: "AI-Driven Accuracy",
    text: "Our recommendation logic is built to be continually refined as we gather more data, so guidance gets more accurate over time.",
  },
  {
    icon: "🛡️",
    title: "Privacy & Trust",
    text: "Student data is handled carefully and never sold. We aim to be transparent about what we collect and why.",
  },
  {
    icon: "🌐",
    title: "Inclusive Access",
    text: "AhGib is built to be accessible to every student, regardless of academic background.",
  },
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

export default function AboutUs() {
  return (
    <StudentLayout>
      {/* ===== Hero ===== */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <span style={styles.badgePill}>
            <span style={styles.badgeText}>✨ About AhGib</span>
          </span>
          <h1 style={styles.heroTitle}>
            We believe every student deserves a
            <span style={styles.heroTitleAccent}>clear path forward</span>
          </h1>
          <p style={styles.heroSubtitle}>
            AhGib is an AI-powered career guidance platform built by a small
            team of student developers to help Grade 12 students move from
            uncertainty to confident, well-informed decisions about their
            education and future careers.
          </p>
        </div>
      </section>

      {/* ===== Mission / Vision ===== */}
      <section style={styles.section}>
        <div style={styles.missionVisionGrid}>
          <div style={styles.missionCard}>
            <div style={styles.cardIconWrap(true)}>🎯</div>
            <h2 style={styles.cardTitle(true)}>Our Mission</h2>
            <p style={styles.cardText(true)}>
              To support students in choosing the right career direction by
              providing accessible, intelligent, and personalized guidance —
              combining assessments, academic information, and AI to
              recommend career paths and universities.
            </p>
          </div>
          <div style={styles.visionCard}>
            <div style={styles.cardIconWrap(false)}>💡</div>
            <h2 style={styles.cardTitle(false)}>Our Vision</h2>
            <p style={styles.cardText(false)}>
              A future where no student makes a career or university decision
              based on guesswork — where every young person has access to
              intelligent, personalized career guidance at their fingertips.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section style={styles.sectionAlt}>
        <div style={styles.section}>
          <div style={styles.sectionHead}>
            <span style={styles.badgePill}>
              <span style={styles.badgeText}>✨ Our Values</span>
            </span>
            <h2 style={styles.sectionTitle}>Built on values that matter</h2>
          </div>
          <div style={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} style={styles.valueCard}>
                <div style={styles.valueIconWrap}>{v.icon}</div>
                <div style={styles.valueTitle}>{v.title}</div>
                <p style={styles.valueText}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Who We Are ===== */}
      <section style={styles.section}>
        <div style={styles.sectionNumber}>01 — WHO WE ARE</div>
        <h2 style={styles.sectionHeading}>What AhGib does</h2>
        <div style={styles.divider} />
        <p style={styles.sectionText}>
          AhGib is an AI-powered career guidance platform designed to help
          Grade 12 students make better decisions about their education and
          future careers. By combining student assessments, academic
          information, and artificial intelligence, AhGib provides
          personalized recommendations for career paths and universities.
        </p>
      </section>

      {/* ===== Features ===== */}
      <section id="features" style={styles.sectionAlt}>
        <div style={styles.section}>
          <div style={styles.sectionNumber}>02 — FEATURES</div>
          <h2 style={styles.sectionHeading}>Our Features</h2>
          <div style={styles.divider} />
          <div style={styles.featureGrid}>
            {features.map((item) => (
              <div key={item.title} style={styles.featureCard}>
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

      {/* ===== Team ===== */}
      <section style={styles.section}>
        <div style={styles.sectionHead}>
          <span style={styles.badgePill}>
            <span style={styles.badgeText}>✨ The Team</span>
          </span>
          <h2 style={styles.sectionTitle}>Meet the people behind AhGib</h2>
          <p style={styles.sectionSubtitle}>
            The people behind AhGib, building tools to help students plan
            their future.
          </p>
        </div>

        <div style={styles.teamGrid}>
          {team.map((member) => (
            <div key={member.name} style={styles.teamCard}>
              <div style={styles.teamImageWrap}>
                <img src={member.image} alt={member.name} style={styles.teamImage} />
              </div>
              <h3 style={styles.teamName}>{member.name}</h3>
              <div style={styles.teamRole}>{member.role}</div>
              <p style={styles.teamBio}>{member.bio}</p>
              <a href={`mailto:${member.email}`} style={styles.teamEmail}>
                ✉️ {member.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Technology ===== */}
      <section style={styles.sectionAlt}>
        <div style={styles.section}>
          <div style={styles.sectionNumber}>03 — TECHNOLOGY</div>
          <h2 style={styles.sectionHeading}>Technology Stack</h2>
          <div style={styles.divider} />
          <div style={styles.techContainer}>
            {technologies.map((tech) => (
              <span key={tech.name} style={styles.techBadge(tech.color)}>
                <span style={styles.techDot(tech.color)} />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" style={styles.section}>
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
    </StudentLayout>
  );
}