import { obituaries, type Obituary } from "@/data/deaths";

function groupByYear(obits: Obituary[]): Record<string, Obituary[]> {
  const sorted = [...obits].sort((a, b) => b.date.localeCompare(a.date));
  const groups: Record<string, Obituary[]> = {};
  for (const obit of sorted) {
    const year = obit.date.slice(0, 4);
    if (!groups[year]) groups[year] = [];
    groups[year].push(obit);
  }
  return groups;
}

export default function TimelinePage() {
  const grouped = groupByYear(obituaries);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  const total = obituaries.length;

  return (
    <div
      style={{
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "0 24px 40px",
      }}
    >
      {/* Page Header */}
      <div
        style={{
          background: "var(--color-bg-card)",
          borderRadius: "var(--radius-2xl)",
          padding: "1.5rem 1.25rem",
          border: "1px solid var(--color-border)",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            marginBottom: "1.25rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid var(--color-border-light)",
          }}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: "0 0 0.5rem 0",
              lineHeight: 1.1,
            }}
          >
            Complete Obituary Timeline
          </h2>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", margin: "0 0 0.5rem 0" }}>
            Every notable Solana death declaration since 2020, archived with quotes, dates, and sources.
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", margin: 0 }}>
            {total} obituaries archived · Database updated Mar 25, 2026
          </p>
        </div>

        {/* Year navigation */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {years.map((year) => (
            <a
              key={year}
              href={`#year-${year}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "6px 12px",
                borderRadius: "var(--radius-md)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                background: "var(--color-bg-tertiary)",
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border-light)",
                transition: "var(--transition-fast)",
              }}
            >
              {year}{" "}
              <span style={{ color: "var(--color-text-tertiary)", fontSize: "0.75rem" }}>
                ({grouped[year].length})
              </span>
            </a>
          ))}
        </div>

        {/* Timeline entries */}
        {years.map((year) => (
          <div key={year} id={`year-${year}`} style={{ scrollMarginTop: 20, marginBottom: "2rem" }}>
            {/* Year header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "var(--color-text-quaternary)",
                  lineHeight: 1,
                }}
              >
                {year}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "var(--color-border-light)",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--color-text-tertiary)",
                }}
              >
                {grouped[year].length} obituaries
              </span>
            </div>

            {/* Entries */}
            {grouped[year].map((death) => (
              <div
                key={death.id}
                id={`death-${death.id}`}
                className="card card-hoverable"
                style={{
                  padding: "1.25rem",
                  marginBottom: "0.75rem",
                  scrollMarginTop: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>☠</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 4,
                        flexWrap: "wrap",
                      }}
                    >
                      <time
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-text-tertiary)",
                        }}
                      >
                        {new Date(death.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-accent)",
                          fontWeight: 600,
                        }}
                      >
                        SOL ${death.solPrice}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: "1.0625rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        margin: "0 0 8px 0",
                        lineHeight: 1.25,
                      }}
                    >
                      {death.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                        fontStyle: "italic",
                        lineHeight: 1.625,
                        marginBottom: 12,
                      }}
                    >
                      &ldquo;{death.quote}&rdquo;
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            color: "var(--color-text-primary)",
                          }}
                        >
                          {death.author}
                        </p>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--color-text-tertiary)",
                          }}
                        >
                          {death.authorTitle}
                        </p>
                      </div>
                      <a
                        href={death.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.8125rem",
                          color: "var(--color-accent)",
                          fontWeight: 500,
                        }}
                      >
                        {death.source} →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Bottom */}
        <div style={{ textAlign: "center", padding: "2rem 0 0" }}>
          <p style={{ fontSize: "2rem", marginBottom: 8 }}>⚰️</p>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-tertiary)" }}>
            {total} death declarations archived. Solana is still alive.
          </p>
        </div>
      </div>
    </div>
  );
}
