import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await userService.getProfile();
      setUsername(data.username);
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await userService.updateProfile(username);
    setSaving(false);
    navigate("/profile"); // go back
  };

  if (loading) return <p>Loading...</p>;

return (
  <div style={styles.page}>
    <div style={styles.card}>

      <div style={styles.header}>
        <h2 style={styles.title}>Edit Profile</h2>
        <p style={styles.subtitle}>Update your account information</p>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          placeholder="Enter username"
        />
      </div>

      <button
        onClick={handleSave}
        style={styles.button}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

      <button
        onClick={() => navigate("/profile")}
        style={styles.backButton}
      >
        ← Back to Profile
      </button>

    </div>
  </div>
);
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #2a1450, #0f081f)",
    padding: "20px",
  },

  card: {
    width: "420px",
    padding: "28px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(12px)",
    color: "#fff",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  },

  header: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "6px",
  },

  subtitle: {
    fontSize: "13px",
    opacity: 0.7,
  },

  formGroup: {
    marginBottom: "18px",
  },

  label: {
    fontSize: "12px",
    opacity: 0.8,
    display: "block",
    marginBottom: "6px",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    outline: "none",
    fontSize: "14px",
    transition: "0.2s",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#5313C0",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.2s",
  },

  backButton: {
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#aaa",
    borderRadius: "10px",
    cursor: "pointer",
  },
};