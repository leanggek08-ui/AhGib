import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconUsers,
  IconHelpCircle,
  IconBuildingBank,
  IconPoint,
  IconSchool,
  IconBriefcase,
} from "@tabler/icons-react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/adminDashboardStyles";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const ACTIVITY_LIMIT = 5;

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const quickActions = [
  { label: "Add university", icon: IconBuildingBank, to: "/admin/universities" },
  { label: "Add major", icon: IconSchool, to: "/admin/majors" },
  { label: "Add career", icon: IconBriefcase, to: "/admin/careers" },
  { label: "Add question", icon: IconHelpCircle, to: "/admin/questions" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [hoveredAction, setHoveredAction] = useState(null);

  useEffect(() => {
    loadStats();
    loadActivities();
  }, []);

  const loadStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Stats request failed (${res.status})`);
      const data = await res.json();
      setStats(data);
      setLastUpdated(new Date());
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
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Activities request failed (${res.status})`);
      const data = await res.json();
      setActivities(Array.isArray(data) ? data : data?.activities || []);
    } catch (err) {
      console.error(err.message);
    }
  };

  const formatNumber = (n) => (typeof n === "number" ? n.toLocaleString() : "0");

  const cardConfig = [
    { key: "totalUsers", title: "Total Users", Icon: IconUsers },
    { key: "totalQuestions", title: "Total Questions", Icon: IconHelpCircle },
    { key: "totalUniversities", title: "Universities", Icon: IconBuildingBank },
  ];

  const visibleActivities = showAllActivity ? activities : activities.slice(0, ACTIVITY_LIMIT);

  return (
    <AdminLayout>
      <div style={styles.page}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.pageTitle}>Dashboard</h1>
            <p style={styles.subtitle}>Welcome back — here's what's happening in AhGib.</p>
          </div>
          {lastUpdated && (
            <span style={styles.lastUpdated}>
              Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>

        {loading ? (
          <p style={styles.loadingText}>Loading dashboard…</p>
        ) : (
          <>
            <div style={styles.cards}>
              {cardConfig.map((cfg) => (
                <div key={cfg.key} style={styles.card}>
                  <div style={styles.cardIconWrap}>
                    <cfg.Icon size={18} stroke={1.75} />
                  </div>
                  <div>
                    <div style={styles.cardValue}>{formatNumber(stats?.[cfg.key])}</div>
                    <div style={styles.cardTitle}>{cfg.title}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.grid}>
              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>Recent Activity</h3>
                  {activities.length > ACTIVITY_LIMIT && (
                    <button
                      style={styles.toggleBtn(btnHover)}
                      onMouseEnter={() => setBtnHover(true)}
                      onMouseLeave={() => setBtnHover(false)}
                      onClick={() => setShowAllActivity((v) => !v)}
                    >
                      {showAllActivity ? "Show less" : "Show all"}
                    </button>
                  )}
                </div>

                {activities.length === 0 ? (
                  <p style={styles.emptyText}>Nothing to show yet — activity will appear here as it happens.</p>
                ) : (
                  visibleActivities.map((item, i) => (
                    <div key={i} style={styles.activity}>
                      <div style={styles.activityIcon}>
                        <IconPoint size={10} fill="currentColor" />
                      </div>
                      <div style={styles.activityText}>{item.message}</div>
                      <div style={styles.activityTime}>{timeAgo(item.created_at)}</div>
                    </div>
                  ))
                )}
              </div>

              <div style={styles.quickPanel}>
                <div style={styles.quickCard}>
                  <div style={styles.statusRow}>
                    <div style={styles.statusDot("#0F6E56")} />
                    <div style={styles.quickCardTitle}>System Status</div>
                  </div>
                  <div style={styles.quickCardValue}>All systems normal</div>
                </div>
                <div style={styles.quickCard}>
                  <div style={styles.statusRow}>
                    <div style={styles.statusDot("#F2A93B")} />
                    <div style={styles.quickCardTitle}>Active Sessions</div>
                  </div>
                  <div style={styles.quickCardValue}>{formatNumber(stats?.activeSessions)}</div>
                </div>
              </div>
            </div>

            <div style={{ ...styles.section, marginTop: "18px" }}>
              <h3 style={styles.sectionTitle}>Quick actions</h3>
              <div style={styles.quickActionsGrid}>
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    style={styles.quickActionBtn(hoveredAction === action.label)}
                    onMouseEnter={() => setHoveredAction(action.label)}
                    onMouseLeave={() => setHoveredAction(null)}
                    onClick={() => navigate(action.to)}
                  >
                    <div style={styles.quickActionIcon}>
                      <action.icon size={16} stroke={1.75} />
                    </div>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}