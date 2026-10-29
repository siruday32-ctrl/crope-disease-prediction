import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Droplets,
  ShieldAlert,
  Bug,
  Leaf,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { CROP_DISEASES, CROP_LIST } from '../data/cropDiseases';
import { CropType, PathogenType } from '../types';

interface DiseaseCatalogProps {
  onSelectDiseaseForScan: (imageSrc: string, crop: CropType) => void;
}

export const DiseaseCatalog: React.FC<DiseaseCatalogProps> = ({
  onSelectDiseaseForScan
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedPathogen, setSelectedPathogen] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredDiseases = useMemo(() => {
    return CROP_DISEASES.filter((d) => {
      const matchQuery =
        searchQuery === '' ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.symptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCrop = selectedCrop === 'all' || d.crop === selectedCrop;
      const matchPathogen = selectedPathogen === 'all' || d.pathogen === selectedPathogen;

      return matchQuery && matchCrop && matchPathogen;
    });
  }, [searchQuery, selectedCrop, selectedPathogen]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getPathogenBadge = (pathogen: PathogenType) => {
    switch (pathogen) {
      case 'Fungal':
        return { bg: 'bg-amber-100 text-amber-800 border-amber-300', icon: Droplets };
      case 'Bacterial':
        return { bg: 'bg-blue-100 text-blue-800 border-blue-300', icon: ShieldAlert };
      case 'Viral':
        return { bg: 'bg-purple-100 text-purple-800 border-purple-300', icon: Bug };
      default:
        return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: Leaf };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Search Filters */}
      <div className="bouncy-card bg-white p-5 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-[0_3px_0_0_#047857] animate-bouncy-wiggle">
                <BookOpen className="w-5 h-5" />
              </div>
              Crop Disease Encyclopedia & Pathogen Library
            </h2>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              Reference guide for symptoms, etiology, chemical fungicides, and organic biocontrols.
            </p>
          </div>

          <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 self-start md:self-auto shadow-2xs bouncy-pill">
            Showing {filteredDiseases.length} of {CROP_DISEASES.length} Diseases
          </span>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diseases, crops, symptoms..."
              className="w-full pl-10 pr-3.5 py-2.5 text-sm font-semibold bg-white border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400 shadow-[0_3px_0_0_#d1fae5] bouncy-pill"
            />
          </div>

          {/* Crop Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">Crop:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full py-2.5 px-3.5 text-sm font-black bg-white border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 shadow-[0_3px_0_0_#d1fae5] bouncy-pill cursor-pointer"
            >
              <option value="all">All Crops</option>
              {CROP_LIST.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          {/* Pathogen Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">Pathogen:</span>
            <select
              value={selectedPathogen}
              onChange={(e) => setSelectedPathogen(e.target.value)}
              className="w-full py-2.5 px-3.5 text-sm font-black bg-white border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 shadow-[0_3px_0_0_#d1fae5] bouncy-pill cursor-pointer"
            >
              <option value="all">All Pathogens</option>
              <option value="Fungal">Fungal</option>
              <option value="Bacterial">Bacterial</option>
              <option value="Viral">Viral</option>
              <option value="None (Healthy)">None (Healthy)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDiseases.map((disease) => {
          const isExpanded = expandedId === disease.id;
          const badge = getPathogenBadge(disease.pathogen);
          const BadgeIcon = badge.icon;

          return (
            <div
              key={disease.id}
              className="bouncy-card-subtle bg-white overflow-hidden hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_6px_0_0_#a7f3d0] transition-all duration-200"
            >
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-emerald-300 overflow-hidden shrink-0 shadow-xs">
                    <img
                      src={disease.sampleImage}
                      alt={disease.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-black text-slate-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-300 shadow-2xs">
                        {disease.crop}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full border shadow-2xs ${badge.bg}`}
                      >
                        <BadgeIcon className="w-3.5 h-3.5" />
                        {disease.pathogen}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900">{disease.name}</h3>
                    <p className="text-xs font-bold italic text-slate-600">{disease.scientificName}</p>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1 line-clamp-2">
                      {disease.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
                  <button
                    onClick={() => onSelectDiseaseForScan(disease.sampleImage, disease.crop)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl border border-emerald-700 shadow-[0_3px_0_0_#047857] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all bouncy-pill cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Test in Scanner
                  </button>

                  <button
                    onClick={() => toggleExpand(disease.id)}
                    className="flex items-center gap-1 px-3.5 py-2 text-xs font-black text-slate-800 bg-white hover:bg-slate-50 rounded-xl border-2 border-slate-300 shadow-[0_3px_0_0_#cbd5e1] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all bouncy-pill cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide' : 'Details'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-3 border-t-2 border-emerald-100 bg-emerald-50/40 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4.5 rounded-2xl border-2 border-emerald-200 shadow-xs">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                        Primary Field Symptoms
                      </h4>
                      <ul className="text-xs space-y-1.5 font-semibold text-slate-700">
                        {disease.symptoms.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-4.5 rounded-2xl border-2 border-emerald-200 shadow-xs">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                        Curative Treatments
                      </h4>
                      <div className="space-y-2 text-xs font-semibold">
                        <div>
                          <strong className="text-emerald-800 font-black">Organic: </strong>
                          <span className="text-slate-700">
                            {disease.organicTreatments[0]}
                          </span>
                        </div>
                        <div>
                          <strong className="text-indigo-800 font-black">Chemical: </strong>
                          <span className="text-slate-700">
                            {disease.chemicalTreatments[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-600 p-3 bg-white rounded-xl border border-emerald-200">
                    <strong className="font-black text-slate-800">Favorable Environmental Conditions:</strong>{' '}
                    {disease.favorableConditions.tempRange},{' '}
                    {disease.favorableConditions.humidity}. Key trigger:{' '}
                    {disease.favorableConditions.triggers}.
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredDiseases.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-emerald-200 shadow-xs">
            <p className="text-slate-600 font-bold text-sm">No diseases match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
