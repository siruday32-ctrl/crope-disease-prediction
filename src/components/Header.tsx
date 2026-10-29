import React from 'react';
import {
  Sprout,
  Home,
  ScanLine,
  BookOpen,
  CloudSunRain,
  CloudLightning,
  Calculator,
  History,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export type ActiveTab =
  | 'home'
  | 'scanner'
  | 'weather_change'
  | 'catalog'
  | 'weather'
  | 'dosage'
  | 'about'
  | 'history';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  historyCount
}) => {
  const tabs = [
    { id: 'home' as ActiveTab, label: 'Home', icon: Home },
    { id: 'scanner' as ActiveTab, label: 'Leaf Scanner', icon: ScanLine },
    {
      id: 'weather_change' as ActiveTab,
      label: 'Weather Predictor',
      icon: CloudLightning
    },
    { id: 'catalog' as ActiveTab, label: 'Disease Catalog', icon: BookOpen },
    { id: 'weather' as ActiveTab, label: 'Microclimate', icon: CloudSunRain },
    { id: 'dosage' as ActiveTab, label: 'Dosage Tool', icon: Calculator },
    { id: 'about' as ActiveTab, label: 'About & Science', icon: ShieldCheck },
    {
      id: 'history' as ActiveTab,
      label: 'History',
      icon: History,
      badge: historyCount > 0 ? historyCount : undefined
    }
  ];

  return (
    <header className="bouncy-header sticky top-0 z-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand with Bouncy Interactive Sprout */}
          <div
            className="flex items-center space-x-3 cursor-pointer group select-none"
            onClick={() => onTabChange('home')}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-emerald-700 shadow-[0_4px_0_0_#047857] flex items-center justify-center text-white transition-all duration-300 group-hover:scale-115 group-hover:-rotate-6 group-active:scale-95 group-active:translate-y-1 group-active:shadow-[0_1px_0_0_#047857]">
              <Sprout className="w-6 h-6 animate-bouncy-wiggle" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Crop Disease Prediction
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                  Portal
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Bar with Bouncy Tabs */}
          <nav className="hidden xl:flex items-center space-x-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-2xl text-xs font-black transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#047857] scale-[1.03] -translate-y-0.5'
                      : 'bg-emerald-50/60 text-slate-700 hover:bg-emerald-100 hover:text-emerald-900 border-2 border-transparent hover:border-emerald-200 hover:scale-105 active:scale-95'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'animate-bounce' : ''}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-amber-950 font-black shadow-2xs">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Quick Action CTA Button */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => onTabChange('scanner')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-emerald-950 text-xs sm:text-sm font-black rounded-xl border-2 border-yellow-500 shadow-[0_3px_0_0_#ca8a04] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              <ScanLine className="w-4 h-4 text-emerald-950" />
              <span>Diagnose Leaf</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Scrollable Navigation with Bouncy Pills */}
        <div className="flex xl:hidden overflow-x-auto py-2.5 space-x-2 border-t-2 border-emerald-100 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center whitespace-nowrap space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#047857] scale-105'
                    : 'bg-emerald-50 text-slate-700 hover:bg-emerald-100 border border-emerald-200 active:scale-95'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-amber-950 font-black shadow-2xs">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
