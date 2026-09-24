import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ArrowLeft,
  Plane,
  Hotel,
  Car,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  DollarSign
} from 'lucide-react';

const Bookings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const bookings = [
    { id: 1, type: 'flight', employee: 'John Doe', provider: 'Delta Airlines', details: 'ORD → JFK, DL1234', date: '2026-10-15', cost: 450, status: 'confirmed', reference: 'ABC123' },
    { id: 2, type: 'hotel', employee: 'John Doe', provider: 'Marriott Downtown', details: 'Deluxe King, 3 nights', date: '2026-10-15', cost: 750, status: 'confirmed', reference: 'HTL456' },
    { id: 3, type: 'transport', employee: 'John Doe', provider: 'Uber Business', details: 'Airport transfer', date: '2026-10-15', cost: 45, status: 'confirmed', reference: 'UBR789' },
    { id: 4, type: 'flight', employee: 'Jane Smith', provider: 'United Airlines', details: 'ORD → LAX, UA567', date: '2026-10-20', cost: 380, status: 'pending', reference: 'PENDING' },
    { id: 5, type: 'hotel', employee: 'Jane Smith', provider: 'Hilton Garden', details: 'Standard Queen, 2 nights', date: '2026-10-20', cost: 440, status: 'pending', reference: 'PENDING' },
    { id: 6, type: 'flight', employee: 'Bob Wilson', provider: 'American Airlines', details: 'ORD → LHR, AA890', date: '2026-11-01', cost: 1200, status: 'cancelled', reference: 'CANCEL123' },
  ];

  const getTypeIcon = (type) => {
    const icons = { flight: Plane, hotel: Hotel, transport: Car };
    return icons[type] || Plane;
  };

  const getTypeColor = (type) => {
    const colors = {
      flight: 'bg-blue-100 text-blue-800',
      hotel: 'bg-purple-100 text-purple-800',
      transport: 'bg-emerald-100 text-emerald-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
    };
    return configs[status] || configs.pending;
  };

  const filtered = bookings.filter(b => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = b.employee.toLowerCase().includes(search) ||
                          b.provider.toLowerCase().includes(search) ||
                          b.details.toLowerCase().includes(search);
    const matchesType = typeFilter === 'all' || b.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    totalCost: bookings.filter(b => b.status === 'confirmed').reduce((s, b) => s + b.cost, 0),
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

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Bookings</h1>
            <p className="text-gray-500 text-sm">Manage all travel bookings</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Confirmed</p>
          <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
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
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="flight">Flights</option>
            <option value="hotel">Hotels</option>
            <option value="transport">Transport</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filtered.map((booking) => {
          const TypeIcon = getTypeIcon(booking.type);
          const cfg = getStatusConfig(booking.status);
          const StatusIcon = cfg.icon;

          return (
            <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(booking.type)}`}>
                    <TypeIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{booking.provider}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${getTypeColor(booking.type)}`}>
                        {booking.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{booking.employee}</p>
                    <p className="text-xs text-gray-500">{booking.details}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                  <div className="text-sm">
                    <p className="text-xs text-gray-500 mb-0.5">Date</p>
                    <p className="font-medium text-gray-900">{new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-xs text-gray-500 mb-0.5">Ref</p>
                    <p className="font-mono text-xs text-gray-700">{booking.reference}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-0.5">Cost</p>
                    <p className="font-bold text-gray-900">${booking.cost}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookings;