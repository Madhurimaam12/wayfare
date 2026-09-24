import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  Clock,
  DollarSign,
  Calendar,
  Bell,
  LogOut,
  FileText,
  BarChart3,
  CheckCircle,
  Plus,
  ArrowRight,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const stats = [
    {
      label: 'Upcoming Trips',
      value: '3',
      change: '+2 this month',
      icon: Plane,
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
      text: 'text-blue-600'
    },
    {
      label: 'Pending Approvals',
      value: '2',
      change: 'Needs attention',
      icon: Clock,
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      text: 'text-amber-600'
    },
    {
      label: 'Total Spend',
      value: '$4,250',
      change: '+12% vs last month',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-green-500',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600'
    },
    {
      label: 'Days on Travel',
      value: '12',
      change: 'This quarter',
      icon: Calendar,
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      text: 'text-purple-600'
    },
  ];

  const quickActions = [
    {
      title: 'New Travel Request',
      desc: 'Submit a new trip for approval',
      icon: Plane,
      gradient: 'from-blue-600 to-indigo-600',
      route: '/travel/new'
    },
    {
      title: 'Submit Expense',
      desc: 'File a claim with receipts',
      icon: FileText,
      gradient: 'from-emerald-600 to-green-600',
      route: '/expenses/new'
    },
    {
      title: 'View Reports',
      desc: 'Analytics and insights',
      icon: BarChart3,
      gradient: 'from-purple-600 to-pink-600',
      route: '/reports'
    },
  ];

  const recentActivity = [
    {
      title: 'Trip to New York approved',
      subtitle: 'Jan 15-18, 2024',
      time: '2 days ago',
      color: 'text-green-600',
      bg: 'bg-green-100',
      icon: CheckCircle
    },
    {
      title: 'Expense claim submitted',
      subtitle: '$750 - Hotel stay',
      time: '5 days ago',
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      icon: Clock
    },
    {
      title: 'New travel request created',
      subtitle: 'Chicago conference',
      time: '1 week ago',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      icon: Plus
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
              </div>

              {/* Welcome Text */}
              <div className="text-white">
                <p className="text-blue-100 text-sm font-medium mb-1">
                  {getGreeting()}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold mb-1">
                  {user?.firstName} {user?.lastName}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-blue-100 text-sm">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full capitalize">
                    {user?.role?.replace('_', ' ')}
                  </span>
                  <span>|</span>
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
              </button>
              <button
                onClick={logout}
                className="px-5 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}></div>

                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${stat.text}`} />
                  </div>
                  <div className={`px-2 py-1 ${stat.bg} ${stat.text} rounded-lg text-xs font-medium`}>
                    Live
                  </div>
                </div>

                <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <span className="text-sm text-gray-500">Start with one click</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(action.route)}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left border border-gray-100"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:bg-white/20 transition-all`}>
                      <Icon className="w-6 h-6 text-white group-hover:scale-125 transition-transform duration-300" />
                    </div>

                    <h3 className="font-bold text-gray-900 group-hover:text-white text-lg mb-1 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-white/90 mb-4 transition-colors">
                      {action.desc}
                    </p>

                    <div className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-white transition-colors">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-sm text-gray-500">Your latest travel updates</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-blue-50 transition-all duration-300 border border-transparent hover:border-blue-100"
                  >
                    <div className={`w-12 h-12 ${activity.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${activity.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{activity.title}</p>
                      <p className="text-sm text-gray-500 truncate">{activity.subtitle}</p>
                    </div>

                    <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Travel Tip Card */}
          <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

            <div className="relative">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Travel Tip</h3>
              <p className="text-white/90 text-sm mb-6 leading-relaxed">
                Book your flights at least 2 weeks in advance to save up to 30% on your travel budget.
              </p>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/80">Budget Used</span>
                  <span className="font-bold">68%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              <button className="w-full py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                View Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;