import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { questionService } from "../../services/questionService";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    question_text: "",
    question_type: "",
    subject: ""
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await questionService.getAll();
      setQuestions(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      await questionService.delete(id);
      setQuestions(questions.filter((q) => q.question_id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!form.question_text || !form.question_type || !form.subject) {
      alert("Please fill all fields");
      return;
    }

    try {
      await questionService.create({
        question_text: form.question_text,
        question_type: form.question_type,
        subject: form.subject
    });
    // reset form
    setForm({
      question_text: "",
      question_type: "",
      subject: ""
    });

    // close modal
    setShowModal(false);

    // reload table
    loadQuestions();

    alert("Question created successfully ✅");
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredQuestions = questions.filter((q) =>
    q.question_text.toLowerCase().includes(search.toLowerCase()) ||
    q.question_type.toLowerCase().includes(search.toLowerCase()) ||
    q.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={{ padding: 20 }}>

        <h1 style={{ fontSize: 24, fontWeight: "bold" }}>
          Questions Management
        </h1>

        {/* SEARCH */}
        <input
          placeholder="Search question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginTop: 15,
            marginBottom: 20,
            padding: 10,
            width: "300px",
            borderRadius: 6,
          }}
        />

        {/* ADD BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          style={{
            marginLeft: 10,
            padding: "10px 15px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          + Add Question
        </button>

        {/* TABLE */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table
            style={{
              width: "100%",
              marginTop: 20,
              borderCollapse: "collapse",
              background: "#fff",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <thead style={{ background: "#f3f4f6" }}>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Type</th>
                <th>Subject</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredQuestions.map((q) => (
                <tr key={q.question_id}>
                  <td>{q.question_id}</td>
                  <td>{q.question_text}</td>
                  <td>{q.question_type}</td>
                  <td>{q.subject}</td>

                  <td>
                    <button
                      style={{
                        marginRight: 8,
                        padding: "5px 10px",
                        background: "#f59e0b",
                        border: "none",
                        borderRadius: 5,
                        color: "white",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(q.question_id)}
                      style={{
                        padding: "5px 10px",
                        background: "#ef4444",
                        border: "none",
                        borderRadius: 5,
                        color: "white",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* MODAL */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              style={{
                background: "white",
                padding: 20,
                borderRadius: 10,
                width: 400
              }}
            >
              <h2>Add Question</h2>

              <input
                name="question_text"
                placeholder="Question"
                value={form.question_text}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: 10 }}
              />

              <input
                name="question_type"
                placeholder="Question Type"
                value={form.question_type}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: 10 }}
              />

              <input
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: 10 }}
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => setShowModal(false)}>
                    Cancel
                </button>

                
                <button onClick={handleCreate} disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}