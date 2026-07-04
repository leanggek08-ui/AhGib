export const styles = {
  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: "32px",
    fontSize: "15px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "24px",
    marginBottom: "36px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 5px 20px rgba(0,0,0,.05)",
    border: "1px solid #F1F3F5",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "relative",
    overflow: "hidden",
  },

  cardTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cardIconWrap: (color) => ({
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: `${color}18`, // light tint of the color
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  }),

  trendBadge: (positive) => ({
    fontSize: "12px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "20px",
    background: positive ? "#DCFCE7" : "#FEE2E2",
    color: positive ? "#16A34A" : "#DC2626",
  }),

  cardTitle: {
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: "500",
  },

  cardValue: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#111827",
    lineHeight: 1,
  },

  cardAccentBar: (color) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: color,
  }),

  /* ===== Layout for grid section (activity + quick info) ===== */

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
  },

  section: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 5px 20px rgba(0,0,0,.05)",
    border: "1px solid #F1F3F5",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
  },

  viewAll: {
    fontSize: "13px",
    color: "#4F46E5",
    fontWeight: "600",
    cursor: "pointer",
  },

  activity: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 0",
    borderBottom: "1px solid #F1F3F5",
  },

  activityIcon: (color) => ({
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: `${color}18`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  }),

  activityText: {
    fontSize: "14.5px",
    color: "#111827",
    fontWeight: "500",
    flex: 1,
  },

  activityTime: {
    fontSize: "12.5px",
    color: "#9CA3AF",
  },

  /* ===== Side quick panel ===== */

  quickPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  quickCard: {
    background: "linear-gradient(135deg, #4F46E5, #6366F1)",
    borderRadius: "18px",
    padding: "22px",
    color: "#fff",
  },

  quickCardTitle: {
    fontSize: "14px",
    opacity: 0.85,
    marginBottom: "6px",
  },

  quickCardValue: {
    fontSize: "26px",
    fontWeight: "800",
  },
};