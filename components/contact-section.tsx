"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
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

export function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(profileData.phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
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
              <span>Direct Recruitment Channel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Let&apos;s Build Something Extraordinary
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">
              Actively targeting Mid/Senior Data Scientist, ML Engineer, and Big Data positions in France (Paris, Sophia Antipolis, Lyon, Hybrid, or EU Remote).
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
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-muted hover:bg-muted/80 text-foreground transition-colors"
                >
                  {emailCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-xs font-mono text-muted-foreground">Email Address</span>
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-base font-bold text-foreground hover:text-indigo-600 dark:hover:text-indigo-400 block mt-0.5 truncate"
                >
                  {profileData.email}
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
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-muted hover:bg-muted/80 text-foreground transition-colors"
                >
                  {phoneCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-xs font-mono text-muted-foreground">Direct Mobile (France)</span>
                <a
                  href={`tel:${profileData.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-base font-bold text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 block mt-0.5"
                >
                  {profileData.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Recruiter Assurance Bar */}
          <div className="p-4 rounded-xl border border-border/80 bg-muted/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-indigo-500 shrink-0" />
              <span>Based in France · Mobile for Paris</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Titre de séjour · Immediate Rights</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500 shrink-0" />
              <span>Response Time: &lt; 24 Hours</span>
            </div>
          </div>

          {/* Social Profiles & Direct CTA */}
          <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/aritra-mondal-66702021"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-border bg-card hover:bg-muted text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4 text-sky-500" />
                <span>LinkedIn Message</span>
              </a>

              <a
                href="https://github.com/aritra-mondal-ds"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-border bg-card hover:bg-muted text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repositories</span>
              </a>
            </div>

            <a
              href={`mailto:${profileData.email}?subject=Data%20Scientist%20Opportunity%20-%20Interview%20Inquiry`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="h-4 w-4" />
              <span>Schedule Initial Interview</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
