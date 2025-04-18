import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext)

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
};

import { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    useEffect(() => {
        const interval = setInterval(() => {
          checkSessionExpiration();
        }, 1000 * 60);
    
        return () => clearInterval(interval);
      }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true'
    })

    const login = () => {
        setIsAuthenticated(true)
        localStorage.setItem('isAuthenticated', String(true))
    }

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("loginTime");
        localStorage.removeItem('isAuthenticated');
    }

    
  const checkSessionExpiration = () => {
    const loginTime = localStorage.getItem("loginTime");
    if (loginTime) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(loginTime, 10);
      const oneHour =  60 * 60 * 1000;

      if (elapsedTime > oneHour) {
          logout();
          alert("Session expired, you have been logged out");
      }
    }
}

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}