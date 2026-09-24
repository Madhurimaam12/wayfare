import { Link } from 'react-router-dom';
import {
  Plane,
  Hotel,
  Car,
  CreditCard,
  BarChart3,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Briefcase,
  Globe,
  Award,
  TrendingUp,
  Zap,
  Lock
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Wayfare
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>Next-Gen Travel Management</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Simplify Corporate
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Travel Management
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Book flights, manage itineraries, track expenses, and automate approvals —
                all in one intelligent platform trusted by 500+ companies worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
                >
                  Sign In
                </Link>
              </div>
              <div className="flex items-center space-x-6 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Trusted by 500+ companies</p>
                </div>
              </div>
            </div>

            {/* Hero Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
                      <Plane className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Flight Booking</p>
                    <p className="text-xs text-gray-500">Smart & fast</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-3">
                      <Hotel className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Hotel Stays</p>
                    <p className="text-xs text-gray-500">Best rates</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-3">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Transport</p>
                    <p className="text-xs text-gray-500">Local & global</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-3">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Expenses</p>
                    <p className="text-xs text-gray-500">Auto-track</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {' '}Business Travel
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline your entire travel workflow from request to reimbursement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Plane className="w-6 h-6 text-blue-600" />,
                title: 'Smart Travel Booking',
                description:
                  'Create travel requests, manage itineraries, and get manager approvals in minutes.'
              },
              {
                icon: <CreditCard className="w-6 h-6 text-purple-600" />,
                title: 'Expense Management',
                description:
                  'Upload receipts, submit claims, and get reimbursed fast with automated policy checks.'
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-green-600" />,
                title: 'Analytics & Insights',
                description:
                  'Monitor spending, track policy compliance, and generate detailed reports.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Travel Requests', icon: <Briefcase className="w-8 h-8 mx-auto mb-3" /> },
              { number: '95%', label: 'Approval Rate', icon: <CheckCircle className="w-8 h-8 mx-auto mb-3" /> },
              { number: '500+', label: 'Companies', icon: <Users className="w-8 h-8 mx-auto mb-3" /> },
              { number: '4.8', label: 'User Rating', icon: <Star className="w-8 h-8 mx-auto mb-3" /> }
            ].map((stat, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/10"
              >
                {stat.icon}
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Create Request', desc: 'Submit your travel request with all details' },
              { step: '2', title: 'Get Approval', desc: 'Manager reviews and approves instantly' },
              { step: '3', title: 'Book Travel', desc: 'Coordinate flights, hotels & transport' },
              { step: '4', title: 'Reimburse', desc: 'Submit expenses and get reimbursed' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="w-6 h-6 text-blue-600" />, title: 'Policy Compliance', desc: 'Automated policy checks for every expense' },
              { icon: <Clock className="w-6 h-6 text-purple-600" />, title: 'Faster Approvals', desc: 'Reduce approval time from days to minutes' },
              { icon: <Globe className="w-6 h-6 text-green-600" />, title: 'Global Coverage', desc: 'Book travel anywhere in the world' },
              { icon: <TrendingUp className="w-6 h-6 text-orange-600" />, title: 'Cost Savings', desc: 'Average 15-20% cost reduction' },
              { icon: <Award className="w-6 h-6 text-red-600" />, title: 'Premium Support', desc: '24/7 dedicated support team' },
              { icon: <Lock className="w-6 h-6 text-indigo-600" />, title: 'Enterprise Security', desc: 'Bank-grade security for your data' }
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                  <p className="text-sm text-gray-500">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business Travel?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies already saving time and money with Wayfare
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Plane className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">Wayfare</span>
              </div>
              <p className="text-gray-400 text-sm">Corporate Travel Management Platform</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Product</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Company</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>2026 Wayfare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;