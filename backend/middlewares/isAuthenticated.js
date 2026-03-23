import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Check if token exists in cookies
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.SECRET_KEY, {
            algorithms: ['HS256'] // Explicitly specify algorithm
        });

        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        // Attach user ID to request object
        req.id = decoded.userId;
        req.role = decoded.role; // Also attach role for authorization
        next();
    } catch (error) {
        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired",
                success: false
            });
        }
        
        console.error('Authentication error:', error);
        return res.status(500).json({
            message: "Authentication failed",
            success: false
        });
    }
};

export default isAuthenticated;