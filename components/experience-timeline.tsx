"use client";

import React, { useState, useEffect } from "react";
import { experiencesData, educationData } from "@/data/experience";
import { experiencesDataFr, educationDataFr } from "@/data/fr/experience";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Building2,
  CheckCircle,
  Award,
  BookOpen,
  ExternalLink,
  FlaskConical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ExperienceTimelineProps {
  locale?: "en" | "fr";
}

export function ExperienceTimeline({ locale = "en" }: ExperienceTimelineProps) {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const currentExperiences = locale === "fr" ? experiencesDataFr : experiencesData;
  const currentEducation = locale === "fr" ? educationDataFr : educationData;
  const currentUi = locale === "fr" ? uiFr : uiEn;

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#education") {
        setActiveTab("education");
        const el = document.getElementById("education-target");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else if (hash === "#experience") {
        setActiveTab("experience");
        const el = document.getElementById("experience-target");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleTabChange = (tab: "experience" | "education") => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  };

  const toggleModules = (id: string) =>
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="py-20 border-t border-border/60 relative">
      {/* Invisible anchor targets with scroll-margin offset for sticky header */}
      <span id="experience" className="absolute -top-24 pointer-events-none" />
      <span id="education" className="absolute -top-24 pointer-events-none" />
      <span id="experience-target" className="absolute -top-24 pointer-events-none" />
      <span id="education-target" className="absolute -top-24 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-500 mb-2">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{currentUi.experience.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {currentUi.experience.title}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
              {currentUi.experience.subtitle}
            </p>
          </div>

          {/* Tab Selector */}
          <div role="tablist" aria-label="Experience and education switcher" className="inline-flex p-1 rounded-xl bg-card border border-border shadow-sm">
            <button
              role="tab"
              aria-selected={activeTab === "experience"}
              aria-controls="experience-panel"
              id="experience-tab"
              onClick={() => handleTabChange("experience")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "experience"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>
                {currentUi.experience.tabExperience} ({currentExperiences.length})
              </span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "education"}
              aria-controls="education-panel"
              id="education-tab"
              onClick={() => handleTabChange("education")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "education"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>
                {currentUi.experience.tabEducation} ({currentEducation.length})
              </span>
            </button>
          </div>
        </div>

        {/* ─── Work Experience ─── */}
        {activeTab === "experience" ? (
          <div
            id="experience-panel"
            role="tabpanel"
            aria-labelledby="experience-tab"
            className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:h-full before:w-0.5 before:bg-border"
          >
            {currentExperiences.map((exp) => (
              <div key={exp.id} className="relative flex items-start gap-6 sm:gap-8 group">
                {/* Timeline node */}
                <div className="relative z-10 flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-card border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs shadow-md shrink-0">
                  {exp.logoText || <Building2 className="h-4 w-4" />}
                </div>

                {/* Card */}
                <div className="flex-1 p-6 sm:p-7 rounded-2xl border border-border bg-card/80 hover:border-indigo-500/40 hover:bg-card transition-all duration-300 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 mt-0.5">
                        <Building2 className="h-3.5 w-3.5" />
                        <span>{exp.company}</span>
                        <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-muted-foreground gap-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3 mb-4 leading-relaxed">
                    {exp.summary}
                  </p>

                  <div className="space-y-2.5 my-4">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                      {currentUi.experience.xyzLabel}
                    </span>
                    <ul className="space-y-2">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-foreground border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ─── Education ─── */
          <div
            id="education-panel"
            role="tabpanel"
            aria-labelledby="education-tab"
            className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:h-full before:w-0.5 before:bg-border"
          >
            {currentEducation.map((edu) => {
              const modulesOpen = !!expandedModules[edu.id];
              return (
                <div key={edu.id} className="relative flex items-start gap-6 sm:gap-8 group">
                  {/* Timeline node */}
                  <div className="relative z-10 flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-card border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-[10px] shadow-md shrink-0">
                    {edu.logoText || <GraduationCap className="h-4 w-4" />}
                  </div>

                  {/* Card */}
                  <div className="flex-1 p-6 sm:p-7 rounded-2xl border border-border bg-card/80 hover:border-indigo-500/40 hover:bg-card transition-all duration-300 shadow-sm">
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                        <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex flex-wrap items-center gap-2 mt-1">
                          {edu.institutionUrl ? (
                            <a
                              href={edu.institutionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline flex items-center gap-1"
                            >
                              {edu.institution}
                              <ExternalLink className="h-3 w-3 opacity-60" />
                            </a>
                          ) : (
                            <span>{edu.institution}</span>
                          )}
                        </div>
                        {edu.frenchEquivalent && (
                          <span className="inline-flex mt-1.5 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/25">
                            {edu.frenchEquivalent}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:items-end text-xs font-mono text-muted-foreground gap-1 shrink-0">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {edu.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    {/* Honours badge */}
                    {edu.honors && (
                      <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-mono font-semibold">
                        <Award className="h-3.5 w-3.5" />
                        <span>{edu.honors}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {edu.description}
                    </p>

                    {/* Dissertation / Thesis */}
                    {edu.thesis && (
                      <div className="mb-4 p-3.5 rounded-xl border border-border/70 bg-muted/40">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-foreground mb-1.5">
                          <FlaskConical className="h-3.5 w-3.5 text-indigo-500" />
                          <span>{currentUi.experience.thesisLabel}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {edu.thesis}
                        </p>
                      </div>
                    )}

                    {/* Modules – collapsible */}
                    {edu.modules && edu.modules.length > 0 && (
                      <div className="mb-4">
                        <button
                          onClick={() => toggleModules(edu.id)}
                          className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-foreground hover:text-indigo-500 transition-colors mb-2"
                        >
                          <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
                          <span>
                            {currentUi.experience.modulesLabel} ({edu.modules.length})
                          </span>
                          {modulesOpen
                            ? <ChevronUp className="h-3.5 w-3.5" />
                            : <ChevronDown className="h-3.5 w-3.5" />}
                        </button>

                        {modulesOpen && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                            {edu.modules.map((mod, mIdx) => (
                              <div
                                key={mIdx}
                                className="flex items-start gap-2 text-xs text-muted-foreground px-3 py-2 rounded-lg bg-muted/50 border border-border/60"
                              >
                                <span className="text-indigo-500 font-mono shrink-0 mt-0.5">→</span>
                                <span>{mod}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Skills gained */}
                    <div className="pt-4 border-t border-border/60">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                        {currentUi.experience.skillsLabel}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.skillsGained.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-foreground border border-border"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
