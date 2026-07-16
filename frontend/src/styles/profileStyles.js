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
};