import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showExportMenu } from '../utils/exportUtils';
import api from '../services/api';
import {
  TrendingUp,
  ArrowLeft,
  DollarSign,
  Receipt,
  Users,
  AlertCircle,
  BarChart3,
  PieChart,
  Download,
  Loader,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const FinanceAnalytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [timeRange, setTimeRange] = useState('month');

  // Demo data
  const demoExpenses = [
    { _id: '1', category: 'accommodation', amount: 750, status: 'approved', date: '2026-09-15', employeeId: { firstName: 'John', lastName: 'Doe' } },
    { _id: '2', category: 'meals', amount: 125, status: 'approved', date: '2026-09-16', employeeId: { firstName: 'Jane', lastName: 'Smith' } },
    { _id: '3', category: 'transport', amount: 95, status: 'approved', date: '2026-09-17', employeeId: { firstName: 'Bob', lastName: 'Wilson' } },
    { _id: '4', category: 'accommodation', amount: 1200, status: 'submitted', date: '2026-09-20', employeeId: { firstName: 'Alice', lastName: 'Brown' } },
    { _id: '5', category: 'meals', amount: 45, status: 'rejected', date: '2026-09-19', employeeId: { firstName: 'Chris', lastName: 'Davis' } },
    { _id: '6', category: 'transport', amount: 380, status: 'approved', date: '2026-09-21', employeeId: { firstName: 'John', lastName: 'Doe' } },
    { _id: '7', category: 'accommodation', amount: 890, status: 'approved', date: '2026-09-22', employeeId: { firstName: 'Jane', lastName: 'Smith' } },
    { _id: '8', category: 'miscellaneous', amount: 60, status: 'submitted', date: '2026-09-23', employeeId: { firstName: 'Bob', lastName: 'Wilson' } },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/expenses/pending').catch(() => ({ data: { data: [] } }));
      const data = response.data.data || [];
      setExpenses(data.length > 0 ? data : demoExpenses);
    } catch (err) {
      setExpenses(demoExpenses);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  // Stats
  const totalSpend = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const approved = expenses.filter(e => e.status === 'approved');
  const pending = expenses.filter(e => e.status === 'submitted');
  const rejected = expenses.filter(e => e.status === 'rejected');
  const approvedAmount = approved.reduce((s, e) => s + (e.amount || 0), 0);
  const pendingAmount = pending.reduce((s, e) => s + (e.amount || 0), 0);
  const approvalRate = expenses.length > 0 ? Math.round((approved.length / expenses.length) * 100) : 0;

  // Category breakdown
  const categories = ['accommodation', 'meals', 'transport', 'miscellaneous'];
  const categoryData = categories.map(cat => ({
    name: cat,
    amount: expenses.filter(e => e.category === cat).reduce((s, e) => s + (e.amount || 0), 0),
    count: expenses.filter(e => e.category === cat).length,
  })).filter(c => c.amount > 0);

  const maxCategoryAmount = Math.max(...categoryData.map(c => c.amount), 1);
  const totalCategoryAmount = categoryData.reduce((s, c) => s + c.amount, 0);

  const categoryColors = {
    accommodation: 'from-blue-500 to-cyan-500',
    meals: 'from-orange-500 to-amber-500',
    transport: 'from-purple-500 to-pink-500',
    miscellaneous: 'from-gray-500 to-slate-500',
  };

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
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-500 text-sm">Financial insights and trends</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button
  onClick={() => showExportMenu(
    expenses,
    'finance-analytics',
    [
      { key: 'employeeId', label: 'Employee' },
      { key: 'category', label: 'Category' },
      { key: 'amount', label: 'Amount (USD)' },
      { key: 'status', label: 'Status' },
      { key: 'date', label: 'Date' },
    ],
    'Finance Analytics Report'
  )}
  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-sm font-medium"
>
  <Download className="w-4 h-4" />
  Export
</button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Spend</p>
          <p className="text-3xl font-bold text-gray-900">${totalSpend.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{expenses.length} expenses</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-600">${approvedAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{approved.length} approved</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{pending.length} pending</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Approval Rate</p>
          <p className="text-3xl font-bold text-blue-600">{approvalRate}%</p>
          <p className="text-xs text-gray-400 mt-1">Overall</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Spending by Category</h3>
              <p className="text-sm text-gray-500">Total: ${totalCategoryAmount.toLocaleString()}</p>
            </div>
            <PieChart className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="space-y-5">
            {categoryData.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-400">({cat.count})</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    ${cat.amount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${categoryColors[cat.name] || 'from-gray-500 to-gray-600'} transition-all duration-500`}
                    style={{ width: `${(cat.amount / maxCategoryAmount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Status Breakdown</h3>
              <p className="text-sm text-gray-500">By expense status</p>
            </div>
            <BarChart3 className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="space-y-4">
            {/* Approved */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Approved</span>
                  <span className="text-sm font-bold text-green-600">{approved.length}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${expenses.length > 0 ? (approved.length / expenses.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Pending</span>
                  <span className="text-sm font-bold text-yellow-600">{pending.length}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${expenses.length > 0 ? (pending.length / expenses.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Rejected */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Rejected</span>
                  <span className="text-sm font-bold text-red-600">{rejected.length}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${expenses.length > 0 ? (rejected.length / expenses.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Spenders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Top Spenders</h3>
            <p className="text-sm text-gray-500">By total expense amount</p>
          </div>
          <Users className="w-5 h-5 text-emerald-600" />
        </div>

        <div className="space-y-3">
          {Object.entries(
            expenses.reduce((acc, e) => {
              const name = `${e.employeeId?.firstName || 'Unknown'} ${e.employeeId?.lastName || ''}`.trim();
              if (!acc[name]) acc[name] = 0;
              acc[name] += e.amount || 0;
              return acc;
            }, {})
          )
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, amount], idx) => (
              <div key={name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
                  idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-amber-700' : 'bg-gray-300'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{name}</p>
                </div>
                <p className="font-bold text-gray-900">${amount.toLocaleString()}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceAnalytics;