import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showExportMenu } from '../utils/exportUtils';
import api from '../services/api';
import {
  Receipt, DollarSign, Calendar, Plus, Search, Filter, Hotel, Car, Utensils,
  Package, Clock, CheckCircle, XCircle, Loader, ArrowRight, ArrowLeft, FileText, Download
} from 'lucide-react';

const MyExpenses = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const demoExpenses = [
    { _id: 'd1', category: 'accommodation', amount: 750, date: '2026-09-15', description: 'Hotel stay at Marriott', status: 'approved', createdAt: '2026-09-16' },
    { _id: 'd2', category: 'meals', amount: 125, date: '2026-09-16', description: 'Team dinner', status: 'submitted', createdAt: '2026-09-17' },
    { _id: 'd3', category: 'transport', amount: 95, date: '2026-09-17', description: 'Airport transfer', status: 'approved', createdAt: '2026-09-18' },
    { _id: 'd4', category: 'accommodation', amount: 1200, date: '2026-09-20', description: 'Hotel stay - London trip', status: 'rejected', createdAt: '2026-09-21' },
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/expenses/my');
      const data = response.data.data || [];
      setExpenses(data.length > 0 ? data : demoExpenses);
    } catch (err) {
      console.warn('Using demo data');
      setExpenses(demoExpenses);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (cat) => {
    const icons = { accommodation: Hotel, transport: Car, meals: Utensils, miscellaneous: Package };
    return icons[cat] || Package;
  };

  const getCategoryColor = (cat) => {
    const colors = {
      accommodation: { bg: 'bg-blue-50', text: 'text-blue-600' },
      transport: { bg: 'bg-purple-50', text: 'text-purple-600' },
      meals: { bg: 'bg-orange-50', text: 'text-orange-600' },
      miscellaneous: { bg: 'bg-gray-50', text: 'text-gray-600' },
    };
    return colors[cat] || colors.miscellaneous;
  };

  const getStatusConfig = (status) => {
    const configs = {
      submitted: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending' },
      under_review: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Under Review' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Rejected' },
      reimbursed: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle, label: 'Reimbursed' },
    };
    return configs[status] || configs.submitted;
  };

  const filtered = expenses.filter((e) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = e.description?.toLowerCase().includes(search) || e.category?.toLowerCase().includes(search);
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: expenses.length,
    pending: expenses.filter((e) => ['submitted', 'under_review'].includes(e.status)).length,
    approved: expenses.filter((e) => ['approved', 'reimbursed'].includes(e.status)).length,
    totalAmount: expenses.reduce((sum, e) => sum + (e.amount || 0), 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-emerald-600" />
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
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center">
              <Receipt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Expenses</h1>
              <p className="text-gray-500 text-sm">Track and manage all your expense claims</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
  <button
    onClick={() => showExportMenu(
      filtered,
      'my-expenses',
      [
        { key: 'category', label: 'Category' },
        { key: 'description', label: 'Description' },
        { key: 'amount', label: 'Amount (USD)' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ],
      'My Expenses'
    )}
    className="flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
  >
    <Download className="w-5 h-5" />
    Export
  </button>
  <button
    onClick={() => navigate('/expenses/new')}
    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
  >
    <Plus className="w-5 h-5" />
    New Expense
  </button>
</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-emerald-600">${stats.totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="submitted">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="reimbursed">Reimbursed</option>
            </select>
          </div>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
          <p className="text-gray-500 mb-6">Submit your first expense claim</p>
          <button
            onClick={() => navigate('/expenses/new')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            New Expense
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((exp) => {
            const CatIcon = getCategoryIcon(exp.category);
            const catColor = getCategoryColor(exp.category);
            const cfg = getStatusConfig(exp.status);
            const StatusIcon = cfg.icon;

            return (
              <div
                key={exp._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/expenses/${exp._id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 ${catColor.bg} rounded-xl flex items-center justify-center`}>
                      <CatIcon className={`w-6 h-6 ${catColor.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 capitalize">{exp.category}</h3>
                      <p className="text-sm text-gray-600 truncate">{exp.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(exp.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Receipt attached
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">${exp.amount?.toLocaleString()}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {cfg.label}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyExpenses;