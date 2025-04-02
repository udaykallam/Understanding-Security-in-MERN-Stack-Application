const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }

    console.log("Token from auth middleware:", token);

    // Remove 'Bearer' prefix if present
    const jwtToken = token.startsWith('Bearer ') ? token.slice(7, token.length).trim() : token;
    console.log("Parsed token from auth middleware:", jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({ email: isVerified.email }).select('-password');
        console.log(userData);
        if (!userData) {
            return res.status(401).json({ message: "Unauthorized. User not found." });
        }
        req.user = userData;
        req.token = jwtToken;
        req.userID = userData._id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};

module.exports = authMiddleware;
