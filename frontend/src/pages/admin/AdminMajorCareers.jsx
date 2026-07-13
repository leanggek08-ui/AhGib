import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/adminMajorCareersStyles";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminMajorCareers() {
  const [majorCareers, setMajorCareers] = useState([]);
  const [majors, setMajors] = useState([]);
  const [careers, setCareers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    major_id: "",
    careers_id: "",
  });

  const [editingId, setEditingId] = useState(null);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const token = getToken();

      const [majorRes, careerRes, relationRes] = await Promise.all([
        fetch(`${BASE_URL}/major`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${BASE_URL}/career`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${BASE_URL}/major-career`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!majorRes.ok || !careerRes.ok || !relationRes.ok) {
        throw new Error("Failed to load major-career data");
      }

      const majorData = await majorRes.json();
      const careerData = await careerRes.json();
      const relationData = await relationRes.json();

      setMajors(majorData);
      setCareers(careerData);
      setMajorCareers(relationData);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setForm({ major_id: "", careers_id: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.major_id || !form.careers_id) {
      setError("Please select both a major and a career.");
      return;
    }

    setSaving(true);
    try {
      const token = getToken();
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${BASE_URL}/major-career/${editingId}`
        : `${BASE_URL}/major-career`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save relationship");

      resetForm();
      setEditingId(null);
      loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const editRelation = (item) => {
    setEditingId(item.major_career_id);
    setError("");
    setForm({
      major_id: item.major_id,
      careers_id: item.careers_id,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError("");
    resetForm();
  };

  const deleteRelation = async (id) => {
    const confirmDelete = window.confirm("Delete this relationship?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/major-career/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete relationship");

      loadData();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = majorCareers.filter(
    (item) =>
      (item.major_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.careers_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>🎯 Major ↔ Career Relationships</h1>
        <p style={styles.subtitle}>
          Link majors to the careers they lead into
        </p>
      </div>

      {/* FORM CARD */}
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <div style={styles.formTitle}>
          {editingId ? "✏️ Edit Relationship" : "➕ Add Relationship"}
        </div>

        <div style={styles.formGrid}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Major</label>
            <select
              value={form.major_id}
              onChange={(e) => setForm({ ...form, major_id: e.target.value })}
              style={styles.select}
            >
              <option value="">Select Major</option>
              {majors.map((major) => (
                <option key={major.major_id} value={major.major_id}>
                  {major.major_name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Career</label>
            <select
              value={form.careers_id}
              onChange={(e) =>
                setForm({ ...form, careers_id: e.target.value })
              }
              style={styles.select}
            >
              <option value="">Select Career</option>
              {careers.map((career) => (
                <option key={career.careers_id} value={career.careers_id}>
                  {career.careers_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <div style={styles.errorText}>{error}</div>}

        <div style={styles.formActions}>
          <button
            type="submit"
            disabled={saving}
            style={{ ...styles.saveBtn, opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Saving..." : editingId ? "Update" : "Add Relationship"}
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
            placeholder="Search major or career..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} relationship{filtered.length !== 1 ? "s" : ""}
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
            <div style={styles.emptyIcon}>🎯</div>
            <p>No relationships found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Major</th>
                <th style={styles.th}>Career</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.major_career_id}
                  style={styles.row}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#FAFAFB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={styles.td}>
                    <div style={styles.majorCell}>{item.major_name}</div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                      ID: {item.major_career_id}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.careerBadge}>
                      {item.careers_name}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button
                        onClick={() => editRelation(item)}
                        style={styles.editBtn}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRelation(item.major_career_id)}
                        disabled={deletingId === item.major_career_id}
                        style={{
                          ...styles.deleteBtn,
                          opacity:
                            deletingId === item.major_career_id ? 0.5 : 1,
                        }}
                      >
                        {deletingId === item.major_career_id
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