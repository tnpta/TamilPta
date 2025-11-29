import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, Mail } from 'lucide-react';
import { Language, TranslationContent } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationContent;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.parents, href: '#parents' },
    { name: t.nav.teachers, href: '#teachers' },
    { name: t.nav.students, href: '#students' },
    { name: t.nav.contact, href: '#contact' },
  ];

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
        <a href="#home" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Tamil PTA Logo"
            className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-tn-green leading-tight">
              {language === 'en' ? 'Tamil PTA' : 'தமிழ் பி.டி.ஏ'}
            </h1>
            <span className="text-xs text-gray-500 hidden md:block font-medium">
              {language === 'en' ? 'Tamilnadu State Parent Teachers Association' : 'தமிழ்நாடு மாநில பெற்றோர் ஆசிரியர் சங்கம்'}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-gray-700 hover:text-tn-green hover:bg-tn-green/5 rounded-lg font-medium transition-all text-sm"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-tn-green to-tn-blue text-white rounded-full hover:shadow-lg hover:scale-105 transition-all text-sm font-semibold"
          >
            <Globe size={16} />
            {language === 'en' ? 'தமிழ்' : 'English'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 bg-tn-green text-white rounded-full text-xs font-bold"
          >
            <Globe size={14} />
            {language === 'en' ? 'TA' : 'EN'}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <nav className="flex flex-col p-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 text-gray-700 hover:text-tn-green hover:bg-tn-green/5 font-medium rounded-lg transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;