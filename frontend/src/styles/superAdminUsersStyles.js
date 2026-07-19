// superAdminUsersStyles.js — warm paper theme, matches Users page

export const styles = {
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "24px",
  },

  headerIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "#5313C014",
    color: "#5313C0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  pageTitle: {
    fontFamily: "'Baloo 2', 'Plus Jakarta Sans', sans-serif",
    fontSize: "22px",
    fontWeight: "600",
    color: "#232620",
    margin: 0,
    marginBottom: "4px",
  },

  subtitle: {
    color: "#8A8576",
    fontSize: "13.5px",
    margin: 0,
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
    background: "#FFFFFF",
    color: "#232620",
    caretColor: "#232620",
    boxSizing: "border-box",
  },

  countBadge: {
    fontSize: "12.5px",
    color: "#8A8576",
    fontWeight: "500",
  },

  tableWrap: {
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

  row: {
    borderBottom: "1px solid #F2EFE6",
    transition: "background 0.12s ease",
  },

  td: {
    padding: "14px 20px",
    fontSize: "13.5px",
    color: "#232620",
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

  roleBadge: (role) => {
    const map = {
      3: { bg: "#5313C014", text: "#5313C0" },
      1: { bg: "#0F6E5614", text: "#0F6E56" },
      2: { bg: "#F2EFE6", text: "#8A8576" },
    };
    const r = map[role] || map[2];
    return {
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "600",
      padding: "4px 11px",
      borderRadius: "20px",
      background: r.bg,
      color: r.text,
    };
  },

  currentAccountText: {
    fontSize: "12.5px",
    color: "#B0AA98",
    fontStyle: "italic",
  },

  select: {
    background: "#FFFFFF",
    color: "#232620",
    border: "1px solid #EAE5D8",
    borderRadius: "8px",
    padding: "7px 10px",
    fontSize: "13px",
    cursor: "pointer",
    outline: "none",
  },

  deleteButton: (busy) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: busy ? "#F2EFE6" : "#F7676714",
    color: busy ? "#B0AA98" : "#B3261E",
    border: `1px solid ${busy ? "#EAE5D8" : "#F7676744"}`,
    borderRadius: "8px",
    padding: "7px 12px",
    fontSize: "12.5px",
    fontWeight: "600",
    cursor: busy ? "not-allowed" : "pointer",
    transition: "background 0.15s ease",
  }),
};