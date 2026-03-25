"use client";
import { useState } from "react";
import { critics, obituaries, type Obituary } from "@/data/deaths";

import type { Critic } from "@/data/deaths";

function AvatarWithFallback({ critic }: { critic: Critic }) {
  const [failed, setFailed] = useState(false);

  const wrapperStyle: React.CSSProperties = {
    width: 56,
    height: 56,
    borderRadius: "var(--radius-full)",
    overflow: "hidden",
    border: "2px solid var(--color-border-light)",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.125rem",
    fontWeight: 700,
    color: "var(--color-text-secondary)",
    background: "var(--color-bg-tertiary)",
  };

  if (critic.avatarUrl && !failed) {
    return (
      <div style={wrapperStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={critic.avatarUrl}
          alt={critic.name}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  return <div style={wrapperStyle}>{critic.initials}</div>;
}

const medals = ["🥇", "🥈", "🥉"];
const medalColors = [
  { bg: "rgba(255, 215, 0, 0.12)", border: "rgba(255, 215, 0, 0.2)", text: "#FFD700" },
  { bg: "rgba(192, 192, 192, 0.12)", border: "rgba(192, 192, 192, 0.2)", text: "#C0C0C0" },
  { bg: "rgba(205, 127, 50, 0.12)", border: "rgba(205, 127, 50, 0.2)", text: "#CD7F32" },
];

export default function CriticsPage() {
  const sortedCritics = [...critics].sort((a, b) => b.deathCount - a.deathCount);
  const totalCritics = critics.length;

  return (
    <div
      style={{
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "0 24px 40px",
        position: "relative",
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
            Solana Critics Leaderboard
          </h2>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", margin: "0 0 0.5rem 0" }}>
            The top critics who have declared Solana dead the most times. Click to see details.
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", margin: 0 }}>
            {totalCritics} critics tracked • {obituaries.length} obituaries • Last updated: Mar 25, 2026
          </p>
        </div>

        {/* Critic Cards */}
        <div>
          {sortedCritics.map((critic, i) => {
            const isMedal = i < 3;
            const rankStyle = isMedal
              ? {
                  background: medalColors[i].bg,
                  border: `1px solid ${medalColors[i].border}`,
                  color: medalColors[i].text,
                }
              : {
                  background: "rgba(153, 27, 27, 0.08)",
                  border: "1px solid var(--color-border-light)",
                  color: "var(--color-accent)",
                };

            return (
              <div
                key={critic.id}
                className="card card-hoverable"
                style={{
                  padding: "1.25rem",
                  marginBottom: "0.75rem",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                  {/* Rank badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 52,
                      height: 52,
                      borderRadius: "var(--radius-md)",
                      fontSize: isMedal ? "1.75rem" : "1.0625rem",
                      fontWeight: 700,
                      flexShrink: 0,
                      ...rankStyle,
                    }}
                  >
                    {isMedal ? medals[i] : `#${i + 1}`}
                  </div>

                  {/* Avatar */}
                  <AvatarWithFallback critic={critic} />

                  {/* Name + Quote */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: "1.0625rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        margin: "0 0 0.25rem 0",
                        lineHeight: 1.25,
                      }}
                    >
                      {critic.name}
                    </h3>
                    <p
                      className="line-clamp-2"
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                        fontStyle: "italic",
                        lineHeight: 1.625,
                      }}
                    >
                      &ldquo;{critic.latestQuote}&rdquo;
                    </p>
                  </div>

                  {/* Death count */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.375rem",
                        fontWeight: 700,
                        color: "var(--color-accent)",
                        letterSpacing: "-0.015em",
                        lineHeight: 1,
                      }}
                    >
                      {critic.deathCount}
                    </span>
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        color: "var(--color-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: 1,
                      }}
                    >
                      Deaths
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom link */}
        <div
          className="card"
          style={{
            padding: "1.5rem 1.25rem",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", margin: "0 0 1rem 0" }}>
            And more critics who got it wrong...
          </p>
          <a
            href="/timeline"
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1.25rem",
              borderRadius: "var(--radius-md)",
              fontWeight: 600,
              fontSize: "0.8125rem",
              background: "var(--color-accent)",
              color: "var(--color-white)",
              boxShadow: "0 1px 2px rgba(220,38,38,0.2), 0 1px 3px rgba(220,38,38,0.1)",
            }}
          >
            View All Obituaries →
          </a>
        </div>
      </div>
    </div>
  );
}
