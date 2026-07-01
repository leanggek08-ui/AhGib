import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { styles } from "../../styles/profileStyles";
import { Link } from "react-router-dom";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // LOAD PROFILE
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userService.getProfile();
        setUser(data);
        setUsername(data.username);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // UPDATE PROFILE
  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const updated = await userService.updateProfile(username);
      setUser(updated);
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

 return (
  <div style={styles.page}>
    <div style={styles.card}>

      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.avatar}>
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 style={styles.title}>{user?.username}</h2>
          <p style={styles.subtitle}>Your account overview</p>
        </div>
      </div>

      {/* INFO */}
      <div style={styles.infoBox}>
        <div style={styles.row}>
          <span style={styles.label}>Email</span>
          <span style={styles.value}>{user?.email}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Role</span>
          <span style={styles.badge}>
            {user?.role_id === 1 ? "Admin" : "Student"}
          </span>
        </div>
      </div>

      {/* ACTION */}
      <Link to="/profile/edit" style={styles.button}>
        Edit Profile
      </Link>

    </div>
  </div>
);
}

