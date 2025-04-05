import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

    const authContext = useAuth();

    if (!authContext) {
        throw new Error("AuthContext is null. Ensure that ProtectedRoute is wrapped in an AuthProvider.");
    }

    const { isAuthenticated } = authContext;

    if (!isAuthenticated) {
        return <Navigate to="/login"/>
    } else {
        return children;
    }
}

export default ProtectedRoute;