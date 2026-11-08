import React, { useState } from 'react';
import { Sparkles, Cpu, Database, ShieldAlert, CheckCircle, Copy, Check, Download, Layers, ArrowRight } from 'lucide-react';

export const SpecStudio: React.FC = () => {
  const [challenge, setChallenge] = useState('Missing Middle Zoning & Infill Permitting');
  const [region, setRegion] = useState('Sun Belt Metros (Austin, Atlanta, Phoenix, Dallas)');
  const [targetAudience, setTargetAudience] = useState('City Planning Staff & Local Non-Profit Builders');
  const [coreApproach, setCoreApproach] = useState('Spatial Computer Vision & Automated Municipal Code RAG');
  const [userPrompt, setUserPrompt] = useState('Focus on accelerating small-scale builder approvals and eliminating discretionary NIMBY delays.');
  const [isLoading, setIsLoading] = useState(false);
  const [specResult, setSpecResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const generateSpec = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini/generate-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challenge,
          region,
          targetAudience,
          coreApproach,
          userPrompt
        })
      });
      const data = await response.json();
      setSpecResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyAsMarkdown = () => {
    if (!specResult) return;
    const md = `# ${specResult.title}\n> ${specResult.tagline}\n\n## Problem Statement\n${specResult.problemStatement}\n\n## Executive Summary\n${specResult.executiveSummary}\n\n## AI System Architecture\n- Core Models: ${specResult.aiSystemArchitecture?.coreModels}\n\n### Data Pipelines\n${specResult.aiSystemArchitecture?.dataPipelines?.map((d: string) => `- ${d}`).join('\n')}\n\n### Agent Workflow\n${specResult.aiSystemArchitecture?.agentWorkflow?.map((s: string) => `- ${s}`).join('\n')}\n\n## Regulatory & Policy Feasibility\n- Enabling Legislation: ${specResult.regulatoryAnalysis?.enablingLegislation}\n- Potential Blockers: ${specResult.regulatoryAnalysis?.potentialBlockers}\n- Mitigation Strategy: ${specResult.regulatoryAnalysis?.mitigationStrategy}\n\n## Implementation Roadmap\n${specResult.implementationRoadmap?.map((r: any) => `- **${r.phase}**: ${r.goal}`).join('\n')}\n\n## Target Impact KPIs\n${specResult.kpis?.map((k: string) => `- ${k}`).join('\n')}`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Gemini 3.8 Flash Spec Engine
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            AI Housing Prototype Spec Studio
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Generate an engineering, policy, and data architecture blueprint for any custom regional housing crisis challenge.
          </p>
        </div>

        {specResult && (
          <button
            onClick={copyAsMarkdown}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/40 hover:bg-purple-600/30 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Markdown' : 'Export Spec (Markdown)'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters */}
        <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-semibold">Core Housing Challenge Focus</label>
            <select
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            >
              <option value="Missing Middle Zoning & Infill Permitting">Missing Middle Zoning & Infill Permitting</option>
              <option value="Affordable Housing Subsidy Stacking (LIHTC / HUD)">Affordable Housing Subsidy Stacking (LIHTC / HUD)</option>
              <option value="Tenant Eviction Defense & Rent Stabilization Compliance">Tenant Eviction Defense & Rent Stabilization Compliance</option>
              <option value="Commercial Office to Residential Adaptive Reuse">Commercial Office to Residential Adaptive Reuse</option>
              <option value="Property Insurance Crisis & Climate Hardening">Property Insurance Crisis & Climate Hardening</option>
              <option value="Community Land Trust (CLT) & Co-op Workforce Housing">Community Land Trust (CLT) & Co-op Workforce Housing</option>
              <option value="Appraisal Gap & Rust Belt Vacant Lot Activation">Appraisal Gap & Rust Belt Vacant Lot Activation</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-semibold">Target U.S. Regional Market</label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              placeholder="e.g. Florida Gulf Coast, California Bay Area, Rust Belt Land Banks"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-semibold">Primary Stakeholder / User</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              placeholder="e.g. Non-profit CDCs, Renters, Municipal Planners"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-semibold">Technical Architecture Approach</label>
            <input
              type="text"
              value={coreApproach}
              onChange={(e) => setCoreApproach(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              placeholder="e.g. Spatial Constraint Solver + RAG over Municode"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-semibold">Specific Directives / Constraints</label>
            <textarea
              rows={3}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 resize-none"
              placeholder="Any additional goals or civic constraints..."
            />
          </div>

          <button
            onClick={generateSpec}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Synthesizing Engineering Blueprint...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Prototype Blueprint
              </>
            )}
          </button>
        </div>

        {/* Blueprint Output */}
        <div className="lg:col-span-7 space-y-6">
          {!specResult && !isLoading ? (
            <div className="bg-slate-950/80 border border-slate-800 border-dashed rounded-xl p-14 text-center text-slate-400 space-y-3">
              <Cpu className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-slate-300">Spec Generator Ready</div>
              <p className="text-xs max-w-sm mx-auto">
                Customize parameters on the left and click &quot;Generate Prototype Blueprint&quot; to synthesize an end-to-end technical PRD, open data feeds, and civic roadmap.
              </p>
            </div>
          ) : isLoading ? (
            <div className="bg-slate-950 p-14 rounded-xl border border-slate-800 text-center space-y-4">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="text-sm text-slate-300 font-medium">Formulating AI model topology, regulatory audit, and municipal APIs...</div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  GENERATED PROTOTYPE SPECIFICATION
                </span>
                <h4 className="text-xl font-bold text-white pt-1">{specResult.title}</h4>
                <p className="text-xs text-purple-300 font-medium">{specResult.tagline}</p>
                <p className="text-xs text-slate-300 pt-2 leading-relaxed">{specResult.executiveSummary}</p>
              </div>

              {/* Problem Analysis */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Regional Root Cause & Friction
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">{specResult.problemStatement}</p>
              </div>

              {/* System Architecture */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  AI System Architecture & Data Feeds
                </h5>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Model Stack</div>
                  <div className="text-purple-300 font-mono mt-0.5">{specResult.aiSystemArchitecture?.coreModels}</div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400">Open Public Data Sources:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {specResult.aiSystemArchitecture?.dataPipelines?.map((feed: string, idx: number) => (
                      <div key={idx} className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
                        <Database className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">{feed}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400">Agentic Execution Pipeline:</div>
                  <div className="space-y-1 text-xs">
                    {specResult.aiSystemArchitecture?.agentWorkflow?.map((step: string, idx: number) => (
                      <div key={idx} className="bg-slate-900/60 p-2 rounded border border-slate-800/80 text-slate-300 font-mono text-[11px]">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Regulatory Analysis & Roadmap */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h6 className="text-[11px] font-bold uppercase text-slate-400">Enabling Legislation</h6>
                  <p className="text-xs text-slate-300 leading-relaxed">{specResult.regulatoryAnalysis?.enablingLegislation}</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h6 className="text-[11px] font-bold uppercase text-slate-400">Mitigation Strategy</h6>
                  <p className="text-xs text-slate-300 leading-relaxed">{specResult.regulatoryAnalysis?.mitigationStrategy}</p>
                </div>
              </div>

              {/* Target KPIs */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h6 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Target Quantitative Impact KPIs</h6>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  {specResult.kpis?.map((kpi: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 bg-emerald-950/20 p-2 rounded-lg border border-emerald-800/30 text-emerald-200">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
