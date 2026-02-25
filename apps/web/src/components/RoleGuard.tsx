import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoleGuardProps {
    children: ReactNode;
    allowedRoles: string[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading user profile...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user && !allowedRoles.includes(user.role)) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Access Denied</h1>
                <p>You do not have permission to view this page.</p>
                <p>Required roles: {allowedRoles.join(', ')}</p>
            </div>
        );
    }

    return <>{children}</>;
}
