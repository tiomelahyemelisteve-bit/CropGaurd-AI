import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Upload,
  Camera,
  Image as ImageIcon,
  X,
  ArrowRight,
  Leaf,
  AlertCircle,
  ScanLine,
  CheckCircle2,
  Loader2,
  SwitchCamera,
  AlertTriangle,
} from 'lucide-react';
import type { CropType, Page, InferenceResult } from '@/types';
import { CROP_LABELS, PIPELINE_STEPS } from '@/types';
import { runMockInference } from '@/mockInference';

interface AnalysisPageProps {
  onNavigate: (page: Page) => void;
  onAnalysisComplete: (result: InferenceResult, imageFile: File) => void;
}

const PIPELINE_ICONS: Record<string, typeof Upload> = {
  capture: Camera,
  preprocess: ImageIcon,
  classify: ScanLine,
  validate: CheckCircle2,
  respond: ArrowRight,
};

const CROPS: { id: CropType; label: string; emoji: string; diseases: string[] }[] = [
  {
    id: 'maize',
    label: 'Maize',
    emoji: '🌾',
    diseases: ['Gray Leaf Spot', 'Northern Leaf Blight', 'Common Rust'],
  },
  {
    id: 'tomato',
    label: 'Tomato',
    emoji: '🍅',
    diseases: ['Early Blight', 'Late Blight'],
  },
  {
    id: 'potato',
    label: 'Potato',
    emoji: '🥔',
    diseases: ['Late Blight'],
  },
];

export default function AnalysisPage({ onNavigate, onAnalysisComplete }: AnalysisPageProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cropType, setCropType] = useState<CropType>('maize');
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Unsupported image. Please upload a clear image of a crop leaf.');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraReady(false);
  }, []);

  const startCamera = useCallback(async (mode: 'environment' | 'user') => {
    setCameraError(null);
    setCameraReady(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: mode } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraReady(true);
      }
    } catch {
      setCameraError('Unable to access camera. Please allow camera permissions in your browser, or use Upload Image instead.');
    }
  }, []);

  const openCamera = () => {
    setCameraOpen(true);
    setCameraError(null);
  };

  const closeCamera = () => {
    stopCamera();
    setCameraOpen(false);
    setCameraError(null);
  };

  const switchCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
      handleFile(file);
      closeCamera();
    }, 'image/jpeg', 0.92);
  };

  useEffect(() => {
    if (cameraOpen) {
      startCamera(facingMode);
    }
    return () => {
      stopCamera();
    };
  }, [cameraOpen]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    setCurrentStep(-1);
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setAnalyzing(true);
    setError(null);

    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 900));
    }

    const result = runMockInference(imageFile, cropType);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setAnalyzing(false);
    onAnalysisComplete(result, imageFile);
    onNavigate('result');
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-label mb-4">
            <Leaf className="w-3.5 h-3.5" />
            Analyze a Leaf
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3 text-balance">
            Upload a Leaf Photo for Analysis
          </h1>
          <p className="text-forest-400 max-w-xl mx-auto text-sm">
            Select your crop type, then upload or capture a leaf image. The system
            will run the full pipeline: Capture → Pre-process → Classify → Validate → Respond.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber2-500/10 border border-amber2-500/30">
            <AlertCircle className="w-3.5 h-3.5 text-amber2-400" />
            <span className="text-amber2-300 text-xs font-medium">Demo Mode — Mock inference, not real AI</span>
          </div>
        </div>

        {/* Crop Type Selector */}
        <div className="mb-6">
          <label className="text-forest-200 text-sm font-semibold mb-3 block">
            Select Crop Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {CROPS.map((crop) => {
              const isSelected = cropType === crop.id;
              return (
                <button
                  key={crop.id}
                  onClick={() => setCropType(crop.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left cursor-pointer group ${
                    isSelected
                      ? 'bg-natural-500/15 border-natural-500 shadow-lg shadow-natural-500/20 -translate-y-0.5'
                      : 'glass-card border-forest-700/50 hover:border-natural-500/30 hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-natural-500 flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-2xl transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                      {crop.emoji}
                    </span>
                    <span className={`font-display font-bold text-base transition-colors ${isSelected ? 'text-white' : 'text-forest-200 group-hover:text-forest-100'}`}>
                      {crop.label}
                    </span>
                  </div>
                  <p className="text-forest-400 text-[11px] leading-relaxed">
                    {crop.diseases.join(' · ')}
                  </p>
                  <div className={`mt-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider transition-opacity ${isSelected ? 'text-natural-400 opacity-100' : 'text-forest-500 opacity-0 group-hover:opacity-60'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full border-2 ${isSelected ? 'border-natural-400 bg-natural-400' : 'border-forest-500'}`} />
                    {isSelected ? 'Selected' : 'Click to select'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload Area / Preview */}
        {!imagePreview ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative glass-card p-10 border-2 border-dashed transition-all duration-300 ${
              dragActive
                ? 'border-natural-500/60 bg-natural-500/5 scale-[1.01]'
                : 'border-forest-700/50'
            }`}
          >
            <div className="text-center">
              <div className="relative inline-block mb-5">
                <div className="absolute inset-0 bg-natural-500/20 rounded-full blur-xl animate-pulse" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-forest-700 to-forest-800 flex items-center justify-center">
                  <Upload className="w-9 h-9 text-natural-300" />
                </div>
              </div>
              <h3 className="text-white font-display font-bold text-lg mb-2">
                Drag & Drop Your Leaf Image
              </h3>
              <p className="text-forest-400 text-sm mb-6">
                or choose one of the options below
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={openCamera}
                  className="btn-primary text-sm"
                >
                  <Camera className="w-4 h-4" />
                  Take Photo
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary text-sm"
                >
                  <ImageIcon className="w-4 h-4" />
                  Upload Image
                </button>
              </div>
              <p className="mt-4 text-xs text-forest-500">
                Supports JPG, PNG, WebP · Max 10MB
              </p>
            </div>
          </div>
        ) : (
          <div className="glass-card p-4 overflow-hidden">
            <div className="relative rounded-xl overflow-hidden">
              <img src={imagePreview} alt="Leaf preview" className="w-full max-h-[400px] object-contain bg-forest-950" />

              {/* Scan overlay during analysis */}
              {analyzing && (
                <div className="absolute inset-0 bg-forest-950/40">
                  <div className="absolute left-0 right-0 h-1 bg-natural-400/80 shadow-[0_0_20px_rgba(77,158,85,0.8)] animate-scan-line" />
                  <div className="absolute inset-0 grid-bg opacity-30" />
                </div>
              )}

              {!analyzing && (
                <button
                  onClick={clearImage}
                  className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-forest-950/80 backdrop-blur-sm flex items-center justify-center text-forest-200 hover:bg-red-500/80 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Crop badge */}
              <div className="absolute bottom-3 left-3 glass-card px-3 py-1.5 border-forest-700/60">
                <span className="text-white text-xs font-semibold">
                  {CROPS.find((c) => c.id === cropType)?.emoji} {CROP_LABELS[cropType]}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Hidden inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Camera Modal */}
        {cameraOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/90 backdrop-blur-md animate-fade-in p-4">
            <div className="glass-card p-5 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-display font-bold text-lg flex items-center gap-2">
                  <Camera className="w-5 h-5 text-natural-400" />
                  Take a Photo
                </h3>
                <button
                  onClick={closeCamera}
                  className="w-9 h-9 rounded-lg bg-forest-800/60 flex items-center justify-center text-forest-200 hover:bg-red-500/80 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cameraError ? (
                <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 text-center">
                  <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-red-300 text-sm mb-4">{cameraError}</p>
                  <button onClick={() => fileInputRef.current?.click()} className="btn-secondary text-sm">
                    <ImageIcon className="w-4 h-4" />
                    Upload Image Instead
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative rounded-xl overflow-hidden bg-forest-950 aspect-video">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {!cameraReady && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="w-8 h-8 text-natural-400 animate-spin" />
                          <p className="text-forest-400 text-sm">Starting camera...</p>
                        </div>
                      </div>
                    )}
                    {/* Frame guide */}
                    {cameraReady && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-2/3 h-2/3 border-2 border-natural-400/40 rounded-2xl border-dashed" />
                      </div>
                    )}
                  </div>

                  {cameraReady && (
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button
                        onClick={switchCamera}
                        className="w-11 h-11 rounded-full bg-forest-800/60 border border-forest-600/50 flex items-center justify-center text-forest-200 hover:text-white hover:bg-forest-700/60 transition-all"
                        title="Switch camera"
                      >
                        <SwitchCamera className="w-5 h-5" />
                      </button>
                      <button
                        onClick={capturePhoto}
                        className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      >
                        <div className="absolute inset-1.5 rounded-full border-2 border-forest-950" />
                        <Camera className="w-6 h-6 text-forest-950 relative z-10" />
                      </button>
                      <div className="w-11 h-11" />
                    </div>
                  )}
                  {cameraReady && (
                    <p className="mt-3 text-center text-xs text-forest-400">
                      Position the leaf inside the frame and tap the capture button
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 glass-card p-4 border-red-500/30 bg-red-500/5 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Pipeline Progress */}
        {analyzing && (
          <div className="mt-6 glass-card p-6 animate-fade-in">
            <h3 className="text-white font-display font-bold text-base mb-5 text-center">
              Running Analysis Pipeline
            </h3>
            <div className="space-y-3">
              {PIPELINE_STEPS.map((step, index) => {
                const Icon = PIPELINE_ICONS[step.id] || Upload;
                const isComplete = index < currentStep;
                const isActive = index === currentStep;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-natural-500/10 border border-natural-500/30'
                        : isComplete
                          ? 'bg-forest-800/30 border border-forest-700/30'
                          : 'bg-forest-900/30 border border-forest-800/30 opacity-50'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
                      {isComplete ? (
                        <CheckCircle2 className="w-5 h-5 text-natural-400" />
                      ) : isActive ? (
                        <Loader2 className="w-5 h-5 text-natural-300 animate-spin" />
                      ) : (
                        <Icon className="w-5 h-5 text-forest-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${isActive || isComplete ? 'text-white' : 'text-forest-400'}`}>
                        {step.label}
                      </p>
                      <p className="text-forest-500 text-xs">{step.description}</p>
                    </div>
                    <span className="text-xs font-bold text-forest-600">
                      {String(index + 1).padStart(2, '0')}/05
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Analyze Button */}
        {imagePreview && !analyzing && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleAnalyze} className="btn-primary text-base">
              <ScanLine className="w-5 h-5" />
              Analyze Leaf
            </button>
            <button onClick={clearImage} className="btn-ghost text-sm">
              <X className="w-4 h-4" />
              Remove Image
            </button>
          </div>
        )}

        {analyzing && (
          <div className="mt-6 text-center">
            <p className="text-forest-400 text-sm animate-pulse">
              Analyzing your leaf image... please wait
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
