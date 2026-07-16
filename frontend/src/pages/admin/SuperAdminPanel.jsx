import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/superAdminStyles";

const panelSections = [
  {
    icon: "👤",
    title: "User Management",
    description: "Create Admin accounts and manage user roles.",
    color: "#818CF8",
    path: "/admin/super-users",
  },
  {
    icon: "📜",
    title: "Activity Logs",
    description: "View every important action in the system.",
    color: "#34D399",
    path: "/admin/activity",
  },
  {
    icon: "⚙️",
    title: "System Settings",
    description: "Future configuration page.",
    color: "#FBBF24",
    path: "/admin/settings",
  },
];

export default function SuperAdminPanel() {

  const navigate = useNavigate();

  return (
    <AdminLayout>

      <div style={styles.headerRow}>
        <span style={styles.shieldBadge}>🛡️</span>

        <div>
          <h1 style={styles.pageTitle}>
            Super Admin Panel
          </h1>

          <p style={styles.subtitle}>
            Welcome, Super Admin. You have full control over the system.
          </p>
        </div>
      </div>


      <div style={styles.grid}>

        {panelSections.map((section) => (

          <div
            key={section.title}
            style={{
              ...styles.card,
              cursor: "pointer",
            }}

            onClick={() => navigate(section.path)}

          >

            <div style={styles.cardAccentBar(section.color)} />

            <div style={styles.cardIconWrap(section.color)}>
              {section.icon}
            </div>


            <h3 style={styles.cardTitle}>
              {section.title}
            </h3>


            <p style={styles.cardDescription}>
              {section.description}
            </p>


            <button
              style={{
                marginTop: "15px",
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                background: section.color,
                color: "white",
                cursor: "pointer",
              }}
            >
              Open
            </button>


          </div>

        ))}

      </div>


    </AdminLayout>
  );
}