import { useEffect, useState } from "react";
import {
  IconSearch,
  IconSchool,
  IconMapPin,
  IconLink,
  IconPencil,
  IconTrash,
  IconX,
  IconPlus,
  IconBuildingArch,
} from "@tabler/icons-react";
import AdminLayout from "../../layouts/AdminLayout";
import { universityService } from "../../services/universityService";
import { styles } from "../../styles/adminUniversitiesStyles";

export default function AdminUniversities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [addHover, setAddHover] = useState(false);
  const [saveHover, setSaveHover] = useState(false);

  const [form, setForm] = useState({
    name: "",
    location: "",
    website: "",
  });

  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async () => {
    try {
      const data = await universityService.getAllUniversities();
      setUniversities(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => setForm({ name: "", location: "", website: "" });

  const handleCreate = async () => {
    if (!form.name.trim()) {
      alert("University name is required.");
      return;
    }

    try {
      setSaving(true);
      await universityService.createUniversity(form);
      resetForm();
      setShowModal(false);
      loadUniversities();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (uni) => {
    setEditingId(uni.university_id);
    setForm({
      name: uni.name,
      location: uni.location || "",
      website: uni.website || "",
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!form.name.trim()) {
      alert("University name is required.");
      return;
    }

    try {
      setSaving(true);
      await universityService.updateUniversity(editingId, form);
      setShowModal(false);
      setEditingId(null);
      resetForm();
      loadUniversities();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this university?")) return;

    setDeletingId(id);
    try {
      await universityService.deleteUniversity(id);
      setUniversities(universities.filter((u) => u.university_id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredUniversities = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      (u.location || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Universities</h1>
          <p style={styles.subtitle}>Manage universities available in the system</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            resetForm();
            setShowModal(true);
          }}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          style={styles.addBtn(addHover)}
        >
          <IconPlus size={16} stroke={2} />
          Add university
        </button>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>
            <IconSearch size={16} stroke={1.75} />
          </span>
          <input
            placeholder="Search by name or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filteredUniversities.length} universit
          {filteredUniversities.length !== 1 ? "ies" : "y"}
        </span>
      </div>

      <div style={styles.tableCard}>
        {loading ? (
          <div>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={styles.skeletonRow}>
                <div style={styles.skeletonBar("70%")} />
              </div>
            ))}
          </div>
        ) : filteredUniversities.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <IconBuildingArch size={32} stroke={1.5} />
            </div>
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
              {filteredUniversities.map((u) => (
                <tr
                  key={u.university_id}
                  style={styles.row}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF8F3")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={styles.td}>
                    <div style={styles.uniCell}>
                      <div style={styles.uniIcon}>
                        <IconSchool size={18} stroke={1.75} />
                      </div>
                      <div>
                        <div style={styles.uniName}>{u.name}</div>
                        <div style={styles.uniId}>ID: {u.university_id}</div>
                      </div>
                    </div>
                  </td>

                  <td style={styles.td}>
                    {u.location ? (
                      <span style={styles.location}>
                        <IconMapPin size={14} stroke={1.75} />
                        {u.location}
                      </span>
                    ) : (
                      <span style={styles.noWebsite}>—</span>
                    )}
                  </td>

                  <td style={styles.td}>
                    {u.website ? (
                      <a
                        href={u.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.websiteLink}
                      >
                        <IconLink size={14} stroke={1.75} />
                        Visit site
                      </a>
                    ) : (
                      <span style={styles.noWebsite}>No website</span>
                    )}
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button onClick={() => handleEdit(u)} style={styles.editBtn}>
                        <IconPencil size={14} stroke={1.75} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u.university_id)}
                        disabled={deletingId === u.university_id}
                        style={styles.deleteBtn(deletingId === u.university_id)}
                      >
                        <IconTrash size={14} stroke={1.75} />
                        {deletingId === u.university_id ? "Deleting" : "Delete"}
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
                {editingId ? "Edit university" : "Add university"}
              </h2>
              <button
                style={styles.closeIcon}
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  resetForm();
                }}
              >
                <IconX size={18} stroke={1.75} />
              </button>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>University name</label>
              <input
                name="name"
                placeholder="e.g. Royal University of Phnom Penh"
                value={form.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Location</label>
              <input
                name="location"
                placeholder="e.g. Phnom Penh, Cambodia"
                value={form.location}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Website</label>
              <input
                name="website"
                placeholder="e.g. https://rupp.edu.kh"
                value={form.website}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.modalFooter}>
              <button
                style={styles.cancelBtn}
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button
                onClick={editingId ? handleUpdate : handleCreate}
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
