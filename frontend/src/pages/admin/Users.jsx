import { useEffect, useState } from "react";
import { IconSearch, IconFolder, IconPencil, IconTrash } from "@tabler/icons-react";
import AdminLayout from "../../layouts/AdminLayout";
import { userService } from "../../services/userService";
import { styles } from "../../styles/adminUsersStyles";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [updateHover, setUpdateHover] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    username: "",
    role_id: 2,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();
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

  const handleEdit = (u) => {
    setEditingUser(u);
    setForm({
      username: u.username,
      role_id: u.role_id,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "role_id" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (!form.username.trim()) {
      alert("Username is required");
      return;
    }

    try {
      setSaving(true);
      await userService.updateUser(editingUser.user_id, form);
      setShowModal(false);
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const roleLabel = (role_id) => {
    if (role_id === 1) return "admin";
    if (role_id === 2) return "student";
    if (role_id === 3) return "super admin";
    return "";
  };

  const filtered = users.filter((u) => {
    const keyword = search.toLowerCase().trim();
    return (
      (u.username || "").toLowerCase().includes(keyword) ||
      (u.email || "").toLowerCase().includes(keyword) ||
      String(u.user_id).includes(keyword) ||
      roleLabel(u.role_id).includes(keyword)
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
          <span style={styles.searchIcon}>
            <IconSearch size={16} stroke={1.75} />
          </span>
          <input
            placeholder="Search by name or email"
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
            <div style={styles.emptyIcon}>
              <IconFolder size={32} stroke={1.5} />
            </div>
            <p>No users found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                {user?.role_id === 3 && <th style={styles.th}>Action</th>}
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
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
                  <td style={styles.td}>
                    <span style={styles.email}>{u.email}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.roleBadge(u.role_id)}>
                      {u.role_id === 3 ? "Super admin" : u.role_id === 1 ? "Admin" : "Student"}
                    </span>
                  </td>
                  {user?.role_id === 3 && (
                    <td style={styles.td}>
                      <div style={styles.actionRow}>
                        <button onClick={() => handleEdit(u)} style={styles.editBtn}>
                          <IconPencil size={14} stroke={1.75} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(u.user_id)}
                          disabled={deletingId === u.user_id}
                          style={styles.deleteBtn(deletingId === u.user_id)}
                        >
                          <IconTrash size={14} stroke={1.75} />
                          {deletingId === u.user_id ? "Deleting" : "Delete"}
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
 
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h2 style={styles.modalTitle}>Edit user</h2>

            <label style={styles.fieldLabel}>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              style={styles.fieldInput}
            />

            <label style={styles.fieldLabel}>Role</label>
            <select
              name="role_id"
              value={form.role_id}
              onChange={handleChange}
              style={styles.fieldSelect}
            >
              <option value={1}>Admin</option>
              <option value={2}>Student</option>
              <option value={3}>Super admin</option>
            </select>

            <div style={styles.modalActions}>
              <button
                style={styles.cancelBtn}
                onClick={() => {
                  setShowModal(false);
                  setEditingUser(null);
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={saving}
                onMouseEnter={() => setUpdateHover(true)}
                onMouseLeave={() => setUpdateHover(false)}
                style={styles.updateBtn(updateHover, saving)}
              >
                {saving ? "Updating…" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}