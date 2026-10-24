"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { Terminal, Copy, Check, Sparkles, Play } from "lucide-react";

export function InteractiveTerminal() {
  const [activeCommand, setActiveCommand] = useState<string>("curl -s /profile | jq .");
  const [copied, setCopied] = useState(false);

  const commandResponses: Record<string, object> = {
    "curl -s /profile | jq .": {
      candidate: profileData.name,
      role: "Data Scientist & ML Systems Engineer",
      education: "Applied MSc in DS & AI (Bac+5 / Summa Cum Laude)",
      location: profileData.location,
      work_authorization: "Authorized to work in France (Titre de séjour / EU Open)",
      experience_highlight: "Amadeus Production ML & Big Data Pipelines (Spark/Scala/AWS)",
      contact: {
        email: profileData.email,
        phone: profileData.phone,
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
      email: profileData.email,
      phone: profileData.phone,
      paris_availability: "Available for on-site & hybrid interviews in Paris & France",
      calendly_or_chat: "Open to immediate recruiter phone screens & technical discussions",
    },
  };

  const currentOutput = commandResponses[activeCommand] || commandResponses["curl -s /profile | jq ."];

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentOutput, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-20 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-500 mb-2">
            <Terminal className="h-3.5 w-3.5" />
            <span>Developer Interface</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Interactive Recruiter Terminal
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Inspect raw candidate metadata and production metrics via high-speed CLI queries.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="max-w-3xl mx-auto rounded-2xl border border-zinc-800 bg-[#0d1117] text-zinc-100 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
          {/* Terminal Title Bar */}
          <div className="px-4 py-3 bg-[#161b22] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs text-zinc-400">aritra@production-node: ~</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors"
              title="Copy JSON to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Command Pills */}
          <div className="px-4 py-2.5 bg-[#12161f] border-b border-zinc-800/80 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-zinc-400">Run:</span>
            {Object.keys(commandResponses).map((cmd) => (
              <button
                key={cmd}
                onClick={() => setActiveCommand(cmd)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  activeCommand === cmd
                    ? "bg-indigo-600 text-white font-medium shadow-sm"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Command Prompt & Output */}
          <div className="p-5 overflow-x-auto max-h-[420px] scrollbar-thin">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-3">
              <span>visitor@paris-headhunter:~$</span>
              <span className="text-zinc-100">{activeCommand}</span>
            </div>

            <pre className="text-zinc-300 leading-relaxed font-mono whitespace-pre text-xs sm:text-sm">
              <code>{JSON.stringify(currentOutput, null, 2)}</code>
            </pre>

            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center gap-2 text-zinc-400 text-[11px]">
              <span className="w-2 h-3.5 bg-emerald-400 animate-pulse inline-block" />
              <span>Session: 200 OK · Latency: 12ms · Target: Paris / France Scale-Ups</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
