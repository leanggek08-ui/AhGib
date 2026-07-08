import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/activityLogsStyles";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ACTION_COLORS = {
  create: "#34D399",
  update: "#818CF8",
  delete: "#F87171",
  login: "#FBBF24",
  default: "#9CA3AF",
};

function getActionColor(action) {
  const key = action?.toLowerCase() || "";
  for (const type of Object.keys(ACTION_COLORS)) {
    if (key.includes(type)) return ACTION_COLORS[type];
  }
  return ACTION_COLORS.default;
}

export default function ActivityLogs() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/dashboard/activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to load activity logs (${res.status})`);
      }

      const data = await res.json();
      setActivities(Array.isArray(data) ? data : data?.activities || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div style={styles.headerRow}>
        <span style={styles.headerIcon}>📜</span>
        <div>
          <h1 style={styles.pageTitle}>Activity Logs</h1>
          <p style={styles.subtitle}>
            View every important action in the system.
          </p>
        </div>
      </div>

      {loading ? (
        <p style={styles.loadingText}>Loading activity logs...</p>
      ) : error ? (
        <p style={styles.errorText}>{error}</p>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Message</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>

            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td style={styles.emptyCell} colSpan={5}>
                    No activity recorded yet.
                  </td>
                </tr>
              ) : (
                activities.map((log) => (
                  <tr key={log.id} style={styles.row}>
                    <td style={styles.td}>{log.id}</td>
                    <td style={styles.td}>
                      <span style={styles.actionBadge(getActionColor(log.action))}>
                        {log.action}
                      </span>
                    </td>
                    <td style={styles.td}>{log.message}</td>
                    <td style={styles.td}>{log.user_id}</td>
                    <td style={styles.tdMuted}>
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}