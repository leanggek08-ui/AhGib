export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  styles,
}) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={styles.input}
      />
    </div>
  );
}