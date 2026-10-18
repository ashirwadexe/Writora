import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    // Guest user: allow public access
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId)
      .select("-password");

    if (user) {
      req.user = user;
    }

    return next();
  } catch (error) {
    // Invalid/expired token must not block public reading
    return next();
  }
};

export default optionalAuth;