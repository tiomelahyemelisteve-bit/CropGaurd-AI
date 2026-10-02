import {
  Camera,
  ImageDown,
  BrainCircuit,
  ShieldCheck,
  MessageSquareHeart,
  ArrowRight,
  Leaf,
  AlertTriangle,
  ScanLine,
  Activity,
  Globe,
  Smartphone,
  Languages,
  WifiOff,
  MapPin,
  Zap,
  CheckCircle2,
  XCircle,
  ChevronDown,
} from 'lucide-react';
import type { Page } from '@/types';
import { PIPELINE_STEPS } from '@/types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HERO_IMAGE =
  'https://images.pexels.com/photos/16678079/pexels-photo-16678079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const FIELD_IMAGE =
  'https://images.pexels.com/photos/1382102/pexels-photo-1382102.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const PIPELINE_ICONS: Record<string, typeof Camera> = {
  capture: Camera,
  preprocess: ImageDown,
  classify: BrainCircuit,
  validate: ShieldCheck,
  respond: MessageSquareHeart,
};

const BASIC_FLOW = ['Image', 'Disease Name'];

const CROPGUARD_FLOW = [
  { label: 'Image', icon: Camera },
  { label: 'AI Classification', icon: BrainCircuit },
  { label: 'Confidence Validation', icon: ShieldCheck },
  { label: 'Severity', icon: Activity },
  { label: 'Management', icon: Leaf },
  { label: 'Prevention', icon: CheckCircle2 },
];

const INNOVATION_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Confidence Gate',
    description: 'Predictions below the confidence threshold are flagged as uncertain — never blindly presented as fact.',
  },
  {
    icon: AlertTriangle,
    title: 'Uncertain-Result Handling',
    description: 'When confidence is low, the system clearly warns the farmer and asks for a new photo instead of guessing.',
  },
  {
    icon: Activity,
    title: 'Severity Estimation',
    description: 'Estimates affected area percentage and classifies severity as Mild, Moderate, or Severe.',
  },
  {
    icon: ScanLine,
    title: 'Explainable Prediction',
    description: 'Visual heatmap-style overlay highlights the regions that influenced the classification decision.',
  },
  {
    icon: Leaf,
    title: 'Farmer-Friendly Recommendations',
    description: 'Clear, safe management and prevention guidance — no invented chemical dosages or unsafe instructions.',
  },
];

const KENYA_FEATURES = [
  { icon: Smartphone, title: 'Simple Interface', description: 'Farmer-friendly design that works on low-cost smartphones' },
  { icon: Languages, title: 'Language Support', description: 'English now, with future Kiswahili guidance planned' },
  { icon: WifiOff, title: 'Future Offline Mode', description: 'On-device TensorFlow Lite inference for areas with limited connectivity' },
  { icon: MapPin, title: 'Kenyan Field Data', description: 'Future validation using real Kenyan field photographs' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/50 via-forest-950/80 to-forest-950" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-natural-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="section-label mb-6">
                <Leaf className="w-3.5 h-3.5" />
                Hackathon Prototype
              </div>
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6 text-balance">
                CropGuard <span className="text-natural-400">AI</span>
              </h1>
              <p className="text-xl text-natural-300 font-medium mb-4 italic">
                "From Leaf Photo to Trusted Answer"
              </p>
              <p className="text-base text-forest-300 leading-relaxed mb-8 max-w-lg">
                AI-powered crop health assistance for early disease identification,
                severity assessment and practical action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('analyze')}
                  className="btn-primary text-base"
                >
                  Analyze a Leaf
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="btn-secondary text-base"
                >
                  How It Works
                </button>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="flex items-center gap-2 text-forest-400 text-sm">
                  <div className="w-2 h-2 rounded-full bg-natural-400 animate-pulse" />
                  3 Crops · 6 Diseases
                </div>
                <div className="flex items-center gap-2 text-forest-400 text-sm">
                  <div className="w-2 h-2 rounded-full bg-amber2-400" />
                  Confidence-Validated
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-forest-700/50 group">
                <img
                  src={HERO_IMAGE}
                  alt="Farmer examining crop with smartphone"
                  className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass-card p-4 border-forest-700/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-natural-500/20 flex items-center justify-center flex-shrink-0">
                        <ScanLine className="w-5 h-5 text-natural-300" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">AI-Powered Analysis</p>
                        <p className="text-forest-400 text-xs">Capture → Pre-process → Classify → Validate → Respond</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 glass-card px-4 py-3 border-amber2-500/30 animate-float">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber2-400" />
                  <span className="text-amber2-300 text-xs font-semibold">Demo Mode Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Overview */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label mb-4">The Pipeline</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4 text-balance">
              Five Steps from Photo to Trusted Answer
            </h2>
            <p className="text-forest-400 max-w-2xl mx-auto">
              Every leaf image passes through a structured pipeline that doesn't
              just detect — it validates confidence and responds with actionable guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PIPELINE_STEPS.map((step, index) => {
              const Icon = PIPELINE_ICONS[step.id] || Camera;
              return (
                <div key={step.id} className="relative group">
                  <div className="glass-card p-5 h-full hover:border-natural-500/40 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-forest-700 to-forest-800 flex items-center justify-center group-hover:from-natural-500/20 group-hover:to-forest-700 transition-all">
                        <Icon className="w-5 h-5 text-natural-300" />
                      </div>
                      <span className="text-3xl font-display font-bold text-forest-700/60">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2">{step.label}</h3>
                    <p className="text-forest-400 text-xs leading-relaxed">{step.description}</p>
                  </div>
                  {index < PIPELINE_STEPS.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-2.5 z-10 -translate-y-1/2">
                      <ArrowRight className="w-5 h-5 text-forest-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 relative bg-forest-900/30">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label mb-4" style={{ borderColor: 'rgba(247, 173, 46, 0.3)', color: '#f7ad2e', background: 'rgba(247, 173, 46, 0.1)' }}>
              <Zap className="w-3.5 h-3.5" />
              Our Differentiator
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4 text-balance">
              We Don't Just Detect — We Validate and Respond
            </h2>
            <p className="text-forest-400 max-w-2xl mx-auto">
              Most crop disease tools stop at naming the disease. CropGuard AI goes
              further by validating confidence, estimating severity, and providing
              farmer-friendly guidance.
            </p>
          </div>

          {/* Comparison */}
          <div className="grid lg:grid-cols-2 gap-6 mb-14">
            {/* Basic System */}
            <div className="glass-card p-6 border-forest-700/40">
              <div className="flex items-center gap-2 mb-5">
                <XCircle className="w-5 h-5 text-forest-500" />
                <h3 className="text-forest-300 font-semibold text-lg">Basic System</h3>
              </div>
              <div className="space-y-3">
                {BASIC_FLOW.map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-forest-800 flex items-center justify-center text-forest-400 text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="text-forest-300 text-sm">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-forest-800/60">
                <p className="text-forest-500 text-xs">
                  Image in, disease name out. No confidence check, no severity,
                  no guidance.
                </p>
              </div>
            </div>

            {/* CropGuard AI */}
            <div className="glass-card p-6 border-natural-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-natural-500/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 mb-5 relative">
                <CheckCircle2 className="w-5 h-5 text-natural-400" />
                <h3 className="text-white font-semibold text-lg">CropGuard AI</h3>
                <span className="ml-auto px-2.5 py-1 rounded-full bg-natural-500/15 border border-natural-500/30 text-natural-300 text-[10px] font-bold uppercase tracking-wider">
                  Our Approach
                </span>
              </div>
              <div className="space-y-2.5 relative">
                {CROPGUARD_FLOW.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-natural-500/15 border border-natural-500/20 flex items-center justify-center group-hover:bg-natural-500/25 transition-all">
                      <step.icon className="w-4 h-4 text-natural-300" />
                    </div>
                    <span className="text-forest-100 text-sm">{step.label}</span>
                    {i < CROPGUARD_FLOW.length - 1 && (
                      <ChevronDown className="w-3.5 h-3.5 text-forest-600 ml-auto rotate-[-90deg] hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Innovation Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INNOVATION_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-5 hover:border-natural-500/30 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-11 h-11 rounded-xl bg-forest-800/80 flex items-center justify-center mb-4 group-hover:bg-natural-500/15 transition-all">
                  <feature.icon className="w-5 h-5 text-natural-300" />
                </div>
                <h4 className="text-white font-semibold text-sm mb-2">{feature.title}</h4>
                <p className="text-forest-400 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Solution → Future */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-amber2-500/15 border border-amber2-500/30 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-amber2-400" />
              </div>
              <h3 className="text-white font-display font-bold text-lg mb-2">The Problem</h3>
              <p className="text-forest-400 text-sm leading-relaxed">
                A farmer notices unusual symptoms on crop leaves — discoloration,
                lesions, or spots. Without expert knowledge, identifying the disease
                and knowing what to do is difficult. Wrong guesses can destroy a harvest.
              </p>
            </div>

            <div className="glass-card p-6 border-natural-500/20">
              <div className="w-12 h-12 rounded-xl bg-natural-500/15 border border-natural-500/30 flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-natural-400" />
              </div>
              <h3 className="text-white font-display font-bold text-lg mb-2">The Solution</h3>
              <p className="text-forest-400 text-sm leading-relaxed">
                CropGuard AI analyzes a simple leaf photo through a structured pipeline,
                validates the prediction's confidence, estimates severity, and delivers
                practical management and prevention advice.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-forest-700/50 border border-forest-600/50 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-forest-300" />
              </div>
              <h3 className="text-white font-display font-bold text-lg mb-2">The Future</h3>
              <p className="text-forest-400 text-sm leading-relaxed">
                Real field data from Kenyan farms, TensorFlow Lite for on-device
                inference, offline capability, and Kiswahili language support —
                bringing expert crop diagnostics to every farmer's pocket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kenya Section */}
      <section className="py-20 relative bg-forest-900/30">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="section-label mb-4">
                <MapPin className="w-3.5 h-3.5" />
                Our Focus
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4 text-balance">
                Designed with Kenyan Farmers in Mind
              </h2>
              <p className="text-forest-400 leading-relaxed mb-6">
                CropGuard AI is built for the realities of smallholder farming in Kenya.
                The interface, deployment strategy, and future roadmap all center on
                accessibility and field-level relevance.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {KENYA_FEATURES.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-lg bg-forest-800/60 flex items-center justify-center flex-shrink-0 group-hover:bg-natural-500/15 transition-all">
                      <feature.icon className="w-5 h-5 text-natural-300" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-forest-400 text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-forest-500 italic">
                Note: Kiswahili support, offline mode, and field validation are future
                goals — not yet implemented in this prototype.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-forest-700/50 group">
              <img
                src={FIELD_IMAGE}
                alt="Agricultural field"
                className="w-full h-[360px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="glass-card p-4 border-forest-700/60">
                  <p className="text-white font-semibold text-sm mb-1">Built for the Field</p>
                  <p className="text-forest-400 text-xs">
                    Low-cost smartphones · Simple interface · Future offline capability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-10 border-natural-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-natural-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="font-display font-bold text-3xl text-white mb-4 text-balance">
                Ready to Analyze a Leaf?
              </h2>
              <p className="text-forest-400 mb-8 max-w-xl mx-auto">
                Try the demo pipeline now. Upload a leaf photo and see the full
                Capture → Pre-process → Classify → Validate → Respond flow in action.
              </p>
              <button
                onClick={() => onNavigate('analyze')}
                className="btn-primary text-base"
              >
                Start Analysis
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="mt-4 text-xs text-forest-500">
                Demo mode — predictions are simulated, not from a real AI model
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
