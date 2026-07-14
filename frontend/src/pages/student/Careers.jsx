import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { careerService } from "../../services/careerService";
import { styles } from "../../styles/studentCareersStyles";

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadCareers() {
    try {
      const data = await careerService.getAllCareers();
      setCareers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCareers();
  }, []);

  const filtered = careers.filter((c) =>
    c.careers_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <StudentLayout>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }
      `}</style>

      <div style={styles.header}>
        <span style={styles.eyebrow}>
          <span style={styles.eyebrowDash} />
          Explore Your Options
        </span>
        <h1 style={styles.pageTitle}>💼 Careers</h1>
        <p style={styles.subtitle}>
          Browse careers available in the system
        </p>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            placeholder="Search by career name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          <span style={styles.countNum}>{filtered.length}</span> career{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div style={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={styles.skeletonCard} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>💼</div>
          <p>No careers found{search ? ` for "${search}"` : ""}.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((c) => (
            <div
              key={c.careers_id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 32px rgba(83,19,192,.14)";
                e.currentTarget.style.borderColor = "transparent";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(83,19,192,.05)";
                e.currentTarget.style.borderColor = "#F1F3F5";
              }}
            >
              <div style={styles.cardAccent} />

              <div style={styles.cardTop}>
                <div style={styles.cardIcon}>💼</div>
                <div style={styles.cardName}>{c.careers_name}</div>
              </div>

              <div style={styles.cardDivider} />

              {c.description ? (
                <p style={styles.cardDescription}>{c.description}</p>
              ) : (
                <span style={styles.noDescription}>No description provided</span>
              )}
            </div>
          ))}
        </div>
      )}
    </StudentLayout>
  );
}