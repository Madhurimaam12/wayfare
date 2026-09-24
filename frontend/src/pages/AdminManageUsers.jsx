import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showExportMenu } from '../utils/exportUtils';
import api from '../services/api';
import {
  Users, Search, Plus, Mail, Building, Shield, Hash, Loader, ArrowLeft,
  Edit3, Trash2, X, CheckCircle, Download
} from 'lucide-react';

const AdminManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Add user form
  const [newUser, setNewUser] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'employee'
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const demoUsers = [
    { _id: 'u1', employeeId: 'ADMIN001', firstName: 'Admin', lastName: 'User', email: 'admin@wayfare.com', role: 'admin', isActive: true, departmentId: { name: 'Engineering', code: 'ENG' } },
    { _id: 'u2', employeeId: 'EMP001', firstName: 'John', lastName: 'Doe', email: 'john@wayfare.com', role: 'employee', isActive: true, departmentId: { name: 'Engineering', code: 'ENG' } },
    { _id: 'u3', employeeId: 'MGR001', firstName: 'Mike', lastName: 'Johnson', email: 'mike@wayfare.com', role: 'manager', isActive: true, departmentId: { name: 'Engineering', code: 'ENG' } },
    { _id: 'u4', employeeId: 'FIN001', firstName: 'Sarah', lastName: 'Williams', email: 'sarah@wayfare.com', role: 'finance_officer', isActive: true, departmentId: { name: 'Finance', code: 'FIN' } },
    { _id: 'u5', employeeId: 'COORD001', firstName: 'Robert', lastName: 'Brown', email: 'robert@wayfare.com', role: 'travel_coordinator', isActive: true, departmentId: { name: 'Engineering', code: 'ENG' } },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      const data = response.data.data || [];
      setUsers(data.length > 0 ? data : demoUsers);
    } catch (err) {
      setUsers(demoUsers);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await api.post('/auth/register', newUser);
      await fetchUsers();
      setShowAddModal(false);
      setNewUser({ employeeId: '', firstName: '', lastName: '', email: '', password: '', role: 'employee' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user');
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'bg-slate-100 text-slate-800',
      manager: 'bg-amber-100 text-amber-800',
      finance_officer: 'bg-emerald-100 text-emerald-800',
      travel_coordinator: 'bg-blue-100 text-blue-800',
      employee: 'bg-blue-100 text-blue-800',
    };
    return badges[role] || badges.employee;
  };

  const filtered = users.filter((u) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      u.firstName?.toLowerCase().includes(search) ||
      u.lastName?.toLowerCase().includes(search) ||
      u.email?.toLowerCase().includes(search) ||
      u.employeeId?.toLowerCase().includes(search);
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
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
            <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-gray-900 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
              <p className="text-gray-500 text-sm">{users.length} users in the system</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
  <button
    onClick={() => showExportMenu(
      filtered,
      'users-list',
      [
        { key: 'employeeId', label: 'Employee ID' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'departmentId', label: 'Department' },
      ],
      'Users Report'
    )}
    className="flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
  >
    <Download className="w-5 h-5" />
    Export
  </button>
  <button
    onClick={() => setShowAddModal(true)}
    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all font-medium"
  >
    <Plus className="w-5 h-5" />
    Add User
  </button>
</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="finance_officer">Finance</option>
            <option value="travel_coordinator">Coordinator</option>
            <option value="employee">Employee</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">User</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Employee ID</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Role</th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-gray-900 flex items-center justify-center text-white text-sm font-bold">
                        {u.firstName?.[0]}{u.lastName?.[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{u.firstName} {u.lastName}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{u.employeeId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {u.departmentId?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getRoleBadge(u.role)}`}>
                      {u.role?.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${u.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New User</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                <input
                  type="text"
                  value={newUser.employeeId}
                  onChange={(e) => setNewUser({ ...newUser, employeeId: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="finance_officer">Finance Officer</option>
                  <option value="travel_coordinator">Travel Coordinator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-slate-700 to-gray-900 text-white rounded-xl hover:shadow-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageUsers;