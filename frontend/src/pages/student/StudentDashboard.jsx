import { Link } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";
import { styles } from "../../styles/studentDashboardStyles";

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <StudentLayout>
      <div style={styles.hero}>
        <div style={styles.heroBlob1} />
        <div style={styles.heroBlob2} />
        <span style={styles.eyebrow}>
          <span style={styles.eyebrowDash} />
          Your Career Journey
        </span>
        <h1 style={styles.greeting}>
          Welcome{user?.username ? `, ${user.username}` : ""} 👋
        </h1>
        <p style={styles.subtitle}>
          Here's where you can pick up your career journey.
        </p>
      </div>

      <div style={styles.grid}>
        <Link
          to="/universities"
          style={styles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 22px 44px -16px rgba(83,19,192,.32)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 14px 34px -16px rgba(83,19,192,.22)";
          }}
        >
          <div style={styles.cardIconWrap("#F1EFFA")}>🎓</div>
          <div style={styles.cardTitle}>Browse Universities</div>
          <p style={styles.cardText}>
            Explore universities available in the system.
          </p>
        </Link>

        <Link
          to="/profile"
          style={styles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 22px 44px -16px rgba(83,19,192,.32)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 14px 34px -16px rgba(83,19,192,.22)";
          }}
        >
          <div style={styles.cardIconWrap("#F3E8FF")}>👤</div>
          <div style={styles.cardTitle}>My Profile</div>
          <p style={styles.cardText}>
            View and update your account details.
          </p>
        </Link>

        <div style={styles.cardDisabled}>
          <div style={styles.cardIconWrap("#EEF2FF")}>📝</div>
          <div style={styles.cardTitle}>Take Assessment</div>
          <p style={styles.cardText}>
            Answer questions and get your AI-generated career analysis.
          </p>
          <span style={styles.cardBadge}>Coming soon</span>
        </div>
      </div>

      <div style={styles.infoSection}>
        <span style={styles.infoIcon}>💡</span>
        <p style={styles.infoText}>
          Your dashboard will show your assessment results and career
          recommendations here once you've completed an assessment.
        </p>
      </div>
    </StudentLayout>
  );
}