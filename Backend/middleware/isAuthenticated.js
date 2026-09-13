import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
        // 1. Extract the JWT token from the browser's cookies.
        // The token was created during login and stored in the "token" cookie.
        const token = req.cookies.token;

        // If there is no token, the user is not logged in/authenticated.
        if (!token) {
            return res.status(401).json({
                message: "User is not authenticated",
                success: false
            });
        }

        // 2. Verify the JWT using our secret key.
        // If the token is valid, jwt.verify() returns the decoded payload.
        // Our payload contains the user's ID: { userId: user._id }
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 3. Find the user in MongoDB using the userId
        // that we extracted from the verified JWT.
        const user = await User.findById(decode.userId);

        // If no user exists with this ID, the token belongs to
        // a user that no longer exists in the database.
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }

        // 4. Attach the authenticated user to the request object.
        // This allows the next controller to access the logged-in user
        // using req.user without verifying the token again.
        req.user = user;

        // 5. Continue to the next middleware/controller.
        next();

    } catch (error) {
        console.log("Authentication error:", error);

        // jwt.verify() can throw an error if the token is invalid,
        // expired, or corrupted.
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

export default isAuthenticated;