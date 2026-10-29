import React, { useState, useMemo } from 'react';
import {
  CloudLightning,
  CloudRain,
  ThermometerSnowflake,
  SunMedium,
  Wind,
  ShieldAlert,
  AlertTriangle,
  Clock,
  Droplets,
  Calendar,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Sprout,
  ArrowRight,
  Flame,
  Info
} from 'lucide-react';
import { CropType } from '../types';
import { CROP_LIST, CROP_DISEASES } from '../data/cropDiseases';

interface WeatherScenario {
  id: string;
  title: string;
  icon: any;
  tempChange: string;
  humidityChange: string;
  rainfall: string;
  desc: string;
  tempVal: number;
  humidityVal: number;
  wetnessHours: number;
  hasStormWind: boolean;
}

const WEATHER_CHANGE_SCENARIOS: WeatherScenario[] = [
  {
    id: 'cold_wet_spell',
    title: 'Sudden Cold Rain & Fog',
    icon: ThermometerSnowflake,
    tempChange: 'Drops from 25°C → 16°C',
    humidityChange: 'Surges to 95% RH',
    rainfall: 'Persistent drizzle / 30mm rain',
    desc: 'Cool overcast conditions with continuous leaf wetness lasting over 10 hours.',
    tempVal: 16,
    humidityVal: 95,
    wetnessHours: 12,
    hasStormWind: false,
  },
  {
    id: 'warm_monsoon_storm',
    title: 'Warm Monsoon & Wind Splash',
    icon: CloudLightning,
    tempChange: 'Remains warm at 28°C - 32°C',
    humidityChange: 'High 88% - 95% RH',
    rainfall: 'Heavy downpour & gusty winds',
    desc: 'Driving rainstorms causing leaf abrasion and splashing waterlogged soil onto canopies.',
    tempVal: 29,
    humidityVal: 92,
    wetnessHours: 8,
    hasStormWind: true,
  },
  {
    id: 'persistent_dew_fog',
    title: 'Heavy Morning Fog & High Dew',
    icon: Droplets,
    tempChange: 'Moderate 18°C - 23°C',
    humidityChange: '85% - 90% RH',
    rainfall: 'No heavy rain, but heavy dew',
    desc: 'Dense morning fog and dew that clings to foliage well into late morning.',
    tempVal: 20,
    humidityVal: 88,
    wetnessHours: 9,
    hasStormWind: false,
  },
  {
    id: 'alternating_rain_sun',
    title: 'Intermittent Rain & Sunny Breaks',
    icon: SunMedium,
    tempChange: 'Warm 24°C - 28°C',
    humidityChange: 'Fluctuating 75% - 85% RH',
    rainfall: 'Showers followed by direct sun',
    desc: 'Creates a natural greenhouse humidity chamber with rapid thermal fluctuations.',
    tempVal: 26,
    humidityVal: 80,
    wetnessHours: 5,
    hasStormWind: false,
  },
  {
    id: 'extreme_heatwave',
    title: 'Dry Heatwave & Drought Stress',
    icon: Flame,
    tempChange: 'Spikes to 36°C - 40°C',
    humidityChange: 'Plummets to 25% - 35% RH',
    rainfall: 'Zero rain, hot dry winds',
    desc: 'Extreme heat stress causing stomatal shutdown and rapid sap-sucking pest explosions.',
    tempVal: 38,
    humidityVal: 30,
    wetnessHours: 0,
    hasStormWind: true,
  },
];

interface PredictedDiseaseOutcome {
  primaryDisease: string;
  scientificName: string;
  pathogen: string;
  riskProbability: number;
  vulnerabilityBadge: string;
  symptomOnsetDays: string;
  infectionMechanism: string;
  secondaryDiseases: Array<{ name: string; probability: number }>;
  preWeatherActions: string[];
  postWeatherActions: string[];
  recommendedSpray: {
    organic: string;
    chemical: string;
  };
}

export const WeatherDiseasePredictor: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<CropType>('Tomato');
  const [growthStage, setGrowthStage] = useState<string>('Vegetative Growth');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('cold_wet_spell');
  
  // Custom weather overrides
  const [forecastTemp, setForecastTemp] = useState<number>(16);
  const [forecastHumidity, setForecastHumidity] = useState<number>(95);
  const [leafWetnessHours, setLeafWetnessHours] = useState<number>(12);
  const [hasStormWind, setHasStormWind] = useState<boolean>(false);

  const handleScenarioChange = (scenario: WeatherScenario) => {
    setSelectedScenarioId(scenario.id);
    setForecastTemp(scenario.tempVal);
    setForecastHumidity(scenario.humidityVal);
    setLeafWetnessHours(scenario.wetnessHours);
    setHasStormWind(scenario.hasStormWind);
  };

  // Weather disease prediction engine
  const prediction: PredictedDiseaseOutcome = useMemo(() => {
    // 1. Evaluate crop specific sensitivities to this weather pattern
    if (selectedCrop === 'Tomato') {
      if (forecastTemp <= 22 && forecastHumidity >= 85 && leafWetnessHours >= 8) {
        return {
          primaryDisease: 'Late Blight (Phytophthora)',
          scientificName: 'Phytophthora infestans',
          pathogen: 'Oomycete Fungal-like',
          riskProbability: Math.min(98, 75 + leafWetnessHours * 2),
          vulnerabilityBadge: 'Critical Outbreak Alert',
          symptomOnsetDays: '2 to 4 days after cold rain event',
          infectionMechanism:
            'Free water on foliage allows biflagellate zoospores to encyst and penetrate epidermal leaf tissue within 2 to 3 hours.',
          secondaryDiseases: [
            { name: 'Bacterial Speck (Pseudomonas)', probability: 74 },
            { name: 'Early Blight (Alternaria)', probability: 48 },
          ],
          preWeatherActions: [
            'Apply protectant Mancozeb (2.5g/L) or Copper Hydroxide (2.0g/L) 12-24 hours before rain begins.',
            'Ensure all tomato plants are properly staked off the ground.',
            'Clear field drainage swales to prevent standing root water.',
          ],
          postWeatherActions: [
            'Scout leaf undersides for white sporulation in morning hours.',
            'Apply translaminar systemic curative (e.g., Metalaxyl + Mancozeb / Ridomil Gold @ 2.5g/L) if water-soaked lesions appear.',
            'Prune and destroy infected stems immediately; do not leave on soil floor.',
          ],
          recommendedSpray: {
            organic: 'Copper Octanoate or Fixed Bordeaux Mixture @ 3g/L',
            chemical: 'Cymoxanil + Mancozeb (Curzate) @ 2.5g/L water',
          },
        };
      }
      if (forecastTemp >= 24 && forecastTemp <= 30 && forecastHumidity >= 75) {
        return {
          primaryDisease: 'Early Blight (Target Spot)',
          scientificName: 'Alternaria solani',
          pathogen: 'Fungal',
          riskProbability: 88,
          vulnerabilityBadge: 'High Risk',
          symptomOnsetDays: '4 to 6 days after rain break',
          infectionMechanism:
            'Alternating moist and sunny periods triggers rapid spore germination and concentric brown lesion expansion on lower canopy.',
          secondaryDiseases: [
            { name: 'Septoria Leaf Spot', probability: 81 },
            { name: 'Anthracnose Fruit Rot', probability: 62 },
          ],
          preWeatherActions: [
            'Apply protective Chlorothalonil 75% WP @ 2g/L before rainfall.',
            'Mulch around plant bases to prevent raindrop soil-splash.',
          ],
          postWeatherActions: [
            'Prune the lower 12 inches of foliage to enhance canopy ventilation.',
            'Rotate fungicide classes with Azoxystrobin or Difenoconazole.',
          ],
          recommendedSpray: {
            organic: 'Bacillus subtilis bio-fungicide foliar spray @ 5g/L',
            chemical: 'Chlorothalonil or Difenoconazole 25% EC @ 0.5ml/L',
          },
        };
      }
      if (forecastTemp >= 33 && forecastHumidity <= 45) {
        return {
          primaryDisease: 'Tomato Yellow Leaf Curl & Blossom Drop',
          scientificName: 'Begomovirus / TYLCV Vector Outbreak',
          pathogen: 'Viral / Insect Vector',
          riskProbability: 85,
          vulnerabilityBadge: 'Moderate-High Stress Alert',
          symptomOnsetDays: '7 to 10 days (whitefly reproduction surge)',
          infectionMechanism:
            'Hot dry spells accelerate whitefly reproductive cycles, leading to intense vector feeding and viral transmission.',
          secondaryDiseases: [
            { name: 'Spider Mite Infestation', probability: 89 },
            { name: 'Blossom End Rot (Calcium deficit)', probability: 76 },
          ],
          preWeatherActions: [
            'Install yellow sticky insect traps across rows.',
            'Increase irrigation frequency to prevent acute plant water stress.',
          ],
          postWeatherActions: [
            'Spray cold-pressed Neem oil (5ml/L) at dusk to suppress whitefly adults.',
            'Apply calcium nitrate foliar spray to prevent blossom end rot.',
          ],
          recommendedSpray: {
            organic: 'Neem Oil + Potassium Soap @ 5ml/L',
            chemical: 'Acetamiprid 20% SP @ 0.4g/L or Imidacloprid @ 0.5ml/L',
          },
        };
      }
    }

    if (selectedCrop === 'Potato') {
      if (forecastTemp <= 22 && forecastHumidity >= 80) {
        return {
          primaryDisease: 'Late Blight (Irish Famine Blight)',
          scientificName: 'Phytophthora infestans',
          pathogen: 'Oomycete Fungal-like',
          riskProbability: 95,
          vulnerabilityBadge: 'Critical Outbreak Alert',
          symptomOnsetDays: '3 to 5 days',
          infectionMechanism:
            'Cool temperatures coupled with continuous foliage dampness promotes rapid zoosporangia germination and vine collapse.',
          secondaryDiseases: [
            { name: 'Blackleg (Pectobacterium)', probability: 68 },
            { name: 'Early Blight', probability: 52 },
          ],
          preWeatherActions: [
            'Spray contact protectant Mancozeb (2.5g/L) prior to the rain front.',
            'Hill up potato rows deeply to protect tubers from spore wash-down.',
          ],
          postWeatherActions: [
            'Apply systemic Mandipropamid or Fluopicolide if lesions appear.',
            'Do not harvest tubers from wet soil.',
          ],
          recommendedSpray: {
            organic: 'Fixed Copper Hydroxide @ 2.5g/L',
            chemical: 'Ridomil Gold MZ @ 2.5g/L water',
          },
        };
      }
    }

    if (selectedCrop === 'Corn (Maize)') {
      if (forecastHumidity >= 85 || leafWetnessHours >= 8) {
        return {
          primaryDisease: 'Common Rust (Puccinia sorghi)',
          scientificName: 'Puccinia sorghi',
          pathogen: 'Fungal Rust',
          riskProbability: 91,
          vulnerabilityBadge: 'High Outbreak Alert',
          symptomOnsetDays: '5 to 7 days',
          infectionMechanism:
            'Airborne urediniospores germinate when free water is present on maize blades for over 6 hours at moderate temperatures.',
          secondaryDiseases: [
            { name: 'Northern Corn Leaf Blight', probability: 79 },
            { name: 'Gray Leaf Spot', probability: 64 },
          ],
          preWeatherActions: [
            'Scout lower leaves for early pustule pinpoints before rain.',
            'Apply prophylactic Azoxystrobin + Propiconazole at pre-tassel stage.',
          ],
          postWeatherActions: [
            'Maintain plant nutrition; avoid excessive nitrogen that softens leaf cuticle.',
            'Check upper leaves surrounding ear leaf for cinnamon spore dust.',
          ],
          recommendedSpray: {
            organic: 'Wettable Sulfur 80% WDG @ 3g/L',
            chemical: 'Pyraclostrobin (Headline) or Tebuconazole @ 1ml/L',
          },
        };
      }
    }

    if (selectedCrop === 'Rice') {
      if (hasStormWind || (forecastTemp >= 25 && forecastHumidity >= 85)) {
        return {
          primaryDisease: 'Bacterial Leaf Blight (BLB)',
          scientificName: 'Xanthomonas oryzae pv. oryzae',
          pathogen: 'Bacterial',
          riskProbability: 93,
          vulnerabilityBadge: 'Severe Epidemic Risk',
          symptomOnsetDays: '3 to 6 days after windstorm',
          infectionMechanism:
            'Gusty storm winds whip leaves together creating microscopic wounds through which waterborne Xanthomonas bacteria enter.',
          secondaryDiseases: [
            { name: 'Rice Blast (Pyricularia)', probability: 82 },
            { name: 'Sheath Blight (Rhizoctonia)', probability: 75 },
          ],
          preWeatherActions: [
            'Drain standing water from paddy fields to 2-3cm depth.',
            'Avoid late top-dressing of chemical nitrogen fertilizer.',
          ],
          postWeatherActions: [
            'Apply Streptomycin + Tetracycline spray @ 1g/10L immediately post-storm.',
            'Spray Pseudomonas fluorescens biocontrol agent.',
          ],
          recommendedSpray: {
            organic: 'Pseudomonas fluorescens 2% WP @ 10g/L foliar spray',
            chemical: 'Copper Oxychloride 50% WP (2.5g/L) + Plantomycin (1g/10L)',
          },
        };
      }
    }

    if (selectedCrop === 'Apple') {
      if (leafWetnessHours >= 9 && forecastTemp >= 12 && forecastTemp <= 22) {
        return {
          primaryDisease: 'Apple Scab (Mills Period Infection)',
          scientificName: 'Venturia inaequalis',
          pathogen: 'Fungal',
          riskProbability: 94,
          vulnerabilityBadge: 'Critical Infection Window',
          symptomOnsetDays: '9 to 14 days after wetting period',
          infectionMechanism:
            'Mills criteria satisfied: Spring rainfall discharges ascospores from orchard floor onto young green leaf clusters.',
          secondaryDiseases: [
            { name: 'Cedar Apple Rust', probability: 72 },
            { name: 'Powdery Mildew', probability: 60 },
          ],
          preWeatherActions: [
            'Apply Captan 50% WP or Mancozeb 12-18 hours before rain front arrives.',
            'Prune dense canopy shoots to speed leaf drying.',
          ],
          postWeatherActions: [
            'Apply kickback curative fungicide (Difenoconazole or Myclobutanil) within 72 hours of rain start.',
          ],
          recommendedSpray: {
            organic: 'Liquid Lime Sulfur or Micronized Wettable Sulfur @ 3g/L',
            chemical: 'Difenoconazole 25% EC @ 0.5ml/L (Score) or Captan @ 2.5g/L',
          },
        };
      }
    }

    if (selectedCrop === 'Grape') {
      if (forecastTemp >= 20 && forecastHumidity >= 80) {
        return {
          primaryDisease: 'Black Rot & Downy Mildew',
          scientificName: 'Guignardia bidwellii / Plasmopara viticola',
          pathogen: 'Fungal',
          riskProbability: 92,
          vulnerabilityBadge: 'High Risk Alert',
          symptomOnsetDays: '4 to 7 days',
          infectionMechanism:
            'Warm rains splash overwintered mummified spore pycnidia onto tender vineyard shoots and juvenile flower clusters.',
          secondaryDiseases: [
            { name: 'Powdery Mildew (Uncinula)', probability: 76 },
            { name: 'Botrytis Bunch Rot', probability: 58 },
          ],
          preWeatherActions: [
            'Apply Bordeaux mixture or Mancozeb before vineyard wetting.',
            'Trellis shoot tucking to maximize canopy airflow.',
          ],
          postWeatherActions: [
            'Inspect cluster clusters for circular brown spots with pycnidia rims.',
            'Apply Myclobutanil or Azoxystrobin post-rain.',
          ],
          recommendedSpray: {
            organic: 'Bordeaux Mixture (Copper sulfate + Hydrated lime) @ 1%',
            chemical: 'Myclobutanil 40% WSP @ 0.5g/L or Mancozeb @ 2.5g/L',
          },
        };
      }
    }

    // Default general foliar outbreak prediction
    return {
      primaryDisease: `${selectedCrop} Foliar Blight & Leaf Spot`,
      scientificName: 'Alternaria / Cercospora Complex',
      pathogen: 'Fungal Spot',
      riskProbability: 82,
      vulnerabilityBadge: 'Moderate-High Alert',
      symptomOnsetDays: '4 to 7 days after weather transition',
      infectionMechanism:
        'Elevated ambient humidity and leaf condensation provide required free moisture for conidial spore germ tube elongation.',
      secondaryDiseases: [
        { name: 'Anthracnose Rot', probability: 67 },
        { name: 'Bacterial Spot', probability: 58 },
      ],
      preWeatherActions: [
        'Apply broad-spectrum protective copper or contact fungicide.',
        'Clear weeds around field perimeter to reduce microclimate humidity.',
      ],
      postWeatherActions: [
        'Check leaves 3 days post-weather for early necrotic pinholes.',
        'Ensure soil drainage to avoid root hypoxia.',
      ],
      recommendedSpray: {
        organic: 'Copper Hydroxide 50% WP @ 2g/L or Bacillus subtilis',
        chemical: 'Mancozeb 75% WP @ 2.5g/L',
      },
    };
  }, [selectedCrop, forecastTemp, forecastHumidity, leafWetnessHours, hasStormWind]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bouncy-card bg-white p-5 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
                Predictive Agronomy Engine
              </span>
              <span className="text-xs text-slate-600 font-bold">
                Pathogen Microclimate Modeling
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-[0_3px_0_0_#047857] animate-bouncy-wiggle">
                <CloudRain className="w-6 h-6" />
              </div>
              Predict Plant Disease by Weather Change
            </h2>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              Forecast which foliar pathogens and bacterial diseases will emerge on your crops when upcoming weather shifts occur.
            </p>
          </div>
        </div>

        {/* Step 1: Crop & Stage Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bouncy-card-subtle mb-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              1. Target Plant / Crop Species
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value as CropType)}
              className="w-full text-sm font-black bg-white border-2 border-emerald-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 shadow-[0_3px_0_0_#d1fae5] bouncy-pill cursor-pointer"
            >
              {CROP_LIST.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              2. Crop Growth Stage
            </label>
            <select
              value={growthStage}
              onChange={(e) => setGrowthStage(e.target.value)}
              className="w-full text-sm font-black bg-white border-2 border-emerald-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 shadow-[0_3px_0_0_#d1fae5] bouncy-pill cursor-pointer"
            >
              <option value="Seedling / Emergence">Seedling / Young Transplant</option>
              <option value="Vegetative Growth">Vegetative Growth (Rapid foliage expansion)</option>
              <option value="Flowering / Tasseling">Flowering / Tasseling / Bloom</option>
              <option value="Fruit / Grain Filling">Fruit Setting / Tuber Bulking / Grain Fill</option>
              <option value="Pre-Harvest Maturity">Ripening / Pre-Harvest Maturity</option>
            </select>
          </div>
        </div>

        {/* Step 2: Weather Change Scenarios */}
        <div className="mb-6">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
            3. Select Incoming Weather Change / Forecast Event:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {WEATHER_CHANGE_SCENARIOS.map((scenario) => {
              const Icon = scenario.icon;
              const isSelected = selectedScenarioId === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioChange(scenario)}
                  className={`p-4 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-3 border-emerald-600 bg-emerald-50/90 shadow-[0_6px_0_0_#059669] scale-[1.02] -translate-y-1'
                      : 'border-2 border-emerald-100 bg-white hover:bg-emerald-50/50 hover:border-emerald-300 shadow-[0_4px_0_0_#d1fae5] hover:-translate-y-1 active:translate-y-1 active:shadow-none'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-xs scale-110'
                            : 'bg-emerald-100 text-slate-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-0.5 rounded-full shadow-2xs animate-pulse">
                          Active Forecast
                        </span>
                      )}
                    </div>
                    <h4 className="font-black text-sm text-slate-900">{scenario.title}</h4>
                    <p className="text-xs font-medium text-slate-600 mt-1 line-clamp-2">{scenario.desc}</p>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-emerald-200 text-[11px] font-black text-emerald-800">
                    {scenario.tempChange} • {scenario.humidityChange}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fine-tune parameters */}
        <div className="p-5 rounded-2xl bouncy-card-subtle mb-6">
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              Fine-Tune Forecasted Weather Shift Parameters:
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Dynamic Live Simulation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Forecast Temp</span>
                <span className="font-black text-slate-900">{forecastTemp}°C</span>
              </div>
              <input
                type="range"
                min="5"
                max="42"
                value={forecastTemp}
                onChange={(e) => setForecastTemp(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Forecast Humidity</span>
                <span className="font-black text-slate-900">{forecastHumidity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={forecastHumidity}
                onChange={(e) => setForecastHumidity(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Leaf Wetness Duration</span>
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
            </div>

            <div className="flex items-center">
              <label className="inline-flex items-center gap-2.5 cursor-pointer pt-2 select-none">
                <input
                  type="checkbox"
                  checked={hasStormWind}
                  onChange={(e) => setHasStormWind(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded-md border-emerald-300 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="text-xs font-black text-slate-800">
                  Gusty Storm Winds / Hail Splash
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Prediction Output Bouncy Card */}
        <div className="rounded-3xl border-3 border-rose-300 bg-white overflow-hidden shadow-[0_8px_0_0_#fecdd3] transition-transform duration-300 hover:-translate-y-1">
          {/* Output Header */}
          <div className="p-5 sm:p-6 border-b-3 border-rose-200 bg-rose-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-black uppercase tracking-wider bg-rose-600 text-white px-3 py-1 rounded-full shadow-xs bouncy-pill">
                  {prediction.vulnerabilityBadge}
                </span>
                <span className="text-xs font-black text-slate-700">
                  Target: {selectedCrop} ({growthStage})
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {prediction.primaryDisease}
              </h3>
              <p className="text-xs font-bold italic text-slate-600 mt-0.5">
                Pathogen: {prediction.scientificName} ({prediction.pathogen})
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-rose-600 animate-bounce">
                  {prediction.riskProbability}%
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                  Outbreak Probability
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Mechanism & Onset Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bouncy-card-subtle p-5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  Predicted Symptom Emergence Timeline
                </div>
                <div className="text-base font-black text-slate-900">
                  {prediction.symptomOnsetDays}
                </div>
                <p className="text-xs font-medium text-slate-600 mt-1">
                  Infection begins internally during peak leaf moisture; visible necrotic lesions or halos develop within this incubation window.
                </p>
              </div>

              <div className="bouncy-card-subtle p-5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  <Info className="w-4 h-4 text-indigo-600" />
                  Why This Weather Shift Triggers This Disease
                </div>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  {prediction.infectionMechanism}
                </p>
              </div>
            </div>

            {/* Secondary Co-Occurring Pathogens */}
            {prediction.secondaryDiseases.length > 0 && (
              <div className="bouncy-card-subtle p-5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                  Secondary Pathogens Also Stimulated by this Weather Shift
                </h4>
                <div className="flex flex-wrap gap-2">
                  {prediction.secondaryDiseases.map((sec, idx) => (
                    <span
                      key={idx}
                      className="bouncy-pill inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      {sec.name}: <strong className="text-amber-900">{sec.probability}% risk</strong>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tactical Action Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pre-Weather Actions */}
              <div className="bouncy-card-subtle p-5 bg-emerald-50/70 border-2 border-emerald-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-4 h-4 text-emerald-700" />
                  Actions BEFORE Weather Shift (12 - 24 hrs prior)
                </h4>
                <ul className="space-y-2.5 text-xs font-semibold text-emerald-950">
                  {prediction.preWeatherActions.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5 shadow-2xs">
                        {idx + 1}
                      </span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Post-Weather Actions */}
              <div className="bouncy-card-subtle p-5 bg-blue-50/60 border-2 border-blue-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-indigo-700" />
                  Actions AFTER Weather Shift (24 - 48 hrs post-rain)
                </h4>
                <ul className="space-y-2.5 text-xs font-semibold text-slate-800">
                  {prediction.postWeatherActions.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended Preventive Formulations */}
            <div className="bouncy-card-subtle p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex-1">
                <span className="font-black text-slate-600 uppercase tracking-wider block mb-1">
                  Organic Pre-Weather Treatment
                </span>
                <span className="font-black text-emerald-800 text-sm">
                  {prediction.recommendedSpray.organic}
                </span>
              </div>

              <div className="hidden sm:block w-px h-10 bg-emerald-200"></div>

              <div className="flex-1">
                <span className="font-black text-slate-600 uppercase tracking-wider block mb-1">
                  Chemical Curative Rescue Spray
                </span>
                <span className="font-black text-indigo-800 text-sm">
                  {prediction.recommendedSpray.chemical}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
