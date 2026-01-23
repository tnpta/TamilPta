import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Phone, Mail } from 'lucide-react';
import { Language, TranslationContent } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationContent;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  const navLinks: any[] = [];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'}`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-tn-green to-tn-blue text-white text-xs py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone size={12} />
              <span className="font-medium">Helpline: 14417</span>
            </span>
            <span className="flex items-center gap-2">
              <Mail size={12} />
              <span>tnsedpta2025@gmail.com</span>
            </span>
          </div>
          <span className="font-medium">Government of Tamil Nadu</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Department of School Education Logo"
            className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-tn-green leading-tight">
              {language === 'en' ? 'Directorates of Private Schools' : 'தனியார் பள்ளிகள் இயக்குநரகம்'}
            </h1>
            <span className="text-xs text-gray-500 hidden md:block font-medium">
              {language === 'en' ? 'Government of Tamil Nadu' : 'தமிழ்நாடு அரசு'}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-tn-green to-tn-blue text-white rounded-full hover:shadow-lg hover:scale-105 transition-all text-sm font-semibold"
          >
            <Globe size={16} />
            {language === 'en' ? 'தமிழ்' : 'English'}
          </button>
        </div>

        {/* Mobile Language Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 bg-tn-green text-white rounded-full text-xs font-bold"
          >
            <Globe size={14} />
            {language === 'en' ? 'TA' : 'EN'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
