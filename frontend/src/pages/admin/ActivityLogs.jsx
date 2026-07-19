import { useEffect, useState } from "react";
import { IconHistory, IconSearch, IconFileText } from "@tabler/icons-react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/activityLogsStyles";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ACTION_COLORS = {
  create: "#0F6E56",
  update: "#5313C0",
  delete: "#B3261E",
  login: "#8A5B0A",
  default: "#8A8576",
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
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/dashboard/activities`, {
        headers: { Authorization: `Bearer ${token}` },
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

  const filtered = activities.filter((log) => {
    const keyword = search.toLowerCase().trim();
    return (
      (log.message || "").toLowerCase().includes(keyword) ||
      (log.action || "").toLowerCase().includes(keyword) ||
      (log.username || "").toLowerCase().includes(keyword)
    );
  });

  return (
    <AdminLayout>
      <div style={styles.headerRow}>
        <span style={styles.headerIcon}>
          <IconHistory size={20} stroke={1.75} />
        </span>
        <div>
          <h1 style={styles.pageTitle}>Activity logs</h1>
          <p style={styles.subtitle}>View every important action in the system.</p>
        </div>
      </div>

      {error ? (
        <p style={styles.errorText}>{error}</p>
      ) : (
        <>
          <div style={styles.toolbar}>
            <div style={styles.searchWrap}>
              <span style={styles.searchIcon}>
                <IconSearch size={16} stroke={1.75} />
              </span>
              <input
                placeholder="Search by message, action, or user"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            {!loading && (
              <span style={styles.countBadge}>
                {filtered.length} log{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div style={styles.tableWrap}>
            {loading ? (
              <div>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={styles.skeletonRow}>
                    <div style={styles.skeletonBar("70%")} />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  <IconFileText size={32} stroke={1.5} />
                </div>
                <p>No activity found{search ? ` for "${search}"` : ""}.</p>
              </div>
            ) : (
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
                  {filtered.map((log) => (
                    <tr
                      key={log.id}
                      style={styles.row}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF8F3")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={styles.tdMuted}>{log.id}</td>
                      <td style={styles.td}>
                        <span style={styles.actionBadge(getActionColor(log.action))}>
                          {log.action}
                        </span>
                      </td>
                      <td style={styles.td}>{log.message}</td>
                      <td style={styles.td}>{log.username || "System"}</td>
                      <td style={styles.tdMuted}>{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
}