import React, { useState } from 'react';
import { HOUSING_PROTOTYPES, HousingPrototype } from '../data/housingPrototypes';
import { Award, Zap, Shield, Database, Clock, Users, ChevronRight, CheckCircle2, Filter } from 'lucide-react';

interface EvaluationMatrixProps {
  onSelectPrototype: (proto: HousingPrototype) => void;
}

export const EvaluationMatrix: React.FC<EvaluationMatrixProps> = ({ onSelectPrototype }) => {
  const [filterAudience, setFilterAudience] = useState<string>('all');

  const filteredPrototypes = HOUSING_PROTOTYPES.filter((p) => {
    if (filterAudience === 'all') return true;
    return p.keyTargetAudience.some((aud) => aud.toLowerCase().includes(filterAudience.toLowerCase()));
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Award className="w-3.5 h-3.5" />
            Strategic Decision Framework
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            Prototype Feasibility & Impact Matrix
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Compare development viability, regulatory hurdles, data readiness, and social ROI across all 6 concepts.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400">Filter by Beneficiary:</span>
          <select
            value={filterAudience}
            onChange={(e) => setFilterAudience(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Stakeholders</option>
            <option value="tenant">Tenants & Renters</option>
            <option value="builder">Builders & Developers</option>
            <option value="planning">City Planners & Municipalities</option>
            <option value="homeowner">Homeowners & Counselors</option>
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">Prototype Concept</th>
              <th className="py-3 px-3 text-center">Tech Feasibility</th>
              <th className="py-3 px-3 text-center">Civic Impact</th>
              <th className="py-3 px-3 text-center">Data Readiness</th>
              <th className="py-3 px-3 text-center">Regulatory Friction</th>
              <th className="py-3 px-3 text-center">Time to MVP</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredPrototypes.map((proto) => {
              // Custom scoring logic for visual presentation
              const isHighImpact = proto.id === 'tenant-guard' || proto.id === 'zoning-lens' || proto.id === 'afford-stack';
              const timeToMvp = proto.id === 'tenant-guard' ? '3-4 Weeks' : proto.id === 'civic-consensus' ? '4-6 Weeks' : proto.id === 'zoning-lens' ? '6-8 Weeks' : proto.id === 'afford-stack' ? '8-10 Weeks' : '10-12 Weeks';
              const regulatoryBarrier = proto.id === 'tenant-guard' ? 'Medium (UPL)' : proto.id === 'adaptive-reuse' ? 'High (Building Codes)' : proto.id === 'climate-shield' ? 'Medium (Insurance Rules)' : 'Low to Medium';

              return (
                <tr key={proto.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                      {proto.name.split(':')[0]}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {proto.tagline}
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {proto.category}
                      </span>
                    </div>
                  </td>

                  {/* Tech Feasibility (1-5) */}
                  <td className="py-4 px-3 text-center">
                    <div className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                      <Zap className="w-3.5 h-3.5" />
                      {proto.id === 'tenant-guard' ? '4.8/5' : proto.id === 'civic-consensus' ? '4.5/5' : '4.2/5'}
                    </div>
                  </td>

                  {/* Civic Impact */}
                  <td className="py-4 px-3 text-center">
                    <div className="inline-flex items-center gap-1 text-blue-400 font-bold">
                      <Award className="w-3.5 h-3.5" />
                      {isHighImpact ? '4.9/5' : '4.4/5'}
                    </div>
                  </td>

                  {/* Data Readiness */}
                  <td className="py-4 px-3 text-center">
                    <div className="inline-flex items-center gap-1 text-purple-400 font-bold">
                      <Database className="w-3.5 h-3.5" />
                      {proto.id === 'afford-stack' || proto.id === 'tenant-guard' ? '4.8/5' : '4.1/5'}
                    </div>
                  </td>

                  {/* Regulatory Friction */}
                  <td className="py-4 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      regulatoryBarrier.includes('High')
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : regulatoryBarrier.includes('Medium')
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {regulatoryBarrier}
                    </span>
                  </td>

                  {/* Time to MVP */}
                  <td className="py-4 px-3 text-center font-mono text-slate-300">
                    <div className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {timeToMvp}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onSelectPrototype(proto)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 border border-slate-700/80 transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      Inspect Blueprint
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Strategic Recommendation Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Fastest Hackathon MVP
          </div>
          <div className="text-xs font-bold text-white">TenantGuard AI</div>
          <p className="text-[11px] text-slate-400">
            Ready in 3 weeks using OCR, local rent control statutes, and emergency court response templates. Directly saves tenants from default eviction.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Highest Scalable Civic Supply ROI
          </div>
          <div className="text-xs font-bold text-white">ZoningLens AI</div>
          <p className="text-[11px] text-slate-400">
            Unlocks thousands of by-right ADUs and lot splits across California (SB 9) and Texas (Austin HOME) by giving homeowners instant spatial feasibility clarity.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-blue-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Highest Capital Efficiency
          </div>
          <div className="text-xs font-bold text-white">AffordStack Pro Forma AI</div>
          <p className="text-[11px] text-slate-400">
            Prevents multi-million-dollar deal cancellations for non-profit affordable housing builders navigating rising interest rates and complex LIHTC syndications.
          </p>
        </div>
      </div>
    </div>
  );
};
