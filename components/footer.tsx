"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { profileDataFr } from "@/data/fr/profile";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

interface FooterProps {
  locale?: "en" | "fr";
}

export function Footer({ locale = "en" }: FooterProps) {
  const currentProfile = locale === "fr" ? profileDataFr : profileData;
  const currentUi = locale === "fr" ? uiFr : uiEn;
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: currentUi.nav.projects, href: "#projects" },
    { name: currentUi.nav.skills, href: "#skills" },
    { name: currentUi.nav.experience, href: "#experience" },
    { name: currentUi.nav.education, href: "#education" },
    { name: currentUi.nav.terminal, href: "#terminal" },
    { name: currentUi.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="border-t border-border bg-card/40 py-12 text-xs font-mono text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-glow-sm">
              AM
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {currentProfile.name}
              </span>{" "}
              — {currentUi.footer.roleDesc}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/aritra-mondal-ds"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/aritra-mondal-66702021"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${currentProfile.email}`}
              aria-label="Email"
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {currentYear} {currentProfile.name}. {currentUi.footer.rightsReserved}
          </div>
          <div className="flex items-center gap-1.5">
            <span>{currentUi.footer.techStack}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
