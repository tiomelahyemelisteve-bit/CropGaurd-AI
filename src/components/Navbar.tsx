import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { Page } from '@/types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'How It Works', page: 'how-it-works' },
  { label: 'Architecture', page: 'architecture' },
  { label: 'Evaluation', page: 'evaluation' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-forest-950/80 backdrop-blur-xl border-b border-forest-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-natural-500/30 rounded-lg blur-md group-hover:bg-natural-500/50 transition-all" />
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-natural-400 to-forest-600 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-white text-lg tracking-tight">
                CropGuard<span className="text-natural-400"> AI</span>
              </span>
              <span className="text-[10px] text-forest-400 font-medium tracking-wide">
                From Leaf Photo to Trusted Answer
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.page
                    ? 'text-white bg-forest-800/80'
                    : 'text-forest-300 hover:text-white hover:bg-forest-800/40'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('analyze')}
              className={`ml-3 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                currentPage === 'analyze'
                  ? 'bg-natural-400 text-white'
                  : 'bg-natural-500 text-white hover:bg-natural-400 hover:shadow-lg hover:shadow-natural-500/30'
              }`}
            >
              Analyze a Leaf
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-forest-200 hover:bg-forest-800/50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.page
                    ? 'text-white bg-forest-800/80'
                    : 'text-forest-300 hover:text-white hover:bg-forest-800/40'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('analyze')}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold bg-natural-500 text-white"
            >
              Analyze a Leaf
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
