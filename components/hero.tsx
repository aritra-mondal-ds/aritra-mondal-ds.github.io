"use client";

import React from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import {
  GraduationCap,
  MapPin,
  ShieldCheck,
  Languages,
  Briefcase,
  ArrowRight,
  FileDown,
  Mail,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

export function Hero() {
  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="h-4 w-4 text-indigo-500" />,
    MapPin: <MapPin className="h-4 w-4 text-emerald-500" />,
    ShieldCheck: <ShieldCheck className="h-4 w-4 text-sky-500" />,
    Languages: <Languages className="h-4 w-4 text-amber-500" />,
    Briefcase: <Briefcase className="h-4 w-4 text-violet-500" />,
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Two-column layout: text left, photo right ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">

          {/* ── Left: all text content ── */}
          <div className="flex-1 min-w-0">
            {/* Top availability pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-medium mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Actively Interviewing · Data Scientist roles in Paris & France (Hybrid/Onsite)</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                Engineering{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-400">
                  End-to-End Machine Learning
                </span>{" "}
                & Distributed Data Systems
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground font-normal leading-relaxed">
                Hi, I&apos;m <span className="font-semibold text-foreground">{profileData.name}</span>. Data Scientist with production experience at{" "}
                <span className="text-foreground font-medium underline decoration-indigo-400/50 underline-offset-4">Amadeus</span>{" "}
                and an Applied MSc in Data Science & AI (Summa Cum Laude, Bac+5). I build scalable predictive models, distributed Spark/Scala pipelines, and resilient MLOps architectures.
              </p>
            </div>

            {/* French Recruiter Signal Pills */}
            <div className="mt-8 pt-6 border-t border-border/60">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-indigo-500" />
                <span>Key French Market Recruiter Signals</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {profileData.recruiterSignals.map((signal, idx) => (
                  <div
                    key={idx}
                    className="group relative flex items-start gap-3 p-3 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm hover:border-indigo-500/40 hover:bg-card/90 transition-all shadow-sm"
                  >
                    <div className="p-2 rounded-lg bg-muted/80 border border-border/50 shrink-0">
                      {iconMap[signal.icon] || <Sparkles className="h-4 w-4 text-indigo-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[11px] font-mono text-muted-foreground uppercase">
                          {signal.label}
                        </span>
                        {signal.badge && (
                          <span className="text-[10px] font-semibold px-1.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                            {signal.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-foreground truncate">
                        {signal.value}
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                        {signal.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/cv.pdf"
                download="Aritra_Mondal_Data_Scientist_CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-card hover:bg-muted text-foreground border border-border transition-colors shadow-sm"
              >
                <FileDown className="h-4 w-4 text-indigo-500" />
                <span>Download CV (PDF)</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-card hover:bg-muted text-foreground border border-border transition-colors shadow-sm"
              >
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>Get in Touch</span>
              </a>

              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/aritra-mondal-ds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-xl border border-border bg-card hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aritra-mondal-66702021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-xl border border-border bg-card hover:bg-muted flex items-center justify-center text-sky-500 hover:text-sky-600 transition-colors shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>

              <a
                href="#terminal"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-muted-foreground hover:text-foreground font-mono transition-colors"
              >
                <Terminal className="h-4 w-4 text-indigo-400" />
                <span className="text-xs">curl -s /profile</span>
              </a>
            </div>
          </div>

          {/* ── Right: Photo ── */}
          <div className="flex-shrink-0 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="relative">
              {/* Decorative glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-sky-500/20 blur-2xl scale-110 -z-10" />

              {/* Outer frame */}
              <div className="relative rounded-2xl p-1 bg-gradient-to-br from-indigo-500/30 via-border/50 to-sky-500/20 shadow-2xl">
                {/* Photo */}
                <div className="relative w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-96 rounded-xl overflow-hidden bg-muted">
                  <Image
                    src="/aritra-mondal.jpg"
                    alt="Aritra Mondal — Data Scientist"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                  />
                </div>

                {/* Floating name badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border shadow-lg backdrop-blur-md whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-foreground">Aritra Mondal</span>
                  <span className="text-[10px] text-muted-foreground font-mono">· Data Scientist</span>
                </div>
              </div>

              {/* Floating stats chip — production badge */}
              <div className="absolute -top-3 -right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-indigo-500/30 shadow-md text-[11px] font-mono">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">35%</span>
                <span className="text-muted-foreground">ETL speedup · Amadeus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
