"use client";

import React, { useState } from "react";
import { Project } from "@/types";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
import {
  ExternalLink,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Server,
  Award,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";
import { Github } from "@/components/icons";
import { openPipelineModal } from "./pipeline-visualizer-modal";
import { trackEvent } from "@/lib/telemetry";

interface ProjectCardProps {
  project: Project;
  featuredIndex?: number;
  locale?: "en" | "fr";
}

export function ProjectCard({ project, featuredIndex, locale = "en" }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const currentUi = locale === "fr" ? uiFr : uiEn;

  return (
    <article className="relative rounded-2xl border border-border bg-card/80 shadow-sm flex flex-col justify-between overflow-hidden cursor-default select-text">
      {/* Top Header & Badges */}
      <div className="p-6 sm:p-7 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border cursor-default">
            {project.category}
          </span>
          {project.liveBadge && (
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25 flex items-center gap-1.5 cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              {project.liveBadge}
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Highlight Metrics Grid (Grounded Data Display) */}
        <div className="grid grid-cols-3 gap-2 my-5 p-3 rounded-xl bg-muted/60 border border-border/70 cursor-default">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="text-center">
              <div className="text-base sm:text-lg font-mono font-extrabold text-foreground">
                {metric.value}
              </div>
              <div className="text-[10px] sm:text-[11px] text-muted-foreground leading-tight mt-0.5">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Amadeus Spark/Scala Interactive Pipeline Architecture Visualizer Launcher */}
        {project.id === "airline-demand-forecasting" && (
          <div className="mb-5">
            <button
              onClick={() => {
                trackEvent("pipeline_modal_open", { project: project.id }, locale);
                openPipelineModal();
              }}
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-sky-500/10 hover:from-indigo-500/20 hover:to-sky-500/20 border border-indigo-500/30 hover:border-indigo-500/50 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold flex items-center justify-between transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md cursor-pointer group/btn"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-500 animate-pulse" />
                <span>{currentUi.pipelineVisualizer.buttonLabel}</span>
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 group-hover/btn:bg-emerald-500 group-hover/btn:text-white transition-all">
                -35% Latency ⚡
              </span>
            </button>
          </div>
        )}

        {/* Problem -> Solution -> Production -> Business Impact Framework */}
        <div className="space-y-3.5 text-xs sm:text-sm">
          {/* Problem */}
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
              <AlertCircle className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {currentUi.projects.problemLabel}:{" "}
              </span>
              <span className="text-muted-foreground">{project.problem}</span>
            </div>
          </div>

          {/* Solution */}
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
              <Lightbulb className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {currentUi.projects.solutionLabel}:{" "}
              </span>
              <span className="text-muted-foreground">{project.solution}</span>
            </div>
          </div>

          {/* Collapsible / Expandable details for Production & Business Impact */}
          {expanded && (
            <div className="space-y-3.5 pt-2 border-t border-border/50 animate-accordion-down">
              {/* Production */}
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
                  <Server className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    {currentUi.projects.productionLabel}:{" "}
                  </span>
                  <span className="text-muted-foreground">{project.production}</span>
                </div>
              </div>

              {/* Business Impact */}
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    {currentUi.projects.impactLabel}:{" "}
                  </span>
                  <span className="text-foreground font-medium">{project.businessImpact}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Explicit Accordion Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-xs"
        >
          {expanded ? (
            <>
              <span>{currentUi.projects.showLess}</span>
              <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              <span>{currentUi.projects.showMore}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Tech Stack & Links Footer */}
      <div className="p-6 sm:p-7 pt-4 bg-muted/30 border-t border-border/60">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-background border border-border text-foreground font-medium cursor-default select-text"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2.5">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted hover:border-foreground/30 text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-xs cursor-pointer"
              >
                <Github className="h-3.5 w-3.5" />
                <span>{currentUi.projects.sourceCode}</span>
              </a>
            )}

            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-xs cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>{currentUi.projects.interactive}</span>
              </a>
            )}
          </div>

          <span className="text-[11px] font-mono text-muted-foreground cursor-default select-text">
            {currentUi.projects.provenLabel}
          </span>
        </div>
      </div>
    </article>
  );
}
