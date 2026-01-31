import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { TranslationContent } from '../types';

interface LoginProps {
  t: TranslationContent;
}

const Login: React.FC<LoginProps> = ({ t }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const language = t.nav.home === 'Home' ? 'en' : 'ta';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError(language === 'en' ? 'Please enter a valid 10-digit mobile number' : 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்');
      return;
    }
    if (password.length < 6) {
      setError(language === 'en' ? 'Password must be at least 6 characters' : 'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await login(mobile, password);
    setIsLoading(false);

    if (result.ok) {
      // Read user from localStorage since login updated it
      const userJson = localStorage.getItem('auth_user');
      const user = userJson ? JSON.parse(userJson) : null;
      if (user?.role === 'super_admin' || user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.error || (language === 'en' ? 'Login failed' : 'உள்நுழைவு தோல்வியடைந்தது'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-tn-green/20 to-tn-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-tn-green" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'en' ? 'Admin Login' : 'நிர்வாக உள்நுழைவு'}
            </h1>
            <p className="text-gray-600 text-sm">
              {language === 'en'
                ? 'Enter your credentials to access the admin panel'
                : 'நிர்வாக பேனலை அணுக உங்கள் சான்றுகளை உள்ளிடவும்'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Mobile Number' : 'மொபைல் எண்'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+91</span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                    setError('');
                  }}
                  maxLength={10}
                  className="w-full pl-14 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent text-lg tracking-wider"
                  placeholder="9876543210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Password' : 'கடவுச்சொல்'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent text-lg"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={mobile.length !== 10 || password.length < 6 || isLoading}
              className="w-full py-4 bg-gradient-to-r from-tn-green to-tn-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  {language === 'en' ? 'Logging in...' : 'உள்நுழைகிறது...'}
                </>
              ) : (
                <>
                  <Shield size={20} />
                  {language === 'en' ? 'Login' : 'உள்நுழைக'}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
