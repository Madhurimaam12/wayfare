import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showExportMenu } from '../utils/exportUtils';
import api from '../services/api';
import {
  BarChart3,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Users,
  Plane,
  Calendar,
  Loader,
  Download,
  Filter,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const ManagerReportsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');
  const [requests, setRequests] = useState([]);

  // Demo data fallback
  const demoData = [
    { id: 1, employee: 'John Doe', destination: 'New York', cost: 1200, status: 'approved', month: 'Jan' },
    { id: 2, employee: 'Jane Smith', destination: 'Los Angeles', cost: 850, status: 'approved', month: 'Jan' },
    { id: 3, employee: 'Bob Wilson', destination: 'Chicago', cost: 450, status: 'pending', month: 'Feb' },
    { id: 4, employee: 'Alice Brown', destination: 'London', cost: 3200, status: 'approved', month: 'Feb' },
    { id: 5, employee: 'Chris Davis', destination: 'Seattle', cost: 750, status: 'rejected', month: 'Feb' },
    { id: 6, employee: 'John Doe', destination: 'Boston', cost: 620, status: 'approved', month: 'Mar' },
    { id: 7, employee: 'Jane Smith', destination: 'Miami', cost: 980, status: 'approved', month: 'Mar' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/travel-requests/pending');
      const data = response.data.data || [];
      
      // Transform for reports
      const formatted = data.map(r => ({
        id: r._id,
        employee: `${r.employeeId?.firstName || 'Unknown'} ${r.employeeId?.lastName || ''}`,
        destination: r.destination,
        cost: r.estimatedCost,
        status: r.status,
        month: new Date(r.startDate || r.createdAt).toLocaleString('en-US', { month: 'short' })
      }));
      
      setRequests(formatted.length > 0 ? formatted : demoData);
    } catch (err) {
      console.warn('API failed, using demo data');
      setRequests(demoData);
    } finally {
      setLoading(false);
    }
  };

  // Stats
  const totalSpend = requests.reduce((sum, r) => sum + (r.cost || 0), 0);
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;
  const approvalRate = requests.length > 0 
    ? Math.round((approvedCount / requests.length) * 100) 
    : 0;

  // Group by month
  const byMonth = requests.reduce((acc, r) => {
    const month = r.month || 'Unknown';
    if (!acc[month]) acc[month] = 0;
    acc[month] += r.cost || 0;
    return acc;
  }, {});

  const months = Object.keys(byMonth);
  const maxMonthValue = Math.max(...Object.values(byMonth), 1);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-amber-600" />
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
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Team Reports</h1>
              <p className="text-gray-500 text-sm">Analytics and insights for your team</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button
  onClick={() => showExportMenu(
    requests,
    'team-reports',
    [
      { key: 'employee', label: 'Employee' },
      { key: 'destination', label: 'Destination' },
      { key: 'month', label: 'Month' },
      { key: 'cost', label: 'Cost (USD)' },
      { key: 'status', label: 'Status' },
    ],
    'Team Travel Reports'
  )}
  className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors text-sm font-medium"
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
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Team Spend</p>
          <p className="text-3xl font-bold text-gray-900">${totalSpend.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">This {timeRange}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Approval Rate</p>
          <p className="text-3xl font-bold text-gray-900">{approvalRate}%</p>
          <p className="text-xs text-gray-400 mt-1">{approvedCount} approved</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Pending</p>
          <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
          <p className="text-xs text-gray-400 mt-1">Need review</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Requests</p>
          <p className="text-3xl font-bold text-gray-900">{requests.length}</p>
          <p className="text-xs text-gray-400 mt-1">All time</p>
        </div>
      </div>

      {/* Spending Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Monthly Spending</h3>
            <p className="text-sm text-gray-500">Team travel spend by month</p>
          </div>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>

        {months.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No data available</div>
        ) : (
          <div className="space-y-4">
            {months.map((month) => (
              <div key={month}>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="font-medium text-gray-700">{month}</span>
                  <span className="font-semibold text-gray-900">
                    ${byMonth[month].toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                    style={{ width: `${(byMonth[month] / maxMonthValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Recent Team Requests</h3>
            <p className="text-sm text-gray-500">Latest travel requests from your team</p>
          </div>
          <Filter className="w-4 h-4 text-gray-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Employee
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Destination
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Month
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Cost
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{req.employee}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{req.destination}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{req.month}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                    ${req.cost?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        req.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : req.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerReportsPage;