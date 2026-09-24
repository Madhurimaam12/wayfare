import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Receipt,
  DollarSign,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Send,
  Upload,
  X,
  Hotel,
  Car,
  Utensils,
  Package
} from 'lucide-react';

const NewExpense = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);

  const [formData, setFormData] = useState({
    category: 'accommodation',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    requestId: ''
  });

  const categories = [
    { value: 'accommodation', label: 'Accommodation', icon: Hotel, color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'transport', label: 'Transport', icon: Car, color: 'text-purple-600', bg: 'bg-purple-50' },
    { value: 'meals', label: 'Meals', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
    { value: 'miscellaneous', label: 'Miscellaneous', icon: Package, color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        setError('Only images and PDF files are allowed');
        return;
      }

      setReceiptFile(file);

      // Preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setReceiptPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setReceiptPreview('pdf');
      }
    }
  };

  const removeFile = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!formData.description.trim()) {
      setError('Please provide a description');
      return;
    }

    if (!receiptFile) {
      setError('Please upload a receipt');
      return;
    }

    setLoading(true);

    try {
      // Use FormData for file upload
      const data = new FormData();
      data.append('category', formData.category);
      data.append('amount', formData.amount);
      data.append('date', formData.date);
      data.append('description', formData.description);
      if (formData.requestId) data.append('requestId', formData.requestId);
      data.append('receipt', receiptFile);

      await api.post('/expenses', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess(true);
      setTimeout(() => navigate('/expenses'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Expense Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your expense claim has been sent to the finance team for review.
          </p>
          <p className="text-sm text-gray-500">Redirecting...</p>
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
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center">
            <Receipt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Submit Expense</h1>
            <p className="text-gray-500 text-sm">File an expense claim with receipt</p>
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

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Expense Category <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const isSelected = formData.category === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.value })}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 ${cat.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <CatIcon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <p className={`text-xs font-medium ${isSelected ? 'text-emerald-900' : 'text-gray-700'}`}>
                    {cat.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Amount + Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (USD) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expense Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Hotel stay at Marriott for 2 nights"
              rows="3"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              required
            />
          </div>
        </div>

        {/* Receipt Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Receipt <span className="text-red-500">*</span>
          </label>

          {!receiptFile ? (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="receipt-upload"
              />
              <label htmlFor="receipt-upload" className="cursor-pointer">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="font-medium text-gray-700 mb-1">Click to upload receipt</p>
                <p className="text-xs text-gray-500">PNG, JPG, or PDF (max 5MB)</p>
              </label>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              {receiptPreview === 'pdf' ? (
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
              ) : (
                <img
                  src={receiptPreview}
                  alt="Receipt"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{receiptFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(receiptFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
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
            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Expense
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewExpense;