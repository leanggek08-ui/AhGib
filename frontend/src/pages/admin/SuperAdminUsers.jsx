import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { userService } from "../../services/userService";
import { styles } from "../../styles/superAdminUsersStyles";

const ROLE_LABELS = {
  1: "Admin",
  2: "Student",
  3: "Super Admin",
};

const ROLE_COLORS = {
  1: "#34D399",
  2: "#818CF8",
  3: "#FBBF24",
};

export default function SuperAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

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
    const confirmed = window.confirm(
      `Change ${username}'s role to "${roleLabel}"?`
    );
    if (!confirmed) return;

    setUpdatingId(userId);
    try {
      await userService.updateUser(userId, { role_id: newRole });
      await loadUsers();
      alert("Role updated successfully.");
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // moved inside the component so it can see currentUser + loadUsers
  const deleteUser = async (userId, username) => {
    if (currentUser?.user_id === userId) {
      alert("You cannot delete your own account.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${username}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setUpdatingId(userId);
    try {
      await userService.deleteUser(userId);
      await loadUsers();
      alert("User deleted successfully.");
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout>
      <h1 style={styles.pageTitle}>🛡️ Super Admin Panel</h1>
      <p style={styles.subtitle}>Manage user accounts and assign roles.</p>

      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Current Role</th>
                <th style={styles.th}>Change Role</th>
                <th style={styles.th}>Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td style={styles.emptyCell} colSpan={6}>
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const isSelf = u.user_id === currentUser?.user_id;
                  const isBusy = updatingId === u.user_id;

                  return (
                    <tr key={u.user_id} style={styles.row}>
                      <td style={styles.td}>{u.user_id}</td>
                      <td style={styles.td}>{u.username}</td>
                      <td style={styles.td}>{u.email}</td>
                      <td style={styles.td}>
                        <span style={styles.roleBadge(ROLE_COLORS[u.role_id])}>
                          {ROLE_LABELS[u.role_id] || "Unknown"}
                        </span>
                      </td>

                      <td style={styles.td}>
                        {isSelf ? (
                          <span style={styles.currentAccountText}>
                            Current Account
                          </span>
                        ) : (
                          <select
                            style={styles.select}
                            value={u.role_id}
                            disabled={isBusy}
                            onChange={(e) =>
                              changeRole(
                                u.user_id,
                                Number(e.target.value),
                                u.username
                              )
                            }
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
                            {isBusy ? "Working..." : "Delete"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}