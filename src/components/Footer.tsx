import React from 'react';
import {
  Sprout,
  ShieldCheck,
  ScanLine,
  CloudLightning,
  BookOpen,
  Calculator,
  Mail,
  Heart,
  Globe,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { ActiveTab } from './Header';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenConsultation?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <footer className="bg-white border-t-3 border-emerald-200 mt-16 sm:mt-24 shadow-[0_-6px_20px_rgba(16,80,48,0.05)]">
      {/* Top Banner / Callout in Footer */}
      <div className="bg-emerald-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border-2 border-white/20 flex items-center justify-center text-yellow-300 shrink-0">
              <Sprout className="w-6 h-6 animate-bouncy-wiggle" />
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-white">
                Empowering Agricultural Resilience Worldwide
              </h3>
              <p className="text-emerald-200 text-xs sm:text-sm font-medium mt-0.5">
                Protecting food security with open-access computer vision & weather pathology models.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('scanner')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-yellow-400 hover:bg-yellow-300 text-emerald-950 border-2 border-yellow-500 shadow-[0_3px_0_0_#ca8a04] transition-all bouncy-btn cursor-pointer"
            >
              Start Leaf Scan
            </button>
            <button
              onClick={() => {
                if (onOpenConsultation) onOpenConsultation();
                else onNavigate('scanner');
              }}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 transition-all bouncy-btn cursor-pointer"
            >
              Agronomist Help
            </button>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Website Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Column 1: Brand & Bio (2 cols wide on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => onNavigate('home')}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-emerald-700 shadow-[0_3px_0_0_#047857] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Sprout className="w-5 h-5 animate-bouncy-wiggle" />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                Crop Disease Prediction
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-sm">
              An open-access agricultural diagnostic platform designed to bridge precision plant pathology with field-level farm operations. Diagnose foliar infections, anticipate weather-driven outbreaks, and calibrate tank dosages.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs font-bold text-emerald-800">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                FAO IPM Standards
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-900">
                <Globe className="w-4 h-4 text-blue-700" />
                Global Crop Coverage
              </span>
            </div>
          </div>

          {/* Column 2: Diagnostic Tools */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-slate-900 tracking-wider uppercase">
              Diagnostic Tools
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('scanner')}
                  className="hover:text-emerald-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ScanLine className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI Leaf Scanner</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('weather_change')}
                  className="hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CloudLightning className="w-3.5 h-3.5 text-blue-600" />
                  <span>Weather Shift Predictor</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Disease Encyclopedia</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('weather')}
                  className="hover:text-teal-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Microclimate Risk Index</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dosage')}
                  className="hover:text-purple-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-purple-600" />
                  <span>Dosage Calculator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span>Scan History & Reports</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Crops Supported */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-slate-900 tracking-wider uppercase">
              Crops Supported
            </h4>
            <ul className="space-y-1.5 text-xs font-medium text-slate-600">
              <li>🍅 Tomato (Solanum lycopersicum)</li>
              <li>🥔 Potato (Solanum tuberosum)</li>
              <li>🌽 Corn / Maize (Zea mays)</li>
              <li>🌾 Rice (Oryza sativa)</li>
              <li>🌾 Wheat (Triticum aestivum)</li>
              <li>🍇 Grape (Vitis vinifera)</li>
              <li>🍎 Apple (Malus domestica)</li>
              <li>🫑 Bell Pepper (Capsicum annuum)</li>
              <li>🪴 Cotton (Gossypium)</li>
            </ul>
          </div>

          {/* Column 4: Resources & Science */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-slate-900 tracking-wider uppercase">
              Knowledge & Science
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span>Plant Disease Triangle</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span>Fungal Spore Germination</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span>IPM Control Protocols</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span>Bee & Pollinator Safety</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onOpenConsultation) onOpenConsultation();
                  }}
                  className="hover:text-emerald-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ask Field Specialist</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-10 mt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 Crop Disease Prediction Platform. Built for global growers and food security.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <span>Integrated Pest Management</span>
            <span>•</span>
            <span>Agricultural Extension Advisory</span>
            <span>•</span>
            <span>Pollinator Protection Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
