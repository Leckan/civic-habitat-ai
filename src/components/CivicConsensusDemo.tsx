import React, { useState } from 'react';
import { Users, Sparkles, MessageSquare, ShieldCheck, Scale, CheckCircle2, ChevronRight, Building } from 'lucide-react';

export const CivicConsensusDemo: React.FC = () => {
  const [projectName, setProjectName] = useState('Oakridge Terrace Workforce Housing');
  const [location, setLocation] = useState('Austin, TX (South Congress Corridor)');
  const [units, setUnits] = useState(54);
  const [affordablePct, setAffordablePct] = useState(30);
  const [heightStories, setHeightStories] = useState(4);
  const [parkingRatio, setParkingRatio] = useState(0.75);
  const [isLoading, setIsLoading] = useState(false);
  const [simulationData, setSimulationData] = useState<any>(null);

  const runSimulation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini/townhall-simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName,
          location,
          units,
          affordablePercentage: affordablePct,
          heightStories,
          parkingRatio
        })
      });
      const data = await response.json();
      setSimulationData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Civic Multi-Agent Simulator
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            CivicConsensus AI: Public Hearing & NIMBY-to-YIMBY Simulator
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Simulate public hearing community debate and formulate a consensus Community Benefits Agreement (CBA).
          </p>
        </div>

        <div className="bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-cyan-400 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Multi-Agent Persona Deliberation
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Project Parameters */}
        <div className="lg:col-span-4 space-y-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Building className="w-4 h-4 text-cyan-400" />
            Development Proposal Specs
          </h4>

          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-medium">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-medium">Location / Neighborhood</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Total Units</label>
              <input
                type="number"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Stories (Height)</label>
              <input
                type="number"
                value={heightStories}
                onChange={(e) => setHeightStories(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Dedicated Affordable Units</span>
              <span className="font-mono text-cyan-400 font-semibold">{affordablePct}% ({Math.round(units * (affordablePct / 100))} units)</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={affordablePct}
              onChange={(e) => setAffordablePct(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Parking Stalls per Unit</span>
              <span className="font-mono text-cyan-400 font-semibold">{parkingRatio.toFixed(2)} spots</span>
            </div>
            <input
              type="range"
              min={0}
              max={2.0}
              step={0.25}
              value={parkingRatio}
              onChange={(e) => setParkingRatio(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <button
            onClick={runSimulation}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer pt-3 mt-4"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Simulating Deliberation...
              </>
            ) : (
              <>
                <Users className="w-4 h-4" />
                Simulate City Council Hearing
              </>
            )}
          </button>
        </div>

        {/* Simulation Output */}
        <div className="lg:col-span-8 space-y-5">
          {!simulationData && !isLoading ? (
            <div className="bg-slate-950/80 border border-slate-800 border-dashed rounded-xl p-12 text-center text-slate-400 space-y-3">
              <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-slate-300">Hearing Simulation Standby</div>
              <p className="text-xs max-w-sm mx-auto">
                Click &quot;Simulate City Council Hearing&quot; to spawn multi-agent AI personas representing homeowners, teachers, merchants, and planners.
              </p>
            </div>
          ) : isLoading ? (
            <div className="bg-slate-950 p-12 rounded-xl border border-slate-800 text-center space-y-4">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="text-sm text-slate-300 font-medium">Evaluating traffic impact, shadow studies, and community testimony personas...</div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Persona Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {simulationData.personas?.map((p: any, idx: number) => {
                  const isOppose = p.stance.includes('Oppose');
                  const isSupport = p.stance.includes('Support');
                  return (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{p.name}</div>
                          <div className="text-[11px] text-slate-400">{p.role}</div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                          isOppose
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : isSupport
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {p.stance}
                        </span>
                      </div>
                      <blockquote className="text-xs text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                        &quot;{p.quote}&quot;
                      </blockquote>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                        <span className="text-slate-500 font-medium">Root Friction:</span>
                        <span className="text-cyan-300">{p.keyConcern}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mediated Consensus & CBA Compromise */}
              <div className="bg-gradient-to-br from-cyan-950/40 via-slate-950 to-blue-950/40 p-6 rounded-xl border border-cyan-800/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-800/30">
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-cyan-400" />
                    <h5 className="text-sm font-bold text-white uppercase tracking-wider">
                      AI-Mediated Community Benefits Agreement (CBA)
                    </h5>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-700/50 px-3 py-1 rounded-full">
                    {simulationData.consensusCompromise?.approvalProbability}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                    Recommended Design & Policy Adjustments to Clear Council:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {simulationData.consensusCompromise?.recommendedAdjustments?.map((adj: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{adj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic pt-2 border-t border-slate-800/80">
                  {simulationData.consensusCompromise?.closingStatement}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
