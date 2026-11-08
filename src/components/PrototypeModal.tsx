import React from 'react';
import { HousingPrototype } from '../data/housingPrototypes';
import { X, Layers, Database, ShieldAlert, Award, Play, CheckCircle2, Cpu } from 'lucide-react';

interface PrototypeModalProps {
  prototype: HousingPrototype | null;
  onClose: () => void;
  onLaunchDemo?: (protoId: string) => void;
}

export const PrototypeModal: React.FC<PrototypeModalProps> = ({ prototype, onClose, onLaunchDemo }) => {
  if (!prototype) return null;

  const hasDemo = ['zoning-lens', 'afford-stack', 'tenant-guard', 'civic-consensus'].includes(prototype.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
              {prototype.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
              {prototype.name}
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-medium">{prototype.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Problem & Why AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              The Root Challenge
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">{prototype.primaryProblem}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              Why AI is Essential
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">{prototype.whyAiNeeded}</p>
          </div>
        </div>

        {/* System Architecture */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            System Architecture & Pipeline
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">1. Data Ingestion</div>
              <ul className="mt-1 space-y-1 text-slate-300">
                {prototype.systemArchitecture.inputs.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-purple-400 uppercase font-semibold">2. AI / ML Reasoning</div>
              <ul className="mt-1 space-y-1 text-purple-200">
                {prototype.systemArchitecture.models.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-emerald-400 uppercase font-semibold">3. Outputs & Actions</div>
              <ul className="mt-1 space-y-1 text-emerald-200">
                {prototype.systemArchitecture.outputs.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Google ADK Multi-Agent Blueprint */}
        {prototype.adkArchitecture && (
          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Google ADK Multi-Agent Topology
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {prototype.adkArchitecture.graphType}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Specialized ADK Agents</div>
                <ul className="space-y-1 text-slate-200">
                  {prototype.adkArchitecture.primaryAgents.map((ag, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 font-mono text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                      <span>{ag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Native ADK Tools</div>
                <ul className="space-y-1 text-emerald-300">
                  {prototype.adkArchitecture.adkTools.map((tool, idx) => (
                    <li key={idx} className="font-mono text-[11px]">
                      • {tool}()
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-mono bg-slate-900/50 p-2 rounded border border-slate-800/80">
              <span className="text-slate-500">Shared State: </span>
              {prototype.adkArchitecture.sharedStateSchema.map((s) => `{${s}}`).join(', ')}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {prototype.impactMetrics.map((metric, i) => (
            <div key={i} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <div className="text-lg font-bold font-mono text-emerald-400">{metric.value}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Regulatory & Pilot */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="text-slate-400 font-semibold uppercase text-[10px]">
            Regulatory Hurdle & 90-Day Municipal Pilot Strategy:
          </div>
          <p className="text-slate-300">
            <span className="text-rose-300 font-semibold">Barrier:</span> {prototype.regulatoryHurdles}
          </p>
          <p className="text-slate-300">
            <span className="text-emerald-300 font-semibold">Pilot Action:</span> {prototype.pilotStrategy}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
          {hasDemo && (
            <button
              onClick={() => {
                onClose();
                onLaunchDemo?.(prototype.id);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Launch Interactive Sandbox Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
