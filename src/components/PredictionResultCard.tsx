import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Leaf,
  FlaskConical,
  Sprout,
  CheckCircle2,
  BookmarkPlus,
  Printer,
  ChevronRight,
  Info,
  Bug,
  Activity,
  Droplet
} from 'lucide-react';
import { PredictionResult } from '../types';

interface PredictionResultCardProps {
  result: PredictionResult;
  onSaveToHistory: (result: PredictionResult) => void;
  isSaved?: boolean;
  onReset: () => void;
}

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({
  result,
  onSaveToHistory,
  isSaved = false,
  onReset
}) => {
  const [activeTab, setActiveTab] = useState<'treatments' | 'symptoms' | 'prevention'>('treatments');
  const isHealthy = result.pathogen === 'None (Healthy)';

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'None':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300',
          icon: ShieldCheck,
          label: 'Healthy Foliage'
        };
      case 'Low':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300',
          icon: Activity,
          label: 'Low Severity'
        };
      case 'Medium':
        return {
          bg: 'bg-amber-100 text-amber-950 border-2 border-amber-300',
          icon: AlertTriangle,
          label: 'Moderate Infection'
        };
      case 'High':
        return {
          bg: 'bg-orange-100 text-orange-950 border-2 border-orange-300',
          icon: AlertTriangle,
          label: 'High Severity'
        };
      case 'Critical':
        return {
          bg: 'bg-rose-100 text-rose-950 border-2 border-rose-300',
          icon: AlertTriangle,
          label: 'Critical Damage'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-2 border-slate-300',
          icon: Info,
          label: severity
        };
    }
  };

  const getPathogenBadge = (pathogen: string) => {
    switch (pathogen) {
      case 'Fungal':
        return {
          bg: 'bg-purple-100 text-purple-900 border-2 border-purple-300',
          icon: Sprout
        };
      case 'Bacterial':
        return {
          bg: 'bg-blue-100 text-blue-900 border-2 border-blue-300',
          icon: Droplet
        };
      case 'Viral':
        return {
          bg: 'bg-rose-100 text-rose-900 border-2 border-rose-300',
          icon: Bug
        };
      case 'Oomycete':
        return {
          bg: 'bg-teal-100 text-teal-900 border-2 border-teal-300',
          icon: Sprout
        };
      default:
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300',
          icon: ShieldCheck
        };
    }
  };

  const severityBadge = getSeverityBadge(result.severity);
  const SeverityIcon = severityBadge.icon;
  const pathogenBadge = getPathogenBadge(result.pathogen);
  const PathogenIcon = pathogenBadge.icon;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bouncy-card bg-white overflow-hidden print:border-none print:shadow-none animate-pop-bounce">
      {/* Top Banner */}
      <div
        className={`p-6 border-b-3 ${
          isHealthy
            ? 'bg-emerald-50 border-emerald-200'
            : 'bg-rose-50 border-rose-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 border-3 border-emerald-300 shrink-0 shadow-[0_4px_0_0_#6ee7b7] transition-transform duration-300 hover:scale-105">
              <img
                src={result.imageUrl}
                alt={result.disease}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 bg-white px-3 py-1 rounded-full border-2 border-slate-300 shadow-2xs bouncy-pill">
                  {result.crop}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full shadow-2xs bouncy-pill ${pathogenBadge.bg}`}
                >
                  <PathogenIcon className="w-3.5 h-3.5" />
                  {result.pathogen} Pathogen
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full shadow-2xs bouncy-pill ${severityBadge.bg}`}
                >
                  <SeverityIcon className="w-3.5 h-3.5" />
                  {severityBadge.label}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {result.disease}
              </h2>
              <p className="text-sm font-bold italic text-slate-600 mt-0.5">
                {result.scientificName}
              </p>
            </div>
          </div>

          {/* Action Buttons with Bouncy Press */}
          <div className="flex items-center gap-2.5 shrink-0 print:hidden">
            <button
              onClick={() => onSaveToHistory(result)}
              disabled={isSaved}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-black rounded-xl border-2 transition-all bouncy-pill cursor-pointer ${
                isSaved
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                  : 'bg-white text-slate-800 border-slate-300 shadow-[0_3px_0_0_#cbd5e1] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none'
              }`}
            >
              <BookmarkPlus className="w-4 h-4 text-emerald-600" />
              {isSaved ? 'Saved in History' : 'Save Diagnosis'}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-black rounded-xl bg-white text-slate-800 border-2 border-slate-300 shadow-[0_3px_0_0_#cbd5e1] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all bouncy-pill cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x-2 divide-y-2 sm:divide-y-0 divide-emerald-100 border-b-2 border-emerald-100 bg-white">
        <div className="p-4 text-center">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Diagnosis Confidence
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {result.confidence}%
          </div>
          <div className="w-28 h-2.5 bg-slate-100 rounded-full mx-auto mt-2 overflow-hidden border border-slate-200">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${result.confidence}%` }}
            ></div>
          </div>
        </div>

        <div className="p-4 text-center">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Affected Leaf Surface
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {result.affectedAreaPercent}%
          </div>
          <p className="text-[11px] font-semibold text-slate-600 mt-1">
            {isHealthy ? 'Zero necrotic tissue' : 'Foliar lesion coverage'}
          </p>
        </div>

        <div className="p-4 text-center">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Chlorophyll Ratio
          </span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {result.leafMetrics.greennessScore}%
          </div>
          <p className="text-[11px] font-semibold text-slate-600 mt-1">Photosynthetic vigor</p>
        </div>

        <div className="p-4 text-center">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Lesion Density
          </span>
          <div className="text-2xl font-black text-amber-700 mt-1">
            {result.leafMetrics.detectedSpots}{' '}
            <span className="text-xs font-bold text-slate-600">spots/cluster</span>
          </div>
          <p className="text-[11px] font-semibold text-slate-600 mt-1">Cellular spot clusters</p>
        </div>
      </div>

      {/* Secondary Candidate Warning if applicable */}
      {result.secondaryPrediction && (
        <div className="px-6 py-3 bg-amber-50 border-b-2 border-amber-200 text-xs font-semibold text-amber-900 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600" />
            Differential candidate: <strong className="font-black text-slate-900">{result.secondaryPrediction.disease}</strong> ({result.secondaryPrediction.confidence}% match).
          </span>
          <span className="text-[11px] font-black text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full border border-amber-300">
            Multi-class candidate
          </span>
        </div>
      )}

      {/* Tab Navigation with Bouncy Pills */}
      <div className="border-b-2 border-emerald-100 px-6 py-3 flex flex-wrap gap-2 text-xs sm:text-sm font-black bg-emerald-50/40">
        <button
          onClick={() => setActiveTab('treatments')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'treatments'
              ? 'bg-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#047857] scale-105'
              : 'bg-white text-slate-700 hover:bg-emerald-100 border border-slate-200 bouncy-pill'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          Treatment Protocol (Organic & Chemical)
        </button>

        <button
          onClick={() => setActiveTab('symptoms')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'symptoms'
              ? 'bg-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#047857] scale-105'
              : 'bg-white text-slate-700 hover:bg-emerald-100 border border-slate-200 bouncy-pill'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Symptoms & Identification
        </button>

        <button
          onClick={() => setActiveTab('prevention')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'prevention'
              ? 'bg-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#047857] scale-105'
              : 'bg-white text-slate-700 hover:bg-emerald-100 border border-slate-200 bouncy-pill'
          }`}
        >
          <Sprout className="w-4 h-4" />
          Prevention & Weather Triggers
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'treatments' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organic Solutions */}
            <div className="bouncy-card-subtle p-5 sm:p-6 bg-emerald-50/70 border-2 border-emerald-200">
              <h3 className="text-base font-black text-emerald-950 flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-emerald-700" />
                Organic & Bio-Control Measures
              </h3>
              <p className="text-xs font-semibold text-emerald-800 mb-4">
                Eco-safe treatments suitable for certified organic farming and early intervention.
              </p>
              <ul className="space-y-3">
                {result.organicTreatments.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-emerald-950">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-2xs">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chemical Solutions */}
            <div className="bouncy-card-subtle p-5 sm:p-6 bg-blue-50/50 border-2 border-blue-200">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2 mb-2">
                <FlaskConical className="w-5 h-5 text-indigo-700" />
                Chemical Fungicide & Active Ingredients
              </h3>
              <p className="text-xs font-semibold text-slate-600 mb-4">
                Recommended curative chemical interventions with prescribed dosages.
              </p>
              <ul className="space-y-3">
                {result.chemicalTreatments.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                    <ChevronRight className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'symptoms' && (
          <div className="space-y-5">
            <h3 className="text-lg font-black text-slate-900">
              Diagnostic Symptoms & Field Identifiers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {result.symptoms.map((symptom, idx) => (
                <div
                  key={idx}
                  className="bouncy-card-subtle p-4 flex items-start gap-3 text-xs sm:text-sm font-semibold text-slate-800"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>

            {result.favorableConditions && (
              <div className="bouncy-card-subtle mt-4 p-5 bg-amber-50/70 border-2 border-amber-200 text-xs sm:text-sm">
                <h4 className="font-black text-amber-950 mb-3 text-sm">
                  Optimal Environmental Range for Pathogen
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-semibold">
                  <div>
                    <span className="font-black text-amber-900 block text-xs">Temperature:</span>
                    <span className="text-slate-800">{result.favorableConditions.tempRange}</span>
                  </div>
                  <div>
                    <span className="font-black text-amber-900 block text-xs">Humidity:</span>
                    <span className="text-slate-800">{result.favorableConditions.humidity}</span>
                  </div>
                  <div>
                    <span className="font-black text-amber-900 block text-xs">Key Outbreak Driver:</span>
                    <span className="text-slate-800">{result.favorableConditions.triggers}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'prevention' && (
          <div className="space-y-5">
            <h3 className="text-lg font-black text-slate-900">
              Long-term Preventive Management & Agronomic Practices
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {result.prevention.map((item, idx) => (
                <div
                  key={idx}
                  className="bouncy-card-subtle p-4 flex items-start gap-3 text-xs sm:text-sm font-semibold text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-4 bg-emerald-50/50 border-t-2 border-emerald-100 flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>Diagnosed on {new Date(result.timestamp).toLocaleString()}</span>
        <button
          onClick={onReset}
          className="font-black text-emerald-700 hover:text-emerald-900 bouncy-pill cursor-pointer"
        >
          Scan Another Leaf →
        </button>
      </div>
    </div>
  );
};
