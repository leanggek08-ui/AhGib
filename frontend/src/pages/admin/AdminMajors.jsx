import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/adminMajorsStyles";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminMajors() {
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    major_name: "",
    field_of_study: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadMajors();
  }, []);

  const loadMajors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/major`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to load majors");

      const data = await res.json();
      setMajors(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.major_name.trim()) {
      setError("Major name is required.");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${BASE_URL}/major/${editingId}`
        : `${BASE_URL}/major`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save major");

      setForm({ major_name: "", field_of_study: "" });
      setEditingId(null);
      loadMajors();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const editMajor = (major) => {
    setEditingId(major.major_id);
    setError("");
    setForm({
      major_name: major.major_name,
      field_of_study: major.field_of_study,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError("");
    setForm({ major_name: "", field_of_study: "" });
  };

  const deleteMajor = async (id) => {
    const confirmDelete = window.confirm("Delete this major?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/major/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete major");

      loadMajors();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = majors.filter(
    (m) =>
      m.major_name.toLowerCase().includes(search.toLowerCase()) ||
      (m.field_of_study || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>📚 Majors</h1>
        <p style={styles.subtitle}>
          Manage academic majors available in the system
        </p>
      </div>

      {/* FORM CARD */}
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <div style={styles.formTitle}>
          {editingId ? "✏️ Edit Major" : "➕ Add Major"}
        </div>

        <div style={styles.formGrid}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Major Name</label>
            <input
              placeholder="e.g. Computer Science"
              value={form.major_name}
              onChange={(e) =>
                setForm({ ...form, major_name: e.target.value })
              }
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Field of Study</label>
            <input
              placeholder="e.g. Engineering & Technology"
              value={form.field_of_study}
              onChange={(e) =>
                setForm({ ...form, field_of_study: e.target.value })
              }
              style={styles.input}
            />
          </div>
        </div>

        {error && <div style={styles.errorText}>{error}</div>}

        <div style={styles.formActions}>
          <button
            type="submit"
            disabled={saving}
            style={{ ...styles.saveBtn, opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Saving..." : editingId ? "Update" : "Add Major"}
          </button>

          {editingId && (
            <button type="button" onClick={cancelEdit} style={styles.cancelBtn}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TOOLBAR */}
      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            placeholder="Search major or field..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} major{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        {loading ? (
          <div>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={styles.skeletonRow}>
                <div style={styles.skeletonBar("60%")} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📚</div>
            <p>No majors found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Major</th>
                <th style={styles.th}>Field of Study</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((m) => (
                <tr
                  key={m.major_id}
                  style={styles.row}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#FAFAFB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={styles.td}>
                    <div style={styles.majorCell}>
                      <div style={styles.majorIcon}>📚</div>
                      <div>
                        <div style={styles.majorName}>{m.major_name}</div>
                        <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                          ID: {m.major_id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={styles.td}>
                    {m.field_of_study ? (
                      <span style={styles.fieldBadge}>
                        {m.field_of_study}
                      </span>
                    ) : (
                      <span style={{ color: "#D1D5DB" }}>—</span>
                    )}
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button onClick={() => editMajor(m)} style={styles.editBtn}>
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMajor(m.major_id)}
                        disabled={deletingId === m.major_id}
                        style={{
                          ...styles.deleteBtn,
                          opacity: deletingId === m.major_id ? 0.5 : 1,
                        }}
                      >
                        {deletingId === m.major_id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
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