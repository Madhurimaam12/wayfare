import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  User,
  Mail,
  Phone,
  Hash,
  Building,
  Shield,
  Edit3,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

const ProfilePage = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  // Load user data into form
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.put(`/users/${user.id}`, formData);

      // Update localStorage with new user data
      const updatedUser = { ...user, ...response.data.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Force re-render
      window.location.reload();

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
    });
    setIsEditing(false);
    setError('');
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { bg: 'bg-slate-100', text: 'text-slate-800', label: 'Admin' },
      manager: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Manager' },
      finance_officer: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Finance Officer' },
      travel_coordinator: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Travel Coordinator' },
      employee: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Employee' },
    };
    return badges[role] || badges.employee;
  };

  const roleBadge = getRoleBadge(user?.role);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">My Profile</h1>
        <p className="text-gray-500">View and manage your account information</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-800 font-medium">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-sm text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 mb-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"></div>

        <div className="relative flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-white text-4xl font-bold">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-1">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-blue-100 mb-3">{user?.email}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${roleBadge.bg} ${roleBadge.text}`}>
              {roleBadge.label}
            </span>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Personal Information</h3>
            <p className="text-sm text-gray-500">Your account details</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Card Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-colors ${
                    isEditing
                      ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-colors ${
                    isEditing
                      ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-50 text-gray-500 rounded-xl cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="+1 234 567 8900"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-colors ${
                  isEditing
                    ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
                    : 'border-gray-200 bg-gray-50 text-gray-600'
                }`}
              />
            </div>
          </div>

          {/* Read-only fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID
              </label>
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <Hash className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 font-medium">{user?.employeeId || 'N/A'}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 font-medium">
                  {user?.departmentId?.name || 'Not Assigned'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 font-medium capitalize">
                  {user?.role?.replace('_', ' ') || 'Employee'}
                </span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Account Info Card */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Account Status</span>
            <span className="flex items-center gap-2 font-medium text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Active
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Member Since</span>
            <span className="font-medium text-gray-900">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;