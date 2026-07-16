import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/adminDashboardStyles";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadStats();
    loadActivities();
  }, []);

  const loadStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      // Debug once — remove after confirming the shape matches what we read below
      console.log("stats response:", data);
      setStats(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadActivities = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/dashboard/activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setActivities(Array.isArray(data) ? data : data?.activities || []);
    } catch (err) {
      console.error(err.message);
    }
  };

  const formatNumber = (n) =>
    typeof n === "number" ? n.toLocaleString() : "0";

  const cardConfig = [
    {
      key: "totalUsers",
      title: "Total Users",
      icon: "👥",
      color: "#818CF8",
    },
    {
      key: "totalQuestions",
      title: "Total Questions",
      icon: "❓",
      color: "#34D399",
    },
    {
      key: "totalUniversities",
      title: "Universities",
      icon: "🏛️",
      color: "#FBBF24",
    },
  ];

  return (
    <AdminLayout>
      <h1 style={styles.pageTitle}>Dashboard</h1>
      <p style={styles.subtitle}>
        Welcome back! Here is your system overview.
      </p>

      {loading ? (
        <p style={styles.loadingText}>Loading dashboard...</p>
      ) : (
        <>
          {/* STATS */}
          <div style={styles.cards}>
            {cardConfig.map((cfg) => (
              <div key={cfg.key} style={styles.card}>
                <div style={styles.cardAccentBar(cfg.color)} />
                <div style={styles.cardTopRow}>
                  <div style={styles.cardIconWrap(cfg.color)}>{cfg.icon}</div>
                </div>
                <div style={styles.cardTitle}>{cfg.title}</div>
                <div style={styles.cardValue}>
                  {formatNumber(stats?.[cfg.key])}
                </div>
              </div>
            ))}
          </div>

          {/* ACTIVITY */}
          <div style={styles.grid}>
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>Recent Activity</h3>
                <span style={styles.viewAll}>View all</span>
              </div>

              {activities.length === 0 ? (
                <p style={styles.emptyText}>No recent activity yet.</p>
              ) : (
                activities.map((item, i) => (
                  <div key={i} style={styles.activity}>
                    <div style={styles.activityIcon("#818CF8")}>📌</div>
                    <div style={styles.activityText}>{item.message}</div>
                    <div style={styles.activityTime}>
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* QUICK PANEL */}
            <div style={styles.quickPanel}>
              <div style={styles.quickCard}>
                <div style={styles.quickCardTitle}>System Status</div>
                <div style={styles.quickCardValue}>All systems normal</div>
              </div>
              <div style={styles.quickCard}>
                <div style={styles.quickCardTitle}>Active Sessions</div>
                <div style={styles.quickCardValue}>
                  {formatNumber(stats?.activeSessions)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}