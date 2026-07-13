export const styles = {
  header: {
    marginBottom: "24px",
  },

  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "6px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  subtitle: {
    color: "#6B7280",
    fontSize: "15px",
  },

  /* ===== Form Card ===== */

  formCard: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 5px 20px rgba(0,0,0,.05)",
    border: "1px solid #F1F3F5",
    marginBottom: "24px",
  },

  formTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "18px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "14px",
    marginBottom: "18px",
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1px solid #E5E7EB",
    fontSize: "14px",
    outline: "none",
    color: "#111827",
    caretColor: "#111827",
    background: "#fff",
    boxSizing: "border-box",
    width: "100%",
  },

  select: {
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1px solid #E5E7EB",
    fontSize: "14px",
    outline: "none",
    color: "#111827",
    background: "#fff",
    boxSizing: "border-box",
    width: "100%",
    cursor: "pointer",
    appearance: "auto",
  },

  formActions: {
    display: "flex",
    gap: "10px",
  },

  saveBtn: {
    padding: "12px 22px",
    borderRadius: "10px",
    border: "none",
    background: "#4F46E5",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(79,70,229,.3)",
  },

  cancelBtn: {
    padding: "12px 22px",
    borderRadius: "10px",
    border: "1px solid #E5E7EB",
    background: "#fff",
    color: "#374151",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },

  errorText: {
    color: "#DC2626",
    fontSize: "13px",
    marginTop: "-8px",
    marginBottom: "14px",
  },

  /* ===== Toolbar ===== */

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
    background: "#fff",
    color: "#111827",
    caretColor: "#111827",
    boxSizing: "border-box",
  },

  countBadge: {
    fontSize: "13px",
    color: "#6B7280",
    fontWeight: "500",
  },

  /* ===== Table ===== */

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

  uniCell: {
    fontWeight: "600",
    color: "#111827",
  },

  majorBadge: {
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12.5px",
    fontWeight: "600",
    background: "#EEF2FF",
    color: "#4F46E5",
  },

  tuition: {
    fontWeight: "700",
    color: "#16A34A",
    fontSize: "14.5px",
  },

  actions: {
    display: "flex",
    gap: "8px",
  },

  editBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #FDE68A",
    background: "#FFFBEB",
    color: "#B45309",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #FECACA",
    background: "#FEF2F2",
    color: "#DC2626",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
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