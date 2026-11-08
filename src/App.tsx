import React, { useState } from 'react';
import { HOUSING_PROTOTYPES, HousingPrototype } from './data/housingPrototypes';
import { ZoningLensDemo } from './components/ZoningLensDemo';
import { AffordStackDemo } from './components/AffordStackDemo';
import { TenantGuardDemo } from './components/TenantGuardDemo';
import { CivicConsensusDemo } from './components/CivicConsensusDemo';
import { SpecStudio } from './components/SpecStudio';
import { RegionalExplorer } from './components/RegionalExplorer';
import { EvaluationMatrix } from './components/EvaluationMatrix';
import { PrototypeModal } from './components/PrototypeModal';
import {
  Building2,
  Sparkles,
  Layers,
  Play,
  Cpu,
  MapPin,
  Award,
  Download,
  Copy,
  Check,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'blueprints' | 'demos' | 'spec_studio' | 'regions' | 'matrix'>('blueprints');
  const [activeDemo, setActiveDemo] = useState<'zoning-lens' | 'afford-stack' | 'tenant-guard' | 'civic-consensus'>('zoning-lens');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inspectedPrototype, setInspectedPrototype] = useState<HousingPrototype | null>(null);
  const [copiedDossier, setCopiedDossier] = useState(false);

  const categories = ['All', 'Zoning & Supply', 'Finance & Subsidies', 'Tenant Rights', 'Adaptive Reuse', 'Civic Consensus', 'Climate & Insurance'];

  const filteredBlueprints = selectedCategory === 'All'
    ? HOUSING_PROTOTYPES
    : HOUSING_PROTOTYPES.filter((p) => p.category === selectedCategory);

  const launchDemoFromModal = (protoId: string) => {
    if (['zoning-lens', 'afford-stack', 'tenant-guard', 'civic-consensus'].includes(protoId)) {
      setActiveDemo(protoId as any);
      setActiveTab('demos');
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const copyFullDossier = () => {
    let md = `# CivicHabitat AI: U.S. Regional Housing Innovation Dossier\n\n`;
    md += `A comprehensive strategic portfolio of 6 high-impact AI prototypes addressing America's systemic housing crisis.\n\n`;

    HOUSING_PROTOTYPES.forEach((proto, i) => {
      md += `## ${i + 1}. ${proto.name}\n`;
      md += `**Category:** ${proto.category} | **Target Markets:** ${proto.priorityRegions.join(', ')}\n\n`;
      md += `> ${proto.tagline}\n\n`;
      md += `### Core Problem\n${proto.primaryProblem}\n\n`;
      md += `### Why AI is Essential\n${proto.whyAiNeeded}\n\n`;
      md += `### System Architecture\n`;
      md += `- **Inputs:** ${proto.systemArchitecture.inputs.join(', ')}\n`;
      md += `- **AI Models:** ${proto.systemArchitecture.models.join(', ')}\n`;
      md += `- **Outputs:** ${proto.systemArchitecture.outputs.join(', ')}\n\n`;
      md += `### Target Impact Metrics\n`;
      proto.impactMetrics.forEach((m) => {
        md += `- **${m.label}:** ${m.value}\n`;
      });
      md += `\n### Regulatory Hurdle & 90-Day Pilot Action\n`;
      md += `- **Barrier:** ${proto.regulatoryHurdles}\n`;
      md += `- **Pilot:** ${proto.pilotStrategy}\n\n`;
      md += `---\n\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Notification / Context Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-blue-950/60 border-b border-slate-800 py-2 px-4 text-center text-xs text-slate-300">
        <span className="font-semibold text-emerald-400">U.S. Housing Crisis Innovation Initiative:</span> Exploring generative spatial AI, legal triage, and capital stack optimization for American cities.
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 font-black text-xl">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">CivicHabitat AI</h1>
                <span className="text-[10px] uppercase font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  U.S. Housing Lab
                </span>
              </div>
              <p className="text-[11px] text-slate-400">AI-Focused Prototypes & Strategic Blueprints for Regional Housing</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('blueprints')}
              className={`px-3.5 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'blueprints'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              6 Flagship Blueprints
            </button>
            <button
              onClick={() => setActiveTab('demos')}
              className={`px-3.5 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'demos'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              Live Sandboxes
            </button>
            <button
              onClick={() => setActiveTab('spec_studio')}
              className={`px-3.5 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'spec_studio'
                  ? 'bg-purple-500 text-white shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              AI Spec Studio
            </button>
            <button
              onClick={() => setActiveTab('regions')}
              className={`px-3.5 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'regions'
                  ? 'bg-blue-500 text-white shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Regional Explorer
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'matrix'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Feasibility Matrix
            </button>
          </nav>

          {/* Export Full Dossier */}
          <button
            onClick={copyFullDossier}
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-all cursor-pointer"
          >
            {copiedDossier ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedDossier ? 'Dossier Copied!' : 'Export Dossier'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              AI Innovation for the American Housing Emergency
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Tackling the U.S. Housing Deficit with Applied Artificial Intelligence
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The United States is missing over <span className="text-emerald-400 font-semibold">3.8 million homes</span>. Outdated zoning bylaws, opaque municipal codes, protracted multi-tiered affordable financing, and asymmetrical eviction courts choke progress. Explore concrete, production-grade AI prototypes engineered to unlock land supply, safeguard renters, and de-risk development.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold font-mono text-emerald-400">3.8M+</div>
                <div className="text-[11px] text-slate-400 mt-0.5">U.S. Housing Supply Deficit</div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold font-mono text-blue-400">75%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Land Restricted to Single-Family</div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold font-mono text-amber-400">85%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Evicted Renters Without Legal Counsel</div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold font-mono text-purple-400">18 Mos</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Avg. Affordable LIHTC Financing Cycle</div>
              </div>
            </div>
          </div>
        </section>

        {/* TAB 1: 6 Flagship Blueprints */}
        {activeTab === 'blueprints' && (
          <section className="space-y-6 animate-fade-in">
            {/* Category Filter Pills */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400 font-medium">
                Showing {filteredBlueprints.length} AI Housing Solution Blueprints
              </div>
            </div>

            {/* Prototypes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlueprints.map((proto) => {
                const hasDemo = ['zoning-lens', 'afford-stack', 'tenant-guard', 'civic-consensus'].includes(proto.id);
                return (
                  <div
                    key={proto.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group hover:shadow-2xl hover:shadow-emerald-950/20"
                  >
                    <div className="space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {proto.category}
                        </span>
                        {hasDemo && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <Play className="w-2.5 h-2.5 fill-current" />
                            Live Sandbox
                          </span>
                        )}
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {proto.name.split(':')[0]}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {proto.tagline}
                        </p>
                      </div>

                      {/* Problem Snippet */}
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
                        <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">The Crisis Point:</div>
                        <p className="line-clamp-2 leading-relaxed text-[11px] text-slate-400">{proto.primaryProblem}</p>
                      </div>

                      {/* Key Features */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Key Capabilities:</div>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {proto.keyFeatures.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                              <span className="truncate">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setInspectedPrototype(proto)}
                        className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        Deep Architecture
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {hasDemo ? (
                        <button
                          onClick={() => launchDemoFromModal(proto.id)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          Launch Demo
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500">Spec Blueprint</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 2: Live Interactive Sandboxes */}
        {activeTab === 'demos' && (
          <section className="space-y-6 animate-fade-in">
            {/* Sandbox Selector Sub-bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
              <button
                onClick={() => setActiveDemo('zoning-lens')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  activeDemo === 'zoning-lens'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                1. ZoningLens AI (Spatial Infill & ADU)
              </button>

              <button
                onClick={() => setActiveDemo('afford-stack')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  activeDemo === 'afford-stack'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                2. AffordStack AI (Capital Stack / LIHTC)
              </button>

              <button
                onClick={() => setActiveDemo('tenant-guard')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  activeDemo === 'tenant-guard'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                3. TenantGuard AI (Eviction Defense & Notice Triage)
              </button>

              <button
                onClick={() => setActiveDemo('civic-consensus')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  activeDemo === 'civic-consensus'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                4. CivicConsensus AI (Public Hearing Simulator)
              </button>
            </div>

            {/* Active Sandbox Render */}
            <div>
              {activeDemo === 'zoning-lens' && <ZoningLensDemo />}
              {activeDemo === 'afford-stack' && <AffordStackDemo />}
              {activeDemo === 'tenant-guard' && <TenantGuardDemo />}
              {activeDemo === 'civic-consensus' && <CivicConsensusDemo />}
            </div>
          </section>
        )}

        {/* TAB 3: AI Spec Studio */}
        {activeTab === 'spec_studio' && (
          <section className="animate-fade-in">
            <SpecStudio />
          </section>
        )}

        {/* TAB 4: Regional Explorer */}
        {activeTab === 'regions' && (
          <section className="animate-fade-in">
            <RegionalExplorer />
          </section>
        )}

        {/* TAB 5: Feasibility & Impact Matrix */}
        {activeTab === 'matrix' && (
          <section className="animate-fade-in">
            <EvaluationMatrix onSelectPrototype={(p) => setInspectedPrototype(p)} />
          </section>
        )}
      </main>

      {/* Prototype Detail Modal */}
      <PrototypeModal
        prototype={inspectedPrototype}
        onClose={() => setInspectedPrototype(null)}
        onLaunchDemo={launchDemoFromModal}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">CivicHabitat AI</span>
            <span>— Open Innovation Lab for U.S. Housing Policy & Density</span>
          </div>
          <div className="text-slate-500">
            Powered by Google Gemini 3.8 Flash • Open Municipal GIS & HUD Data Feeds
          </div>
        </div>
      </footer>
    </div>
  );
}
