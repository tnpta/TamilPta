import React from 'react';
import { Upload, Camera } from 'lucide-react';
import { RegistrationTranslations } from '../../types';

interface InfrastructureFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  t: RegistrationTranslations;
  language: 'en' | 'ta';
}

const InfrastructureForm: React.FC<InfrastructureFormProps> = ({ formData, updateFormData, t, language }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleBuildingChange = (blockIndex: number, field: string, value: string) => {
    const buildings = formData.buildings || [{}, {}, {}];
    buildings[blockIndex] = { ...buildings[blockIndex], [field]: value };
    updateFormData({ buildings });
  };

  const inf = t.infrastructure;
  const tm = t.trustManagement;

  const locationTypes = [
    { value: 'Greater Chennai Area', label: inf.greaterChennai },
    { value: 'Corporation', label: inf.corporation },
    { value: 'District Headquarters', label: inf.districtHQ },
    { value: 'Municipality', label: inf.municipality },
    { value: 'Town Panchayat', label: inf.townPanchayat },
    { value: 'Village Panchayat', label: inf.villagePanchayat },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-200">
        {inf.title}
      </h2>

      {/* Location & Land */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{inf.locationLand}</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{inf.locationType}</label>
            <select
              name="locationType"
              value={formData.locationType || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{inf.selectLocationType}</option>
              {locationTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{inf.totalLandAcres}</label>
              <input
                type="number"
                name="landAcres"
                value={formData.landAcres || ''}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{inf.totalLandSqft}</label>
              <input
                type="number"
                name="landSqFt"
                value={formData.landSqFt || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {inf.sufficientLand}
              </label>
              <select
                name="sufficientLand"
                value={formData.sufficientLand || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              >
                <option value="">{t.basicInfo.select}</option>
                <option value="Yes">{tm.yes}</option>
                <option value="No">{tm.no}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{inf.ifNoDetails}</label>
              <input
                type="text"
                name="landShortageDetails"
                value={formData.landShortageDetails || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{inf.landContiguous}</label>
              <select
                name="landContiguous"
                value={formData.landContiguous || ''}
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
                {inf.distanceBetween}
              </label>
              <input
                type="text"
                name="landDistance"
                value={formData.landDistance || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{inf.landOwnership}</label>
              <select
                name="landOwnership"
                value={formData.landOwnership || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              >
                <option value="">{t.basicInfo.select}</option>
                <option value="Trust">{inf.inNameOfTrust}</option>
                <option value="Society">{inf.inNameOfSociety}</option>
                <option value="Company">{inf.inNameOfCompany}</option>
                <option value="Lease">{inf.acquiredByLease}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {inf.leaseYears}
              </label>
              <input
                type="text"
                name="leaseYears"
                value={formData.leaseYears || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Building Details */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{inf.buildingDetails}</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{inf.numberOfBuildings}</label>
          <input
            type="number"
            name="numberOfBuildings"
            value={formData.numberOfBuildings || ''}
            onChange={handleChange}
            min="1"
            className="w-full md:w-48 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
          />
        </div>

        {[0, 1, 2].map((blockIndex) => (
          <div key={blockIndex} className="bg-white rounded-lg p-4 mb-4 border border-green-200">
            <h4 className="font-semibold text-gray-800 mb-3">{inf.block} {blockIndex + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.yearOfConstruction}</label>
                <input
                  type="text"
                  value={formData.buildings?.[blockIndex]?.yearOfConstruction || ''}
                  onChange={(e) => handleBuildingChange(blockIndex, 'yearOfConstruction', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.numberOfFloors}</label>
                <input
                  type="number"
                  value={formData.buildings?.[blockIndex]?.numberOfFloors || ''}
                  onChange={(e) => handleBuildingChange(blockIndex, 'numberOfFloors', e.target.value)}
                  min="1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.buildingPlanApproved}</label>
                <select
                  value={formData.buildings?.[blockIndex]?.planApproved || ''}
                  onChange={(e) => handleBuildingChange(blockIndex, 'planApproved', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                >
                  <option value="">{t.basicInfo.select}</option>
                  <option value="Yes">{tm.yes}</option>
                  <option value="No">{tm.no}</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {inf.approvalDetails}
              </label>
              <input
                type="text"
                value={formData.buildings?.[blockIndex]?.approvalDetails || ''}
                onChange={(e) => handleBuildingChange(blockIndex, 'approvalDetails', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
              >
                <Upload size={18} />
                {language === 'en' ? 'Upload Order Copy' : 'ஆணை நகலைப் பதிவேற்றவும்'}
              </button>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {inf.unapprovedSteps}
            </label>
            <textarea
              name="regularisationSteps"
              value={formData.regularisationSteps || ''}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{inf.feePaid}</label>
              <input
                type="number"
                name="regularisationFee"
                value={formData.regularisationFee || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{inf.dateOfRemittance}</label>
              <input
                type="date"
                name="regularisationDate"
                value={formData.regularisationDate || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{inf.classroomFacilities}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {inf.adequateClassrooms}
            </label>
            <select
              name="adequateClassrooms"
              value={formData.adequateClassrooms || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{inf.classroomSize}</label>
            <input
              type="number"
              name="classroomSize"
              value={formData.classroomSize || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Camera size={18} />
              {language === 'en' ? 'Upload Photo' : 'புகைப்படம் பதிவேற்றவும்'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{inf.toiletsBoys}</label>
            <input
              type="number"
              name="toiletsBoys"
              value={formData.toiletsBoys || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
            <button
              type="button"
              className="mt-2 w-full px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Camera size={16} />
              {language === 'en' ? 'Photo' : 'புகைப்படம்'}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{inf.toiletsGirls}</label>
            <input
              type="number"
              name="toiletsGirls"
              value={formData.toiletsGirls || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
            <button
              type="button"
              className="mt-2 w-full px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Camera size={16} />
              {language === 'en' ? 'Photo' : 'புகைப்படம்'}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{inf.drinkingWaterTaps}</label>
            <input
              type="number"
              name="drinkingWaterTaps"
              value={formData.drinkingWaterTaps || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
            <button
              type="button"
              className="mt-2 w-full px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Camera size={16} />
              {language === 'en' ? 'Photo' : 'புகைப்படம்'}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{inf.handWashTaps}</label>
            <input
              type="number"
              name="handWashTaps"
              value={formData.handWashTaps || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            />
            <button
              type="button"
              className="mt-2 w-full px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Camera size={16} />
              {language === 'en' ? 'Photo' : 'புகைப்படம்'}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {inf.separateToilets}
          </label>
          <select
            name="separateToilets"
            value={formData.separateToilets || ''}
            onChange={handleChange}
            className="w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
          >
            <option value="">{t.basicInfo.select}</option>
            <option value="Yes">{tm.yes}</option>
            <option value="No">{tm.no}</option>
          </select>
        </div>
      </div>

      {/* Mandatory Certificates */}
      <div className="bg-red-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{inf.mandatoryCertificates}</h3>

        <div className="space-y-6">
          {/* Building Stability Certificate */}
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-gray-800 mb-3">{inf.buildingStability}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.certificateNo}</label>
                <input
                  type="text"
                  name="stabilityNo"
                  value={formData.stabilityNo || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
                >
                  <Upload size={18} />
                  {language === 'en' ? 'Upload Document' : 'ஆவணம் பதிவேற்றவும்'}
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.dateAuthority}</label>
                <input
                  type="text"
                  name="stabilityDateAuthority"
                  value={formData.stabilityDateAuthority || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.personsAccommodated}</label>
                <input
                  type="number"
                  name="stabilityPersons"
                  value={formData.stabilityPersons || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Building License Certificate */}
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-gray-800 mb-3">{inf.buildingLicense}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.certificateNo}</label>
                <input
                  type="text"
                  name="licenseNo"
                  value={formData.licenseNo || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
                >
                  <Upload size={18} />
                  {language === 'en' ? 'Upload Document' : 'ஆவணம் பதிவேற்றவும்'}
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.dateAuthority}</label>
                <input
                  type="text"
                  name="licenseDateAuthority"
                  value={formData.licenseDateAuthority || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.personsAccommodated}</label>
                <input
                  type="number"
                  name="licensePersons"
                  value={formData.licensePersons || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Fire NOC */}
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-gray-800 mb-3">{inf.fireNoc}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.certificateNo}</label>
                <input
                  type="text"
                  name="fireNocNo"
                  value={formData.fireNocNo || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
                >
                  <Upload size={18} />
                  {language === 'en' ? 'Upload Document' : 'ஆவணம் பதிவேற்றவும்'}
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.dateAuthority}</label>
                <input
                  type="text"
                  name="fireNocDateAuthority"
                  value={formData.fireNocDateAuthority || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Sanitary Certificate */}
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-gray-800 mb-3">{inf.sanitaryCert}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.certificateNo}</label>
                <input
                  type="text"
                  name="sanitaryNo"
                  value={formData.sanitaryNo || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
                >
                  <Upload size={18} />
                  {language === 'en' ? 'Upload Document' : 'ஆவணம் பதிவேற்றவும்'}
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.dateAuthority}</label>
                <input
                  type="text"
                  name="sanitaryDateAuthority"
                  value={formData.sanitaryDateAuthority || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureForm;
