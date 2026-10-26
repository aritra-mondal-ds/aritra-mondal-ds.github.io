"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { profileDataFr } from "@/data/fr/profile";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
import {
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

interface ContactSectionProps {
  locale?: "en" | "fr";
}

export function ContactSection({ locale = "en" }: ContactSectionProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const currentProfile = locale === "fr" ? profileDataFr : profileData;
  const currentUi = locale === "fr" ? uiFr : uiEn;

  const copyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentProfile.email);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      }
    } catch {
      // Fallback gracefully without unhandled console rejection
    }
  };

  const copyPhone = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentProfile.phone);
        setPhoneCopied(true);
        setTimeout(() => setPhoneCopied(false), 2000);
      }
    } catch {
      // Fallback gracefully without unhandled console rejection
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-gradient-to-b from-card to-muted/30 p-8 sm:p-12 shadow-lg relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-medium mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{currentUi.contact.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {currentUi.contact.title}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">
              {currentUi.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {/* Direct Email Card */}
            <div className="p-5 rounded-2xl border border-border bg-card/80 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Mail className="h-5 w-5" />
                </div>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border border-border bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {emailCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{currentUi.terminal.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{currentUi.contact.copyEmail}</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-xs font-mono text-muted-foreground uppercase">
                  {currentUi.contact.emailLabel}
                </span>
                <a
                  href={`mailto:${currentProfile.email}`}
                  className="block text-base sm:text-lg font-bold text-foreground hover:text-indigo-500 transition-colors mt-0.5 truncate"
                >
                  {currentProfile.email}
                </a>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div className="p-5 rounded-2xl border border-border bg-card/80 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Phone className="h-5 w-5" />
                </div>
                <button
                  onClick={copyPhone}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border border-border bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {phoneCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{currentUi.terminal.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{currentUi.contact.copyPhone}</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-xs font-mono text-muted-foreground uppercase">
                  {currentUi.contact.phoneLabel}
                </span>
                <a
                  href={`tel:${currentProfile.phone.replace(/[^0-9+]/g, "")}`}
                  className="block text-base sm:text-lg font-bold text-foreground hover:text-indigo-500 transition-colors mt-0.5"
                >
                  {currentProfile.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Signal Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 pt-6 border-t border-border/60 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card/60 border border-border/60">
              <MapPin className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>{currentUi.contact.basedLabel}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card/60 border border-border/60">
              <ShieldCheck className="h-4 w-4 text-indigo-500 shrink-0" />
              <span>{currentUi.contact.rightsLabel}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card/60 border border-border/60">
              <Clock className="h-4 w-4 text-sky-500 shrink-0" />
              <span>{currentUi.contact.responseLabel}</span>
            </div>
          </div>

          {/* Direct Contact CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-border/60">
            <a
              href={`mailto:${currentProfile.email}?subject=Entretien%20Data%20Scientist%20-%20Aritra%20Mondal`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="h-4 w-4" />
              <span>
                {locale === "fr" ? "Envoyer un e-mail à Aritra" : "Send an Email to Aritra"}
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/aritra-mondal-66702021"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-card hover:bg-muted text-foreground border border-border transition-colors shadow-sm"
            >
              <Linkedin className="h-4 w-4 text-sky-500" />
              <span>{currentUi.contact.linkedinLabel}</span>
            </a>

            <a
              href="https://github.com/aritra-mondal-ds"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-card hover:bg-muted text-foreground border border-border transition-colors shadow-sm"
            >
              <Github className="h-4 w-4" />
              <span>{currentUi.contact.githubLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
