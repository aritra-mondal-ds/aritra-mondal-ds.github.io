"use client";

import React, { useState } from "react";
import { certificationsData } from "@/data/skills";
import {
  Award,
  Cloud,
  Database,
  Shield,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
  Layers,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Cloud: <Cloud className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  GraduationCap: <GraduationCap className="h-5 w-5" />,
};

const categoryMeta: Record<string, { color: string; bg: string; border: string; label: string }> = {
  Cloud:            { color: "text-sky-600 dark:text-sky-400",     bg: "bg-sky-500/10",     border: "border-sky-500/25",     label: "Cloud & Infrastructure" },
  Database:         { color: "text-cyan-600 dark:text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-500/25",   label: "Graph & Database" },
  Security:         { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25", label: "Network Security" },
  "ML & AI":        { color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/25", label: "ML & AI" },
  "Data Engineering": { color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/25", label: "Data Engineering" },
  Academic:         { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10",  border: "border-amber-500/25",  label: "Academic Degree" },
};

const CATEGORY_ORDER = ["Academic", "Cloud", "Database", "Security", "ML & AI", "Data Engineering"];

export function CertificationsSection() {
  const [filter, setFilter] = useState<string>("All");
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({});

  const categories = ["All", ...CATEGORY_ORDER.filter((cat) =>
    certificationsData.some((c) => c.category === cat)
  )];

  const filtered = filter === "All"
    ? certificationsData
    : certificationsData.filter((c) => c.category === filter);

  // Sort: Academic first, then active, then in-progress
  const sorted = [...filtered].sort((a, b) => {
    if (a.category === "Academic" && b.category !== "Academic") return -1;
    if (b.category === "Academic" && a.category !== "Academic") return 1;
    if (a.status === "active" && b.status !== "active") return -1;
    if (b.status === "active" && a.status !== "active") return 1;
    return 0;
  });

  const toggleSkills = (id: string) =>
    setExpandedSkills((prev) => ({ ...prev, [id]: !prev[id] }));

  const activeCerts  = certificationsData.filter((c) => c.status === "active").length;
  const inProgress   = certificationsData.filter((c) => c.status === "in-progress").length;

  return (
    <section id="certifications" className="py-20 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-500 mb-2">
              <BadgeCheck className="h-3.5 w-3.5" />
              <span>Verified Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Diplomas & Certifications
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
              Academic degrees and industry-verified credentials spanning cloud architecture, graph databases, network security, and applied data science.
            </p>
          </div>

          {/* Summary stats */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-xl border border-border bg-card text-center shadow-sm">
              <div className="text-2xl font-extrabold font-mono text-foreground">{activeCerts}</div>
              <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Active</div>
            </div>
            {inProgress > 0 && (
              <div className="px-4 py-2.5 rounded-xl border border-border bg-card text-center shadow-sm">
                <div className="text-2xl font-extrabold font-mono text-foreground">{inProgress}</div>
                <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">In Progress</div>
              </div>
            )}
            <div className="px-4 py-2.5 rounded-xl border border-border bg-card text-center shadow-sm">
              <div className="text-2xl font-extrabold font-mono text-foreground">{certificationsData.length}</div>
              <div className="text-[11px] font-mono text-muted-foreground font-semibold">Total</div>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => {
            const meta = cat !== "All" ? categoryMeta[cat] : null;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                  filter === cat
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {cat === "All" ? "All Credentials" : (meta?.label ?? cat)}
              </button>
            );
          })}
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {sorted.map((cert) => {
            const meta = categoryMeta[cert.category];
            const skillsOpen = !!expandedSkills[cert.id];

            return (
              <article
                key={cert.id}
                className={`group relative flex flex-col rounded-2xl border bg-card/80 hover:bg-card shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
                  cert.category === "Academic"
                    ? "border-amber-500/30 hover:border-amber-500/60 md:col-span-2 xl:col-span-1"
                    : "border-border hover:border-indigo-500/40"
                }`}
              >
                {/* Status stripe at top */}
                <div className={`h-0.5 w-full ${cert.status === "active" ? "bg-emerald-500" : cert.status === "in-progress" ? "bg-amber-400" : "bg-muted-foreground/30"}`} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Category badge + status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono font-semibold border ${meta?.color} ${meta?.bg} ${meta?.border}`}>
                      <div className={meta?.color}>
                        {iconMap[cert.icon ?? "Award"] ?? <Award className="h-3.5 w-3.5" />}
                      </div>
                      <span>{meta?.label ?? cert.category}</span>
                    </div>

                    <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      cert.status === "active"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25"
                        : cert.status === "in-progress"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}>
                      {cert.status === "active" && <CheckCircle2 className="h-3 w-3" />}
                      {cert.status === "in-progress" && <Clock className="h-3 w-3" />}
                      {cert.status === "active" ? "Certified" : cert.status === "in-progress" ? "In Progress" : "Expired"}
                    </span>
                  </div>

                  {/* Cert name */}
                  <h3 className="font-bold text-foreground text-base leading-snug mb-1">
                    {cert.name}
                  </h3>

                  {/* Issuer */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    {cert.issuerUrl ? (
                      <a
                        href={cert.issuerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        {cert.issuer}
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    ) : (
                      <span>{cert.issuer}</span>
                    )}
                  </div>

                  {/* Date / Status */}
                  <div className="text-xs font-mono text-muted-foreground mb-3">
                    {cert.dateOrStatus}
                  </div>

                  {/* Credential ID / verify link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 hover:underline mb-3"
                    >
                      <BadgeCheck className="h-3 w-3" />
                      <span>Verify Credential</span>
                    </a>
                  )}

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Skills covered */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/60">
                      <button
                        onClick={() => toggleSkills(cert.id)}
                        className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors mb-2"
                      >
                        <Layers className="h-3 w-3" />
                        <span>Skills covered ({cert.skills.length})</span>
                        {skillsOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </button>
                      {skillsOpen && (
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, idx) => (
                            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted border border-border text-foreground">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* LinkedIn verification CTA */}
        <div className="mt-8 p-4 rounded-xl border border-border/70 bg-muted/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
            <BadgeCheck className="h-4 w-4 text-sky-500 shrink-0" />
            <span>All credentials are verifiable on LinkedIn and through their respective issuer portals.</span>
          </div>
          <a
            href="https://www.linkedin.com/in/aritra-mondal-66702021"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-border bg-card hover:bg-muted text-foreground transition-colors shrink-0"
          >
            <ExternalLink className="h-3.5 w-3.5 text-sky-500" />
            Verify on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

