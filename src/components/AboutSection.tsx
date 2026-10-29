import React from 'react';
import {
  Sprout,
  ShieldCheck,
  Target,
  Award,
  AlertOctagon,
  CheckCircle,
  HelpCircle,
  BookOpen,
  Droplets,
  Thermometer,
  Layers,
  HeartHandshake
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bouncy-card p-6 sm:p-10 bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 text-white border-3 border-emerald-950 shadow-[0_10px_0_0_#064e3b]">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-white/20 text-emerald-100 border border-white/30 backdrop-blur-xs bouncy-pill">
            <BookOpen className="w-4 h-4 text-yellow-300" />
            Agricultural Extension & Pathology Guide
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            About Crop Disease Prediction & Plant Pathology
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-medium">
            Bridging state-of-the-art computer vision and verified agricultural pathology standards to support farmers, growers, and agronomists across every growing season.
          </p>
        </div>
      </div>

      {/* The Plant Disease Triangle */}
      <section className="bouncy-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-emerald-100 pb-4">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
            Core Scientific Principle
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            The Plant Disease Triangle
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Disease in plants cannot occur spontaneously. It requires three critical components interacting simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bouncy-card-subtle p-5 border-2 border-emerald-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-black mb-3">
              🌱
            </div>
            <h3 className="text-base font-black text-slate-900 mb-1">1. Susceptible Host</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              A host plant species (e.g. Tomato, Potato, Corn) whose genetic profile or physiological stage allows the pathogen to penetrate cellular walls and establish infection.
            </p>
          </div>

          <div className="bouncy-card-subtle p-5 border-2 border-rose-200">
            <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-800 font-black mb-3">
              🔬
            </div>
            <h3 className="text-base font-black text-slate-900 mb-1">2. Virulent Pathogen</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Active inoculum (fungal spores, bacterial colonies, or viral particles) present in soil, on crop residues, or transmitted by vectors like aphids or whiteflies.
            </p>
          </div>

          <div className="bouncy-card-subtle p-5 border-2 border-blue-200">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-800 font-black mb-3">
              🌦️
            </div>
            <h3 className="text-base font-black text-slate-900 mb-1">3. Conducive Environment</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Specific microclimate windows: continuous leaf moisture (rain, heavy dew), high relative humidity (&gt;80%), and optimal temperatures that trigger spore germination.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <span>
            <strong>Agronomist Takeaway:</strong> If you disrupt even one corner of the triangle (such as reducing leaf moisture or applying biological competitors), the disease cycle cannot complete!
          </span>
        </div>
      </section>

      {/* Major Pathogen Categories */}
      <section className="bouncy-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-emerald-100 pb-4">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
            Taxonomy
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Classification of Plant Foliar Pathogens
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <h3 className="font-black text-base text-amber-950">Fungi & Oomycetes</h3>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Responsible for over 80% of plant diseases. Fungi reproduce via microscopic airborne or waterborne spores that land on leaves and produce hyphae. Examples include Early Blight, Late Blight (water mold), Powdery Mildew, and Rusts.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <h3 className="font-black text-base text-rose-950">Bacterial Pathogens</h3>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Single-celled microbes that invade plant tissue through natural openings (stomata, hydathodes) or mechanical injuries. Typically form water-soaked lesions, angular leaf spots, or vascular wilts (e.g. Xanthomonas campestris).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/70 border-2 border-purple-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500" />
              <h3 className="font-black text-base text-purple-950">Plant Viruses</h3>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Submicroscopic infectious agents requiring insect vectors (such as Bemisia tabaci whiteflies or aphids) to transmit between plants. Symptoms include vein clearing, yellow leaf curls, mosaic mottling, and stunting.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <h3 className="font-black text-base text-emerald-950">Abiotic & Nutrient Disorders</h3>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Non-parasitic physiological conditions caused by nitrogen deficiency (general chlorosis), iron deficiency (interveinal chlorosis), blossom end rot (calcium transport issues), or sunscald.
            </p>
          </div>
        </div>
      </section>

      {/* Integrated Pest Management (IPM) */}
      <section className="bouncy-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-emerald-100 pb-4">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
            Sustainable Agriculture
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Integrated Pest Management (IPM) Standard
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Our diagnostic platform adheres strictly to the United Nations FAO Integrated Pest Management hierarchy:
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <div className="font-black text-sm text-slate-900">Prevention & Cultural Practices</div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Crop rotation, certified disease-free seed, wider plant spacing to maximize aeration, drip irrigation instead of overhead sprinklers, and pruning infected lower foliage.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <div className="font-black text-sm text-slate-900">Scouting & Diagnostic Identification</div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Regular field scouting using our Leaf Scanner and Weather Change Predictor to detect pathogens at the 1% threshold before secondary spread occurs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white font-black flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <div className="font-black text-sm text-slate-900">Biological & Organic Suppression</div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Beneficial biocontrol organisms (Bacillus subtilis, Trichoderma harzianum), potassium bicarbonate, neem extracts, and bio-copper formulations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white font-black flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <div className="font-black text-sm text-slate-900">Targeted Chemical Intervention (As Last Resort)</div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                When economic injury thresholds are breached, apply registered fungicides/bactericides with rotated FRAC codes to prevent chemical resistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Stewardship Advisory */}
      <section className="p-6 rounded-3xl bg-amber-50 border-3 border-amber-300 text-amber-950 shadow-[0_6px_0_0_#fcd34d] space-y-3">
        <div className="flex items-center gap-3">
          <AlertOctagon className="w-6 h-6 text-amber-600 shrink-0" />
          <h3 className="font-black text-base text-amber-950">
            Pesticide Stewardship & Pollinator Protection Warning
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
          Always wear appropriate Personal Protective Equipment (gloves, goggles, respirator) when handling chemical solutions. Never spray in high winds (&gt;10 km/h) or when flowers are in active bloom to avoid harming honeybees and beneficial predatory insects. Always observe the Pre-Harvest Interval (PHI) indicated on manufacturer product labels.
        </p>
      </section>
    </div>
  );
};
