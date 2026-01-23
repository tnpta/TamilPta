import React from 'react';
import { Upload } from 'lucide-react';
import { RegistrationTranslations } from '../../types';

interface TrustManagementFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  t: RegistrationTranslations;
  language: 'en' | 'ta';
}

const TrustManagementForm: React.FC<TrustManagementFormProps> = ({ formData, updateFormData, t, language }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const tm = t.trustManagement;

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-200">
        {tm.title}
      </h2>

      {/* Trust/Society Details */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{tm.trustInfo}</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {tm.trustName}
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                name="trustName"
                value={formData.trustName || ''}
                onChange={handleChange}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
              <button
                type="button"
                className="px-4 py-2.5 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Upload size={18} />
                {language === 'en' ? 'Upload Documents' : 'ஆவணங்களைப் பதிவேற்றவும்'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{tm.orgType}</label>
              <select
                name="orgType"
                value={formData.orgType || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              >
                <option value="">{tm.selectType}</option>
                <option value="Trust">{tm.trust}</option>
                <option value="Society">{tm.society}</option>
                <option value="Company">{tm.company}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{tm.dateOfReg}</label>
              <input
                type="date"
                name="orgRegDate"
                value={formData.orgRegDate || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{tm.regNumber}</label>
              <input
                type="text"
                name="orgRegNumber"
                value={formData.orgRegNumber || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{tm.renewalDetails}</label>
              <input
                type="text"
                name="orgRenewalDetails"
                value={formData.orgRenewalDetails || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                placeholder="Renewal date / details"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chairman Details */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{tm.chairmanDetails}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.basicInfo.title_label}</label>
            <select
              name="chairmanTitle"
              value={formData.chairmanTitle || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.basicInfo.name}</label>
            <input
              type="text"
              name="chairmanName"
              value={formData.chairmanName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.basicInfo.mobile}</label>
            <input
              type="tel"
              name="chairmanMobile"
              value={formData.chairmanMobile || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.basicInfo.whatsapp}</label>
            <input
              type="tel"
              name="chairmanWhatsapp"
              value={formData.chairmanWhatsapp || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.basicInfo.email}</label>
            <input
              type="email"
              name="chairmanEmail"
              value={formData.chairmanEmail || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Secretary Details */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{tm.secretaryDetails}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.basicInfo.title_label}</label>
            <select
              name="secretaryTitle"
              value={formData.secretaryTitle || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.basicInfo.name}</label>
            <input
              type="text"
              name="secretaryName"
              value={formData.secretaryName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.basicInfo.mobile}</label>
            <input
              type="tel"
              name="secretaryMobile"
              value={formData.secretaryMobile || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.basicInfo.whatsapp}</label>
            <input
              type="tel"
              name="secretaryWhatsapp"
              value={formData.secretaryWhatsapp || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.basicInfo.email}</label>
            <input
              type="email"
              name="secretaryEmail"
              value={formData.secretaryEmail || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Establishment Details */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{tm.establishmentDetails}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{tm.yearOfEstablishment}</label>
            <input
              type="text"
              name="establishmentYear"
              value={formData.establishmentYear || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              placeholder="e.g., 1990"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{tm.classesAtEstablishment}</label>
            <input
              type="text"
              name="establishmentClasses"
              value={formData.establishmentClasses || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              placeholder="e.g., LKG to V"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{tm.openingOrderNo}</label>
            <input
              type="text"
              name="openingOrderNo"
              value={formData.openingOrderNo || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{tm.rcNo}</label>
            <input
              type="text"
              name="rcNo"
              value={formData.rcNo || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{tm.date}</label>
            <input
              type="date"
              name="openingOrderDate"
              value={formData.openingOrderDate || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {tm.additionalClasses}
          </label>
          <textarea
            name="additionalClassesDetails"
            value={formData.additionalClassesDetails || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            placeholder="Enter details of additional classes opened..."
          />
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
          >
            <Upload size={18} />
            {language === 'en' ? 'Upload Order Copy' : 'ஆணை நகலைப் பதிவேற்றவும்'}
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {tm.latestRenewal}
          </label>
          <textarea
            name="latestRenewalDetails"
            value={formData.latestRenewalDetails || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            placeholder="Enter latest renewal details..."
          />
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
          >
            <Upload size={18} />
            {language === 'en' ? 'Upload Order Copy' : 'ஆணை நகலைப் பதிவேற்றவும்'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{tm.firstBoardExam10}</label>
            <input
              type="text"
              name="firstBoardExam10th"
              value={formData.firstBoardExam10th || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              placeholder="e.g., 1995"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{tm.firstBoardExam12}</label>
            <input
              type="text"
              name="firstBoardExam12th"
              value={formData.firstBoardExam12th || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              placeholder="e.g., 1997"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{tm.classesFunctioningFrom}</label>
            <select
              name="classesFunctioningFrom"
              value={formData.classesFunctioningFrom || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Pre-KG">Pre-KG</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="I">I</option>
              <option value="VI">VI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{tm.classesFunctioningTo}</label>
            <select
              name="classesFunctioningTo"
              value={formData.classesFunctioningTo || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="V">V</option>
              <option value="VIII">VIII</option>
              <option value="X">X</option>
              <option value="XII">XII</option>
            </select>
          </div>
        </div>
      </div>

      {/* PTA Details */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{tm.ptaDetails}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {tm.ptaFormed}
            </label>
            <select
              name="ptaFormed"
              value={formData.ptaFormed || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {tm.ptaAffiliation}
            </label>
            <input
              type="text"
              name="ptaAffiliationDetails"
              value={formData.ptaAffiliationDetails || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              placeholder="Enter affiliation details..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustManagementForm;
