import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Plane,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  User,
  Briefcase,
  DollarSign,
  MapPin,
  Shield,
  LogIn
} from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoAccounts = [
    { label: 'Admin', email: 'admin@wayfare.com', password: 'admin123', icon: Shield, color: 'from-slate-700 to-gray-900' },
    { label: 'Employee', email: 'john@wayfare.com', password: 'password123', icon: User, color: 'from-blue-600 to-indigo-600' },
    { label: 'Manager', email: 'mike@wayfare.com', password: 'password123', icon: Briefcase, color: 'from-amber-500 to-orange-600' },
    { label: 'Finance', email: 'sarah@wayfare.com', password: 'password123', icon: DollarSign, color: 'from-emerald-600 to-green-600' },
    { label: 'Coordinator', email: 'robert@wayfare.com', password: 'password123', icon: MapPin, color: 'from-blue-500 to-cyan-600' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (account) => {
    setError('');
    setLoading(true);
    setEmail(account.email);
    setPassword(account.password);

    try {
      await login(account.email, account.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -ml-40 -mb-40"></div>

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 text-white group">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 group-hover:scale-105 transition-transform">
              <Plane className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">Wayfare</span>
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Welcome back to
            <br />
            your travel hub
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">
            Manage travel requests, approvals, expenses, and reimbursements — all in one powerful platform.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              'Submit travel requests in seconds',
              'Get instant manager approvals',
              'Track expenses with receipts',
              'Generate powerful reports'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-blue-50">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-blue-200 text-sm">
          Trusted by 500+ companies worldwide
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Wayfare
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in to your account</h2>
            <p className="text-gray-600">Enter your credentials to access your dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-800 text-sm">Login failed</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
              Create one
            </Link>
          </p>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quick Demo Login
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {demoAccounts.map((account, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleDemoLogin(account)}
                  disabled={loading}
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                  title={`Login as ${account.label}`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${account.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <account.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {account.label}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Click any button to instantly log in as that role
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;