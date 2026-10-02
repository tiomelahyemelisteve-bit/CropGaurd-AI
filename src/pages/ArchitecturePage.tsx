import {
  Camera,
  ImageDown,
  BrainCircuit,
  ShieldCheck,
  Activity,
  MessageSquareHeart,
  Smartphone,
  Cpu,
  Database,
  ArrowRight,
  Code2,
  Layers,
  WifiOff,
  CheckCircle2,
} from 'lucide-react';
import type { Page } from '@/types';

interface ArchitecturePageProps {
  onNavigate: (page: Page) => void;
}

const ARCHITECTURE_STEPS = [
  { icon: Smartphone, label: 'Phone Camera / Upload', description: 'Image acquisition via camera or file upload' },
  { icon: ImageDown, label: 'Image Pre-processing', description: 'Resize, normalize, enhance, tensor conversion' },
  { icon: BrainCircuit, label: 'AI Classification', description: 'CNN model inference on leaf features' },
  { icon: ShieldCheck, label: 'Confidence Gate', description: 'Threshold check: ≥70% for reliable prediction' },
  { icon: Activity, label: 'Severity Assessment', description: 'Estimate affected area percentage → Mild/Moderate/Severe' },
  { icon: MessageSquareHeart, label: 'Recommendation Engine', description: 'Generate management + prevention guidance' },
  { icon: CheckCircle2, label: 'Farmer Result', description: 'Disease + confidence + severity + advice delivered' },
];

const TECH_LABELS = [
  {
    category: 'Frontend',
    icon: Code2,
    items: [
      { label: 'Mobile/Web Application', note: 'React + responsive design' },
      { label: 'Camera & File Upload', note: 'Browser-based image capture' },
      { label: 'Progressive UI', note: 'Works on low-cost smartphones' },
    ],
  },
  {
    category: 'AI / ML',
    icon: Cpu,
    items: [
      { label: 'Python', note: 'Core ML pipeline language' },
      { label: 'TensorFlow / Keras', note: 'Model training & inference framework' },
      { label: 'MobileNetV2 / Efficient CNN', note: 'Lightweight convolutional architecture' },
    ],
  },
  {
    category: 'Future Deployment',
    icon: WifiOff,
    items: [
      { label: 'TensorFlow Lite', note: 'On-device model format' },
      { label: 'On-device Inference', note: 'No internet connection required' },
      { label: 'Offline Capability', note: 'For areas with limited connectivity' },
    ],
  },
  {
    category: 'Dataset',
    icon: Database,
    items: [
      { label: 'PlantVillage Dataset', note: '54,000+ labeled leaf images' },
      { label: 'Future Field Photographs', note: 'Real Kenyan farm photos for robustness' },
      { label: 'Data Augmentation', note: 'Rotation, flip, color jitter, noise' },
    ],
  },
];

export default function ArchitecturePage({ onNavigate }: ArchitecturePageProps) {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-4">
            <Layers className="w-3.5 h-3.5" />
            Technical Architecture
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4 text-balance">
            How CropGuard AI Is Built
          </h1>
          <p className="text-forest-400 max-w-2xl mx-auto">
            A structured pipeline from image capture to farmer-friendly result.
            The current prototype uses a mock inference function — designed to be
            replaced with a real TensorFlow model.
          </p>
        </div>

        {/* Architecture Pipeline */}
        <div className="mb-20">
          <div className="glass-card p-6 lg:p-8">
            <h2 className="text-white font-display font-bold text-xl mb-6 text-center">
              System Pipeline
            </h2>
            <div className="space-y-3">
              {ARCHITECTURE_STEPS.map((step, index) => (
                <div key={step.label}>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-forest-800/30 border border-forest-700/30 hover:border-natural-500/20 transition-all duration-300 group">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-700 to-forest-800 flex items-center justify-center group-hover:from-natural-500/20 group-hover:to-forest-700 transition-all flex-shrink-0">
                        <step.icon className="w-5 h-5 text-natural-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-forest-500">0{index + 1}</span>
                          <h3 className="text-white font-semibold text-sm">{step.label}</h3>
                        </div>
                        <p className="text-forest-400 text-xs mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  {index < ARCHITECTURE_STEPS.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowRight className="w-4 h-4 text-forest-600 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Labels */}
        <div className="mb-20">
          <h2 className="font-display font-bold text-2xl text-white mb-2 text-center">
            Technology Stack
          </h2>
          <p className="text-forest-400 text-sm mb-8 text-center max-w-xl mx-auto">
            Current prototype uses a mock inference function. The architecture is
            designed for seamless replacement with a real TensorFlow model.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TECH_LABELS.map((tech) => (
              <div key={tech.category} className="glass-card p-5 hover:border-natural-500/20 transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-800/60 flex items-center justify-center">
                    <tech.icon className="w-5 h-5 text-natural-300" />
                  </div>
                  <h3 className="text-white font-display font-bold text-sm">{tech.category}</h3>
                </div>
                <div className="space-y-3">
                  {tech.items.map((item) => (
                    <div key={item.label} className="border-l-2 border-forest-700/50 pl-3">
                      <p className="text-forest-100 text-xs font-semibold">{item.label}</p>
                      <p className="text-forest-400 text-[11px] mt-0.5">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current vs Future */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className="glass-card p-6 border-amber2-500/20">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber2-500/15 border border-amber2-500/30 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-amber2-400" />
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-base">Current Prototype</h3>
                <p className="text-amber2-400 text-xs">Demo Mode</p>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber2-400 flex-shrink-0 mt-0.5" />
                <span className="text-forest-200 text-xs">Mock inference function simulating model output</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber2-400 flex-shrink-0 mt-0.5" />
                <span className="text-forest-200 text-xs">Full UI pipeline: Capture → Pre-process → Classify → Validate → Respond</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber2-400 flex-shrink-0 mt-0.5" />
                <span className="text-forest-200 text-xs">Confidence gate, severity estimation, and recommendations all functional</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber2-400 flex-shrink-0 mt-0.5" />
                <span className="text-forest-200 text-xs">Clearly labeled as prototype — does not claim real AI predictions</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border-natural-500/20">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-natural-500/15 border border-natural-500/30 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-natural-400" />
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-base">Future Direction</h3>
                <p className="text-natural-400 text-xs">Production Roadmap</p>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-natural-400 flex-shrink-0 mt-0.5" />
                <span className="text-forest-200 text-xs">Real TensorFlow/Keras model trained on PlantVillage dataset</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-natural-400 flex-shrink-0 mt-0.5" />
                <span className="text-forest-200 text-xs">TensorFlow Lite for on-device, offline inference</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-natural-400 flex-shrink-0 mt-0.5" />
                <span className="text-forest-200 text-xs">Validation with real Kenyan field photographs</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-natural-400 flex-shrink-0 mt-0.5" />
                <span className="text-forest-200 text-xs">Kiswahili language support for broader accessibility</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="glass-card p-5 border-amber2-500/20 bg-amber2-500/5">
          <p className="text-amber2-200 text-xs leading-relaxed text-center">
            <strong>Important:</strong> The presentation describes an offline-capable / on-device
            future direction. The current mock website does not perform real AI inference.
            The mock inference function is structured for easy replacement with the actual
            Python/TensorFlow/TensorFlow Lite model.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button onClick={() => onNavigate('evaluation')} className="btn-secondary text-base">
            View Evaluation Goals
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
