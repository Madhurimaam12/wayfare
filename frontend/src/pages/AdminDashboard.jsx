import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Building,
  FileText,
  Shield,
  BarChart3,
  Settings,
  UserPlus,
  Database,
  Bell,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Users', value: '156', change: '+12 this month', Icon: Users, bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Departments', value: '12', change: 'All active', Icon: Building, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Travel Policies', value: '8', change: '2 updated recently', Icon: FileText, bg: 'bg-purple-50', text: 'text-purple-600' },
    { label: 'Active Violations', value: '5', change: 'Need attention', Icon: AlertCircle, bg: 'bg-red-50', text: 'text-red-600' },
  ];

  const adminActions = [
    { title: 'Manage Users', desc: 'Add, edit, or remove users', Icon: UserPlus, gradient: 'from-blue-600 to-indigo-600', route: '/admin/users' },
    { title: 'Manage Departments', desc: 'Configure company structure', Icon: Building, gradient: 'from-emerald-600 to-green-600', route: '/admin/departments' },
    { title: 'Manage Policies', desc: 'Set travel limits and rules', Icon: Shield, gradient: 'from-purple-600 to-pink-600', route: '/admin/policies' },
    { title: 'System Reports', desc: 'Analytics and insights', Icon: BarChart3, gradient: 'from-orange-500 to-amber-600', route: '/admin/reports' },
    { title: 'System Settings', desc: 'Configure platform', Icon: Settings, gradient: 'from-gray-600 to-slate-700', route: '/admin/settings' },
    { title: 'Audit Log', desc: 'Track all activity', Icon: Database, gradient: 'from-red-600 to-rose-600', route: '/admin/audit' },
  ];

  const recentActivity = [
    { action: 'John Doe registered', detail: 'New employee added to Engineering', time: '2 mins ago', color: 'bg-blue-500', Icon: Users },
    { action: 'New Department: Marketing', detail: 'Department created by Admin', time: '15 mins ago', color: 'bg-emerald-500', Icon: Building },
    { action: 'Policy Updated', detail: 'Domestic accommodation limit: $250 → $300', time: '1 hour ago', color: 'bg-purple-500', Icon: Shield },
    { action: 'Expense Approved', detail: 'Sarah approved $750 for John Doe', time: '2 hours ago', color: 'bg-green-500', Icon: TrendingUp },
    { action: 'Violation Flagged', detail: 'Meal expense exceeds daily limit', time: '3 hours ago', color: 'bg-red-500', Icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-gray-900 flex items-center justify-center text-white text-2xl font-bold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Control Center
                </h1>
                <p className="text-gray-500">
                  Welcome back, {user?.firstName}! Manage the entire Wayfare platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="px-4 py-2 bg-slate-900 text-white rounded-xl font-medium text-sm">
                System Admin
              </div>
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

        {/* Admin Actions Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">System Management</h2>
            <span className="text-sm text-gray-500">Full platform access</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminActions.map((action, i) => (
              <button
                key={i}
                onClick={() => navigate(action.route)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <action.Icon className="w-6 h-6 text-white group-hover:scale-125 transition-transform duration-300" />
                  </div>

                  <h3 className="font-bold text-gray-900 group-hover:text-white text-lg mb-1 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-white/90 mb-4 transition-colors">
                    {action.desc}
                  </p>

                  <div className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-white transition-colors">
                    Open
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Recent System Activity</h2>
              <p className="text-sm text-gray-500">Latest actions across the platform</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View Audit Log <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity, i) => (
              <div key={i} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                <div className={`w-10 h-10 ${activity.color} bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <activity.Icon className={`w-5 h-5 ${activity.color.replace('bg-', 'text-')}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{activity.action}</p>
                  <p className="text-sm text-gray-500 truncate">{activity.detail}</p>
                </div>

                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;