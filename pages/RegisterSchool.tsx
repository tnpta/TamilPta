import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, School, Building, Users, FileText, CreditCard } from 'lucide-react';
import { schoolsData, getDistricts, getBlocksForDistrict, getSchoolsForBlock } from '../data/schoolsData';
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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // 0 = school selection, 1-5 = form steps
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<{ id: number; name: string } | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [referenceNumber, setReferenceNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const r = t.registration;

  const steps = [
    { id: 1, name: r.steps.basicInfo, icon: School },
    { id: 2, name: r.steps.trustManagement, icon: Building },
    { id: 3, name: r.steps.staffStudents, icon: Users },
    { id: 4, name: r.steps.infrastructure, icon: FileText },
    { id: 5, name: r.steps.feesOthers, icon: CreditCard },
  ];

  const districts = getDistricts();
  const blocks = selectedDistrict ? getBlocksForDistrict(selectedDistrict) : [];
  const schools = selectedDistrict && selectedBlock ? getSchoolsForBlock(selectedDistrict, selectedBlock) : [];

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedBlock('');
    setSelectedSchool(null);
  };

  const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBlock(e.target.value);
    setSelectedSchool(null);
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const schoolId = parseInt(e.target.value);
    const school = schools.find(s => s.id === schoolId);
    setSelectedSchool(school || null);
  };

  const handleProceed = () => {
    if (selectedSchool) {
      setFormData({
        ...formData,
        district: selectedDistrict,
        block: selectedBlock,
        schoolId: selectedSchool.id,
        schoolName: selectedSchool.name,
      });
      setCurrentStep(1);
    }
  };

  const handleNext = () => {
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
    const refNum = generateReferenceNumber();
    setReferenceNumber(refNum);
    setIsSubmitted(true);
    console.log('Form submitted:', { ...formData, referenceNumber: refNum });
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
              <p className="text-sm opacity-90 mb-2">{r.success.referenceLabel}</p>
              <p className="text-3xl font-bold tracking-wider">{referenceNumber}</p>
            </div>
            <p className="text-sm text-gray-500 mb-8">
              {r.success.saveMessage}
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-tn-green text-white rounded-lg font-semibold hover:bg-tn-green/90 transition-colors"
            >
              {r.success.backHome}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // School Selection Screen
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{r.pageTitle}</h1>
            <p className="text-gray-600">{r.pageSubtitle}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              {/* District */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {r.selectSchool.district} <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent transition-all"
                >
                  <option value="">{r.selectSchool.selectDistrict}</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              {/* Block */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {r.selectSchool.block} <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedBlock}
                  onChange={handleBlockChange}
                  disabled={!selectedDistrict}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{r.selectSchool.selectBlock}</option>
                  {blocks.map(block => (
                    <option key={block} value={block}>{block}</option>
                  ))}
                </select>
              </div>

              {/* School */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {r.selectSchool.school} <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedSchool?.id || ''}
                  onChange={handleSchoolChange}
                  disabled={!selectedBlock}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{r.selectSchool.selectSchool}</option>
                  {schools.map(school => (
                    <option key={school.id} value={school.id}>{school.name}</option>
                  ))}
                </select>
              </div>

              {selectedSchool && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">{r.selectSchool.selectedSchool}</span> {selectedSchool.name}
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    {selectedBlock}, {selectedDistrict}
                  </p>
                </div>
              )}

              <button
                onClick={handleProceed}
                disabled={!selectedSchool}
                className="w-full py-4 bg-gradient-to-r from-tn-green to-tn-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {r.selectSchool.proceed}
                <ChevronRight size={20} />
              </button>
            </div>
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
          {currentStep === 1 && <BasicInfoForm formData={formData} updateFormData={updateFormData} t={r} />}
          {currentStep === 2 && <TrustManagementForm formData={formData} updateFormData={updateFormData} t={r} />}
          {currentStep === 3 && <StaffStudentsForm formData={formData} updateFormData={updateFormData} t={r} />}
          {currentStep === 4 && <InfrastructureForm formData={formData} updateFormData={updateFormData} t={r} />}
          {currentStep === 5 && <FeesOtherForm formData={formData} updateFormData={updateFormData} t={r} />}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
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
                className="px-6 py-3 bg-gradient-to-r from-tn-green to-tn-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
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
  );
};

export default RegisterSchool;
