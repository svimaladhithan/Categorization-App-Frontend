import React, { createContext, useState, ReactNode } from 'react';

interface User {
    username: string | null;
    userId: string | null;
}

interface AuthContextType {
    user: User | null; 
    login: (username: string, userId: string) => void; 
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return null;
        }
    });

    const login = (username: string, userId: string) => {
        const userData = { username, userId }; 
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); 
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