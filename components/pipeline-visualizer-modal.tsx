"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { uiEn } from "@/data/en/ui";
import { uiFr } from "@/data/fr/ui";
import { pipelineNodesEn, pipelineBenchmarksEn } from "@/data/pipeline";
import { pipelineNodesFr, pipelineBenchmarksFr } from "@/data/fr/pipeline";
import { PipelineNode } from "@/types";
import {
  X,
  Database,
  Server,
  Cpu,
  TrendingUp,
  GitBranch,
  ArrowRight,
  Zap,
  Sparkles,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Coins,
  Activity,
} from "lucide-react";

export const openPipelineModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-pipeline-modal"));
  }
};

interface PipelineVisualizerModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  locale?: "en" | "fr";
}

export function PipelineVisualizerModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  locale = "en",
}: PipelineVisualizerModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [archMode, setArchMode] = useState<"scala" | "pyspark">("scala");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("scala-catalyst");

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
  };

  const currentUi = locale === "fr" ? uiFr : uiEn;
  const currentNodes = locale === "fr" ? pipelineNodesFr : pipelineNodesEn;
  const currentBenchmarks = locale === "fr" ? pipelineBenchmarksFr : pipelineBenchmarksEn;

  useEffect(() => {
    const handleOpenEvent = () => setInternalIsOpen(true);
    window.addEventListener("open-pipeline-modal", handleOpenEvent);
    return () => window.removeEventListener("open-pipeline-modal", handleOpenEvent);
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

  const selectedNode =
    currentNodes.find((n) => n.id === selectedNodeId) || currentNodes[2];

  const iconMap: Record<string, React.ReactNode> = {
    Database: <Database className="h-4 w-4" />,
    Server: <Server className="h-4 w-4" />,
    Cpu: <Cpu className="h-4 w-4" />,
    TrendingUp: <TrendingUp className="h-4 w-4" />,
    GitBranch: <GitBranch className="h-4 w-4" />,
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pipeline-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-zinc-800 bg-[#0c1017] text-zinc-100 shadow-2xl p-5 sm:p-8 max-h-[92vh] overflow-y-auto scrollbar-thin z-10 animate-in zoom-in-95 duration-200 font-sans">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="h-3 w-3 text-indigo-400" />
              <span>{currentUi.pipelineVisualizer.modalBadge}</span>
            </div>
            <h2
              id="pipeline-modal-title"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
            >
              {currentUi.pipelineVisualizer.modalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {currentUi.pipelineVisualizer.modalSubtitle}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
            aria-label={currentUi.pipelineVisualizer.closeButton}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Switcher: PySpark Legacy vs Scala Catalyst */}
        <div className="my-5 p-3 sm:p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">
              {currentUi.pipelineVisualizer.architectureToggleLabel}
            </span>
            <div className="inline-flex p-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono">
              <button
                onClick={() => setArchMode("pyspark")}
                className={`px-3 py-1 rounded-md transition-all ${
                  archMode === "pyspark"
                    ? "bg-amber-600/30 text-amber-300 font-bold border border-amber-500/40"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {currentUi.pipelineVisualizer.pysparkMode}
              </button>
              <button
                onClick={() => setArchMode("scala")}
                className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                  archMode === "scala"
                    ? "bg-indigo-600 text-white font-bold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Zap className="h-3 w-3 fill-current text-emerald-400" />
                <span>{currentUi.pipelineVisualizer.scalaMode}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            {archMode === "scala" ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{currentUi.pipelineVisualizer.speedupBadge}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>{locale === "fr" ? "Goulot IPC Python-JVM" : "Python-JVM IPC Overhead"}</span>
              </span>
            )}
          </div>
        </div>

        {/* 5-Node Flow Diagram */}
        <div className="my-6">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-indigo-400" />
            <span>{currentUi.pipelineVisualizer.nodesFlowLabel}</span>
          </div>

          {/* Interactive Flow Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 relative">
            {currentNodes.map((node, idx) => {
              const isSelected = selectedNodeId === node.id;
              const isSpeedupCore = node.id === "scala-catalyst";

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`text-left p-3 rounded-xl border transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-950/40 shadow-glow-sm ring-1 ring-indigo-500/50"
                      : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-800 text-indigo-400">
                        {iconMap[node.icon] || <Cpu className="h-3.5 w-3.5" />}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      {node.category}
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5 leading-snug">
                      {node.title}
                    </div>
                  </div>

                  {isSpeedupCore && archMode === "scala" && (
                    <span className="mt-2 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-block text-center">
                      -35% Latency Core
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Node Deep-Dive Inspector */}
        <div className="my-6 p-4 sm:p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {iconMap[selectedNode.icon] || <Cpu className="h-5 w-5" />}
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  {selectedNode.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {selectedNode.title}
                </h3>
              </div>
            </div>

            <div className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
              {selectedNode.tech}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* Role & Specs */}
            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-zinc-400 block mb-1">
                  {currentUi.pipelineVisualizer.roleLabel}:
                </span>
                <p className="text-zinc-200 leading-relaxed font-sans text-xs">
                  {selectedNode.role}
                </p>
              </div>

              <div>
                <span className="text-[11px] text-zinc-400 block mb-1">
                  {currentUi.pipelineVisualizer.specifications}:
                </span>
                <p className="text-indigo-300 leading-relaxed bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/80 text-[11px]">
                  {selectedNode.specs}
                </p>
              </div>
            </div>

            {/* Architecture Comparison: PySpark vs Scala for this node */}
            <div className="space-y-3">
              {archMode === "pyspark" ? (
                <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/15">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1.5 text-xs">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span>{currentUi.pipelineVisualizer.bottleneckLabel}</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed font-sans text-xs">
                    {selectedNode.bottleneckPySpark}
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/15">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1.5 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{currentUi.pipelineVisualizer.optimizationLabel}</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed font-sans text-xs">
                    {selectedNode.optimizationScala}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Benchmark Results Matrix */}
        <div className="my-6">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>{currentUi.pipelineVisualizer.benchmarksTitle}</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/40">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-900/80 border-b border-zinc-800 text-[11px] text-zinc-400 uppercase">
                <tr>
                  <th className="py-2.5 px-4">{currentUi.pipelineVisualizer.metricLabel}</th>
                  <th className="py-2.5 px-4">{currentUi.pipelineVisualizer.pysparkCol}</th>
                  <th className="py-2.5 px-4">{currentUi.pipelineVisualizer.scalaCol}</th>
                  <th className="py-2.5 px-4">{currentUi.pipelineVisualizer.gainCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {currentBenchmarks.map((bm, bIdx) => (
                  <tr
                    key={bIdx}
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{bm.metric}</div>
                      <div className="text-[10px] text-zinc-400 font-sans mt-0.5">
                        {bm.detail}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-amber-400/90 whitespace-nowrap">
                      {bm.pysparkValue}
                    </td>
                    <td className="py-3 px-4 text-emerald-400 font-bold whitespace-nowrap">
                      {bm.scalaValue}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-bold text-[11px]">
                        <Zap className="h-3 w-3 fill-current" />
                        {bm.improvement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">
            Amadeus Production Engineering · Spark Catalyst & Scala
          </span>

          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            {currentUi.pipelineVisualizer.closeButton}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
