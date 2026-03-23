import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import imagekit from "../utils/imagekit.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Validate required fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            });
        }

        // Validate password strength (min 6 characters)
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists with this email',
                success: false,
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Handle profile photo upload (optional)
        let profilePhotoUrl = "";
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const imagekitResponse = await imagekit.upload({
                    file: fileUri.content,
                    fileName: req.file.originalname,
                });
                profilePhotoUrl = imagekitResponse.url;
            } catch (uploadError) {
                console.error('Image upload error:', uploadError);
                // Continue with registration even if image upload fails
                profilePhotoUrl = "";
            }
        }

        // Create user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl,
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            message: "Internal server error during registration",
            success: false
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        // Verify role
        if (role !== user.role) {
            return res.status(403).json({
                message: "Account doesn't exist with current role",
                success: false
            });
        }

        // Create JWT token
        const tokenData = {
            userId: user._id,
            role: user.role
        };

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: '1d'
        });

        // Prepare user object for response (exclude password)
        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        // Set cookie and send response
        const isProduction = process.env.NODE_ENV === 'production';
        return res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'strict' : 'lax'
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user: userResponse,
                success: true
            });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: "Internal server error during login",
            success: false
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", {
                maxAge: 0,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
            })
            .json({
                message: "Logged out successfully",
                success: true
            });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({
            message: "Internal server error during logout",
            success: false
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;

        // Find user
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update fields if provided
        if (fullname) user.fullname = fullname;
        if (email) {
            // Check if email is already taken by another user
            const existingUser = await User.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(409).json({
                    message: "Email already in use",
                    success: false
                });
            }
            user.email = email;
        }
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) {
            user.profile.skills = skills.split(",");
        }

        // Handle file upload (resume or profile photo)
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const imagekitResponse = await imagekit.upload({
                    file: fileUri.content,
                    fileName: req.file.originalname,
                });

                // Determine if it's a resume or profile photo based on file type
                if (req.file.mimetype.startsWith('image/')) {
                    user.profile.profilePhoto = imagekitResponse.url;
                } else {
                    user.profile.resume = imagekitResponse.url;
                    user.profile.resumeOriginalName = req.file.originalname;
                }
            } catch (uploadError) {
                console.error('File upload error:', uploadError);
                return res.status(500).json({
                    message: "Failed to upload file",
                    success: false
                });
            }
        }

        await user.save();

        // Prepare user object for response
        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user: userResponse,
            success: true
        });
    } catch (error) {
        console.error('Update profile error:', error);
        return res.status(500).json({
            message: "Internal server error during profile update",
            success: false
        });
    }
}
