import React, { useState } from 'react';
import {
  X,
  Users,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { CropType } from '../types';

interface AgronomistConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToScanner: () => void;
}

export const AgronomistConsultModal: React.FC<AgronomistConsultModalProps> = ({
  isOpen,
  onClose,
  onNavigateToScanner
}) => {
  const [farmerName, setFarmerName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<CropType>('Tomato');
  const [acreage, setAcreage] = useState('');
  const [symptomsDescription, setSymptomsDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomsDescription.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFarmerName('');
    setEmail('');
    setAcreage('');
    setSymptomsDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-pop-bounce">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border-3 border-emerald-300 shadow-[0_12px_36px_rgba(16,80,48,0.25)] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-5 text-white flex items-center justify-between border-b-2 border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <Users className="w-5 h-5 animate-bouncy-wiggle" />
            </div>
            <div>
              <h3 className="font-black text-lg text-white">Ask an Agronomy Specialist</h3>
              <p className="text-xs text-emerald-100 font-medium">Free field consultation & symptom review</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4 animate-pop-bounce">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 shadow-[0_4px_0_0_#a7f3d0]">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>
              <h4 className="text-xl font-black text-slate-900">
                Observation Received!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{farmerName || 'Farmer'}</strong>. Our agricultural extension pathology team will review your symptoms for <strong>{selectedCrop}</strong>. For instant automatic diagnosis, you can scan a photo with our Leaf Scanner right now.
              </p>
              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    handleReset();
                    onNavigateToScanner();
                  }}
                  className="px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-emerald-800 shadow-[0_3px_0_0_#064e3b] transition-all bouncy-btn cursor-pointer"
                >
                  Open Leaf Scanner Now
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder="e.g. Maria Santos"
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Email / Contact
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. maria@farm.org"
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Crop Type
                  </label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value as CropType)}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                    <option value="Corn (Maize)">Corn (Maize)</option>
                    <option value="Rice">Rice</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Grape">Grape</option>
                    <option value="Apple">Apple</option>
                    <option value="Pepper (Bell)">Pepper (Bell)</option>
                    <option value="Cotton">Cotton</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Field Size (Acres / Ha)
                  </label>
                  <input
                    type="text"
                    value={acreage}
                    onChange={(e) => setAcreage(e.target.value)}
                    placeholder="e.g. 5 acres / greenhouse"
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  Describe Symptoms & Weather Conditions <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={symptomsDescription}
                  onChange={(e) => setSymptomsDescription(e.target.value)}
                  placeholder="Describe leaf spots (color, halo, shape), wilting speed, recent rainfall or temperature changes..."
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-emerald-800 shadow-[0_3px_0_0_#064e3b] flex items-center gap-1.5 transition-all bouncy-btn cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
