// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null; // Optionally, render a loading spinner here

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
}

export default ProtectedRoute;
