import { useEffect, useState } from "react";
import { IconSearch, IconHelpCircle, IconPencil, IconTrash, IconX, IconPlus } from "@tabler/icons-react";
import AdminLayout from "../../layouts/AdminLayout";
import { questionService } from "../../services/questionService";
import { styles } from "../../styles/adminQuestionsStyles";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [addHover, setAddHover] = useState(false);
  const [saveHover, setSaveHover] = useState(false);

  const [form, setForm] = useState({
    question_text: "",
    question_type: "",
    subject: "",
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await questionService.getAll();
      setQuestions(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    setDeletingId(id);
    try {
      await questionService.delete(id);
      setQuestions(questions.filter((q) => q.question_id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () =>
    setForm({ question_text: "", question_type: "", subject: "" });

  const handleCreate = async () => {
    if (!form.question_text || !form.question_type || !form.subject) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSaving(true);
      await questionService.create(form);
      resetForm();
      setShowModal(false);
      loadQuestions();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (question) => {
    setEditingId(question.question_id);
    setForm({
      question_text: question.question_text,
      question_type: question.question_type,
      subject: question.subject,
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      await questionService.update(editingId, form);
      setShowModal(false);
      setEditingId(null);
      resetForm();
      loadQuestions();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredQuestions = questions.filter(
    (q) =>
      q.question_text.toLowerCase().includes(search.toLowerCase()) ||
      q.question_type.toLowerCase().includes(search.toLowerCase()) ||
      q.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Questions</h1>
          <p style={styles.subtitle}>Manage assessment questions</p>
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
          Add question
        </button>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>
            <IconSearch size={16} stroke={1.75} />
          </span>
          <input
            placeholder="Search by question, type, or subject"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          {filteredQuestions.length} question
          {filteredQuestions.length !== 1 ? "s" : ""}
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
        ) : filteredQuestions.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <IconHelpCircle size={32} stroke={1.5} />
            </div>
            <p>No questions found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Question</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Subject</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredQuestions.map((q) => (
                <tr
                  key={q.question_id}
                  style={styles.row}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF8F3")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={styles.td}>
                    <div style={styles.questionText}>{q.question_text}</div>
                    <div style={styles.questionId}>ID: {q.question_id}</div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.typeBadge}>{q.question_type}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.subjectBadge}>{q.subject}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button onClick={() => handleEdit(q)} style={styles.editBtn}>
                        <IconPencil size={14} stroke={1.75} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(q.question_id)}
                        disabled={deletingId === q.question_id}
                        style={styles.deleteBtn(deletingId === q.question_id)}
                      >
                        <IconTrash size={14} stroke={1.75} />
                        {deletingId === q.question_id ? "Deleting" : "Delete"}
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
                {editingId ? "Edit question" : "Add question"}
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
              <label style={styles.label}>Question</label>
              <textarea
                name="question_text"
                placeholder="Enter the question"
                value={form.question_text}
                onChange={handleChange}
                style={styles.textarea}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Question type</label>
              <input
                name="question_type"
                placeholder="e.g. Multiple choice"
                value={form.question_type}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Subject</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select a subject</option>
                <option value="Technology">Technology</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Business">Business</option>
                <option value="Language">Language</option>
                <option value="Creativity">Creativity</option>
                <option value="Leadership">Leadership</option>
                <option value="Communication">Communication</option>
              </select>
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