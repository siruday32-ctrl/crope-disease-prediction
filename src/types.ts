export type CropType =
  | 'Tomato'
  | 'Potato'
  | 'Corn (Maize)'
  | 'Rice'
  | 'Wheat'
  | 'Apple'
  | 'Grape'
  | 'Pepper (Bell)'
  | 'Cotton';

export type PathogenType =
  | 'Fungal'
  | 'Bacterial'
  | 'Viral'
  | 'Pest / Insect'
  | 'Nutrient Deficiency'
  | 'None (Healthy)';

export type SeverityLevel =
  | 'Healthy'
  | 'Low (Early Stage)'
  | 'Moderate'
  | 'High (Severe)';

export interface DiseaseInfo {
  id: string;
  crop: CropType;
  name: string;
  scientificName: string;
  pathogen: PathogenType;
  description: string;
  symptoms: string[];
  causes: string[];
  favorableConditions: {
    tempRange: string;
    humidity: string;
    triggers: string;
  };
  organicTreatments: string[];
  chemicalTreatments: string[];
  prevention: string[];
  sampleImage: string; // SVG data URI representation
  riskFactors: string[];
}

export interface PredictionResult {
  id: string;
  timestamp: string;
  crop: CropType;
  disease: string;
  pathogen: PathogenType;
  confidence: number; // 0 - 100
  secondaryPrediction?: {
    disease: string;
    confidence: number;
  };
  severity: SeverityLevel;
  affectedAreaPercent: number;
  leafMetrics: {
    greennessScore: number;
    yellowingScore: number;
    necrosisScore: number;
    detectedSpots: number;
  };
  symptoms: string[];
  organicTreatments: string[];
  chemicalTreatments: string[];
  prevention: string[];
  scientificName: string;
  favorableConditions?: {
    tempRange: string;
    humidity: string;
    triggers: string;
  };
  imageUrl: string;
  userNotes?: string;
}

export interface DiagnosisRecord extends PredictionResult {
  fieldLocation?: string;
  cropStage?: string;
}

export interface WeatherCondition {
  temperatureC: number;
  humidityPercent: number;
  recentRainfall: boolean;
  foliarWetnessHours: number;
}
