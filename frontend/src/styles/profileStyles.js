export const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #2a1450, #0f081f)",
    padding: "20px",
  },

  card: {
    width: "420px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "18px",
    padding: "24px",
    color: "#fff",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "20px",
  },

  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#5313C0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "18px",
  },

  title: {
    margin: 0,
    fontSize: "20px",
  },

  subtitle: {
    margin: 0,
    fontSize: "12px",
    opacity: 0.7,
  },

  infoBox: {
    marginTop: "10px",
    marginBottom: "20px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  label: {
    fontSize: "12px",
    opacity: 0.6,
  },

  value: {
    fontSize: "13px",
    fontWeight: 500,
  },

  badge: {
    padding: "4px 10px",
    borderRadius: "999px",
    background: "#5313C0",
    fontSize: "11px",
  },

  button: {
    display: "block",
    textAlign: "center",
    padding: "12px",
    borderRadius: "10px",
    background: "#fff",
    color: "#111",
    fontWeight: "600",
    textDecoration: "none",
  },

  avatarWrap: { position: "relative" },
  avatarBadge: {
    position: "absolute", bottom: -2, right: -2, width: 22, height: 22,
    borderRadius: "50%", background: "#1a0f2e", border: "2px solid #12081f",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10,
  },
  roleBadgeHeader: {
    marginLeft: "auto", background: "#5313C0", color: "#e9defc",
    fontSize: 12, fontWeight: 500, padding: "5px 14px", borderRadius: 20,
  },
  completionBox: { background: "#1a0f2e", borderRadius: 12, padding: 16, marginBottom: 16 },
  completionRow: { display: "flex", justifyContent: "space-between", fontSize: 13, color: "#b8aecb", marginBottom: 8 },
  progressTrack: { height: 6, borderRadius: 3, background: "#2b1a49", overflow: "hidden" },
  progressFill: { height: "100%", background: "#8a5cf7", borderRadius: 3 },
  completionHint: { fontSize: 12, color: "#8577a0", margin: "8px 0 0" },
  statGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 },
  statCard: { background: "#1a0f2e", borderRadius: 12, padding: 14 },
  statLabel: { fontSize: 12, color: "#9c8fb5", margin: "0 0 4px" },
  statValue: { fontSize: 22, color: "#fff", fontWeight: 500, margin: 0 },
  actionRow: { display: "flex", gap: 10 },
  secondaryButton: {
    background: "transparent", color: "#c9bfda", border: "1px solid #3a2a5c",
    borderRadius: 10, padding: "13px 16px", fontSize: 14, textAlign: "center", textDecoration: "none",
  },
  backlink: {
    color: "#b39ddb",
    fontSize: "13px",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: "8px",
  },
};