import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  Users,
  Mail,
  Building,
  ArrowLeft,
  Search,
  Briefcase,
  Loader,
  UserCheck,
  AlertCircle
} from 'lucide-react';

const ManagerTeamPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      
      // Filter to show only users in the same department (or all if you want)
      const allUsers = response.data.data || [];
      
      // For manager: show team members (same department, excluding self)
      const teamMembers = allUsers.filter(
        u => u._id !== user?.id && 
             (u.departmentId?._id === user?.departmentId?._id || 
              u.departmentId === user?.departmentId?._id)
      );
      
      setTeam(teamMembers.length > 0 ? teamMembers : allUsers);
    } catch (err) {
      // If API fails, use fallback demo data
      console.warn('API failed, using demo data');
      setTeam([
        {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@wayfare.com',
          role: 'employee',
          employeeId: 'EMP001',
          departmentId: { name: 'Engineering', code: 'ENG' },
          isActive: true
        },
        {
          _id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@wayfare.com',
          role: 'employee',
          employeeId: 'EMP002',
          departmentId: { name: 'Engineering', code: 'ENG' },
          isActive: true
        },
        {
          _id: '3',
          firstName: 'Bob',
          lastName: 'Wilson',
          email: 'bob@wayfare.com',
          role: 'employee',
          employeeId: 'EMP003',
          departmentId: { name: 'Engineering', code: 'ENG' },
          isActive: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeam = team.filter(member => {
    const search = searchTerm.toLowerCase();
    return (
      member.firstName?.toLowerCase().includes(search) ||
      member.lastName?.toLowerCase().includes(search) ||
      member.email?.toLowerCase().includes(search) ||
      member.employeeId?.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

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
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Team</h1>
              <p className="text-gray-500 text-sm">
                {team.length} team member{team.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Team Grid */}
      {filteredTeam.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No Team Members Found</h3>
          <p className="text-gray-500 text-sm">
            {searchTerm ? 'Try a different search term' : 'Your team is empty'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeam.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
            >
              {/* Avatar + Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                    {member.firstName?.[0]}{member.lastName?.[0]}
                  </div>
                  <span
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                      member.isActive ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  ></span>
                </div>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
                  {member.role?.replace('_', ' ')}
                </span>
              </div>

              {/* Name + Info */}
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {member.firstName} {member.lastName}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span>{member.employeeId || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span>{member.departmentId?.name || 'No Department'}</span>
                </div>
              </div>

              {/* Status */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Status</span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    member.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {member.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerTeamPage;