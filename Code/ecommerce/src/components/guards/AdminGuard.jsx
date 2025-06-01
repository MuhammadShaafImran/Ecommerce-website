import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminGuard = ({ children }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const { isAdmin, user } = useAuth();

  useEffect(() => {
    // If no user or not admin, redirect to login
    if (!user || !isAdmin()) {
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;
