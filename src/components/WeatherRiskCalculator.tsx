import React, { useState } from 'react';
import {
  CloudRain,
  Thermometer,
  Droplets,
  AlertOctagon,
  CheckCircle,
  Wind,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const WeatherRiskCalculator: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(20);
  const [humidity, setHumidity] = useState<number>(85);
  const [leafWetnessHours, setLeafWetnessHours] = useState<number>(8);
  const [hasRecentRain, setHasRecentRain] = useState<boolean>(true);

  // Quick weather scenario presets
  const applyPreset = (temp: number, hum: number, wetness: number, rain: boolean) => {
    setTemperature(temp);
    setHumidity(hum);
    setLeafWetnessHours(wetness);
    setHasRecentRain(rain);
  };

  // Evaluate risk scores
  // Late Blight: thrives at 12-22C, >90% humidity, >8h wetness
  const lateBlightRisk = Math.min(
    100,
    Math.round(
      (temperature >= 12 && temperature <= 22 ? 40 : 10) +
        (humidity > 80 ? 35 : humidity > 65 ? 15 : 0) +
        (leafWetnessHours >= 6 ? 25 : 5)
    )
  );

  // Early Blight: thrives at 24-29C, >80% humidity, alternating wet/dry
  const earlyBlightRisk = Math.min(
    100,
    Math.round(
      (temperature >= 22 && temperature <= 30 ? 40 : 15) +
        (humidity > 70 ? 30 : 10) +
        (leafWetnessHours >= 4 ? 20 : 5) +
        (hasRecentRain ? 10 : 0)
    )
  );

  // Common Rust: thrives at 16-25C, >95% humidity or prolonged dew
  const rustRisk = Math.min(
    100,
    Math.round(
      (temperature >= 15 && temperature <= 25 ? 40 : 10) +
        (humidity > 85 ? 35 : 15) +
        (leafWetnessHours >= 6 ? 25 : 10)
    )
  );

  // Bacterial Blight: thrives at 25-34C, heavy rain/storms
  const bacterialRisk = Math.min(
    100,
    Math.round(
      (temperature >= 25 && temperature <= 34 ? 40 : 10) +
        (hasRecentRain ? 35 : 10) +
        (humidity > 80 ? 25 : 10)
    )
  );

  const overallMaxRisk = Math.max(
    lateBlightRisk,
    earlyBlightRisk,
    rustRisk,
    bacterialRisk
  );

  const getRiskStatus = (score: number) => {
    if (score >= 75) {
      return {
        level: 'Severe Outbreak Risk',
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        badge: 'High Alert',
        action: 'Immediate protective fungicide/bactericide spray advised prior to next precipitation event.'
      };
    }
    if (score >= 50) {
      return {
        level: 'Moderate Risk',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        badge: 'Caution',
        action: 'Close canopy inspection every 48 hours. Ensure adequate field drainage and improve air circulation.'
      };
    }
    return {
      level: 'Low Risk',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      badge: 'Favorable',
      action: 'Microclimate does not favor rapid fungal sporulation. Maintain standard crop scouting.'
    };
  };

  const status = getRiskStatus(overallMaxRisk);

  return (
    <div className="space-y-6">
      <div className="bouncy-card bg-white p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-[0_3px_0_0_#3730a3] animate-bouncy-wiggle">
                <CloudRain className="w-5 h-5" />
              </div>
              Microclimate Disease Risk Forecaster
            </h2>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              Simulate ambient field temperatures, leaf wetness duration, and moisture to predict fungal sporulation waves.
            </p>
          </div>

          {/* Quick presets with bouncy pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-black uppercase tracking-wider mr-1">Quick Scenarios:</span>
            <button
              onClick={() => applyPreset(17, 92, 10, true)}
              className="text-xs px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-black border border-emerald-300 shadow-[0_2px_0_0_#a7f3d0] bouncy-pill cursor-pointer"
            >
              Cool Damp Fog (Blight)
            </button>
            <button
              onClick={() => applyPreset(27, 85, 6, true)}
              className="text-xs px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-black border border-emerald-300 shadow-[0_2px_0_0_#a7f3d0] bouncy-pill cursor-pointer"
            >
              Warm Monsoon
            </button>
            <button
              onClick={() => applyPreset(28, 45, 1, false)}
              className="text-xs px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-black border border-emerald-300 shadow-[0_2px_0_0_#a7f3d0] bouncy-pill cursor-pointer"
            >
              Sunny Dry Day
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bouncy-card-subtle mb-6">
          {/* Temperature */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-500" />
                Air Temperature
              </span>
              <span className="font-black text-slate-900">{temperature}°C</span>
            </div>
            <input
              type="range"
              min="5"
              max="42"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[10px] font-semibold text-slate-500">Range: 5°C to 42°C</span>
          </div>

          {/* Humidity */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-500" />
                Relative Humidity
              </span>
              <span className="font-black text-slate-900">{humidity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[10px] font-semibold text-slate-500">Range: 20% to 100%</span>
          </div>

          {/* Leaf Wetness Hours */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-teal-600" />
                Continuous Leaf Wetness
              </span>
              <span className="font-black text-slate-900">{leafWetnessHours} hrs</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={leafWetnessHours}
              onChange={(e) => setLeafWetnessHours(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[10px] font-semibold text-slate-500">Hours of dew or moisture</span>
          </div>

          {/* Rain toggle */}
          <div className="flex flex-col justify-center">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              Recent Rainfall / Irrigation
            </span>
            <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasRecentRain}
                onChange={(e) => setHasRecentRain(e.target.checked)}
                className="w-5 h-5 text-emerald-600 rounded-md border-emerald-300 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-xs font-black text-slate-800">
                Rainfall in last 24-48 hrs
              </span>
            </label>
          </div>
        </div>

        {/* Calculated Risk Dashboard with 3D Shadow */}
        <div className={`p-6 rounded-2xl border-3 ${status.color} shadow-[0_6px_0_0_rgba(0,0,0,0.06)] mb-6 transition-all duration-300 hover:-translate-y-1`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase tracking-wider opacity-85">
                Composite Crop Infection Index
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mt-1">{status.level}</h3>
              <p className="text-xs sm:text-sm font-semibold mt-1 max-w-xl">{status.action}</p>
            </div>

            <div className="text-right">
              <div className="text-4xl sm:text-5xl font-black animate-bounce">{overallMaxRisk}%</div>
              <span className="text-[11px] font-black uppercase opacity-80">
                Pathogen Index
              </span>
            </div>
          </div>
        </div>

        {/* Individual Disease Risk Forecast Bars with Bouncy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Late Blight */}
          <div className="bouncy-card-subtle p-5">
            <div className="flex justify-between items-center mb-1.5">
              <div>
                <h4 className="font-black text-sm text-slate-900">
                  Late Blight (Phytophthora)
                </h4>
                <p className="text-[11px] font-semibold text-slate-500">Tomato, Potato crops</p>
              </div>
              <span
                className={`text-xs font-black px-3 py-1 rounded-full shadow-2xs bouncy-pill ${
                  lateBlightRisk >= 75
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : lateBlightRisk >= 50
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                {lateBlightRisk}% Risk
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mt-2.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  lateBlightRisk >= 75
                    ? 'bg-rose-500'
                    : lateBlightRisk >= 50
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${lateBlightRisk}%` }}
              ></div>
            </div>
            <p className="text-[11px] font-semibold text-slate-600 mt-2.5">
              Trigger: Cool 12-22°C + leaf wetness &gt; 6 hrs.
            </p>
          </div>

          {/* Early Blight */}
          <div className="bouncy-card-subtle p-5">
            <div className="flex justify-between items-center mb-1.5">
              <div>
                <h4 className="font-black text-sm text-slate-900">
                  Early Blight (Alternaria)
                </h4>
                <p className="text-[11px] font-semibold text-slate-500">Tomato, Potato, Pepper</p>
              </div>
              <span
                className={`text-xs font-black px-3 py-1 rounded-full shadow-2xs bouncy-pill ${
                  earlyBlightRisk >= 75
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : earlyBlightRisk >= 50
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                {earlyBlightRisk}% Risk
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mt-2.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  earlyBlightRisk >= 75
                    ? 'bg-rose-500'
                    : earlyBlightRisk >= 50
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${earlyBlightRisk}%` }}
              ></div>
            </div>
            <p className="text-[11px] font-semibold text-slate-600 mt-2.5">
              Trigger: Warm 24-29°C + alternating wet/dry cycles.
            </p>
          </div>

          {/* Common Rust */}
          <div className="bouncy-card-subtle p-5">
            <div className="flex justify-between items-center mb-1.5">
              <div>
                <h4 className="font-black text-sm text-slate-900">
                  Rust Fungi (Puccinia)
                </h4>
                <p className="text-[11px] font-semibold text-slate-500">Corn, Wheat, Cereal crops</p>
              </div>
              <span
                className={`text-xs font-black px-3 py-1 rounded-full shadow-2xs bouncy-pill ${
                  rustRisk >= 75
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : rustRisk >= 50
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                {rustRisk}% Risk
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mt-2.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  rustRisk >= 75
                    ? 'bg-rose-500'
                    : rustRisk >= 50
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${rustRisk}%` }}
              ></div>
            </div>
            <p className="text-[11px] font-semibold text-slate-600 mt-2.5">
              Trigger: High humidity &gt; 85% with continuous morning dew.
            </p>
          </div>

          {/* Bacterial Blight */}
          <div className="bouncy-card-subtle p-5">
            <div className="flex justify-between items-center mb-1.5">
              <div>
                <h4 className="font-black text-sm text-slate-900">
                  Bacterial Leaf Blight (Xanthomonas)
                </h4>
                <p className="text-[11px] font-semibold text-slate-500">Rice, Pepper, Solanaceous</p>
              </div>
              <span
                className={`text-xs font-black px-3 py-1 rounded-full shadow-2xs bouncy-pill ${
                  bacterialRisk >= 75
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : bacterialRisk >= 50
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                {bacterialRisk}% Risk
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mt-2.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  bacterialRisk >= 75
                    ? 'bg-rose-500'
                    : bacterialRisk >= 50
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${bacterialRisk}%` }}
              ></div>
            </div>
            <p className="text-[11px] font-semibold text-slate-600 mt-2.5">
              Trigger: Driving wind-blown rain + temperatures &gt; 25°C.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
