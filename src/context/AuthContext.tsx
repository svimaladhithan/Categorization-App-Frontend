import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
    user: string | null;
    login: (username: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);

    const login = (username: string) => {
        setUser(username);
        localStorage.setItem('user', username); // Persist user session
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};