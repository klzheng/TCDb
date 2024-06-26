const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/error");
const User = require("../db/models/user");

// verifies jwt
exports.isAuth = async (req, res, next) => {
    const token = req.headers?.authorization;
    if (!token) return sendError(res, "Invalid token")

    const jwtToken = token.split("Bearer ")[1];
    if (!jwtToken) return sendError(res, "Invalid token");
    
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId } = decode;

    const user = await User.findById(userId);
    if (!user) return sendError(res, "Unauthorized access");
    
    req.user = user;
    
    next();
};

exports.Auth = (req, res) => {
    const { user } = req;
    res.json({ user: { id: user._id, name: user.name, email: user.email, isVerified: user.isVerified } });
}