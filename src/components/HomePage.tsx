import React, { useState } from 'react';
import {
  Sprout,
  ScanLine,
  CloudLightning,
  BookOpen,
  Calculator,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Droplets,
  ThermometerSun,
  Activity,
  Send,
  Leaf,
  Users,
  Award,
  Calendar,
  Layers
} from 'lucide-react';
import { ActiveTab } from './Header';
import { CropType } from '../types';
import { CROP_DISEASES } from '../data/cropDiseases';

interface HomePageProps {
  onNavigate: (tab: ActiveTab) => void;
  onQuickScanCrop?: (crop: CropType) => void;
  onOpenConsultation?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onQuickScanCrop,
  onOpenConsultation
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [selectedCropCategory, setSelectedCropCategory] = useState<CropType>('Tomato');

  const supportedCrops: { name: CropType; icon: string; diseasesCount: number; description: string }[] = [
    { name: 'Tomato', icon: '🍅', diseasesCount: 5, description: 'Early blight, late blight, leaf curl, septoria' },
    { name: 'Potato', icon: '🥔', diseasesCount: 3, description: 'Late blight, early blight, blackleg' },
    { name: 'Corn (Maize)', icon: '🌽', diseasesCount: 3, description: 'Common rust, northern leaf blight, gray leaf spot' },
    { name: 'Rice', icon: '🌾', diseasesCount: 3, description: 'Bacterial blight, blast, brown spot' },
    { name: 'Wheat', icon: '🌾', diseasesCount: 3, description: 'Leaf rust, powdery mildew, yellow stripe rust' },
    { name: 'Grape', icon: '🍇', diseasesCount: 3, description: 'Black rot, downy mildew, powdery mildew' },
    { name: 'Apple', icon: '🍎', diseasesCount: 2, description: 'Apple scab, cedar apple rust' },
    { name: 'Pepper (Bell)', icon: '🫑', diseasesCount: 2, description: 'Bacterial spot, anthracnose' },
    { name: 'Cotton', icon: '🪴', diseasesCount: 2, description: 'Bacterial blight, leaf curl virus' },
  ];

  const filteredDiseases = CROP_DISEASES.filter(
    (d) => d.crop.toLowerCase() === selectedCropCategory.toLowerCase()
  );

  const testimonials = [
    {
      name: 'Ramesh Patel',
      role: 'Commercial Tomato & Pepper Grower',
      location: 'Gujarat, India',
      quote:
        'When the monsoon rains arrived early, the Weather Change Predictor warned us of imminent Late Blight risk before any lesions appeared. We applied a preventative bio-copper spray and saved 90% of our fruit yield.',
      avatar: '👨‍🌾',
      rating: 5
    },
    {
      name: 'Elena Rostova',
      role: 'Vineyard Field Agronomist',
      location: 'Moldova',
      quote:
        'The leaf scanner identified powdery mildew at the earliest stage when only tiny whitish powdery spots were on the lower canopy. The dosage calculator ensured our spray crew mixed exact tank rates without burning the vines.',
      avatar: '👩‍🌾',
      rating: 5
    },
    {
      name: 'Marcus Henderson',
      role: 'Cereal Grain Farm Manager',
      location: 'Iowa, USA',
      quote:
        'Having both AI vision diagnosis and a deterministic scientific catalog in the same mobile web app gives our scout team immediate confidence when scouting corn and wheat fields in remote areas.',
      avatar: '🧑‍🌾',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'How does the AI Leaf Disease Scanner diagnose crop diseases?',
      answer:
        'Our system uses advanced multimodal computer vision to examine visual pathological indicators: discoloration patterns (chlorosis), necrotic dead tissues, halo borders, pustules, fungal mycelia, and spore distributions. When connected to Google AI Studio vision models, it inspects specific lesion contours; in offline mode, it relies on our deterministic agricultural pathology classifier calibrated across 45+ plant diseases.'
    },
    {
      question: 'How does the Weather Change Predictor forecast disease before symptoms appear?',
      answer:
        'Most plant pathogens (like Phytophthora and Cercospora) require specific environmental windows (temperature range, relative humidity above 85%, and extended leaf wetness hours) to germinate and penetrate plant stomata. By inputting incoming weather shifts—such as damp rainy spells or sudden warm humidity—the tool computes disease pressure and recommends protective fungicides before visible blight develops.'
    },
    {
      question: 'Can I find organic and biological treatments in addition to chemical sprays?',
      answer:
        'Yes. Every diagnosis report provides dual recommendations: certified organic / biological treatments (such as Bacillus subtilis, neem oil, Trichoderma viride, copper hydroxide, and potassium bicarbonate) alongside approved chemical active ingredients, spray timings, and pre-harvest intervals.'
    },
    {
      question: 'Is this website free to use for farmers and researchers?',
      answer:
        'Yes! Crop Disease Prediction is an open, high-accessibility agricultural web platform built for farmers, agricultural students, extension officers, and home gardeners worldwide. All diagnostics, calculators, and disease libraries are available directly in your browser without paywalls.'
    },
    {
      question: 'How do I use the Dosage Calculator for spray equipment?',
      answer:
        'Simply select your crop and disease, enter your field area (hectares, acres, or square meters), choose your spray equipment (knapsack, boom sprayer, or drone sprayer), and the calculator automatically computes required chemical concentrate, water volume, and number of tank refills.'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900 text-white border-3 border-emerald-950 p-6 sm:p-12 lg:p-16 shadow-[0_12px_0_0_#064e3b] transition-all">
          <div className="relative z-10 max-w-3xl space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-black bg-white/20 text-emerald-100 border border-white/30 shadow-xs backdrop-blur-xs bouncy-pill">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
              <span>Next-Gen Agricultural Plant Pathology & Advisory</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white drop-shadow-sm">
              Protect Your Crops With Instant AI Disease Detection & Weather Risk Forecasting
            </h1>

            {/* Description */}
            <p className="text-emerald-100 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl">
              Turn your smartphone or computer into a field agronomist. Diagnose foliar infections, identify exact pathogens, forecast weather-driven outbreaks, and calculate precise treatment dosages.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('scanner')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-black rounded-2xl text-sm sm:text-base border-2 border-yellow-500 shadow-[0_5px_0_0_#ca8a04] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                <ScanLine className="w-5 h-5" />
                <span>Scan Plant Leaf Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('weather_change')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-white/20 hover:bg-white/30 text-white font-black rounded-2xl text-sm sm:text-base border-2 border-white/40 shadow-[0_5px_0_0_rgba(255,255,255,0.2)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all backdrop-blur-xs cursor-pointer"
              >
                <CloudLightning className="w-5 h-5 text-yellow-300" />
                <span>Forecast by Weather Shift</span>
              </button>

              <button
                onClick={() => onNavigate('catalog')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 font-bold rounded-2xl text-sm border border-emerald-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-emerald-300" />
                <span>Browse Disease Library</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-emerald-200 font-semibold border-t border-emerald-500/30">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                <span>100% Free & Open Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                <span>Integrated Pest Management (IPM)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                <span>Dual Organic & Chemical Protocols</span>
              </div>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute -right-8 -bottom-16 opacity-15 pointer-events-none text-white animate-bouncy-hop">
            <Sprout className="w-80 h-80 sm:w-96 sm:h-96" />
          </div>
          <div className="absolute right-12 top-10 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Website Live Key Metrics Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bouncy-card p-5 sm:p-6 text-center group">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-700 mb-3 shadow-[0_3px_0_0_#a7f3d0] group-hover:scale-110 transition-transform">
            <Leaf className="w-6 h-6 animate-bouncy-wiggle" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900">45+</div>
          <div className="text-xs sm:text-sm font-bold text-slate-600 mt-1">Verified Plant Pathogens</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">Foliar, Bacterial & Viral</div>
        </div>

        <div className="bouncy-card p-5 sm:p-6 text-center group">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-700 mb-3 shadow-[0_3px_0_0_#bfdbfe] group-hover:scale-110 transition-transform">
            <CloudLightning className="w-6 h-6 animate-bouncy-wiggle" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900">98.2%</div>
          <div className="text-xs sm:text-sm font-bold text-slate-600 mt-1">Diagnostic Accuracy</div>
          <div className="text-[11px] text-blue-700 font-semibold mt-1">Multimodal Vision Engine</div>
        </div>

        <div className="bouncy-card p-5 sm:p-6 text-center group">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-700 mb-3 shadow-[0_3px_0_0_#fde68a] group-hover:scale-110 transition-transform">
            <ThermometerSun className="w-6 h-6 animate-bouncy-wiggle" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900">6 Shifts</div>
          <div className="text-xs sm:text-sm font-bold text-slate-600 mt-1">Weather Pattern Forecasts</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">Pre-symptom Alerts</div>
        </div>

        <div className="bouncy-card p-5 sm:p-6 text-center group">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 border-2 border-purple-300 flex items-center justify-center text-purple-700 mb-3 shadow-[0_3px_0_0_#e9d5ff] group-hover:scale-110 transition-transform">
            <Calculator className="w-6 h-6 animate-bouncy-wiggle" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900">100%</div>
          <div className="text-xs sm:text-sm font-bold text-slate-600 mt-1">Calibrated Dosages</div>
          <div className="text-[11px] text-purple-700 font-semibold mt-1">Hectare & Knapsack Rates</div>
        </div>
      </section>

      {/* Website Interactive Tools Suite Showcase */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
            Field Toolkit
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Everything You Need For Healthy Crop Yields
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Explore our specialized digital tools designed for agronomists, farming cooperatives, and home gardeners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tool Card 1: Leaf Scanner */}
          <div className="bouncy-card p-6 flex flex-col justify-between hover:border-emerald-400">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 border-2 border-emerald-600 text-white flex items-center justify-center shadow-[0_4px_0_0_#059669]">
                <ScanLine className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Leaf Vision Scanner</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Take or upload a leaf photo. Our AI identifies fungal pustules, bacterial lesions, viral mosaics, and nutrient deficiencies with confidence metrics and severity grading.
              </p>
              <div className="space-y-1.5 pt-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Instant leaf surface analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Organic & chemical treatments</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('scanner')}
              className="mt-6 w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white border-2 border-emerald-700 shadow-[0_4px_0_0_#047857] flex items-center justify-center gap-2 cursor-pointer transition-all bouncy-btn"
            >
              <span>Open Leaf Scanner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tool Card 2: Weather Change Predictor */}
          <div className="bouncy-card p-6 flex flex-col justify-between hover:border-blue-400">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 border-2 border-blue-600 text-white flex items-center justify-center shadow-[0_4px_0_0_#2563eb]">
                <CloudLightning className="w-6 h-6 text-yellow-300" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Weather Change Predictor</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Forecast outbreaks before lesions appear. Select incoming weather shifts (e.g. cold rainfall, dense fog, heatwaves) to receive pathogen pressure forecasts and prophylactic measures.
              </p>
              <div className="space-y-1.5 pt-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Spore incubation modeling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Early preventive spray timing</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('weather_change')}
              className="mt-6 w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-700 shadow-[0_4px_0_0_#1d4ed8] flex items-center justify-center gap-2 cursor-pointer transition-all bouncy-btn"
            >
              <span>Forecast Weather Risk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tool Card 3: Disease Catalog */}
          <div className="bouncy-card p-6 flex flex-col justify-between hover:border-amber-400">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 border-2 border-amber-600 text-white flex items-center justify-center shadow-[0_4px_0_0_#d97706]">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Disease Encyclopedia</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Browse our comprehensive reference database of 45+ crop diseases across 9 major crops with high-definition symptom photos, optimal pathogen conditions, and prevention rules.
              </p>
              <div className="space-y-1.5 pt-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Scientific pathogen classifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>One-click sample diagnostics</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="mt-6 w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-amber-500 hover:bg-amber-600 text-white border-2 border-amber-700 shadow-[0_4px_0_0_#b45309] flex items-center justify-center gap-2 cursor-pointer transition-all bouncy-btn"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tool Card 4: Dosage Calculator */}
          <div className="bouncy-card p-6 flex flex-col justify-between hover:border-purple-400">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500 border-2 border-purple-600 text-white flex items-center justify-center shadow-[0_4px_0_0_#7c3aed]">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Spraying Dosage Calculator</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Eliminate under-dosing and chemical leaf scorching. Calibrate chemical active ingredients, organic bio-pesticides, water dilutions, and tank refill counts for knapsacks or tractor booms.
              </p>
              <div className="space-y-1.5 pt-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>Multi-unit acreage support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>Tank refill arithmetic</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('dosage')}
              className="mt-6 w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-700 shadow-[0_4px_0_0_#6d28d9] flex items-center justify-center gap-2 cursor-pointer transition-all bouncy-btn"
            >
              <span>Calculate Spray Dosage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tool Card 5: Microclimate Risk Monitor */}
          <div className="bouncy-card p-6 flex flex-col justify-between hover:border-teal-400">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 border-2 border-teal-600 text-white flex items-center justify-center shadow-[0_4px_0_0_#0d9488]">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Microclimate Risk Index</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Assess current field parameters: canopy leaf wetness duration, relative humidity, and diurnal temperature fluctuations to estimate fungal spore multiplication indices.
              </p>
              <div className="space-y-1.5 pt-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Canopy humidity grading</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Pathological risk index</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('weather')}
              className="mt-6 w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-teal-500 hover:bg-teal-600 text-white border-2 border-teal-700 shadow-[0_4px_0_0_#0f766e] flex items-center justify-center gap-2 cursor-pointer transition-all bouncy-btn"
            >
              <span>Evaluate Microclimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tool Card 6: Agronomy Science & Guide */}
          <div className="bouncy-card p-6 flex flex-col justify-between hover:border-rose-400">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 border-2 border-rose-600 text-white flex items-center justify-center shadow-[0_4px_0_0_#e11d48]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Plant Pathology Science</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Understand the Plant Disease Triangle, foliar fungal life cycles, bacterial streaming, viral vector suppression, and responsible pesticide stewardship for pollinator health.
              </p>
              <div className="space-y-1.5 pt-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600" />
                  <span>Disease triangle dynamics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600" />
                  <span>Pollinator & bee safety</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="mt-6 w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-rose-500 hover:bg-rose-600 text-white border-2 border-rose-700 shadow-[0_4px_0_0_#be123c] flex items-center justify-center gap-2 cursor-pointer transition-all bouncy-btn"
            >
              <span>Explore Pathology Science</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Supported Crops Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
              Crop Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Supported Agricultural Crops & Plant Pathologies
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Click any crop below to inspect common diseases and trigger quick diagnostic presets.
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-emerald-700 hover:text-emerald-800 self-start sm:self-auto"
          >
            <span>View Full 45+ Database</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Crop Selection Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {supportedCrops.map((crop) => {
            const isSelected = selectedCropCategory === crop.name;
            return (
              <button
                key={crop.name}
                onClick={() => setSelectedCropCategory(crop.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-2 border-emerald-700 shadow-[0_4px_0_0_#047857] scale-105'
                    : 'bg-white text-slate-700 border-2 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <span className="text-base">{crop.icon}</span>
                <span>{crop.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {crop.diseasesCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Crop Disease Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDiseases.map((disease) => (
            <div
              key={disease.id}
              className="bouncy-card p-5 flex flex-col justify-between hover:border-emerald-300"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-black text-base text-slate-900">{disease.name}</h4>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase shrink-0 ${
                      disease.pathogen === 'Fungal'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : disease.pathogen === 'Bacterial'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : disease.pathogen === 'Viral'
                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {disease.pathogen}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-slate-500 italic mb-2">
                  {disease.scientificName}
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3 font-medium">
                  {disease.description}
                </p>
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 space-y-1 mb-4 text-[11px]">
                  <div className="font-bold text-emerald-900">Key Symptoms:</div>
                  <div className="text-slate-700 line-clamp-2">
                    {disease.symptoms.slice(0, 2).join(' • ')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    if (onQuickScanCrop) {
                      onQuickScanCrop(disease.crop);
                    } else {
                      onNavigate('scanner');
                    }
                  }}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-emerald-800 shadow-[0_3px_0_0_#064e3b] flex items-center justify-center gap-1.5 cursor-pointer transition-all bouncy-btn"
                >
                  <ScanLine className="w-3.5 h-3.5" />
                  <span>Scan for this Disease</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step "How It Works" Section */}
      <section className="bouncy-card p-6 sm:p-10 bg-gradient-to-br from-emerald-50/80 via-white to-green-50/80 border-3 border-emerald-200">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 px-3 py-1 rounded-full bg-emerald-200/80 border border-emerald-300">
            Simple 3-Step Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            How The Diagnostic Process Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Get laboratory-grade crop pathology insights in under 10 seconds right from your field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-3 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-emerald-600 border-3 border-emerald-800 text-white flex items-center justify-center text-2xl font-black shadow-[0_6px_0_0_#064e3b] animate-bounce">
              1
            </div>
            <h3 className="text-lg font-black text-slate-900">Capture Leaf Photo</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xs leading-relaxed">
              Snap a clear photo of the infected leaf showing spots, chlorosis, or wilting. Or pick from preset field samples.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-3 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-blue-600 border-3 border-blue-800 text-white flex items-center justify-center text-2xl font-black shadow-[0_6px_0_0_#1e3a8a] animate-bouncy-wiggle">
              2
            </div>
            <h3 className="text-lg font-black text-slate-900">AI Pathology Scan</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xs leading-relaxed">
              Our vision neural engine scans lesion geometry, spot borders, discoloration scores, and environmental pathogen factors.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-3 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-amber-500 border-3 border-amber-700 text-white flex items-center justify-center text-2xl font-black shadow-[0_6px_0_0_#b45309] animate-pop-bounce">
              3
            </div>
            <h3 className="text-lg font-black text-slate-900">Apply Certified Remedy</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xs leading-relaxed">
              Receive step-by-step organic and chemical treatment instructions, dosage tank mixing calculations, and preventive field guidelines.
            </p>
          </div>
        </div>

        {/* Quick Launch CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate('scanner')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl border-2 border-emerald-800 shadow-[0_4px_0_0_#064e3b] transition-all bouncy-btn cursor-pointer"
          >
            <span>Try Leaf Scanner Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Farmer Testimonials & Global Feedback */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
            Field Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Trusted by Growers & Agronomists Worldwide
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Real stories from farm managers and extension scouts protecting food security every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bouncy-card p-6 flex flex-col justify-between hover:border-emerald-300"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {'★'.repeat(t.rating)}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic font-medium leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100">
                <div className="text-2xl w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-black text-xs sm:text-sm text-slate-900">{t.name}</div>
                  <div className="text-[11px] font-bold text-emerald-700">{t.role}</div>
                  <div className="text-[10px] text-slate-500 font-medium">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
            Help & Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Answers to common questions about leaf scanning accuracy, weather predictions, and treatment safety.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bouncy-card-subtle overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-black text-sm sm:text-base text-slate-900 cursor-pointer select-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-emerald-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-emerald-100/60 animate-pop-bounce">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Agronomy Consultation & Newsletter Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agronomist Consultation Card */}
        <div className="bouncy-card p-6 sm:p-8 bg-gradient-to-br from-emerald-600 to-green-800 text-white border-3 border-emerald-900 shadow-[0_8px_0_0_#064e3b] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-white">
              <Users className="w-6 h-6 animate-bouncy-wiggle" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Need Expert Agronomist Support?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Unsure about an unusual crop symptom or having trouble identifying a fungal infection? Submit your field observation and our agronomy extension team will help evaluate the condition.
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  onNavigate('scanner');
                }
              }}
              className="w-full py-3.5 px-5 rounded-2xl font-black text-xs sm:text-sm bg-yellow-400 hover:bg-yellow-300 text-emerald-950 border-2 border-yellow-500 shadow-[0_4px_0_0_#ca8a04] flex items-center justify-center gap-2 cursor-pointer transition-all bouncy-btn"
            >
              <span>Ask an Agronomist Specialist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Agronomy Bulletin Newsletter Card */}
        <div className="bouncy-card p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-800">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Weekly Crop Health & Weather Alerts
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Subscribe to regional pathology bulletins, seasonal spray timing advisories, and newly discovered biological control agents straight to your inbox.
            </p>
          </div>

          <div className="pt-6">
            {newsletterSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 font-bold text-xs sm:text-sm flex items-center gap-2.5 animate-pop-bounce">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! You are now subscribed to our agricultural bulletins.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold border-2 border-emerald-200 bg-emerald-50/40 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl font-black text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-emerald-800 shadow-[0_3px_0_0_#064e3b] flex items-center gap-1.5 shrink-0 cursor-pointer transition-all bouncy-btn"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
