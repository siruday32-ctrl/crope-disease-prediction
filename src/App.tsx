import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PredictionResultCard } from './components/PredictionResultCard';
import { DiseaseCatalog } from './components/DiseaseCatalog';
import { WeatherRiskCalculator } from './components/WeatherRiskCalculator';
import { WeatherDiseasePredictor } from './components/WeatherDiseasePredictor';
import { DosageCalculator } from './components/DosageCalculator';
import { DiagnosisHistory } from './components/DiagnosisHistory';
import { PredictionResult, CropType } from './types';
import { analyzeLeafImage, buildDiagnosisFromCatalog } from './utils/imageClassifier';
import { Sprout, ShieldCheck, AlertCircle, CloudLightning, ArrowRight, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'crop_disease_scans_history';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('scanner');
  const [currentPrediction, setCurrentPrediction] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [historyRecords, setHistoryRecords] = useState<PredictionResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Save history updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(historyRecords));
    } catch {
      // ignore storage quota errors
    }
  }, [historyRecords]);

  const handleAnalyze = async (
    imageSrc: string,
    cropHint?: CropType,
    userDescription?: string
  ) => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    try {
      const result = await analyzeLeafImage(imageSrc, cropHint, userDescription);
      setCurrentPrediction(result);
      setActiveTab('scanner');
    } catch (err: any) {
      console.error('Diagnosis error:', err);
      setErrorMessage(
        'Could not complete diagnosis. Please ensure the image is clear or select the disease directly from our catalog.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectExactDisease = (diseaseId: string, customImage?: string) => {
    setErrorMessage(null);
    const result = buildDiagnosisFromCatalog(diseaseId, customImage);
    if (result) {
      setCurrentPrediction(result);
      setActiveTab('scanner');
    }
  };

  const handleSaveToHistory = (result: PredictionResult) => {
    if (!historyRecords.some((r) => r.id === result.id)) {
      setHistoryRecords([result, ...historyRecords]);
    }
  };

  const handleDeleteRecord = (id: string) => {
    setHistoryRecords(historyRecords.filter((r) => r.id !== id));
    if (currentPrediction?.id === id) {
      setCurrentPrediction(null);
    }
  };

  const handleClearHistory = () => {
    setHistoryRecords([]);
  };

  const handleSelectFromHistory = (record: PredictionResult) => {
    setCurrentPrediction(record);
    setActiveTab('scanner');
  };

  const handleSelectDiseaseFromCatalog = (imageSrc: string, crop: CropType) => {
    handleAnalyze(imageSrc, crop);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setErrorMessage(null);
        }}
        historyCount={historyRecords.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 flex items-center justify-between shadow-[0_4px_0_0_#fcd34d] animate-pop-bounce">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 animate-bounce" />
              <span className="text-sm font-bold">{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs font-black px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 transition-all bouncy-pill border border-amber-400"
            >
              Dismiss
            </button>
          </div>
        )}

        {activeTab === 'scanner' && (
          <div className="space-y-6">
            {/* Intro Bouncy Banner */}
            <div className="rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 border-3 border-emerald-900 text-white shadow-[0_8px_0_0_#064e3b] transition-transform duration-300 hover:-translate-y-1">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-white/20 text-emerald-100 border border-white/30 mb-3 shadow-xs bouncy-pill">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                  Multimodal Plant Pathology Diagnostic System
                </span>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">
                  Detect Exact Plant & Crop Diseases
                </h1>
                <p className="text-emerald-100 text-sm sm:text-base mt-2.5 leading-relaxed font-semibold">
                  Identify specific foliar pathogens, bacterial blights, viral mottling, and nutrient deficiencies with certified treatment remedies and dosage calibrations.
                </p>
              </div>

              {/* Decorative background leaf watermark */}
              <div className="absolute right-4 -bottom-10 opacity-15 pointer-events-none text-white animate-bouncy-hop">
                <Sprout className="w-64 h-64" />
              </div>
            </div>

            {/* Weather Change Banner CTA */}
            <div className="rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-700 border-3 border-blue-900 text-white shadow-[0_8px_0_0_#1e3a8a] transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white shrink-0 shadow-sm animate-bouncy-wiggle">
                  <CloudLightning className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-white">
                    Predicting Disease by Weather Change
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 mt-0.5 font-medium">
                    Incoming cold rain, damp fog, or monsoon heatwaves? Forecast which crop diseases will strike your plants before symptoms appear.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('weather_change')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 text-xs sm:text-sm font-black rounded-2xl shrink-0 transition-all border-2 border-yellow-500 shadow-[0_4px_0_0_#ca8a04] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none cursor-pointer"
              >
                <span>Predict by Weather Shift</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Prediction Result display if available */}
            {currentPrediction && (
              <PredictionResultCard
                result={currentPrediction}
                onSaveToHistory={handleSaveToHistory}
                isSaved={historyRecords.some((r) => r.id === currentPrediction.id)}
                onReset={() => setCurrentPrediction(null)}
              />
            )}

            {/* Image Uploader & Presets */}
            <ImageUploader
              onAnalyze={handleAnalyze}
              onSelectExactDisease={handleSelectExactDisease}
              isAnalyzing={isAnalyzing}
            />
          </div>
        )}

        {activeTab === 'weather_change' && <WeatherDiseasePredictor />}

        {activeTab === 'catalog' && (
          <DiseaseCatalog onSelectDiseaseForScan={handleSelectDiseaseFromCatalog} />
        )}

        {activeTab === 'weather' && <WeatherRiskCalculator />}

        {activeTab === 'dosage' && <DosageCalculator />}

        {activeTab === 'history' && (
          <DiagnosisHistory
            records={historyRecords}
            onSelectRecord={handleSelectFromHistory}
            onDeleteRecord={handleDeleteRecord}
            onClearAll={handleClearHistory}
          />
        )}
      </main>

      {/* Advisory Bouncy Footer */}
      <footer className="bg-white py-6 text-xs text-slate-600 mt-auto border-t-3 border-emerald-100 shadow-[0_-4px_16px_rgba(16,80,48,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
          <div className="flex items-center gap-2 text-emerald-800">
            <ShieldCheck className="w-5 h-5 text-emerald-600 animate-bounce" />
            <span>
              Agricultural Extension Diagnostic Standard • Plant Pathology & Crop Protection
            </span>
          </div>

          <div className="text-center sm:text-right text-slate-500">
            <span>
              Always verify chemical labels & consult local agricultural extension officers before pesticide spraying.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
