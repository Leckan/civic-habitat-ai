import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, FileText, Clock, Copy, Check, Sparkles, Send, Scale } from 'lucide-react';

interface NoticePreset {
  id: string;
  title: string;
  jurisdiction: string;
  text: string;
  context: string;
}

const NOTICE_PRESETS: NoticePreset[] = [
  {
    id: 'la-rent-hike',
    title: 'Los Angeles: 25% Unlawful Rent Spike Notice',
    jurisdiction: 'California (AB 1482 Tenant Protection Act)',
    context: 'Residential tenant living for 3 years in a 12-unit apartment building constructed in 1985.',
    text: `NOTICE OF RENT INCREASE
Date: November 1, 2026
To Tenant: Jane Doe, Unit 4B, 1420 Maple Ave, Los Angeles, CA
Be advised that effective December 1, 2026, your monthly rent will increase from $1,800.00/month to $2,250.00/month (a 25% increase). Failure to pay the increased amount will result in immediate termination of tenancy and unlawful detainer eviction proceedings.
Signed, Management LLC`
  },
  {
    id: 'austin-no-cause',
    title: 'Austin: 3-Day Notice to Vacate without Just-Cause',
    jurisdiction: 'Texas / Municipal Tenant Protections',
    context: 'Month-to-month tenant with zero lease violations or missed payments.',
    text: `THREE DAY NOTICE TO VACATE
Date: November 4, 2026
To: Robert Taylor, Apt 12, South Congress Ave, Austin, TX
You are hereby given three (3) days notice to vacate and surrender possession of the premises by November 7, 2026 at 5:00 PM. No reason is required as management has decided to re-lease the unit to new occupants at current market rates. Continued occupancy will result in eviction suit filing in Travis County Justice of the Peace Court.`
  },
  {
    id: 'nyc-good-cause',
    title: 'New York City: Non-Renewal under Good Cause Eviction Law',
    jurisdiction: 'New York State (2024 Good Cause Eviction Law)',
    context: 'Tenant in a 20-unit building in Brooklyn; landlord refusing lease renewal without grounds.',
    text: `NOTICE OF LEASE NON-RENEWAL
Date: October 28, 2026
To: Maria Gomez, Apt 3A, Crown Heights, Brooklyn, NY
Please take notice that your current residential lease will expire on November 30, 2026. Landlord will not be renewing your lease and demands you surrender keys on or before November 30. No justification is provided as landlord elects not to renew.`
  }
];

export const TenantGuardDemo: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<NoticePreset>(NOTICE_PRESETS[0]);
  const [customText, setCustomText] = useState<string>(NOTICE_PRESETS[0].text);
  const [jurisdiction, setJurisdiction] = useState<string>(NOTICE_PRESETS[0].jurisdiction);
  const [context, setContext] = useState<string>(NOTICE_PRESETS[0].context);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [triageResult, setTriageResult] = useState<any>(null);

  const handlePresetSelect = (preset: NoticePreset) => {
    setSelectedPreset(preset);
    setCustomText(preset.text);
    setJurisdiction(preset.jurisdiction);
    setContext(preset.context);
    setTriageResult(null);
  };

  const runLegalTriage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini/triage-tenant-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noticeText: customText,
          jurisdiction,
          tenantContext: context
        })
      });
      const data = await response.json();
      setTriageResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!triageResult?.advocateResponseDraft) return;
    navigator.clipboard.writeText(triageResult.advocateResponseDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Civic Legal AI Sandbox
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            TenantGuard AI: Notice Triage & Eviction Defense Auditor
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Audit landlord notices against regional tenant protection acts, detect unlawful clauses, and generate formal legal pushback.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Scale className="w-4 h-4 text-amber-400" />
            Paralegal Legal-Aid Assistant
          </span>
        </div>
      </div>

      {/* Preset Notice Selectors */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Select Real-World Notice Scenario or Paste Notice Below:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {NOTICE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedPreset.id === preset.id
                  ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                  : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold">{preset.title}</div>
              <div className="text-[11px] text-slate-400 mt-1">{preset.jurisdiction}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-medium">Jurisdiction & Ordinance</label>
            <input
              type="text"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-medium">Tenant Context (Tenancy length, property type)</label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-medium">Landlord Notice Text (or OCR Scan)</label>
            <textarea
              rows={8}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full bg-slate-950 font-mono border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed resize-none"
              placeholder="Paste notice text here..."
            />
          </div>

          <button
            onClick={runLegalTriage}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Analyzing Statutory Compliance...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Run AI Legal Compliance Audit
              </>
            )}
          </button>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-5">
          {!triageResult && !isLoading ? (
            <div className="bg-slate-950/80 border border-slate-800 border-dashed rounded-xl p-12 text-center text-slate-400 space-y-3">
              <FileText className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-slate-300">No Active Audit Loaded</div>
              <p className="text-xs max-w-sm mx-auto">
                Click &quot;Run AI Legal Compliance Audit&quot; above to scan this landlord notice for statutory defects, illegal rent caps, and procedural filing deadlines.
              </p>
            </div>
          ) : isLoading ? (
            <div className="bg-slate-950 p-12 rounded-xl border border-slate-800 text-center space-y-4">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="text-sm text-slate-300 font-medium">Cross-referencing municipal rent stabilization bylaws & court rules...</div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Score & Summary Banner */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Procedural Validity Score
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-3xl font-black font-mono ${
                      triageResult.validityScore < 50 ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {triageResult.validityScore}/100
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-rose-500/10 text-rose-300 border border-rose-500/30">
                      High Likelihood of Defective Notice
                    </span>
                  </div>
                </div>

                <div className="max-w-xs text-xs text-slate-300 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
                  {triageResult.summary}
                </div>
              </div>

              {/* Detected Violations */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Statutory Violations & Procedural Defects Detected
                </h5>
                <ul className="space-y-2 text-xs">
                  {triageResult.violationsDetected?.map((violation: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 bg-rose-950/20 p-2.5 rounded-lg border border-rose-800/30 text-rose-200">
                      <span className="text-rose-400 font-bold shrink-0">✕</span>
                      <span>{violation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Critical Deadlines */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Critical Emergency Deadlines
                </h5>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  {triageResult.criticalDeadlines?.map((deadline: string, idx: number) => (
                    <div key={idx} className="bg-amber-950/20 p-2.5 rounded-lg border border-amber-800/30 text-amber-200 font-mono">
                      {deadline}
                    </div>
                  ))}
                </div>
              </div>

              {/* Generated Legal Pushback Letter */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    Formal Advocate Response Letter (Ready to Send)
                  </h5>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Letter'}
                  </button>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                  {triageResult.advocateResponseDraft}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
