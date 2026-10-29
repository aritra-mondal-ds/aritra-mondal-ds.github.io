"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { openRecruiterModal } from "./recruiter-fast-track-modal";
import { openPipelineModal } from "./pipeline-visualizer-modal";
import { profileData } from "@/data/profile";
import { profileDataFr } from "@/data/fr/profile";
import {
  Search,
  Command,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Briefcase,
  GraduationCap,
  Terminal,
  Mail,
  Phone,
  FileDown,
  Moon,
  Sun,
  Globe,
  ExternalLink,
  Copy,
  Check,
  X,
  Rocket,
  Shield,
  Activity,
  CornerDownLeft,
} from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

export const openCommandPalette = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  }
};

interface CommandItem {
  id: string;
  category: "Navigation" | "Interactive Demos" | "Featured Projects" | "Quick Actions" | "Theme & Language";
  categoryFr: "Navigation" | "Démos Interactives" | "Projets Clés" | "Actions Rapides" | "Thème & Langue";
  title: string;
  titleFr: string;
  subtitle: string;
  subtitleFr: string;
  icon: React.ReactNode;
  keywords: string[];
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  locale?: "en" | "fr";
}

export function CommandPalette({ locale = "en" }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const currentProfile = locale === "fr" ? profileDataFr : profileData;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when palette is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Global Keyboard Listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedText(label);
        setTimeout(() => {
          setCopiedText(null);
          setIsOpen(false);
        }, 1200);
      }
    } catch {
      // Graceful fallback
    }
  };

  const navigateTo = (hash: string) => {
    setIsOpen(false);
    const target = locale === "fr" ? `/fr${hash}` : `/${hash}`;
    if (window.location.pathname.startsWith("/fr") && locale === "fr") {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (!window.location.pathname.startsWith("/fr") && locale === "en") {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(target);
    }
  };

  const commandItems: CommandItem[] = useMemo(
    () => [
      // ─── Interactive Demos & Tools ───
      {
        id: "recruiter-sheet",
        category: "Interactive Demos",
        categoryFr: "Démos Interactives",
        title: "Fast-Track Recruiter Sheet (1-Min Read)",
        titleFr: "Fiche Express Recruteur (Lecture 1 min)",
        subtitle: "Contract terms, salary expectations, CDI availability & 1-click ATS summary",
        subtitleFr: "Conditions CDI, rémunération, disponibilité 0 jour et pitch Slack/ATS",
        icon: <Zap className="h-4 w-4 text-emerald-500" />,
        keywords: ["recruiter", "fiche", "hr", "ats", "salary", "contract", "cdi", "hire", "fast track"],
        action: () => {
          setIsOpen(false);
          openRecruiterModal();
        },
        shortcut: "⚡",
      },
      {
        id: "pipeline-modal",
        category: "Interactive Demos",
        categoryFr: "Démos Interactives",
        title: "Interactive Spark/Scala Pipeline Visualizer",
        titleFr: "Visualiseur d'Architecture Spark & Scala",
        subtitle: "Inspect AWS EMR data flow, Catalyst optimizations & 35% speedup",
        subtitleFr: "Inspection interactive du cluster AWS EMR, Catalyst et gain de 35%",
        icon: <Layers className="h-4 w-4 text-indigo-500" />,
        keywords: ["pipeline", "spark", "scala", "architecture", "visualizer", "amadeus", "emr", "aws"],
        action: () => {
          setIsOpen(false);
          openPipelineModal();
        },
        shortcut: "⌘P",
      },
      {
        id: "terminal-cli",
        category: "Interactive Demos",
        categoryFr: "Démos Interactives",
        title: "Interactive Developer Terminal",
        titleFr: "Terminal Développeur Interactif",
        subtitle: "Query production metrics via CLI (`curl -s /profile | jq .`)",
        subtitleFr: "Interroger les métadonnées et métriques via CLI",
        icon: <Terminal className="h-4 w-4 text-amber-500" />,
        keywords: ["terminal", "cli", "curl", "bash", "shell", "jq", "query"],
        action: () => navigateTo("#terminal"),
      },

      // ─── Navigation ───
      {
        id: "nav-projects",
        category: "Navigation",
        categoryFr: "Navigation",
        title: "Go to Featured Projects",
        titleFr: "Accéder aux Projets en Production",
        subtitle: "Production ML, Time-Series Forecasting & Graph AI",
        subtitleFr: "Systèmes ML en production, séries temporelles et IA graphe",
        icon: <Rocket className="h-4 w-4 text-indigo-500" />,
        keywords: ["projects", "projets", "work", "portfolio", "code"],
        action: () => navigateTo("#projects"),
      },
      {
        id: "nav-skills",
        category: "Navigation",
        categoryFr: "Navigation",
        title: "Go to Skills & Architecture",
        titleFr: "Accéder aux Compétences & Stack",
        subtitle: "Spark, Scala, Python, AWS EMR, Neo4j, Docker, CI/CD",
        subtitleFr: "Compétences clés, certifications vérifiées et mobilité",
        icon: <Layers className="h-4 w-4 text-cyan-500" />,
        keywords: ["skills", "stack", "tools", "competences", "certifications"],
        action: () => navigateTo("#skills"),
      },
      {
        id: "nav-experience",
        category: "Navigation",
        categoryFr: "Navigation",
        title: "Go to Work Experience",
        titleFr: "Accéder à l'Expérience Professionnelle",
        subtitle: "Amadeus (Production ML & Big Data) & Jungleworks",
        subtitleFr: "Amadeus (ML & Big Data en Production) et Jungleworks",
        icon: <Briefcase className="h-4 w-4 text-violet-500" />,
        keywords: ["experience", "amadeus", "jungleworks", "work", "career", "parcours"],
        action: () => navigateTo("#experience"),
      },
      {
        id: "nav-education",
        category: "Navigation",
        categoryFr: "Navigation",
        title: "Go to Education & Qualifications",
        titleFr: "Accéder à la Formation & Diplômes",
        subtitle: "MSc Bac+5 (DSTI, Summa Cum Laude) + BSc (Hons) + MDIS Diplomas",
        subtitleFr: "MSc Bac+5 (DSTI Félicitations du Jury) + BSc + Diplômes MDIS",
        icon: <GraduationCap className="h-4 w-4 text-sky-500" />,
        keywords: ["education", "degrees", "formation", "dsti", "bac+5", "northumbria", "mdis"],
        action: () => navigateTo("#education"),
      },
      {
        id: "nav-contact",
        category: "Navigation",
        categoryFr: "Navigation",
        title: "Go to Contact & Direct Recruitment",
        titleFr: "Accéder au Contact & Recrutement Direct",
        subtitle: "Direct email, phone, LinkedIn & scheduling",
        subtitleFr: "E-mail direct, téléphone France, LinkedIn et prise de rendez-vous",
        icon: <Mail className="h-4 w-4 text-pink-500" />,
        keywords: ["contact", "hire", "recruter", "email", "phone", "entretien"],
        action: () => navigateTo("#contact"),
      },

      // ─── Featured Projects Direct Links ───
      {
        id: "project-airline",
        category: "Featured Projects",
        categoryFr: "Projets Clés",
        title: "Airline Demand Forecasting & Distributed ML (Amadeus)",
        titleFr: "Prévision de Demande Aérienne & ML Distribué (Amadeus)",
        subtitle: "AWS EMR, Spark/Scala migration, 35% speedup, Multi-GB Parquet",
        subtitleFr: "Clusters AWS EMR, migration Spark/Scala (+35% speedup), Parquet",
        icon: <Activity className="h-4 w-4 text-indigo-400" />,
        keywords: ["airline", "amadeus", "demand", "forecasting", "flight", "scala", "spark"],
        action: () => navigateTo("#projects"),
      },
      {
        id: "project-financial",
        category: "Featured Projects",
        categoryFr: "Projets Clés",
        title: "Multi-Asset Financial Time-Series Engine",
        titleFr: "Moteur Multi-Actifs de Séries Temporelles",
        subtitle: "73+ engineered alpha features, Purged walk-forward validation",
        subtitleFr: "73+ features alpha développées, validation purged walk-forward",
        icon: <Sparkles className="h-4 w-4 text-amber-400" />,
        keywords: ["finance", "time series", "series temporelles", "lstm", "xgboost", "trading"],
        action: () => navigateTo("#projects"),
      },
      {
        id: "project-recsys",
        category: "Featured Projects",
        categoryFr: "Projets Clés",
        title: "Recommendation & Ranking Engine",
        titleFr: "Moteur de Recommandation & Scoring Prédictif",
        subtitle: "Sparse interaction graphs, Optuna Bayesian tuning & SHAP explainability",
        subtitleFr: "Graphes d'interaction creux, tuning bayésien Optuna & explicabilité SHAP",
        icon: <Layers className="h-4 w-4 text-cyan-400" />,
        keywords: ["recsys", "recommendation", "ranking", "lightgbm", "shap", "optuna", "scoring"],
        action: () => navigateTo("#projects"),
      },
      {
        id: "project-ids",
        category: "Featured Projects",
        categoryFr: "Projets Clés",
        title: "Network Telemetry & SNORT IDS Alert Optimization",
        titleFr: "Télémétrie Réseau & Optimisation IDS SNORT",
        subtitle: "20% reduction in false positive alerts via heuristic rule tuning",
        subtitleFr: "Réduction de 20% des fausses alertes par règles heuristiques",
        icon: <Shield className="h-4 w-4 text-emerald-400" />,
        keywords: ["snort", "ids", "security", "network", "cybersecurity", "tcp", "udp"],
        action: () => navigateTo("#projects"),
      },

      // ─── Quick Actions & Communication ───
      {
        id: "action-download-cv",
        category: "Quick Actions",
        categoryFr: "Actions Rapides",
        title: "Download Full CV (PDF)",
        titleFr: "Télécharger le CV Complet (PDF)",
        subtitle: "Aritra_Mondal_Data_Scientist_CV_EN.pdf (A4 Executive 1-Page)",
        subtitleFr: "Aritra_Mondal_Data_Scientist_CV_FR.pdf (Format A4 Synthétique 1-Page)",
        icon: <FileDown className="h-4 w-4 text-indigo-500" />,
        keywords: ["cv", "resume", "pdf", "download", "telecharger"],
        action: () => {
          setIsOpen(false);
          const link = document.createElement("a");
          link.href = locale === "fr" ? "/cv-fr.pdf" : "/cv.pdf";
          link.download = locale === "fr" ? "Aritra_Mondal_Data_Scientist_CV_FR.pdf" : "Aritra_Mondal_Data_Scientist_CV_EN.pdf";
          link.click();
        },
        shortcut: "CV",
      },
      {
        id: "action-copy-email",
        category: "Quick Actions",
        categoryFr: "Actions Rapides",
        title: `Copy Email (${currentProfile.email})`,
        titleFr: `Copier l'e-mail (${currentProfile.email})`,
        subtitle: "Direct primary recruitment channel (< 24h response time)",
        subtitleFr: "Canal direct prioritaire (réponse garantie sous 24h)",
        icon: copiedText === "email" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-indigo-400" />,
        keywords: ["email", "copy", "copier", "mail", "contact"],
        action: () => copyToClipboard(currentProfile.email, "email"),
      },
      {
        id: "action-copy-phone",
        category: "Quick Actions",
        categoryFr: "Actions Rapides",
        title: `Copy Phone (${currentProfile.phone})`,
        titleFr: `Copier le téléphone (${currentProfile.phone})`,
        subtitle: "Direct French mobile line for recruiter phone screens",
        subtitleFr: "Ligne directe mobile France pour préqualifications téléphoniques",
        icon: copiedText === "phone" ? <Check className="h-4 w-4 text-emerald-500" /> : <Phone className="h-4 w-4 text-emerald-400" />,
        keywords: ["phone", "telephone", "call", "mobile", "copy"],
        action: () => copyToClipboard(currentProfile.phone, "phone"),
      },
      {
        id: "action-linkedin",
        category: "Quick Actions",
        categoryFr: "Actions Rapides",
        title: "Open LinkedIn Profile",
        titleFr: "Ouvrir le Profil LinkedIn",
        subtitle: "linkedin.com/in/aritra-mondal-66702021",
        subtitleFr: "Profil professionnel vérifié et recommandations",
        icon: <Linkedin className="h-4 w-4 text-sky-500" />,
        keywords: ["linkedin", "social", "profile"],
        action: () => {
          setIsOpen(false);
          window.open("https://www.linkedin.com/in/aritra-mondal-66702021", "_blank");
        },
      },
      {
        id: "action-github",
        category: "Quick Actions",
        categoryFr: "Actions Rapides",
        title: "Open GitHub Profile",
        titleFr: "Ouvrir le Profil GitHub",
        subtitle: "github.com/aritra-mondal-ds",
        subtitleFr: "Dépôts open-source, pipelines et architectures de code",
        icon: <Github className="h-4 w-4 text-muted-foreground" />,
        keywords: ["github", "git", "code", "repos"],
        action: () => {
          setIsOpen(false);
          window.open("https://github.com/aritra-mondal-ds", "_blank");
        },
      },

      // ─── Theme & Language ───
      {
        id: "toggle-language",
        category: "Theme & Language",
        categoryFr: "Thème & Langue",
        title: locale === "fr" ? "Switch to English Version" : "Passer en Français",
        titleFr: locale === "fr" ? "Switch to English Version" : "Passer en Français",
        subtitle: locale === "fr" ? "Read English version of portfolio" : "Consulter la version française avec signaux recruteurs",
        subtitleFr: locale === "fr" ? "Read English version of portfolio" : "Consulter la version française avec signaux recruteurs",
        icon: <Globe className="h-4 w-4 text-indigo-400" />,
        keywords: ["language", "langue", "french", "english", "traduire", "switch"],
        action: () => {
          setIsOpen(false);
          if (typeof window !== "undefined") {
            if (window.location.hash) {
              window.history.replaceState(null, "", window.location.pathname);
            }
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          }
          if (locale === "fr") {
            router.push("/");
          } else {
            router.push("/fr/");
          }
        },
        shortcut: locale === "fr" ? "EN" : "FR",
      },
      {
        id: "toggle-theme",
        category: "Theme & Language",
        categoryFr: "Thème & Langue",
        title: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        titleFr: theme === "dark" ? "Activer le Mode Clair" : "Activer le Mode Sombre",
        subtitle: theme === "dark" ? "High-contrast clean light theme" : "Cinematic developer dark palette",
        subtitleFr: theme === "dark" ? "Thème clair épuré à fort contraste" : "Palette sombre cinématographique",
        icon: theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />,
        keywords: ["theme", "dark", "light", "sombre", "clair", "mode"],
        action: () => {
          setTheme(theme === "dark" ? "light" : "dark");
          setIsOpen(false);
        },
      },
    ],
    [locale, currentProfile, theme, setTheme, router]
  );

  // Filter commands by query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commandItems;
    const cleanQuery = query.toLowerCase().trim();

    return commandItems.filter((item) => {
      const matchTitle = (locale === "fr" ? item.titleFr : item.title).toLowerCase().includes(cleanQuery);
      const matchSub = (locale === "fr" ? item.subtitleFr : item.subtitle).toLowerCase().includes(cleanQuery);
      const matchCategory = (locale === "fr" ? item.categoryFr : item.category).toLowerCase().includes(cleanQuery);
      const matchKeywords = item.keywords.some((kw) => kw.toLowerCase().includes(cleanQuery));

      return matchTitle || matchSub || matchCategory || matchKeywords;
    });
  }, [query, commandItems, locale]);

  // Keep selectedIndex in bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation within the palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter" && filteredCommands.length > 0) {
      e.preventDefault();
      filteredCommands[selectedIndex]?.action();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={locale === "fr" ? "Palette de commandes globale" : "Global Command Palette"}
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Palette Modal */}
      <div
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0f141c] text-zinc-900 dark:text-zinc-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col my-4 z-10"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60">
          <Search className="h-5 w-5 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === "fr"
                ? "Tapez une commande ou recherchez (ex: projects, spark, amadeus, cv)..."
                : "Type a command or search (e.g. projects, spark, amadeus, cv)..."
            }
            className="flex-1 bg-transparent text-sm sm:text-base outline-none placeholder:text-muted-foreground font-sans text-zinc-900 dark:text-zinc-100"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-mono rounded bg-muted border border-border text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2 scrollbar-thin">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground font-mono">
              <Command className="h-8 w-8 mx-auto mb-3 opacity-40" />
              <p>{locale === "fr" ? "Aucune commande trouvée pour cette recherche." : "No matching commands found."}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {locale === "fr" ? "Essayez « projects », « spark », « cv » ou « contact »" : "Try searching 'projects', 'spark', 'cv', or 'contact'"}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredCommands.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const title = locale === "fr" ? item.titleFr : item.title;
                const subtitle = locale === "fr" ? item.subtitleFr : item.subtitle;
                const category = locale === "fr" ? item.categoryFr : item.category;

                return (
                  <div
                    key={item.id}
                    data-index={idx}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg border shrink-0 transition-colors ${
                          isSelected
                            ? "bg-white/10 border-white/20 text-white"
                            : "bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700/80 text-foreground"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs sm:text-sm truncate">
                            {title}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                              isSelected
                                ? "bg-white/15 text-white/90 border-white/20"
                                : "bg-zinc-100 dark:bg-zinc-800 text-muted-foreground border-zinc-200 dark:border-zinc-700"
                            }`}
                          >
                            {category}
                          </span>
                        </div>
                        <p
                          className={`text-xs truncate mt-0.5 ${
                            isSelected ? "text-white/80" : "text-muted-foreground"
                          }`}
                        >
                          {subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      {item.shortcut && (
                        <span
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                            isSelected
                              ? "bg-white/20 text-white border-white/30"
                              : "bg-muted text-muted-foreground border-border"
                          }`}
                        >
                          {item.shortcut}
                        </span>
                      )}
                      <CornerDownLeft
                        className={`h-3.5 w-3.5 transition-opacity ${
                          isSelected ? "opacity-100 text-white" : "opacity-0"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↓</kbd>
              <span>{locale === "fr" ? "Naviguer" : "Navigate"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↵</kbd>
              <span>{locale === "fr" ? "Sélectionner" : "Select"}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>{locale === "fr" ? "Scale-up Palette" : "Scale-up Palette"}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

