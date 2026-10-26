"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { profileDataFr } from "@/data/fr/profile";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
import { ThemeToggle } from "./theme-toggle";
import { FileDown, Menu, X, Sparkles, Globe } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

interface NavbarProps {
  locale?: "en" | "fr";
}

export function Navbar({ locale = "en" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  const currentProfile = locale === "fr" ? profileDataFr : profileData;
  const currentUi = locale === "fr" ? uiFr : uiEn;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleHash = () => {
      setCurrentHash(window.location.hash);
    };

    handleHash();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHash);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: currentUi.nav.projects, href: "#projects" },
    { name: currentUi.nav.skills, href: "#skills" },
    { name: currentUi.nav.experience, href: "#experience" },
    { name: currentUi.nav.education, href: "#education" },
    { name: currentUi.nav.terminal, href: "#terminal" },
    { name: currentUi.nav.contact, href: "#contact" },
  ];

  const targetEnHref = currentHash ? `/${currentHash}` : "/";
  const targetFrHref = currentHash ? `/fr/${currentHash}` : "/fr/";

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
            href={locale === "fr" ? "/fr/" : "/"}
            className="group flex items-center gap-3 text-foreground transition-opacity hover:opacity-90"
          >
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-mono font-bold text-sm shadow-glow-sm">
              AM
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight flex items-center gap-1.5">
                {currentProfile.name}
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
            {/* Language Switcher Pill */}
            <div className="inline-flex items-center p-0.5 rounded-lg border border-border bg-card/60 backdrop-blur-md shadow-sm text-xs font-mono">
              <Link
                href={targetEnHref}
                className={`px-2 py-1 rounded-md transition-all ${
                  locale === "en"
                    ? "bg-indigo-600 text-white font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Switch to English"
              >
                EN
              </Link>
              <Link
                href={targetFrHref}
                className={`px-2 py-1 rounded-md transition-all ${
                  locale === "fr"
                    ? "bg-indigo-600 text-white font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Passer en Français"
              >
                FR
              </Link>
            </div>

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
              title={locale === "fr" ? "Télécharger le CV (PDF)" : "Download CV (PDF)"}
            >
              <FileDown className="h-3.5 w-3.5 text-indigo-500" />
              <span>{currentUi.nav.downloadCv}</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-foreground text-background hover:opacity-90 transition-opacity shadow-sm"
            >
              <Sparkles className="h-3 w-3" />
              <span>{currentUi.nav.hireMe}</span>
            </a>

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Language Switch */}
          <div className="flex sm:hidden items-center gap-1.5">
            {/* Mobile Language Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-md border border-border bg-card/60 text-[11px] font-mono">
              <Link
                href={targetEnHref}
                className={`px-1.5 py-0.5 rounded ${
                  locale === "en"
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-muted-foreground"
                }`}
              >
                EN
              </Link>
              <Link
                href={targetFrHref}
                className={`px-1.5 py-0.5 rounded ${
                  locale === "fr"
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-muted-foreground"
                }`}
              >
                FR
              </Link>
            </div>

            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-10 w-10 rounded-lg border border-border bg-card/60 flex items-center justify-center text-muted-foreground hover:text-foreground touch-manipulation transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
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
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
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
                <a
                  href="/cv.pdf"
                  download="Aritra_Mondal_Data_Scientist_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border border-border bg-muted/80 text-foreground"
                >
                  <FileDown className="h-3 w-3 text-indigo-500" />
                  <span>{currentUi.nav.downloadCv}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
