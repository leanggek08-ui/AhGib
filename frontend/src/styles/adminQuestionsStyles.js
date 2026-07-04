export const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
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

  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    background: "#4F46E5",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(79,70,229,.3)",
    transition: "all .15s ease",
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
    verticalAlign: "top",
  },

  row: {
    transition: "background .15s ease",
  },

  questionText: {
    fontWeight: "500",
    color: "#111827",
    maxWidth: "320px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },

  typeBadge: {
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12.5px",
    fontWeight: "600",
    background: "#EEF2FF",
    color: "#4F46E5",
  },

  subjectBadge: {
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12.5px",
    fontWeight: "600",
    background: "#F0FDF4",
    color: "#16A34A",
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
    transition: "all .15s ease",
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

  /* ===== Modal ===== */

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(17,24,39,.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    backdropFilter: "blur(2px)",
  },

  modal: {
    background: "#fff",
    padding: "28px",
    borderRadius: "18px",
    width: "440px",
    maxWidth: "90%",
    boxShadow: "0 20px 50px rgba(0,0,0,.2)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  modalTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
  },

  closeIcon: {
    cursor: "pointer",
    fontSize: "18px",
    color: "#9CA3AF",
    background: "none",
    border: "none",
  },

  fieldGroup: {
    marginBottom: "16px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  },

  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1px solid #E5E7EB",
    fontSize: "14px",
    outline: "none",
    color: "#111827",
    caretColor: "#111827",
    background: "#fff",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1px solid #E5E7EB",
    fontSize: "14px",
    outline: "none",
    color: "#111827",
    caretColor: "#111827",
    background: "#fff",
    boxSizing: "border-box",
    minHeight: "80px",
    resize: "vertical",
    fontFamily: "inherit",
  },

  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "8px",
  },

  cancelBtn: {
    padding: "11px 20px",
    borderRadius: "10px",
    border: "1px solid #E5E7EB",
    background: "#fff",
    color: "#374151",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },

  saveBtn: {
    padding: "11px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#4F46E5",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(79,70,229,.3)",
  },
};