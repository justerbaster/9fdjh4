import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solana Is Dead | Every Solana Obituary Since 2020",
  description:
    "Solana obituaries since 2020: critics, articles, and SOL price at each death call. Updated through March 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          minHeight: "100vh",
          background: "var(--gradient-background)",
          color: "var(--color-text-primary)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Nav />
        <main style={{ flex: 1 }}>{children}</main>
        <footer
          style={{
            textAlign: "center",
            padding: "40px 24px 2.5rem",
            background: "transparent",
            marginTop: "auto",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Made for the Solana community ·{" "}
            <a
              href="https://x.com/solanadeaths"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--color-accent)",
                textDecoration: "none",
              }}
            >
              @solanadeaths
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
