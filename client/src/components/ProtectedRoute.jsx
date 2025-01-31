import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      toast.error('You need to login to view projects');
    }
  }, [user]);

  if (!user) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoute;
