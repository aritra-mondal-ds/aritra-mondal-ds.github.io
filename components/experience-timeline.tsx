"use client";

import React, { useState } from "react";
import { experiencesData, educationData } from "@/data/experience";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Building2,
  CheckCircle,
  ExternalLink,
  Award,
} from "lucide-react";

export function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  return (
    <section id="experience" className="py-20 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-500 mb-2">
              <Briefcase className="h-3.5 w-3.5" />
              <span>Career Trajectory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Experience & Education
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
              Dual background in enterprise production data science and European academic excellence.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="inline-flex p-1 rounded-xl bg-card border border-border shadow-sm">
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "experience"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>Work Experience ({experiencesData.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "education"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Education & Bac+5 ({educationData.length})</span>
            </button>
          </div>
        </div>

        {/* Content based on Active Tab */}
        {activeTab === "experience" ? (
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:h-full before:w-0.5 before:bg-border">
            {experiencesData.map((exp) => (
              <div key={exp.id} className="relative flex items-start gap-6 sm:gap-8 group">
                {/* Timeline node icon */}
                <div className="relative z-10 flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-card border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs shadow-md shrink-0">
                  {exp.logoText || <Building2 className="h-4 w-4" />}
                </div>

                {/* Card Content */}
                <div className="flex-1 p-6 sm:p-7 rounded-2xl border border-border bg-card/80 hover:border-indigo-500/40 hover:bg-card transition-all duration-300 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {exp.role}
                      </h3>
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
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3 mb-4 leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* XYZ Format Bullet Points */}
                  <div className="space-y-2.5 my-4">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                      Quantified Accomplishments (XYZ Framework):
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

                  {/* Tech stack */}
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
          <div id="education" className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:h-full before:w-0.5 before:bg-border">
            {educationData.map((edu) => (
              <div key={edu.id} className="relative flex items-start gap-6 sm:gap-8 group">
                {/* Timeline node icon */}
                <div className="relative z-10 flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-card border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs shadow-md shrink-0">
                  <GraduationCap className="h-4 w-4" />
                </div>

                {/* Card Content */}
                <div className="flex-1 p-6 sm:p-7 rounded-2xl border border-border bg-card/80 hover:border-indigo-500/40 hover:bg-card transition-all duration-300 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-foreground">
                          {edu.degree}
                        </h3>
                      </div>
                      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 mt-0.5">
                        <span>{edu.institution}</span>
                        {edu.frenchEquivalent && (
                          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/25">
                            {edu.frenchEquivalent}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-muted-foreground gap-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  {edu.honors && (
                    <div className="inline-flex items-center gap-1.5 my-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-mono font-semibold">
                      <Award className="h-3.5 w-3.5" />
                      <span>{edu.honors}</span>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground mt-2 mb-4 leading-relaxed">
                    {edu.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-border/60">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Core Disciplines & Technical Mastery:
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
