import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Camera,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  Search,
  BookOpen,
  HelpCircle,
  X
} from 'lucide-react';
import { CropType } from '../types';
import { CROP_LIST, CROP_DISEASES } from '../data/cropDiseases';

interface ImageUploaderProps {
  onAnalyze: (imageSrc: string, cropHint?: CropType, userDescription?: string) => void;
  onSelectExactDisease?: (diseaseId: string, customImage?: string) => void;
  isAnalyzing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onAnalyze,
  onSelectExactDisease,
  isAnalyzing
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('auto');
  const [symptomNotes, setSymptomNotes] = useState<string>('');
  const [manualDiseaseId, setManualDiseaseId] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Selected sample presets for rapid demo testing
  const samplePresets = [
    {
      diseaseId: 'tomato_early_blight',
      label: 'Tomato Early Blight',
      tag: 'Target Spots'
    },
    {
      diseaseId: 'tomato_late_blight',
      label: 'Tomato Late Blight',
      tag: 'Water Mold'
    },
    {
      diseaseId: 'corn_common_rust',
      label: 'Corn Rust',
      tag: 'Orange Pustules'
    },
    {
      diseaseId: 'tomato_yellow_leaf_curl',
      label: 'Tomato Yellow Curl',
      tag: 'Viral Vector'
    },
    {
      diseaseId: 'rice_bacterial_leaf_blight',
      label: 'Rice Bacterial Blight',
      tag: 'Bacterial Streak'
    },
    {
      diseaseId: 'potato_healthy',
      label: 'Healthy Potato',
      tag: 'Clean Tissue'
    },
    {
      diseaseId: 'apple_cedar_apple_rust',
      label: 'Cedar Apple Rust',
      tag: 'Gymnosporangium'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAnalysis = () => {
    if (!selectedImage) return;
    const crop = selectedCrop !== 'auto' ? (selectedCrop as CropType) : undefined;
    onAnalyze(selectedImage, crop, symptomNotes);
  };

  const handlePresetSelect = (diseaseId: string) => {
    const disease = CROP_DISEASES.find((d) => d.id === diseaseId);
    if (disease) {
      setSelectedImage(disease.sampleImage);
      setSelectedCrop(disease.crop);
      if (onSelectExactDisease) {
        onSelectExactDisease(diseaseId, disease.sampleImage);
      }
    }
  };

  const handleManualDiseaseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setManualDiseaseId(id);
    if (id && onSelectExactDisease) {
      onSelectExactDisease(id, selectedImage || undefined);
    }
  };

  return (
    <div className="bouncy-card bg-white overflow-hidden">
      {/* Card Header */}
      <div className="p-5 sm:p-7 border-b-2 border-emerald-100 bg-emerald-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-[0_3px_0_0_#047857] animate-bouncy-wiggle">
                <Camera className="w-5 h-5" />
              </div>
              Upload Plant Leaf for Exact Diagnosis
            </h2>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              Snap or upload a clear photo of your plant leaf. AI Vision will identify the exact plant and pathogen.
            </p>
          </div>

          {/* Crop Selector dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 whitespace-nowrap">
              Plant / Crop:
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="text-xs sm:text-sm font-black bg-white border-2 border-emerald-200 rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 shadow-[0_3px_0_0_#d1fae5] bouncy-pill cursor-pointer"
            >
              <option value="auto">Auto-Detect Plant</option>
              {CROP_LIST.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Dropzone Area with Bouncy Interaction */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-3 border-dashed rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-emerald-600 bg-emerald-100 scale-[0.99] shadow-inner'
              : 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-500 hover:scale-[1.01] shadow-[0_6px_0_0_#e2f4e7]'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {selectedImage ? (
            <div className="relative w-full max-w-sm aspect-square mx-auto rounded-2xl overflow-hidden border-3 border-emerald-500 bg-slate-900 shadow-xl transition-transform hover:scale-[1.02]">
              <img
                src={selectedImage}
                alt="Selected Plant Leaf"
                className="w-full h-full object-contain"
              />

              {/* Scanning visual overlay when running analysis */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-emerald-950/80 flex flex-col items-center justify-center text-white">
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin mb-3"></div>
                  <span className="text-sm font-black tracking-wide bg-emerald-700 px-4 py-2 rounded-full shadow-[0_3px_0_0_#065f46] text-white animate-bounce">
                    Running Deep Visual Plant Pathology...
                  </span>
                  <div className="absolute inset-x-0 h-1 bg-emerald-400 shadow-[0_0_16px_#34d399] animate-pulse top-1/2"></div>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute top-3 right-3 bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-xl text-xs shadow-md border-2 border-rose-800 bouncy-pill cursor-pointer"
                title="Change image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center py-4 group">
              <div className="w-20 h-20 mx-auto mb-3.5 rounded-3xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-700 shadow-[0_4px_0_0_#a7f3d0] transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-3">
                <UploadCloud className="w-10 h-10 animate-bouncy-hop" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                Drag & Drop Plant Leaf Photo Here
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1 max-w-md mx-auto">
                Supports JPG, PNG, WEBP. Photograph infected leaf foliage in good natural lighting.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black rounded-2xl shadow-[0_4px_0_0_#047857] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
                <ImageIcon className="w-4 h-4" />
                Browse Device Photos
              </div>
            </div>
          )}
        </div>

        {/* Optional Symptom Observations */}
        <div className="bouncy-card-subtle p-5">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
            Observed Symptoms or Context (Optional)
          </label>
          <input
            type="text"
            value={symptomNotes}
            onChange={(e) => setSymptomNotes(e.target.value)}
            placeholder="e.g. Concentric brown rings, leaf margins yellowing, white powdery coating on underside..."
            className="w-full text-xs sm:text-sm bg-white border-2 border-emerald-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400 font-semibold shadow-xs"
          />
          <span className="text-[11px] text-slate-500 font-medium mt-1.5 block">
            Helps the diagnostic vision model distinguish between look-alike fungal spots, bacterial blights, and nutrient chlorosis.
          </span>
        </div>

        {/* Action Button Bar */}
        {selectedImage && (
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="px-5 py-2.5 text-xs sm:text-sm font-black text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all bouncy-pill cursor-pointer border border-slate-300"
            >
              Clear Image
            </button>
            <button
              type="button"
              disabled={isAnalyzing}
              onClick={handleRunAnalysis}
              className="bouncy-btn-primary flex items-center gap-2.5 px-7 py-3 rounded-2xl text-xs sm:text-sm font-black cursor-pointer disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Diagnosing Exact Disease...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 animate-bounce" />
                  Diagnose Crop Disease
                </>
              )}
            </button>
          </div>
        )}

        {/* Quick Sample Presets with Bouncy Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Quick Sample Presets
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                1-Click Diagnostic Test
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {samplePresets.map((preset) => {
              const disease = CROP_DISEASES.find((d) => d.id === preset.diseaseId);
              if (!disease) return null;
              return (
                <button
                  key={preset.diseaseId}
                  onClick={() => handlePresetSelect(preset.diseaseId)}
                  className="bouncy-pill bouncy-card-subtle p-2.5 text-left flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 mb-2 border-2 border-emerald-300 group-hover:border-emerald-500 shadow-xs transition-colors">
                    <img
                      src={disease.sampleImage}
                      alt={preset.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs font-black text-slate-900 text-center line-clamp-1 w-full group-hover:text-emerald-700">
                    {preset.label}
                  </span>
                  <span className="text-[10px] text-emerald-900 bg-emerald-200 border border-emerald-400 px-2 py-0.5 rounded-full mt-1 font-black shadow-2xs">
                    {preset.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Direct Exact Disease Lookup Section */}
        <div className="bouncy-card-subtle p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-[0_3px_0_0_#047857] animate-bouncy-wiggle">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 block">
                Looking for a specific known disease?
              </span>
              <span className="text-xs font-medium text-slate-600">
                Select from our validated plant disease database to load the exact pathogen etiology and chemical & organic treatments immediately.
              </span>
            </div>
          </div>

          <div className="sm:w-72 shrink-0">
            <select
              value={manualDiseaseId}
              onChange={handleManualDiseaseSelect}
              className="w-full text-xs font-black bg-white border-2 border-emerald-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 shadow-[0_3px_0_0_#d1fae5] bouncy-pill cursor-pointer"
            >
              <option value="">Select Exact Disease...</option>
              {CROP_DISEASES.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.crop}: {d.name} ({d.pathogen})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
