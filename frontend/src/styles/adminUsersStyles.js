// adminUsersStyles.js — warm paper theme, matches dashboard/sidebar

export const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
  },

  pageTitle: {
    fontFamily: "'Baloo 2', 'Plus Jakarta Sans', sans-serif",
    fontSize: "22px",
    fontWeight: "600",
    color: "#232620",
    marginBottom: "4px",
  },

  subtitle: {
    color: "#8A8576",
    fontSize: "13.5px",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    gap: "16px",
    flexWrap: "wrap",
  },

  searchWrap: {
    position: "relative",
    width: "320px",
  },

  searchIcon: {
    position: "absolute",
    left: "13px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#B0AA98",
    display: "flex",
  },

  searchInput: {
    width: "100%",
    padding: "10px 14px 10px 38px",
    borderRadius: "10px",
    border: "1px solid #EAE5D8",
    fontSize: "13.5px",
    outline: "none",
    color: "#232620",
    caretColor: "#232620",
    background: "#FFFFFF",
    boxSizing: "border-box",
  },

  countBadge: {
    fontSize: "12.5px",
    color: "#8A8576",
    fontWeight: "500",
  },

  tableCard: {
    background: "#FFFFFF",
    borderRadius: "14px",
    border: "1px solid #EAE5D8",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "13px 20px",
    fontSize: "11.5px",
    fontWeight: "600",
    color: "#8A8576",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    background: "#FAF8F3",
    borderBottom: "1px solid #EAE5D8",
  },

  td: {
    padding: "14px 20px",
    fontSize: "13.5px",
    color: "#232620",
    borderBottom: "1px solid #F2EFE6",
  },

  row: {
    transition: "background 0.12s ease",
  },

  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  miniAvatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#0F6E5614",
    color: "#0F6E56",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "13px",
    flexShrink: 0,
  },

  username: {
    fontWeight: "600",
    color: "#232620",
  },

  userId: {
    fontSize: "11.5px",
    color: "#B0AA98",
  },

  email: {
    color: "#8A8576",
    fontSize: "13px",
  },

  roleBadge: (role) => {
    const map = {
      3: { bg: "#5313C014", text: "#5313C0", label: "Super admin" },
      1: { bg: "#0F6E5614", text: "#0F6E56", label: "Admin" },
      2: { bg: "#F2EFE6", text: "#8A8576", label: "Student" },
    };
    const r = map[role] || map[2];
    return {
      display: "inline-block",
      padding: "4px 11px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      background: r.bg,
      color: r.text,
    };
  },

  actionRow: {
    display: "flex",
    gap: "8px",
  },

  editBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "7px 12px",
    borderRadius: "8px",
    border: "1px solid #F2A93B44",
    background: "#F2A93B14",
    color: "#8A5B0A",
    fontWeight: "600",
    fontSize: "12.5px",
    cursor: "pointer",
  },

  deleteBtn: (disabled) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "7px 12px",
    borderRadius: "8px",
    border: "1px solid #F7676744",
    background: "#F7676714",
    color: "#B3261E",
    fontWeight: "600",
    fontSize: "12.5px",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.55 : 1,
  }),

  emptyState: {
    padding: "56px 20px",
    textAlign: "center",
    color: "#B0AA98",
  },

  emptyIcon: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
    color: "#D9D3C3",
  },

  skeletonRow: {
    padding: "17px 20px",
    borderBottom: "1px solid #F2EFE6",
  },

  skeletonBar: (width) => ({
    height: "13px",
    width,
    background: "#F2EFE6",
    borderRadius: "6px",
  }),

  /* ================= Modal ================= */

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(35,38,32,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
  },

  modalCard: {
    width: "380px",
    background: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #EAE5D8",
    padding: "24px",
  },

  modalTitle: {
    fontFamily: "'Baloo 2', sans-serif",
    fontSize: "17px",
    fontWeight: "600",
    color: "#232620",
    marginBottom: "18px",
  },

  fieldLabel: {
    display: "block",
    fontSize: "12.5px",
    fontWeight: "600",
    color: "#8A8576",
    marginBottom: "6px",
  },

  fieldInput: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "16px",
    borderRadius: "9px",
    border: "1px solid #EAE5D8",
    fontSize: "13.5px",
    color: "#232620",
    boxSizing: "border-box",
    outline: "none",
  },

  fieldSelect: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "20px",
    borderRadius: "9px",
    border: "1px solid #EAE5D8",
    fontSize: "13.5px",
    color: "#232620",
    boxSizing: "border-box",
    outline: "none",
    background: "#FFFFFF",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  cancelBtn: {
    padding: "9px 16px",
    borderRadius: "8px",
    border: "1px solid #EAE5D8",
    background: "#FFFFFF",
    color: "#8A8576",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
  },

  updateBtn: (hover, disabled) => ({
    padding: "9px 18px",
    borderRadius: "8px",
    border: "none",
    background: hover && !disabled
      ? "#6733B9"
      : "linear-gradient(90deg, #5313C0, #6C1EB1, #6733B9)",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: "13px",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.7 : 1,
    transition: "background 0.15s ease",
  }),
};