import React from 'react';
import { Upload } from 'lucide-react';
import { RegistrationTranslations } from '../../types';

interface FeesOtherFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  t: RegistrationTranslations;
  language: 'en' | 'ta';
}

const classGroups = ['PKG/LKG/UKG', 'I-III', 'IV-V', 'VI-VIII', 'IX-X', 'XI-XII'];

const FeesOtherForm: React.FC<FeesOtherFormProps> = ({ formData, updateFormData, t, language }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleExpenseChange = (category: string, classGroup: string, type: 'monthly' | 'yearly', value: string) => {
    const expenses = formData.expenses || {};
    updateFormData({
      expenses: {
        ...expenses,
        [category]: {
          ...(expenses[category] || {}),
          [classGroup]: {
            ...(expenses[category]?.[classGroup] || {}),
            [type]: value
          }
        }
      }
    });
  };

  const fo = t.feesOthers;
  const tm = t.trustManagement;
  const ec = fo.expenseCategories;

  const expenseCategories = [
    { key: 'teachingSalary', label: ec.teachingSalary },
    { key: 'nonTeachingSalary', label: ec.nonTeachingSalary },
    { key: 'ebBill', label: ec.ebBill },
    { key: 'miscExpenses', label: ec.miscExpenses },
    { key: 'transportExp', label: ec.transportExp },
    { key: 'buildingMaintenance', label: ec.buildingMaintenance },
    { key: 'booksPurchase', label: ec.booksPurchase },
    { key: 'advertisement', label: ec.advertisement },
    { key: 'propertyTax', label: ec.propertyTax },
    { key: 'softwareDigital', label: ec.softwareDigital },
    { key: 'otherExpenses', label: ec.otherExpenses },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-200">
        {fo.title}
      </h2>

      {/* Fees Fixation */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{fo.feesFixation}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fo.feesFixationOrder}
            </label>
            <select
              name="feesFixationOrder"
              value={formData.feesFixationOrder || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
            >
              <Upload size={18} />
              {language === 'en' ? 'Upload Order Copy' : 'ஆணை நகலைப் பதிவேற்றவும்'}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fo.ptaConsulted}
            </label>
            <select
              name="ptaConsulted"
              value={formData.ptaConsulted || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
          </div>
        </div>

        {formData.ptaConsulted === 'Yes' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fo.ptaConsultationDetails}
            </label>
            <textarea
              name="ptaConsultationDetails"
              value={formData.ptaConsultationDetails || ''}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{fo.feesCollected}</label>
            <input
              type="text"
              name="feesCollected"
              value={formData.feesCollected || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              placeholder="Enter amount details"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{fo.feesFixedByCommittee}</label>
            <input
              type="text"
              name="feesFixedByCommittee"
              value={formData.feesFixedByCommittee || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              placeholder="Enter amount details"
            />
          </div>
        </div>
      </div>

      {/* Expense Details */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{fo.expenseDetails}</h3>
        <p className="text-sm text-gray-600 mb-4">{fo.auditNote}</p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="bg-green-100">
                <th className="px-3 py-2 text-left font-semibold text-gray-700">{fo.expenseCategory}</th>
                {classGroups.map(group => (
                  <th key={group} className="px-3 py-2 text-center font-semibold text-gray-700">{group}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenseCategories.map((category, index) => (
                <tr key={category.key} className={index % 2 === 0 ? 'bg-white' : 'bg-green-50/50'}>
                  <td className="px-3 py-2 font-medium text-gray-700 text-xs">{category.label}</td>
                  {classGroups.map(group => (
                    <td key={group} className="px-2 py-1">
                      <input
                        type="number"
                        min="0"
                        value={formData.expenses?.[category.key]?.[group]?.monthly || ''}
                        onChange={(e) => handleExpenseChange(category.key, group, 'monthly', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-center text-xs focus:ring-1 focus:ring-tn-green focus:border-transparent"
                        placeholder="Rs."
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* School Vehicles */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{fo.schoolVehicles}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{fo.numberOfVans}</label>
            <input
              type="number"
              name="vehiclesVan"
              value={formData.vehiclesVan || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{fo.numberOfBuses}</label>
            <input
              type="number"
              name="vehiclesBus"
              value={formData.vehiclesBus || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{fo.otherVehicles}</label>
            <input
              type="number"
              name="vehiclesOther"
              value={formData.vehiclesOther || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Other Details */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{fo.otherDetails}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fo.lastYearAudit}
            </label>
            <select
              name="lastYearAuditFiled"
              value={formData.lastYearAuditFiled || ''}
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
              {fo.last3YearsAudit}
            </label>
            <input
              type="text"
              name="last3YearsAudit"
              value={formData.last3YearsAudit || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              placeholder="Enter details"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fo.healthCare}
            </label>
            <select
              name="healthCareAvailable"
              value={formData.healthCareAvailable || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
          </div>
          {formData.healthCareAvailable === 'Yes' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {fo.healthCareDetails}
              </label>
              <input
                type="text"
                name="healthCareDetails"
                value={formData.healthCareDetails || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fo.socialAwareness}
            </label>
            <select
              name="socialAwarenessProgram"
              value={formData.socialAwarenessProgram || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
          </div>
          {formData.socialAwarenessProgram === 'Yes' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {fo.socialAwarenessDetails}
              </label>
              <input
                type="text"
                name="socialAwarenessDetails"
                value={formData.socialAwarenessDetails || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fo.socialServices}
            </label>
            <select
              name="socialServicesProgram"
              value={formData.socialServicesProgram || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
          </div>
          {formData.socialServicesProgram === 'Yes' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {fo.socialServicesDetails}
              </label>
              <input
                type="text"
                name="socialServicesDetails"
                value={formData.socialServicesDetails || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {fo.salaryECS}
          </label>
          <select
            name="salaryECS"
            value={formData.salaryECS || ''}
            onChange={handleChange}
            className="w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
          >
            <option value="">{t.basicInfo.select}</option>
            <option value="Yes">{tm.yes}</option>
            <option value="No">{tm.no}</option>
          </select>
        </div>
      </div>

      {/* Declaration */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{fo.declaration}</h3>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="declaration"
            checked={formData.declaration || false}
            onChange={(e) => updateFormData({ declaration: e.target.checked })}
            className="w-5 h-5 mt-0.5 text-tn-green border-gray-300 rounded focus:ring-tn-green"
          />
          <span className="text-sm text-gray-700">
            {fo.declarationText}
          </span>
        </label>
      </div>
    </div>
  );
};

export default FeesOtherForm;
