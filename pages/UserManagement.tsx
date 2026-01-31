import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, Loader2, Users, Shield, MapPin, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { getAdminUsers, createAdminUser, updateAdminUser } from '../utils/api';
import { TAMIL_NADU_DISTRICTS } from '../utils/districts';
import { TranslationContent } from '../types';

interface UserManagementProps {
  t: TranslationContent;
}

const UserManagement: React.FC<UserManagementProps> = ({ t }) => {
  const language = t.nav.home === 'Home' ? 'en' : 'ta';

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form state
  const [form, setForm] = useState({
    mobile: '',
    password: '',
    name: '',
    role: 'admin',
    district: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await getAdminUsers();
    if (response.ok && response.data) {
      setUsers(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const resetForm = () => {
    setForm({ mobile: '', password: '', name: '', role: 'admin', district: '' });
    setEditingUser(null);
    setError('');
    setShowPassword(false);
  };

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (user: any) => {
    setEditingUser(user);
    setForm({
      mobile: user.mobile,
      password: '',
      name: user.name,
      role: user.role,
      district: user.district || '',
    });
    setError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSave = async () => {
    setError('');

    // Validation
    if (!editingUser) {
      if (!form.mobile || !/^\d{10}$/.test(form.mobile)) {
        setError(language === 'en' ? 'Enter a valid 10-digit mobile number' : 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்');
        return;
      }
      if (!form.password || form.password.length < 6) {
        setError(language === 'en' ? 'Password must be at least 6 characters' : 'கடவுச்சொல் குறைந்தது 6 எழுத்துகள்');
        return;
      }
    }
    if (!form.name.trim()) {
      setError(language === 'en' ? 'Name is required' : 'பெயர் தேவை');
      return;
    }
    if (form.role === 'admin' && !form.district) {
      setError(language === 'en' ? 'District is required for admin role' : 'நிர்வாக பணிக்கு மாவட்டம் தேவை');
      return;
    }

    setSaving(true);

    if (editingUser) {
      const updateData: any = {
        id: editingUser.id,
        name: form.name,
        role: form.role,
        district: form.role === 'admin' ? form.district : null,
      };
      if (form.password) updateData.password = form.password;

      const response = await updateAdminUser(updateData);
      if (response.ok) {
        setSuccessMsg(language === 'en' ? 'User updated successfully' : 'பயனர் வெற்றிகரமாக புதுப்பிக்கப்பட்டார்');
        closeModal();
        fetchUsers();
      } else {
        setError(response.error || 'Failed to update');
      }
    } else {
      const response = await createAdminUser({
        mobile: form.mobile,
        password: form.password,
        name: form.name,
        role: form.role,
        district: form.role === 'admin' ? form.district : undefined,
      });
      if (response.ok) {
        setSuccessMsg(language === 'en' ? 'User created successfully' : 'பயனர் வெற்றிகரமாக உருவாக்கப்பட்டார்');
        closeModal();
        fetchUsers();
      } else {
        setError(response.error || 'Failed to create');
      }
    }
    setSaving(false);
  };

  const handleToggleActive = async (user: any) => {
    const response = await updateAdminUser({
      id: user.id,
      is_active: !user.is_active,
    });
    if (response.ok) {
      fetchUsers();
    }
  };

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">Super Admin</span>;
      case 'admin':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Admin</span>;
      default:
        return <span className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">User</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {language === 'en' ? 'User Management' : 'பயனர் மேலாண்மை'}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {language === 'en' ? 'Manage admin users and district officers' : 'நிர்வாக பயனர்கள் மற்றும் மாவட்ட அதிகாரிகளை நிர்வகிக்கவும்'}
              </p>
            </div>
            <button
              onClick={openCreate}
              className="mt-4 md:mt-0 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-tn-green to-tn-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
            >
              <Plus size={18} />
              {language === 'en' ? 'Add User' : 'பயனரைச் சேர்'}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 text-sm">
            <Check size={16} />
            {successMsg}
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-tn-green" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">{language === 'en' ? 'No users found' : 'பயனர்கள் இல்லை'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{language === 'en' ? 'Name' : 'பெயர்'}</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{language === 'en' ? 'Mobile' : 'மொபைல்'}</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{language === 'en' ? 'Role' : 'பணி'}</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{language === 'en' ? 'District' : 'மாவட்டம்'}</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{language === 'en' ? 'Status' : 'நிலை'}</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{language === 'en' ? 'Actions' : 'செயல்கள்'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{user.mobile}</td>
                      <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.district ? (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-gray-400" />
                            {user.district}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4">
                        {user.is_active ? (
                          <span className="flex items-center gap-1.5 text-green-700 text-xs font-semibold">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            {language === 'en' ? 'Active' : 'செயலில்'}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-red-700 text-xs font-semibold">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            {language === 'en' ? 'Inactive' : 'செயலற்றது'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.role !== 'super_admin' && (
                            <>
                              <button
                                onClick={() => openEdit(user)}
                                className="px-3 py-1.5 text-xs font-semibold text-tn-green border border-tn-green rounded-lg hover:bg-tn-green hover:text-white transition-all"
                              >
                                {language === 'en' ? 'Edit' : 'திருத்து'}
                              </button>
                              <button
                                onClick={() => handleToggleActive(user)}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                  user.is_active
                                    ? 'text-red-600 border border-red-300 hover:bg-red-50'
                                    : 'text-green-600 border border-green-300 hover:bg-green-50'
                                }`}
                              >
                                {user.is_active
                                  ? (language === 'en' ? 'Deactivate' : 'செயலிழக்கச்செய்')
                                  : (language === 'en' ? 'Activate' : 'செயல்படுத்து')}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                {editingUser
                  ? (language === 'en' ? 'Edit User' : 'பயனரைத் திருத்து')
                  : (language === 'en' ? 'Add New User' : 'புதிய பயனரைச் சேர்')}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {language === 'en' ? 'Mobile Number' : 'மொபைல் எண்'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+91</span>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    disabled={!!editingUser}
                    maxLength={10}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent text-sm disabled:bg-gray-100"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {language === 'en' ? 'Password' : 'கடவுச்சொல்'}
                  {!editingUser && <span className="text-red-500"> *</span>}
                  {editingUser && <span className="text-gray-400 text-xs font-normal ml-1">({language === 'en' ? 'leave blank to keep current' : 'தற்போதையதை வைத்திருக்க காலியாக விடவும்'})</span>}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {language === 'en' ? 'Name' : 'பெயர்'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent text-sm"
                  placeholder={language === 'en' ? 'Full name' : 'முழு பெயர்'}
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {language === 'en' ? 'Role' : 'பணி'} <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent text-sm"
                >
                  <option value="admin">{language === 'en' ? 'Admin (District Officer)' : 'நிர்வாகி (மாவட்ட அதிகாரி)'}</option>
                  <option value="user">{language === 'en' ? 'User' : 'பயனர்'}</option>
                </select>
              </div>

              {/* District (for admin role) */}
              {form.role === 'admin' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {language === 'en' ? 'District' : 'மாவட்டம்'} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent text-sm"
                  >
                    <option value="">{language === 'en' ? 'Select District' : 'மாவட்டத்தைத் தேர்ந்தெடு'}</option>
                    {TAMIL_NADU_DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                {language === 'en' ? 'Cancel' : 'ரத்து'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 bg-gradient-to-r from-tn-green to-tn-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {language === 'en' ? 'Saving...' : 'சேமிக்கிறது...'}
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    {editingUser
                      ? (language === 'en' ? 'Update User' : 'பயனரைப் புதுப்பி')
                      : (language === 'en' ? 'Create User' : 'பயனரை உருவாக்கு')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
