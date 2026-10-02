import type {
  CropType,
  InferenceResult,
  DiseaseInfo,
  Severity,
  HeatmapRegion,
} from './types';
import { DISEASE_DATABASE, HEALTHY_INFO, getDiseasesByCrop } from './diseaseDatabase';

const CONFIDENCE_THRESHOLD = 70;

function seededRandom(seed: number): () => number {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function estimateSeverity(areaPercent: number): Severity {
  if (areaPercent < 10) return 'Mild';
  if (areaPercent <= 30) return 'Moderate';
  return 'Severe';
}

function generateHeatmapRegions(
  rng: () => number,
  isHealthy: boolean,
  isUncertain: boolean
): HeatmapRegion[] {
  if (isHealthy) return [];
  if (isUncertain) {
    return [
      { x: 20 + rng() * 60, y: 20 + rng() * 60, width: 30, height: 30, intensity: 0.3 },
      { x: 20 + rng() * 60, y: 20 + rng() * 60, width: 25, height: 25, intensity: 0.2 },
    ];
  }
  const count = 3 + Math.floor(rng() * 4);
  const regions: HeatmapRegion[] = [];
  for (let i = 0; i < count; i++) {
    regions.push({
      x: 10 + rng() * 70,
      y: 10 + rng() * 70,
      width: 15 + rng() * 25,
      height: 15 + rng() * 25,
      intensity: 0.5 + rng() * 0.5,
    });
  }
  return regions;
}

function isLikelyLeafImage(fileName: string): boolean {
  const lower = fileName.toLowerCase();
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif', '.heic'];
  return imageExtensions.some((ext) => lower.endsWith(ext));
}

export function runMockInference(
  imageFile: File,
  cropType: CropType
): InferenceResult {
  const seed = hashString(imageFile.name + imageFile.size + cropType);
  const rng = seededRandom(seed);

  const supported = isLikelyLeafImage(imageFile.name);

  if (!supported) {
    return {
      crop: cropType,
      cropLabel: cropType.charAt(0).toUpperCase() + cropType.slice(1),
      disease: null,
      diseaseName: 'Unsupported Image',
      confidence: 0,
      severity: 'Mild',
      severityAreaPercent: 0,
      reliability: 'Low-confidence — uncertain result',
      isHealthy: false,
      isUncertain: true,
      isUnsupported: true,
      heatmapRegions: [],
    };
  }

  const diseases = getDiseasesByCrop(cropType);
  const roll = rng();

  let disease: DiseaseInfo | null = null;
  let isHealthy = false;
  let confidence: number;
  let severityAreaPercent: number;

  if (roll < 0.12) {
    isHealthy = true;
    disease = null;
    confidence = 88 + rng() * 10;
    severityAreaPercent = 0;
  } else if (roll < 0.22) {
    isHealthy = false;
    disease = null;
    confidence = 30 + rng() * 35;
    severityAreaPercent = 5 + rng() * 40;
  } else {
    const diseaseIndex = Math.floor(rng() * diseases.length);
    disease = diseases[diseaseIndex];
    confidence = 72 + rng() * 26;
    severityAreaPercent = 3 + rng() * 45;
  }

  const isUncertain = !isHealthy && confidence < CONFIDENCE_THRESHOLD;
  const severity = isHealthy ? 'Mild' : estimateSeverity(severityAreaPercent);
  const heatmapRegions = generateHeatmapRegions(rng, isHealthy, isUncertain);

  const diseaseName = isHealthy
    ? 'Healthy'
    : disease
      ? disease.name
      : 'Uncertain — No reliable match';

  const reliability =
    confidence >= CONFIDENCE_THRESHOLD
      ? 'High-confidence prediction'
      : 'Low-confidence — uncertain result';

  return {
    crop: cropType,
    cropLabel: cropType.charAt(0).toUpperCase() + cropType.slice(1),
    disease: isHealthy ? HEALTHY_INFO : disease,
    diseaseName,
    confidence: Math.round(confidence),
    severity,
    severityAreaPercent: Math.round(severityAreaPercent),
    reliability,
    isHealthy,
    isUncertain,
    isUnsupported: false,
    heatmapRegions,
  };
}

export { CONFIDENCE_THRESHOLD };
