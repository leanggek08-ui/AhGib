import { useEffect, useState } from "react";
import { IconShieldStar, IconSearch, IconUsersGroup, IconTrash } from "@tabler/icons-react";
import AdminLayout from "../../layouts/AdminLayout";
import { userService } from "../../services/userService";
import { styles } from "../../styles/superAdminUsersStyles";

const ROLE_LABELS = {
  1: "Admin",
  2: "Student",
  3: "Super Admin",
};

export default function SuperAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(Array.isArray(data) ? data : data?.users || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (userId, newRole, username) => {
    if (currentUser?.user_id === userId) {
      alert("You cannot change your own role.");
      return;
    }

    const roleLabel = ROLE_LABELS[newRole] || newRole;
    if (!window.confirm(`Change ${username}'s role to "${roleLabel}"?`)) return;

    setUpdatingId(userId);
    try {
      await userService.updateUser(userId, { role_id: newRole });
      await loadUsers();
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteUser = async (userId, username) => {
    if (currentUser?.user_id === userId) {
      alert("You cannot delete your own account.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${username}"? This cannot be undone.`)) return;

    setUpdatingId(userId);
    try {
      await userService.deleteUser(userId);
      await loadUsers();
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = users.filter((u) => {
    const keyword = search.toLowerCase().trim();
    return (
      (u.username || "").toLowerCase().includes(keyword) ||
      (u.email || "").toLowerCase().includes(keyword) ||
      String(u.user_id).includes(keyword)
    );
  });

  return (
    <AdminLayout>
      <div style={styles.headerRow}>
        <span style={styles.headerIcon}>
          <IconShieldStar size={20} stroke={1.75} />
        </span>
        <div>
          <h1 style={styles.pageTitle}>Super admin panel</h1>
          <p style={styles.subtitle}>Manage user accounts and assign roles.</p>
        </div>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>
            <IconSearch size={16} stroke={1.75} />
          </span>
          <input
            placeholder="Search by name, email, or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        {!loading && (
          <span style={styles.countBadge}>
            {filtered.length} user{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div style={styles.tableWrap}>
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
            <div style={styles.emptyIcon}>
              <IconUsersGroup size={32} stroke={1.5} />
            </div>
            <p>No users found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Current role</th>
                <th style={styles.th}>Change role</th>
                <th style={styles.th}>Delete</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => {
                const isSelf = u.user_id === currentUser?.user_id;
                const isBusy = updatingId === u.user_id;

                return (
                  <tr
                    key={u.user_id}
                    style={styles.row}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF8F3")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={styles.td}>
                      <div style={styles.userCell}>
                        <div style={styles.miniAvatar}>
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={styles.username}>{u.username}</div>
                          <div style={styles.userId}>ID: {u.user_id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>{u.email}</td>
                    <td style={styles.td}>
                      <span style={styles.roleBadge(u.role_id)}>
                        {ROLE_LABELS[u.role_id] || "Unknown"}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {isSelf ? (
                        <span style={styles.currentAccountText}>Current account</span>
                      ) : (
                        <select
                          style={styles.select}
                          value={u.role_id}
                          disabled={isBusy}
                          onChange={(e) => changeRole(u.user_id, Number(e.target.value), u.username)}
                        >
                          <option value={2}>Student</option>
                          <option value={1}>Admin</option>
                          <option value={3}>Super Admin</option>
                        </select>
                      )}
                    </td>
                    <td style={styles.td}>
                      {isSelf ? (
                        <span style={styles.currentAccountText}>—</span>
                      ) : (
                        <button
                          style={styles.deleteButton(isBusy)}
                          disabled={isBusy}
                          onClick={() => deleteUser(u.user_id, u.username)}
                        >
                          <IconTrash size={13} stroke={1.75} />
                          {isBusy ? "Working…" : "Delete"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}