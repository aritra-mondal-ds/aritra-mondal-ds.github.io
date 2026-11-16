"use client";

import React, { useState, useEffect } from "react";
import { getTelemetrySnapshot, generateTrackedUrl, TelemetrySession, getOrCreateSession } from "@/lib/telemetry";
import { Activity, ShieldCheck, Clock, Layers, Copy, Check, ExternalLink, X, Terminal } from "lucide-react";

interface LiveTelemetryBadgeProps {
  locale?: "en" | "fr";
}

export function LiveTelemetryBadge({ locale = "en" }: LiveTelemetryBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [snapshot, setSnapshot] = useState<ReturnType<typeof getTelemetrySnapshot> | null>(null);
  const [companyInput, setCompanyInput] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setSnapshot(getTelemetrySnapshot(locale));
    const interval = setInterval(() => {
      setSnapshot(getTelemetrySnapshot(locale));
    }, 4000);
    return () => clearInterval(interval);
  }, [locale]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyInput.trim()) return;
    const url = generateTrackedUrl(companyInput.trim(), locale);
    setGeneratedLink(url);
  };

  const handleCopyLink = async () => {
    try {
      if (navigator?.clipboard?.writeText && generatedLink) {
        await navigator.clipboard.writeText(generatedLink);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative inline-block">
      {/* Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono bg-card/70 hover:bg-card border border-border hover:border-indigo-500/40 text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs active:scale-95"
        title={locale === "fr" ? "Afficher les métriques de télémétrie en temps réel" : "View real-time telemetry metrics"}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-medium">
          {locale === "fr" ? "Télémétrie Live : Active" : "Live Telemetry: Active"}
        </span>
        <span className="text-[10px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground border border-border/60">
          CNIL / RGPD
        </span>
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-3 w-80 sm:w-96 rounded-2xl border border-border bg-card/95 backdrop-blur-xl p-4 shadow-xl z-50 text-left animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                {locale === "fr" ? "Métriques de Session en Temps Réel" : "Real-Time Session Telemetry"}
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {snapshot && (
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>{locale === "fr" ? "Identifiant Session" : "Session ID"}:</span>
                <span className="text-foreground font-semibold">{snapshot.sessionId}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>{locale === "fr" ? "Entreprise Cible" : "Target Company"}:</span>
                <span className="text-indigo-500 font-semibold">{snapshot.targetCompany}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>{locale === "fr" ? "Temps sur le site" : "Time on Site"}:</span>
                <span className="text-foreground">{snapshot.sessionDuration}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>{locale === "fr" ? "Actions enregistrées" : "Actions Recorded"}:</span>
                <span className="text-emerald-500 font-semibold">{snapshot.totalActionsRecorded}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>{locale === "fr" ? "Défilement de page" : "Scroll Depth"}:</span>
                <span className="text-foreground">{snapshot.scrollDepth}</span>
              </div>

              {/* Compliance Note */}
              <div className="p-2 rounded-lg bg-muted/60 border border-border/50 text-[10px] text-muted-foreground flex items-center gap-1.5 mt-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>
                  {locale === "fr"
                    ? "Respect de la vie privée : aucun cookie traceur, aucun stockage d'IP personnelle."
                    : "Zero tracking cookies, no personal IP storage. 100% GDPR compliant."}
                </span>
              </div>

              {/* Generator Tool for Job Applications */}
              <div className="pt-2.5 mt-2.5 border-t border-border/60">
                <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5 flex items-center gap-1">
                  <Terminal className="h-3 w-3 text-indigo-400" />
                  <span>{locale === "fr" ? "Générateur de Lien Candidature" : "Application Link Generator"}</span>
                </div>
                <form onSubmit={handleGenerate} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder={locale === "fr" ? "Nom de l'entreprise (ex: Mistral)" : "Company name (e.g. Criteo)"}
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-indigo-500 text-foreground"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    {locale === "fr" ? "Générer" : "Generate"}
                  </button>
                </form>

                {generatedLink && (
                  <div className="mt-2 p-2 rounded-lg bg-background border border-border flex items-center justify-between gap-1.5">
                    <span className="text-[10px] truncate select-all text-muted-foreground">
                      {generatedLink}
                    </span>
                    <button
                      onClick={handleCopyLink}
                      className="p-1 rounded bg-muted hover:bg-muted/80 text-foreground shrink-0 cursor-pointer"
                      title="Copy URL"
                    >
                      {copiedLink ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
