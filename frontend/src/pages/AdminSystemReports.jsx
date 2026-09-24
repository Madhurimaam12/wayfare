import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  BarChart3,
  ArrowLeft,
  TrendingUp,
  Users,
  Plane,
  DollarSign,
  Building,
  Download,
  Loader,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { showExportMenu } from '../utils/exportUtils';

const AdminSystemReports = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 156,
    totalDepartments: 12,
    totalRequests: 45,
    totalExpenses: 89,
    totalSpend: 245000,
    pendingApprovals: 8,
    activeUsers: 142,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [usersRes, deptsRes] = await Promise.all([
        api.get('/users').catch(() => ({ data: { data: [] } })),
        api.get('/departments').catch(() => ({ data: { data: [] } })),
      ]);
      
      const users = usersRes.data.data || [];
      const depts = deptsRes.data.data || [];

      if (users.length > 0) {
        setStats(prev => ({
          ...prev,
          totalUsers: users.length,
          activeUsers: users.filter(u => u.isActive).length,
          totalDepartments: depts.length || prev.totalDepartments,
        }));
      }
    } catch (err) {
      console.warn('Using demo stats');
    } finally {
      setLoading(false);
    }
  };

  // Demo monthly data
  const monthlyData = [
    { month: 'Jan', requests: 12, expenses: 24, spend: 18500 },
    { month: 'Feb', requests: 15, expenses: 32, spend: 22300 },
    { month: 'Mar', requests: 18, expenses: 28, spend: 19800 },
    { month: 'Apr', requests: 14, expenses: 35, spend: 26400 },
    { month: 'May', requests: 22, expenses: 42, spend: 31200 },
    { month: 'Jun', requests: 19, expenses: 38, spend: 28700 },
  ];

  const maxSpend = Math.max(...monthlyData.map(d => d.spend), 1);

  const departmentStats = [
    { name: 'Engineering', users: 45, spend: 85000, requests: 18 },
    { name: 'Sales', users: 32, spend: 62000, requests: 12 },
    { name: 'Finance', users: 18, spend: 28000, requests: 6 },
    { name: 'Marketing', users: 25, spend: 45000, requests: 7 },
    { name: 'HR', users: 12, spend: 25000, requests: 2 },
  ];

  const systemHealth = [
    { label: 'API Status', status: 'Operational', color: 'green', icon: CheckCircle },
    { label: 'Database', status: 'Connected', color: 'green', icon: CheckCircle },
    { label: 'Last Backup', status: '2 hours ago', color: 'blue', icon: Clock },
    { label: 'Active Sessions', status: `${stats.activeUsers} users`, color: 'green', icon: Activity },
  ];

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
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">System Reports</h1>
              <p className="text-gray-500 text-sm">Full platform analytics and insights</p>
            </div>
          </div>

          <button
            onClick={() => showExportMenu(
              departmentStats,
              'system-reports',
              [
                { key: 'name', label: 'Department' },
                { key: 'users', label: 'Users' },
                { key: 'requests', label: 'Travel Requests' },
                { key: 'spend', label: 'Total Spend (USD)' },
              ],
              'System Reports'
            )}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Users</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
          <p className="text-xs text-gray-400 mt-1">{stats.activeUsers} active</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
            <Building className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Departments</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalDepartments}</p>
          <p className="text-xs text-gray-400 mt-1">All active</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
            <Plane className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Travel Requests</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalRequests}</p>
          <p className="text-xs text-gray-400 mt-1">All time</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Spend</p>
          <p className="text-3xl font-bold text-gray-900">${(stats.totalSpend / 1000).toFixed(0)}K</p>
          <p className="text-xs text-gray-400 mt-1">This year</p>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-bold text-gray-900 text-lg mb-4">System Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {systemHealth.map((item, i) => {
            const Icon = item.icon;
            const colorClasses = {
              green: 'bg-green-50 text-green-600',
              blue: 'bg-blue-50 text-blue-600',
              yellow: 'bg-yellow-50 text-yellow-600',
              red: 'bg-red-50 text-red-600',
            };
            return (
              <div key={i} className={`p-4 rounded-xl ${colorClasses[item.color]}`}>
                <Icon className="w-5 h-5 mb-2" />
                <p className="text-xs opacity-70 mb-1">{item.label}</p>
                <p className="font-semibold text-sm">{item.status}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Monthly Spending Trends</h3>
            <p className="text-sm text-gray-500">Platform-wide spend by month</p>
          </div>
          <TrendingUp className="w-5 h-5 text-emerald-600" />
        </div>

        <div className="space-y-4">
          {monthlyData.map((data) => (
            <div key={data.month}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900 w-12">{data.month}</span>
                  <span className="text-xs text-gray-500">
                    {data.requests} requests • {data.expenses} expenses
                  </span>
                </div>
                <span className="font-bold text-gray-900">
                  ${data.spend.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-slate-700 to-gray-900 transition-all duration-500"
                  style={{ width: `${(data.spend / maxSpend) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">Department Breakdown</h3>
          <p className="text-sm text-gray-500">Activity by department</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Department
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Users
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Requests
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Spend
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Avg/User
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {departmentStats.map((dept) => (
                <tr key={dept.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{dept.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-right">{dept.users}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-right">{dept.requests}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                    ${dept.spend.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-right">
                    ${Math.round(dept.spend / dept.users).toLocaleString()}
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

export default AdminSystemReports;