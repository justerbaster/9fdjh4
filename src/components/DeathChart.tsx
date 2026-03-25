"use client";

import { useState, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  ComposedChart,
} from "recharts";
import { obituaries, priceHistory, type Obituary } from "@/data/deaths";

interface ChartDataPoint {
  date: string;
  price: number;
  deathPrice?: number;
  deathCount?: number;
}

function buildChartData(): ChartDataPoint[] {
  const deathsByMonth = new Map<string, number>();
  for (const o of obituaries) {
    const m = o.date.slice(0, 7);
    deathsByMonth.set(m, (deathsByMonth.get(m) || 0) + 1);
  }

  return priceHistory.map((p) => {
    const m = p.date.slice(0, 7);
    const count = deathsByMonth.get(m);
    return {
      date: m,
      price: p.price,
      deathPrice: count ? p.price : undefined,
      deathCount: count || 0,
    };
  });
}

const formatDate = (dateStr: string) => {
  const [year, month] = dateStr.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[parseInt(month) - 1]} '${year.slice(2)}`;
};

function DeathDot(props: {
  cx?: number;
  cy?: number;
  payload?: ChartDataPoint;
  onClick?: (date: string) => void;
}) {
  const { cx, cy, payload, onClick } = props;
  if (!cx || !cy || !payload?.deathPrice) return null;
  const count = payload.deathCount || 1;
  const r = Math.min(4 + count, 10);
  return (
    <g
      style={{ cursor: "pointer" }}
      onClick={() => onClick?.(payload.date)}
    >
      <circle cx={cx} cy={cy} r={r + 4} fill="transparent" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#dc2626"
        stroke="#fff"
        strokeWidth={2}
      />
      {count > 1 && (
        <text
          x={cx}
          y={cy + 0.5}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize={r > 6 ? 8 : 7}
          fontWeight={700}
        >
          {count}
        </text>
      )}
    </g>
  );
}

const CustomTooltip = ({
  active,
  label,
  payload,
}: {
  active?: boolean;
  label?: string;
  payload?: Array<{ value: number; payload: ChartDataPoint }>;
}) => {
  if (!active || !payload || !payload.length || !label) return null;
  const price = payload[0].value;
  const monthDeaths = obituaries.filter((d) => d.date.slice(0, 7) === label);

  return (
    <div
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "12px 16px",
        maxWidth: 300,
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <p style={{ color: "var(--color-text-tertiary)", fontSize: "0.75rem", marginBottom: 4 }}>
        {formatDate(label)}
      </p>
      <p style={{ color: "var(--color-text-primary)", fontWeight: 700, fontSize: "1.1rem" }}>
        ${price.toLocaleString()}
      </p>
      {monthDeaths.length > 0 && (
        <p style={{ color: "var(--color-accent)", fontSize: "0.6875rem", fontWeight: 600, marginTop: 4 }}>
          ☠ {monthDeaths.length} obituar{monthDeaths.length === 1 ? "y" : "ies"} this month
        </p>
      )}
      {monthDeaths.slice(0, 3).map((d) => (
        <div
          key={d.id}
          style={{
            marginTop: 6,
            borderTop: "1px solid var(--color-border-light)",
            paddingTop: 6,
          }}
        >
          <p style={{ color: "var(--color-text-primary)", fontSize: "0.6875rem", fontWeight: 600 }}>
            {d.author}
          </p>
          <p
            className="line-clamp-2"
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "0.6875rem",
              marginTop: 1,
              lineHeight: 1.3,
            }}
          >
            {d.title}
          </p>
        </div>
      ))}
      {monthDeaths.length > 3 && (
        <p style={{ color: "var(--color-text-tertiary)", fontSize: "0.6875rem", marginTop: 4 }}>
          +{monthDeaths.length - 3} more...
        </p>
      )}
      {monthDeaths.length > 0 && (
        <p style={{ color: "var(--color-accent)", fontSize: "0.6875rem", marginTop: 6, fontWeight: 500 }}>
          Click dot to view details →
        </p>
      )}
    </div>
  );
};

export default function DeathChart() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const chartData = buildChartData();

  const xAxisTicks = (() => {
    const everySixth = chartData.filter((_, i) => i % 6 === 0).map((d) => d.date);
    const last = chartData[chartData.length - 1]?.date;
    if (last && !everySixth.includes(last)) everySixth.push(last);
    return everySixth;
  })();

  const handleDotClick = useCallback((date: string) => {
    setSelectedMonth((prev) => (prev === date ? null : date));
  }, []);

  const selectedDeaths = selectedMonth
    ? obituaries.filter((d) => d.date.slice(0, 7) === selectedMonth)
    : [];

  return (
    <div>
      {/* Chart Card */}
      <div
        style={{
          background: "var(--color-bg-card)",
          borderRadius: "var(--radius-2xl)",
          padding: "1.5rem 1.25rem",
          width: "100%",
          border: "1px solid var(--color-border)",
          position: "relative",
          overflow: "visible",
        }}
      >
        <div style={{ width: "100%", height: 380, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 12, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="solGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                ticks={xAxisTicks}
                tickFormatter={formatDate}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `$${v}`}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#dc2626"
                strokeWidth={2}
                fill="url(#solGradient)"
                dot={false}
                activeDot={false}
              />
              <Scatter
                dataKey="deathPrice"
                shape={<DeathDot onClick={handleDotClick} />}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Selected month details */}
      {selectedMonth && selectedDeaths.length > 0 && (
        <div
          className="card animate-fade-in"
          style={{ marginTop: 12, padding: "1.25rem", position: "relative" }}
        >
          <button
            onClick={() => setSelectedMonth(null)}
            style={{
              position: "absolute",
              top: 12,
              right: 16,
              color: "var(--color-text-tertiary)",
              fontSize: 18,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 12 }}>
            ☠ {selectedDeaths.length} obituar{selectedDeaths.length === 1 ? "y" : "ies"} in {formatDate(selectedMonth)}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {selectedDeaths.map((death) => (
              <a
                key={death.id}
                href={death.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: 12,
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border-light)",
                  background: "var(--color-bg-secondary)",
                  transition: "var(--transition-fast)",
                  textDecoration: "none",
                }}
                className="card-hoverable"
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>☠</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    lineHeight: 1.3,
                    marginBottom: 4,
                  }}>
                    {death.title}
                  </p>
                  <p style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-secondary)",
                    fontStyle: "italic",
                    lineHeight: 1.4,
                    marginBottom: 6,
                  }}
                  className="line-clamp-2"
                  >
                    &ldquo;{death.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                      {death.author}
                    </span>
                    <span style={{ fontSize: "0.6875rem", color: "var(--color-text-tertiary)" }}>
                      {new Date(death.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span style={{ fontSize: "0.6875rem", color: "var(--color-accent)", fontWeight: 600 }}>
                      SOL ${death.solPrice}
                    </span>
                    <span style={{ fontSize: "0.6875rem", color: "var(--color-accent)" }}>
                      {death.source} →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
