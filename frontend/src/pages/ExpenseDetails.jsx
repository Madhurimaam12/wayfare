import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Receipt,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  User,
  Hotel,
  Car,
  Utensils,
  Package,
  Loader,
  Download
} from 'lucide-react';

const ExpenseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpense();
  }, [id]);

  const fetchExpense = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/expenses/${id}`);
      setExpense(response.data.data);
    } catch (err) {
      // Demo
      setExpense({
        _id: id,
        category: 'accommodation',
        amount: 750,
        date: '2026-09-15',
        description: 'Hotel stay at Marriott - 3 nights for client meeting',
        status: 'approved',
        receiptUrl: '/uploads/receipts/demo-receipt.jpg',
        createdAt: '2026-09-16',
        employeeId: { firstName: 'John', lastName: 'Doe', email: 'john@wayfare.com' },
        reviewComments: 'All receipts verified. Approved for reimbursement.',
        reimbursedDate: '2026-09-22'
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (cat) => {
    const icons = { accommodation: Hotel, transport: Car, meals: Utensils, miscellaneous: Package };
    return icons[cat] || Package;
  };

  const getStatusConfig = (status) => {
    const configs = {
      submitted: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending Review' },
      under_review: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Under Review' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Rejected' },
      reimbursed: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle, label: 'Reimbursed' },
    };
    return configs[status] || configs.submitted;
  };

  const formatDate = (d) => {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!expense) return <div className="p-6">Not found</div>;

  const CatIcon = getCategoryIcon(expense.category);
  const cfg = getStatusConfig(expense.status);
  const StatusIcon = cfg.icon;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/expenses')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Expenses
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-xl p-8 mb-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <CatIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold capitalize mb-1">{expense.category} Expense</h1>
              <p className="text-emerald-100 text-sm">Expense #{expense._id?.slice(-8)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-emerald-100 text-sm mb-1">Amount</p>
            <p className="text-4xl font-bold">${expense.amount?.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className={`mb-6 p-4 rounded-xl border flex items-center justify-between ${cfg.bg} ${cfg.text} border-current/20`}>
        <div className="flex items-center gap-3">
          <StatusIcon className="w-6 h-6" />
          <div>
            <p className="font-semibold">{cfg.label}</p>
            <p className="text-xs opacity-80">Current status</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Expense Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-900">{formatDate(expense.date)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium text-gray-900">${expense.amount?.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium text-gray-900">{expense.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Submitted By</h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center text-white font-bold">
              {expense.employeeId?.firstName?.[0]}{expense.employeeId?.lastName?.[0]}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {expense.employeeId?.firstName} {expense.employeeId?.lastName}
              </p>
              <p className="text-sm text-gray-500">{expense.employeeId?.email}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Submitted</p>
            <p className="font-medium text-gray-900">{formatDate(expense.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Receipt */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Receipt</h2>
          <button className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 bg-gray-50 text-center">
          <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Receipt image preview</p>
          <p className="text-xs text-gray-400 mt-1">{expense.receiptUrl}</p>
        </div>
      </div>

      {/* Reviewer Comments */}
      {expense.reviewComments && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Reviewer Comments</h2>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-700">{expense.reviewComments}</p>
          </div>
        </div>
      )}

      {/* Reimbursement */}
      {expense.reimbursedDate && (
        <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8" />
            <div>
              <p className="font-semibold text-lg">Reimbursed</p>
              <p className="text-blue-100 text-sm">
                Amount ${expense.amount?.toLocaleString()} was reimbursed on {formatDate(expense.reimbursedDate)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDetails;