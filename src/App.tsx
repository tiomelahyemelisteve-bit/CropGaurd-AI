import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import AnalysisPage from '@/pages/AnalysisPage';
import ResultPage from '@/pages/ResultPage';
import ArchitecturePage from '@/pages/ArchitecturePage';
import EvaluationPage from '@/pages/EvaluationPage';
import type { Page, InferenceResult } from '@/types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAnalysisComplete = useCallback(
    (inferenceResult: InferenceResult, imageFile: File) => {
      setResult(inferenceResult);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(imageFile);
    },
    []
  );

  const handleRetake = useCallback(() => {
    setResult(null);
    setImagePreview(null);
    handleNavigate('analyze');
  }, [handleNavigate]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'how-it-works':
        return <HowItWorksPage onNavigate={handleNavigate} />;
      case 'analyze':
        return <AnalysisPage onNavigate={handleNavigate} onAnalysisComplete={handleAnalysisComplete} />;
      case 'result':
        return result ? (
          <ResultPage
            result={result}
            imagePreview={imagePreview}
            onNavigate={handleNavigate}
            onRetake={handleRetake}
          />
        ) : (
          <AnalysisPage onNavigate={handleNavigate} onAnalysisComplete={handleAnalysisComplete} />
        );
      case 'architecture':
        return <ArchitecturePage onNavigate={handleNavigate} />;
      case 'evaluation':
        return <EvaluationPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
