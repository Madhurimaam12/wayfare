import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { travelAPI } from '../services/api';
import {
  Plane,
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Send
} from 'lucide-react';

const NewTravelRequest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    travelType: 'domestic',
    destination: '',
    purpose: '',
    startDate: '',
    endDate: '',
    estimatedCost: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.destination || !formData.purpose || !formData.startDate || !formData.endDate || !formData.estimatedCost) {
      setError('Please fill in all required fields');
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError('End date must be after start date');
      return;
    }

    setLoading(true);

    try {
      await travelAPI.create({
        ...formData,
        estimatedCost: parseFloat(formData.estimatedCost)
      });
      setSuccess(true);
      setTimeout(() => navigate('/travel/requests'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const days = calculateDays();

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your travel request has been sent to your manager for approval.
          </p>
          <p className="text-sm text-gray-500">Redirecting to your requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Travel Request</h1>
            <p className="text-gray-500 text-sm">Submit a request for business travel</p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-800 text-sm">Error</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Travel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Travel Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, travelType: 'domestic' })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                formData.travelType === 'domestic'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className={`w-5 h-5 ${formData.travelType === 'domestic' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">Domestic</span>
              </div>
              <p className="text-xs text-gray-500">Within the country</p>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, travelType: 'international' })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                formData.travelType === 'international'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Plane className={`w-5 h-5 ${formData.travelType === 'international' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">International</span>
              </div>
              <p className="text-xs text-gray-500">Outside the country</p>
            </button>
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., New York City, NY"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purpose of Travel <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="e.g., Client meeting with ABC Corporation"
              rows="3"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Duration display */}
        {days > 0 && (
          <div className="p-3 bg-blue-50 rounded-xl text-sm text-blue-800">
            <span className="font-medium">Duration:</span> {days} {days === 1 ? 'day' : 'days'}
          </div>
        )}

        {/* Estimated Cost */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Cost (USD) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              name="estimatedCost"
              value={formData.estimatedCost}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional information for your manager..."
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Request
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTravelRequest;