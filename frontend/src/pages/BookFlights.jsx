import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  ArrowLeft,
  Search,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  MapPin,
  Filter
} from 'lucide-react';

const BookFlights = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });

  // Demo flights
  const flights = [
    { id: 1, airline: 'Delta Airlines', flightNo: 'DL1234', from: 'Chicago (ORD)', to: 'New York (JFK)', depart: '08:00', arrive: '11:15', duration: '3h 15m', price: 450, class: 'Economy', stops: 0, seats: 12 },
    { id: 2, airline: 'United Airlines', flightNo: 'UA567', from: 'Chicago (ORD)', to: 'New York (JFK)', depart: '10:30', arrive: '13:45', duration: '3h 15m', price: 380, class: 'Economy', stops: 0, seats: 8 },
    { id: 3, airline: 'American Airlines', flightNo: 'AA890', from: 'Chicago (ORD)', to: 'New York (JFK)', depart: '14:00', arrive: '17:30', duration: '3h 30m', price: 520, class: 'Business', stops: 0, seats: 4 },
    { id: 4, airline: 'Delta Airlines', flightNo: 'DL2345', from: 'Chicago (ORD)', to: 'London (LHR)', depart: '18:00', arrive: '08:30+1', duration: '8h 30m', price: 1200, class: 'Economy', stops: 1, seats: 15 },
  ];

  const handleBook = (flight) => {
    alert(`Booking ${flight.airline} ${flight.flightNo} for $${flight.price}`);
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
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Book Flights</h1>
            <p className="text-gray-500 text-sm">Search and book flights for approved travel</p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search.from}
                onChange={(e) => setSearch({ ...search, from: e.target.value })}
                placeholder="Departure city"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search.to}
                onChange={(e) => setSearch({ ...search, to: e.target.value })}
                placeholder="Destination"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={search.date}
                onChange={(e) => setSearch({ ...search, date: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                min="1"
                value={search.passengers}
                onChange={(e) => setSearch({ ...search, passengers: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">Available Flights</h2>
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <div key={flight.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Flight Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Plane className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{flight.airline}</h3>
                    <p className="text-sm text-gray-500">{flight.flightNo} • {flight.class}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Departure</p>
                    <p className="font-bold text-gray-900 text-lg">{flight.depart}</p>
                    <p className="text-xs text-gray-500">{flight.from}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">{flight.duration}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <Plane className="w-3 h-3 text-gray-400" />
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Arrival</p>
                    <p className="font-bold text-gray-900 text-lg">{flight.arrive}</p>
                    <p className="text-xs text-gray-500">{flight.to}</p>
                  </div>
                </div>
              </div>

              {/* Price + Book */}
              <div className="flex flex-col items-end gap-3 lg:w-48">
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">${flight.price}</p>
                  <p className="text-xs text-gray-500">per passenger</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className={flight.seats < 10 ? 'text-red-600 font-medium' : 'text-gray-500'}>
                    {flight.seats} seats left
                  </span>
                </div>
                <button
                  onClick={() => handleBook(flight)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  <CheckCircle className="w-4 h-4" />
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookFlights;