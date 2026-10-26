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

interface ProjectCardProps {
  project: Project;
  featuredIndex?: number;
  locale?: "en" | "fr";
}

export function ProjectCard({ project, featuredIndex, locale = "en" }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const currentUi = locale === "fr" ? uiFr : uiEn;

  return (
    <article className="group relative rounded-2xl border border-border bg-card/80 hover:border-indigo-500/40 hover:bg-card transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between overflow-hidden">
      {/* Top Header & Badges */}
      <div className="p-6 sm:p-7 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border">
            {project.category}
          </span>
          {project.liveBadge && (
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              {project.liveBadge}
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Highlight Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 my-5 p-3 rounded-xl bg-muted/60 border border-border/70">
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
              onClick={openPipelineModal}
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-sky-500/10 hover:from-indigo-500/20 hover:to-sky-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold flex items-center justify-between transition-all group/btn shadow-sm cursor-pointer"
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

        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="mt-3 text-xs font-mono text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
        >
          {expanded ? (
            <>
              {currentUi.projects.showLess} <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              {currentUi.projects.showMore} <ChevronDown className="h-3.5 w-3.5" />
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
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-background border border-border text-foreground font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>{currentUi.projects.interactive}</span>
              </a>
            )}
          </div>

          <span className="text-[11px] font-mono text-muted-foreground">
            {currentUi.projects.provenLabel}
          </span>
        </div>
      </div>
    </article>
  );
}
