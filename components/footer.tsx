"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { Mail, Heart, Sparkles } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
                {profileData.name}
              </span>{" "}
              — Data Scientist (Amadeus / DSTI Bac+5)
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#projects"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="hover:text-foreground transition-colors"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="hover:text-foreground transition-colors"
            >
              Experience
            </a>
            <a
              href="#education"
              className="hover:text-foreground transition-colors"
            >
              Education
            </a>
            <a
              href="#terminal"
              className="hover:text-foreground transition-colors"
            >
              Terminal
            </a>
            <a
              href="#contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
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
              href={`mailto:${profileData.email}`}
              aria-label="Email"
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {currentYear} {profileData.name}. All rights reserved. Built for top-tier French & EU tech teams.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Engineered with Next.js 15, Tailwind CSS & TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
