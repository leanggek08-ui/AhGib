import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/adminDashboardStyles";

export default function AdminDashboard() {
  // temporary data (later we connect Supabase/backend)
  const stats = {
    users: 120,
    questions: 45,
    universities: 12,
  };

  const activities = [
    "New user registered",
    "Question added",
    "University updated",
    "User deleted",
  ];

  return (
    <AdminLayout>
      <h1 style={styles.pageTitle}>Dashboard</h1>
      <p style={styles.subtitle}>
        Welcome back! Here is your system overview.
      </p>

      {/* STATS CARDS */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Users</p>
          <h2 style={styles.cardValue}>{stats.users}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Questions</p>
          <h2 style={styles.cardValue}>{stats.questions}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>Universities</p>
          <h2 style={styles.cardValue}>{stats.universities}</h2>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Recent Activity</h3>

        {activities.map((item, i) => (
          <div key={i} style={styles.activity}>
            {item}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}