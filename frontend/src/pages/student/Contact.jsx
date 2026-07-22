import { useState } from "react";
import MainLayout from "../../layouts/StudentLayout"; // adjust to your actual public layout
import { styles } from "../../styles/contactStyles";

const contactInfo = [
  { icon: "✉️", label: "Email Us", value: "hello@ahgib.com", bg: "#EDE8F8", color: "#5313C0" },
  { icon: "📞", label: "Call Us", value: "+855 87 356 899", bg: "#DBEAFE", color: "#2563EB" },
  { icon: "📍", label: "Visit Us", value: "Cambodia Academy of Digital Technology, Phnom Penh", bg: "#D1FAE5", color: "#059669" },
  { icon: "🌐", label: "Website", value: "www.ahgib.com", bg: "#FEF3C7", color: "#D97706" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ sending: false, sent: false, error: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, sent: false, error: "" });
    try {
      // TODO: wire to your backend, e.g. contactService.send(form)
      await new Promise((res) => setTimeout(res, 600));
      setStatus({ sending: false, sent: true, error: "" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ sending: false, sent: false, error: "Couldn't send your message. Try again." });
    }
  };

  return (
    <MainLayout>
      {/* ===== Hero ===== */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <span style={styles.badgePill}>
            <span style={styles.badgeText}>✨ Contact Us</span>
          </span>
          <h1 style={styles.heroTitle}>We would love to hear from you</h1>
          <p style={styles.heroSubtitle}>
            Questions, feedback, partnerships — our team is always ready to help.
          </p>
        </div>
      </section>

      {/* ===== Content ===== */}
      <section style={styles.section}>
        <div style={styles.contentGrid}>
          {/* Left: info cards */}
          <div style={styles.infoColumn}>
            {contactInfo.map((item) => (
              <div key={item.label} style={styles.infoCard}>
                <div style={{ ...styles.infoIconWrap, background: item.bg, color: item.color }}>
                  {item.icon}
                </div>
                <div>
                  <div style={styles.infoLabel}>{item.label}</div>
                  <div style={styles.infoValue}>{item.value}</div>
                </div>
              </div>
            ))}

            <div style={styles.infoCard}>
              <div style={styles.followWrap}>
                <div style={styles.followLabel}>FOLLOW US</div>
                <div style={styles.socialRow}>
                  {["🐦", "in", "📷", "▶️"].map((s, i) => (
                    <a key={i} href="#" style={styles.socialCircle}>{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div style={styles.formCard}>
            <h2 style={styles.formHeading}>Send us a message</h2>

            <form onSubmit={handleSubmit}>
              <div style={styles.formRow}>
                <div style={styles.formField}>
                  <label style={styles.formLabel}>Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ahmad Faiz"
                    style={styles.formInput}
                    required
                  />
                </div>
                <div style={styles.formField}>
                  <label style={styles.formLabel}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ahmad@email.com"
                    style={styles.formInput}
                    required
                  />
                </div>
              </div>

              <div style={styles.formField}>
                <label style={styles.formLabel}>Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  style={styles.formInput}
                  required
                />
              </div>

              <div style={styles.formField}>
                <label style={styles.formLabel}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your question or feedback..."
                  style={styles.formTextarea}
                  rows={5}
                  required
                />
              </div>

              {status.error && <p style={styles.formError}>{status.error}</p>}
              {status.sent && <p style={styles.formSuccess}>Message sent — we'll get back to you soon.</p>}

              <button type="submit" style={styles.submitButton} disabled={status.sending}>
                {status.sending ? "Sending..." : "🡢 Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}