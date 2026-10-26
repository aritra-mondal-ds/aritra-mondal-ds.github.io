"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { profileDataFr } from "@/data/fr/profile";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
import { ThemeToggle } from "./theme-toggle";
import { FileDown, Menu, X, Sparkles, Globe, Zap, Command, Search } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { RecruiterFastTrackModal, openRecruiterModal } from "./recruiter-fast-track-modal";
import { CommandPalette, openCommandPalette } from "./command-palette";

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
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo / Personal Brand */}
          <Link
            href={locale === "fr" ? "/fr/" : "/"}
            className="group flex items-center gap-2 sm:gap-2.5 text-foreground transition-opacity hover:opacity-90 shrink-0"
          >
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-mono font-bold text-xs sm:text-sm shadow-glow-sm">
              AM
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs sm:text-sm tracking-tight flex items-center gap-1.5 whitespace-nowrap">
                {currentProfile.name}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className="text-[10px] sm:text-[11px] text-muted-foreground font-mono truncate">
                Data Scientist · France
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Large screens >= 1280px) */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-card/60 border border-border/80 px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-2.5 xl:px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-full transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Global Command Palette Trigger (Cmd+K / Ctrl+K) */}
            <button
              onClick={openCommandPalette}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg border border-border bg-card/60 backdrop-blur-md text-xs font-mono text-muted-foreground hover:text-foreground hover:border-indigo-500/40 transition-all shadow-sm cursor-pointer group shrink-0"
              title={locale === "fr" ? "Palette de commandes globale (⌘K)" : "Global Command Palette (⌘K)"}
              aria-label="Open command palette"
            >
              <Search className="h-3.5 w-3.5 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted/80 border border-border text-foreground font-semibold">
                ⌘K
              </kbd>
            </button>

            {/* Language Switcher Pill */}
            <div className="inline-flex items-center p-0.5 rounded-lg border border-border bg-card/60 backdrop-blur-md shadow-sm text-xs font-mono shrink-0">
              <Link
                href={targetEnHref}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all ${
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
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all ${
                  locale === "fr"
                    ? "bg-indigo-600 text-white font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Passer en Français"
              >
                FR
              </Link>
            </div>

            {/* Social Icons (Wide screens >= 1536px) */}
            <a
              href="https://github.com/aritra-mondal-ds"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hidden 2xl:flex h-9 w-9 rounded-lg border border-border bg-card/60 backdrop-blur-md items-center justify-center text-muted-foreground hover:text-foreground hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-sm shrink-0"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/aritra-mondal-66702021"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hidden 2xl:flex h-9 w-9 rounded-lg border border-border bg-card/60 backdrop-blur-md items-center justify-center text-muted-foreground hover:text-foreground hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-sm shrink-0"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            {/* Recruiter Fast-Track Modal Trigger */}
            <button
              onClick={openRecruiterModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              title={locale === "fr" ? "Ouvrir la fiche express recruteur" : "Open executive recruiter synthesis"}
            >
              <Zap className="h-3.5 w-3.5 fill-current text-emerald-500 animate-pulse" />
              <span className="hidden xl:inline">{currentUi.recruiterFastTrack.buttonNav}</span>
            </button>

            {/* Download CV */}
            <a
              href="/cv.pdf"
              download="Aritra_Mondal_Data_Scientist_CV.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-card/60 backdrop-blur-md text-foreground hover:bg-muted transition-colors shadow-sm whitespace-nowrap shrink-0"
              title={locale === "fr" ? "Télécharger le CV (PDF)" : "Download CV (PDF)"}
            >
              <FileDown className="h-3.5 w-3.5 text-indigo-500" />
              <span>{currentUi.nav.downloadCv}</span>
            </a>

            {/* Hire Me / Recrutez-moi */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 xl:px-3.5 py-1.5 rounded-lg text-xs font-medium bg-foreground text-background hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap shrink-0"
            >
              <Sparkles className="h-3 w-3" />
              <span>{currentUi.nav.hireMe}</span>
            </a>

            {/* Theme Toggle (Always visible) */}
            <div className="shrink-0">
              <ThemeToggle />
            </div>

            {/* Responsive Menu Button (<1280px where center nav is hidden) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden h-9 w-9 rounded-lg border border-border bg-card/60 flex items-center justify-center text-muted-foreground hover:text-foreground touch-manipulation transition-colors shrink-0"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer (xl:hidden) */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 p-4 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-lg animate-accordion-down">
            <nav className="flex flex-col gap-2">
              {/* Command Palette Trigger inside menu */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCommandPalette();
                }}
                className="flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30"
              >
                <span className="flex items-center gap-2">
                  <Command className="h-4 w-4 text-indigo-500" />
                  <span>{locale === "fr" ? "Palette de commandes globale" : "Global Command Palette"}</span>
                </span>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted border border-border text-foreground">
                  ⌘K
                </kbd>
              </button>

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

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openRecruiterModal();
                  }}
                  className="w-full text-left flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4 fill-current text-emerald-500 animate-pulse" />
                    <span>{currentUi.recruiterFastTrack.buttonNav}</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 font-bold">
                    {locale === "fr" ? "0 Préavis" : "0 Notice"}
                  </span>
                </button>
              </div>

              {/* Hire Me CTA Button in mobile drawer */}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{currentUi.nav.hireMe}</span>
              </a>

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

      <RecruiterFastTrackModal locale={locale} />
      <CommandPalette locale={locale} />
    </header>
  );
}
