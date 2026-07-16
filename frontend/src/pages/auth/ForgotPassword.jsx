import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import { styles } from "../../styles/authStyles";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const requestToken = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.forgotPassword(email);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
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
          <h3 style={styles.leftTitle}>Reset password</h3>
          <p style={styles.leftText}>
            We’ll help you recover your account safely.
          </p>
        </div>

        {/* RIGHT */}
        <div style={styles.rightPanel}>
          <div style={styles.formWrap}>

            <h1 style={styles.title}>
              {success ? "Done" : "Forgot password"}
            </h1>

            {error && <div style={styles.errorBox}>{error}</div>}

            {success ? (
              <p style={styles.subtitle}>
                Password reset successful. You can now sign in.
                <br />
                <Link to="/login" style={styles.link}>Go to login</Link>
              </p>
            ) : step === 1 ? (
              <form onSubmit={requestToken}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  placeholder="you@example.com"
                />

                <button style={styles.button}>
                  {loading ? "Sending..." : "Send reset code"}
                </button>
              </form>
            ) : (
              <form onSubmit={resetPassword}>
                <label style={styles.label}>Token</label>
                <input
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  style={styles.input}
                  placeholder="Enter token"
                />

                <label style={styles.label}>New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  placeholder="New password"
                />

                <button style={styles.button}>
                  {loading ? "Resetting..." : "Reset password"}
                </button>
              </form>
            )}

            <p style={styles.linkText}>
              <Link to="/login" style={styles.link}>Back to login</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}