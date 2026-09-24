import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showExportMenu } from '../utils/exportUtils';
import api from '../services/api';
import {
  Database,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  User,
  DollarSign,
  Download,
  Loader,
  Activity,
  FileText
} from 'lucide-react';

const FinanceAuditLog = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  // Demo audit logs
  const demoLogs = [
    { _id: '1', action: 'expense_approved', description: 'Approved $750 expense for John Doe', user: 'Sarah Williams', role: 'finance_officer', timestamp: '2026-09-24T14:30:00', amount: 750, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { _id: '2', action: 'expense_rejected', description: 'Rejected $125 expense for Jane Smith', user: 'Sarah Williams', role: 'finance_officer', timestamp: '2026-09-24T14:15:00', amount: 125, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
    { _id: '3', action: 'expense_reviewed', description: 'Under review: $1,200 expense for Alice Brown', user: 'Sarah Williams', role: 'finance_officer', timestamp: '2026-09-24T13:45:00', amount: 1200, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { _id: '4', action: 'expense_approved', description: 'Approved $95 transport for Bob Wilson', user: 'Sarah Williams', role: 'finance_officer', timestamp: '2026-09-24T13:20:00', amount: 95, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { _id: '5', action: 'expense_reimbursed', description: 'Reimbursed $380 to John Doe', user: 'Sarah Williams', role: 'finance_officer', timestamp: '2026-09-24T11:00:00', amount: 380, icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-100' },
    { _id: '6', action: 'policy_violation', description: 'Flagged: Meal expense exceeds daily limit', user: 'System', role: 'system', timestamp: '2026-09-24T10:30:00', amount: 0, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
    { _id: '7', action: 'expense_approved', description: 'Approved $890 accommodation for Jane Smith', user: 'Sarah Williams', role: 'finance_officer', timestamp: '2026-09-23T16:00:00', amount: 890, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { _id: '8', action: 'bulk_approval', description: 'Bulk approved 5 expenses', user: 'Sarah Williams', role: 'finance_officer', timestamp: '2026-09-23T15:30:00', amount: 2450, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      // In real app: await api.get('/audit-logs')
      // For now, use demo
      await new Promise(r => setTimeout(r, 300));
      setLogs(demoLogs);
    } catch (err) {
      setLogs(demoLogs);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      log.description?.toLowerCase().includes(search) ||
      log.user?.toLowerCase().includes(search);
    const matchesFilter = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (d) => {
    if (!d) return 'N/A';
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

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'expense_approved', label: 'Approved' },
    { value: 'expense_rejected', label: 'Rejected' },
    { value: 'expense_reviewed', label: 'In Review' },
    { value: 'expense_reimbursed', label: 'Reimbursed' },
    { value: 'policy_violation', label: 'Violations' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const stats = {
    total: logs.length,
    approved: logs.filter(l => l.action === 'expense_approved').length,
    rejected: logs.filter(l => l.action === 'expense_rejected').length,
    violations: logs.filter(l => l.action === 'policy_violation').length,
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
              <p className="text-gray-500 text-sm">Complete activity history and compliance tracking</p>
            </div>
          </div>

          <button
  onClick={() => showExportMenu(
    filteredLogs,
    'audit-log',
    [
      { key: 'description', label: 'Action' },
      { key: 'user', label: 'User' },
      { key: 'role', label: 'Role' },
      { key: 'amount', label: 'Amount (USD)' },
      { key: 'timestamp', label: 'Timestamp' },
    ],
    'Audit Log Report'
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
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Violations</p>
          <p className="text-2xl font-bold text-orange-600">{stats.violations}</p>
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
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              {actionTypes.map(a => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Activity Timeline</h3>
          <span className="text-sm text-gray-500">{filteredLogs.length} entries</span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center">
            <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No activity found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredLogs.map((log) => {
              const LogIcon = log.icon || Activity;
              return (
                <div key={log._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${log.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <LogIcon className={`w-5 h-5 ${log.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <div>
                          <p className="font-medium text-gray-900">{log.description}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {log.user}
                            </span>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium capitalize">
                              {log.role}
                            </span>
                            {log.amount > 0 && (
                              <span className="flex items-center gap-1 font-medium text-gray-700">
                                <DollarSign className="w-3 h-3" />
                                ${log.amount.toLocaleString()}
                              </span>
                            )}
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
        )}
      </div>
    </div>
  );
};

export default FinanceAuditLog;