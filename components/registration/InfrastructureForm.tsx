import React, { useState, useRef } from 'react';
import { Upload, MapPin } from 'lucide-react';
import { RegistrationTranslations } from '../../types';

interface InfrastructureFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  t: RegistrationTranslations;
  language: 'en' | 'ta';
}

const InfrastructureForm: React.FC<InfrastructureFormProps> = ({ formData, updateFormData, t, language }) => {
  const [stabilityDocSuccess, setStabilityDocSuccess] = useState<string>('');
  const [licenseDocSuccess, setLicenseDocSuccess] = useState<string>('');
  const [fireNocDocSuccess, setFireNocDocSuccess] = useState<string>('');
  const [sanitaryDocSuccess, setSanitaryDocSuccess] = useState<string>('');

  const stabilityDocRef = useRef<HTMLInputElement>(null);
  const licenseDocRef = useRef<HTMLInputElement>(null);
  const fireNocDocRef = useRef<HTMLInputElement>(null);
  const sanitaryDocRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleLandSqFtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sqft = parseFloat(e.target.value) || 0;
    const ground = sqft / 2400;
    const acres = sqft / 43560;
    updateFormData({
      landSqFt: e.target.value,
      landGround: sqft > 0 ? ground.toFixed(2) : '',
      landAcres: sqft > 0 ? acres.toFixed(4) : '',
    });
  };

  const handleBuildingChange = (blockIndex: number, field: string, value: string) => {
    const buildings = formData.buildings || [];
    const newBuildings = [...buildings];
    while (newBuildings.length <= blockIndex) {
      newBuildings.push({});
    }
    newBuildings[blockIndex] = { ...newBuildings[blockIndex], [field]: value };

    // If numberOfFloors changed, initialize floors array
    if (field === 'numberOfFloors') {
      const numFloors = parseInt(value) || 0;
      const existingFloors = newBuildings[blockIndex].floors || [];
      const newFloors = [];
      for (let i = 0; i < numFloors; i++) {
        newFloors.push(existingFloors[i] || {});
      }
      newBuildings[blockIndex].floors = newFloors;
    }

    updateFormData({ buildings: newBuildings });
  };

  const handleFloorChange = (blockIndex: number, floorIndex: number, field: string, value: string) => {
    const buildings = formData.buildings || [];
    const newBuildings = [...buildings];
    while (newBuildings.length <= blockIndex) {
      newBuildings.push({});
    }
    const block = { ...newBuildings[blockIndex] };
    const floors = [...(block.floors || [])];
    while (floors.length <= floorIndex) {
      floors.push({});
    }
    floors[floorIndex] = { ...floors[floorIndex], [field]: value };
    block.floors = floors;
    newBuildings[blockIndex] = block;
    updateFormData({ buildings: newBuildings });
  };

  const handleSaveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateFormData({
            landLatitude: position.coords.latitude.toString(),
            landLongitude: position.coords.longitude.toString(),
          });
          alert(language === 'en' ? 'Location saved successfully!' : 'இடம் வெற்றிகரமாக சேமிக்கப்பட்டது!');
        },
        () => {
          alert(language === 'en' ? 'Unable to get location. Please allow location access.' : 'இடத்தைப் பெற இயலவில்லை. இருப்பிட அணுகலை அனுமதிக்கவும்.');
        }
      );
    } else {
      alert(language === 'en' ? 'Geolocation is not supported by this browser.' : 'இந்த உலாவி நிலை அறிதலை ஆதரிக்கவில்லை.');
    }
  };

  const [blockUploadSuccess, setBlockUploadSuccess] = useState<{[key: string]: string}>({});
  const blockOrderRefs = useRef<{[key: string]: HTMLInputElement | null}>({});
  const floorOrderRefs = useRef<{[key: string]: HTMLInputElement | null}>({});

  const handleBlockOrderUpload = async (blockIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      try {
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
          const buildings = formData.buildings || [];
          const newBuildings = [...buildings];
          while (newBuildings.length <= blockIndex) {
            newBuildings.push({});
          }
          newBuildings[blockIndex] = {
            ...newBuildings[blockIndex],
            approvalOrderCopyPath: result.file.path
          };

          updateFormData({ buildings: newBuildings });
          setBlockUploadSuccess(prev => ({
            ...prev,
            [`block_${blockIndex}`]: `Uploaded successfully: ${file.name}`
          }));
        } else {
          alert('Upload failed: ' + result.error);
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed. Please try again.');
      }
    } else {
      alert('Please select a PDF or Word document file.');
    }
  };

  const handleFloorOrderUpload = async (blockIndex: number, floorIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      try {
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
          const buildings = formData.buildings || [];
          const newBuildings = [...buildings];
          while (newBuildings.length <= blockIndex) {
            newBuildings.push({});
          }
          const block = { ...newBuildings[blockIndex] };
          const floors = [...(block.floors || [])];
          while (floors.length <= floorIndex) {
            floors.push({});
          }
          floors[floorIndex] = {
            ...floors[floorIndex],
            approvalOrderCopyPath: result.file.path
          };
          block.floors = floors;
          newBuildings[blockIndex] = block;

          updateFormData({ buildings: newBuildings });
          setBlockUploadSuccess(prev => ({
            ...prev,
            [`floor_${blockIndex}_${floorIndex}`]: `Uploaded successfully: ${file.name}`
          }));
        } else {
          alert('Upload failed: ' + result.error);
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed. Please try again.');
      }
    } else {
      alert('Please select a PDF or Word document file.');
    }
  };

  const handleDocumentUpload = async (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
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
          // Update formData with the appropriate document path field
          const updateData: any = {};
          if (type === 'stability') {
            updateData.stabilityDocumentPath = result.file.path;
            setStabilityDocSuccess(`Uploaded successfully: ${file.name}`);
          } else if (type === 'license') {
            updateData.licenseDocumentPath = result.file.path;
            setLicenseDocSuccess(`Uploaded successfully: ${file.name}`);
          } else if (type === 'fireNoc') {
            updateData.fireNocDocumentPath = result.file.path;
            setFireNocDocSuccess(`Uploaded successfully: ${file.name}`);
          } else if (type === 'sanitary') {
            updateData.sanitaryDocumentPath = result.file.path;
            setSanitaryDocSuccess(`Uploaded successfully: ${file.name}`);
          }
          
          updateFormData(updateData);
        } else {
          alert('Upload failed: ' + result.error);
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed. Please try again.');
      }
    } else {
      alert('Please select a PDF or Word document file.');
    }
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{inf.totalLandSqft}</label>
              <input
                type="number"
                name="landSqFt"
                value={formData.landSqFt || ''}
                onChange={handleLandSqFtChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{inf.totalLandGround}</label>
              <input
                type="text"
                name="landGround"
                value={formData.landGround || ''}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
              />
              <span className="text-xs text-gray-500 mt-1 block">{language === 'en' ? '1 Ground = 2,400 Sq.Ft.' : '1 கிரவுண்ட் = 2,400 சதுர அடி'}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{inf.totalLandAcres}</label>
              <input
                type="text"
                name="landAcres"
                value={formData.landAcres || ''}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
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
            {formData.sufficientLand === 'No' && (
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
            )}
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
            {formData.landContiguous === 'No' && (
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
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{inf.htLinesOrCanal}</label>
            <select
              name="htLinesOrCanal"
              value={formData.htLinesOrCanal || ''}
              onChange={handleChange}
              className="w-full md:w-1/2 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSaveLocation}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <MapPin size={18} />
              {inf.saveLocation}
            </button>
            {formData.landLatitude && formData.landLongitude && (
              <span className="text-sm text-green-600">
                {language === 'en' ? 'Location saved' : 'இடம் சேமிக்கப்பட்டது'}: {formData.landLatitude}, {formData.landLongitude}
              </span>
            )}
          </div>

          <div className={`grid grid-cols-1 ${formData.landOwnership === 'Lease' ? 'md:grid-cols-2' : ''} gap-6`}>
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
            {formData.landOwnership === 'Lease' && (
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
            )}
          </div>
        </div>
      </div>

      {/* Building Details */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{inf.buildingDetails}</h3>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">{inf.numberOfBuildings}</label>
          <select
            name="numberOfBuildings"
            value={formData.numberOfBuildings || ''}
            onChange={handleChange}
            className="w-full md:w-48 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
          >
            <option value="">{t.basicInfo.select}</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {Array.from({ length: parseInt(formData.numberOfBuildings) || 0 }, (_, blockIndex) => {
          const buildings = formData.buildings || [];
          const block = buildings[blockIndex] || {};
          const numFloors = parseInt(block.numberOfFloors) || 0;

          return (
            <div key={blockIndex} className="bg-white rounded-lg p-4 mb-4 border border-green-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-base border-b border-green-100 pb-2">
                {inf.block} {blockIndex + 1}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{inf.yearOfConstruction}</label>
                  <input
                    type="text"
                    value={block.yearOfConstruction || ''}
                    onChange={(e) => handleBuildingChange(blockIndex, 'yearOfConstruction', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                    placeholder="e.g., 1995"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{inf.numberOfFloors}</label>
                  <input
                    type="number"
                    value={block.numberOfFloors || ''}
                    onChange={(e) => handleBuildingChange(blockIndex, 'numberOfFloors', e.target.value)}
                    min="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{inf.buildingPlanApproved}</label>
                  <select
                    value={block.planApproved || ''}
                    onChange={(e) => handleBuildingChange(blockIndex, 'planApproved', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                  >
                    <option value="">{t.basicInfo.select}</option>
                    <option value="Yes">{tm.yes}</option>
                    <option value="No">{tm.no}</option>
                  </select>
                </div>
              </div>

              {block.planApproved === 'Yes' && (
                <div className="mb-4 bg-green-50 p-3 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {inf.approvalDetails}
                  </label>
                  <input
                    type="text"
                    value={block.approvalDetails || ''}
                    onChange={(e) => handleBuildingChange(blockIndex, 'approvalDetails', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                  />
                  <input
                    type="file"
                    ref={(el) => { blockOrderRefs.current[`block_${blockIndex}`] = el; }}
                    onChange={(e) => handleBlockOrderUpload(blockIndex, e)}
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => blockOrderRefs.current[`block_${blockIndex}`]?.click()}
                    className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
                  >
                    <Upload size={18} />
                    {language === 'en' ? 'Upload Order Copy' : 'ஆணை நகலைப் பதிவேற்றவும்'}
                  </button>
                  {blockUploadSuccess[`block_${blockIndex}`] && (
                    <p className="text-green-600 text-sm mt-2">{blockUploadSuccess[`block_${blockIndex}`]}</p>
                  )}
                </div>
              )}

              {/* Floor Details */}
              {numFloors > 0 && (
                <div className="mt-4 space-y-3">
                  <h5 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1">
                    {language === 'en' ? 'Floor Details' : 'தள விவரங்கள்'}
                  </h5>
                  {Array.from({ length: numFloors }, (_, floorIndex) => {
                    const floors = block.floors || [];
                    const floor = floors[floorIndex] || {};

                    return (
                      <div key={floorIndex} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-800">
                            {inf.floor} {floorIndex + 1}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">{inf.floorApproved}</label>
                            <select
                              value={floor.floorApproved || ''}
                              onChange={(e) => handleFloorChange(blockIndex, floorIndex, 'floorApproved', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-tn-green focus:border-transparent"
                            >
                              <option value="">{t.basicInfo.select}</option>
                              <option value="Yes">{tm.yes}</option>
                              <option value="No">{tm.no}</option>
                            </select>
                          </div>
                          {floor.floorApproved === 'Yes' && (
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                {inf.floorApprovalDetails}
                              </label>
                              <input
                                type="text"
                                value={floor.approvalDetails || ''}
                                onChange={(e) => handleFloorChange(blockIndex, floorIndex, 'approvalDetails', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-tn-green focus:border-transparent"
                              />
                            </div>
                          )}
                        </div>
                        {floor.floorApproved === 'Yes' && (
                          <div className="mt-2">
                            <input
                              type="file"
                              ref={(el) => { floorOrderRefs.current[`floor_${blockIndex}_${floorIndex}`] = el; }}
                              onChange={(e) => handleFloorOrderUpload(blockIndex, floorIndex, e)}
                              accept=".pdf,.doc,.docx"
                              style={{ display: 'none' }}
                            />
                            <button
                              type="button"
                              onClick={() => floorOrderRefs.current[`floor_${blockIndex}_${floorIndex}`]?.click()}
                              className="px-3 py-1.5 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2 text-sm"
                            >
                              <Upload size={14} />
                              {language === 'en' ? 'Upload Order Copy' : 'ஆணை நகலைப் பதிவேற்றவும்'}
                            </button>
                            {blockUploadSuccess[`floor_${blockIndex}_${floorIndex}`] && (
                              <p className="text-green-600 text-xs mt-1">{blockUploadSuccess[`floor_${blockIndex}_${floorIndex}`]}</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

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

      {/* Infra-Facilities */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{inf.infraFacilities}</h3>
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {inf.separateToilets}
            </label>
            <select
              name="separateToilets"
              value={formData.separateToilets || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
          </div>
        </div>

        {/* YouTube Link */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">{inf.youtubeLink}</label>
          <input
            type="url"
            name="youtubeLink"
            value={formData.youtubeLink || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            placeholder={language === 'en' ? 'https://www.youtube.com/...' : 'https://www.youtube.com/...'}
          />
        </div>

        {/* Accessibility & CWSN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{inf.liftOrRamps}</label>
            <select
              name="liftOrRamps"
              value={formData.liftOrRamps || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{inf.rampAtEntry}</label>
            <select
              name="rampAtEntry"
              value={formData.rampAtEntry || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{inf.cwsnToilets}</label>
            <select
              name="cwsnToilets"
              value={formData.cwsnToilets || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
            >
              <option value="">{t.basicInfo.select}</option>
              <option value="Yes">{tm.yes}</option>
              <option value="No">{tm.no}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mandatory Certificates */}
      <div className="bg-red-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{inf.mandatoryCertificates}</h3>

        <div className="space-y-6">
          {/* Building Stability Certificate */}
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-gray-800 mb-3">{inf.buildingStability}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.certificateNo}</label>
                <input
                  type="text"
                  name="stabilityNo"
                  value={formData.stabilityNo || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{inf.certificateIssuedBy}</label>
                <select
                  name="stabilityCertIssuedBy"
                  value={formData.stabilityCertIssuedBy || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent"
                >
                  <option value="">{t.basicInfo.select}</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 1A">Class 1A</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div>
                <input
                  type="file"
                  ref={stabilityDocRef}
                  onChange={(e) => handleDocumentUpload('stability', e)}
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />
                <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
                <button
                  type="button"
                  onClick={() => stabilityDocRef.current?.click()}
                  className="px-4 py-2.5 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
                >
                  <Upload size={18} />
                  {language === 'en' ? 'Upload Document' : 'ஆவணம் பதிவேற்றவும்'}
                </button>
                {stabilityDocSuccess && (
                  <p className="text-green-600 text-sm mt-2">{stabilityDocSuccess}</p>
                )}
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
                <input
                  type="file"
                  ref={licenseDocRef}
                  onChange={(e) => handleDocumentUpload('license', e)}
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => licenseDocRef.current?.click()}
                  className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
                >
                  <Upload size={18} />
                  {language === 'en' ? 'Upload Document' : 'ஆவணம் பதிவேற்றவும்'}
                </button>
                {licenseDocSuccess && (
                  <p className="text-green-600 text-sm mt-2">{licenseDocSuccess}</p>
                )}
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
                <input
                  type="file"
                  ref={fireNocDocRef}
                  onChange={(e) => handleDocumentUpload('fireNoc', e)}
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fireNocDocRef.current?.click()}
                  className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
                >
                  <Upload size={18} />
                  {language === 'en' ? 'Upload Document' : 'ஆவணம் பதிவேற்றவும்'}
                </button>
                {fireNocDocSuccess && (
                  <p className="text-green-600 text-sm mt-2">{fireNocDocSuccess}</p>
                )}
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
                <input
                  type="file"
                  ref={sanitaryDocRef}
                  onChange={(e) => handleDocumentUpload('sanitary', e)}
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => sanitaryDocRef.current?.click()}
                  className="mt-2 px-4 py-2 bg-tn-green text-white rounded-lg hover:bg-tn-green/90 transition-colors flex items-center gap-2"
                >
                  <Upload size={18} />
                  {language === 'en' ? 'Upload Document' : 'ஆவணம் பதிவேற்றவும்'}
                </button>
                {sanitaryDocSuccess && (
                  <p className="text-green-600 text-sm mt-2">{sanitaryDocSuccess}</p>
                )}
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
