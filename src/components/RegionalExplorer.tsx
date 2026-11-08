import React, { useState } from 'react';
import { REGIONAL_CHALLENGES, RegionalChallenge } from '../data/regionalChallenges';
import { MapPin, TrendingUp, AlertTriangle, Lightbulb, Building, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface RegionalExplorerProps {
  onExplorePrototypeForRegion?: (regionId: string) => void;
}

export const RegionalExplorer: React.FC<RegionalExplorerProps> = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionalChallenge>(REGIONAL_CHALLENGES[0]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            Geographic Policy Diagnostics
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            U.S. Regional Housing Crisis Explorer
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Analyze why housing failures differ dramatically across American markets, from coastal supply shortages to Sun Belt insurance shocks and Rust Belt appraisal gaps.
          </p>
        </div>
      </div>

      {/* Region Selector Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
        {REGIONAL_CHALLENGES.map((reg) => (
          <button
            key={reg.id}
            onClick={() => setSelectedRegion(reg)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 border ${
              selectedRegion.id === reg.id
                ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/20'
                : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {reg.regionName}
          </button>
        ))}
      </div>

      {/* Region Details Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Diagnostics & Metrics */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold">
                {selectedRegion.statesCovered}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                Critical Severity
              </span>
            </div>

            <h4 className="text-xl font-bold text-white">
              {selectedRegion.coreCrisisType}
            </h4>

            {/* Core Drivers */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Primary Root Drivers:
              </div>
              <ul className="space-y-2">
                {selectedRegion.keyDrivers.map((driver, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5"></span>
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Median Home Price-to-Income Ratio</div>
              <div className="text-xl font-bold font-mono text-rose-400">
                {selectedRegion.medianHomePriceToIncome}
              </div>
              <div className="text-[10px] text-slate-500">Historical affordability benchmark is 3.0x</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Regional Homelessness Rate</div>
              <div className="text-xl font-bold font-mono text-amber-400">
                {selectedRegion.homelessnessRate}
              </div>
              <div className="text-[10px] text-slate-500">Per HUD Point-in-Time (PIT) count</div>
            </div>
          </div>

          {/* Regulatory Bottlenecks */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Regional Regulatory & Legal Friction
            </h5>
            <div className="space-y-2">
              {selectedRegion.regulatoryBottlenecks.map((bottleneck, idx) => (
                <div key={idx} className="bg-rose-950/20 p-2.5 rounded-lg border border-rose-800/30 text-xs text-rose-200 flex items-start gap-2">
                  <span className="font-bold text-rose-400">!</span>
                  <span>{bottleneck}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: AI Opportunities & Municipal Case Study */}
        <div className="lg:col-span-5 space-y-6">
          {/* Promising AI Interventions */}
          <div className="bg-gradient-to-br from-blue-950/40 via-slate-950 to-indigo-950/40 p-6 rounded-xl border border-blue-800/40 space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Lightbulb className="w-5 h-5" />
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">
                High-Impact AI Intervention Angles
              </h5>
            </div>

            <div className="space-y-3">
              {selectedRegion.promisingAiOpportunities.map((opp, idx) => (
                <div key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                  <span className="font-bold text-blue-400">0{idx + 1}.</span>
                  <span>{opp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Municipal Case Study Card */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                Municipal Spotlight
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Building className="w-3.5 h-3.5" />
                {selectedRegion.caseStudyCity.city}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedRegion.caseStudyCity.description}
            </p>

            <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-800/30 text-xs text-emerald-200 space-y-1">
              <div className="font-semibold text-emerald-300">Policy Reform Initiative:</div>
              <div>{selectedRegion.caseStudyCity.recentInitiative}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
