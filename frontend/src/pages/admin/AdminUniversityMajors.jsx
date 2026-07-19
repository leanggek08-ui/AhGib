import { useEffect, useState } from "react";
import {
  IconSearch,
  IconSchool,
  IconClipboardList,
  IconPencil,
  IconTrash,
  IconX,
  IconPlus,
} from "@tabler/icons-react";
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
  const [showModal, setShowModal] = useState(false);
  const [addHover, setAddHover] = useState(false);
  const [saveHover, setSaveHover] = useState(false);

  const [form, setForm] = useState({
    university_id: "",
    major_id: "",
    tuition_fee: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getToken = () => localStorage.getItem("token");

  async function loadData() {
    setLoading(true);
    try {
      const token = getToken();

      const [uniRes, majorRes, relationRes] = await Promise.all([
        fetch(`${BASE_URL}/api/universities`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${BASE_URL}/major`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${BASE_URL}/uni-major`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (!uniRes.ok || !majorRes.ok || !relationRes.ok) {
        throw new Error("Failed to load university-major data");
      }

      const uniData = await uniRes.json();
      const majorData = await majorRes.json();
      const relationData = await relationRes.json();

      setUniversities(uniData.data || []);
      setMajors(majorData);
      setAssignments(relationData);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => setForm({ university_id: "", major_id: "", tuition_fee: "" });

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setError("");
    resetForm();
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.university_id || !form.major_id) {
      setError("Please select both a university and a major.");
      return;
    }

    setSaving(true);
    try {
      const token = getToken();
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${BASE_URL}/uni-major/${editingId}` : `${BASE_URL}/uni-major`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save assignment");

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

  const editAssignment = (item) => {
    setEditingId(item.uni_major_id);
    setError("");
    setForm({
      university_id: item.university_id,
      major_id: item.major_id,
      tuition_fee: item.tuition_fee,
    });
    setShowModal(true);
  };

  const deleteAssignment = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;

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
        <div>
          <h1 style={styles.pageTitle}>University majors</h1>
          <p style={styles.subtitle}>Link majors to universities and set tuition fees</p>
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
          Add assignment
        </button>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>
            <IconSearch size={16} stroke={1.75} />
          </span>
          <input
            placeholder="Search by university or major"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filtered.length} assignment{filtered.length !== 1 ? "s" : ""}
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
              <IconClipboardList size={32} stroke={1.5} />
            </div>
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
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF8F3")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={styles.td}>
                    <div style={styles.uniCell}>
                      <div style={styles.uniIcon}>
                        <IconSchool size={17} stroke={1.75} />
                      </div>
                      <div>
                        <div style={styles.uniName}>{item.university_name}</div>
                        <div style={styles.rowId}>ID: {item.uni_major_id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.majorBadge}>{item.major_name}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.price}>${Number(item.tuition_fee).toLocaleString()}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button onClick={() => editAssignment(item)} style={styles.editBtn}>
                        <IconPencil size={14} stroke={1.75} />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAssignment(item.uni_major_id)}
                        disabled={deletingId === item.uni_major_id}
                        style={styles.deleteBtn(deletingId === item.uni_major_id)}
                      >
                        <IconTrash size={14} stroke={1.75} />
                        {deletingId === item.uni_major_id ? "Deleting" : "Delete"}
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
              <h2 style={styles.modalTitle}>{editingId ? "Edit assignment" : "Add assignment"}</h2>
              <button style={styles.closeIcon} onClick={closeModal}>
                <IconX size={18} stroke={1.75} />
              </button>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>University</label>
              <select
                value={form.university_id}
                onChange={(e) => setForm({ ...form, university_id: e.target.value })}
                style={styles.select}
              >
                <option value="">Select university</option>
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
                <option value="">Select major</option>
                {majors.map((m) => (
                  <option key={m.major_id} value={m.major_id}>
                    {m.major_name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Tuition fee ($)</label>
              <input
                type="number"
                placeholder="e.g. 1200"
                value={form.tuition_fee}
                onChange={(e) => setForm({ ...form, tuition_fee: e.target.value })}
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