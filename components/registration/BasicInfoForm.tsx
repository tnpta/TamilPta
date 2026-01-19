import React from 'react';
import { RegistrationTranslations } from '../../types';

interface BasicInfoFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  t: RegistrationTranslations;
}

const schoolTypes = [
  'N&P (Nursery & Primary)',
  'Matriculation',
  'State Board SF',
  'CBSE',
  'ICSE',
  'IGCSE',
  'IB'
];

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ formData, updateFormData, t }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleCheckboxChange = (type: string) => {
    const currentTypes = formData.schoolTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t: string) => t !== type)
      : [...currentTypes, type];
    updateFormData({ schoolTypes: newTypes });
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
            placeholder="Enter EMIS code"
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
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent bg-gray-50"
            readOnly
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.mobile}</label>
            <input
              type="tel"
              name="schoolMobile"
              value={formData.schoolMobile || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
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
            <label key={type} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={(formData.schoolTypes || []).includes(type)}
                onChange={() => handleCheckboxChange(type)}
                className="w-4 h-4 text-tn-green border-gray-300 rounded focus:ring-tn-green"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Correspondent Details */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{b.correspondentDetails}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.mobile}</label>
            <input
              type="tel"
              name="correspondentMobile"
              value={formData.correspondentMobile || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">{b.mobile}</label>
            <input
              type="tel"
              name="principalMobile"
              value={formData.principalMobile || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
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
