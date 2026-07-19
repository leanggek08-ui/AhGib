import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconShieldStar, IconUsers, IconActivity, IconArrowRight } from "@tabler/icons-react";
import AdminLayout from "../../layouts/AdminLayout";
import { styles } from "../../styles/superAdminStyles";

const panelSections = [
  {
    icon: IconUsers,
    title: "User management",
    description: "Create admin accounts and manage user roles.",
    path: "/admin/super-users",
  },
  {
    icon: IconActivity,
    title: "Activity logs",
    description: "View every important action in the system.",
    path: "/admin/activity",
  },
];

function PanelCard({ section, onClick }) {
  const [hover, setHover] = useState(false);
  const Icon = section.icon;

  return (
    <div
      style={styles.card(hover)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div style={styles.cardIconWrap}>
        <Icon size={19} stroke={1.75} />
      </div>
      <h3 style={styles.cardTitle}>{section.title}</h3>
      <p style={styles.cardDescription}>{section.description}</p>
      <button style={styles.openBtn(hover)}>
        Open
        <IconArrowRight size={14} stroke={2} />
      </button>
    </div>
  );
}

export default function SuperAdminPanel() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div style={styles.headerRow}>
        <span style={styles.shieldBadge}>
          <IconShieldStar size={22} stroke={1.75} />
        </span>
        <div>
          <h1 style={styles.pageTitle}>Super admin panel</h1>
          <p style={styles.subtitle}>Welcome, super admin. You have full control over the system.</p>
        </div>
      </div>

      <div style={styles.grid}>
        {panelSections.map((section) => (
          <PanelCard
            key={section.title}
            section={section}
            onClick={() => navigate(section.path)}
          />
        ))}
      </div>
    </AdminLayout>
  );
}