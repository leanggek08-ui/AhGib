import { useEffect, useState } from "react";
import {
  IconSearch,
  IconBook2,
  IconPencil,
  IconTrash,
  IconX,
  IconPlus,
} from "@tabler/icons-react";
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
  const [showModal, setShowModal] = useState(false);
  const [addHover, setAddHover] = useState(false);
  const [saveHover, setSaveHover] = useState(false);

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

  const resetForm = () => setForm({ major_name: "", field_of_study: "" });

  const handleSubmit = async () => {
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

      resetForm();
      setEditingId(null);
      setShowModal(false);
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
      field_of_study: major.field_of_study || "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setError("");
    resetForm();
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
        <div>
          <h1 style={styles.pageTitle}>Majors</h1>
          <p style={styles.subtitle}>Manage academic majors available in the system</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setError("");
            resetForm();
            setShowModal(true);
          }}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          style={styles.addBtn(addHover)}
        >
          <IconPlus size={16} stroke={2} />
          Add major
        </button>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>
            <IconSearch size={16} stroke={1.75} />
          </span>
          <input
            placeholder="Search by major or field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} major{filtered.length !== 1 ? "s" : ""}
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
              <IconBook2 size={32} stroke={1.5} />
            </div>
            <p>No majors found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Major</th>
                <th style={styles.th}>Field of study</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((m) => (
                <tr
                  key={m.major_id}
                  style={styles.row}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF8F3")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={styles.td}>
                    <div style={styles.majorCell}>
                      <div style={styles.majorIcon}>
                        <IconBook2 size={18} stroke={1.75} />
                      </div>
                      <div>
                        <div style={styles.majorName}>{m.major_name}</div>
                        <div style={styles.majorId}>ID: {m.major_id}</div>
                      </div>
                    </div>
                  </td>

                  <td style={styles.td}>
                    {m.field_of_study ? (
                      <span style={styles.fieldBadge}>{m.field_of_study}</span>
                    ) : (
                      <span style={styles.noField}>—</span>
                    )}
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button onClick={() => editMajor(m)} style={styles.editBtn}>
                        <IconPencil size={14} stroke={1.75} />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMajor(m.major_id)}
                        disabled={deletingId === m.major_id}
                        style={styles.deleteBtn(deletingId === m.major_id)}
                      >
                        <IconTrash size={14} stroke={1.75} />
                        {deletingId === m.major_id ? "Deleting" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingId ? "Edit major" : "Add major"}
              </h2>
              <button style={styles.closeIcon} onClick={closeModal}>
                <IconX size={18} stroke={1.75} />
              </button>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Major name</label>
              <input
                placeholder="e.g. Computer Science"
                value={form.major_name}
                onChange={(e) => setForm({ ...form, major_name: e.target.value })}
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Field of study</label>
              <input
                placeholder="e.g. Engineering & Technology"
                value={form.field_of_study}
                onChange={(e) => setForm({ ...form, field_of_study: e.target.value })}
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
