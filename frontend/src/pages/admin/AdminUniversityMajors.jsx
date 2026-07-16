import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/adminUniversityMajorsStyles";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminUniversityMajors() {
  const [assignments, setAssignments] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [majors, setMajors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    university_id: "",
    major_id: "",
    tuition_fee: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const getToken = () => localStorage.getItem("token");

  const loadData = async () => {
    setLoading(true);
    try {
      const token = getToken();

      const [uniRes, majorRes, relationRes] = await Promise.all([
        fetch(`${BASE_URL}/universities`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${BASE_URL}/major`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${BASE_URL}/uni-major`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!uniRes.ok || !majorRes.ok || !relationRes.ok) {
        throw new Error("Failed to load university-major data");
      }

      const uniData = await uniRes.json();
      const majorData = await majorRes.json();
      const relationData = await relationRes.json();

      setUniversities(uniData);
      setMajors(majorData);
      setAssignments(relationData);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () =>
    setForm({ university_id: "", major_id: "", tuition_fee: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.university_id || !form.major_id) {
      setError("Please select both a university and a major.");
      return;
    }

    setSaving(true);
    try {
      const token = getToken();
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${BASE_URL}/uni-major/${editingId}`
        : `${BASE_URL}/uni-major`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save assignment");

      resetForm();
      setEditingId(null);
      loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const editAssignment = (item) => {
    setEditingId(item.uni_major_id);
    setError("");
    setForm({
      university_id: item.university_id,
      major_id: item.major_id,
      tuition_fee: item.tuition_fee,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError("");
    resetForm();
  };

  const deleteAssignment = async (id) => {
    const confirmDelete = window.confirm("Delete this assignment?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/uni-major/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete assignment");

      loadData();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = assignments.filter(
    (item) =>
      (item.university_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.major_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>🎓 University ↔ Major Assignments</h1>
        <p style={styles.subtitle}>
          Link majors to universities and set tuition fees
        </p>
      </div>

      {/* FORM CARD */}
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <div style={styles.formTitle}>
          {editingId ? "✏️ Edit Assignment" : "➕ Add Assignment"}
        </div>

        <div style={styles.formGrid}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>University</label>
            <select
              value={form.university_id}
              onChange={(e) =>
                setForm({ ...form, university_id: e.target.value })
              }
              style={styles.select}
            >
              <option value="">Select University</option>
              {universities.map((u) => (
                <option key={u.university_id} value={u.university_id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Major</label>
            <select
              value={form.major_id}
              onChange={(e) => setForm({ ...form, major_id: e.target.value })}
              style={styles.select}
            >
              <option value="">Select Major</option>
              {majors.map((m) => (
                <option key={m.major_id} value={m.major_id}>
                  {m.major_name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Tuition Fee ($)</label>
            <input
              type="number"
              placeholder="e.g. 1200"
              value={form.tuition_fee}
              onChange={(e) =>
                setForm({ ...form, tuition_fee: e.target.value })
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
            {saving ? "Saving..." : editingId ? "Update" : "Add Assignment"}
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
            placeholder="Search university or major..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} assignment{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        {loading ? (
          <div>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={styles.skeletonRow}>
                <div style={styles.skeletonBar("70%")} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🔗</div>
            <p>No assignments found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>University</th>
                <th style={styles.th}>Major</th>
                <th style={styles.th}>Tuition</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.uni_major_id}
                  style={styles.row}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#FAFAFB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={styles.td}>
                    <div style={styles.uniCell}>{item.university_name}</div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                      ID: {item.uni_major_id}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.majorBadge}>{item.major_name}</span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.tuition}>
                      ${Number(item.tuition_fee).toLocaleString()}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button
                        onClick={() => editAssignment(item)}
                        style={styles.editBtn}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAssignment(item.uni_major_id)}
                        disabled={deletingId === item.uni_major_id}
                        style={{
                          ...styles.deleteBtn,
                          opacity:
                            deletingId === item.uni_major_id ? 0.5 : 1,
                        }}
                      >
                        {deletingId === item.uni_major_id
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