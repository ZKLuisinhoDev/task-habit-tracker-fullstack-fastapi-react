import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/Layout';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
       <Route path="/login" element={<LoginPage />} />
       <Route path="/register" element={<RegisterPage />} />
       
       <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
       }>
          <Route index element={<DashboardPage />} />
       </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
         <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
