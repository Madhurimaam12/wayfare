import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Plane,
  LayoutDashboard,
  FileText,
  CreditCard,
  BarChart3,
  Users,
  Building,
  Shield,
  BookOpen,
  User,
  TrendingUp,
  Database,
  Settings,
  CheckCircle
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/admin/users', label: 'Users', icon: Users },
          { path: '/admin/departments', label: 'Departments', icon: Building },
          { path: '/admin/policies', label: 'Policies', icon: Shield },
          { path: '/admin/reports', label: 'System Reports', icon: BarChart3 },
          { path: '/admin/settings', label: 'Settings', icon: Settings },
          { path: '/admin/audit', label: 'Audit Log', icon: Database },
          { path: '/profile', label: 'My Profile', icon: User },
        ];

      case 'manager':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/travel/requests', label: 'Travel Requests', icon: Plane },
          { path: '/manager/approvals', label: 'Approvals', icon: CheckCircle },
          { path: '/manager/team', label: 'My Team', icon: Users },
          { path: '/manager/reports', label: 'Team Reports', icon: BarChart3 },
          { path: '/expenses', label: 'Expenses', icon: CreditCard },
          { path: '/profile', label: 'My Profile', icon: User },
        ];

      case 'finance_officer':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/expenses', label: 'Expenses', icon: CreditCard },
          { path: '/finance/reports', label: 'Reports', icon: BarChart3 },
          { path: '/finance/analytics', label: 'Analytics', icon: TrendingUp },
          { path: '/finance/audit', label: 'Audit Log', icon: Database },
          { path: '/profile', label: 'My Profile', icon: User },
        ];

      case 'travel_coordinator':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/travel/requests', label: 'Travel Requests', icon: Plane },
          { path: '/coordinator/flights', label: 'Book Flights', icon: Plane },
          { path: '/coordinator/hotels', label: 'Book Hotels', icon: Building },
          { path: '/coordinator/transport', label: 'Transport', icon: BookOpen },
          { path: '/coordinator/bookings', label: 'All Bookings', icon: FileText },
          { path: '/coordinator/vendors', label: 'Vendors', icon: Users },
          { path: '/expenses', label: 'Expenses', icon: CreditCard },
          { path: '/profile', label: 'My Profile', icon: User },
        ];

      case 'employee':
      default:
        return [
          { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/travel/requests', label: 'Travel Requests', icon: Plane },
          { path: '/expenses', label: 'Expenses', icon: CreditCard },
          { path: '/profile', label: 'My Profile', icon: User },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Wayfare</h1>
            <p className="text-xs text-gray-400">Travel Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-400 capitalize truncate">
              {user?.role?.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;