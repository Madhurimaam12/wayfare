import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  ArrowRight,
  UserCheck
} from 'lucide-react';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Pending Approvals', value: '5', change: 'Need your review', Icon: Clock, bg: 'bg-amber-50', text: 'text-amber-600' },
    { label: 'Approved This Month', value: '12', change: '+3 vs last month', Icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Team Members', value: '8', change: 'Engineering dept', Icon: Users, bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Team Spend', value: '$12,450', change: 'This quarter', Icon: DollarSign, bg: 'bg-purple-50', text: 'text-purple-600' },
  ];

  const pendingRequests = [
    { id: 1, employee: 'John Doe', destination: 'New York', dates: 'Jan 15-18, 2024', cost: '$1,200', type: 'domestic', purpose: 'Client Meeting' },
    { id: 2, employee: 'Jane Smith', destination: 'Los Angeles', dates: 'Jan 20-22, 2024', cost: '$850', type: 'domestic', purpose: 'Sales Conference' },
    { id: 3, employee: 'Bob Wilson', destination: 'Chicago', dates: 'Feb 1-3, 2024', cost: '$450', type: 'domestic', purpose: 'Team Offsite' },
    { id: 4, employee: 'Alice Brown', destination: 'London', dates: 'Feb 10-15, 2024', cost: '$3,200', type: 'international', purpose: 'Partner Meeting' },
    { id: 5, employee: 'Chris Davis', destination: 'Seattle', dates: 'Feb 20-22, 2024', cost: '$750', type: 'domestic', purpose: 'Tech Conference' },
  ];

  const handleApprove = (id) => {
    alert(`Approved request #${id}`);
    // TODO: Connect to API
  };

  const handleReject = (id) => {
    alert(`Rejected request #${id}`);
    // TODO: Connect to API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Team Overview, {user?.firstName}!
              </h1>
              <p className="text-gray-500">Manager Dashboard</p>
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
            onClick={() => navigate('/manager/team')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <UserCheck className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">View Team</h3>
            <p className="text-blue-100 text-sm">See all team members and their travel</p>
          </button>

          <button
            onClick={() => navigate('/manager/reports')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <DollarSign className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">Team Reports</h3>
            <p className="text-purple-100 text-sm">Team spending and analytics</p>
          </button>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-gray-900 text-lg">Pending Approvals</h2>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                {pendingRequests.length} pending
              </span>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {pendingRequests.map((req) => (
              <div key={req.id} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Employee Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                      {req.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{req.employee}</p>
                      <p className="text-sm text-gray-500">{req.purpose}</p>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Destination</p>
                      <p className="font-medium text-gray-900">{req.destination}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Dates</p>
                      <p className="font-medium text-gray-900">{req.dates}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Cost</p>
                      <p className="font-medium text-gray-900">{req.cost}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      req.type === 'international' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {req.type}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
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

export default ManagerDashboard;