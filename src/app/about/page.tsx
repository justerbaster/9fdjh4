import { obituaries, critics } from "@/data/deaths";

export default function AboutPage() {
  const totalDeaths = obituaries.length;
  const totalCritics = critics.length;
  const yearsActive = "2020–2026";

  const stats = [
    { label: "Obituaries", value: totalDeaths },
    { label: "Years", value: 7 },
    { label: "Critics", value: totalCritics },
    { label: "Categories", value: 7 },
  ];

  const sections = [
    {
      title: "What is Solana Is Dead?",
      body: `Solana Is Dead is the most comprehensive database tracking every time Solana has been declared "dead" by critics, economists, and technologists since 2020. The database documents ${totalDeaths} Solana obituaries with original sources, making it a definitive source for Solana death predictions. Each entry includes the original source URL, publication date, author name, job title, and SOL price at the time of the prediction.`,
    },
    {
      title: "Why track Solana deaths?",
      body: `The question "Is Solana dead?" has been asked since SOL was worth $0.52. Ethereum founders, Nobel Prize-winning economists, and prominent crypto analysts have all declared Solana dead at various points — after network outages, the FTX collapse, SEC enforcement, and every market crash. This site documents that history. The pattern is notable: Solana keeps getting declared dead, and it keeps not dying. We're not here to mock anyone. Predictions are hard. But the historical record speaks for itself.`,
    },
    {
      title: "Methodology",
      body: `Inclusion criteria: We include articles, interviews, tweets, and public statements that predict Solana's failure, collapse, or demise. This ranges from explicit "Solana is dead" declarations to predictions that SOL will crash to zero or the network will shut down permanently. Data collection: Obituaries are manually curated from news articles, social media posts, interviews, and conference talks. Each entry is verified to link to the original source. Historical SOL prices are sourced from CoinGecko and other public market data providers. Quality standards: We prioritize primary sources and exclude duplicate entries. Entries must contain a clear prediction of Solana's failure to be included.`,
    },
    {
      title: "Disclaimer",
      body: `Solana Is Dead is for informational and entertainment purposes only. This site does not provide financial advice. The inclusion of a prediction in our database does not constitute an endorsement or criticism of the author. Many critics featured here have made valid points about real weaknesses in Solana's design, governance, and ecosystem. Please do your own research before making any investment decisions.`,
    },
  ];

  return (
    <div
      style={{
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "0 24px 40px",
      }}
    >
      {/* Main content card */}
      <div
        style={{
          background: "var(--color-bg-card)",
          borderRadius: "var(--radius-2xl)",
          padding: "1.5rem 1.25rem",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Title */}
        <div
          style={{
            marginBottom: "1.5rem",
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
            About Solana Is Dead
          </h2>
          <p style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", margin: 0 }}>
            Last updated: March 25, 2026 • Database contains {totalDeaths} obituaries
          </p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: "2rem",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: "1.5rem",
                borderRadius: "var(--radius-lg)",
                background: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border-light)",
                textAlign: "center",
                transition: "var(--transition-normal)",
              }}
            >
              <p
                style={{
                  fontSize: "2.25rem",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--color-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Content sections */}
        {sections.map((section) => (
          <div key={section.title} style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.1875rem",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.015em",
                lineHeight: 1.25,
                marginBottom: "0.75rem",
              }}
            >
              {section.title}
            </h3>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.625,
              }}
            >
              {section.body}
            </p>
          </div>
        ))}

        {/* Links */}
        <div style={{ marginBottom: "1rem" }}>
          <h3
            style={{
              fontSize: "1.1875rem",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.015em",
              lineHeight: 1.25,
              marginBottom: "0.75rem",
            }}
          >
            Explore
          </h3>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.625,
            }}
          >
            Browse the full{" "}
            <a
              href="/timeline"
              style={{
                color: "var(--color-accent)",
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              Solana obituary timeline
            </a>
            , see obituaries plotted on our{" "}
            <a
              href="/"
              style={{
                color: "var(--color-accent)",
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              interactive chart
            </a>
            , or view the top{" "}
            <a
              href="/critics"
              style={{
                color: "var(--color-accent)",
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              Solana critics
            </a>
            . Inspired by{" "}
            <a
              href="https://bitcoindeaths.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--color-accent)",
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              bitcoindeaths.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
