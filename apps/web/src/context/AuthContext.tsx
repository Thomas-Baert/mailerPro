import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as authService from '../services/auth.service';
import { tokenRemove } from '../utils/tokenRegister';

interface User {
    id: string;
    email: string;
    role: string;
    firstName?: string;
    surname?: string;
    username?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const token = localStorage.getItem('token');

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['me'],
        queryFn: () => authService.getMe(),
        enabled: !!token,
        retry: false,
    });

    const logout = () => {
        tokenRemove();
        window.location.href = '/mailerpro/login';
    };

    return (
        <AuthContext.Provider value={{
            user: isError ? null : (user || null),
            isLoading: !!token && isLoading,
            logout,
            isAuthenticated: !!token && !isError
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
