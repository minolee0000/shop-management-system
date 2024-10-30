// AuthContext.js
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    jwtToken: string | null;
    loading: boolean;
    login: (token: string) => void;  // specify that login takes a token as a string
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    jwtToken: null,
    loading: true,
    login: () => {},
    logout: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) { // specify the type for children
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [jwtToken, setJwtToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    function login(token: string) {
        setIsAuthenticated(true);
        setJwtToken(token);
        localStorage.setItem("token", token);
    }

    function logout() {
        setIsAuthenticated(false);
        setJwtToken(null);
        localStorage.removeItem("token");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
            setJwtToken(token);
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, jwtToken, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
