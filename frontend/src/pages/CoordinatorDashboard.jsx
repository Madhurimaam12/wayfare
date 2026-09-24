import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  Hotel,
  Car,
  Calendar,
  Phone,
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const CoordinatorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Flights to Book', value: '5', change: 'Pending bookings', Icon: Plane, bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Hotels to Book', value: '3', change: 'Awaiting booking', Icon: Hotel, bg: 'bg-purple-50', text: 'text-purple-600' },
    { label: 'Transfers', value: '4', change: 'Local transport', Icon: Car, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: "Today's Travel", value: '6', change: 'Active trips', Icon: Calendar, bg: 'bg-amber-50', text: 'text-amber-600' },
  ];

  const pendingBookings = [
    { id: 1, employee: 'John Doe', destination: 'New York', type: 'Flight', date: 'Jan 15, 2024', details: 'ORD → JFK', cost: '$450' },
    { id: 2, employee: 'Jane Smith', destination: 'Los Angeles', type: 'Hotel', date: 'Jan 20, 2024', details: 'Marriott, 2 nights', cost: '$500' },
    { id: 3, employee: 'Bob Wilson', destination: 'Chicago', type: 'Transport', date: 'Feb 1, 2024', details: 'Airport transfer', cost: '$45' },
    { id: 4, employee: 'Alice Brown', destination: 'London', type: 'Flight', date: 'Feb 10, 2024', details: 'ORD → LHR', cost: '$1,200' },
    { id: 5, employee: 'Chris Davis', destination: 'Seattle', type: 'Hotel', date: 'Feb 20, 2024', details: 'Hilton, 3 nights', cost: '$750' },
  ];

  const vendors = [
    { name: 'Delta Airlines', type: 'Airlines', contact: '1-800-123-4567', Icon: Plane, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Marriott Hotels', type: 'Hotels', contact: '1-800-765-4321', Icon: Hotel, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Uber Business', type: 'Transport', contact: '1-888-987-6543', Icon: Car, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Hertz Rentals', type: 'Car Rental', contact: '1-800-654-3131', Icon: Car, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const handleBook = (id, type) => {
    alert(`Booking ${type} for request #${id}`);
    // TODO: Connect to API
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Flight': return Plane;
      case 'Hotel': return Hotel;
      case 'Transport': return Car;
      default: return Plane;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Flight': return 'bg-blue-100 text-blue-800';
      case 'Hotel': return 'bg-purple-100 text-purple-800';
      case 'Transport': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Travel Operations, {user?.firstName}!
              </h1>
              <p className="text-gray-500">Travel Coordinator Dashboard</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                <stat.Icon className={`w-6 h-6 ${stat.text}`} />
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate('/coordinator/flights')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <Plane className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">Book Flights</h3>
            <p className="text-blue-100 text-sm">Search and reserve flights</p>
          </button>

          <button
            onClick={() => navigate('/coordinator/hotels')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <Hotel className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">Book Hotels</h3>
            <p className="text-purple-100 text-sm">Reserve accommodations</p>
          </button>

          <button
            onClick={() => navigate('/coordinator/transport')}
            className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <Car className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">Transport Booking</h3>
            <p className="text-emerald-100 text-sm">Cabs, rentals, transfers</p>
          </button>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-gray-900 text-lg">Pending Bookings</h2>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                {pendingBookings.length} pending
              </span>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {pendingBookings.map((booking) => {
              const TypeIcon = getTypeIcon(booking.type);
              return (
                <div key={booking.id} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Employee Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(booking.type)}`}>
                        <TypeIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{booking.employee}</p>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(booking.type)}`}>
                            {booking.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {booking.destination} • {booking.details}
                        </p>
                      </div>
                    </div>

                    {/* Date & Cost */}
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs">Date</p>
                        <p className="font-medium text-gray-900">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Cost</p>
                        <p className="font-medium text-gray-900">{booking.cost}</p>
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => handleBook(booking.id, booking.type)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vendor Quick Contacts */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Vendor Quick Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vendors.map((vendor, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className={`w-10 h-10 ${vendor.bg} rounded-lg flex items-center justify-center`}>
                  <vendor.Icon className={`w-5 h-5 ${vendor.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{vendor.name}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Phone className="w-3 h-3" />
                    <span className="truncate">{vendor.contact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;