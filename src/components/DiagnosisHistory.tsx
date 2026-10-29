import React from 'react';
import {
  History,
  Trash2,
  Calendar,
  ChevronRight,
  Download,
  AlertCircle
} from 'lucide-react';
import { PredictionResult } from '../types';

interface DiagnosisHistoryProps {
  records: PredictionResult[];
  onSelectRecord: (record: PredictionResult) => void;
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
}

export const DiagnosisHistory: React.FC<DiagnosisHistoryProps> = ({
  records,
  onSelectRecord,
  onDeleteRecord,
  onClearAll
}) => {
  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `crop-disease-scans-${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bouncy-card bg-white p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-[0_3px_0_0_#047857] animate-bouncy-wiggle">
              <History className="w-5 h-5" />
            </div>
            Field Diagnostic History ({records.length})
          </h2>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            Log of leaf diagnoses, disease prevalence trends, and treatment audits.
          </p>
        </div>

        {records.length > 0 && (
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportJson}
              className="flex items-center gap-2 px-4 py-2 text-xs font-black text-slate-800 bg-white hover:bg-slate-50 rounded-xl border-2 border-slate-300 shadow-[0_3px_0_0_#cbd5e1] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all bouncy-pill cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              Export Records (.json)
            </button>
            <button
              onClick={onClearAll}
              className="flex items-center gap-2 px-4 py-2 text-xs font-black text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border-2 border-rose-300 shadow-[0_3px_0_0_#fecdd3] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all bouncy-pill cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Clear Log
            </button>
          </div>
        )}
      </div>

      {records.length === 0 ? (
        <div className="text-center py-16 border-3 border-dashed border-emerald-200 rounded-3xl bouncy-card-subtle">
          <History className="w-14 h-14 mx-auto text-emerald-400 mb-3 animate-bouncy-hop" />
          <h3 className="text-lg font-black text-slate-800">No Scans Recorded Yet</h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1.5 max-w-sm mx-auto">
            Uploaded leaf scans and diagnostic predictions you save will be archived here for record keeping and trend comparison.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {records.map((record) => (
            <div
              key={record.id}
              className="py-4 px-5 rounded-2xl bouncy-card-subtle bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_6px_0_0_#a7f3d0] transition-all duration-200 cursor-pointer group"
              onClick={() => onSelectRecord(record)}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-emerald-300 overflow-hidden shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={record.imageUrl}
                    alt={record.disease}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-black text-slate-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-300 shadow-2xs">
                      {record.crop}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs ${
                        record.pathogen === 'None (Healthy)'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-rose-100 text-rose-900 border border-rose-300'
                      }`}
                    >
                      {record.pathogen}
                    </span>
                    <span className="text-xs font-black text-emerald-700">
                      {record.confidence}% Conf.
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {record.disease}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(record.timestamp).toLocaleString()}</span>
                    <span>•</span>
                    <span>Severity: {record.severity}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteRecord(record.id);
                  }}
                  className="p-2.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors bouncy-pill cursor-pointer"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1 text-xs font-black text-emerald-700 group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
