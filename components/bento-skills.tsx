"use client";

import React, { useState } from "react";
import { skillCategories, certificationsData } from "@/data/skills";
import { skillCategoriesFr, certificationsDataFr } from "@/data/fr/skills";
import { profileData } from "@/data/profile";
import { profileDataFr } from "@/data/fr/profile";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
import {
  Brain,
  Database,
  Cloud,
  Shield,
  Award,
  Languages,
  CheckCircle2,
  ExternalLink,
  Layers,
} from "lucide-react";

interface BentoSkillsProps {
  locale?: "en" | "fr";
}

export function BentoSkills({ locale = "en" }: BentoSkillsProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const currentCategories = locale === "fr" ? skillCategoriesFr : skillCategories;
  const currentCerts = locale === "fr" ? certificationsDataFr : certificationsData;
  const currentProfile = locale === "fr" ? profileDataFr : profileData;
  const currentUi = locale === "fr" ? uiFr : uiEn;

  const iconMap: Record<string, React.ReactNode> = {
    Brain: <Brain className="h-5 w-5 text-indigo-400" />,
    Database: <Database className="h-5 w-5 text-cyan-400" />,
    Cloud: <Cloud className="h-5 w-5 text-sky-400" />,
    Shield: <Shield className="h-5 w-5 text-emerald-400" />,
  };

  return (
    <section id="skills" className="py-20 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-500 mb-2">
              <Layers className="h-3.5 w-3.5" />
              <span>{currentUi.skills.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {currentUi.skills.title}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
              {currentUi.skills.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">Filter:</span>
            <div className="inline-flex p-1 rounded-lg bg-card border border-border text-xs font-mono">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeFilter === "all"
                    ? "bg-indigo-600 text-white font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {currentUi.skills.filterAll}
              </button>
              <button
                onClick={() => setActiveFilter("core")}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeFilter === "core"
                    ? "bg-indigo-600 text-white font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {currentUi.skills.filterCore}
              </button>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 4 Technical Domains */}
          {currentCategories.map((category) => {
            const filteredSkills =
              activeFilter === "core"
                ? category.skills.filter((s) => s.highlight)
                : category.skills;

            return (
              <div
                key={category.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border bg-card/70 hover:border-indigo-500/50 hover:bg-card transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-muted border border-border/80 flex items-center justify-center">
                      {iconMap[category.icon]}
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {filteredSkills.length} {currentUi.skills.toolsSuffix}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {filteredSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                          skill.highlight
                            ? "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/25 font-semibold"
                            : "bg-muted/70 text-foreground border border-border/60"
                        }`}
                      >
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        )}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>{currentUi.skills.proficiencyLabel}</span>
                  <span className="text-foreground font-semibold">
                    {currentUi.skills.proficiencyValue}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Certifications Card */}
          <div className="p-6 rounded-2xl border border-border bg-gradient-to-br from-card to-muted/40 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-medium">
                  {currentUi.skills.verifiedBadge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">
                {currentUi.skills.certificationsTitle}
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                {currentUi.skills.certificationsSub}
              </p>

              <div className="space-y-3">
                {currentCerts.map((cert, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 rounded-xl border border-border/70 bg-card/80 text-xs hover:border-indigo-500/30 transition-colors"
                  >
                    <div className="font-semibold text-foreground flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{cert.name}</span>
                      </div>
                      {cert.verifyUrl && (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Verify ${cert.name}`}
                          className="text-muted-foreground hover:text-indigo-500 transition-colors shrink-0"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-muted-foreground">
                      <span>{cert.issuer}</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                        {cert.dateOrStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 text-[11px] font-mono text-muted-foreground">
              <span>{currentUi.skills.targetLabel}</span>
            </div>
          </div>

          {/* Languages & Recruiter Fit Card */}
          <div className="p-6 rounded-2xl border border-border bg-gradient-to-br from-card to-indigo-950/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center">
                  <Languages className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                  {currentUi.skills.mobilityBadge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">
                {currentUi.skills.mobilityTitle}
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                {currentUi.skills.mobilitySub}
              </p>

              <div className="space-y-3">
                {currentProfile.languages.map((lang, lIdx) => (
                  <div
                    key={lIdx}
                    className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-card/80 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-foreground">{lang.language}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {lang.proficiency}
                      </div>
                    </div>
                    <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                      {lang.levelTag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>{currentUi.skills.workRightsLabel}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {currentUi.skills.workRightsValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
