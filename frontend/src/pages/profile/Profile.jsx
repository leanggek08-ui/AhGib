import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { styles } from "../../styles/profileStyles";
import { Link } from "react-router-dom";
import { colors } from "../../styles/colors";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userService.getProfile();
        setUser(data);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  // Completion is a simple heuristic for now — swap in real fields once you
  // decide what "complete" means (academic scores + quiz answered, etc.)
  const completion = user?.has_academic_scores && user?.has_quiz_answers
    ? 100
    : user?.has_academic_scores || user?.has_quiz_answers
    ? 60
    : 20;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Link
          to={user?.role_id === 1 || user?.role_id === 3 ? "/admin/dashboard" : "/student/dashboard"}
          style={styles.backlink}
        >
          ← Back to Dashboard
        </Link>

        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.avatarWrap}>
            <div style={styles.avatar}>
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <Link to="/profile/edit" style={styles.avatarBadge} aria-label="Change photo">
              📷
            </Link>
          </div>
          <div>
            <h2 style={styles.title}>{user?.username}</h2>
            <p style={styles.subtitle}>Grade 12 student</p>
          </div>
          <span style={styles.roleBadgeHeader}>
            {user?.role_id === 3 ? "Super Admin" : user?.role_id === 1 ? "Admin" : "Student"}
          </span>
        </div>

        {/* COMPLETION */}
        {user?.role_id !== 1 && user?.role_id !== 3 && (
          <div style={styles.completionBox}>
            <div style={styles.completionRow}>
              <span>Profile completion</span>
              <span style={{ color: "#fff", fontWeight: 500 }}>{completion}%</span>
            </div>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${completion}%` }} />
            </div>
            {completion < 100 && (
              <p style={styles.completionHint}>
                Add your academic scores to unlock career matches.
              </p>
            )}
          </div>
        )}

        {/* STATS */}
        {user?.role_id !== 1 && user?.role_id !== 3 && (
          <div style={styles.statGrid}>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>Assessments taken</p>
              <p style={styles.statValue}>{user?.assessments_count ?? 0}</p>
            </div>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>Career matches</p>
              <p style={styles.statValue}>{user?.matches_count ?? 0}</p>
            </div>
          </div>
        )}

        {/* INFO */}
        <div style={styles.infoBox}>
          {message && <p style={{ color: "#ff8a8a" }}>{message}</p>}
          <div style={styles.row}>
            <span style={styles.label}>Email</span>
            <span style={styles.value}>{user?.email}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Last active</span>
            <span style={styles.value}>
              {user?.last_active ? new Date(user.last_active).toLocaleDateString() : "—"}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div style={styles.actionRow}>
          <Link to="/profile/edit" style={styles.button}>
            Edit profile
          </Link>
          <Link to="/profile/change-password" style={styles.secondaryButton}>
            Change password
          </Link>
        </div>
      </div>
    </div>
  );
}