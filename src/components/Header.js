"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./header.css"; // Make sure the path is correct

export default function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logoContainer">
        <Image src="/logo.png" alt="Logo" width={30} height={30} />
        <span className="logoText">Ticz</span>
      </div>

      {/* Navigation Links */}
      <nav className="nav">
        <Link href="/events" className="navLink">Events</Link>
        <Link href="/my-tickets" className="navLink">My Tickets</Link>
        <Link href="/about" className="navLink">About Project</Link>
      </nav>

      {/* My Tickets Button */}
      <Link href="/my-tickets">
        <button className="headerButton">MY TICKETS →</button>
      </Link>
    </header>
  );
}
