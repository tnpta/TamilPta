import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, ChevronDown, ChevronUp, School, Building, Users, FileText, CreditCard, Download, ExternalLink } from 'lucide-react';
import { getSchoolFullData, getDocumentDownloadUrl } from '../utils/api';
import { mapBackendDataToForm } from '../utils/dataMapper';
import { TranslationContent } from '../types';

interface SchoolDetailProps {
  t: TranslationContent;
}

const SchoolDetail: React.FC<SchoolDetailProps> = ({ t }) => {
  const { mobile } = useParams<{ mobile: string }>();
  const language = t.nav.home === 'Home' ? 'en' : 'ta';

  const [data, setData] = useState<any>(null);
  const [rawData, setRawData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([1, 2, 3, 4, 5]));

  useEffect(() => {
    if (mobile) {
      fetchData();
    }
  }, [mobile]);

  const fetchData = async () => {
    setLoading(true);
    const response = await getSchoolFullData(mobile!);
    if (response.ok && response.data) {
      setRawData(response.data);
      const mapped = mapBackendDataToForm(response.data);
      setData(mapped);
    } else {
      setError(response.error || 'Failed to load school data');
    }
    setLoading(false);
  };

  const toggleSection = (section: number) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const Field = ({ label, value }: { label: string; value: any }) => (
    <div className="py-2">
      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value || '-'}</dd>
    </div>
  );

  const DocLink = ({ label, path }: { label: string; path: string }) => {
    const [url, setUrl] = useState<string | null>(null);
    const [fetching, setFetching] = useState(false);

    const handleDownload = async () => {
      if (url) {
        window.open(url, '_blank');
        return;
      }
      setFetching(true);
      const downloadUrl = await getDocumentDownloadUrl(mobile!, path);
      if (downloadUrl) {
        setUrl(downloadUrl);
        window.open(downloadUrl, '_blank');
      }
      setFetching(false);
    };

    if (!path) return null;

    return (
      <button
        onClick={handleDownload}
        disabled={fetching}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-xs font-medium"
      >
        {fetching ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
        {label}
      </button>
    );
  };

  const SectionHeader = ({ num, icon: Icon, title }: { num: number; icon: any; title: string }) => (
    <button
      onClick={() => toggleSection(num)}
      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-tn-green/10 rounded-lg flex items-center justify-center">
          <Icon size={20} className="text-tn-green" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {expandedSections.has(num) ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <Loader2 className="w-8 h-8 animate-spin text-tn-green" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-red-600 mb-4">{error || 'No data found'}</p>
          <Link to="/admin/dashboard" className="text-tn-green hover:underline">
            {language === 'en' ? 'Back to Dashboard' : 'டாஷ்போர்டுக்குத் திரும்பு'}
          </Link>
        </div>
      </div>
    );
  }

  const status = rawData?.basic?.status || 'DRAFT';

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-tn-green transition-colors text-sm mb-4"
          >
            <ArrowLeft size={16} />
            {language === 'en' ? 'Back to Dashboard' : 'டாஷ்போர்டுக்குத் திரும்பு'}
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{data.schoolName || mobile}</h1>
              <p className="text-gray-500 text-sm mt-1">
                {language === 'en' ? 'Mobile:' : 'மொபைல்:'} {mobile}
                {data.schoolCode && ` | ${language === 'en' ? 'Code:' : 'குறியீடு:'} ${data.schoolCode}`}
              </p>
            </div>
            <div className="mt-3 md:mt-0">
              {status === 'SUBMITTED' ? (
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  {language === 'en' ? 'Submitted' : 'சமர்ப்பிக்கப்பட்டது'}
                </span>
              ) : (
                <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                  {language === 'en' ? 'Draft' : 'வரைவு'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 1: Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 mb-4 overflow-hidden">
          <SectionHeader num={1} icon={School} title={language === 'en' ? 'Basic Information' : 'அடிப்படை தகவல்'} />
          {expandedSections.has(1) && (
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'School Details' : 'பள்ளி விவரங்கள்'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'School Code' : 'பள்ளி குறியீடு'} value={data.schoolCode} />
                <Field label={language === 'en' ? 'School Name' : 'பள்ளி பெயர்'} value={data.schoolName} />
                <Field label={language === 'en' ? 'School Type' : 'பள்ளி வகை'} value={data.schoolType || (data.schoolTypes?.join(', '))} />
                <Field label={language === 'en' ? 'Address' : 'முகவரி'} value={data.address} />
                <Field label={language === 'en' ? 'Taluk' : 'தாலுகா'} value={data.taluk} />
                <Field label={language === 'en' ? 'District' : 'மாவட்டம்'} value={rawData?.basic?.district} />
                <Field label={language === 'en' ? 'PIN Code' : 'அஞ்சல் குறியீடு'} value={data.pinCode} />
                <Field label={language === 'en' ? 'Mobile' : 'மொபைல்'} value={data.schoolMobile} />
                <Field label={language === 'en' ? 'WhatsApp' : 'வாட்ஸ்அப்'} value={data.schoolWhatsapp} />
                <Field label={language === 'en' ? 'Email' : 'மின்னஞ்சல்'} value={data.schoolEmail} />
              </div>

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Correspondent Details' : 'நிருபர் விவரங்கள்'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Name' : 'பெயர்'} value={`${data.correspondentTitle} ${data.correspondentName}`.trim()} />
                <Field label={language === 'en' ? 'Mobile' : 'மொபைல்'} value={data.correspondentMobile} />
                <Field label={language === 'en' ? 'WhatsApp' : 'வாட்ஸ்அப்'} value={data.correspondentWhatsapp} />
                <Field label={language === 'en' ? 'Email' : 'மின்னஞ்சல்'} value={data.correspondentEmail} />
              </div>

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Principal Details' : 'முதல்வர் விவரங்கள்'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Name' : 'பெயர்'} value={`${data.principalTitle} ${data.principalName}`.trim()} />
                <Field label={language === 'en' ? 'Mobile' : 'மொபைல்'} value={data.principalMobile} />
                <Field label={language === 'en' ? 'WhatsApp' : 'வாட்ஸ்அப்'} value={data.principalWhatsapp} />
                <Field label={language === 'en' ? 'Email' : 'மின்னஞ்சல்'} value={data.principalEmail} />
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Trust & Management */}
        <div className="bg-white rounded-xl border border-gray-200 mb-4 overflow-hidden">
          <SectionHeader num={2} icon={Building} title={language === 'en' ? 'Trust & Management' : 'அறக்கட்டளை & மேலாண்மை'} />
          {expandedSections.has(2) && (
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Trust / Organization' : 'அறக்கட்டளை / அமைப்பு'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Trust Name' : 'அறக்கட்டளை பெயர்'} value={data.trustName} />
                <Field label={language === 'en' ? 'Organization Type' : 'அமைப்பு வகை'} value={data.orgType} />
                <Field label={language === 'en' ? 'Registration Date' : 'பதிவு தேதி'} value={data.orgRegDate} />
                <Field label={language === 'en' ? 'Registration No.' : 'பதிவு எண்'} value={data.orgRegNumber} />
                <Field label={language === 'en' ? 'Renewal Details' : 'புதுப்பிப்பு விவரங்கள்'} value={data.orgRenewalDetails} />
              </div>
              {data.trustDocumentPath && (
                <div className="mt-3">
                  <DocLink label={language === 'en' ? 'Trust Document' : 'அறக்கட்டளை ஆவணம்'} path={data.trustDocumentPath} />
                </div>
              )}

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Chairman' : 'தலைவர்'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Name' : 'பெயர்'} value={`${data.chairmanTitle} ${data.chairmanName}`.trim()} />
                <Field label={language === 'en' ? 'Mobile' : 'மொபைல்'} value={data.chairmanMobile} />
                <Field label={language === 'en' ? 'Email' : 'மின்னஞ்சல்'} value={data.chairmanEmail} />
              </div>

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Secretary' : 'செயலாளர்'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Name' : 'பெயர்'} value={`${data.secretaryTitle} ${data.secretaryName}`.trim()} />
                <Field label={language === 'en' ? 'Mobile' : 'மொபைல்'} value={data.secretaryMobile} />
                <Field label={language === 'en' ? 'Email' : 'மின்னஞ்சல்'} value={data.secretaryEmail} />
              </div>

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Establishment & Recognition' : 'நிறுவனம் & அங்கீகாரம்'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Year of Establishment' : 'நிறுவப்பட்ட ஆண்டு'} value={data.establishmentYear} />
                <Field label={language === 'en' ? 'Classes at Establishment' : 'நிறுவப்பட்டபோது வகுப்புகள்'} value={data.establishmentClasses} />
                <Field label={language === 'en' ? 'Opening Order No.' : 'தொடக்க ஆணை எண்'} value={data.openingOrderNo} />
                <Field label={language === 'en' ? 'RC No.' : 'RC எண்'} value={data.rcNo} />
                <Field label={language === 'en' ? 'RC Date' : 'RC தேதி'} value={data.openingOrderDate} />
                <Field label={language === 'en' ? 'Classes From' : 'வகுப்பு முதல்'} value={data.classesFunctioningFrom} />
                <Field label={language === 'en' ? 'Classes To' : 'வகுப்பு வரை'} value={data.classesFunctioningTo} />
                <Field label={language === 'en' ? 'First Board Exam (10th)' : 'முதல் போர்டு தேர்வு (10வது)'} value={data.firstBoardExam10th} />
                <Field label={language === 'en' ? 'First Board Exam (12th)' : 'முதல் போர்டு தேர்வு (12வது)'} value={data.firstBoardExam12th} />
                <Field label={language === 'en' ? 'PTA Formed' : 'PTA உருவாக்கப்பட்டதா'} value={data.ptaFormed} />
                <Field label={language === 'en' ? 'PTA Affiliation Details' : 'PTA இணைப்பு விவரங்கள்'} value={data.ptaAffiliationDetails} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.additionalClassesOrderPath && <DocLink label={language === 'en' ? 'Additional Classes Order' : 'கூடுதல் வகுப்புகள் ஆணை'} path={data.additionalClassesOrderPath} />}
                {data.latestRenewalOrderPath && <DocLink label={language === 'en' ? 'Latest Renewal Order' : 'சமீபத்திய புதுப்பிப்பு ஆணை'} path={data.latestRenewalOrderPath} />}
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Staff & Students */}
        <div className="bg-white rounded-xl border border-gray-200 mb-4 overflow-hidden">
          <SectionHeader num={3} icon={Users} title={language === 'en' ? 'Staff & Students' : 'ஊழியர்கள் & மாணவர்கள்'} />
          {expandedSections.has(3) && (
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Teaching Staff' : 'கற்பிக்கும் ஊழியர்கள்'}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1">
                <Field label="PG" value={data.teachingPG} />
                <Field label="UG" value={data.teachingUG} />
                <Field label="SGT" value={data.teachingSGT} />
                <Field label="BEd" value={data.teachingBEd} />
                <Field label="MEd" value={data.teachingMEd} />
                <Field label="TET (BEd)" value={data.teachingTETBEd} />
                <Field label="TET (SGT)" value={data.teachingTETSecondary} />
              </div>

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Supporting Staff' : 'துணை ஊழியர்கள்'}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Office Staff' : 'அலுவலக ஊழியர்கள்'} value={data.supportOfficeStaff} />
                <Field label={language === 'en' ? 'Accountants' : 'கணக்காளர்கள்'} value={data.supportAccountants} />
                <Field label={language === 'en' ? 'Library' : 'நூலகம்'} value={data.supportLibrary} />
                <Field label={language === 'en' ? 'Drawing' : 'ஓவியம்'} value={data.supportDrawing} />
                <Field label="PET" value={data.supportPET} />
                <Field label={language === 'en' ? 'Others' : 'மற்றவை'} value={data.supportOthers} />
              </div>

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Non-Teaching Staff' : 'கற்பிக்காத ஊழியர்கள்'}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1">
                <Field label="OA" value={data.nonTeachingOA} />
                <Field label={language === 'en' ? 'Drivers/Helpers' : 'ஓட்டுநர்/உதவியாளர்கள்'} value={data.nonTeachingDrivers} />
                <Field label={language === 'en' ? 'Watchman' : 'காவலாளி'} value={data.nonTeachingWatchman} />
                <Field label="Aaya" value={data.nonTeachingAaya} />
                <Field label={language === 'en' ? 'Sweepers' : 'துப்புரவாளர்'} value={data.nonTeachingSweepers} />
                <Field label={language === 'en' ? 'Others' : 'மற்றவை'} value={data.nonTeachingOthers} />
              </div>

              {data.classStrength && Object.keys(data.classStrength).length > 0 && (
                <>
                  <hr className="my-4" />
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Class-wise Student Strength' : 'வகுப்புவாரி மாணவர் எண்ணிக்கை'}</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">{language === 'en' ? 'Class' : 'வகுப்பு'}</th>
                          <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">{language === 'en' ? 'Boys' : 'ஆண்'}</th>
                          <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">{language === 'en' ? 'Girls' : 'பெண்'}</th>
                          <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">RTE</th>
                          <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">{language === 'en' ? 'Total' : 'மொத்தம்'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {Object.entries(data.classStrength).map(([cls, val]: [string, any]) => (
                          <tr key={cls}>
                            <td className="px-4 py-2 font-medium">{cls}</td>
                            <td className="px-4 py-2 text-right">{val.boys || 0}</td>
                            <td className="px-4 py-2 text-right">{val.girls || 0}</td>
                            <td className="px-4 py-2 text-right">{val.rte || 0}</td>
                            <td className="px-4 py-2 text-right font-semibold">{(val.boys || 0) + (val.girls || 0)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Section 4: Infrastructure */}
        <div className="bg-white rounded-xl border border-gray-200 mb-4 overflow-hidden">
          <SectionHeader num={4} icon={FileText} title={language === 'en' ? 'Infrastructure' : 'உள்கட்டமைப்பு'} />
          {expandedSections.has(4) && (
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Location & Land' : 'இடம் & நிலம்'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Location Type' : 'இட வகை'} value={data.locationType} />
                <Field label={language === 'en' ? 'Total Land (Acres)' : 'மொத்த நிலம் (ஏக்கர்)'} value={data.landAcres} />
                <Field label={language === 'en' ? 'Total Land (Sq.ft)' : 'மொத்த நிலம் (சதுரடி)'} value={data.landSqFt} />
                <Field label={language === 'en' ? 'Land Sufficient' : 'நிலம் போதுமானதா'} value={data.sufficientLand} />
                <Field label={language === 'en' ? 'Land Contiguous' : 'நிலம் தொடர்ச்சியானதா'} value={data.landContiguous} />
                <Field label={language === 'en' ? 'Ownership' : 'உரிமை'} value={data.landOwnership} />
                {data.leaseYears && <Field label={language === 'en' ? 'Lease Years' : 'குத்தகை ஆண்டுகள்'} value={data.leaseYears} />}
              </div>

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Buildings' : 'கட்டிடங்கள்'}</h4>
              <Field label={language === 'en' ? 'Number of Buildings' : 'கட்டிடங்களின் எண்ணிக்கை'} value={data.numberOfBuildings} />
              {data.buildings && data.buildings.filter((b: any) => b.yearOfConstruction || b.numberOfFloors).length > 0 && (
                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">#</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">{language === 'en' ? 'Year Built' : 'கட்டிய ஆண்டு'}</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">{language === 'en' ? 'Floors' : 'தளங்கள்'}</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">{language === 'en' ? 'Plan Approved' : 'திட்டம் அங்கீகரிக்கப்பட்டதா'}</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">{language === 'en' ? 'Document' : 'ஆவணம்'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data.buildings.filter((b: any) => b.yearOfConstruction || b.numberOfFloors).map((building: any, idx: number) => (
                        <tr key={idx}>
                          <td className="px-4 py-2">{idx + 1}</td>
                          <td className="px-4 py-2">{building.yearOfConstruction || '-'}</td>
                          <td className="px-4 py-2">{building.numberOfFloors || '-'}</td>
                          <td className="px-4 py-2">{building.planApproved || '-'}</td>
                          <td className="px-4 py-2">
                            {building.approvalOrderCopyPath && <DocLink label="Order Copy" path={building.approvalOrderCopyPath} />}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Facilities' : 'வசதிகள்'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Adequate Classrooms' : 'போதுமான வகுப்பறைகள்'} value={data.adequateClassrooms} />
                <Field label={language === 'en' ? 'Classroom Size (Sq.ft)' : 'வகுப்பறை அளவு (சதுரடி)'} value={data.classroomSize} />
                <Field label={language === 'en' ? 'Boys Toilets' : 'ஆண் கழிவறைகள்'} value={data.toiletsBoys} />
                <Field label={language === 'en' ? 'Girls Toilets' : 'பெண் கழிவறைகள்'} value={data.toiletsGirls} />
                <Field label={language === 'en' ? 'Separate Toilets' : 'தனி கழிவறைகள்'} value={data.separateToilets} />
                <Field label={language === 'en' ? 'Drinking Water Taps' : 'குடிநீர் குழாய்கள்'} value={data.drinkingWaterTaps} />
                <Field label={language === 'en' ? 'Hand Wash Taps' : 'கைகழுவும் குழாய்கள்'} value={data.handWashTaps} />
              </div>

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Certificates' : 'சான்றிதழ்கள்'}</h4>
              <div className="space-y-4">
                {/* Building Stability */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{language === 'en' ? 'Building Stability Certificate' : 'கட்டிட நிலைத்தன்மை சான்றிதழ்'}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                    <Field label={language === 'en' ? 'Certificate No.' : 'சான்றிதழ் எண்'} value={data.stabilityNo} />
                    <Field label={language === 'en' ? 'Date/Authority' : 'தேதி/அதிகாரம்'} value={data.stabilityDateAuthority} />
                    <Field label={language === 'en' ? 'Persons Accommodated' : 'நபர்கள்'} value={data.stabilityPersons} />
                  </div>
                  {data.stabilityDocumentPath && <div className="mt-2"><DocLink label={language === 'en' ? 'Stability Certificate' : 'நிலைத்தன்மை சான்றிதழ்'} path={data.stabilityDocumentPath} /></div>}
                </div>

                {/* Building License */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{language === 'en' ? 'Building License' : 'கட்டிட உரிமம்'}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                    <Field label={language === 'en' ? 'License No.' : 'உரிம எண்'} value={data.licenseNo} />
                    <Field label={language === 'en' ? 'Date/Authority' : 'தேதி/அதிகாரம்'} value={data.licenseDateAuthority} />
                    <Field label={language === 'en' ? 'Persons Accommodated' : 'நபர்கள்'} value={data.licensePersons} />
                  </div>
                  {data.licenseDocumentPath && <div className="mt-2"><DocLink label={language === 'en' ? 'Building License' : 'கட்டிட உரிமம்'} path={data.licenseDocumentPath} /></div>}
                </div>

                {/* Fire NOC */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{language === 'en' ? 'Fire NOC' : 'தீ NOC'}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                    <Field label={language === 'en' ? 'NOC No.' : 'NOC எண்'} value={data.fireNocNo} />
                    <Field label={language === 'en' ? 'Date/Authority' : 'தேதி/அதிகாரம்'} value={data.fireNocDateAuthority} />
                  </div>
                  {data.fireNocDocumentPath && <div className="mt-2"><DocLink label={language === 'en' ? 'Fire NOC' : 'தீ NOC'} path={data.fireNocDocumentPath} /></div>}
                </div>

                {/* Sanitary Certificate */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{language === 'en' ? 'Sanitary Certificate' : 'சுகாதார சான்றிதழ்'}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                    <Field label={language === 'en' ? 'Certificate No.' : 'சான்றிதழ் எண்'} value={data.sanitaryNo} />
                    <Field label={language === 'en' ? 'Date/Authority' : 'தேதி/அதிகாரம்'} value={data.sanitaryDateAuthority} />
                  </div>
                  {data.sanitaryDocumentPath && <div className="mt-2"><DocLink label={language === 'en' ? 'Sanitary Certificate' : 'சுகாதார சான்றிதழ்'} path={data.sanitaryDocumentPath} /></div>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 5: Fees & Others */}
        <div className="bg-white rounded-xl border border-gray-200 mb-4 overflow-hidden">
          <SectionHeader num={5} icon={CreditCard} title={language === 'en' ? 'Fees & Others' : 'கட்டணம் & மற்றவை'} />
          {expandedSections.has(5) && (
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Fees Fixation' : 'கட்டண நிர்ணயம்'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Fees Fixation Order' : 'கட்டண நிர்ணய ஆணை'} value={data.feesFixationOrder} />
                <Field label={language === 'en' ? 'PTA Consulted' : 'PTA கலந்தாலோசிக்கப்பட்டதா'} value={data.ptaConsulted} />
                <Field label={language === 'en' ? 'Consultation Details' : 'கலந்தாலோசனை விவரங்கள்'} value={data.ptaConsultationDetails} />
              </div>
              {data.feesFixationOrderPath && (
                <div className="mt-3">
                  <DocLink label={language === 'en' ? 'Fees Fixation Order' : 'கட்டண நிர்ணய ஆணை'} path={data.feesFixationOrderPath} />
                </div>
              )}

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'School Vehicles' : 'பள்ளி வாகனங்கள்'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Vans' : 'வேன்கள்'} value={data.vehiclesVan} />
                <Field label={language === 'en' ? 'Buses' : 'பேருந்துகள்'} value={data.vehiclesBus} />
                <Field label={language === 'en' ? 'Other Vehicles' : 'பிற வாகனங்கள்'} value={data.vehiclesOther} />
              </div>

              <hr className="my-4" />
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{language === 'en' ? 'Other Details' : 'பிற விவரங்கள்'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                <Field label={language === 'en' ? 'Health Care Center' : 'சுகாதார மையம்'} value={data.healthCareAvailable} />
                {data.healthCareDetails && <Field label={language === 'en' ? 'Health Care Details' : 'சுகாதார விவரங்கள்'} value={data.healthCareDetails} />}
                <Field label={language === 'en' ? 'Social Awareness Program' : 'சமூக விழிப்புணர்வு'} value={data.socialAwarenessProgram} />
                {data.socialAwarenessDetails && <Field label={language === 'en' ? 'Details' : 'விவரங்கள்'} value={data.socialAwarenessDetails} />}
                <Field label={language === 'en' ? 'Social Service Program' : 'சமூக சேவை'} value={data.socialServicesProgram} />
                {data.socialServicesDetails && <Field label={language === 'en' ? 'Details' : 'விவரங்கள்'} value={data.socialServicesDetails} />}
                <Field label={language === 'en' ? 'Salary via ECS' : 'ECS மூலம் சம்பளம்'} value={data.salaryECS} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolDetail;
