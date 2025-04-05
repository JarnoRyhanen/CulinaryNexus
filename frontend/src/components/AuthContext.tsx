import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext)

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
};

import { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true'
    })

    const login = () => {
        setIsAuthenticated(true)
        localStorage.setItem('isAuthenticated', String(true))
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem("password");
        localStorage.removeItem("username");
        localStorage.removeItem('isAuthenticated');
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}