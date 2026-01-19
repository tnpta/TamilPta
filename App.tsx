import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import { AboutSection, ParentsSection, TeachersSection, StudentsSection } from './components/InfoSections';
import {
  AnnouncementSection,
  ResourcesSection,
  DonateSection
} from './components/ActivitySections';
import Footer from './components/Footer';
import RegisterSchool from './pages/RegisterSchool';
import { Language } from './types';
import { en, ta } from './translations';

const HomePage: React.FC<{ t: any }> = ({ t }) => {
  return (
    <>
      <Hero t={t} />

      {/* Info & Core Sections */}
      <AboutSection t={t} />
      <AnnouncementSection t={t} />

      {/* Role Based Information */}
      <ParentsSection t={t} />
      <TeachersSection t={t} />
      <StudentsSection t={t} />

      {/* Family Engagement Section */}
      <section className="py-24 bg-white text-center border-t border-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
              <span className="text-tn-blue font-bold tracking-widest uppercase text-sm mb-2 block">Together We Grow</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{t.sections.family.title}</h2>
              <p className="text-xl text-gray-600 leading-relaxed">{t.sections.family.content}</p>
          </div>
      </section>

      <ResourcesSection t={t} />
      <DonateSection t={t} />
    </>
  );
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');

  // Simple content switching logic
  const t = language === 'en' ? en : ta;

  useEffect(() => {
    // Optionally update document title based on language
    document.title = t.title;
  }, [language, t.title]);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header language={language} setLanguage={setLanguage} t={t} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage t={t} />} />
            <Route path="/register-school" element={<RegisterSchool t={t} />} />
          </Routes>
        </main>
        <Footer t={t} />
      </div>
    </Router>
  );
};

export default App;
