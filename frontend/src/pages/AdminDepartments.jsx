import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Building,
  ArrowLeft,
  Search,
  Plus,
  Users,
  Edit3,
  Trash2,
  X,
  Loader,
  DollarSign,
  UserCheck
} from 'lucide-react';

const AdminDepartments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  });

  // Demo data
  const demoDepartments = [
    { _id: 'd1', name: 'Engineering', code: 'ENG', description: 'Software Engineering Department', employeeCount: 45, budget: 500000, isActive: true },
    { _id: 'd2', name: 'Sales', code: 'SALES', description: 'Sales and Business Development', employeeCount: 32, budget: 300000, isActive: true },
    { _id: 'd3', name: 'Finance', code: 'FIN', description: 'Finance and Accounting', employeeCount: 18, budget: 200000, isActive: true },
    { _id: 'd4', name: 'Human Resources', code: 'HR', description: 'Human Resources', employeeCount: 12, budget: 150000, isActive: true },
    { _id: 'd5', name: 'Marketing', code: 'MKT', description: 'Marketing and Communications', employeeCount: 25, budget: 280000, isActive: true },
  ];

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/departments');
      const data = response.data.data || [];
      setDepartments(data.length > 0 ? data : demoDepartments);
    } catch (err) {
      setDepartments(demoDepartments);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await api.post('/departments', formData);
      await fetchDepartments();
      setShowModal(false);
      setFormData({ name: '', code: '', description: '' });
    } catch (err) {
      // Demo mode
      const newDept = {
        _id: `d${Date.now()}`,
        ...formData,
        code: formData.code.toUpperCase(),
        employeeCount: 0,
        budget: 0,
        isActive: true,
      };
      setDepartments([...departments, newDept]);
      setShowModal(false);
      setFormData({ name: '', code: '', description: '' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    setDepartments(departments.filter(d => d._id !== id));
  };

  const filtered = departments.filter(d => {
    const search = searchTerm.toLowerCase();
    return (
      d.name?.toLowerCase().includes(search) ||
      d.code?.toLowerCase().includes(search) ||
      d.description?.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-slate-700" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-gray-900 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Departments</h1>
              <p className="text-gray-500 text-sm">{departments.length} departments in the organization</p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Department
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Departments</p>
          <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Employees</p>
          <p className="text-2xl font-bold text-blue-600">
            {departments.reduce((s, d) => s + (d.employeeCount || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Budget</p>
          <p className="text-2xl font-bold text-emerald-600">
            ${(departments.reduce((s, d) => s + (d.budget || 0), 0) / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {departments.filter(d => d.isActive).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dept) => (
          <div key={dept._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-gray-900 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                {dept.code}
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(dept._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 text-lg mb-1">{dept.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{dept.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <Users className="w-4 h-4" />
                  Employees
                </span>
                <span className="font-medium text-gray-900">{dept.employeeCount || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <DollarSign className="w-4 h-4" />
                  Budget
                </span>
                <span className="font-medium text-gray-900">
                  ${((dept.budget || 0) / 1000).toFixed(0)}K
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                dept.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {dept.isActive ? 'Active' : 'Inactive'}
              </span>
              <button className="text-sm text-slate-700 hover:text-slate-900 font-medium">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add Department</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Engineering"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., ENG"
                  maxLength={10}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 uppercase"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description..."
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-slate-700 to-gray-900 text-white rounded-xl hover:shadow-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDepartments;