import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, School, Building, Users, FileText, CreditCard, AlertCircle, Shield, Landmark } from 'lucide-react';
import BasicInfoForm from '../components/registration/BasicInfoForm';
import TrustManagementForm from '../components/registration/TrustManagementForm';
import StaffStudentsForm from '../components/registration/StaffStudentsForm';
import InfrastructureForm from '../components/registration/InfrastructureForm';
import FeesOtherForm from '../components/registration/FeesOtherForm';
import { TranslationContent } from '../types';

interface RegisterSchoolProps {
  t: TranslationContent;
}

const RegisterSchool: React.FC<RegisterSchoolProps> = ({ t }) => {
  const [currentStep, setCurrentStep] = useState(0); // Start at mobile verification step
  const [formData, setFormData] = useState<any>({});
  const [referenceNumber, setReferenceNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mobile verification states
  const [verificationMobile, setVerificationMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [mobileVerified, setMobileVerified] = useState(false);
  const [mobileError, setMobileError] = useState('');

  const r = t.registration;
  const language = t.nav.home === 'Home' ? 'en' : 'ta';

  const steps = [
    { id: 1, name: r.steps.basicInfo, icon: School },
    { id: 2, name: r.steps.trustManagement, icon: Building },
    { id: 3, name: r.steps.staffStudents, icon: Users },
    { id: 4, name: r.steps.infrastructure, icon: FileText },
    { id: 5, name: r.steps.feesOthers, icon: CreditCard },
  ];

  const isValidMobileNumber = (mobile: string) => {
    return mobile && mobile.length === 10 && /^\d{10}$/.test(mobile);
  };

  const hasValidMobileNumber = () => {
    return (
      isValidMobileNumber(formData.schoolMobile) ||
      isValidMobileNumber(formData.correspondentMobile) ||
      isValidMobileNumber(formData.principalMobile)
    );
  };

  const canProceedFromStep1 = currentStep === 1 ? hasValidMobileNumber() : true;

  const handleNext = () => {
    if (currentStep === 1 && !hasValidMobileNumber()) {
      alert(language === 'en'
        ? 'Please enter a valid 10-digit mobile number to proceed.'
        : 'தொடர செல்லுபடியாகும் 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.');
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 1) {
      setCurrentStep(0);
    }
  };

  const updateFormData = (stepData: any) => {
    setFormData({ ...formData, ...stepData });
  };

  const generateReferenceNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    return `TN-PTA-${year}-${random}`;
  };

  const handleSubmit = () => {
    // Use verified mobile number as reference
    setReferenceNumber(verificationMobile);
    setIsSubmitted(true);
    console.log('Form submitted:', { ...formData, referenceNumber: verificationMobile });
  };

  // Handle mobile number input for verification
  const handleVerificationMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setVerificationMobile(value);
    setMobileError('');
  };

  // Send OTP
  const handleSendOtp = () => {
    if (verificationMobile.length !== 10) {
      setMobileError(language === 'en' ? 'Please enter a valid 10-digit mobile number' : 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்');
      return;
    }
    setOtpSent(true);
  };

  // Verify OTP and proceed
  const handleVerifyOtp = () => {
    // For now, accept any OTP or empty OTP
    setMobileVerified(true);
    // Auto-fill the mobile number in form data
    setFormData({
      ...formData,
      schoolMobile: verificationMobile,
      correspondentMobile: verificationMobile,
    });
    setCurrentStep(1); // Move to registration form
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{r.success.title}</h2>
            <p className="text-gray-600 mb-6">{r.success.message}</p>
            <div className="bg-gradient-to-r from-tn-green to-tn-blue p-6 rounded-xl text-white mb-6">
              <p className="text-sm opacity-90 mb-2">
                {language === 'en' ? 'Mobile Number' : 'மொபைல் எண்'}
              </p>
              <p className="text-3xl font-bold tracking-wider">{referenceNumber}</p>
            </div>
            <p className="text-sm text-gray-500 mb-8">
              {language === 'en' ? 'Please save this mobile number for future reference.' : 'எதிர்கால குறிப்புக்காக இந்த மொபைல் எண்ணை சேமிக்கவும்.'}
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-tn-green text-white rounded-lg font-semibold hover:bg-tn-green/90 transition-colors"
            >
              {language === 'en' ? 'Back to Home' : 'முகப்புக்குத் திரும்பு'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mobile Verification Screen
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-tn-green/20 to-tn-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Landmark className="w-10 h-10 text-tn-green" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Register your School' : 'உங்கள் பள்ளியைப் பதிவு செய்யுங்கள்'}
              </h1>
              <p className="text-gray-600 text-sm">
                {language === 'en'
                  ? 'Enter your mobile number to start registration'
                  : 'பதிவைத் தொடங்க உங்கள் மொபைல் எண்ணை உள்ளிடவும்'}
              </p>
            </div>

            {!otpSent ? (
              // Step 1: Enter Mobile Number
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'en' ? 'Mobile Number' : 'மொபைல் எண்'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+91</span>
                    <input
                      type="tel"
                      value={verificationMobile}
                      onChange={handleVerificationMobileChange}
                      maxLength={10}
                      className={`w-full pl-14 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent text-lg tracking-wider ${
                        mobileError ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="9876543210"
                    />
                  </div>
                  {mobileError && (
                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                      <AlertCircle size={14} />
                      <span>{mobileError}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSendOtp}
                  disabled={verificationMobile.length !== 10}
                  className="w-full py-4 bg-gradient-to-r from-tn-green to-tn-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {language === 'en' ? 'Send OTP' : 'OTP அனுப்பு'}
                  <ChevronRight size={20} />
                </button>
              </div>
            ) : (
              // Step 2: Enter OTP
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800">
                    {language === 'en'
                      ? `OTP sent to +91 ${verificationMobile}`
                      : `+91 ${verificationMobile} க்கு OTP அனுப்பப்பட்டது`}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'en' ? 'Enter OTP' : 'OTP உள்ளிடவும்'}
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent text-center text-2xl tracking-[0.5em] font-mono"
                    placeholder="------"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {language === 'en'
                      ? '(Leave blank to skip OTP verification for now)'
                      : '(தற்போது OTP சரிபார்ப்பைத் தவிர்க்க காலியாக விடவும்)'}
                  </p>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  className="w-full py-4 bg-gradient-to-r from-tn-green to-tn-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Shield size={20} />
                  {language === 'en' ? 'Verify & Continue' : 'சரிபார்த்து தொடரவும்'}
                </button>

                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp('');
                  }}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={18} />
                  {language === 'en' ? 'Change Mobile Number' : 'மொபைல் எண்ணை மாற்று'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Multi-step Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{r.formTitle}</h1>
          <p className="text-gray-600 text-sm">{formData.schoolName}</p>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 overflow-x-auto">
          <div className="flex justify-between min-w-[600px]">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-tn-green text-white' :
                      isCompleted ? 'bg-green-500 text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? <Check size={18} /> : <StepIcon size={18} />}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${isActive ? 'text-tn-green' : 'text-gray-500'}`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 mt-[-12px] ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {currentStep === 1 && <BasicInfoForm formData={formData} updateFormData={updateFormData} t={r} language={language} />}
          {currentStep === 2 && <TrustManagementForm formData={formData} updateFormData={updateFormData} t={r} language={language} />}
          {currentStep === 3 && <StaffStudentsForm formData={formData} updateFormData={updateFormData} t={r} language={language} />}
          {currentStep === 4 && <InfrastructureForm formData={formData} updateFormData={updateFormData} t={r} language={language} />}
          {currentStep === 5 && <FeesOtherForm formData={formData} updateFormData={updateFormData} t={r} language={language} />}

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {currentStep === 1 && !hasValidMobileNumber() && (
              <div className="mb-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  {language === 'en'
                    ? 'Please enter at least one valid 10-digit mobile number (School, Correspondent, or Principal) to proceed to the next step.'
                    : 'அடுத்த படிக்கு செல்ல குறைந்தபட்சம் ஒரு செல்லுபடியாகும் 10 இலக்க மொபைல் எண்ணை (பள்ளி, கடிதப்பொருத்துபவர் அல்லது முதல்வர்) உள்ளிடவும்.'}
                </p>
              </div>
            )}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <ChevronLeft size={18} />
                {r.buttons.previous}
              </button>
              {currentStep < 5 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceedFromStep1}
                  className={`px-6 py-3 bg-gradient-to-r from-tn-green to-tn-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 ${
                    !canProceedFromStep1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {r.buttons.next}
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Check size={18} />
                  {r.buttons.submit}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSchool;
