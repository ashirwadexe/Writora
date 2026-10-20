import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!user;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/auth/user-profile");
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    },[]);

    // login api function
    const login = async (formData) => {
        const response = await api.post("/auth/login", formData);
        setUser(response.data.user);
        return response.data;
    };

    // logout api function
    const logout = async () => {
        const response = await api.get("/auth/logout");
        setUser(null);
        return response.data;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;