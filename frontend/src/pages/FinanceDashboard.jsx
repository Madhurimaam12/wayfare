import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Receipt,
  CheckCircle,
  XCircle,
  DollarSign,
  AlertCircle,
  TrendingUp,
  FileText,
  ArrowRight
} from 'lucide-react';

const FinanceDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Pending Expenses', value: '12', change: 'Need review', Icon: Receipt, bg: 'bg-amber-50', text: 'text-amber-600' },
    { label: 'Approved This Week', value: '8', change: '+2 vs last week', Icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Total Pending', value: '$4,250', change: 'Awaiting approval', Icon: DollarSign, bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Policy Violations', value: '3', change: 'Need attention', Icon: AlertCircle, bg: 'bg-red-50', text: 'text-red-600' },
  ];

  const pendingExpenses = [
    { id: 1, employee: 'John Doe', category: 'Hotel', amount: '$750', date: 'Jan 15, 2024', receipt: true, violation: false },
    { id: 2, employee: 'Jane Smith', category: 'Meals', amount: '$125', date: 'Jan 16, 2024', receipt: true, violation: true, reason: 'Exceeds daily limit' },
    { id: 3, employee: 'Bob Wilson', category: 'Transport', amount: '$95', date: 'Jan 17, 2024', receipt: true, violation: false },
    { id: 4, employee: 'Alice Brown', category: 'Hotel', amount: '$1,200', date: 'Jan 18, 2024', receipt: true, violation: false },
    { id: 5, employee: 'Chris Davis', category: 'Meals', amount: '$45', date: 'Jan 19, 2024', receipt: false, violation: true, reason: 'Missing receipt' },
  ];

  const handleApprove = (id) => {
    alert(`Expense #${id} approved`);
    // TODO: Connect to API
  };

  const handleReject = (id) => {
    alert(`Expense #${id} rejected`);
    // TODO: Connect to API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Financial Overview, {user?.firstName}!
              </h1>
              <p className="text-gray-500">Finance Officer Dashboard</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                <stat.Icon className={`w-6 h-6 ${stat.text}`} />
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => navigate('/finance/reports')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <TrendingUp className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">Financial Reports</h3>
            <p className="text-blue-100 text-sm">Generate spending reports</p>
          </button>

          <button
            onClick={() => navigate('/finance/analytics')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <FileText className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">Analytics Dashboard</h3>
            <p className="text-purple-100 text-sm">Company-wide insights</p>
          </button>
        </div>

        {/* Pending Expenses */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-gray-900 text-lg">Pending Expense Review</h2>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                {pendingExpenses.length} pending
              </span>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {pendingExpenses.map((exp) => (
              <div key={exp.id} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Employee Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold">
                      {exp.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{exp.employee}</p>
                      <p className="text-sm text-gray-500">{exp.category} • {exp.date}</p>
                    </div>
                  </div>

                  {/* Amount & Status */}
                  <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Amount</p>
                      <p className="font-bold text-gray-900 text-lg">{exp.amount}</p>
                    </div>

                    {/* Receipt Status */}
                    <div>
                      <p className="text-gray-500 text-xs">Receipt</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        exp.receipt ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {exp.receipt ? '✓ Attached' : '✗ Missing'}
                      </span>
                    </div>

                    {/* Violation Warning */}
                    {exp.violation && (
                      <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-xs text-red-700 font-medium">
                          {exp.reason}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(exp.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(exp.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;