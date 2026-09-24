import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  ArrowLeft,
  Search,
  Filter,
  User,
  Plus,
  Edit3,
  Trash2,
  Shield,
  Building,
  FileText,
  Download,
  Activity,
  CheckCircle,
  Clock,
  LogIn,
  LogOut
} from 'lucide-react';
import { showExportMenu } from '../utils/exportUtils';

const AdminAuditLog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const logs = [
    { _id: '1', action: 'user_created', description: 'Created new user: Test User (test@wayfare.com)', user: 'Admin User', role: 'admin', timestamp: '2026-09-24T14:30:00', icon: User, color: 'text-green-600', bg: 'bg-green-100' },
    { _id: '2', action: 'policy_updated', description: 'Updated Domestic Accommodation limit from $250 to $300', user: 'Admin User', role: 'admin', timestamp: '2026-09-24T14:15:00', icon: Shield, color: 'text-purple-600', bg: 'bg-purple-100' },
    { _id: '3', action: 'department_created', description: 'Created new department: Marketing', user: 'Admin User', role: 'admin', timestamp: '2026-09-24T13:45:00', icon: Building, color: 'text-blue-600', bg: 'bg-blue-100' },
    { _id: '4', action: 'user_login', description: 'John Doe logged in', user: 'John Doe', role: 'employee', timestamp: '2026-09-24T13:20:00', icon: LogIn, color: 'text-blue-600', bg: 'bg-blue-100' },
    { _id: '5', action: 'user_updated', description: 'Updated role for Jane Smith: employee → manager', user: 'Admin User', role: 'admin', timestamp: '2026-09-24T12:00:00', icon: Edit3, color: 'text-amber-600', bg: 'bg-amber-100' },
    { _id: '6', action: 'user_login', description: 'Sarah Williams logged in', user: 'Sarah Williams', role: 'finance_officer', timestamp: '2026-09-24T11:30:00', icon: LogIn, color: 'text-blue-600', bg: 'bg-blue-100' },
    { _id: '7', action: 'user_deleted', description: 'Deactivated user: Old User (old@wayfare.com)', user: 'Admin User', role: 'admin', timestamp: '2026-09-24T10:30:00', icon: Trash2, color: 'text-red-600', bg: 'bg-red-100' },
    { _id: '8', action: 'user_logout', description: 'John Doe logged out', user: 'John Doe', role: 'employee', timestamp: '2026-09-24T10:00:00', icon: LogOut, color: 'text-gray-600', bg: 'bg-gray-100' },
    { _id: '9', action: 'policy_created', description: 'Created new policy: Meal Allowance - $75/day', user: 'Admin User', role: 'admin', timestamp: '2026-09-23T16:00:00', icon: Shield, color: 'text-purple-600', bg: 'bg-purple-100' },
    { _id: '10', action: 'user_created', description: 'Created new user: New Employee (emp@wayfare.com)', user: 'Admin User', role: 'admin', timestamp: '2026-09-23T15:00:00', icon: User, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'user_created', label: 'User Created' },
    { value: 'user_updated', label: 'User Updated' },
    { value: 'user_deleted', label: 'User Deleted' },
    { value: 'user_login', label: 'Logins' },
    { value: 'user_logout', label: 'Logouts' },
    { value: 'policy_created', label: 'Policy Created' },
    { value: 'policy_updated', label: 'Policy Updated' },
    { value: 'department_created', label: 'Department Created' },
  ];

  const filtered = logs.filter(log => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = log.description.toLowerCase().includes(search) ||
                          log.user.toLowerCase().includes(search);
    const matchesFilter = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (d) => {
    const date = new Date(d);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: logs.length,
    creates: logs.filter(l => l.action.includes('created')).length,
    updates: logs.filter(l => l.action.includes('updated')).length,
    logins: logs.filter(l => l.action === 'user_login').length,
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
            <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-gray-900 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
              <p className="text-gray-500 text-sm">Complete system activity history</p>
            </div>
          </div>

          <button
            onClick={() => showExportMenu(
              filtered,
              'admin-audit-log',
              [
                { key: 'description', label: 'Action' },
                { key: 'user', label: 'User' },
                { key: 'role', label: 'Role' },
                { key: 'timestamp', label: 'Timestamp' },
              ],
              'Admin Audit Log'
            )}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Export Log
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Actions</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Creates</p>
          <p className="text-2xl font-bold text-green-600">{stats.creates}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Updates</p>
          <p className="text-2xl font-bold text-amber-600">{stats.updates}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Logins</p>
          <p className="text-2xl font-bold text-blue-600">{stats.logins}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search audit log..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            {actionTypes.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Activity Timeline</h3>
          <p className="text-sm text-gray-500">{filtered.length} entries</p>
        </div>

        <div className="divide-y divide-gray-100">
          {filtered.map((log) => {
            const LogIcon = log.icon || Activity;
            return (
              <div key={log._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${log.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <LogIcon className={`w-5 h-5 ${log.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <p className="font-medium text-gray-900">{log.description}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {log.user}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium capitalize">
                            {log.role.replace('_', ' ')}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium font-mono">
                            {log.action}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(log.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminAuditLog;