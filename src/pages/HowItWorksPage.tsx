import {
  Camera,
  ImageDown,
  BrainCircuit,
  ShieldCheck,
  MessageSquareHeart,
  ArrowRight,
  AlertTriangle,
  Activity,
  CheckCircle2,
  XCircle,
  Leaf,
} from 'lucide-react';
import type { Page } from '@/types';
import { PIPELINE_STEPS } from '@/types';

interface HowItWorksProps {
  onNavigate: (page: Page) => void;
}

const PIPELINE_ICONS: Record<string, typeof Camera> = {
  capture: Camera,
  preprocess: ImageDown,
  classify: BrainCircuit,
  validate: ShieldCheck,
  respond: MessageSquareHeart,
};

const DETAILED_STEPS = [
  {
    icon: Camera,
    title: '1. Capture',
    subtitle: 'Phone Camera / Upload',
    description: 'The farmer captures a photo of the affected leaf using their smartphone camera, or uploads an existing image from their gallery.',
    details: [
      'Camera capture or gallery upload supported',
      'Drag-and-drop interface on web',
      'Crop type selection (Maize, Tomato, Potato)',
      'Image preview before analysis',
    ],
  },
  {
    icon: ImageDown,
    title: '2. Pre-process',
    subtitle: 'Image Preparation',
    description: 'The raw image is resized, normalized, and enhanced to produce consistent input for the classification model.',
    details: [
      'Resize to model input dimensions (e.g. 224×224)',
      'Pixel normalization and color space standardization',
      'Noise reduction and contrast enhancement',
      'Format conversion to model-compatible tensors',
    ],
  },
  {
    icon: BrainCircuit,
    title: '3. Classify',
    subtitle: 'AI Model Inference',
    description: 'The pre-processed image is passed through a convolutional neural network (CNN) that identifies visual disease patterns.',
    details: [
      'CNN architecture: MobileNetV2 / Efficient CNN',
      'Trained on PlantVillage dataset + future field photos',
      'Outputs probability scores for each disease class',
      'Also identifies Healthy leaves with no symptoms',
    ],
  },
  {
    icon: ShieldCheck,
    title: '4. Validate',
    subtitle: 'Confidence Gate',
    description: 'The system checks whether the model\'s confidence is high enough to trust. This is the key differentiator of CropGuard AI.',
    details: [
      'Confidence threshold: ≥70% for reliable prediction',
      'High confidence → "Reliable prediction" shown',
      'Low confidence → "Uncertain result" warning displayed',
      'Never forces a disease prediction when uncertain',
    ],
  },
  {
    icon: MessageSquareHeart,
    title: '5. Respond',
    subtitle: 'Severity + Recommendations',
    description: 'For confident predictions, the system estimates severity and generates farmer-friendly management and prevention guidance.',
    details: [
      'Severity estimation: Mild (<10%), Moderate (10–30%), Severe (>30%)',
      'Management actions for the identified condition',
      'Prevention guidance for future seasons',
      'Optional symptom validation from farmer questions',
    ],
  },
];

const SEVERITY_LEVELS = [
  {
    label: 'Mild',
    range: '< 10% affected area',
    color: 'natural',
    description: 'Early-stage infection with minimal leaf area affected',
  },
  {
    label: 'Moderate',
    range: '10–30% affected area',
    color: 'amber2',
    description: 'Established infection requiring timely intervention',
  },
  {
    label: 'Severe',
    range: '> 30% affected area',
    color: 'red',
    description: 'Advanced infection needing immediate action',
  },
];

export default function HowItWorks({ onNavigate }: HowItWorksProps) {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-4">How It Works</div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4 text-balance">
            From Leaf Photo to Trusted Answer
          </h1>
          <p className="text-forest-400 max-w-2xl mx-auto">
            Every analysis follows the same five-step pipeline. Each step adds a
            layer of trust and actionable insight — we don't just detect, we validate.
          </p>
        </div>

        {/* Pipeline Flow */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row items-stretch gap-3">
            {PIPELINE_STEPS.map((step, index) => {
              const Icon = PIPELINE_ICONS[step.id] || Camera;
              return (
                <div key={step.id} className="flex items-center gap-3 flex-1">
                  <div className="glass-card p-5 flex-1 hover:border-natural-500/30 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-700 to-forest-800 flex items-center justify-center group-hover:from-natural-500/20 group-hover:to-forest-700 transition-all">
                        <Icon className="w-5 h-5 text-natural-300" />
                      </div>
                      <span className="text-xs font-bold text-forest-500 uppercase tracking-wider">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">{step.label}</h3>
                    <p className="text-forest-400 text-xs leading-relaxed">{step.description}</p>
                  </div>
                  {index < PIPELINE_STEPS.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-forest-600 flex-shrink-0 hidden lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Steps */}
        <div className="space-y-6 mb-20">
          {DETAILED_STEPS.map((step) => (
            <div
              key={step.title}
              className="glass-card p-6 lg:p-8 hover:border-natural-500/20 transition-all duration-300"
            >
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-natural-500/20 to-forest-700 border border-natural-500/20 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-natural-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-display font-bold text-lg">{step.title}</h3>
                      <p className="text-natural-400 text-xs font-medium">{step.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-forest-400 text-sm leading-relaxed">{step.description}</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-start gap-2.5 p-3 rounded-lg bg-forest-800/30 border border-forest-700/30">
                        <CheckCircle2 className="w-4 h-4 text-natural-400 flex-shrink-0 mt-0.5" />
                        <span className="text-forest-200 text-xs leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Confidence Gate Explanation */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="section-label mb-4" style={{ borderColor: 'rgba(247, 173, 46, 0.3)', color: '#f7ad2e', background: 'rgba(247, 173, 46, 0.1)' }}>
              <ShieldCheck className="w-3.5 h-3.5" />
              The Confidence Gate
            </div>
            <h2 className="font-display font-bold text-3xl text-white mb-4 text-balance">
              We Don't Blindly Guess
            </h2>
            <p className="text-forest-400 max-w-2xl mx-auto">
              The Confidence Gate is the heart of CropGuard AI. If the model isn't
              sure enough, it says so — instead of presenting a potentially wrong
              answer as fact.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* High Confidence */}
            <div className="glass-card p-6 border-natural-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-natural-500/15 border border-natural-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-natural-400" />
                </div>
                <div>
                  <h3 className="text-white font-display font-bold text-lg">High Confidence</h3>
                  <p className="text-natural-400 text-xs">Confidence ≥ 70%</p>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-natural-400 flex-shrink-0" />
                  <span className="text-forest-200 text-sm">Reliable prediction displayed</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-natural-400 flex-shrink-0" />
                  <span className="text-forest-200 text-sm">Disease name + confidence score shown</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-natural-400 flex-shrink-0" />
                  <span className="text-forest-200 text-sm">Severity assessment provided</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-natural-400 flex-shrink-0" />
                  <span className="text-forest-200 text-sm">Management + prevention guidance given</span>
                </div>
              </div>
            </div>

            {/* Low Confidence */}
            <div className="glass-card p-6 border-amber2-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber2-500/15 border border-amber2-500/30 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber2-400" />
                </div>
                <div>
                  <h3 className="text-white font-display font-bold text-lg">Low Confidence</h3>
                  <p className="text-amber2-400 text-xs">Confidence &lt; 70%</p>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-amber2-400 flex-shrink-0" />
                  <span className="text-forest-200 text-sm">"Uncertain result" warning shown</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-amber2-400 flex-shrink-0" />
                  <span className="text-forest-200 text-sm">No disease prediction forced</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-amber2-400 flex-shrink-0" />
                  <span className="text-forest-200 text-sm">Farmer asked to retake or re-upload photo</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-amber2-400 flex-shrink-0" />
                  <span className="text-forest-200 text-sm">Clear message: not enough confidence</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Severity Scale */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="section-label mb-4">
              <Activity className="w-3.5 h-3.5" />
              Severity Scale
            </div>
            <h2 className="font-display font-bold text-3xl text-white mb-4 text-balance">
              Estimating Disease Impact
            </h2>
            <p className="text-forest-400 max-w-2xl mx-auto">
              Based on the estimated percentage of affected leaf area, CropGuard AI
              classifies severity into three levels. This is a prototype estimation —
              not a certified agricultural diagnosis.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {SEVERITY_LEVELS.map((level) => (
              <div key={level.label} className="glass-card p-6 hover:border-natural-500/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-display font-bold text-xl">{level.label}</h3>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        level.color === 'natural' ? '#4d9e55' : level.color === 'amber2' ? '#f7ad2e' : '#ef4444',
                    }}
                  />
                </div>
                <p className="text-forest-200 text-sm font-semibold mb-2">{level.range}</p>
                <p className="text-forest-400 text-xs leading-relaxed">{level.description}</p>
                {/* Visual bar */}
                <div className="mt-4 h-2 rounded-full bg-forest-800/60 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: level.color === 'natural' ? '8%' : level.color === 'amber2' ? '25%' : '60%',
                      backgroundColor:
                        level.color === 'natural' ? '#4d9e55' : level.color === 'amber2' ? '#f7ad2e' : '#ef4444',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-xs text-forest-500 italic">
            Prototype estimation based on visible lesion/affected area. Not a certified agricultural diagnosis.
          </p>
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
