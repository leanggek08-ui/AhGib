export const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
  },

  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#6B7280",
    fontSize: "15px",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "16px",
    flexWrap: "wrap",
  },

  searchWrap: {
    position: "relative",
    width: "320px",
  },

  searchIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9CA3AF",
    fontSize: "16px",
  },

  searchInput: {
    width: "100%",
    padding: "12px 14px 12px 40px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    fontSize: "14px",
    outline: "none",
    color: "#111827",       
    caretColor: "#111827",
    background: "#fff",
    boxSizing: "border-box",
  },

  countBadge: {
    fontSize: "13px",
    color: "#6B7280",
    fontWeight: "500",
  },

  tableCard: {
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 5px 20px rgba(0,0,0,.05)",
    border: "1px solid #F1F3F5",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "16px 20px",
    fontSize: "12.5px",
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    background: "#F9FAFB",
    borderBottom: "1px solid #F1F3F5",
  },

  td: {
    padding: "16px 20px",
    fontSize: "14.5px",
    color: "#111827",
    borderBottom: "1px solid #F1F3F5",
  },

  row: {
    transition: "background .15s ease",
  },

  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  miniAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4F46E5, #6366F1)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px",
    flexShrink: 0,
  },

  username: {
    fontWeight: "600",
    color: "#111827",
  },

  email: {
    color: "#6B7280",
    fontSize: "13.5px",
  },

  roleBadge: (isSuper) => ({
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12.5px",
    fontWeight: "600",
    background: isSuper ? "#EEF2FF" : "#F3F4F6",
    color: isSuper ? "#4F46E5" : "#4B5563",
  }),

  deleteBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #FECACA",
    background: "#FEF2F2",
    color: "#DC2626",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all .15s ease",
  },

  emptyState: {
    padding: "60px 20px",
    textAlign: "center",
    color: "#9CA3AF",
  },

  emptyIcon: {
    fontSize: "40px",
    marginBottom: "12px",
  },

  skeletonRow: {
    padding: "18px 20px",
    borderBottom: "1px solid #F1F3F5",
  },

  skeletonBar: (width) => ({
    height: "14px",
    width,
    background: "#F1F3F5",
    borderRadius: "6px",
  }),
};