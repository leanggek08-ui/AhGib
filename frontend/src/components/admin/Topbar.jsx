import { styles } from "../../styles/adminLayoutStyles";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.topbar}>
      <div>
        <h2 style={styles.title}>Admin Management</h2>
      </div>

      <div style={styles.userArea}>
        <div>
          <div style={{ fontWeight: 600 }}>
            {user?.username || "Admin"}
          </div>

          <div
            style={{
              fontSize: "13px",
              color: "#6B7280",
            }}
          >
            {user?.role_id === 1 ? "Super Admin" : "Admin"}
          </div>
        </div>

        <div style={styles.avatar}>
          {(user?.username || "A")
            .charAt(0)
            .toUpperCase()}
        </div>
      </div>
    </div>
  );
}