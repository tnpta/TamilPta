import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import RegisterSchool from './pages/RegisterSchool';
import PtaHome from './pages/PtaHome';
import { Language } from './types';
import { en, ta } from './translations';

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
            <Route path="/" element={<RegisterSchool t={t} />} />
            <Route path="/pta-home" element={<PtaHome t={t} />} />
          </Routes>
        </main>
        <Footer t={t} />
      </div>
    </Router>
  );
};

export default App;
