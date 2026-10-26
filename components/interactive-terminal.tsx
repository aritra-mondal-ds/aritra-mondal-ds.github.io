"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { profileDataFr } from "@/data/fr/profile";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
import { Terminal, Copy, Check, Sparkles, Play } from "lucide-react";

interface InteractiveTerminalProps {
  locale?: "en" | "fr";
}

export function InteractiveTerminal({ locale = "en" }: InteractiveTerminalProps) {
  const [activeCommand, setActiveCommand] = useState<string>("curl -s /profile | jq .");
  const [copied, setCopied] = useState(false);

  const currentProfile = locale === "fr" ? profileDataFr : profileData;
  const currentUi = locale === "fr" ? uiFr : uiEn;

  const commandResponsesEn: Record<string, object> = {
    "curl -s /profile | jq .": {
      candidate: currentProfile.name,
      role: "Entry-level / Junior-Mid Data Scientist & ML Systems Engineer",
      education: "Applied MSc in DS & AI (Bac+5 / Summa Cum Laude)",
      work_model: "Hybrid (On-site & Remote) & 100% Remote autonomous execution proven",
      location: currentProfile.location,
      work_authorization: "Authorized to work in France (Titre de séjour / EU Open)",
      experience_highlight: "Amadeus Production ML & Big Data Pipelines (Spark/Scala/AWS)",
      contact: {
        email: currentProfile.email,
        phone: currentProfile.phone,
        linkedin: "linkedin.com/in/aritra-mondal-66702021",
        github: "github.com/aritra-mondal-ds",
      },
      status: "Actively interviewing in Paris & France",
    },
    "cat production-metrics.json": {
      amadeus_etl_speedup: "35% reduction in latency via PySpark → Scala rewrite",
      data_throughput: "Multi-GB daily Parquet event stream on AWS S3 & EMR",
      time_series_features: "73+ engineered alpha features with walk-forward CV",
      security_telemetry: "20% false positive reduction on SNORT IDS traffic analysis",
      msc_academic_ranking: "First Class / Summa Cum Laude (Félicitations du Jury)",
    },
    "cat stack.json": {
      ml_frameworks: ["Scikit-learn", "XGBoost", "PyTorch", "Transformers", "MLflow"],
      distributed_data: ["Apache Spark", "PySpark", "Scala", "Parquet", "DuckDB", "SQL"],
      cloud_and_infra: ["AWS EMR", "AWS S3", "Docker", "Jenkins CI/CD", "Linux/Bash"],
      databases: ["Neo4j (Certified)", "PostgreSQL", "DuckDB"],
      systems: ["SNORT IDS", "Network Protocols (TCP/UDP/ICMP)", "Java/Kotlin"],
    },
    "contact --fast": {
      email: currentProfile.email,
      phone: currentProfile.phone,
      availability: "IMMEDIATE (0-day notice / Aucun préavis)",
      target_contract: "CDI (Statut Cadre)",
      location: "Paris & France (Relocation ready / Hybrid 2-3 days or full onsite)",
      work_authorization: "Titre de séjour (Full legal work authorization in France & EU)",
      recruiter_sheet: "Click [Fast-Track ⚡] in the top navigation to view full executive synthesis",
    },
  };

  const commandResponsesFr: Record<string, object> = {
    "curl -s /profile | jq .": {
      candidat: currentProfile.name,
      poste: "Data Scientist & Ingénieur Systèmes ML (Junior – Confirmé)",
      formation: "Applied MSc en Data Science & IA (Bac+5 / Summa Cum Laude)",
      mode_de_travail: "Expérience Hybride (Amadeus) & 100% Télétravail autonome prouvé (Jungleworks)",
      localisation: currentProfile.location,
      droit_de_travail: "Autorisé à travailler en France (Titre de séjour / Plein droit UE)",
      realisation_phare: "Pipelines ML & Big Data en Production chez Amadeus (Spark/Scala/AWS)",
      contact: {
        email: currentProfile.email,
        telephone: currentProfile.phone,
        linkedin: "linkedin.com/in/aritra-mondal-66702021",
        github: "github.com/aritra-mondal-ds",
      },
      statut: "En recherche active de postes à Paris et en France",
    },
    "cat production-metrics.json": {
      acceleration_etl_amadeus: "Réduction de 35% de la latence par réécriture PySpark → Scala",
      debit_de_donnees: "Flux d'événements Parquet multi-Go quotidiens sur AWS S3 & EMR",
      features_series_temporelles: "73+ caractéristiques alpha développées avec validation walk-forward",
      telemetrie_securite: "Réduction de 20% des faux positifs sur analyse de trafic IDS SNORT",
      classement_academique_msc: "Mention Très Bien / Summa Cum Laude (Félicitations du Jury)",
    },
    "cat stack.json": {
      frameworks_ml: ["Scikit-learn", "XGBoost", "PyTorch", "Transformers", "MLflow"],
      big_data_distribue: ["Apache Spark", "PySpark", "Scala", "Parquet", "DuckDB", "SQL"],
      cloud_et_infra: ["AWS EMR", "AWS S3", "Docker", "Jenkins CI/CD", "Linux/Bash"],
      bases_de_donnees: ["Neo4j (Certifié)", "PostgreSQL", "DuckDB"],
      systemes: ["SNORT IDS", "Protocoles Réseau (TCP/UDP/ICMP)", "Java/Kotlin"],
    },
    "contact --fast": {
      email: currentProfile.email,
      telephone: currentProfile.phone,
      disponibilite: "IMMÉDIATE (0 jour de préavis / Aucun préavis)",
      contrat_cible: "CDI (Statut Cadre)",
      mobilite: "Paris & France (Déménagement autonome prêt / Hybride ou Présentiel)",
      droit_au_travail: "Titre de séjour valide (Plein droit au travail en France & UE)",
      fiche_recruteur: "Cliquez sur [Fiche Recruteur ⚡] dans la barre de navigation pour la synthèse complète",
    },
  };

  const commandResponses = locale === "fr" ? commandResponsesFr : commandResponsesEn;
  const currentOutput = commandResponses[activeCommand] || commandResponses["curl -s /profile | jq ."];

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(JSON.stringify(currentOutput, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback gracefully without unhandled console rejection
    }
  };

  const commands = [
    "curl -s /profile | jq .",
    "cat production-metrics.json",
    "cat stack.json",
    "contact --fast",
  ];

  return (
    <section id="terminal" className="py-20 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-500 mb-2">
            <Terminal className="h-3.5 w-3.5" />
            <span>{currentUi.terminal.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {currentUi.terminal.title}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            {currentUi.terminal.subtitle}
          </p>
        </div>

        {/* Terminal Shell Window */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-zinc-400 font-mono ml-2">
                aritra@production-node: ~
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{currentUi.terminal.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>{currentUi.terminal.copyJson}</span>
                </>
              )}
            </button>
          </div>

          {/* Command Buttons Strip */}
          <div className="p-3 bg-zinc-900/50 border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-xs text-zinc-500 pl-1">{currentUi.terminal.runLabel}</span>
            {commands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => setActiveCommand(cmd)}
                className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeCommand === cmd
                    ? "bg-indigo-600 text-white font-semibold"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                <Play className="h-2.5 w-2.5 fill-current" />
                <span>{cmd}</span>
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div className="p-5 overflow-x-auto max-h-[380px] leading-relaxed text-zinc-300 scrollbar-thin">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <span className="text-emerald-400">$</span>
              <span>{activeCommand}</span>
            </div>
            <pre className="text-zinc-200">
              {JSON.stringify(currentOutput, null, 2)}
            </pre>
          </div>

          {/* Terminal Footer */}
          <div className="px-4 py-2.5 bg-zinc-900/80 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>{currentUi.terminal.sessionLabel}</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
