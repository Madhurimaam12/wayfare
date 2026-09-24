import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  ArrowLeft,
  Save,
  Bell,
  Shield,
  Globe,
  Database,
  Mail,
  CheckCircle,
  Loader
} from 'lucide-react';

const AdminSettings = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const [settings, setSettings] = useState({
    general: {
      companyName: 'Wayfare Inc.',
      companyEmail: 'admin@wayfare.com',
      timezone: 'UTC-5 (Eastern Time)',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
    },
    notifications: {
      emailOnApproval: true,
      emailOnRejection: true,
      emailOnExpense: true,
      pushNotifications: false,
      weeklyDigest: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      ipWhitelisting: false,
    },
    email: {
      provider: 'SendGrid',
      apiKey: '••••••••••••••••',
      fromEmail: 'noreply@wayfare.com',
      fromName: 'Wayfare',
    },
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'email', label: 'Email', icon: Mail },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
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
          <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-gray-900 rounded-xl flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-500 text-sm">Configure platform behavior and preferences</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-800 font-medium">Settings saved successfully!</p>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
                    isActive
                      ? 'border-slate-700 text-slate-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={settings.general.companyName}
                  onChange={(e) => setSettings({ ...settings, general: { ...settings.general, companyName: e.target.value } })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                <input
                  type="email"
                  value={settings.general.companyEmail}
                  onChange={(e) => setSettings({ ...settings, general: { ...settings.general, companyEmail: e.target.value } })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => setSettings({ ...settings, general: { ...settings.general, timezone: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC+0 (London)</option>
                    <option>UTC+5:30 (India)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={settings.general.currency}
                    onChange={(e) => setSettings({ ...settings, general: { ...settings.general, currency: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>INR</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => {
                const labels = {
                  emailOnApproval: 'Email on Request Approval',
                  emailOnRejection: 'Email on Request Rejection',
                  emailOnExpense: 'Email on Expense Submission',
                  pushNotifications: 'Push Notifications',
                  weeklyDigest: 'Weekly Summary Digest',
                };
                return (
                  <div key={key} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900">{labels[key]}</p>
                      <p className="text-sm text-gray-500">
                        {value ? 'Currently enabled' : 'Currently disabled'}
                      </p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, notifications: { ...settings.notifications, [key]: !value } })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${value ? 'bg-slate-700' : 'bg-gray-300'}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      ></span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, security: { ...settings.security, twoFactor: !settings.security.twoFactor } })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${settings.security.twoFactor ? 'bg-slate-700' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.security.twoFactor ? 'translate-x-6' : 'translate-x-0'}`}></span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, security: { ...settings.security, sessionTimeout: parseInt(e.target.value) } })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                <input
                  type="number"
                  value={settings.security.passwordExpiry}
                  onChange={(e) => setSettings({ ...settings, security: { ...settings.security, passwordExpiry: parseInt(e.target.value) } })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
            </div>
          )}

          {/* Email Tab */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Provider</label>
                <select
                  value={settings.email.provider}
                  onChange={(e) => setSettings({ ...settings, email: { ...settings.email, provider: e.target.value } })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option>SendGrid</option>
                  <option>Amazon SES</option>
                  <option>Mailgun</option>
                  <option>Custom SMTP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <input
                  type="password"
                  value={settings.email.apiKey}
                  onChange={(e) => setSettings({ ...settings, email: { ...settings.email, apiKey: e.target.value } })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                  <input
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) => setSettings({ ...settings, email: { ...settings.email, fromEmail: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                  <input
                    type="text"
                    value={settings.email.fromName}
                    onChange={(e) => setSettings({ ...settings, email: { ...settings.email, fromName: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;