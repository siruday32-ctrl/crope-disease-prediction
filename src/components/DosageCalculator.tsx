import React, { useState } from 'react';
import {
  Calculator,
  AlertCircle,
  Shield,
  Clock,
  Sparkles,
  Droplet
} from 'lucide-react';

interface ChemicalPreset {
  name: string;
  type: 'Chemical Fungicide' | 'Bio-Pesticide' | 'Copper Compound' | 'Organic Oil';
  defaultRatePerLiter: number; // in grams or ml
  unit: 'g' | 'ml';
  phiDays: number; // Pre-harvest interval
  reiHours: number; // Re-entry interval
  notes: string;
}

const CHEMICAL_PRESETS: ChemicalPreset[] = [
  {
    name: 'Mancozeb 75% WP (Contact Protectant)',
    type: 'Chemical Fungicide',
    defaultRatePerLiter: 2.5,
    unit: 'g',
    phiDays: 7,
    reiHours: 24,
    notes: 'Broad-spectrum contact protectant against early blight, downy mildew, and leaf spots.'
  },
  {
    name: 'Chlorothalonil 75% WP (Bravo / Echo)',
    type: 'Chemical Fungicide',
    defaultRatePerLiter: 2.0,
    unit: 'g',
    phiDays: 7,
    reiHours: 12,
    notes: 'Multi-site preventive fungicide for foliar application. Do not mix with oil surfactants.'
  },
  {
    name: 'Metalaxyl + Mancozeb (Ridomil Gold)',
    type: 'Chemical Fungicide',
    defaultRatePerLiter: 2.5,
    unit: 'g',
    phiDays: 14,
    reiHours: 48,
    notes: 'Systemic curative + protective fungicide specifically targeted for Late Blight (Phytophthora).'
  },
  {
    name: 'Copper Oxychloride 50% WP (Fixed Copper)',
    type: 'Copper Compound',
    defaultRatePerLiter: 3.0,
    unit: 'g',
    phiDays: 1,
    reiHours: 24,
    notes: 'Controls bacterial leaf blights and fungal spots. OMRI-listed formulations available.'
  },
  {
    name: 'Azoxystrobin 23% SC (Amistar)',
    type: 'Chemical Fungicide',
    defaultRatePerLiter: 1.0,
    unit: 'ml',
    phiDays: 3,
    reiHours: 4,
    notes: 'Strobilurin broad-spectrum translaminar protection. Rotate with different MoA.'
  },
  {
    name: 'Cold-Pressed Neem Oil (3000 ppm Azadirachtin)',
    type: 'Organic Oil',
    defaultRatePerLiter: 5.0,
    unit: 'ml',
    phiDays: 0,
    reiHours: 4,
    notes: 'Botanical repellent and fungal inhibitor. Spray during early morning or dusk.'
  },
  {
    name: 'Potassium Bicarbonate (MilStop / Armicarb)',
    type: 'Bio-Pesticide',
    defaultRatePerLiter: 3.5,
    unit: 'g',
    phiDays: 0,
    reiHours: 1,
    notes: 'Organic contact curative for powdery mildews and early blight spots.'
  }
];

export const DosageCalculator: React.FC = () => {
  const [selectedChemicalIdx, setSelectedChemicalIdx] = useState<number>(0);
  const [fieldArea, setFieldArea] = useState<number>(1);
  const [areaUnit, setAreaUnit] = useState<'acres' | 'hectares'>('acres');
  const [tankCapacityLiters, setTankCapacityLiters] = useState<number>(16); // Standard 16L knapsack
  const [customRate, setCustomRate] = useState<number | null>(null);

  const chemical = CHEMICAL_PRESETS[selectedChemicalIdx];
  const ratePerLiter = customRate !== null ? customRate : chemical.defaultRatePerLiter;

  // Typical spray water volume: ~150-200 Liters per acre (400 Liters per hectare)
  const waterVolumePerArea = areaUnit === 'acres' ? 180 : 450;
  const totalWaterLiters = Math.round(fieldArea * waterVolumePerArea);
  const totalProductNeeded = Math.round(totalWaterLiters * ratePerLiter);
  const amountPerTank = Math.round(tankCapacityLiters * ratePerLiter * 10) / 10;
  const numberOfTanks = Math.ceil(totalWaterLiters / tankCapacityLiters);

  return (
    <div className="space-y-6">
      <div className="bouncy-card bg-white p-5 sm:p-7">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-[0_3px_0_0_#047857] animate-bouncy-wiggle">
              <Calculator className="w-5 h-5" />
            </div>
            Agricultural Spray & Fungicide Dosage Calculator
          </h2>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            Calibrate precise active dilution rates, tank mix quantities, and safety intervals for agricultural treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Treatment Product Selection */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                Treatment Chemical / Botanical Solution
              </label>
              <select
                value={selectedChemicalIdx}
                onChange={(e) => {
                  setSelectedChemicalIdx(Number(e.target.value));
                  setCustomRate(null);
                }}
                className="w-full text-sm font-black bg-white border-2 border-emerald-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-[0_3px_0_0_#d1fae5] bouncy-pill cursor-pointer"
              >
                {CHEMICAL_PRESETS.map((preset, idx) => (
                  <option key={idx} value={idx}>
                    {preset.name} ({preset.type})
                  </option>
                ))}
              </select>
              <p className="text-xs font-semibold text-slate-600 mt-1.5">{chemical.notes}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Field Size */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Field Area Size
                </label>
                <div className="flex">
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={fieldArea}
                    onChange={(e) => setFieldArea(Math.max(0.1, Number(e.target.value)))}
                    className="w-full text-sm font-black bg-white border-2 border-emerald-200 rounded-l-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                  />
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value as 'acres' | 'hectares')}
                    className="text-xs font-black bg-emerald-50 border-2 border-l-0 border-emerald-200 rounded-r-xl px-2.5 text-slate-800 cursor-pointer"
                  >
                    <option value="acres">Acres</option>
                    <option value="hectares">Hectares</option>
                  </select>
                </div>
              </div>

              {/* Sprayer Tank Capacity */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Sprayer Tank Size
                </label>
                <select
                  value={tankCapacityLiters}
                  onChange={(e) => setTankCapacityLiters(Number(e.target.value))}
                  className="w-full text-sm font-black bg-white border-2 border-emerald-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs cursor-pointer"
                >
                  <option value={16}>16 L (Standard Knapsack)</option>
                  <option value={20}>20 L (Motorized Knapsack)</option>
                  <option value={100}>100 L (Trolley Power Sprayer)</option>
                  <option value={400}>400 L (Tractor Boom Sprayer)</option>
                  <option value={500}>500 L (Commercial Orchard Rig)</option>
                </select>
              </div>

              {/* Recommended Dilution Rate */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Dilution Rate ({chemical.unit}/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={ratePerLiter}
                  onChange={(e) => setCustomRate(Number(e.target.value))}
                  className="w-full text-sm font-black bg-white border-2 border-emerald-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>
            </div>

            {/* Safety & Compliance Card */}
            <div className="bouncy-card-subtle p-5 bg-amber-50/70 border-2 border-amber-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-2 mb-2.5">
                <Shield className="w-4 h-4 text-amber-700" />
                Safety Intervals & Worker Protection
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">Pre-Harvest Interval (PHI):</span>
                  <span className="font-black text-slate-900 text-sm">
                    {chemical.phiDays} {chemical.phiDays === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Re-entry Interval (REI):</span>
                  <span className="font-black text-slate-900 text-sm">
                    {chemical.reiHours} hours
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Required Gear:</span>
                  <span className="font-black text-slate-900 text-sm">
                    Gloves, Mask, Goggles
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Box with 3D Bouncy Feel */}
          <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 text-white rounded-3xl p-6 flex flex-col justify-between border-3 border-emerald-950 shadow-[0_8px_0_0_#064e3b] transition-transform duration-300 hover:-translate-y-1">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-200 bg-white/15 px-2.5 py-0.5 rounded-full">
                Mix Calibration Results
              </span>
              <h3 className="text-xl sm:text-2xl font-black mt-2 text-white tracking-tight">
                Tank Batch Preparation
              </h3>

              <div className="mt-6 space-y-4">
                <div className="p-4 bg-emerald-900/60 rounded-2xl border-2 border-emerald-500/40">
                  <span className="text-xs text-emerald-200 block font-bold">
                    Product per single {tankCapacityLiters}L Tank Load:
                  </span>
                  <span className="text-3xl font-black text-white mt-1 block">
                    {amountPerTank} {chemical.unit}
                  </span>
                  <span className="text-[11px] text-emerald-200/90 block mt-1 font-semibold">
                    Dissolve completely before filling tank to brim
                  </span>
                </div>

                <div className="p-4 bg-emerald-900/60 rounded-2xl border-2 border-emerald-500/40">
                  <span className="text-xs text-emerald-200 block font-bold">
                    Total Product Needed for {fieldArea} {areaUnit}:
                  </span>
                  <span className="text-3xl font-black text-white mt-1 block">
                    {totalProductNeeded > 1000 && chemical.unit === 'g'
                      ? `${(totalProductNeeded / 1000).toFixed(2)} kg`
                      : totalProductNeeded > 1000 && chemical.unit === 'ml'
                      ? `${(totalProductNeeded / 1000).toFixed(2)} Liters`
                      : `${totalProductNeeded} ${chemical.unit}`}
                  </span>
                  <span className="text-[11px] text-emerald-200/90 block mt-1 font-semibold">
                    Based on ~{totalWaterLiters} L total spray water volume
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-emerald-100 pt-2 border-t border-emerald-600">
                  <span className="font-bold">Total Sprayer Tank Refills:</span>
                  <span className="font-black text-base text-white animate-bounce">
                    {numberOfTanks} {numberOfTanks === 1 ? 'tank' : 'tanks'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-emerald-200 font-semibold mt-6 pt-3 border-t border-emerald-600">
              * Always test spray water pH (optimal: 6.0 - 7.0) to prevent rapid chemical hydrolytic breakdown.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
