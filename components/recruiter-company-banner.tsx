"use client";

import React, { useState, useEffect } from "react";
import { getCompanyFromUrl, isCompanyBannerDismissed, dismissCompanyBanner, trackEvent } from "@/lib/telemetry";
import { openRecruiterModal } from "./recruiter-fast-track-modal";
import { Sparkles, Zap, X, Building2, ArrowRight } from "lucide-react";

interface RecruiterCompanyBannerProps {
  locale?: "en" | "fr";
}

export function RecruiterCompanyBanner({ locale = "en" }: RecruiterCompanyBannerProps) {
  const [company, setCompany] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const detected = getCompanyFromUrl();
    if (detected && !isCompanyBannerDismissed(detected)) {
      setCompany(detected);
      setVisible(true);
      trackEvent("company_greeting_click", { company: detected, action: "banner_rendered" }, locale);
    }
  }, [locale]);

  if (!visible || !company) return null;

  // Format company nicely (e.g. "criteo" -> "Criteo")
  const formattedCompany = company
    .split(/[-_ ]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const handleDismiss = () => {
    dismissCompanyBanner(company);
    setVisible(false);
  };

  const handleOpenRecruiterSheet = () => {
    trackEvent("company_greeting_click", { company, action: "opened_recruiter_sheet" }, locale);
    openRecruiterModal();
  };

  return (
    <div className="relative mb-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-sky-500/10 p-4 sm:p-5 shadow-sm backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shrink-0 mt-0.5 sm:mt-0">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                {locale === "fr" ? "Accès Candidat Personnalisé" : "Custom Application View"}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold">
                {formattedCompany}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              {locale === "fr" ? (
                <>
                  Bienvenue à l&apos;équipe <span className="text-indigo-600 dark:text-indigo-400 font-bold">{formattedCompany}</span> ! Profil calibré pour vos enjeux Data Science & ML distribué.
                </>
              ) : (
                <>
                  Welcome to the <span className="text-indigo-600 dark:text-indigo-400 font-bold">{formattedCompany}</span> Team! Profile calibrated for your Production ML & Distributed Data challenges.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={handleOpenRecruiterSheet}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>{locale === "fr" ? "Fiche Synthèse ⚡" : "Executive Summary ⚡"}</span>
            <ArrowRight className="h-3 w-3" />
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
