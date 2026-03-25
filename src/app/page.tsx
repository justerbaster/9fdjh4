import DeathChart from "@/components/DeathChart";
import { obituaries } from "@/data/deaths";

function groupByYear(obits: typeof obituaries) {
  const groups: Record<string, typeof obituaries> = {};
  for (const o of obits) {
    const year = o.date.slice(0, 4);
    if (!groups[year]) groups[year] = [];
    groups[year].push(o);
  }
  return groups;
}

export default function HomePage() {
  const total = obituaries.length;
  const grouped = groupByYear(obituaries);
  const years = Object.keys(grouped).sort();

  return (
    <div
      style={{
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "0 24px 40px",
        position: "relative",
      }}
    >
      <DeathChart />

      {/* Year-by-year breakdown */}
      <div
        style={{
          marginTop: 24,
          background: "var(--color-bg-card)",
          borderRadius: "var(--radius-2xl)",
          padding: "1.5rem 1.25rem",
          border: "1px solid var(--color-border)",
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
              fontSize: "1.375rem",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: "0 0 0.375rem 0",
              lineHeight: 1.1,
            }}
          >
            Obituaries by Year
          </h2>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", margin: 0 }}>
            {total} death declarations tracked since 2020
          </p>
        </div>

        {/* Year cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {years.map((year) => {
            const items = grouped[year];
            const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date));
            return (
              <div
                key={year}
                style={{
                  border: "1px solid var(--color-border-light)",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                }}
              >
                {/* Year header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    background: "var(--color-bg-tertiary)",
                    borderBottom: "1px solid var(--color-border-light)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        color: "var(--color-text-primary)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {year}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      {items.length} obituar{items.length === 1 ? "y" : "ies"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span style={{ color: "var(--color-accent)", fontWeight: 700, fontSize: "1.25rem" }}>
                      {items.length}
                    </span>
                    <span style={{ fontSize: "0.6875rem", color: "var(--color-text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Deaths
                    </span>
                  </div>
                </div>

                {/* Entries list */}
                <div>
                  {sorted.map((death, i) => (
                    <a
                      key={death.id}
                      href={death.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "12px 16px",
                        borderBottom: i < sorted.length - 1 ? "1px solid var(--color-border-light)" : "none",
                        textDecoration: "none",
                        transition: "var(--transition-fast)",
                        cursor: "pointer",
                      }}
                      className="card-hoverable"
                    >
                      <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1, color: "var(--color-accent)" }}>☠</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" }}>
                          <time style={{ fontSize: "0.6875rem", color: "var(--color-text-tertiary)" }}>
                            {new Date(death.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </time>
                          <span style={{ fontSize: "0.6875rem", color: "var(--color-accent)", fontWeight: 600 }}>
                            ${death.solPrice}
                          </span>
                        </div>
                        <p style={{
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          lineHeight: 1.3,
                          marginBottom: 2,
                        }}>
                          {death.title}
                        </p>
                        <p style={{ fontSize: "0.6875rem", color: "var(--color-text-secondary)" }}>
                          {death.author} · {death.source}
                        </p>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-accent)", flexShrink: 0, marginTop: 2 }}>→</span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
