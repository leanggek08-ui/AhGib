// superAdminStyles.js — matches the navy/indigo AhGib admin theme

export const styles = {
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
  },

  shieldBadge: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #4F46E5, #6366F1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    flexShrink: 0,
  },

  pageTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#F9FAFB",
    margin: 0,
    marginBottom: "4px",
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: "15px",
    margin: 0,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#1E2333",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
    border: "1px solid #2B3245",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.15s ease, border-color 0.15s ease",
  },

  cardAccentBar: (color) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: color,
  }),

  cardIconWrap: (color) => ({
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: `${color}26`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    marginBottom: "16px",
  }),

  cardTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#F9FAFB",
    margin: 0,
    marginBottom: "8px",
  },

  cardDescription: {
    fontSize: "14px",
    color: "#9CA3AF",
    margin: 0,
    lineHeight: 1.5,
  },
};