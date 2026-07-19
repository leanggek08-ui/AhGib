// adminDashboardStyles.js — AhGib admin theme: warm paper, teal + amber

export const styles = {
  page: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "8px",
  },

  pageTitle: {
    fontFamily: "'Baloo 2', 'Plus Jakarta Sans', sans-serif",
    fontSize: "22px",
    fontWeight: "600",
    color: "#232620",
    margin: "0 0 4px",
  },

  subtitle: {
    color: "#8A8576",
    fontSize: "13.5px",
  },

  lastUpdated: {
    fontSize: "12.5px",
    color: "#B0AA98",
  },

  loadingText: {
    color: "#8A8576",
    fontSize: "14px",
  },

  emptyText: {
    color: "#B0AA98",
    fontSize: "13.5px",
    padding: "20px 0",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "14px",
    marginBottom: "28px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #EAE5D8",
    borderRadius: "14px",
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  cardIconWrap: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: "#0F6E5614",
    color: "#0F6E56",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "18px",
  },

  cardTitle: {
    color: "#8A8576",
    fontSize: "12.5px",
    fontWeight: "500",
  },

  cardValue: {
    fontFamily: "'Baloo 2', sans-serif",
    fontSize: "22px",
    fontWeight: "600",
    color: "#232620",
    lineHeight: 1.1,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "18px",
  },

  section: {
    background: "#FFFFFF",
    border: "1px solid #EAE5D8",
    borderRadius: "14px",
    padding: "20px 22px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },

  toggleBtn: (hover) => ({
    background: hover
      ? "#6733B9"
      : "linear-gradient(90deg, #5313C0, #6C1EB1, #6733B9)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "12.5px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.15s ease",
  }),

  sectionTitle: {
    fontFamily: "'Baloo 2', sans-serif",
    fontSize: "15px",
    fontWeight: "600",
    color: "#232620",
    margin: 0,
  },

  viewAll: {
    fontSize: "12.5px",
    color: "#0F6E56",
    fontWeight: "600",
    cursor: "pointer",
  },

  activity: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px 0",
    borderBottom: "1px solid #F2EFE6",
  },

  activityIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#0F6E5614",
    color: "#0F6E56",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "14px",
  },

  activityText: {
    fontSize: "13.5px",
    color: "#232620",
    flex: 1,
  },

  activityTime: {
    fontSize: "12px",
    color: "#B0AA98",
    whiteSpace: "nowrap",
  },

  quickPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  quickCard: {
    background: "#FFFFFF",
    border: "1px solid #EAE5D8",
    borderRadius: "14px",
    padding: "18px 20px",
  },

  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    marginBottom: "6px",
  },

  statusDot: (color) => ({
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: color,
  }),

  quickCardTitle: {
    fontSize: "12.5px",
    color: "#8A8576",
    fontWeight: "500",
  },

  quickCardValue: {
    fontFamily: "'Baloo 2', sans-serif",
    fontSize: "17px",
    fontWeight: "600",
    color: "#232620",
  },

  // adminDashboardStyles.js — add these

  quickActionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
    gap: "10px",
  },

  quickActionBtn: (hover) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #EAE5D8",
    background: hover ? "#F6F4EF" : "#FFFFFF",
    cursor: "pointer",
    fontSize: "13.5px",
    fontWeight: "500",
    color: "#232620",
    textAlign: "left",
    transition: "background 0.12s ease",
  }),

  quickActionIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    background: "#0F6E5614",
    color: "#0F6E56",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "15px",
  },
};