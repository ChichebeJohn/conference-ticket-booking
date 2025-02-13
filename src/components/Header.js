"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function Header() {
  return (
    <header style={styles.header}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <span style={styles.logoText}>Ticz</span>
      </div>

      {/* Navigation Links */}
      <nav style={styles.nav}>
        <Link href="/events" style={styles.navLink}>Events</Link>
        <Link href="/my-tickets" style={styles.navLink}>My Tickets</Link>
        <Link href="/about" style={styles.navLink}>About Project</Link>
      </nav>

      {/* My Tickets Button */}
      <Link href="/my-tickets">
        <button style={styles.headerButton}>MY TICKETS →</button>
      </Link>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // background: "linear-gradient(180deg, #02191D, #07373F, #02191D)",
    padding: "10px 20px",
    borderRadius: "15px",
    border: "1px solid #0E464F", 
    maxWidth: "1200px",
    margin: "auto",
    marginBottom:"50px"
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoText: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: "#ccc",
    textDecoration: "none",
    fontSize: "14px",
  },
  headerButton: {
    backgroundColor: "#fff",
    color: "#0A0C11",
    padding: "8px 12px",
    borderRadius: "5px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    height:"52px",
    width:"169px",
    alignItems:"center",
    textAlign:"center",
    textDecoration:"none",
    display:"inline-block",

  },
};
