import React from 'react';
import { RegistrationTranslations } from '../../types';

interface StaffStudentsFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  t: RegistrationTranslations;
}

const classes = ['Pre-KG', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const StaffStudentsForm: React.FC<StaffStudentsFormProps> = ({ formData, updateFormData, t }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleClassStrengthChange = (className: string, field: string, value: string) => {
    const classStrength = formData.classStrength || {};
    updateFormData({
      classStrength: {
        ...classStrength,
        [className]: {
          ...(classStrength[className] || {}),
          [field]: value
        }
      }
    });
  };

  const ss = t.staffStudents;

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-200">
        {ss.title}
      </h2>

      {/* Teaching Staff */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{ss.teachingStaff}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.pg}</label>
            <input
              type="number"
              name="teachingPG"
              value={formData.teachingPG || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.ug}</label>
            <input
              type="number"
              name="teachingUG"
              value={formData.teachingUG || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.sgt}</label>
            <input
              type="number"
              name="teachingSGT"
              value={formData.teachingSGT || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.bed}</label>
            <input
              type="number"
              name="teachingBEd"
              value={formData.teachingBEd || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.med}</label>
            <input
              type="number"
              name="teachingMEd"
              value={formData.teachingMEd || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.tetQualifiedBed}</label>
            <input
              type="number"
              name="teachingTETBEd"
              value={formData.teachingTETBEd || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.tetQualifiedMed}</label>
            <input
              type="number"
              name="teachingTETMEd"
              value={formData.teachingTETMEd || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.tetOnly}</label>
            <input
              type="number"
              name="teachingTET"
              value={formData.teachingTET || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Supporting Staff */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{ss.supportingStaff}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.officeStaff}</label>
            <input
              type="number"
              name="supportOfficeStaff"
              value={formData.supportOfficeStaff || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.accountants}</label>
            <input
              type="number"
              name="supportAccountants"
              value={formData.supportAccountants || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.library}</label>
            <input
              type="number"
              name="supportLibrary"
              value={formData.supportLibrary || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.drawing}</label>
            <input
              type="number"
              name="supportDrawing"
              value={formData.supportDrawing || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.pet}</label>
            <input
              type="number"
              name="supportPET"
              value={formData.supportPET || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.others}</label>
            <input
              type="number"
              name="supportOthers"
              value={formData.supportOthers || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Non-Teaching Staff */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{ss.nonTeachingStaff}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.oa}</label>
            <input
              type="number"
              name="nonTeachingOA"
              value={formData.nonTeachingOA || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.driverHelper}</label>
            <input
              type="number"
              name="nonTeachingDrivers"
              value={formData.nonTeachingDrivers || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.watchman}</label>
            <input
              type="number"
              name="nonTeachingWatchman"
              value={formData.nonTeachingWatchman || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.aaya}</label>
            <input
              type="number"
              name="nonTeachingAaya"
              value={formData.nonTeachingAaya || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.sweepers}</label>
            <input
              type="number"
              name="nonTeachingSweepers"
              value={formData.nonTeachingSweepers || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{ss.others}</label>
            <input
              type="number"
              name="nonTeachingOthers"
              value={formData.nonTeachingOthers || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Class-wise Strength */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{ss.classWiseStrength}</h3>
        <p className="text-sm text-gray-600 mb-4">{ss.emisNote}</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-purple-100">
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">{ss.class}</th>
                <th className="px-3 py-2 text-center text-sm font-semibold text-gray-700">{ss.boys}</th>
                <th className="px-3 py-2 text-center text-sm font-semibold text-gray-700">{ss.girls}</th>
                <th className="px-3 py-2 text-center text-sm font-semibold text-gray-700">{ss.rte}</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls, index) => (
                <tr key={cls} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50/50'}>
                  <td className="px-3 py-2 text-sm font-medium text-gray-700">{cls}</td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      value={formData.classStrength?.[cls]?.boys || ''}
                      onChange={(e) => handleClassStrengthChange(cls, 'boys', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-center text-sm focus:ring-2 focus:ring-tn-green focus:border-transparent"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      value={formData.classStrength?.[cls]?.girls || ''}
                      onChange={(e) => handleClassStrengthChange(cls, 'girls', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-center text-sm focus:ring-2 focus:ring-tn-green focus:border-transparent"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      value={formData.classStrength?.[cls]?.rte || ''}
                      onChange={(e) => handleClassStrengthChange(cls, 'rte', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-center text-sm focus:ring-2 focus:ring-tn-green focus:border-transparent"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffStudentsForm;
