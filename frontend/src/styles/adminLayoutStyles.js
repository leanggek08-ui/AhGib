export const styles = {
  // Whole page
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#F8FAFC",
    fontFamily: "Inter, sans-serif",
  },

  // Right side (Topbar + Content)
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  // Page content
  content: {
    flex: 1,
    padding: "32px",
    background: "#F8FAFC",
    overflowY: "auto",
  },

  /* ================= Sidebar ================= */

  sidebar: {
    width: "260px",
    background: "#1E1B4B",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "24px 18px",
    boxShadow: "4px 0 20px rgba(0,0,0,.08)",
  },

  logo: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "40px",
    textAlign: "center",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  menuItem: {
    padding: "14px 18px",
    borderRadius: "12px",
    textDecoration: "none",
    color: "#D1D5DB",
    fontWeight: "500",
    transition: ".25s",
  },

  activeMenu: {
    background: "#4F46E5",
    color: "#fff",
  },

  logout: {
    padding: "14px",
    borderRadius: "12px",
    background: "#DC2626",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },

  /* ================= Topbar ================= */

  topbar: {
    height: "72px",
    background: "#fff",
    borderBottom: "1px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
  },

  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
  },

  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#4F46E5",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "18px",
  },
};