import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/adminCareerSkillsStyles";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminCareerSkills() {
  const [skills, setSkills] = useState([]);
  const [careers, setCareers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    careers_id: "",
    skill_name: "",
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

      const [careerRes, skillRes] = await Promise.all([
        fetch(`${BASE_URL}/career`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${BASE_URL}/career-skill`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!careerRes.ok || !skillRes.ok) {
        throw new Error("Failed to load career-skill data");
      }

      const careerData = await careerRes.json();
      const skillData = await skillRes.json();

      setCareers(careerData);
      setSkills(skillData);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setForm({ careers_id: "", skill_name: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.careers_id || !form.skill_name.trim()) {
      setError("Please select a career and enter a skill name.");
      return;
    }

    setSaving(true);
    try {
      const token = getToken();
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${BASE_URL}/career-skill/${editingId}`
        : `${BASE_URL}/career-skill`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save skill");

      resetForm();
      setEditingId(null);
      loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const editSkill = (skill) => {
    setEditingId(skill.car_skill_id);
    setError("");
    setForm({
      careers_id: skill.careers_id,
      skill_name: skill.skill_name,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError("");
    resetForm();
  };

  const deleteSkill = async (id) => {
    const confirmDelete = window.confirm("Delete this skill?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/career-skill/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete skill");

      loadData();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = skills.filter(
    (s) =>
      (s.careers_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.skill_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>🛠 Career Skills</h1>
        <p style={styles.subtitle}>
          Link required skills to each career path
        </p>
      </div>

      {/* FORM CARD */}
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <div style={styles.formTitle}>
          {editingId ? "✏️ Edit Skill" : "➕ Add Skill"}
        </div>

        <div style={styles.formGrid}>
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
              {careers.map((c) => (
                <option key={c.careers_id} value={c.careers_id}>
                  {c.careers_name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Skill Name</label>
            <input
              type="text"
              placeholder="e.g. Problem Solving"
              value={form.skill_name}
              onChange={(e) =>
                setForm({ ...form, skill_name: e.target.value })
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
            {saving ? "Saving..." : editingId ? "Update" : "Add Skill"}
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
            placeholder="Search career or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} skill{filtered.length !== 1 ? "s" : ""}
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
            <div style={styles.emptyIcon}>🛠</div>
            <p>No skills found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Career</th>
                <th style={styles.th}>Skill</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.car_skill_id}
                  style={styles.row}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#FAFAFB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={styles.td}>
                    <div style={styles.careerCell}>{s.careers_name}</div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                      ID: {s.car_skill_id}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.skillBadge}>{s.skill_name}</span>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button onClick={() => editSkill(s)} style={styles.editBtn}>
                        Edit
                      </button>
                      <button
                        onClick={() => deleteSkill(s.car_skill_id)}
                        disabled={deletingId === s.car_skill_id}
                        style={{
                          ...styles.deleteBtn,
                          opacity: deletingId === s.car_skill_id ? 0.5 : 1,
                        }}
                      >
                        {deletingId === s.car_skill_id
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