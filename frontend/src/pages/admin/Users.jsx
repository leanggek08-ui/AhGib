import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { userService } from "../../services/userService";
import { styles } from "../../styles/adminUsersStyles";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

const loadUsers = async () => {
  try {
    const data = await userService.getAllUsers();

    console.log("Users:", data);

    setUsers(data);
  } catch (err) {
    console.error(err.message);
  } finally {
    setLoading(false);
  }
};
  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;

    setDeletingId(id);
    try {
      await userService.deleteUser(id);
      setUsers(users.filter((u) => u.user_id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

const filtered = users.filter((u) => {
  const keyword = search.toLowerCase().trim();

  return (
    (u.username || "").toLowerCase().includes(keyword) ||
    (u.email || "").toLowerCase().includes(keyword) ||
    String(u.user_id).includes(keyword) ||
    (u.role_id === 1 ? "super admin" : "admin").includes(keyword)
  );
});

  return (
    <AdminLayout>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Users</h1>
          <p style={styles.subtitle}>Manage all registered users</p>
        </div>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} user{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div style={styles.tableCard}>
        {loading ? (
          <div>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={styles.skeletonRow}>
                <div style={styles.skeletonBar("60%")} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🗂️</div>
            <p>No users found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.user_id}
                  style={styles.row}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#FAFAFB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={styles.td}>
                    <div style={styles.userCell}>
                      <div style={styles.miniAvatar}>
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={styles.username}>{u.username}</div>
                        <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                          ID: {u.user_id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.email}>{u.email}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.roleBadge(u.role_id === 1)}>
                      {u.role_id === 1 ? "Super Admin" : "Admin"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleDelete(u.user_id)}
                      disabled={deletingId === u.user_id}
                      style={{
                        ...styles.deleteBtn,
                        opacity: deletingId === u.user_id ? 0.5 : 1,
                      }}
                    >
                      {deletingId === u.user_id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}