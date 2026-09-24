import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';

const BookTransport = () => {
  const navigate = useNavigate();
  const [transportType, setTransportType] = useState('airport');

  const transportOptions = [
    { id: 1, type: 'airport', provider: 'Uber Business', vehicle: 'Sedan', capacity: 4, price: 45, eta: '5 min', from: 'Airport', to: 'Hotel' },
    { id: 2, type: 'airport', provider: 'Lyft Business', vehicle: 'SUV', capacity: 6, price: 65, eta: '8 min', from: 'Airport', to: 'Hotel' },
    { id: 3, type: 'car-rental', provider: 'Hertz', vehicle: 'Toyota Camry', capacity: 5, price: 85, eta: 'Pickup', from: 'Airport', to: 'Daily Rental' },
    { id: 4, type: 'car-rental', provider: 'Enterprise', vehicle: 'Honda Accord', capacity: 5, price: 75, eta: 'Pickup', from: 'Airport', to: 'Daily Rental' },
    { id: 5, type: 'transfer', provider: 'Blacklane', vehicle: 'Business Class', capacity: 4, price: 120, eta: 'Scheduled', from: 'Hotel', to: 'Client Office' },
  ];

  const filtered = transportOptions.filter(t => t.type === transportType);

  const handleBook = (option) => {
    alert(`Booking ${option.provider} - ${option.vehicle}`);
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
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Book Transport</h1>
            <p className="text-gray-500 text-sm">Arrange ground transportation for travelers</p>
          </div>
        </div>
      </div>

      {/* Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { id: 'airport', label: 'Airport Transfer', desc: 'Airport to hotel pickup', icon: MapPin, gradient: 'from-blue-600 to-indigo-600' },
          { id: 'car-rental', label: 'Car Rental', desc: 'Self-drive rentals', icon: Car, gradient: 'from-emerald-600 to-green-600' },
          { id: 'transfer', label: 'City Transfer', desc: 'Point-to-point service', icon: MapPin, gradient: 'from-purple-600 to-pink-600' },
        ].map((type) => {
          const Icon = type.icon;
          const isActive = transportType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setTransportType(type.id)}
              className={`p-5 rounded-2xl text-left transition-all border-2 ${
                isActive
                  ? `border-transparent bg-gradient-to-r ${type.gradient} text-white shadow-lg`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                isActive ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <h3 className={`font-bold mb-1 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                {type.label}
              </h3>
              <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                {type.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Options */}
      <div className="space-y-4">
        {filtered.map((option) => (
          <div key={option.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Car className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{option.provider}</h3>
                  <p className="text-sm text-gray-600 mb-2">{option.vehicle}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {option.capacity} passengers
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {option.eta}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {option.from} → {option.to}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:w-64 justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">${option.price}</p>
                  <p className="text-xs text-gray-500">
                    {option.type === 'car-rental' ? 'per day' : 'one-way'}
                  </p>
                </div>
                <button
                  onClick={() => handleBook(option)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  <CheckCircle className="w-4 h-4" />
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTransport;