import React, { createContext, useState, useContext, ReactNode } from 'react';
import Realm from 'realm';
import { useRealm, useQuery } from '@realm/react';
import { User } from '../models/User';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    signup: (name: string, email: string, password: string) => boolean;
    logout: () => void;
    error: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState('');
    const realm = useRealm();
    const users = useQuery(User);

    const login = (email: string, password: string) => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            setUser(foundUser);
            setError('');
            return true;
        } else {
            setError('Invalid email or password');
            return false;
        }
    };

    const signup = (name: string, email: string, password: string) => {
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            setError('User already exists');
            return false;
        }

        try {
            let newUser: User;
            realm.write(() => {
                newUser = realm.create('User', {
                    _id: new Realm.BSON.UUID(),
                    name,
                    email,
                    password,
                    createdAt: new Date(),
                }) as unknown as User;
            });
            // setUser(newUser!); // Auto-login after signup? or require login. Let's require login for now or auto-login.
            // Auto-login is better UX.
            // setUser(newUser!); 
            // Actually, passing Realm Objects across state can be tricky if they get invalidated, but here it should be fine as long as the component is mounted.
            // However, for safety, returning true allows the UI to navigate to Login or we can just set user.

            setUser(newUser!);
            setError('');
            return true;
        } catch (e) {
            console.error(e);
            setError('Failed to create user');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
