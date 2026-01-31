import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { School, CheckCircle, FileEdit, MapPin, ChevronLeft, ChevronRight, Loader2, Eye, Users, RefreshCw } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { getAdminSchools } from '../utils/api';
import { TAMIL_NADU_DISTRICTS } from '../utils/districts';
import { TranslationContent } from '../types';

interface AdminDashboardProps {
  t: TranslationContent;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ t }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const language = t.nav.home === 'Home' ? 'en' : 'ta';

  const [schools, setSchools] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Stats
  const [stats, setStats] = useState({ total: 0, submitted: 0, draft: 0 });

  const isSuperAdmin = user?.role === 'super_admin';

  const fetchSchools = async (page = 1, status = statusFilter, district = districtFilter) => {
    setLoading(true);
    const params: any = { page, limit: pageSize };
    if (status) params.status = status;
    if (district && isSuperAdmin) params.district = district;

    const response = await getAdminSchools(params);
    if (response.ok && response.data) {
      setSchools(response.data.schools || []);
      setTotal(response.data.total || 0);
    }
    setLoading(false);
  };

  // Fetch stats (all statuses) on mount
  const fetchStats = async () => {
    const [allRes, submittedRes, draftRes] = await Promise.all([
      getAdminSchools({ limit: 1 }),
      getAdminSchools({ status: 'SUBMITTED', limit: 1 }),
      getAdminSchools({ status: 'DRAFT', limit: 1 }),
    ]);
    setStats({
      total: allRes.data?.total || 0,
      submitted: submittedRes.data?.total || 0,
      draft: draftRes.data?.total || 0,
    });
  };

  useEffect(() => {
    fetchSchools(1);
    fetchStats();
  }, []);

  const handleFilterChange = (newStatus: string, newDistrict: string) => {
    setStatusFilter(newStatus);
    setDistrictFilter(newDistrict);
    setCurrentPage(1);
    fetchSchools(1, newStatus, newDistrict);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchSchools(page);
  };

  const totalPages = Math.ceil(total / pageSize);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">{language === 'en' ? 'Submitted' : 'சமர்ப்பிக்கப்பட்டது'}</span>;
      case 'DRAFT':
        return <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">{language === 'en' ? 'Draft' : 'வரைவு'}</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">{status || '-'}</span>;
    }
  };

  const statCards = [
    { label: language === 'en' ? 'Total Schools' : 'மொத்த பள்ளிகள்', value: stats.total, icon: School, color: 'bg-blue-50 text-blue-600', border: 'border-blue-200' },
    { label: language === 'en' ? 'Submitted' : 'சமர்ப்பிக்கப்பட்டது', value: stats.submitted, icon: CheckCircle, color: 'bg-green-50 text-green-600', border: 'border-green-200' },
    { label: language === 'en' ? 'Draft' : 'வரைவு', value: stats.draft, icon: FileEdit, color: 'bg-orange-50 text-orange-600', border: 'border-orange-200' },
    { label: language === 'en' ? 'Districts' : 'மாவட்டங்கள்', value: isSuperAdmin ? 38 : 1, icon: MapPin, color: 'bg-purple-50 text-purple-600', border: 'border-purple-200' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {language === 'en' ? 'Admin Dashboard' : 'நிர்வாக டாஷ்போர்டு'}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {user?.role === 'admin'
                ? `${language === 'en' ? 'District:' : 'மாவட்டம்:'} ${user?.district || '-'}`
                : (language === 'en' ? 'All Districts' : 'அனைத்து மாவட்டங்கள்')}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            {isSuperAdmin && (
              <Link
                to="/admin/users"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <Users size={16} />
                {language === 'en' ? 'Manage Users' : 'பயனர்களை நிர்வகி'}
              </Link>
            )}
            <button
              onClick={() => { fetchSchools(currentPage); fetchStats(); }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <RefreshCw size={16} />
              {language === 'en' ? 'Refresh' : 'புதுப்பி'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((card, i) => (
            <div key={i} className={`bg-white rounded-xl border ${card.border} p-5 flex items-center gap-4`}>
              <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}>
                <card.icon size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-xs text-gray-500 font-medium">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {isSuperAdmin && (
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                  {language === 'en' ? 'District' : 'மாவட்டம்'}
                </label>
                <select
                  value={districtFilter}
                  onChange={(e) => handleFilterChange(statusFilter, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-tn-green focus:border-transparent"
                >
                  <option value="">{language === 'en' ? 'All Districts' : 'அனைத்து மாவட்டங்கள்'}</option>
                  {TAMIL_NADU_DISTRICTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                {language === 'en' ? 'Status' : 'நிலை'}
              </label>
              <select
                value={statusFilter}
                onChange={(e) => handleFilterChange(e.target.value, districtFilter)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-tn-green focus:border-transparent"
              >
                <option value="">{language === 'en' ? 'All' : 'அனைத்தும்'}</option>
                <option value="SUBMITTED">{language === 'en' ? 'Submitted' : 'சமர்ப்பிக்கப்பட்டது'}</option>
                <option value="DRAFT">{language === 'en' ? 'Draft' : 'வரைவு'}</option>
              </select>
            </div>
            <div className="flex items-end">
              <p className="text-sm text-gray-500 py-2">
                {language === 'en' ? `${total} school(s) found` : `${total} பள்ளிகள் கண்டறியப்பட்டன`}
              </p>
            </div>
          </div>
        </div>

        {/* Schools Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-tn-green" />
            </div>
          ) : schools.length === 0 ? (
            <div className="text-center py-20">
              <School className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">{language === 'en' ? 'No schools found' : 'பள்ளிகள் எதுவும் இல்லை'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'School Name' : 'பள்ளி பெயர்'}
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Mobile' : 'மொபைல்'}
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'District' : 'மாவட்டம்'}
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Status' : 'நிலை'}
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Last Updated' : 'கடைசி புதுப்பிப்பு'}
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Action' : 'செயல்'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {schools.map((school, index) => (
                    <tr
                      key={school.school_mobile_no}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/schools/${school.school_mobile_no}`)}
                    >
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {(currentPage - 1) * pageSize + index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{school.school_name || '-'}</p>
                          {school.school_code && (
                            <p className="text-xs text-gray-500">{school.school_code}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        {school.school_mobile_no}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {school.district || '-'}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(school.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(school.updated_at)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/schools/${school.school_mobile_no}`);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-tn-green border border-tn-green rounded-lg hover:bg-tn-green hover:text-white transition-all text-xs font-semibold"
                        >
                          <Eye size={14} />
                          {language === 'en' ? 'View' : 'காண்க'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-500">
                {language === 'en'
                  ? `Page ${currentPage} of ${totalPages}`
                  : `பக்கம் ${currentPage} / ${totalPages}`}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page: number;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-tn-green text-white'
                          : 'border border-gray-300 hover:bg-white'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
