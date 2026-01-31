import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterSchool from './pages/RegisterSchool';
import PtaHome from './pages/PtaHome';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import SchoolDetail from './pages/SchoolDetail';
import UserManagement from './pages/UserManagement';
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
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Header language={language} setLanguage={setLanguage} t={t} />
          <main>
            <Routes>
              <Route path="/" element={<RegisterSchool t={t} />} />
              <Route path="/pta-home" element={<PtaHome t={t} />} />
              <Route path="/login" element={<Login t={t} />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
                  <AdminDashboard t={t} />
                </ProtectedRoute>
              } />
              <Route path="/admin/schools/:mobile" element={
                <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
                  <SchoolDetail t={t} />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                  <UserManagement t={t} />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
