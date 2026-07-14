import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { universityService } from "../../services/universityService";
import { styles } from "../../styles/studentUniversitiesStyles";

export default function Universities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadUniversities() {
    try {
      const data = await universityService.getAllUniversities();
      setUniversities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUniversities();
  }, []);

  const filtered = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      (u.location || "").toLowerCase().includes(search.toLowerCase())
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
        <h1 style={styles.pageTitle}>🎓 Universities</h1>
        <p style={styles.subtitle}>
          Browse universities available in the system
        </p>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          <span style={styles.countNum}>{filtered.length}</span> universit{filtered.length !== 1 ? "ies" : "y"}
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
          <div style={styles.emptyIcon}>🏛️</div>
          <p>No universities found{search ? ` for "${search}"` : ""}.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((u) => (
            <div
              key={u.university_id}
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
                <div style={styles.cardIcon}>🎓</div>
                <div>
                  <div style={styles.cardName}>{u.name}</div>
                  <div style={styles.cardLocation}>
                    📍 {u.location || "Location not listed"}
                  </div>
                </div>
              </div>

              <div style={styles.cardDivider} />

              {u.website ? (
                <a
                  href={u.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.cardLink}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#E9E1FA")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#F1EFFA")}
                >
                  🔗 Visit website
                </a>
              ) : (
                <span style={styles.noWebsite}>No website listed</span>
              )}
            </div>
          ))}
        </div>
      )}
    </StudentLayout>
  );
}