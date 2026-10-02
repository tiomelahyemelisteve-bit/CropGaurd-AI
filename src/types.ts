export type CropType = 'maize' | 'tomato' | 'potato';

export type Severity = 'Mild' | 'Moderate' | 'Severe';

export type Reliability = 'High-confidence prediction' | 'Low-confidence — uncertain result';

export interface DiseaseInfo {
  id: string;
  crop: CropType;
  name: string;
  description: string;
  visualCharacteristics: string[];
  management: string[];
  prevention: string[];
}

export interface InferenceResult {
  crop: CropType;
  cropLabel: string;
  disease: DiseaseInfo | null;
  diseaseName: string;
  confidence: number;
  severity: Severity;
  severityAreaPercent: number;
  reliability: Reliability;
  isHealthy: boolean;
  isUncertain: boolean;
  isUnsupported: boolean;
  heatmapRegions: HeatmapRegion[];
}

export interface HeatmapRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  intensity: number;
}

export interface SymptomAnswers {
  nearbyPlants: 'yes' | 'no' | 'not_sure' | null;
  areaIncreasing: 'yes' | 'no' | 'not_sure' | null;
  leafColorChange: 'yes' | 'no' | 'not_sure' | null;
}

export type Page = 'home' | 'analyze' | 'result' | 'how-it-works' | 'architecture' | 'evaluation';

export const CROP_LABELS: Record<CropType, string> = {
  maize: 'Maize',
  tomato: 'Tomato',
  potato: 'Potato',
};

export const CROP_ICONS: Record<CropType, string> = {
  maize: '🌾',
  tomato: '🍅',
  potato: '🥔',
};

export const PIPELINE_STEPS = [
  { id: 'capture', label: 'Capturing', icon: 'Camera', description: 'Acquiring leaf image from camera or upload' },
  { id: 'preprocess', label: 'Pre-processing', icon: 'ImageDown', description: 'Resizing, normalizing, and enhancing image data' },
  { id: 'classify', label: 'Classifying', icon: 'BrainCircuit', description: 'Running CNN model inference on leaf features' },
  { id: 'validate', label: 'Validating', icon: 'ShieldCheck', description: 'Checking confidence against reliability threshold' },
  { id: 'respond', label: 'Responding', icon: 'MessageSquareHeart', description: 'Generating severity, management & prevention advice' },
] as const;
