export default function ErrorBox({ message, styles }) {
  if (!message) return null;

  return <div style={styles.errorBox}>{message}</div>;
}