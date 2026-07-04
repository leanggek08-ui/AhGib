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
    minWidth: 0, // prevents content overflow issues
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
    padding: "28px 16px",
    boxShadow: "4px 0 20px rgba(0,0,0,.08)",
    position: "sticky",
    top: 0,
    height: "100vh",
  },

  logo: {
    fontSize: "24px",
    fontWeight: "800",
    marginBottom: "8px",
    textAlign: "center",
    letterSpacing: "0.5px",
  },

  logoSub: {
    fontSize: "12px",
    color: "#9CA3FF",
    textAlign: "center",
    marginBottom: "36px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    color: "#C7CBF5",
    fontWeight: "500",
    fontSize: "14.5px",
    transition: "all .2s ease",
  },

  activeMenu: {
    background: "#4F46E5",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(79,70,229,.4)",
  },

  menuIcon: {
    fontSize: "18px",
    width: "22px",
    textAlign: "center",
  },

  sidebarFooter: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,.08)",
    margin: "16px 0",
  },

  logout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "13px",
    borderRadius: "10px",
    background: "rgba(220,38,38,.12)",
    color: "#FCA5A5",
    border: "1px solid rgba(220,38,38,.25)",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all .2s ease",
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
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: "13px",
    color: "#9CA3AF",
    marginTop: "2px",
  },

  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    paddingLeft: "16px",
    borderLeft: "1px solid #E5E7EB",
  },

  userInfo: {
    textAlign: "right",
  },

  userName: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#111827",
  },

  userRole: {
    fontSize: "12px",
    color: "#6B7280",
    marginTop: "1px",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4F46E5, #6366F1)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "16px",
    boxShadow: "0 3px 8px rgba(79,70,229,.35)",
  },
};