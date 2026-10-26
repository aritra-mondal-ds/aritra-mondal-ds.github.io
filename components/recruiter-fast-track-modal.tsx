"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { RecruiterFastTrack } from "@/types";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
import { recruiterFastTrackEn } from "@/data/profile";
import { recruiterFastTrackFr } from "@/data/fr/profile";
import {
  X,
  Zap,
  Briefcase,
  MapPin,
  ShieldCheck,
  Coins,
  Languages,
  Check,
  Copy,
  FileDown,
  Mail,
  Phone,
  Sparkles,
  Award,
} from "lucide-react";

export const openRecruiterModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-recruiter-modal"));
  }
};

interface RecruiterFastTrackModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  locale?: "en" | "fr";
}

export function RecruiterFastTrackModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  locale = "en",
}: RecruiterFastTrackModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
    if (typeof window !== "undefined" && window.location.hash === "#recruiter-sheet") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const currentUi = locale === "fr" ? uiFr : uiEn;
  const currentData: RecruiterFastTrack =
    locale === "fr" ? recruiterFastTrackFr : recruiterFastTrackEn;

  useEffect(() => {
    const handleOpenEvent = () => setInternalIsOpen(true);
    const handleHash = () => {
      if (window.location.hash === "#recruiter-sheet") {
        setInternalIsOpen(true);
      }
    };

    window.addEventListener("open-recruiter-modal", handleOpenEvent);
    window.addEventListener("hashchange", handleHash);
    handleHash();

    return () => {
      window.removeEventListener("open-recruiter-modal", handleOpenEvent);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleClose();
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  if (!isModalOpen || !mounted) return null;

  const handleCopySlackPitch = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentData.slackPitch);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruiter-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-zinc-800 bg-[#0d1117] text-zinc-100 shadow-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto scrollbar-thin z-10 animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{locale === "fr" ? "Disponibilité Immédiate · 0 Préavis" : "Immediate Availability · 0 Notice"}</span>
            </div>
            <h2
              id="recruiter-modal-title"
              className="text-2xl font-bold tracking-tight text-white"
            >
              {currentUi.recruiterFastTrack.modalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {currentUi.recruiterFastTrack.modalSubtitle}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
            aria-label={currentUi.recruiterFastTrack.close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 6 Essential French Hiring Criteria Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6 text-xs font-mono">
          {/* Availability */}
          <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 block mb-0.5">
                {currentUi.recruiterFastTrack.availabilityLabel}
              </span>
              <span className="font-semibold text-emerald-400 block">
                {currentData.availability}
              </span>
              <span className="text-[10px] text-zinc-500 mt-0.5 block">
                {currentData.noticePeriod}
              </span>
            </div>
          </div>

          {/* Contract Target */}
          <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 block mb-0.5">
                {currentUi.recruiterFastTrack.contractLabel}
              </span>
              <span className="font-semibold text-white block">
                {currentData.contractType}
              </span>
              <span className="text-[10px] text-zinc-500 mt-0.5 block">
                {currentData.targetRole}
              </span>
            </div>
          </div>

          {/* Location & Relocation */}
          <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 block mb-0.5">
                {currentUi.recruiterFastTrack.mobilityLabel}
              </span>
              <span className="font-semibold text-white block">
                {locale === "fr" ? "Paris & Île-de-France (Prêt)" : "Paris & France (Relocation Ready)"}
              </span>
              <span className="text-[10px] text-zinc-400 mt-0.5 block leading-relaxed">
                {currentData.locationDetails}
              </span>
            </div>
          </div>

          {/* Work Authorization */}
          <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 block mb-0.5">
                {currentUi.recruiterFastTrack.workRightsLabel}
              </span>
              <span className="font-semibold text-white block">
                {locale === "fr" ? "Titre de séjour / Plein droit" : "Work Authorized (Titre de séjour)"}
              </span>
              <span className="text-[10px] text-zinc-400 mt-0.5 block">
                {currentData.workAuthorization}
              </span>
            </div>
          </div>

          {/* Salary Expectation */}
          <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 shrink-0">
              <Coins className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 block mb-0.5">
                {currentUi.recruiterFastTrack.salaryLabel}
              </span>
              <span className="font-semibold text-white block">
                {locale === "fr" ? "50k€ - 62k€ (Selon package & séniorité)" : "€50k - €62k (Market Aligned)"}
              </span>
              <span className="text-[10px] text-zinc-500 mt-0.5 block">
                {currentData.salaryExpectation}
              </span>
            </div>
          </div>

          {/* Languages */}
          <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
              <Languages className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 block mb-0.5">
                {currentUi.recruiterFastTrack.languagesLabel}
              </span>
              <span className="font-semibold text-white block">
                {locale === "fr" ? "Anglais (C2) · Français (B1/B2)" : "English (C2) · French (B1/B2)"}
              </span>
              <span className="text-[10px] text-zinc-400 mt-0.5 block">
                {currentData.languages}
              </span>
            </div>
          </div>
        </div>

        {/* Why Hire Aritra (3 Key Highlights) */}
        <div className="my-6">
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-1.5 font-semibold">
            <Award className="h-4 w-4" />
            <span>{currentUi.recruiterFastTrack.highlightsLabel}</span>
          </div>

          <div className="space-y-3">
            {currentData.topHighlights.map((hl, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-xs"
              >
                <div className="font-semibold text-white flex items-center gap-2 mb-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-[11px] font-bold">
                    {idx + 1}
                  </span>
                  <span>{hl.title}</span>
                </div>
                <p className="text-zinc-400 leading-relaxed pl-7">
                  {hl.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 1-Click ATS / Slack Pitch Card */}
        <div className="my-6 p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/20">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-semibold text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>{currentUi.recruiterFastTrack.slackPitchLabel}</span>
            </span>

            <button
              onClick={handleCopySlackPitch}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-300" />
                  <span>{currentUi.recruiterFastTrack.pitchCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>{currentUi.recruiterFastTrack.copySlackPitch}</span>
                </>
              )}
            </button>
          </div>

          <pre className="text-[11px] leading-relaxed text-zinc-300 font-mono bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 overflow-x-auto whitespace-pre-wrap">
            {currentData.slackPitch}
          </pre>
        </div>

        {/* Bottom CTAs */}
        <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href="/cv.pdf"
              download="Aritra_Mondal_Data_Scientist_CV.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
            >
              <FileDown className="h-3.5 w-3.5 text-indigo-400" />
              <span>{currentUi.recruiterFastTrack.downloadCv}</span>
            </a>

            <a
              href="tel:+33749297966"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-zinc-700 hover:bg-zinc-800 text-zinc-200 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">+33 7 49 29 79 66</span>
            </a>
          </div>

          <a
            href="mailto:aritramondal100@gmail.com?subject=Data%20Scientist%20Opportunity%20-%20Interview%20Inquiry"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="h-4 w-4" />
            <span>{currentUi.recruiterFastTrack.scheduleCall}</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
