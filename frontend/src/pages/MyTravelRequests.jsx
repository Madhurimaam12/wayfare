import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showExportMenu } from '../utils/exportUtils';
import api from '../services/api';
import {
  Plane, Calendar, DollarSign, MapPin, Plus, Search, Filter, Eye,
  Clock, CheckCircle, XCircle, AlertCircle, Loader, ArrowRight, ArrowLeft, Download
} from 'lucide-react';

const MyTravelRequests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Demo data
  const demoRequests = [
    {
      _id: 'demo1',
      requestNumber: 'TR00001',
      destination: 'New York, NY',
      purpose: 'Client meeting with ABC Corporation',
      startDate: '2026-10-15',
      endDate: '2026-10-18',
      estimatedCost: 1200,
      travelType: 'domestic',
      status: 'submitted',
      createdAt: '2026-09-20'
    },
    {
      _id: 'demo2',
      requestNumber: 'TR00002',
      destination: 'Chicago, IL',
      purpose: 'Annual sales conference',
      startDate: '2026-10-01',
      endDate: '2026-10-03',
      estimatedCost: 850,
      travelType: 'domestic',
      status: 'approved',
      createdAt: '2026-09-15'
    },
    {
      _id: 'demo3',
      requestNumber: 'TR00003',
      destination: 'London, UK',
      purpose: 'International partner meeting',
      startDate: '2026-11-01',
      endDate: '2026-11-05',
      estimatedCost: 3500,
      travelType: 'international',
      status: 'rejected',
      createdAt: '2026-09-10'
    }
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/travel-requests/my');
      const data = response.data.data || [];
      setRequests(data.length > 0 ? data : demoRequests);
    } catch (err) {
      console.warn('API failed, using demo data');
      setRequests(demoRequests);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      submitted: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending' },
      pending_approval: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Rejected' },
      cancelled: { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertCircle, label: 'Cancelled' },
      draft: { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertCircle, label: 'Draft' },
    };
    return configs[status] || configs.submitted;
  };

  const formatDate = (d) => {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const diff = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const filtered = requests.filter((r) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      r.destination?.toLowerCase().includes(search) ||
      r.purpose?.toLowerCase().includes(search);
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => ['submitted', 'pending_approval'].includes(r.status)).length,
    approved: requests.filter((r) => r.status === 'approved').length,
    totalCost: requests.reduce((sum, r) => sum + (r.estimatedCost || 0), 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Travel Requests</h1>
              <p className="text-gray-500 text-sm">View and manage all your travel requests</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
  <button
    onClick={() => showExportMenu(
      filtered,
      'my-travel-requests',
      [
        { key: 'requestNumber', label: 'Request #' },
        { key: 'destination', label: 'Destination' },
        { key: 'purpose', label: 'Purpose' },
        { key: 'startDate', label: 'Start Date' },
        { key: 'endDate', label: 'End Date' },
        { key: 'estimatedCost', label: 'Cost (USD)' },
        { key: 'status', label: 'Status' },
      ],
      'My Travel Requests'
    )}
    className="flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
  >
    <Download className="w-5 h-5" />
    Export
  </button>
  <button
    onClick={() => navigate('/travel/new')}
    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
  >
    <Plus className="w-5 h-5" />
    New Request
  </button>
</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Cost</p>
          <p className="text-2xl font-bold text-blue-600">${stats.totalCost.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by destination or purpose..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="submitted">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <Plane className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No travel requests found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all' ? 'Try different filters' : 'Create your first request'}
          </p>
          <button
            onClick={() => navigate('/travel/new')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            New Travel Request
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => {
            const cfg = getStatusConfig(req.status);
            const StatusIcon = cfg.icon;
            const days = calculateDays(req.startDate, req.endDate);

            return (
              <div
                key={req._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/travel/requests/${req._id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Plane className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg">{req.destination}</h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              req.travelType === 'international'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {req.travelType}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{req.purpose}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {formatDate(req.startDate)} - {formatDate(req.endDate)} ({days}d)
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5" />
                            <span className="font-semibold text-gray-900">
                              ${req.estimatedCost?.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-400">#{req.requestNumber || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {cfg.label}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTravelRequests;