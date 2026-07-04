import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/adminDashboardStyles";

export default function AdminDashboard() {
  // temporary data (later we connect Supabase/backend)
  const stats = [
    {
      title: "Total Users",
      value: 120,
      icon: "👤",
      color: "#4F46E5",
      trend: "+12%",
      positive: true,
    },
    {
      title: "Total Questions",
      value: 45,
      icon: "❓",
      color: "#F59E0B",
      trend: "+5%",
      positive: true,
    },
    {
      title: "Universities",
      value: 12,
      icon: "🎓",
      color: "#10B981",
      trend: "0%",
      positive: true,
    },
  ];

  const activities = [
    { text: "New user registered", icon: "👤", color: "#4F46E5", time: "2m ago" },
    { text: "Question added", icon: "❓", color: "#F59E0B", time: "18m ago" },
    { text: "University updated", icon: "🎓", color: "#10B981", time: "1h ago" },
    { text: "User deleted", icon: "🗑️", color: "#DC2626", time: "3h ago" },
  ];

  return (
    <AdminLayout>
      <h1 style={styles.pageTitle}>Dashboard</h1>
      <p style={styles.subtitle}>
        Welcome back! Here is your system overview.
      </p>

      {/* STATS CARDS */}
      <div style={styles.cards}>
        {stats.map((s, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardAccentBar(s.color)} />
            <div style={styles.cardTopRow}>
              <div style={styles.cardIconWrap(s.color)}>{s.icon}</div>
              <span style={styles.trendBadge(s.positive)}>{s.trend}</span>
            </div>
            <div>
              <p style={styles.cardTitle}>{s.title}</p>
              <h2 style={styles.cardValue}>{s.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID: Activity + Quick Panel */}
      <div style={styles.grid}>
        {/* RECENT ACTIVITY */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Recent Activity</h3>
            <span style={styles.viewAll}>View all</span>
          </div>

          {activities.map((item, i) => (
            <div key={i} style={styles.activity}>
              <div style={styles.activityIcon(item.color)}>{item.icon}</div>
              <div style={styles.activityText}>{item.text}</div>
              <div style={styles.activityTime}>{item.time}</div>
            </div>
          ))}
        </div>

        {/* QUICK PANEL */}
        <div style={styles.quickPanel}>
          <div style={styles.quickCard}>
            <div style={styles.quickCardTitle}>This Month</div>
            <div style={styles.quickCardValue}>+18 New Users</div>
          </div>
          <div style={styles.quickCard}>
            <div style={styles.quickCardTitle}>Pending Reviews</div>
            <div style={styles.quickCardValue}>7 Questions</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}