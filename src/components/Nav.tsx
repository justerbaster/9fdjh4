"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Chart" },
  { href: "/timeline", label: "Timeline" },
  { href: "/critics", label: "Critics" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        textAlign: "center",
        maxWidth: 900,
        margin: "0 auto",
        padding: "0 24px 16px",
        paddingTop: 32,
      }}
    >
      <h1 className="text-hero" style={{ margin: "0 0 1rem 0" }}>
        Solana Is Dead
      </h1>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          maxWidth: "fit-content",
          margin: "0 auto",
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname === link.href ? "active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
