import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Play,
  CheckCircle2,
  GitBranch,
  Terminal,
  Code2,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Database,
  ShieldCheck,
  Zap,
  Download,
  Activity,
  FileCode,
  Box
} from 'lucide-react';

interface AdkAgentNode {
  id: string;
  name: string;
  type: 'LlmAgent' | 'SequentialAgent' | 'ParallelAgent' | 'LoopAgent';
  model: string;
  role: string;
  tools: string[];
  stateInputs: string[];
  stateOutputs: string[];
  color: string;
}

const ADK_NODES: AdkAgentNode[] = [
  {
    id: 'dispatch',
    name: 'HousingOrchestratorAgent',
    type: 'LlmAgent',
    model: 'gemini-3.8-flash',
    role: 'Root Supervisor: Analyzes civic intent, parses municipal address, and dispatches sub-agent graphs.',
    tools: ['parse_civic_intent', 'route_to_subagent'],
    stateInputs: ['user_query', 'target_city'],
    stateOutputs: ['task_scope', 'workflow_plan'],
    color: 'border-emerald-500 bg-emerald-950/30 text-emerald-300'
  },
  {
    id: 'zoning',
    name: 'ZoningGISSpecialistAgent',
    type: 'LlmAgent',
    model: 'gemini-3.8-flash',
    role: 'Spatial Ingestion: Queries municipal parcel shapefiles and runs RAG over Land Development Codes.',
    tools: ['lookup_municipal_gis_parcel', 'query_municode_rag', 'solve_setback_polygons'],
    stateInputs: ['parcel_apn', 'target_city'],
    stateOutputs: ['buildable_envelope', 'by_right_units_max'],
    color: 'border-blue-500 bg-blue-950/30 text-blue-300'
  },
  {
    id: 'parallel_eval',
    name: 'FeasibilityReviewBranch',
    type: 'ParallelAgent',
    model: 'Graph Runtime',
    role: 'Parallel Execution: Concurrently evaluates financial underwriting and civic hearing friction.',
    tools: ['concurrent_branch_spawn', 'barrier_synchronization'],
    stateInputs: ['buildable_envelope', 'unit_count'],
    stateOutputs: ['parallel_eval_results'],
    color: 'border-purple-500 bg-purple-950/30 text-purple-300'
  },
  {
    id: 'finance',
    name: 'FinancialStackAgent',
    type: 'LlmAgent',
    model: 'gemini-3.8-flash',
    role: 'Underwriting: Synthesizes LIHTC 9%/4% equity, DSCR hard debt capacity, and HUD subsidies.',
    tools: ['calculate_lihtc_basis', 'lookup_hud_fair_market_rent', 'solve_pro_forma_dscr'],
    stateInputs: ['total_development_cost', 'ami_targets'],
    stateOutputs: ['capital_stack_breakdown', 'qap_score_projection'],
    color: 'border-cyan-500 bg-cyan-950/30 text-cyan-300'
  },
  {
    id: 'consensus_loop',
    name: 'CommunityConsensusLoop',
    type: 'LoopAgent',
    model: 'Iterative Evaluator',
    role: 'Iterative Refinement: Loops stakeholder feedback until approval consensus > 80%.',
    tools: ['simulate_hearing_objections', 'generate_step_back_cba'],
    stateInputs: ['proposed_massing', 'neighborhood_personas'],
    stateOutputs: ['community_benefits_agreement', 'approval_probability'],
    color: 'border-amber-500 bg-amber-950/30 text-amber-300'
  }
];

export const GoogleAdkStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'execution' | 'code'>('execution');
  const [selectedNode, setSelectedNode] = useState<AdkAgentNode>(ADK_NODES[0]);
  const [selectedMission, setSelectedMission] = useState<string>('austin_infill');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionData, setExecutionData] = useState<any>(null);
  const [codeLang, setCodeLang] = useState<'ts' | 'python'>('ts');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const missions = [
    {
      id: 'austin_infill',
      title: 'Austin HOME Phase 2: Infill 4-Plex Clearance',
      city: 'Austin, TX',
      prompt: 'Assess 450 Oak Ave for 4-unit Missing Middle infill under HOME Phase 2 with 0 parking minimums.'
    },
    {
      id: 'la_lihtc',
      title: 'California 60-Unit LIHTC 9% Capital Stack Optimization',
      city: 'Los Angeles, CA',
      prompt: 'Optimize $24M workforce development capital stack to close $1.8M gap with state HFA bonds.'
    },
    {
      id: 'eviction_triage',
      title: 'California AB 1482 Tenant Notice Emergency Defense',
      city: 'Oakland, CA',
      prompt: 'Triage 3-day notice to quit for residential tenant without just-cause grounds.'
    }
  ];

  const handleRunWorkflow = async () => {
    setIsRunning(true);
    const mission = missions.find((m) => m.id === selectedMission) || missions[0];

    try {
      const res = await fetch('/api/adk/run-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowId: mission.id,
          prompt: mission.prompt,
          targetCity: mission.city
        })
      });
      const data = await res.json();
      setExecutionData(data);
    } catch (e) {
      console.error('ADK execution error:', e);
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    const code = codeLang === 'ts' ? tsCodeSample : pyCodeSample;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const tsCodeSample = `import { LlmAgent, SequentialAgent, ParallelAgent, LoopAgent, defineTool } from '@google/adk';
import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';

// 1. Initialize Google Gemini 3.8 Flash Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

// 2. Define Google ADK Tools for Municipal Housing
export const lookupMunicipalGisTool = defineTool({
  name: 'lookup_municipal_gis_parcel',
  description: 'Fetches parcel boundaries, frontage, and zoning overlay from county GIS',
  parameters: z.object({
    addressOrApn: z.string(),
    jurisdiction: z.string()
  }),
  execute: async ({ addressOrApn, jurisdiction }) => {
    return {
      lotAreaSqFt: 6850,
      frontageFt: 55,
      zoningCode: 'HOME Phase 2 Infill',
      transitPriorityOverlay: true
    };
  }
});

export const queryMunicodeRagTool = defineTool({
  name: 'query_municode_rag',
  description: 'Performs semantic vector search across municipal Land Development Codes',
  parameters: z.object({ query: z.string(), city: z.string() }),
  execute: async ({ query, city }) => {
    return {
      setbacks: { frontFt: 15, rearFt: 5, sideFt: 5 },
      maxUnitsAllowed: 4,
      parkingMinimums: 0 // Exempt near transit
    };
  }
});

// 3. Build Specialized Google ADK Agents
export const zoningAgent = new LlmAgent({
  name: 'ZoningGISSpecialistAgent',
  model: 'gemini-3.8-flash',
  instruction: 'Ingest parcel coordinates, evaluate municipal setbacks, and calculate by-right unit yield.',
  tools: [lookupMunicipalGisTool, queryMunicodeRagTool]
});

export const financeAgent = new LlmAgent({
  name: 'FinancialStackAgent',
  model: 'gemini-3.8-flash',
  instruction: 'Optimize affordable capital stacks balancing LIHTC equity, permanent debt, and HUD grants.'
});

export const communityLoop = new LoopAgent({
  name: 'CommunityConsensusLoop',
  instruction: 'Simulate public hearing debate and refine Community Benefits Agreement until approval > 80%.',
  maxIterations: 3
});

// 4. Compose ADK Multi-Agent Graph (Sequential + Parallel)
export const housingOrchestrator = new SequentialAgent({
  name: 'HousingSuperSystem',
  agents: [
    zoningAgent,
    new ParallelAgent({
      name: 'EvaluationBranch',
      agents: [financeAgent, communityLoop]
    })
  ]
});

// 5. Execute with Session State & Artifacts
async function main() {
  const result = await housingOrchestrator.run({
    initialState: {
      address: '450 Oak Ave',
      city: 'Austin, TX'
    }
  });

  console.log('Execution Traces:', result.traces);
  console.log('Final State:', result.state);
  console.log('Generated Artifacts:', result.artifacts);
}

main();`;

  const pyCodeSample = `import os
from google.adk import LlmAgent, SequentialAgent, ParallelAgent, LoopAgent, tool, Runner
from pydantic import BaseModel, Field

# 1. Define Google ADK Custom Tools
class GisQuery(BaseModel):
    address: str = Field(description="Property street address or County APN")
    city: str = Field(description="Target municipal jurisdiction")

@tool
def lookup_municipal_gis(args: GisQuery) -> dict:
    """Queries municipal parcel GIS server for lot geometry and zoning classification."""
    return {
        "lot_sqft": 6850,
        "frontage_ft": 55,
        "zoning": "Austin HOME Phase 2",
        "by_right_max_units": 4
    }

# 2. Instantiate Google ADK Specialized Agents
zoning_agent = LlmAgent(
    name="ZoningGISSpecialistAgent",
    model="gemini-3.8-flash",
    instruction="Analyze municipal parcel boundaries and calculate allowable infill massing.",
    tools=[lookup_municipal_gis]
)

finance_agent = LlmAgent(
    name="FinancialStackAgent",
    model="gemini-3.8-flash",
    instruction="Optimize affordable housing capital stacks (LIHTC 9% / 4% and local bonds)."
)

consensus_loop = LoopAgent(
    name="CommunityConsensusLoop",
    instruction="Iteratively adjust architectural step-backs until town hall approval exceeds 80%.",
    max_iterations=3
)

# 3. Assemble Multi-Agent Graph
housing_system = SequentialAgent(
    name="HousingInfillOrchestrator",
    agents=[
        zoning_agent,
        ParallelAgent(name="DualFeasibilityBranch", agents=[finance_agent, consensus_loop])
    ]
)

# 4. Run Execution via ADK Runner
if __name__ == "__main__":
    runner = Runner(agent=housing_system)
    session = runner.start_session(initial_state={"city": "Austin, TX", "address": "450 Oak Ave"})
    print("Session Artifacts:", session.get_artifacts())`;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl space-y-8 animate-fade-in">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Google Agent Development Kit (ADK) Integration
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            Google ADK Multi-Agent Housing Orchestrator
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Production-grade multi-agent systems built with Google ADK primitives (<code className="text-emerald-400 font-mono text-xs">LlmAgent</code>, <code className="text-purple-400 font-mono text-xs">SequentialAgent</code>, <code className="text-blue-400 font-mono text-xs">ParallelAgent</code>, <code className="text-amber-400 font-mono text-xs">LoopAgent</code>).
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('execution')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'execution'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            ADK Live Execution & Traces
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            ADK Multi-Agent Graph
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'code'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            SDK Code (TS / Python)
          </button>
        </div>
      </div>

      {/* TAB 1: Live Execution & ADK Developer Trace UI */}
      {activeTab === 'execution' && (
        <div className="space-y-6">
          {/* Mission Dispatch Bar */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Select ADK Housing Mission Dispatch:
              </label>
              <div className="flex flex-wrap gap-2">
                {missions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMission(m.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      selectedMission === m.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {m.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRunWorkflow}
              disabled={isRunning}
              className="py-2.5 px-5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Orchestrating ADK Graph...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  Dispatch Google ADK Workflow
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Trace Viewer (Local Dev UI simulation) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  ADK Execution Event Log (Structured Telemetry)
                </span>
                <span className="font-mono text-[11px] text-slate-500">Framework: Google ADK 2.0</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2.5 max-h-[500px] overflow-y-auto shadow-inner">
                {!executionData && !isRunning ? (
                  <div className="p-8 text-center text-slate-500 space-y-2">
                    <Box className="w-8 h-8 text-slate-700 mx-auto" />
                    <p className="text-xs">Click &quot;Dispatch Google ADK Workflow&quot; to execute the multi-agent graph with Gemini 3.8 Flash.</p>
                  </div>
                ) : isRunning ? (
                  <div className="p-8 text-center text-slate-400 space-y-3">
                    <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin mx-auto" />
                    <p className="text-xs">SequentialAgent executing GIS tools & spawning ParallelAgent evaluators...</p>
                  </div>
                ) : (
                  executionData.traces?.map((trace: any) => {
                    const isTool = trace.event === 'TOOL_CALL' || trace.event === 'TOOL_RESULT';
                    const isState = trace.event === 'STATE_UPDATE';
                    const isArtifact = trace.event === 'ARTIFACT_GEN';
                    const isHandoff = trace.event === 'AGENT_HANDOFF';

                    return (
                      <div
                        key={trace.id}
                        className={`p-2.5 rounded-lg border text-[11px] space-y-1 transition-all ${
                          isArtifact
                            ? 'bg-purple-950/20 border-purple-800/40 text-purple-200'
                            : isTool
                            ? 'bg-blue-950/20 border-blue-800/40 text-blue-200'
                            : isState
                            ? 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                            : isHandoff
                            ? 'bg-cyan-950/20 border-cyan-800/40 text-cyan-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-slate-400 flex items-center gap-1.5">
                            <span className="text-emerald-400">[{trace.timestamp}]</span>
                            <span className="text-white font-semibold">{trace.agent}</span>
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-950 font-mono font-bold text-slate-300 border border-slate-800">
                            {trace.event}
                          </span>
                        </div>
                        <div className="text-slate-200">{trace.action}</div>
                        {trace.details && (
                          <div className="text-[10px] text-slate-400 bg-slate-950/80 p-1.5 rounded border border-slate-800/60 overflow-x-auto">
                            {JSON.stringify(trace.details)}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* ADK Session State & Artifacts */}
            <div className="lg:col-span-5 space-y-5">
              {/* Executive Summary */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  ADK Supervisor Synthesis
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {executionData?.summary || 'The Google ADK multi-agent team coordinates municipal parcel queries, zoning legal constraints, financial underwriting, and community hearing compromises into structured, verifiable artifacts.'}
                </p>
              </div>

              {/* Shared Session State Map */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-blue-400" />
                    ADK Shared Session State
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Mutable Key-Value Map</span>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1.5 text-slate-300 max-h-48 overflow-y-auto">
                  {executionData ? (
                    Object.entries(executionData.state).map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-slate-800/60 pb-1">
                        <span className="text-slate-400">{k}:</span>
                        <span className="text-emerald-300 font-semibold">{String(v)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-500 italic">State empty. Execute a workflow to inspect session variables.</div>
                  )}
                </div>
              </div>

              {/* Published Artifacts */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Box className="w-4 h-4 text-purple-400" />
                    Published Google ADK Artifacts
                  </span>
                  <span className="text-[10px] font-mono text-purple-400">Verified Outputs</span>
                </div>

                <div className="space-y-2">
                  {executionData?.artifacts?.map((art: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-purple-400" />
                        <div>
                          <div className="font-semibold text-slate-200">{art.name}</div>
                          <div className="text-[10px] text-slate-500">{art.size} • Verified Output</div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                        Ready
                      </span>
                    </div>
                  ))}
                  {!executionData && (
                    <div className="text-xs text-slate-500 italic">No artifacts generated yet.</div>
                  )}
                </div>
              </div>

              {/* Performance Metrics */}
              {executionData?.metrics && (
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-slate-500 text-[10px]">Latency</div>
                    <div className="font-mono font-bold text-white mt-0.5">{executionData.metrics.executionTimeMs}ms</div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-slate-500 text-[10px]">Tools Called</div>
                    <div className="font-mono font-bold text-emerald-400 mt-0.5">{executionData.metrics.toolsInvoked}</div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-slate-500 text-[10px]">Handoffs</div>
                    <div className="font-mono font-bold text-blue-400 mt-0.5">{executionData.metrics.agentHandoffs}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADK Multi-Agent Topology Graph */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-400">
            Interactive multi-agent network graph conforming to Google ADK architecture. Click any node to inspect agent instructions, bound tools, and state schema.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Visual Node Diagram */}
            <div className="lg:col-span-7 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-emerald-400" />
                Google ADK Multi-Agent Orchestration Graph
              </div>

              <div className="space-y-3 pt-2">
                {ADK_NODES.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      selectedNode.id === node.id
                        ? `${node.color} shadow-lg shadow-emerald-950/20 scale-[1.01]`
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{node.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-slate-950 border border-slate-800">
                          {node.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-1">{node.role}</p>
                    </div>

                    <div className="text-right text-[11px] font-mono text-slate-500 shrink-0 ml-4">
                      {node.tools.length} Tools
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Node Inspector */}
            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                  {selectedNode.type}
                </span>
                <h4 className="text-lg font-bold text-white mt-1">{selectedNode.name}</h4>
                <div className="text-xs text-slate-400 font-mono mt-0.5">Model: {selectedNode.model}</div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="font-semibold text-slate-300">Agent Responsibility:</div>
                <p className="text-slate-400 leading-relaxed">{selectedNode.role}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-semibold text-slate-300">Bound Google ADK Tools:</div>
                <div className="space-y-1">
                  {selectedNode.tools.map((t, idx) => (
                    <div key={idx} className="bg-slate-900 px-3 py-1.5 rounded border border-slate-800 font-mono text-emerald-300 text-[11px] flex items-center gap-2">
                      <Zap className="w-3 h-3 text-emerald-400" />
                      {t}()
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">State Inputs:</div>
                  <ul className="mt-1 space-y-0.5 text-slate-300 font-mono text-[10px]">
                    {selectedNode.stateInputs.map((item, i) => (
                      <li key={i}>• {`{${item}}`}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-400 uppercase font-semibold">State Outputs:</div>
                  <ul className="mt-1 space-y-0.5 text-emerald-300 font-mono text-[10px]">
                    {selectedNode.stateOutputs.map((item, i) => (
                      <li key={i}>• {`{${item}}`}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Production Code Generator */}
      {activeTab === 'code' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCodeLang('ts')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  codeLang === 'ts'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                TypeScript (@google/adk)
              </button>
              <button
                onClick={() => setCodeLang('python')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  codeLang === 'python'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Python (google-adk)
              </button>
            </div>

            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? 'Copied' : 'Copy ADK Source Code'}
            </button>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[550px] shadow-inner">
            <pre className="whitespace-pre">{codeLang === 'ts' ? tsCodeSample : pyCodeSample}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
