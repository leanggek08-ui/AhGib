import { useEffect, useMemo, useState } from "react";
import {
  IconSearch,
  IconBook2,
  IconArrowNarrowRight,
  IconRoute,
  IconPencil,
  IconTrash,
  IconX,
  IconPlus,
} from "@tabler/icons-react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles, accentFor } from "../../styles/adminMajorCareersStyles";

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
  const [showModal, setShowModal] = useState(false);
  const [addHover, setAddHover] = useState(false);
  const [saveHover, setSaveHover] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const [form, setForm] = useState({
    major_id: "",
    careers_id: "",
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
  }

  const resetForm = () => setForm({ major_id: "", careers_id: "" });

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setError("");
    resetForm();
  };

  const openAddModal = (presetMajorId = "") => {
    setEditingId(null);
    setError("");
    setForm({ major_id: presetMajorId ? String(presetMajorId) : "", careers_id: "" });
    setShowModal(true);
  };

  const handleSubmit = async () => {
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

  const editRelation = (item) => {
    setEditingId(item.major_career_id);
    setError("");
    setForm({
      major_id: String(item.major_id),
      careers_id: String(item.careers_id),
    });
    setShowModal(true);
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

  // Group flat relationship rows into one card per major
  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((item) => {
      if (!map.has(item.major_id)) {
        map.set(item.major_id, {
          major_id: item.major_id,
          major_name: item.major_name,
          items: [],
        });
      }
      map.get(item.major_id).items.push(item);
    });
    return Array.from(map.values());
  }, [filtered]);

  return (
    <AdminLayout>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Major  Career Relationships</h1>
          <p style={styles.subtitle}>Link majors to the careers they lead into</p>
        </div>

        <button
          onClick={() => openAddModal()}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          style={styles.addBtn(addHover)}
        >
          <IconPlus size={16} stroke={2} />
          Add relationship
        </button>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>
            <IconSearch size={16} stroke={1.75} />
          </span>
          <input
            placeholder="Search by major or career"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} relationship{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div style={styles.grid}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={styles.skeletonCard}>
              <div style={styles.skeletonBar("55%")} />
            </div>
          ))}
        </div>
      ) : grouped.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            <IconRoute size={32} stroke={1.5} />
          </div>
          <p>No relationships found{search ? ` for "${search}"` : ""}.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {grouped.map((major) => {
            const accent = accentFor(major.major_name);
            const hovered = hoveredCard === major.major_id;
            return (
              <div
                key={major.major_id}
                style={styles.card(accent, hovered)}
                onMouseEnter={() => setHoveredCard(major.major_id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.majorIcon(accent)}>
                    <IconBook2 size={16} stroke={1.75} />
                  </div>
                  <div style={styles.majorName}>{major.major_name}</div>
                  <span style={styles.careerCount(accent)}>
                    {major.items.length} path{major.items.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div style={styles.chipsRail}>
                  {major.items.map((item) => (
                    <div key={item.major_career_id} style={styles.chip(accent)}>
                      <IconArrowNarrowRight size={14} stroke={2} />
                      <span style={styles.chipLabel}>{item.careers_name}</span>
                      <span style={styles.chipActions}>
                        <button
                          onClick={() => editRelation(item)}
                          style={styles.chipIconBtn(accent, false)}
                          title="Edit"
                        >
                          <IconPencil size={14} stroke={2} />
                        </button>
                        <button
                          onClick={() => deleteRelation(item.major_career_id)}
                          disabled={deletingId === item.major_career_id}
                          style={styles.chipIconBtn(accent, deletingId === item.major_career_id)}
                          title="Delete"
                        >
                          <IconTrash size={14} stroke={2} />
                        </button>
                      </span>
                    </div>
                  ))}

                  <button
                    style={styles.addChip(accent)}
                    onClick={() => openAddModal(major.major_id)}
                  >
                    <IconPlus size={12} stroke={2} />
                    Add career path
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
                {editingId ? "Edit relationship" : "Add relationship"}
              </h2>
              <button style={styles.closeIcon} onClick={closeModal}>
                <IconX size={18} stroke={1.75} />
              </button>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Major</label>
              <select
                value={form.major_id}
                onChange={(e) => setForm({ ...form, major_id: e.target.value })}
                style={styles.select}
              >
                <option value="">Select major</option>
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
                onChange={(e) => setForm({ ...form, careers_id: e.target.value })}
                style={styles.select}
              >
                <option value="">Select career</option>
                {careers.map((career) => (
                  <option key={career.careers_id} value={career.careers_id}>
                    {career.careers_name}
                  </option>
                ))}
              </select>
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
