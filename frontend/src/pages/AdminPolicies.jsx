import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Shield,
  ArrowLeft,
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  Loader,
  DollarSign,
  Hotel,
  Car,
  Utensils,
  CreditCard,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AdminPolicies = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'accommodation',
    description: '',
    limits: { min: 0, max: 250, currency: 'USD' },
  });

  const demoPolicies = [
    { _id: 'p1', name: 'Domestic Accommodation', code: 'DOM-ACC', type: 'accommodation', description: 'Standard accommodation for domestic travel', limits: { max: 250, currency: 'USD' }, isActive: true },
    { _id: 'p2', name: 'International Accommodation', code: 'INT-ACC', type: 'accommodation', description: 'Accommodation for international travel', limits: { max: 500, currency: 'USD' }, isActive: true },
    { _id: 'p3', name: 'Meal Allowance', code: 'MEAL-ALLOW', type: 'meals', description: 'Daily meal allowance', limits: { max: 75, currency: 'USD' }, isActive: true },
    { _id: 'p4', name: 'Transport Policy', code: 'TRANS-POL', type: 'transport', description: 'Flights and ground transport', limits: { max: 1000, currency: 'USD' }, isActive: true },
    { _id: 'p5', name: 'Advance Payment', code: 'ADV-POL', type: 'advance', description: 'Advance travel payments', limits: { max: 2000, currency: 'USD' }, isActive: true },
  ];

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const response = await api.get('/policies');
      const data = response.data.data || [];
      setPolicies(data.length > 0 ? data : demoPolicies);
    } catch (err) {
      setPolicies(demoPolicies);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/policies', formData);
      await fetchPolicies();
      setShowModal(false);
      resetForm();
    } catch (err) {
      // Demo mode
      const newPolicy = {
        _id: `p${Date.now()}`,
        ...formData,
        code: formData.code.toUpperCase(),
        isActive: true,
      };
      setPolicies([...policies, newPolicy]);
      setShowModal(false);
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      type: 'accommodation',
      description: '',
      limits: { min: 0, max: 250, currency: 'USD' },
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this policy?')) return;
    setPolicies(policies.filter(p => p._id !== id));
  };

  const getTypeIcon = (type) => {
    const icons = {
      accommodation: Hotel,
      transport: Car,
      meals: Utensils,
      advance: CreditCard,
      general: Shield,
    };
    return icons[type] || Shield;
  };

  const getTypeColor = (type) => {
    const colors = {
      accommodation: 'from-blue-500 to-cyan-500',
      transport: 'from-purple-500 to-pink-500',
      meals: 'from-orange-500 to-amber-500',
      advance: 'from-emerald-500 to-green-500',
      general: 'from-gray-500 to-slate-500',
    };
    return colors[type] || colors.general;
  };

  const filtered = policies.filter(p => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = p.name?.toLowerCase().includes(search) ||
                          p.code?.toLowerCase().includes(search) ||
                          p.description?.toLowerCase().includes(search);
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    return matchesSearch && matchesType;
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Travel Policies</h1>
              <p className="text-gray-500 text-sm">{policies.length} active policies</p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Policy
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="all">All Types</option>
            <option value="accommodation">Accommodation</option>
            <option value="transport">Transport</option>
            <option value="meals">Meals</option>
            <option value="advance">Advance</option>
          </select>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((policy) => {
          const TypeIcon = getTypeIcon(policy.type);
          return (
            <div key={policy._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getTypeColor(policy.type)} text-white`}>
                  <TypeIcon className="w-7 h-7" />
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(policy._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-gray-900 text-lg">{policy.name}</h3>
              </div>
              <p className="text-xs text-gray-500 mb-2 font-mono">{policy.code}</p>
              <p className="text-sm text-gray-600 mb-4">{policy.description}</p>

              <div className="p-3 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl mb-4">
                <p className="text-xs text-gray-500 mb-1">Limit</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${policy.limits?.max?.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    {policy.limits?.currency || 'USD'}
                  </span>
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  policy.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {policy.isActive ? 'Active' : 'Inactive'}
                </span>
                <button className="text-sm text-slate-700 hover:text-slate-900 font-medium">
                  Edit Policy →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add Policy</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Policy Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Domestic Accommodation"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="DOM-ACC"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    <option value="accommodation">Accommodation</option>
                    <option value="transport">Transport</option>
                    <option value="meals">Meals</option>
                    <option value="advance">Advance</option>
                    <option value="general">General</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Policy description..."
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount ($)</label>
                  <input
                    type="number"
                    value={formData.limits.min}
                    onChange={(e) => setFormData({ ...formData, limits: { ...formData.limits, min: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount ($)</label>
                  <input
                    type="number"
                    value={formData.limits.max}
                    onChange={(e) => setFormData({ ...formData, limits: { ...formData.limits, max: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>
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
                  Add Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPolicies;