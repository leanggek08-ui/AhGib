import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../../services/authService";
import { styles } from "../../styles/authStyles";

import Input from "../../components/Input";
import ErrorBox from "../../components/ErrorBox";
import Button from "../../components/Button";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      return setError("Passwords do not match");
    }

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    setLoading(true);
    setError("");

    try {
      await authService.register(
        form.username,
        form.email,
        form.password
      );

      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.card}>

        {/* LEFT SIDE */}
        <div style={styles.leftPanel}>
          <h2 style={styles.brand}>AhGib</h2>
          <h3 style={styles.leftTitle}>Start your journey</h3>
          <p style={styles.leftText}>
            Join our platform and explore opportunities.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.rightPanel}>
          <div style={styles.formWrap}>

            <h1 style={styles.title}>Create Account</h1>
            <p style={styles.subtitle}>
              Sign up to continue
            </p>

            <ErrorBox message={error} styles={styles} />

            <form onSubmit={handleSubmit}>

              <Input
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                styles={styles}
              />

              <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                styles={styles}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                styles={styles}
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Confirm password"
                styles={styles}
              />

              <Button
                text="Create Account"
                loading={loading}
                styles={styles}
              />
            </form>

            <p style={styles.linkText}>
              Already have account?{" "}
              <Link to="/login" style={styles.link}>
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}