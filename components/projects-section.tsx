"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import { projectsDataFr } from "@/data/fr/projects";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
import { ProjectCard } from "./project-card";
import { Rocket } from "lucide-react";

interface ProjectsSectionProps {
  locale?: "en" | "fr";
}

export function ProjectsSection({ locale = "en" }: ProjectsSectionProps) {
  const currentProjects = locale === "fr" ? projectsDataFr : projectsData;
  const currentUi = locale === "fr" ? uiFr : uiEn;

  const allCategoryLabel = currentUi.projects.filterAll;
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    { key: "ALL", label: allCategoryLabel },
    { key: "MLOps & Systems", label: "MLOps & Systems" },
    { key: "Time-Series & Forecasting", label: "Time-Series & Forecasting" },
    { key: "Applied Predictive Modeling", label: "Applied Predictive Modeling" },
    { key: "Cybersecurity & Graph AI", label: "Cybersecurity & Graph AI" },
  ];

  const filteredProjects =
    selectedCategory === "ALL"
      ? currentProjects
      : currentProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-500 mb-2">
              <Rocket className="h-3.5 w-3.5" />
              <span>{currentUi.projects.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {currentUi.projects.title}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
              {currentUi.projects.subtitle}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.key
                    ? "bg-foreground text-background font-semibold shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Card Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              featuredIndex={idx}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
