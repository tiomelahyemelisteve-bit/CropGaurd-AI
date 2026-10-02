import { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Camera,
  Upload,
  ArrowRight,
  Activity,
  ShieldCheck,
  Leaf,
  ScanLine,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ShieldAlert,
  XCircle,
} from 'lucide-react';
import type { InferenceResult, Page, SymptomAnswers, CropType } from '@/types';
import { CROP_LABELS } from '@/types';

interface ResultPageProps {
  result: InferenceResult;
  imagePreview: string | null;
  onNavigate: (page: Page) => void;
  onRetake: () => void;
}

const SEVERITY_CONFIG = {
  Mild: {
    color: '#4d9e55',
    bgColor: 'rgba(77, 158, 85, 0.12)',
    borderColor: 'rgba(77, 158, 85, 0.3)',
    barWidth: '8%',
    description: 'Affected lesion area < 10%',
  },
  Moderate: {
    color: '#f7ad2e',
    bgColor: 'rgba(247, 173, 46, 0.12)',
    borderColor: 'rgba(247, 173, 46, 0.3)',
    barWidth: '25%',
    description: 'Affected lesion area 10–30%',
  },
  Severe: {
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    barWidth: '65%',
    description: 'Affected lesion area > 30%',
  },
};

const SYMPTOM_QUESTIONS = [
  {
    key: 'nearbyPlants' as keyof SymptomAnswers,
    question: 'Are similar symptoms visible on nearby plants?',
  },
  {
    key: 'areaIncreasing' as keyof SymptomAnswers,
    question: 'Is the affected area increasing?',
  },
  {
    key: 'leafColorChange' as keyof SymptomAnswers,
    question: 'Is the leaf turning yellow or brown?',
  },
];

const ANSWER_OPTIONS: { value: 'yes' | 'no' | 'not_sure'; label: string; color: string }[] = [
  { value: 'yes', label: 'Yes', color: 'amber2' },
  { value: 'no', label: 'No', color: 'natural' },
  { value: 'not_sure', label: 'Not Sure', color: 'forest' },
];

export default function ResultPage({
  result,
  imagePreview,
  onNavigate,
  onRetake,
}: ResultPageProps) {
  const [showSymptomValidation, setShowSymptomValidation] = useState(false);
  const [symptomAnswers, setSymptomAnswers] = useState<SymptomAnswers>({
    nearbyPlants: null,
    areaIncreasing: null,
    leafColorChange: null,
  });

  const { isUnsupported, isUncertain, isHealthy, disease, confidence, severity, crop, cropLabel } = result;
  const sevConfig = SEVERITY_CONFIG[severity];

  // Unsupported image warning
  if (isUnsupported) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 border-red-500/30 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="font-display font-bold text-2xl text-white mb-3">
              Unsupported Image
            </h1>
            <p className="text-forest-400 mb-8 max-w-md mx-auto">
              Unsupported image. Please upload a clear image of a crop leaf.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={onRetake} className="btn-primary text-sm">
                <Camera className="w-4 h-4" />
                Retake Photo
              </button>
              <button onClick={() => onNavigate('analyze')} className="btn-secondary text-sm">
                <Upload className="w-4 h-4" />
                Upload Another Image
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Uncertain / low confidence result
  if (isUncertain) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Warning header */}
          <div className="glass-card p-8 border-amber2-500/30 text-center mb-6">
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 bg-amber2-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-16 h-16 rounded-2xl bg-amber2-500/15 border border-amber2-500/30 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-amber2-400" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber2-500/10 border border-amber2-500/30 mb-4">
              <ShieldAlert className="w-3.5 h-3.5 text-amber2-400" />
              <span className="text-amber2-300 text-xs font-bold uppercase tracking-wider">
                Uncertain Result
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl text-white mb-3">
              ⚠️ UNCERTAIN RESULT
            </h1>
            <p className="text-forest-300 mb-2 max-w-lg mx-auto">
              The system does not have enough confidence to provide a reliable
              disease prediction.
            </p>
            <div className="mt-4 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-forest-950/60 border border-forest-700/50">
              <span className="text-forest-400 text-sm">Confidence Score:</span>
              <span className="text-amber2-400 font-display font-bold text-lg">{confidence}%</span>
              <span className="text-forest-500 text-xs">(below 70% threshold)</span>
            </div>
          </div>

          {/* Image with uncertain overlay */}
          {imagePreview && (
            <div className="glass-card p-3 mb-6 overflow-hidden">
              <div className="relative rounded-xl overflow-hidden">
                <img src={imagePreview} alt="Analyzed leaf" className="w-full max-h-[300px] object-contain bg-forest-950 opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-card px-4 py-2 border-amber2-500/30">
                    <span className="text-amber2-300 text-sm font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Low Confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onRetake} className="btn-primary text-sm">
              <Camera className="w-4 h-4" />
              Retake Photo
            </button>
            <button onClick={() => onNavigate('analyze')} className="btn-secondary text-sm">
              <Upload className="w-4 h-4" />
              Upload Another Image
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-forest-500 italic max-w-md mx-auto">
            CropGuard AI does not force a disease prediction when confidence is low.
            Try capturing a clearer, well-lit photo of the affected leaf.
          </p>
        </div>
      </div>
    );
  }

  // Confident result (healthy or disease)
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reliability badge */}
        <div className="flex justify-center mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
            isHealthy
              ? 'bg-natural-500/10 border-natural-500/30'
              : 'bg-natural-500/10 border-natural-500/30'
          }`}>
            <CheckCircle2 className={`w-4 h-4 ${isHealthy ? 'text-natural-400' : 'text-natural-400'}`} />
            <span className="text-natural-300 text-sm font-semibold">
              ✓ Reliable Prediction
            </span>
          </div>
        </div>

        {/* Result Card */}
        <div className="glass-card p-6 lg:p-8 mb-6 border-natural-500/20">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Image with heatmap overlay */}
            <div>
              <div className="relative rounded-xl overflow-hidden border border-forest-700/50">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Analyzed leaf" className="w-full h-full object-contain bg-forest-950" />
                    {/* Heatmap overlay */}
                    {!isHealthy && result.heatmapRegions.length > 0 && (
                      <div className="absolute inset-0 pointer-events-none">
                        {result.heatmapRegions.map((region, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full border-2 border-amber2-400/60 animate-fade-in"
                            style={{
                              left: `${region.x}%`,
                              top: `${region.y}%`,
                              width: `${region.width}%`,
                              height: `${region.height}%`,
                              backgroundColor: `rgba(247, 173, 46, ${region.intensity * 0.25})`,
                              boxShadow: `0 0 ${region.intensity * 20}px rgba(247, 173, 46, ${region.intensity * 0.4})`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                        <div className="absolute inset-0 grid-bg opacity-20" />
                      </div>
                    )}
                    {/* Scan line effect */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-natural-400/40" />
                  </>
                ) : (
                  <div className="w-full h-64 flex items-center justify-center bg-forest-950">
                    <Leaf className="w-12 h-12 text-forest-700" />
                  </div>
                )}

                {/* Heatmap label */}
                {!isHealthy && result.heatmapRegions.length > 0 && (
                  <div className="absolute bottom-2 left-2 glass-card px-2.5 py-1 border-amber2-500/30">
                    <span className="text-amber2-300 text-[10px] font-semibold flex items-center gap-1.5">
                      <ScanLine className="w-3 h-3" />
                      AI Highlighted Regions
                    </span>
                  </div>
                )}
              </div>

              {/* Confidence meter */}
              <div className="mt-4 p-4 rounded-xl bg-forest-800/40 border border-forest-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-forest-300 text-xs font-semibold uppercase tracking-wider">Confidence</span>
                  <span className="text-white font-display font-bold text-2xl">{confidence}%</span>
                </div>
                <div className="h-2 rounded-full bg-forest-950/60 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${confidence}%`,
                      background: `linear-gradient(90deg, #3d8741, #4d9e55)`,
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-natural-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3" />
                  {result.reliability}
                </p>
              </div>
            </div>

            {/* Result details */}
            <div className="flex flex-col justify-center">
              <div className="space-y-4">
                {/* Crop */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-forest-800/30 border border-forest-700/30">
                  <span className="text-forest-400 text-sm">Crop</span>
                  <span className="text-white font-semibold text-sm">{cropLabel}</span>
                </div>

                {/* Possible Disease */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-forest-800/30 border border-forest-700/30">
                  <span className="text-forest-400 text-sm">Possible Disease</span>
                  <span className={`font-semibold text-sm ${isHealthy ? 'text-natural-400' : 'text-amber2-300'}`}>
                    {result.diseaseName}
                  </span>
                </div>

                {/* Confidence */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-forest-800/30 border border-forest-700/30">
                  <span className="text-forest-400 text-sm">Confidence</span>
                  <span className="text-white font-semibold text-sm">{confidence}%</span>
                </div>

                {/* Severity */}
                {!isHealthy && (
                  <div className="p-3 rounded-lg border" style={{ backgroundColor: sevConfig.bgColor, borderColor: sevConfig.borderColor }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-forest-300 text-sm flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        Severity
                      </span>
                      <span className="font-semibold text-sm" style={{ color: sevConfig.color }}>{severity}</span>
                    </div>
                    <div className="h-2 rounded-full bg-forest-950/40 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: sevConfig.barWidth, backgroundColor: sevConfig.color }}
                      />
                    </div>
                    <p className="mt-1.5 text-[11px] text-forest-400">{sevConfig.description}</p>
                  </div>
                )}

                {/* Reliability */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-natural-500/8 border border-natural-500/20">
                  <span className="text-forest-300 text-sm">Reliability</span>
                  <span className="text-natural-300 font-semibold text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {result.reliability}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why this prediction */}
        {!isHealthy && disease && (
          <div className="glass-card p-6 mb-6">
            <h3 className="text-white font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber2-400" />
              Why this prediction?
            </h3>
            <p className="text-forest-300 text-sm leading-relaxed mb-4">
              The system detected visual characteristics consistent with{' '}
              <span className="text-white font-semibold">{disease.name}</span>:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {disease.visualCharacteristics.map((char, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-forest-800/30 border border-forest-700/30">
                  <div className="w-5 h-5 rounded-full bg-amber2-500/15 border border-amber2-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ScanLine className="w-3 h-3 text-amber2-400" />
                  </div>
                  <span className="text-forest-200 text-xs leading-relaxed">{char}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-forest-500 italic">
              {disease.description}
            </p>
          </div>
        )}

        {/* Healthy message */}
        {isHealthy && (
          <div className="glass-card p-6 mb-6 border-natural-500/20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-natural-500/15 border border-natural-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-natural-400" />
            </div>
            <h3 className="text-white font-display font-bold text-xl mb-2">Your Leaf Looks Healthy!</h3>
            <p className="text-forest-400 text-sm max-w-md mx-auto">
              No disease symptoms were detected. The leaf appears to have normal
              coloration and structure. Continue regular monitoring.
            </p>
          </div>
        )}

        {/* Recommendations */}
        {!isHealthy && disease && (
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Management */}
            <div className="glass-card p-6">
              <h3 className="text-white font-display font-bold text-lg mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-natural-500/15 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-natural-400" />
                </div>
                Management
              </h3>
              <p className="text-forest-400 text-xs mb-4">
                General, safe crop-management actions for {disease.name}:
              </p>
              <div className="space-y-2.5">
                {disease.management.map((action, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-natural-400 flex-shrink-0 mt-0.5" />
                    <span className="text-forest-200 text-xs leading-relaxed">{action}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-forest-700/30">
                <p className="text-amber2-300 text-xs font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Follow locally approved agricultural guidance.
                </p>
              </div>
            </div>

            {/* Prevention */}
            <div className="glass-card p-6">
              <h3 className="text-white font-display font-bold text-lg mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-forest-600/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-forest-300" />
                </div>
                Prevention
              </h3>
              <p className="text-forest-400 text-xs mb-4">
                Practical prevention and monitoring guidance:
              </p>
              <div className="space-y-2.5">
                {disease.prevention.map((action, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-forest-300 flex-shrink-0 mt-0.5" />
                    <span className="text-forest-200 text-xs leading-relaxed">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Symptom Validation - Optional */}
        {!isHealthy && disease && (
          <div className="glass-card p-6 mb-6 border-forest-700/40">
            <button
              onClick={() => setShowSymptomValidation(!showSymptomValidation)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber2-500/15 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-amber2-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-display font-bold text-base">Improve Assessment</h3>
                  <p className="text-forest-400 text-xs">Optional farmer questions to support the analysis</p>
                </div>
              </div>
              {showSymptomValidation ? (
                <ChevronUp className="w-5 h-5 text-forest-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-forest-400" />
              )}
            </button>

            {showSymptomValidation && (
              <div className="mt-5 pt-5 border-t border-forest-700/30 animate-fade-in">
                <div className="space-y-5">
                  {SYMPTOM_QUESTIONS.map((q) => (
                    <div key={q.key}>
                      <p className="text-forest-200 text-sm mb-2.5 font-medium">
                        {q.question}
                      </p>
                      <div className="flex gap-2">
                        {ANSWER_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => setSymptomAnswers((prev) => ({ ...prev, [q.key]: opt.value }))}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                              symptomAnswers[q.key] === opt.value
                                ? opt.color === 'amber2'
                                  ? 'bg-amber2-500/20 border-amber2-500/40 text-amber2-300 border'
                                  : opt.color === 'natural'
                                    ? 'bg-natural-500/20 border-natural-500/40 text-natural-300 border'
                                    : 'bg-forest-700/40 border-forest-600/40 text-forest-200 border'
                                : 'bg-forest-800/30 border-forest-700/30 text-forest-400 border hover:text-forest-200'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3 rounded-lg bg-forest-800/30 border border-forest-700/30">
                  <p className="text-forest-400 text-xs italic">
                    These inputs can be used alongside image analysis as a future enhancement
                    to improve prediction accuracy and confidence calibration. This feature
                    is a prototype demonstration — answers are not yet incorporated into the
                    model's prediction.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <div className="glass-card p-4 mb-6 border-amber2-500/20 bg-amber2-500/5">
          <p className="text-amber2-200 text-xs leading-relaxed text-center">
            This is a prototype estimation based on visible lesion/affected area.
            It is not a certified agricultural diagnosis. Always follow locally
            approved agricultural guidance and consult local agricultural extension
            services for professional advice.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onRetake} className="btn-primary text-sm">
            <Camera className="w-4 h-4" />
            Analyze Another Leaf
          </button>
          <button onClick={() => onNavigate('home')} className="btn-ghost text-sm">
            <ArrowRight className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
