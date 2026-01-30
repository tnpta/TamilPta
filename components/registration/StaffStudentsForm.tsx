import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { RegistrationTranslations } from '../../types';

interface StaffStudentsFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  t: RegistrationTranslations;
  language: 'en' | 'ta';
}

const classes = ['Pre-KG', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const StaffStudentsForm: React.FC<StaffStudentsFormProps> = ({ formData, updateFormData, t, language }) => {
  const [uploadedDocuments, setUploadedDocuments] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      try {
        // Get mobile number from formData
        const mobile = formData.schoolMobile || formData.correspondentMobile;
        if (!mobile) {
          alert('Please enter school mobile number first');
          return;
        }

        const formDataUpload = new FormData();
        formDataUpload.append('document', file);

        const response = await fetch(`http://localhost:5001/api/uploads/${mobile}/document`, {
          method: 'POST',
          body: formDataUpload,
        });

        const result = await response.json();

        if (result.ok) {
          setUploadedDocuments(file);
          setUploadSuccess(`Uploaded successfully: ${file.name}`);
          
          // Update EMIS path for all classes in classStrength
          const classStrength = formData.classStrength || {};
          const updatedClassStrength: any = {};
          
          // Set emisPath for all existing classes
          classes.forEach((cls) => {
            if (classStrength[cls]) {
              updatedClassStrength[cls] = {
                ...classStrength[cls],
                emisPath: result.file.path
              };
            } else {
              // Initialize with empty values but set emisPath
              updatedClassStrength[cls] = {
                boys: '',
                girls: '',
                rte: '',
                emisPath: result.file.path
              };
            }
          });
          
          updateFormData({
            classStrength: updatedClassStrength,
            classStrengthDocumentFile: result.file.filename,
            classStrengthDocumentFilePath: result.file.path
          });
        } else {
          alert('Upload failed: ' + result.error);
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed. Please try again.');
      }
    } else {
      alert('Please select a PDF file.');
    }
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
            <label className="block text-sm font-medium text-gray-700 mb-2">TET Qualified (Secondary Grade)</label>
            <input
              type="number"
              name="teachingTETSecondary"
              value={formData.teachingTETSecondary || ''}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{ss.classWiseStrength}</h3>
            <p className="text-sm text-gray-600 mt-1">{ss.emisNote}</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleDocumentUpload}
            accept=".pdf"
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Upload size={18} />
            {language === 'en' ? 'Upload Documents' : 'ஆவணங்களைப் பதிவேற்றவும்'}
          </button>
          {uploadSuccess && (
            <p className="text-green-600 text-sm mt-2">{uploadSuccess}</p>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-purple-100">
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">{ss.class}</th>
                <th className="px-3 py-2 text-center text-sm font-semibold text-gray-700">{language === 'en' ? 'Sections' : 'பிரிவுகள்'}</th>
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
                      value={formData.classStrength?.[cls]?.sections || ''}
                      onChange={(e) => handleClassStrengthChange(cls, 'sections', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-center text-sm focus:ring-2 focus:ring-tn-green focus:border-transparent"
                    />
                  </td>
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
