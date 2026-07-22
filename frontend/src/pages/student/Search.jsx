import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import ErrorBox from "../../components/ErrorBox";
import { universityService } from "../../services/universityService";
import { majorService } from "../../services/majorService";
import { uniMajorService } from "../../services/uniMajorService";
import { careerService } from "../../services/careerService";
import { majorCareerService } from "../../services/majorCareerService";
import { styles } from "../../styles/studentSearchStyles";
import { getUniversityImage } from "../../assets/universityImages";
import { getMajorImage } from "../../assets/majorImages";

const errorBoxStyle = { errorBox: { color: "#ff6b6b", marginBottom: "16px" } };

export default function Search() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("universities");

  const [universities, setUniversities] = useState([]);
  const [majors, setMajors] = useState([]);
  const [uniMajors, setUniMajors] = useState([]);
  const [careers, setCareers] = useState([]);
  const [majorCareers, setMajorCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      setLoading(true);
      setError("");
      const [u, m, um, c, mc] = await Promise.all([
        universityService.getAllUniversities(),
        majorService.getAllMajors(),
        uniMajorService.getAllUniMajors(),
        careerService.getAllCareers(),
        majorCareerService.getAllMajorCareers(),
      ]);
      setUniversities(u);
      setMajors(m);
      setUniMajors(um);
      setCareers(c);
      setMajorCareers(mc);
    } catch (err) {
      setError(err.message || "Failed to load search data.");
    } finally {
      setLoading(false);
    }
  }

  const hasTypeField = universities.some((u) => u.type);

  function majorsForUniversity(universityId) {
    return uniMajors
      .filter((um) => um.university_id === universityId)
      .map((um) => majors.find((m) => m.major_id === um.major_id)?.major_name)
      .filter(Boolean);
  }

  function universityCountForMajor(majorId) {
    return uniMajors.filter((um) => um.major_id === majorId).length;
  }

  function careerCountForMajor(majorId) {
    return majorCareers.filter((mc) => mc.major_id === majorId).length;
  }

  function majorCountForCareer(careersId) {
    return majorCareers.filter((mc) => mc.careers_id === careersId).length;
  }

  const q = query.toLowerCase();

  const filteredUniversities = universities.filter((u) => {
    if (!q) return true;
    const uniMajorNames = majorsForUniversity(u.university_id).join(" ").toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      (u.location || "").toLowerCase().includes(q) ||
      uniMajorNames.includes(q)
    );
  });

  const filteredMajors = majors.filter(
    (m) =>
      !q ||
      m.major_name.toLowerCase().includes(q) ||
      (m.field_of_study || "").toLowerCase().includes(q)
  );

  const filteredCareers = careers.filter(
    (c) =>
      !q ||
      c.careers_name.toLowerCase().includes(q) ||
      (c.description || "").toLowerCase().includes(q)
  );

  return (
    <StudentLayout>
      <section style={styles.hero}>
        <div style={styles.heroBlob} />
        <div style={styles.heroInner}>
          <h1 style={styles.heroTitle}>Search Everything</h1>
          <p style={styles.heroSubtitle}>
            Universities, majors, and careers — all in one place
          </p>
          <div style={styles.searchInputWrap}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              style={styles.searchInput}
              placeholder="Search universities, majors, or careers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div style={styles.body}>
        <div style={styles.tabWrap}>
          {["universities", "majors", "careers"].map((t) => (
            <button
              key={t}
              style={{
                ...styles.tabBtn,
                ...(tab === t ? styles.tabBtnActive : {}),
              }}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <ErrorBox message={error} styles={errorBoxStyle} />

        {error ? null : loading ? (
          <div style={styles.grid}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{ ...styles.card, height: "150px", background: "#F3F4F6" }}
              />
            ))}
          </div>
        ) : (
          <>
            {tab === "universities" &&
              (filteredUniversities.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>🏛️</div>
                  <p>No universities match "{query}".</p>
                </div>
              ) : (
                <div style={styles.grid}>
                  {filteredUniversities.map((u) => {
                    const uniMajorNames = majorsForUniversity(u.university_id);
                    const photo = getUniversityImage(u.name);
                    return (
                      <div key={u.university_id} style={styles.card}>
                        <div style={styles.cardImageWrap}>
                          {photo ? (
                            <img src={photo} alt={u.name} style={styles.cardImage} />
                          ) : (
                            <div style={styles.cardImagePlaceholder}>🎓</div>
                          )}
                          {hasTypeField && (
                            <span style={styles.badgeOverlay(u.type)}>{u.type}</span>
                          )}
                        </div>

                        <div style={styles.cardPadded}>
                          <div style={styles.cardTitle}>{u.name}</div>
                          <div style={styles.cardMeta}>
                            📍 {u.location || "Location not listed"}
                          </div>

                          {uniMajorNames.length > 0 && (
                            <div style={{ ...styles.tagRow, marginTop: "10px" }}>
                              {uniMajorNames.slice(0, 3).map((name) => (
                                <span key={name} style={styles.tag}>
                                  {name}
                                </span>
                              ))}
                            </div>
                          )}

                          {u.website && (
                            <div style={{ marginTop: "10px" }}>
                              <a
                                href={u.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.websiteLink}
                              >
                                🔗 Visit website
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

            {tab === "majors" &&
              (filteredMajors.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>🎓</div>
                  <p>No majors match "{query}".</p>
                </div>
              ) : (
                <div style={styles.grid}>
                  {filteredMajors.map((m) => {
                    const photo = getMajorImage(m.major_name);
                    return (
                      <div key={m.major_id} style={styles.card}>
                        <div style={styles.cardImageWrap}>
                          {photo ? (
                            <img src={photo} alt={m.major_name} style={styles.cardImage} />
                          ) : (
                            <div style={styles.cardImagePlaceholder}>📖</div>
                          )}
                        </div>

                        <div style={styles.cardPadded}>
                          <div style={styles.cardTitle}>{m.major_name}</div>
                          <div style={styles.statsGrid}>
                            <div style={styles.statBox}>
                              <div style={styles.statLabel}>Universities</div>
                              <div style={styles.statValue}>
                                {universityCountForMajor(m.major_id)}
                              </div>
                            </div>
                            <div style={styles.statBox}>
                              <div style={styles.statLabel}>Careers</div>
                              <div style={styles.statValue}>
                                {careerCountForMajor(m.major_id)}
                              </div>
                            </div>
                            <div style={styles.statBox}>
                              <div style={styles.statLabel}>Field</div>
                              <div style={styles.statValue}>
                                {m.field_of_study || "—"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

            {tab === "careers" &&
              (filteredCareers.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>💼</div>
                  <p>No careers match "{query}".</p>
                </div>
              ) : (
                <div style={styles.gridTwoCol}>
                  {filteredCareers.map((c) => (
                    <div key={c.careers_id} style={styles.careerCard}>
                      <div style={styles.careerIcon}>💼</div>
                      <div style={styles.careerBody}>
                        <div style={styles.careerTitle}>{c.careers_name}</div>
                        <p style={styles.careerDesc}>
                          {c.description || "No description provided"}
                        </p>
                      </div>
                      <span style={styles.careerCountPill}>
                        {majorCountForCareer(c.careers_id)} major
                        {majorCountForCareer(c.careers_id) !== 1 ? "s" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
          </>
        )}
      </div>
    </StudentLayout>
  );
}
