import {
  Target,
  TrendingUp,
  CheckCircle2,
  Leaf,
  AlertCircle,
  Award,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';
import type { Page } from '@/types';

interface EvaluationPageProps {
  onNavigate: (page: Page) => void;
}

const EVALUATION_TARGETS = [
  {
    icon: TrendingUp,
    label: 'Recall',
    target: '≥ 90%',
    description: 'The model should correctly identify at least 90% of actual disease cases, minimizing false negatives that could leave diseases untreated.',
    color: 'natural',
  },
  {
    icon: Target,
    label: 'Precision',
    target: '≥ 90%',
    description: 'When the model predicts a disease, it should be correct at least 90% of the time, minimizing false positives that could lead to unnecessary treatments.',
    color: 'amber2',
  },
  {
    icon: Layers,
    label: 'Coverage',
    target: '3 Crops + 6 Diseases',
    description: 'Maize (Gray Leaf Spot, Northern Leaf Blight, Common Rust), Tomato (Early Blight, Late Blight), Potato (Late Blight) — plus Healthy.',
    color: 'forest',
  },
];

const EVALUATION_METRICS = [
  {
    name: 'Recall (Sensitivity)',
    formula: 'TP / (TP + FN)',
    explanation: 'Of all actual disease cases, what proportion does the model correctly identify?',
  },
  {
    name: 'Precision',
    formula: 'TP / (TP + FP)',
    explanation: 'Of all predicted disease cases, what proportion are actually correct?',
  },
  {
    name: 'F1-Score',
    formula: '2 × (P × R) / (P + R)',
    explanation: 'Harmonic mean of precision and recall — balanced measure of model quality.',
  },
  {
    name: 'Confidence Calibration',
    formula: 'Reliability Diagram',
    explanation: 'Does the model\'s confidence score accurately reflect its true probability of being correct?',
  },
];

const CROP_DISEASE_BREAKDOWN = [
  {
    crop: 'Maize',
    emoji: '🌾',
    diseases: ['Gray Leaf Spot', 'Northern Leaf Blight', 'Common Rust'],
    count: 3,
  },
  {
    crop: 'Tomato',
    emoji: '🍅',
    diseases: ['Early Blight', 'Late Blight'],
    count: 2,
  },
  {
    crop: 'Potato',
    emoji: '🥔',
    diseases: ['Late Blight'],
    count: 1,
  },
];

export default function EvaluationPage({ onNavigate }: EvaluationPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-4">
            <Target className="w-3.5 h-3.5" />
            Evaluation
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4 text-balance">
            Targets / Evaluation Goals
          </h1>
          <p className="text-forest-400 max-w-2xl mx-auto">
            These are our intended evaluation targets for the CropGuard AI model —
            not achieved results. The current prototype uses a mock inference function.
          </p>
        </div>

        {/* Important Disclaimer */}
        <div className="glass-card p-5 border-amber2-500/20 bg-amber2-500/5 mb-12">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber2-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber2-200 text-sm font-semibold mb-1">
                These are targets, not results.
              </p>
              <p className="text-amber2-200/70 text-xs leading-relaxed">
                The metrics below represent our goals for the future trained model.
                We have not fabricated any accuracy or test results. The current
                website prototype uses a mock inference function for demonstration
                purposes only.
              </p>
            </div>
          </div>
        </div>

        {/* Target Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {EVALUATION_TARGETS.map((target) => (
            <div
              key={target.label}
              className="glass-card p-6 hover:border-natural-500/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor:
                      target.color === 'natural'
                        ? 'rgba(77, 158, 85, 0.15)'
                        : target.color === 'amber2'
                          ? 'rgba(247, 173, 46, 0.15)'
                          : 'rgba(34, 86, 37, 0.4)',
                    border: `1px solid ${
                      target.color === 'natural'
                        ? 'rgba(77, 158, 85, 0.3)'
                        : target.color === 'amber2'
                          ? 'rgba(247, 173, 46, 0.3)'
                          : 'rgba(34, 86, 37, 0.5)'
                    }`,
                  }}
                >
                  <target.icon
                    className="w-6 h-6"
                    style={{
                      color:
                        target.color === 'natural'
                          ? '#4d9e55'
                          : target.color === 'amber2'
                            ? '#f7ad2e'
                            : '#8fc091',
                    }}
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-500 px-2.5 py-1 rounded-full bg-forest-800/40">
                  Target
                </span>
              </div>
              <h3 className="text-white font-display font-bold text-lg mb-1">{target.label}</h3>
              <p
                className="font-display font-extrabold text-3xl mb-3"
                style={{
                  color:
                    target.color === 'natural'
                      ? '#4d9e55'
                      : target.color === 'amber2'
                        ? '#f7ad2e'
                        : '#8fc091',
                }}
              >
                {target.target}
              </p>
              <p className="text-forest-400 text-xs leading-relaxed">{target.description}</p>
            </div>
          ))}
        </div>

        {/* Crop & Disease Breakdown */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl text-white mb-2 text-center">
            Coverage Scope
          </h2>
          <p className="text-forest-400 text-sm mb-8 text-center">
            3 Crops + 6 Diseases + Healthy classification
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {CROP_DISEASE_BREAKDOWN.map((item) => (
              <div key={item.crop} className="glass-card p-5 hover:border-natural-500/20 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <h3 className="text-white font-display font-bold text-base">{item.crop}</h3>
                    <p className="text-forest-400 text-xs">{item.count} disease{item.count > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {item.diseases.map((disease) => (
                    <div key={disease} className="flex items-center gap-2 p-2 rounded-lg bg-forest-800/30 border border-forest-700/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-natural-400 flex-shrink-0" />
                      <span className="text-forest-200 text-xs">{disease}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-natural-500/8 border border-natural-500/20">
                    <Leaf className="w-3.5 h-3.5 text-natural-400 flex-shrink-0" />
                    <span className="text-natural-300 text-xs font-medium">Healthy</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Metrics */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl text-white mb-2 text-center">
            Evaluation Metrics
          </h2>
          <p className="text-forest-400 text-sm mb-8 text-center max-w-xl mx-auto">
            How we plan to evaluate the trained model's performance
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {EVALUATION_METRICS.map((metric) => (
              <div key={metric.name} className="glass-card p-5 hover:border-natural-500/20 transition-all">
                <div className="flex items-center gap-2.5 mb-3">
                  <Award className="w-4 h-4 text-natural-400" />
                  <h3 className="text-white font-semibold text-sm">{metric.name}</h3>
                </div>
                <div className="mb-3 inline-block px-3 py-1.5 rounded-lg bg-forest-950/60 border border-forest-700/30">
                  <code className="text-natural-300 text-xs font-mono">{metric.formula}</code>
                </div>
                <p className="text-forest-400 text-xs leading-relaxed">{metric.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Approach */}
        <div className="glass-card p-6 lg:p-8 mb-12">
          <h2 className="font-display font-bold text-xl text-white mb-6 text-center">
            Planned Evaluation Approach
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Train',
                description: 'Train CNN model on PlantVillage dataset with data augmentation',
              },
              {
                step: '02',
                title: 'Test',
                description: 'Evaluate on held-out test set measuring recall, precision, F1',
              },
              {
                step: '03',
                title: 'Calibrate',
                description: 'Calibrate confidence scores for reliable confidence gating',
              },
              {
                step: '04',
                title: 'Validate',
                description: 'Future validation with real Kenyan field photographs',
              },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forest-700 to-forest-800 flex items-center justify-center mx-auto mb-3 group-hover:from-natural-500/20 group-hover:to-forest-700 transition-all">
                  <span className="text-natural-300 font-display font-bold text-sm">{item.step}</span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-forest-400 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="glass-card p-5 border-amber2-500/20 bg-amber2-500/5 mb-12">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber2-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber2-200 text-xs leading-relaxed">
              <strong>Important:</strong> We do not fabricate accuracy or test results.
              The targets above are evaluation goals for the future trained model.
              The current prototype uses a mock inference function that simulates
              predictions for demonstration purposes only.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={() => onNavigate('analyze')} className="btn-primary text-base">
            Try the Demo Pipeline
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
