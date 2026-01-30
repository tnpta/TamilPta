import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { RegistrationTranslations } from '../../types';

interface BasicInfoFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  t: RegistrationTranslations;
  language: 'en' | 'ta';
}

const schoolTypes = [
  'Play School',
  'N&P (Nursery & Primary)',
  'Matriculation',
  'Self Finance',
  'CBSE',
  'ICSE (CISCE)',
  'IGCSE (CAIE)',
  'IB',
  'PEARSON/EDEXCEL',
  'Others'
];

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ formData, updateFormData, t, language }) => {
  const [mobileErrors, setMobileErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow digits
    const numericValue = value.replace(/\D/g, '');

    // Limit to 10 digits
    const limitedValue = numericValue.slice(0, 10);
    updateFormData({ [name]: limitedValue });

    // Validate
    if (limitedValue.length > 0 && limitedValue.length < 10) {
      setMobileErrors({
        ...mobileErrors,
        [name]: 'Mobile number must be exactly 10 digits'
      });
    } else {
      const newErrors = { ...mobileErrors };
      delete newErrors[name];
      setMobileErrors(newErrors);
    }
  };

  const handleSchoolTypeChange = (type: string) => {
    updateFormData({ schoolType: type });
  };

  const b = t.basicInfo;

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-200">
        {b.title}
      </h2>

      {/* School Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {b.schoolCode}
          </label>
          <input
            type="text"
            name="schoolCode"
            value={formData.schoolCode || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            placeholder="Enter UDISE Code"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {b.schoolName}
          </label>
          <input
            type="text"
            name="schoolName"
            value={formData.schoolName || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            placeholder="Enter school name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {b.address}
        </label>
        <textarea
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
          placeholder="Enter complete address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{b.taluk}</label>
          <input
            type="text"
            name="taluk"
            value={formData.taluk || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {b.localBody}
          </label>
          <input
            type="text"
            name="localBody"
            value={formData.localBody || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'en' ? 'District' : 'மாவட்டம்'}
          </label>
          <input
            type="text"
            name="district"
            value={formData.district || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            placeholder={language === 'en' ? 'Enter district name' : 'மாவட்ட பெயரை உள்ளிடவும்'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{b.pinCode}</label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            maxLength={6}
          />
        </div>
      </div>

      {/* School Contact */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{b.schoolContact}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {b.mobile} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="schoolMobile"
              value={formData.schoolMobile || ''}
              onChange={handleMobileChange}
              maxLength={10}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent ${
                mobileErrors.schoolMobile ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="10-digit number"
            />
            {mobileErrors.schoolMobile && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{language === 'en' ? 'Mobile number must be exactly 10 digits' : 'மொபைல் எண் சரியாக 10 இலக்கங்களாக இருக்க வேண்டும்'}</span>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.whatsapp}</label>
            <input
              type="tel"
              name="schoolWhatsapp"
              value={formData.schoolWhatsapp || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.email}</label>
            <input
              type="email"
              name="schoolEmail"
              value={formData.schoolEmail || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Type of School */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">{b.schoolType}</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {schoolTypes.map(type => (
            <label key={type} className={`flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${formData.schoolType === type ? 'border-tn-green bg-green-50' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="schoolType"
                checked={formData.schoolType === type}
                onChange={() => handleSchoolTypeChange(type)}
                className="w-4 h-4 text-tn-green border-gray-300 focus:ring-tn-green"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
        {formData.schoolType === 'Others' && (
          <div className="mt-3">
            <input
              type="text"
              name="schoolTypeOther"
              value={formData.schoolTypeOther || ''}
              onChange={handleChange}
              className="w-full md:w-1/2 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              placeholder={language === 'en' ? 'Please specify the school type' : 'பள்ளி வகையைக் குறிப்பிடவும்'}
            />
          </div>
        )}
      </div>

      {/* Correspondent Details */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{b.correspondentDetails}</h3>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.title_label}</label>
            <select
              name="correspondentTitle"
              value={formData.correspondentTitle || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{b.select}</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.name}</label>
            <input
              type="text"
              name="correspondentName"
              value={formData.correspondentName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {b.mobile} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="correspondentMobile"
              value={formData.correspondentMobile || ''}
              onChange={handleMobileChange}
              maxLength={10}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent ${
                mobileErrors.correspondentMobile ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="10-digit number"
            />
            {mobileErrors.correspondentMobile && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{language === 'en' ? 'Mobile number must be exactly 10 digits' : 'மொபைல் எண் சரியாக 10 இலக்கங்களாக இருக்க வேண்டும்'}</span>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.whatsapp}</label>
            <input
              type="tel"
              name="correspondentWhatsapp"
              value={formData.correspondentWhatsapp || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.email}</label>
            <input
              type="email"
              name="correspondentEmail"
              value={formData.correspondentEmail || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Principal Details */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{b.principalDetails}</h3>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.title_label}</label>
            <select
              name="principalTitle"
              value={formData.principalTitle || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{b.select}</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.name}</label>
            <input
              type="text"
              name="principalName"
              value={formData.principalName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {b.mobile} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="principalMobile"
              value={formData.principalMobile || ''}
              onChange={handleMobileChange}
              maxLength={10}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent ${
                mobileErrors.principalMobile ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="10-digit number"
            />
            {mobileErrors.principalMobile && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{language === 'en' ? 'Mobile number must be exactly 10 digits' : 'மொபைல் எண் சரியாக 10 இலக்கங்களாக இருக்க வேண்டும்'}</span>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.whatsapp}</label>
            <input
              type="tel"
              name="principalWhatsapp"
              value={formData.principalWhatsapp || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.email}</label>
            <input
              type="email"
              name="principalEmail"
              value={formData.principalEmail || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
