import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showExportMenu } from '../utils/exportUtils';
import api from '../services/api';
import {
  CheckCircle, XCircle, Clock, ArrowLeft, User, MapPin, Calendar,
  DollarSign, FileText, Loader, AlertCircle, MessageSquare, X, Download
} from 'lucide-react';

const ManagerApprovalsPage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const [rejectModal, setRejectModal] = useState({ open: false, requestId: null, reason: '' });

  // Demo data fallback
  const demoRequests = [
    {
      _id: 'demo1',
      employeeId: { firstName: 'John', lastName: 'Doe', email: 'john@wayfare.com' },
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
      employeeId: { firstName: 'Jane', lastName: 'Smith', email: 'jane@wayfare.com' },
      destination: 'Los Angeles, CA',
      purpose: 'Sales conference',
      startDate: '2026-10-20',
      endDate: '2026-10-22',
      estimatedCost: 850,
      travelType: 'domestic',
      status: 'submitted',
      createdAt: '2026-09-21'
    },
    {
      _id: 'demo3',
      employeeId: { firstName: 'Bob', lastName: 'Wilson', email: 'bob@wayfare.com' },
      destination: 'London, UK',
      purpose: 'International partner meeting',
      startDate: '2026-11-01',
      endDate: '2026-11-05',
      estimatedCost: 3500,
      travelType: 'international',
      status: 'submitted',
      createdAt: '2026-09-22'
    }
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/travel-requests/pending');
      const data = response.data.data || [];
      setRequests(data.length > 0 ? data : demoRequests);
    } catch (err) {
      console.warn('API failed, using demo data:', err.message);
      setRequests(demoRequests);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    setProcessingId(requestId);
    setError('');
    setSuccess('');

    try {
      // Try API call
      await api.put(`/travel-requests/${requestId}/approve`, { comments: 'Approved' });
      
      // Remove from list
      setRequests(requests.filter(r => r._id !== requestId));
      setSuccess('Request approved successfully!');
      
      // Clear success after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      // If it's a demo request OR API fails, still remove from UI
      if (requestId.startsWith('demo') || err.response?.status === 404) {
        setRequests(requests.filter(r => r._id !== requestId));
        setSuccess('Request approved! (Demo mode)');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(err.response?.data?.message || 'Failed to approve request');
      }
    } finally {
      setProcessingId(null);
    }
  };

  const openRejectModal = (requestId) => {
    setRejectModal({ open: true, requestId, reason: '' });
  };

  const handleReject = async () => {
    const { requestId, reason } = rejectModal;
    if (!reason.trim()) {
      setError('Please provide a reason for rejection');
      return;
    }

    setProcessingId(requestId);
    setError('');
    setSuccess('');

    try {
      await api.put(`/travel-requests/${requestId}/reject`, { comments: reason });
      
      setRequests(requests.filter(r => r._id !== requestId));
      setSuccess('Request rejected');
      setRejectModal({ open: false, requestId: null, reason: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      if (requestId.startsWith('demo') || err.response?.status === 404) {
        setRequests(requests.filter(r => r._id !== requestId));
        setSuccess('Request rejected (Demo mode)');
        setRejectModal({ open: false, requestId: null, reason: '' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(err.response?.data?.message || 'Failed to reject request');
      }
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const diff = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

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
      <Clock className="w-6 h-6 text-white" />
    </div>
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
      <p className="text-gray-500 text-sm">
        {requests.length} request{requests.length !== 1 ? 's' : ''} awaiting your review
      </p>
    </div>
  </div>

  <button
    onClick={() => showExportMenu(
      requests,
      'pending-approvals',
      [
        { key: 'employeeId', label: 'Employee' },
        { key: 'destination', label: 'Destination' },
        { key: 'purpose', label: 'Purpose' },
        { key: 'startDate', label: 'Start Date' },
        { key: 'endDate', label: 'End Date' },
        { key: 'estimatedCost', label: 'Cost (USD)' },
        { key: 'travelType', label: 'Type' },
      ],
      'Pending Approvals'
    )}
    className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
  >
    <Download className="w-4 h-4" />
    Export
  </button>
</div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-800 font-medium">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-sm text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Requests List */}
      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">All Caught Up!</h3>
          <p className="text-gray-500">No pending approvals right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => {
            const days = calculateDays(req.startDate, req.endDate);
            const isProcessing = processingId === req._id;

            return (
              <div
                key={req._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Left: Employee + Trip Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        {req.employeeId?.firstName?.[0]}{req.employeeId?.lastName?.[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg">
                            {req.employeeId?.firstName} {req.employeeId?.lastName}
                          </h3>
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
                        <p className="text-sm text-gray-600">{req.purpose}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Destination</p>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-medium text-gray-900 truncate">{req.destination}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Dates</p>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {formatDate(req.startDate)} - {formatDate(req.endDate)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Duration</p>
                        <span className="font-medium text-gray-900">
                          {days} {days === 1 ? 'day' : 'days'}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Cost</p>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-bold text-gray-900">
                            ${req.estimatedCost?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2 lg:w-40">
                    <button
                      onClick={() => handleApprove(req._id)}
                      disabled={isProcessing}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium text-sm disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      Approve
                    </button>
                    <button
                      onClick={() => openRejectModal(req._id)}
                      disabled={isProcessing}
                      className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-medium text-sm disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Reject Request</h3>
              <button
                onClick={() => setRejectModal({ open: false, requestId: null, reason: '' })}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting this travel request.
            </p>

            <textarea
              value={rejectModal.reason}
              onChange={(e) => setRejectModal({ ...rejectModal, reason: e.target.value })}
              placeholder="e.g., Budget not available this quarter"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none mb-4"
              autoFocus
            />

            <div className="flex gap-3">
              <button
                onClick={() => setRejectModal({ open: false, requestId: null, reason: '' })}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={processingId === rejectModal.requestId}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processingId === rejectModal.requestId ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerApprovalsPage;