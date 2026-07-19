// superAdminStyles.js — warm paper theme, matches rest of admin panel

export const styles = {
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "28px",
  },

  shieldBadge: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
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

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "16px",
  },

  card: (hover) => ({
    background: "#FFFFFF",
    borderRadius: "14px",
    padding: "22px",
    border: `1px solid ${hover ? "#5313C044" : "#EAE5D8"}`,
    cursor: "pointer",
    transition: "border-color 0.15s ease",
  }),

  cardIconWrap: {
    width: "40px",
    height: "40px",
    borderRadius: "11px",
    background: "#0F6E5614",
    color: "#0F6E56",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },

  cardTitle: {
    fontFamily: "'Baloo 2', sans-serif",
    fontSize: "15.5px",
    fontWeight: "600",
    color: "#232620",
    margin: 0,
    marginBottom: "6px",
  },

  cardDescription: {
    fontSize: "13px",
    color: "#8A8576",
    margin: 0,
    lineHeight: 1.5,
    marginBottom: "18px",
  },

  openBtn: (hover) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: hover
      ? "#6733B9"
      : "linear-gradient(90deg, #5313C0, #6C1EB1, #6733B9)",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: "12.5px",
    cursor: "pointer",
    transition: "background 0.15s ease",
  }),
};