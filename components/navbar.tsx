"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { ThemeToggle } from "./theme-toggle";
import { FileDown, Menu, X, Sparkles } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Terminal", href: "#terminal" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-foreground transition-opacity hover:opacity-90"
          >
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-mono font-bold text-sm shadow-glow-sm">
              AM
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight flex items-center gap-1.5">
                {profileData.name}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">
                Data Scientist · France
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-card/60 border border-border/80 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-full transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Socials */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="https://github.com/aritra-mondal-ds"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="h-9 w-9 rounded-lg border border-border bg-card/60 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-sm"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/aritra-mondal-66702021"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="h-9 w-9 rounded-lg border border-border bg-card/60 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-sm"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <a
              href="/cv.pdf"
              download="Aritra_Mondal_Data_Scientist_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-card/60 backdrop-blur-md text-foreground hover:bg-muted transition-colors shadow-sm"
              title="Download CV (PDF)"
            >
              <FileDown className="h-3.5 w-3.5 text-indigo-500" />
              <span>CV</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-foreground text-background hover:opacity-90 transition-opacity shadow-sm"
            >
              <Sparkles className="h-3 w-3" />
              <span>Hire Me</span>
            </a>

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 rounded-lg border border-border bg-card/60 flex items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 p-4 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-lg animate-accordion-down">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-border flex items-center gap-3">
                <a
                  href="https://github.com/aritra-mondal-ds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground py-1"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/aritra-mondal-66702021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground py-1"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
