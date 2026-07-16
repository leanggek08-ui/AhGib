import { useEffect, useState } from "react";
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
  const handleEdit = (user) => {
    setEditingUser(user);

    setForm({
      username: user.username,
      role_id: user.role_id,
    });

    setShowModal(true);
};
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]:
      e.target.name === "role_id"
        ? Number(e.target.value)
        : e.target.value,
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

    alert("User updated successfully ✅");

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
                {user?.role_id === 3 && (<th style={styles.th}>Action</th>)}
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
                    <span style={styles.roleBadge(u.role_id === 3)}>
                      {u.role_id === 3 ? "Super Admin" : u.role_id === 1 ? "Admin" : "Student"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {user?.role_id === 3 && (
                    <button
                      onClick={() => handleEdit(u)}
                      style={{
                        padding: "8px 12px",
                        marginRight: 8,
                        background: "#F59E0B",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    )}
                    {user?.role_id === 3 && (
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
                  )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: 400,
        background: "#fff",
        borderRadius: 12,
        padding: 24,
      }}
    >
      <h2>Edit User</h2>

      <label>Username</label>

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 8,
          marginBottom: 15,
        }}
      />

      <label>Role</label>

      <select
        name="role_id"
        value={form.role_id}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 8,
          marginBottom: 20,
        }}
      >
        <option value={1}>Admin</option>
        <option value={2}>Student</option>
        <option value={3}>Super Admin</option>
      </select>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
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
        >
          {saving ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  </div>
)}
    </AdminLayout>
  );
}