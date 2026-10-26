"use client";

import React from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import { profileDataFr } from "@/data/fr/profile";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
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
  Zap,
  Clock,
  Cpu,
  Command,
} from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { openRecruiterModal } from "./recruiter-fast-track-modal";
import { openCommandPalette } from "./command-palette";

interface HeroProps {
  locale?: "en" | "fr";
}

export function Hero({ locale = "en" }: HeroProps) {
  const currentProfile = locale === "fr" ? profileDataFr : profileData;
  const currentUi = locale === "fr" ? uiFr : uiEn;

  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="h-4 w-4 text-indigo-500" />,
    MapPin: <MapPin className="h-4 w-4 text-emerald-500" />,
    ShieldCheck: <ShieldCheck className="h-4 w-4 text-sky-500" />,
    Languages: <Languages className="h-4 w-4 text-amber-500" />,
    Briefcase: <Briefcase className="h-4 w-4 text-violet-500" />,
    Clock: <Clock className="h-4 w-4 text-emerald-500" />,
    Cpu: <Cpu className="h-4 w-4 text-indigo-500" />,
    Zap: <Zap className="h-4 w-4 text-emerald-500" />,
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top availability pill with 1-click Fast-Track recruiter modal trigger */}
        <button
          onClick={openRecruiterModal}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-medium hover:bg-emerald-500/20 transition-all cursor-pointer shadow-sm mb-6"
          title={locale === "fr" ? "Ouvrir la fiche express recruteur" : "Open executive recruiter synthesis"}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{currentUi.hero.badge}</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white transition-all ml-1">
            {locale === "fr" ? "Fiche Recruteur ⚡" : "Fast-Track ⚡"}
          </span>
        </button>

        {/* Main Headline & Authentic Portrait */}
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-8 max-w-5xl">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              {currentUi.hero.headlinePrefix}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-400">
                {currentUi.hero.headlineGradient}
              </span>{" "}
              {currentUi.hero.headlineSuffix}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-normal leading-relaxed">
              {locale === "fr" ? (
                <>
                  Bonjour, je suis{" "}
                  <span className="font-semibold text-foreground">{currentProfile.name}</span>. Data Scientist avec une expérience de production chez{" "}
                  <span className="text-foreground font-medium underline decoration-indigo-400/50 underline-offset-4">
                    Amadeus
                  </span>{" "}
                  et titulaire d&apos;un Applied MSc en Data Science & IA (Summa Cum Laude, Bac+5). Je conçois des modèles prédictifs scalables, des pipelines distribués Spark/Scala et des architectures MLOps résilientes.
                </>
              ) : (
                <>
                  Hi, I&apos;m{" "}
                  <span className="font-semibold text-foreground">{currentProfile.name}</span>. Data Scientist with production experience at{" "}
                  <span className="text-foreground font-medium underline decoration-indigo-400/50 underline-offset-4">
                    Amadeus
                  </span>{" "}
                  and an Applied MSc in Data Science & AI (Summa Cum Laude, Bac+5). I build scalable predictive models, distributed Spark/Scala pipelines, and resilient MLOps architectures.
                </>
              )}
            </p>
          </div>

          {/* Authentic Portrait with 100% Biometric Preservation */}
          <div className="relative shrink-0 self-start md:self-center">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-2xl p-1 bg-gradient-to-tr from-indigo-500/30 via-border to-sky-500/20 shadow-xl overflow-hidden group">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-muted">
                <Image
                  src="/aritra-mondal.jpg"
                  alt="Aritra Mondal — Data Scientist"
                  width={176}
                  height={176}
                  priority
                  className="object-cover object-top w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-card/90 backdrop-blur-md border border-border shadow-sm text-[10px] font-mono text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Aritra Mondal</span>
            </div>
          </div>
        </div>

        {/* French Recruiter Signal Pills */}
        <div className="mt-8 pt-6 border-t border-border/60">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-indigo-500" />
            <span>{currentUi.hero.recruiterTitle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {currentProfile.recruiterSignals.map((signal, idx) => (
              <div
                key={idx}
                className="group relative flex items-start gap-3 p-3 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm hover:border-indigo-500/40 hover:bg-card/90 transition-all shadow-sm min-h-[84px]"
              >
                <div className="p-2 rounded-lg bg-muted/80 border border-border/50 shrink-0">
                  {iconMap[signal.icon] || <Sparkles className="h-4 w-4 text-indigo-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase truncate">
                      {signal.label}
                    </span>
                    {signal.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 whitespace-nowrap shrink-0">
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

        {/* Primary CTAs & Social Links */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={openRecruiterModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer"
          >
            <Zap className="h-4 w-4 fill-current text-emerald-500 animate-pulse" />
            <span>{currentUi.recruiterFastTrack.buttonHero}</span>
          </button>

          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{currentUi.hero.viewProjects}</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="/cv.pdf"
            download="Aritra_Mondal_Data_Scientist_CV.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-card hover:bg-muted text-foreground border border-border transition-colors shadow-sm"
          >
            <FileDown className="h-4 w-4 text-indigo-500" />
            <span>{currentUi.hero.downloadCvPdf}</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-card hover:bg-muted text-foreground border border-border transition-colors shadow-sm"
          >
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{currentUi.hero.getInTouch}</span>
          </a>

          <a
            href="https://github.com/aritra-mondal-ds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-card hover:bg-muted text-foreground border border-border transition-colors shadow-sm"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/aritra-mondal-66702021"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-card hover:bg-muted text-foreground border border-border transition-colors shadow-sm"
          >
            <Linkedin className="h-4 w-4 text-sky-500" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          <a
            href="#terminal"
            className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl font-medium text-sm text-muted-foreground hover:text-foreground font-mono transition-colors"
          >
            <Terminal className="h-4 w-4 text-indigo-400" />
            <span className="text-xs">curl -s /profile</span>
          </a>

          <button
            onClick={openCommandPalette}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-muted-foreground hover:text-foreground border border-border bg-card/60 hover:bg-card transition-colors shadow-sm ml-auto cursor-pointer"
            title={locale === "fr" ? "Ouvrir la palette de commandes (⌘K)" : "Open command palette (⌘K)"}
          >
            <Command className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-[11px] font-sans hidden sm:inline">{locale === "fr" ? "Commandes" : "Commands"}</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted border border-border text-foreground font-semibold">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </section>
  );
}
