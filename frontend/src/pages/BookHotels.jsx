import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Hotel,
  ArrowLeft,
  Search,
  Calendar,
  Users,
  MapPin,
  Star,
  CheckCircle,
  Wifi,
  Coffee,
  Car,
  Dumbbell
} from 'lucide-react';

const BookHotels = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const hotels = [
    { id: 1, name: 'Marriott Downtown', location: 'New York, NY', rating: 4.7, reviews: 1243, price: 250, distance: '0.5 mi from center', amenities: ['wifi', 'breakfast', 'gym', 'parking'], roomType: 'Deluxe King', available: 5 },
    { id: 2, name: 'Hilton Garden Inn', location: 'New York, NY', rating: 4.5, reviews: 892, price: 220, distance: '1.2 mi from center', amenities: ['wifi', 'breakfast', 'gym'], roomType: 'Standard Queen', available: 8 },
    { id: 3, name: 'The Ritz Carlton', location: 'New York, NY', rating: 4.9, reviews: 2156, price: 480, distance: '0.2 mi from center', amenities: ['wifi', 'breakfast', 'gym', 'parking', 'spa'], roomType: 'Executive Suite', available: 3 },
    { id: 4, name: 'Holiday Inn Express', location: 'New York, NY', rating: 4.2, reviews: 634, price: 180, distance: '2.5 mi from center', amenities: ['wifi', 'breakfast'], roomType: 'Standard King', available: 12 },
  ];

  const amenityIcons = { wifi: Wifi, breakfast: Coffee, gym: Dumbbell, parking: Car };

  const handleBook = (hotel) => {
    alert(`Booking ${hotel.name} for $${hotel.price}/night`);
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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <Hotel className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Book Hotels</h1>
            <p className="text-gray-500 text-sm">Reserve accommodations for approved travel</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search.destination}
                onChange={(e) => setSearch({ ...search, destination: e.target.value })}
                placeholder="City or hotel name"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
            <input
              type="date"
              value={search.checkIn}
              onChange={(e) => setSearch({ ...search, checkIn: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
            <input
              type="date"
              value={search.checkOut}
              onChange={(e) => setSearch({ ...search, checkOut: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Hotels */}
      <div className="space-y-4">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Hotel Image Placeholder */}
              <div className="w-full lg:w-64 h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Hotel className="w-16 h-16 text-purple-400" />
              </div>

              {/* Hotel Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-1">{hotel.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {hotel.location}
                      </div>
                      <span>•</span>
                      <span>{hotel.distance}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-purple-900">{hotel.rating}</span>
                    <span className="text-xs text-purple-600">({hotel.reviews})</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">{hotel.roomType}</p>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity] || Wifi;
                      return (
                        <span key={amenity} className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700 capitalize">
                          <Icon className="w-3 h-3" />
                          {amenity}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <p className={`text-xs font-medium ${hotel.available < 5 ? 'text-red-600' : 'text-green-600'}`}>
                  {hotel.available} rooms available
                </p>
              </div>

              {/* Price + Book */}
              <div className="flex flex-col items-end justify-between lg:w-48">
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">${hotel.price}</p>
                  <p className="text-xs text-gray-500">per night</p>
                </div>
                <button
                  onClick={() => handleBook(hotel)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium mt-4"
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

export default BookHotels;