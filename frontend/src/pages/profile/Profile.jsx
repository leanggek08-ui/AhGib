import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { styles } from "../../styles/profileStyles";
import { Link } from "react-router-dom";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // LOAD PROFILE
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userService.getProfile();
        setUser(data);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

 return (
  <div style={styles.page}>
    <div style={styles.card}>
      <Link
        to={user?.role_id === 1 || user?.role_id === 3 ? "/admin/dashboard" : "/student/dashboard"}
        style={styles.backlink}
      >
        ← Back to Dashboard
      </Link>

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
        {message && <p style={{ color: "#ff8a8a" }}>{message}</p>}
        <div style={styles.row}>
          <span style={styles.label}>Email</span>
          <span style={styles.value}>{user?.email}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Role</span>
          <span style={styles.badge}>
            {user?.role_id === 3 ? "Super Admin" : user?.role_id === 1 ? "Admin" : "Student"}
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

