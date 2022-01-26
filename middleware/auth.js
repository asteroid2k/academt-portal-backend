require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { TokenExpiredError } = jwt;

// Check and verify  JWT in request
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // return unauthenticated if theres no token
  if (token === null) return res.sendStatus(401);

  // verify token and get associated user
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
    // unauthorised
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.sendStatus(401);
    }
    // set user object if authenticated
    try {
      const user = await User.findOne({ email: payload.email }, "-password");
      if (!user) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req.user = user;
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Authentication failed" });
    }
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  const { user } = req;
  if (!user) {
    return res.sendStatus(401);
  }
  if (!user.isAdmin) {
    return res.sendStatus(403);
  }
  next();
};

module.exports = { verifyAdmin, verifyToken };
