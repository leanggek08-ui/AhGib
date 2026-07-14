import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { majorService } from "../../services/majorService";
import { uniMajorService } from "../../services/uniMajorService";
import { styles } from "../../styles/studentMajorsStyles";

export default function Majors() {
  const [majors, setMajors] = useState([]);
  const [uniMajors, setUniMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadData() {
    try {
      const [majorData, uniMajorData] = await Promise.all([
        majorService.getAllMajors(),
        uniMajorService.getAllUniMajors(),
      ]);
      setMajors(majorData);
      setUniMajors(uniMajorData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filtered = majors.filter(
    (m) =>
      m.major_name.toLowerCase().includes(search.toLowerCase()) ||
      (m.field_of_study || "").toLowerCase().includes(search.toLowerCase())
  );

  function offeringsFor(majorId) {
    return uniMajors.filter((um) => um.major_id === majorId);
  }

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
        <h1 style={styles.pageTitle}>🎓 Majors</h1>
        <p style={styles.subtitle}>
          Browse majors available in the system
        </p>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            placeholder="Search by name or field of study..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <span style={styles.countBadge}>
          <span style={styles.countNum}>{filtered.length}</span> major{filtered.length !== 1 ? "s" : ""}
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
          <div style={styles.emptyIcon}>🎓</div>
          <p>No majors found{search ? ` for "${search}"` : ""}.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((m) => {
            const offerings = offeringsFor(m.major_id);
            return (
              <div
                key={m.major_id}
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
                    <div style={styles.cardName}>{m.major_name}</div>
                    {m.field_of_study && (
                      <span style={styles.fieldBadge}>{m.field_of_study}</span>
                    )}
                  </div>
                </div>

                <div style={styles.cardDivider} />

                {offerings.length === 0 ? (
                  <span style={styles.noUni}>Not yet offered by any university</span>
                ) : (
                  <div style={styles.uniList}>
                    {offerings.map((o) => (
                      <div key={o.uni_major_id} style={styles.uniRow}>
                        <span style={styles.uniRowName}>{o.university_name}</span>
                        <span style={styles.uniRowTuition}>
                          {o.tuition_fee != null ? `$${Number(o.tuition_fee).toLocaleString()}` : "N/A"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </StudentLayout>
  );
}