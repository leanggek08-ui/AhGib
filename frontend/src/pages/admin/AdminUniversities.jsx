import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { universityService } from "../../services/universityService";
import { styles } from "../../styles/adminUniversitiesStyles";

export default function AdminUniversities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    website: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUniversities();
  }, []);

  async function loadUniversities() {
    try {
      const data = await universityService.getAllUniversities();
      setUniversities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveUniversity() {
    if (!form.name.trim()) {
      alert("University name is required.");
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await universityService.updateUniversity(editingId, form);
        alert("University updated successfully.");
      } else {
        await universityService.createUniversity(form);
        alert("University added successfully.");
      }

      setForm({ name: "", location: "", website: "" });
      setEditingId(null);
      loadUniversities();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteUniversity(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this university?"
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await universityService.deleteUniversity(id);
      loadUniversities();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = universities.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>🎓 Universities</h1>
        <p style={styles.subtitle}>
          Add, update and remove universities available in the system
        </p>
      </div>

      {/* FORM CARD */}
      <div style={styles.formCard}>
        <div style={styles.formTitle}>
          {editingId ? "✏️ Edit University" : "➕ Add University"}
        </div>

        <div style={styles.formGrid}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>University Name</label>
            <input
              placeholder="e.g. Royal University of Phnom Penh"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Location</label>
            <input
              placeholder="e.g. Phnom Penh, Cambodia"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Website</label>
            <input
              placeholder="e.g. https://rupp.edu.kh"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.formActions}>
          <button
            onClick={saveUniversity}
            disabled={saving}
            style={{ ...styles.saveBtn, opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Saving..." : editingId ? "Update" : "Add University"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", location: "", website: "" });
              }}
              style={styles.cancelBtn}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* TOOLBAR */}
      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            placeholder="Search university..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} universit{filtered.length !== 1 ? "ies" : "y"}
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
            <div style={styles.emptyIcon}>🏛️</div>
            <p>No universities found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>University</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Website</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.university_id}
                  style={styles.row}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#FAFAFB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={styles.td}>
                    <div style={styles.uniCell}>
                      <div style={styles.uniIcon}>🎓</div>
                      <div>
                        <div style={styles.uniName}>{u.name}</div>
                        <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                          ID: {u.university_id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.location}>
                      📍 {u.location || "—"}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {u.website ? (
                      <a
                        href={u.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.websiteLink}
                      >
                        🔗 Visit site
                      </a>
                    ) : (
                      <span style={styles.noWebsite}>No website</span>
                    )}
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button
                        onClick={() => {
                          setEditingId(u.university_id);
                          setForm({
                            name: u.name,
                            location: u.location,
                            website: u.website,
                          });
                        }}
                        style={styles.editBtn}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUniversity(u.university_id)}
                        disabled={deletingId === u.university_id}
                        style={{
                          ...styles.deleteBtn,
                          opacity: deletingId === u.university_id ? 0.5 : 1,
                        }}
                      >
                        {deletingId === u.university_id
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