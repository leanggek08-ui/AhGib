import { useEffect, useMemo, useState } from "react";
import { IconSearch,
  IconBriefcase,
  IconTools,
  IconPencil,
  IconTrash,
  IconX,
  IconPlus,
} from "@tabler/icons-react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles, accentFor } from "../../styles/adminCareerSkillsStyles";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminCareerSkills() {
  const [skills, setSkills] = useState([]);
  const [careers, setCareers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addHover, setAddHover] = useState(false);
  const [saveHover, setSaveHover] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const [form, setForm] = useState({
    careers_id: "",
    skill_name: "",
  });

  const [editingId, setEditingId] = useState(null);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    loadData();
    // This loader is intentionally run once when the admin page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData() {
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
  }

  const resetForm = () => setForm({ careers_id: "", skill_name: "" });

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setError("");
    resetForm();
  };

  const openAddModal = (presetCareerId = "") => {
    setEditingId(null);
    setError("");
    setForm({ careers_id: presetCareerId ? String(presetCareerId) : "", skill_name: "" });
    setShowModal(true);
  };

  const handleSubmit = async () => {
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

      setShowModal(false);
      setEditingId(null);
      resetForm();
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
      careers_id: String(skill.careers_id),
      skill_name: skill.skill_name,
    });
    setShowModal(true);
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

  // Group flat skill rows into one toolkit card per career
  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((s) => {
      if (!map.has(s.careers_id)) {
        map.set(s.careers_id, {
          careers_id: s.careers_id,
          careers_name: s.careers_name,
          items: [],
        });
      }
      map.get(s.careers_id).items.push(s);
    });
    return Array.from(map.values());
  }, [filtered]);

  return (
    <AdminLayout>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Career Skills</h1>
          <p style={styles.subtitle}>Link required skills to each career path</p>
        </div>

        <button
          onClick={() => openAddModal()}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          style={styles.addBtn(addHover)}
        >
          <IconPlus size={16} stroke={2} />
          Add skill
        </button>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>
            <IconSearch size={16} stroke={1.75} />
          </span>
          <input
            placeholder="Search by career or skill"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} skill{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div style={styles.grid}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={styles.skeletonCard}>
              <div style={styles.skeletonBar("50%")} />
            </div>
          ))}
        </div>
      ) : grouped.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            <IconTools size={32} stroke={1.5} />
          </div>
          <p>No skills found{search ? ` for "${search}"` : ""}.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {grouped.map((career) => {
            const accent = accentFor(career.careers_name);
            const hovered = hoveredCard === career.careers_id;
            return (
              <div
                key={career.careers_id}
                style={styles.card(accent, hovered)}
                onMouseEnter={() => setHoveredCard(career.careers_id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.careerIcon(accent)}>
                    <IconBriefcase size={16} stroke={1.75} />
                  </div>
                  <div style={styles.careerName}>{career.careers_name}</div>
                  <span style={styles.skillCount(accent)}>
                    {career.items.length} skill{career.items.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div style={styles.chipsRail}>
                  {career.items.map((s) => (
                    <span key={s.car_skill_id} style={styles.chip(accent)}>
                      <span style={styles.chipDot(accent)} />
                      {s.skill_name}
                      <span style={styles.chipActions}>
                        <button
                          onClick={() => editSkill(s)}
                          style={styles.chipIconBtn(accent, false)}
                          title="Edit"
                        >
                          <IconPencil size={14} stroke={2} />
                        </button>
                        <button
                          onClick={() => deleteSkill(s.car_skill_id)}
                          disabled={deletingId === s.car_skill_id}
                          style={styles.chipIconBtn(accent, deletingId === s.car_skill_id)}
                          title="Delete"
                        >
                          <IconTrash size={14} stroke={2} />
                        </button>
                      </span>
                    </span>
                  ))}

                  <button
                    style={styles.addChip(accent)}
                    onClick={() => openAddModal(career.careers_id)}
                  >
                    <IconPlus size={12} stroke={2} />
                    Add skill
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingId ? "Edit skill" : "Add skill"}
              </h2>
              <button style={styles.closeIcon} onClick={closeModal}>
                <IconX size={18} stroke={1.75} />
              </button>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Career</label>
              <select
                value={form.careers_id}
                onChange={(e) => setForm({ ...form, careers_id: e.target.value })}
                style={styles.select}
              >
                <option value="">Select career</option>
                {careers.map((c) => (
                  <option key={c.careers_id} value={c.careers_id}>
                    {c.careers_name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Skill name</label>
              <input
                type="text"
                placeholder="e.g. Problem Solving"
                value={form.skill_name}
                onChange={(e) => setForm({ ...form, skill_name: e.target.value })}
                style={styles.input}
              />
            </div>

            {error && <div style={styles.errorText}>{error}</div>}

            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={closeModal}>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                onMouseEnter={() => setSaveHover(true)}
                onMouseLeave={() => setSaveHover(false)}
                style={styles.saveBtn(saveHover, saving)}
              >
                {saving ? "Saving…" : editingId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
