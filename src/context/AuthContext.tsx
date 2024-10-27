import React, { createContext, useState, ReactNode } from 'react';

interface User {
    id: string;
    username: string;
}

interface AuthContextType {
    user: User | null;
    login: (id: string, username: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const storedUser = localStorage.getItem('user');
    const storedUserId = localStorage.getItem('userId');
    
    const [user, setUser] = useState<User | null>(storedUser && storedUserId ? { id: storedUserId, username: storedUser } : null);
    
    const login = (id: string, username: string) => {
        const newUser = { id, username };
        setUser(newUser);
        localStorage.setItem('user', username); 
        localStorage.setItem('userId', id);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};