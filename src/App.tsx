import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import MandiPrices from './pages/MandiPrices';

function App() {
  const { user, profile, loading } = useAuth();
  const path = window.location.pathname;

  useEffect(() => {
    if (!loading && user && profile) {
      if (path === '/login' || path === '/signup' || path === '/forgot-password' || path === '/') {
        if (profile.role === 'farmer') {
          window.history.pushState({}, '', '/farmer-dashboard');
        } else {
          window.history.pushState({}, '', '/buyer-dashboard');
        }
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  }, [user, profile, loading, path]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && path !== '/signup' && path !== '/forgot-password') {
    if (path === '/signup') {
      return <Signup />;
    }
    if (path === '/forgot-password') {
      return <ForgotPassword />;
    }
    return <Login />;
  }

  if (!user && path === '/signup') {
    return <Signup />;
  }

  if (!user && path === '/forgot-password') {
    return <ForgotPassword />;
  }

  if (path === '/mandi-prices') {
    return <MandiPrices />;
  }

  if (profile?.role === 'farmer') {
    return <FarmerDashboard />;
  }

  if (profile?.role === 'buyer') {
    return <BuyerDashboard />;
  }

  return <Login />;
}

export default App;
