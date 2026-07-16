export default function Button({ text, loading, styles }) {
  return (
    <button style={styles.button}>
      {loading ? "Loading..." : text}
    </button>
  );
}