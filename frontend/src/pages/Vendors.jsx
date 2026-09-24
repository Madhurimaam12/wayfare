import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  ArrowLeft,
  Plane,
  Hotel,
  Car,
  Phone,
  Mail,
  Globe,
  Search,
  Star,
  Plus
} from 'lucide-react';

const Vendors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const vendors = [
    { id: 1, name: 'Delta Airlines', type: 'airline', contact: 'John Smith', phone: '1-800-123-4567', email: 'bookings@delta.com', website: 'delta.com', rating: 4.5, active: true, contract: 'Enterprise' },
    { id: 2, name: 'United Airlines', type: 'airline', contact: 'Sarah Johnson', phone: '1-800-234-5678', email: 'corporate@united.com', website: 'united.com', rating: 4.3, active: true, contract: 'Enterprise' },
    { id: 3, name: 'Marriott Hotels', type: 'hotel', contact: 'Mike Davis', phone: '1-800-345-6789', email: 'corp@marriott.com', website: 'marriott.com', rating: 4.7, active: true, contract: 'Preferred Partner' },
    { id: 4, name: 'Hilton Hotels', type: 'hotel', contact: 'Emily Wilson', phone: '1-800-456-7890', email: 'business@hilton.com', website: 'hilton.com', rating: 4.6, active: true, contract: 'Preferred Partner' },
    { id: 5, name: 'Uber Business', type: 'transport', contact: 'Support Team', phone: '1-888-987-6543', email: 'business@uber.com', website: 'uber.com/business', rating: 4.4, active: true, contract: 'Enterprise' },
    { id: 6, name: 'Hertz Rentals', type: 'transport', contact: 'Tom Brown', phone: '1-800-654-3131', email: 'corporate@hertz.com', website: 'hertz.com', rating: 4.2, active: true, contract: 'Corporate' },
    { id: 7, name: 'Avis Rentals', type: 'transport', contact: 'Lisa Anderson', phone: '1-800-230-4898', email: 'corp@avis.com', website: 'avis.com', rating: 4.1, active: false, contract: 'Corporate' },
  ];

  const getTypeIcon = (type) => {
    const icons = { airline: Plane, hotel: Hotel, transport: Car };
    return icons[type] || Building;
  };

  const getTypeColor = (type) => {
    const colors = {
      airline: 'from-blue-600 to-indigo-600',
      hotel: 'from-purple-600 to-pink-600',
      transport: 'from-emerald-600 to-green-600',
    };
    return colors[type] || 'from-gray-600 to-slate-600';
  };

  const filtered = vendors.filter(v => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = v.name.toLowerCase().includes(search) ||
                          v.contact.toLowerCase().includes(search) ||
                          v.email.toLowerCase().includes(search);
    const matchesType = typeFilter === 'all' || v.type === typeFilter;
    return matchesSearch && matchesType;
  });

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
            <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-gray-900 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
              <p className="text-gray-500 text-sm">Manage vendor relationships and contracts</p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all font-medium">
            <Plus className="w-5 h-5" />
            Add Vendor
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Vendors</p>
          <p className="text-2xl font-bold text-gray-900">{vendors.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Airlines</p>
          <p className="text-2xl font-bold text-blue-600">{vendors.filter(v => v.type === 'airline').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Hotels</p>
          <p className="text-2xl font-bold text-purple-600">{vendors.filter(v => v.type === 'hotel').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Transport</p>
          <p className="text-2xl font-bold text-emerald-600">{vendors.filter(v => v.type === 'transport').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="all">All Types</option>
            <option value="airline">Airlines</option>
            <option value="hotel">Hotels</option>
            <option value="transport">Transport</option>
          </select>
        </div>
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((vendor) => {
          const TypeIcon = getTypeIcon(vendor.type);
          return (
            <div key={vendor.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getTypeColor(vendor.type)} text-white`}>
                  <TypeIcon className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">{vendor.rating}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{vendor.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize bg-gradient-to-r ${getTypeColor(vendor.type)} text-white`}>
                    {vendor.type}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${vendor.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {vendor.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span>{vendor.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{vendor.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{vendor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span>{vendor.website}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Contract</p>
                  <p className="text-sm font-medium text-gray-900">{vendor.contract}</p>
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors">
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vendors;