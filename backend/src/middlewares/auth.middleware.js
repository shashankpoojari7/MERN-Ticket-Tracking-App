import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
try {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = await User.findById(decoded._id).select("-password -refreshToken");
    if (!req.user) {
        throw new ApiError(401, "Invalid token");
    }

    next();
    } catch (error) {
    return res.status(401).json({
        success: false,
        message: error.message || "Invalid or expired token",
    });
    }
};
