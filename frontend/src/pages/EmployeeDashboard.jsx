import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  Clock,
  DollarSign,
  Calendar,
  Plus,
  FileText,
  User,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Upcoming Trips', value: '3', change: '+2 this month', Icon: Plane, bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Pending Approvals', value: '2', change: 'Awaiting manager', Icon: Clock, bg: 'bg-amber-50', text: 'text-amber-600' },
    { label: 'Total Spend', value: '$4,250', change: 'This quarter', Icon: DollarSign, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Days on Travel', value: '12', change: 'This year', Icon: Calendar, bg: 'bg-purple-50', text: 'text-purple-600' },
  ];

  const recentRequests = [
    { id: 1, destination: 'New York', dates: 'Jan 15-18, 2024', status: 'pending', cost: '$1,200' },
    { id: 2, destination: 'Chicago', dates: 'Feb 1-3, 2024', status: 'approved', cost: '$850' },
    { id: 3, destination: 'Boston', dates: 'Mar 10-12, 2024', status: 'rejected', cost: '$450' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-500">
                Employee Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.Icon className={`w-6 h-6 ${stat.text}`} />
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate('/travel/new')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <Plus className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">New Travel Request</h3>
            <p className="text-blue-100 text-sm">Submit a new trip</p>
          </button>

          <button
            onClick={() => navigate('/expenses/new')}
            className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <FileText className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">Submit Expense</h3>
            <p className="text-emerald-100 text-sm">File a claim</p>
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <User className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">My Profile</h3>
            <p className="text-purple-100 text-sm">View and edit</p>
          </button>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-lg">My Recent Travel Requests</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentRequests.map((req) => (
              <div key={req.id} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Plane className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{req.destination}</p>
                    <p className="text-sm text-gray-500">{req.dates} • {req.cost}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(req.status)}`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;