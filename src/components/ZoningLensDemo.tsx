import React, { useState, useMemo } from 'react';
import { Home, Layers, DollarSign, AlertCircle, CheckCircle2, Ruler, Sparkles, Building2, MapPin } from 'lucide-react';

interface CityPreset {
  name: string;
  state: string;
  defaultLotWidth: number;
  defaultLotDepth: number;
  frontSetback: number;
  rearSetback: number;
  sideSetback: number;
  maxFar: number;
  maxHeight: number;
  codeName: string;
  notes: string;
}

const CITY_PRESETS: CityPreset[] = [
  {
    name: 'Austin',
    state: 'TX',
    defaultLotWidth: 50,
    defaultLotDepth: 120,
    frontSetback: 15,
    rearSetback: 5,
    sideSetback: 5,
    maxFar: 0.65,
    maxHeight: 32,
    codeName: 'Austin HOME Phase 2 (2024 Reform)',
    notes: 'Allows up to 3 residential units per lot by-right with eliminated minimum parking requirements within 1/2 mile of transit.'
  },
  {
    name: 'Oakland',
    state: 'CA',
    defaultLotWidth: 45,
    defaultLotDepth: 100,
    frontSetback: 20,
    rearSetback: 4,
    sideSetback: 4,
    maxFar: 0.55,
    maxHeight: 28,
    codeName: 'California SB 9 & Statewide ADU Law',
    notes: 'Allows 1 primary home + 1 detached ADU (up to 1,200 sq ft) + 1 Junior ADU (up to 500 sq ft) with ministerial 60-day approval.'
  },
  {
    name: 'Seattle',
    state: 'WA',
    defaultLotWidth: 40,
    defaultLotDepth: 110,
    frontSetback: 15,
    rearSetback: 10,
    sideSetback: 5,
    maxFar: 0.70,
    maxHeight: 30,
    codeName: 'Washington HB 1110 Middle Housing',
    notes: 'Permits duplexes, triplexes, and backyard cottages in all historically single-family residential zones.'
  },
  {
    name: 'Minneapolis',
    state: 'MN',
    defaultLotWidth: 45,
    defaultLotDepth: 125,
    frontSetback: 20,
    rearSetback: 10,
    sideSetback: 5,
    maxFar: 0.50,
    maxHeight: 28,
    codeName: 'Minneapolis 2040 Comprehensive Plan',
    notes: 'First major U.S. city to eliminate exclusive single-family zoning, legalizing triplexes citywide.'
  }
];

export const ZoningLensDemo: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityPreset>(CITY_PRESETS[0]);
  const [lotWidth, setLotWidth] = useState<number>(CITY_PRESETS[0].defaultLotWidth);
  const [lotDepth, setLotDepth] = useState<number>(CITY_PRESETS[0].defaultLotDepth);
  const [existingHouseSqFt, setExistingHouseSqFt] = useState<number>(1650);
  const [proposedAduType, setProposedAduType] = useState<'detached_2br' | 'detached_1br' | 'duplex_split'>('detached_2br');

  const handleCityChange = (city: CityPreset) => {
    setSelectedCity(city);
    setLotWidth(city.defaultLotWidth);
    setLotDepth(city.defaultLotDepth);
  };

  // Calculations
  const totalLotSqFt = lotWidth * lotDepth;
  const buildableWidth = Math.max(10, lotWidth - (selectedCity.sideSetback * 2));
  const buildableDepth = Math.max(10, lotDepth - selectedCity.frontSetback - selectedCity.rearSetback);
  const buildableFootprintSqFt = Math.max(0, buildableWidth * buildableDepth);
  const maxAllowableGrossSqFt = Math.round(totalLotSqFt * selectedCity.maxFar);
  const remainingAllowableSqFt = Math.max(0, maxAllowableGrossSqFt - existingHouseSqFt);

  const aduSpecs = useMemo(() => {
    switch (proposedAduType) {
      case 'detached_2br':
        return { name: '2-Bedroom Detached Cottage', sqft: 850, footprintWidth: 28, footprintDepth: 30, costPerSqFt: 290, estRent: 2400 };
      case 'detached_1br':
        return { name: '1-Bedroom Compact Infill ADU', sqft: 550, footprintWidth: 22, footprintDepth: 25, costPerSqFt: 310, estRent: 1850 };
      case 'duplex_split':
        return { name: 'Two-Story Duplex Addition (SB9 / HOME)', sqft: 1200, footprintWidth: 25, footprintDepth: 28, costPerSqFt: 275, estRent: 3500 };
    }
  }, [proposedAduType]);

  const estTotalBuildCost = aduSpecs.sqft * aduSpecs.costPerSqFt;
  const annualGrossRent = aduSpecs.estRent * 12;
  const capRate = ((annualGrossRent * 0.75) / estTotalBuildCost) * 100;
  const isAduCompliant = aduSpecs.sqft <= remainingAllowableSqFt && aduSpecs.footprintWidth <= buildableWidth;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Prototype Sandbox
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            ZoningLens AI: Spatial Parcel & ADU Modeler
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Simulate parcel boundaries, setback envelopes, and gentle density capacity under U.S. municipal zoning reform laws.
          </p>
        </div>

        {/* City Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {CITY_PRESETS.map((city) => (
            <button
              key={city.name}
              onClick={() => handleCityChange(city)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedCity.name === city.name
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 font-semibold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {city.name}, {city.state}
            </button>
          ))}
        </div>
      </div>

      {/* Ordinance context banner */}
      <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4 flex items-start gap-3 text-sm text-emerald-200">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-emerald-300">{selectedCity.codeName}:</span> {selectedCity.notes}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-emerald-400" />
            Parcel & Building Controls
          </h4>

          {/* Lot Width Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Lot Street Frontage (Width)</span>
              <span className="font-mono text-emerald-400 font-semibold">{lotWidth} ft</span>
            </div>
            <input
              type="range"
              min={30}
              max={80}
              step={5}
              value={lotWidth}
              onChange={(e) => setLotWidth(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Lot Depth Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Lot Depth</span>
              <span className="font-mono text-emerald-400 font-semibold">{lotDepth} ft</span>
            </div>
            <input
              type="range"
              min={70}
              max={150}
              step={5}
              value={lotDepth}
              onChange={(e) => setLotDepth(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Existing Primary Home */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Existing Primary Home</span>
              <span className="font-mono text-slate-200 font-semibold">{existingHouseSqFt} sq ft</span>
            </div>
            <input
              type="range"
              min={1000}
              max={3000}
              step={50}
              value={existingHouseSqFt}
              onChange={(e) => setExistingHouseSqFt(Number(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Proposed ADU Typology */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs text-slate-300 font-medium">Proposed Infill Typology</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'detached_2br', label: '2BR Detached Backyard Cottage (850 sq ft)' },
                { id: 'detached_1br', label: '1BR Compact Studio ADU (550 sq ft)' },
                { id: 'duplex_split', label: 'Two-Story Duplex Lot Split (1,200 sq ft)' }
              ].map((typology) => (
                <button
                  key={typology.id}
                  onClick={() => setProposedAduType(typology.id as any)}
                  className={`text-left text-xs p-2.5 rounded-lg border transition-all ${
                    proposedAduType === typology.id
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-medium'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {typology.label}
                </button>
              ))}
            </div>
          </div>

          {/* Municipal Setback Rules for Selected City */}
          <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2 text-xs">
            <div className="font-semibold text-slate-300 flex items-center justify-between">
              <span>Mandatory Setbacks ({selectedCity.name})</span>
              <span className="text-slate-500 font-mono">FAR {selectedCity.maxFar}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px]">Front</div>
                <div className="font-mono text-white font-bold">{selectedCity.frontSetback} ft</div>
              </div>
              <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px]">Rear</div>
                <div className="font-mono text-white font-bold">{selectedCity.rearSetback} ft</div>
              </div>
              <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px]">Side</div>
                <div className="font-mono text-white font-bold">{selectedCity.sideSetback} ft</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2D Canvas Visualization */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Live 2D Parcel Diagram (Scaled Relative to {lotWidth}' × {lotDepth}' Lot)
              </span>
              <span className="font-mono text-slate-400">Total: {totalLotSqFt.toLocaleString()} sq ft</span>
            </div>

            {/* SVG Visualizer */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] bg-emerald-950/10 border-2 border-dashed border-slate-700 rounded-lg p-4 flex flex-col justify-between overflow-hidden shadow-inner">
              {/* Street Label at Top */}
              <div className="absolute top-0 left-0 right-0 py-1 bg-slate-800/80 text-center text-[10px] font-mono tracking-widest text-slate-400 border-b border-slate-700">
                PUBLIC STREET FRONTAGE ({lotWidth} FT)
              </div>

              {/* Front Yard Setback Zone */}
              <div
                style={{ height: `${(selectedCity.frontSetback / lotDepth) * 100}%` }}
                className="w-full bg-amber-500/10 border-b border-amber-500/30 flex items-center justify-center text-[10px] font-mono text-amber-400/70"
              >
                Front Setback ({selectedCity.frontSetback} ft)
              </div>

              {/* Existing Main House */}
              <div className="w-[75%] h-[32%] mx-auto bg-blue-600/30 border-2 border-blue-500 rounded-md flex flex-col items-center justify-center text-center p-2 shadow-lg">
                <Home className="w-5 h-5 text-blue-400 mb-0.5" />
                <span className="text-xs font-bold text-white">Existing Primary Home</span>
                <span className="text-[10px] font-mono text-blue-300">{existingHouseSqFt} sq ft (1-2 Story)</span>
              </div>

              {/* Backyard Lawn / Transition Zone */}
              <div className="w-full flex-1 flex items-center justify-center">
                <span className="text-[10px] text-slate-600 italic">Backyard Outdoor Amenity Space</span>
              </div>

              {/* Proposed ADU Footprint */}
              <div
                style={{
                  width: `${(aduSpecs.footprintWidth / buildableWidth) * 85}%`,
                  height: '24%'
                }}
                className={`mx-auto rounded-md border-2 border-dashed flex flex-col items-center justify-center p-2 transition-all ${
                  isAduCompliant
                    ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                    : 'bg-rose-600/30 border-rose-400 text-rose-200'
                }`}
              >
                <Building2 className={`w-4 h-4 mb-0.5 ${isAduCompliant ? 'text-emerald-400' : 'text-rose-400'}`} />
                <span className="text-xs font-bold">Proposed {aduSpecs.name.split(' ')[0]} ADU</span>
                <span className="text-[10px] font-mono font-medium">{aduSpecs.sqft} sq ft</span>
              </div>

              {/* Rear Setback Zone */}
              <div
                style={{ height: `${(selectedCity.rearSetback / lotDepth) * 100}%` }}
                className="w-full bg-amber-500/10 border-t border-amber-500/30 flex items-center justify-center text-[10px] font-mono text-amber-400/70"
              >
                Rear Setback ({selectedCity.rearSetback} ft)
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-blue-500/40 border border-blue-400 rounded-sm"></span>
                Primary House
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-emerald-500/40 border border-emerald-400 rounded-sm"></span>
                Compliant ADU
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-amber-500/20 border border-amber-500/40 rounded-sm"></span>
                Protected Setbacks
              </span>
            </div>
          </div>

          {/* AI Metrics & Yield Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Allowed Gross Floor Area</div>
              <div className="text-xl font-bold font-mono text-white mt-1">
                {maxAllowableGrossSqFt.toLocaleString()} <span className="text-xs text-slate-500">sq ft</span>
              </div>
              <div className="text-[10px] text-emerald-400 mt-1">FAR {selectedCity.maxFar} Cap</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Est. Build Cost</div>
              <div className="text-xl font-bold font-mono text-white mt-1">
                ${(estTotalBuildCost / 1000).toFixed(0)}k
              </div>
              <div className="text-[10px] text-slate-400 mt-1">${aduSpecs.costPerSqFt}/sq ft turnkey</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Est. Monthly Rental</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                ${aduSpecs.estRent.toLocaleString()}<span className="text-xs text-slate-500">/mo</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">HUD FMR Local Benchmark</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Est. Unleveraged Cap Rate</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                {capRate.toFixed(1)}%
              </div>
              <div className="text-[10px] text-slate-400 mt-1">~{(estTotalBuildCost / (annualGrossRent * 0.75)).toFixed(1)} yr payback</div>
            </div>
          </div>

          {/* AI Zoning Verdict Card */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            isAduCompliant
              ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
              : 'bg-rose-950/20 border-rose-800/40 text-rose-200'
          }`}>
            {isAduCompliant ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="text-xs space-y-1">
              <div className="font-semibold text-sm">
                {isAduCompliant
                  ? 'AI Verdict: 100% By-Right Approval Eligible (Expedited Ministerial Review)'
                  : 'AI Verdict: Zoning FAR or Setback Limit Exceeded'}
              </div>
              <p className="text-slate-300">
                {isAduCompliant
                  ? `Under ${selectedCity.codeName}, this ${aduSpecs.sqft} sq ft unit qualifies for by-right administrative approval within 60 days without discretionary planning commission hearings or public notice requirements. Exempt from mandatory off-street parking.`
                  : `This proposed addition exceeds the remaining allowable lot FAR or infringes upon side/rear setback clearance. Try selecting a 1BR compact ADU typology or applying for a local rear-setback variance.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
