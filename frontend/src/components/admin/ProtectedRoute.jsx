import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // Only redirect if we have a user state (not loading) and they're not a recruiter
        if (user && user.role !== 'recruiter') {
            navigate("/");
        }
    }, [user, navigate]);

    // Don't render children if user is not authenticated or not a recruiter
    if (!user || user.role !== 'recruiter') {
        return null;
    }

    return children;
};
export default ProtectedRoute;