// superAdminUsersStyles.js — matches the navy/indigo AhGib admin theme

export const styles = {
  

  pageTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: "15px",
    marginBottom: "28px",
  },

  loadingText: {
    color: "#E5E7EB",
    fontSize: "15px",
  },

  tableWrap: {
    background: "#1E2333",
    borderRadius: "18px",
    border: "1px solid #2B3245",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "16px 20px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #2B3245",
    background: "#171B2B",
  },

  row: {
    borderBottom: "1px solid #2B3245",
  },

  td: {
    padding: "14px 20px",
    fontSize: "14.5px",
    color: "#E5E7EB",
  },

  emptyCell: {
    padding: "24px 20px",
    fontSize: "14px",
    color: "#6B7280",
    textAlign: "center",
  },

  roleBadge: (color) => ({
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "700",
    padding: "4px 12px",
    borderRadius: "20px",
    background: `${color}26`,
    color: color,
  }),

  select: {
    background: "#171B2B",
    color: "#F9FAFB",
    border: "1px solid #2B3245",
    borderRadius: "8px",
    padding: "6px 10px",
    fontSize: "13.5px",
    cursor: "pointer",
  },
  deleteButton: (busy) => ({
    background: busy ? "#374151" : "#4C0519",
    color: busy ? "#9CA3AF" : "#FCA5A5",
    border: "1px solid #7F1D1D",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: busy ? "not-allowed" : "pointer",
    transition: "background 0.15s ease",
  }),
 
};