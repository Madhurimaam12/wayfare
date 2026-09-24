import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// ============ PUBLIC PAGES ============
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// ============ DASHBOARDS ============
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import FinanceDashboard from './pages/FinanceDashboard';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import AdminDashboard from './pages/AdminDashboard';

// ============ TRAVEL & EXPENSE FEATURES ============
import NewTravelRequest from './pages/NewTravelRequest';
import MyTravelRequests from './pages/MyTravelRequests';
import TravelRequestDetails from './pages/TravelRequestDetails';
import NewExpense from './pages/NewExpense';
import MyExpenses from './pages/MyExpenses';
import ExpenseDetails from './pages/ExpenseDetails';
import ProfilePage from './pages/ProfilePage';

// ============ MANAGER PAGES ============
import ManagerTeamPage from './pages/ManagerTeamPage';
import ManagerReportsPage from './pages/ManagerReportsPage';
import ManagerApprovalsPage from './pages/ManagerApprovalsPage';

// ============ FINANCE PAGES ============
import FinanceAnalytics from './pages/FinanceAnalytics';
import FinanceAuditLog from './pages/FinanceAuditLog';

// ============ COORDINATOR PAGES ============
import BookFlights from './pages/BookFlights';
import BookHotels from './pages/BookHotels';
import BookTransport from './pages/BookTransport';
import Bookings from './pages/Bookings';
import Vendors from './pages/Vendors';

// ============ ADMIN PAGES ============
import AdminManageUsers from './pages/AdminManageUsers';
import AdminDepartments from './pages/AdminDepartments';
import AdminPolicies from './pages/AdminPolicies';
import AdminSystemReports from './pages/AdminSystemReports';
import AdminSettings from './pages/AdminSettings';
import AdminAuditLog from './pages/AdminAuditLog';

// ============ LAYOUT ============
import Layout from './components/common/Layout';

// ============ LOADING SCREEN ============
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

// ============ ROLE-BASED DASHBOARD ============
const RoleDashboard = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'finance_officer':
      return <FinanceDashboard />;
    case 'travel_coordinator':
      return <CoordinatorDashboard />;
    case 'employee':
    default:
      return <EmployeeDashboard />;
  }
};

// ============ PROTECTED ROUTE ============
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" />;
  return children;
};

// ============ PUBLIC ROUTE (redirects logged-in users) ============
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ============ PUBLIC ROUTES ============ */}
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* ============ PROTECTED ROUTES (with Layout) ============ */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* ============ DASHBOARD ============ */}
            <Route path="/dashboard" element={<RoleDashboard />} />

            {/* ============ TRAVEL REQUEST ROUTES ============ */}
            <Route path="/travel/new" element={<NewTravelRequest />} />
            <Route path="/travel/requests" element={<MyTravelRequests />} />
            <Route path="/travel/requests/:id" element={<TravelRequestDetails />} />
            <Route path="/travel-requests" element={<MyTravelRequests />} />

            {/* ============ EXPENSE ROUTES ============ */}
            <Route path="/expenses" element={<MyExpenses />} />
            <Route path="/expenses/new" element={<NewExpense />} />
            <Route path="/expenses/:id" element={<ExpenseDetails />} />

            {/* ============ PROFILE ============ */}
            <Route path="/profile" element={<ProfilePage />} />

            {/* ============ REPORTS (shared) ============ */}
            <Route path="/reports" element={<ManagerReportsPage />} />

            {/* ============ MANAGER ROUTES ============ */}
            <Route path="/manager/team" element={<ManagerTeamPage />} />
            <Route path="/manager/reports" element={<ManagerReportsPage />} />
            <Route path="/manager/approvals" element={<ManagerApprovalsPage />} />
            <Route path="/team" element={<ManagerTeamPage />} />

            {/* ============ FINANCE OFFICER ROUTES ============ */}
            <Route path="/finance/reports" element={<ManagerReportsPage />} />
            <Route path="/finance/analytics" element={<FinanceAnalytics />} />
            <Route path="/finance/audit" element={<FinanceAuditLog />} />

            {/* ============ COORDINATOR ROUTES ============ */}
            <Route path="/coordinator/flights" element={<BookFlights />} />
            <Route path="/coordinator/hotels" element={<BookHotels />} />
            <Route path="/coordinator/transport" element={<BookTransport />} />
            <Route path="/coordinator/bookings" element={<Bookings />} />
            <Route path="/coordinator/vendors" element={<Vendors />} />

            {/* ============ ADMIN ROUTES ============ */}
            <Route path="/admin/users" element={<AdminManageUsers />} />
            <Route path="/admin/departments" element={<AdminDepartments />} />
            <Route path="/admin/policies" element={<AdminPolicies />} />
            <Route path="/admin/reports" element={<AdminSystemReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/audit" element={<AdminAuditLog />} />
          </Route>

          {/* ============ CATCH ALL ============ */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;