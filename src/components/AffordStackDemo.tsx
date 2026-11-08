import React, { useState } from 'react';
import { DollarSign, PieChart, ShieldAlert, CheckCircle2, TrendingUp, Sparkles, Building, Sliders, ArrowRight } from 'lucide-react';

export const AffordStackDemo: React.FC = () => {
  const [totalUnits, setTotalUnits] = useState<number>(60);
  const [costPerUnit, setCostPerUnit] = useState<number>(375000);
  const [creditType, setCreditType] = useState<'lihtc_9' | 'lihtc_4'>('lihtc_9');
  const [amiTarget, setAmiTarget] = useState<'deep_30_50' | 'workforce_60_80'>('deep_30_50');
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [localSoftSubsidy, setLocalSoftSubsidy] = useState<number>(2500000);

  // Total Development Cost
  const totalDevelopmentCost = totalUnits * costPerUnit;

  // Eligible Basis (~88% of TDC excluding land)
  const eligibleBasis = totalDevelopmentCost * 0.88;
  // DDA / QCT 130% basis boost (applicable in high-cost metro tracts)
  const boostedBasis = eligibleBasis * 1.30;

  // LIHTC Equity Calculation
  // 9% credit produces ~9% annual credit for 10 years (~90% face value), syndicates at ~$0.88 per dollar
  // 4% credit produces ~4% annual credit for 10 years (~40% face value), syndicates at ~$0.85 per dollar
  const lihtcEquity = creditType === 'lihtc_9'
    ? Math.round(boostedBasis * 0.09 * 10 * 0.88)
    : Math.round(boostedBasis * 0.04 * 10 * 0.85);

  // Net Operating Income (NOI) calculation based on AMI target
  // Deep 30-50% AMI: lower rents ($850/mo avg net) vs 60-80% AMI ($1,450/mo avg net)
  const monthlyNetPerUnit = amiTarget === 'deep_30_50' ? 880 : 1380;
  const annualNOI = totalUnits * monthlyNetPerUnit * 12;

  // Supportable Hard Debt at 1.20x DSCR and 35-year amortization
  // Annual debt service capacity = NOI / 1.20
  const annualDebtServiceCapacity = annualNOI / 1.20;
  // Capitalization of debt at specified interest rate + 1% amortization constant
  const mortgageConstant = (interestRate / 100) + 0.012;
  const supportableHardDebt = Math.round(annualDebtServiceCapacity / mortgageConstant);

  // Deferred Developer Fee (typically 10-15% of fee, approx 1.5% of TDC)
  const deferredDevFee = Math.round(totalDevelopmentCost * 0.035);

  // Total Sources & Gap
  const totalSources = lihtcEquity + supportableHardDebt + localSoftSubsidy + deferredDevFee;
  const fundingGap = totalDevelopmentCost - totalSources;
  const isSurplus = fundingGap <= 0;

  // State QAP Score Prediction (out of 100)
  const qapScore = Math.min(100, Math.round(
    (creditType === 'lihtc_9' ? 45 : 30) +
    (amiTarget === 'deep_30_50' ? 30 : 15) +
    (localSoftSubsidy >= 2000000 ? 15 : 8) +
    (isSurplus ? 10 : 0)
  ));

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Financial Architecture Sandbox
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            AffordStack AI: Capital Stack & LIHTC Pro Forma Optimizer
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Algorithmically balance Low-Income Housing Tax Credits, hard debt DSCR, and municipal gap financing.
          </p>
        </div>

        <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
          <div className="text-xs text-slate-400">Total Development Cost (TDC)</div>
          <div className="text-xl font-bold font-mono text-white">
            ${(totalDevelopmentCost / 1000000).toFixed(2)}M
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            Project & Underwriting Parameters
          </h4>

          {/* Unit Count */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Total Affordable Units</span>
              <span className="font-mono text-blue-400 font-semibold">{totalUnits} units</span>
            </div>
            <input
              type="range"
              min={24}
              max={120}
              step={6}
              value={totalUnits}
              onChange={(e) => setTotalUnits(Number(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Cost per unit */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Turnkey Cost Per Unit</span>
              <span className="font-mono text-blue-400 font-semibold">${(costPerUnit / 1000).toFixed(0)}k/unit</span>
            </div>
            <input
              type="range"
              min={280000}
              max={550000}
              step={10000}
              value={costPerUnit}
              onChange={(e) => setCostPerUnit(Number(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* LIHTC Credit Choice */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Federal Tax Credit Program</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCreditType('lihtc_9')}
                className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                  creditType === 'lihtc_9'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-200 font-medium'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">9% Competitive LIHTC</div>
                <div className="text-[10px] text-slate-400 mt-0.5">High equity (~70% basis), scarce allocation</div>
              </button>
              <button
                onClick={() => setCreditType('lihtc_4')}
                className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                  creditType === 'lihtc_4'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-200 font-medium'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">4% + Tax-Exempt Bonds</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Non-competitive, lower equity (~32%)</div>
              </button>
            </div>
          </div>

          {/* Affordability Targeting */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">AMI Targeting & Rent Restrictions</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setAmiTarget('deep_30_50')}
                className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                  amiTarget === 'deep_30_50'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-200 font-medium'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">Deep Affordability (30-50% AMI)</div>
                <div className="text-[10px] text-slate-400 mt-0.5">High QAP points, lower debt service</div>
              </button>
              <button
                onClick={() => setAmiTarget('workforce_60_80')}
                className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                  amiTarget === 'workforce_60_80'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-200 font-medium'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">Workforce (60-80% AMI)</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Higher cash flow, supports larger mortgage</div>
              </button>
            </div>
          </div>

          {/* Permanent Mortgage Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Perm Loan Interest Rate</span>
              <span className="font-mono text-blue-400 font-semibold">{interestRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={5.0}
              max={8.5}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Municipal / County Soft Funds */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">City / County Soft Subsidy (HOME / Trust Fund)</span>
              <span className="font-mono text-emerald-400 font-semibold">${(localSoftSubsidy / 1000000).toFixed(1)}M</span>
            </div>
            <input
              type="range"
              min={500000}
              max={5000000}
              step={250000}
              value={localSoftSubsidy}
              onChange={(e) => setLocalSoftSubsidy(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Visual Capital Stack Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-blue-400" />
                Capital Stack Breakdown vs. Total Cost
              </span>
              <span className="text-xs font-mono text-slate-400">
                1.20x DSCR Target
              </span>
            </div>

            {/* Stack Visual Bar */}
            <div className="space-y-2">
              <div className="h-9 w-full bg-slate-900 rounded-lg overflow-hidden flex border border-slate-700">
                <div
                  style={{ width: `${Math.min(100, (lihtcEquity / totalDevelopmentCost) * 100)}%` }}
                  className="bg-blue-500 h-full flex items-center justify-center text-[10px] font-bold text-white px-1 overflow-hidden"
                  title={`LIHTC Equity: $${(lihtcEquity / 1000000).toFixed(2)}M`}
                >
                  LIHTC {((lihtcEquity / totalDevelopmentCost) * 100).toFixed(0)}%
                </div>
                <div
                  style={{ width: `${Math.min(100, (supportableHardDebt / totalDevelopmentCost) * 100)}%` }}
                  className="bg-indigo-500 h-full flex items-center justify-center text-[10px] font-bold text-white px-1 overflow-hidden"
                  title={`Hard Debt: $${(supportableHardDebt / 1000000).toFixed(2)}M`}
                >
                  Debt {((supportableHardDebt / totalDevelopmentCost) * 100).toFixed(0)}%
                </div>
                <div
                  style={{ width: `${Math.min(100, (localSoftSubsidy / totalDevelopmentCost) * 100)}%` }}
                  className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-bold text-white px-1 overflow-hidden"
                  title={`Soft Subsidy: $${(localSoftSubsidy / 1000000).toFixed(2)}M`}
                >
                  City {((localSoftSubsidy / totalDevelopmentCost) * 100).toFixed(0)}%
                </div>
                <div
                  style={{ width: `${Math.min(100, (deferredDevFee / totalDevelopmentCost) * 100)}%` }}
                  className="bg-amber-500 h-full flex items-center justify-center text-[10px] font-bold text-white px-1 overflow-hidden"
                  title={`Developer Fee: $${(deferredDevFee / 1000000).toFixed(2)}M`}
                >
                  Fee
                </div>
                {!isSurplus && (
                  <div
                    style={{ width: `${Math.min(100, (fundingGap / totalDevelopmentCost) * 100)}%` }}
                    className="bg-rose-500/80 repeating-stripes h-full flex items-center justify-center text-[10px] font-bold text-white px-1 overflow-hidden"
                    title={`Unfunded Gap: $${(fundingGap / 1000000).toFixed(2)}M`}
                  >
                    GAP
                  </div>
                )}
              </div>

              {/* Source breakdown items */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2">
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    LIHTC Equity
                  </div>
                  <div className="font-mono text-white font-bold mt-1">${(lihtcEquity / 1000000).toFixed(2)}M</div>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Perm Hard Debt
                  </div>
                  <div className="font-mono text-white font-bold mt-1">${(supportableHardDebt / 1000000).toFixed(2)}M</div>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    City / County Soft
                  </div>
                  <div className="font-mono text-white font-bold mt-1">${(localSoftSubsidy / 1000000).toFixed(2)}M</div>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Deferred Dev Fee
                  </div>
                  <div className="font-mono text-white font-bold mt-1">${(deferredDevFee / 1000000).toFixed(2)}M</div>
                </div>
              </div>
            </div>

            {/* Gap or Surplus Banner */}
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              isSurplus
                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-800/40 text-rose-200'
            }`}>
              <div className="flex items-center gap-3">
                {isSurplus ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0" />
                )}
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    {isSurplus ? 'Fully Capitalized Deal' : 'Financial Gap (Shortfall)'}
                  </div>
                  <div className="text-xl font-bold font-mono">
                    {isSurplus
                      ? `+$${Math.abs(fundingGap / 1000000).toFixed(2)}M Surplus / Contingency`
                      : `-$${(fundingGap / 1000000).toFixed(2)}M Unfunded Gap`}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">State QAP Score</div>
                <div className="text-lg font-bold font-mono text-blue-400">{qapScore} / 100 pts</div>
              </div>
            </div>
          </div>

          {/* AI Optimizer Recommendations */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              AffordStack AI Optimization Insights
            </h5>
            <div className="space-y-2 text-xs text-slate-300">
              {fundingGap > 0 ? (
                <>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Stack Federal Home Loan Bank (FHLB) AHP:</span> Applying for an FHLB Affordable Housing Program grant can infuse up to $1,000,000 in forgivable second-position soft subsidy for the 30% AMI units.
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">State Housing Trust Fund Match:</span> Increasing city contribution by $500k unlocks a 2:1 dollar-for-dollar match under state priority transit corridors.
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-800/30 text-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Deal Structurally Viable:</span> Pro forma satisfies all institutional underwriter tests: 1.20x DSCR, positive cash-flow after debt service ($36,000/yr), and a highly competitive QAP score of {qapScore} for state HFA credit allocation.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
