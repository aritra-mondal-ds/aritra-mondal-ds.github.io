"use client";

import React, { useState } from "react";
import { skillCategories, certificationsData } from "@/data/skills";
import { profileData } from "@/data/profile";
import {
  Brain,
  Database,
  Cloud,
  Shield,
  Award,
  Languages,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";

export function BentoSkills() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

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
              <span>Technical Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Core Competencies & Stack
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
              Organized by engineering discipline and production utility. Tested in enterprise distributed environments and rigorous academic research.
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
                All
              </button>
              <button
                onClick={() => setActiveFilter("core")}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeFilter === "core"
                    ? "bg-indigo-600 text-white font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Production Core
              </button>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 4 Technical Domains */}
          {skillCategories.map((category) => {
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
                      {filteredSkills.length} tools
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
                  <span>Proficiency:</span>
                  <span className="text-foreground font-semibold">Production Ready</span>
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
                  Verified Credentials
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">
                Industry Certifications
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Cloud architecture, graph databases, and enterprise security frameworks.
              </p>

              <div className="space-y-3">
                {certificationsData.map((cert, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 rounded-xl border border-border/70 bg-card/80 text-xs"
                  >
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{cert.name}</span>
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
              <span>Cloud Target: AWS Solutions Architect</span>
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
                  Global Mobility
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">
                Languages & Communication
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Operating smoothly in cross-functional French & international agile teams.
              </p>

              <div className="space-y-3">
                {profileData.languages.map((lang, lIdx) => (
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
              <span>Work Rights:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Titre de séjour / EU Open
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
