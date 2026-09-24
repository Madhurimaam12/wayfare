import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Plane,
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  User,
  Building,
  Loader
} from 'lucide-react';

const TravelRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/travel-requests/${id}`);
      setRequest(response.data.data);
    } catch (err) {
      console.warn('API failed, using demo data');
      // Demo fallback
      setRequest({
        _id: id,
        requestNumber: 'TR00001',
        destination: 'New York, NY',
        purpose: 'Client meeting with ABC Corporation to discuss Q4 partnership',
        startDate: '2026-10-15',
        endDate: '2026-10-18',
        estimatedCost: 1200,
        travelType: 'domestic',
        status: 'submitted',
        notes: 'Need to arrive early for preparation meeting',
        createdAt: '2026-09-20',
        employeeId: { firstName: 'John', lastName: 'Doe', email: 'john@wayfare.com', employeeId: 'EMP001' },
        departmentId: { name: 'Engineering', code: 'ENG' },
        approvalChain: []
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      submitted: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending Approval' },
      pending_approval: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending Approval' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Rejected' },
      cancelled: { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertCircle, label: 'Cancelled' },
    };
    return configs[status] || configs.submitted;
  };

  const formatDate = (d) => {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
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
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="p-6 text-center">
        <p>Request not found</p>
      </div>
    );
  }

  const cfg = getStatusConfig(request.status);
  const StatusIcon = cfg.icon;
  const days = calculateDays(request.startDate, request.endDate);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/travel/requests')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Requests
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Plane className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{request.destination}</h1>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    request.travelType === 'international'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {request.travelType}
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Request #{request.requestNumber} • Submitted {formatDate(request.createdAt)}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${cfg.bg} ${cfg.text}`}
          >
            <StatusIcon className="w-4 h-4" />
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Main Info Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">Trip Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-medium text-gray-900">{request.destination}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Estimated Cost</p>
              <p className="font-medium text-gray-900">${request.estimatedCost?.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Travel Dates</p>
              <p className="font-medium text-gray-900">
                {formatDate(request.startDate)} - {formatDate(request.endDate)}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{days} day{days !== 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Employee</p>
              <p className="font-medium text-gray-900">
                {request.employeeId?.firstName} {request.employeeId?.lastName}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{request.employeeId?.employeeId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purpose */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-3 mb-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
          <h2 className="font-bold text-gray-900 text-lg">Purpose of Travel</h2>
        </div>
        <p className="text-gray-700 leading-relaxed ml-8">{request.purpose}</p>
      </div>

      {/* Notes */}
      {request.notes && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
            <h2 className="font-bold text-gray-900 text-lg">Additional Notes</h2>
          </div>
          <p className="text-gray-700 leading-relaxed ml-8">{request.notes}</p>
        </div>
      )}

      {/* Employee & Department */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">Employee & Department</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              {request.employeeId?.firstName?.[0]}{request.employeeId?.lastName?.[0]}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {request.employeeId?.firstName} {request.employeeId?.lastName}
              </p>
              <p className="text-sm text-gray-500">{request.employeeId?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Building className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {request.departmentId?.name || 'No Department'}
              </p>
              <p className="text-sm text-gray-500">{request.departmentId?.code || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">Status Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Request Submitted</p>
              <p className="text-sm text-gray-500">{formatDate(request.createdAt)}</p>
            </div>
          </div>

          {request.status === 'approved' && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Approved</p>
                <p className="text-sm text-gray-500">Your request has been approved</p>
              </div>
            </div>
          )}

          {request.status === 'rejected' && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Rejected</p>
                <p className="text-sm text-gray-500">Your request was not approved</p>
              </div>
            </div>
          )}

          {['submitted', 'pending_approval'].includes(request.status) && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Awaiting Manager Approval</p>
                <p className="text-sm text-gray-500">Your request is being reviewed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelRequestDetails;
