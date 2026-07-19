import { useEffect, useState } from "react";
import {
  IconSearch,
  IconBriefcase,
  IconPencil,
  IconTrash,
  IconX,
  IconPlus,
} from "@tabler/icons-react";
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
  const [showModal, setShowModal] = useState(false);
  const [addHover, setAddHover] = useState(false);
  const [saveHover, setSaveHover] = useState(false);

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

  const resetForm = () => setForm({ careers_name: "", description: "" });

  const handleSubmit = async () => {
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

      resetForm();
      setEditingId(null);
      setShowModal(false);
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
      description: career.description || "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setError("");
    resetForm();
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
        <div>
          <h1 style={styles.pageTitle}>Careers</h1>
          <p style={styles.subtitle}>Manage career paths available in the system</p>
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
          Add career
        </button>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>
            <IconSearch size={16} stroke={1.75} />
          </span>
          <input
            placeholder="Search by career or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} career{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div style={styles.tableCard}>
        {loading ? (
          <div>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={styles.skeletonRow}>
                <div style={styles.skeletonBar("65%")} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <IconBriefcase size={32} stroke={1.5} />
            </div>
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
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF8F3")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={styles.td}>
                    <div style={styles.careerCell}>
                      <div style={styles.careerIcon}>
                        <IconBriefcase size={18} stroke={1.75} />
                      </div>
                      <div>
                        <div style={styles.careerName}>{career.careers_name}</div>
                        <div style={styles.careerId}>ID: {career.careers_id}</div>
                      </div>
                    </div>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.description}>
                      {career.description || (
                        <span style={styles.noDescription}>—</span>
                      )}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button onClick={() => editCareer(career)} style={styles.editBtn}>
                        <IconPencil size={14} stroke={1.75} />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCareer(career.careers_id)}
                        disabled={deletingId === career.careers_id}
                        style={styles.deleteBtn(deletingId === career.careers_id)}
                      >
                        <IconTrash size={14} stroke={1.75} />
                        {deletingId === career.careers_id ? "Deleting" : "Delete"}
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
                {editingId ? "Edit career" : "Add career"}
              </h2>
              <button style={styles.closeIcon} onClick={closeModal}>
                <IconX size={18} stroke={1.75} />
              </button>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Career name</label>
              <input
                placeholder="e.g. Software Engineer"
                value={form.careers_name}
                onChange={(e) => setForm({ ...form, careers_name: e.target.value })}
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                placeholder="Brief description of this career path..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                style={styles.textarea}
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
