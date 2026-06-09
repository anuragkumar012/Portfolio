"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="header">
      <Link href="/" className="logo">
        Portfolio
      </Link>
      <nav className="nav">
        <Link href={isHome ? "#about" : "/#about"} className="nav-link">
          About Me
        </Link>
        <Link 
          href="/skills" 
          className={`nav-link ${pathname === "/skills" ? "active-link" : ""}`}
        >
          Skills
        </Link>
        <Link 
          href="/projects" 
          className={`nav-link ${pathname === "/projects" ? "active-link" : ""}`}
        >
          Projects
        </Link>
        <Link href={isHome ? "#blogs" : "/#blogs"} className="nav-link">
          Blogs
        </Link>
      </nav>
      <Link href={isHome ? "#contact" : "/#contact"} className="btn-touch">
        Get in touch
        <span className="btn-icon-wrapper">
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </span>
      </Link>
    </header>
  );
}
