import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/adminCareersStyles";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminCareers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    careers_name: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/career`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to load careers");

      const data = await res.json();
      setCareers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.careers_name.trim()) {
      setError("Career name is required.");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${BASE_URL}/career/${editingId}`
        : `${BASE_URL}/career`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save career");

      setForm({ careers_name: "", description: "" });
      setEditingId(null);
      loadCareers();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const editCareer = (career) => {
    setEditingId(career.careers_id);
    setError("");
    setForm({
      careers_name: career.careers_name,
      description: career.description,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError("");
    setForm({ careers_name: "", description: "" });
  };

  const deleteCareer = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this career?"
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/career/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete career");

      loadCareers();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = careers.filter(
    (c) =>
      c.careers_name.toLowerCase().includes(search.toLowerCase()) ||
      (c.description || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>💼 Careers</h1>
        <p style={styles.subtitle}>
          Manage career paths available in the system
        </p>
      </div>

      {/* FORM CARD */}
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <div style={styles.formTitle}>
          {editingId ? "✏️ Edit Career" : "➕ Add Career"}
        </div>

        <div style={styles.formGrid}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Career Name</label>
            <input
              placeholder="e.g. Software Engineer"
              value={form.careers_name}
              onChange={(e) =>
                setForm({ ...form, careers_name: e.target.value })
              }
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroupFull}>
            <label style={styles.label}>Description</label>
            <textarea
              placeholder="Brief description of this career path..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={styles.textarea}
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
            {saving ? "Saving..." : editingId ? "Update Career" : "Add Career"}
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
            placeholder="Search career or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} career{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        {loading ? (
          <div>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={styles.skeletonRow}>
                <div style={styles.skeletonBar("65%")} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>💼</div>
            <p>No careers found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Career</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((career) => (
                <tr
                  key={career.careers_id}
                  style={styles.row}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#FAFAFB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={styles.td}>
                    <div style={styles.careerCell}>
                      <div style={styles.careerIcon}>💼</div>
                      <div>
                        <div style={styles.careerName}>
                          {career.careers_name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                          ID: {career.careers_id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.description}>
                      {career.description || (
                        <span style={{ color: "#D1D5DB" }}>—</span>
                      )}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button
                        onClick={() => editCareer(career)}
                        style={styles.editBtn}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCareer(career.careers_id)}
                        disabled={deletingId === career.careers_id}
                        style={{
                          ...styles.deleteBtn,
                          opacity: deletingId === career.careers_id ? 0.5 : 1,
                        }}
                      >
                        {deletingId === career.careers_id
                          ? "Deleting..."
                          : "Delete"}
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