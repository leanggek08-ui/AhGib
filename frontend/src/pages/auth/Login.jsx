import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { styles } from "../../styles/authStyles";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authService.login(form.email, form.password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate(data.user.role_id === 1 ? "/admin/dashboard" : "/student/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.card}>

        {/* LEFT */}
        <div style={styles.leftPanel}>
          <h2 style={styles.brand}>AhGib</h2>
          <h3 style={styles.leftTitle}>Welcome back</h3>
          <p style={styles.leftText}>
            Sign in to continue your learning journey and explore opportunities.
          </p>
        </div>

        {/* RIGHT */}
        <div style={styles.rightPanel}>
          <div style={styles.formWrap}>
            <h1 style={styles.title}>Sign in</h1>
            <p style={styles.subtitle}>Access your account</p>

            {error && <div style={styles.errorBox}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="you@example.com"
              />

              <label style={styles.label}>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                style={styles.input}
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: "#fff", fontSize: "12px", marginBottom: "10px" }}
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>

              <button type="submit" style={styles.button}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p style={styles.linkText}>
              Forgot password?{" "}
              <Link to="/forgot-password" style={styles.link}>Reset</Link>
            </p>

            <p style={styles.linkText}>
              No account?{" "}
              <Link to="/register" style={styles.link}>Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}