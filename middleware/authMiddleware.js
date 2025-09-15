const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Blacklist = require('../models/Blacklist');

const authMiddleware = async (req, res, next) => {
    try {
        // get token form cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("Access denied, please log in");
        }

        // Check if token is blacklisted
        const blacklisted = await Blacklist.findOne({token});
        if (blacklisted) {
            return res.status(401).send("Token is blacklisted. Log in again.");
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // find user by id if needed
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send("User not found");
        }

        // attach user info
        req.user = user;

        next();
    }
    catch (err) {
        return res.status(401).send("Invalid or expired token. Log in again");
    }
};

module.exports = authMiddleware;
