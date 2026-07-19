// adminLayoutStyles.js — warm paper theme, matches dashboard

export const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#F6F4EF",
    fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },

  content: {
    flex: 1,
    padding: "32px",
    background: "#F6F4EF",
    overflowY: "auto",
  },

  /* ================= Sidebar ================= */

  sidebar: {
    width: "248px",
    background: "#FFFFFF",
    borderRight: "1px solid #EAE5D8",
    color: "#232620",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "24px 14px",
    position: "sticky",
    top: 0,
    height: "100vh",
  },

  logo: {
    fontFamily: "'Baloo 2', sans-serif",
    fontSize: "19px",
    fontWeight: "600",
    color: "#232620",
    padding: "0 10px",
    marginBottom: "2px",
  },

  logoSub: {
    fontSize: "11.5px",
    color: "#B0AA98",
    padding: "0 10px",
    marginBottom: "28px",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#8A8576",
    fontWeight: "500",
    fontSize: "13.5px",
    borderLeft: "2px solid transparent",
    transition: "background 0.12s ease, color 0.12s ease",
  },

  menuIcon: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },

  activeMenu: {
    background: "#0F6E5614",
    color: "#0F6E56",
    borderLeft: "2px solid #0F6E56",
  },

  sidebarFooter: {
    display: "flex",
    flexDirection: "column",
  },

  divider: {
    height: "1px",
    background: "#EAE5D8",
    margin: "16px 10px",
  },

  // adminLayoutStyles.js — replace the flat logout style with the gradient button

  logout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px",
    margin: "0 10px",
    borderRadius: "8px",
    background: "linear-gradient(90deg, #5313C0, #6C1EB1, #6733B9)",
    color: "#FFFFFF",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "background 0.15s ease",
  },

  /* ================= Topbar ================= */

  topbar: {
    height: "64px",
    background: "#F6F4EF",
    borderBottom: "1px solid #EAE5D8",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  title: {
    fontFamily: "'Baloo 2', sans-serif",
    fontSize: "16px",
    fontWeight: "600",
    color: "#232620",
  },

  subtitle: {
    fontSize: "12.5px",
    color: "#B0AA98",
    marginTop: "1px",
  },

  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingLeft: "16px",
    borderLeft: "1px solid #EAE5D8",
  },

  userInfo: {
    textAlign: "right",
  },

  userName: {
    fontWeight: "600",
    fontSize: "13.5px",
    color: "#232620",
  },

  userRole: {
    fontSize: "11.5px",
    color: "#B0AA98",
    marginTop: "1px",
  },

  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#0F6E5614",
    color: "#0F6E56",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "13.5px",
  },
   sectionLabel: {
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#B0AA98",
    padding: "0 12px",
    margin: "20px 0 8px",
  },

  menuItemHover: {
    background: "#F6F4EF",
    color: "#232620",
  },
};