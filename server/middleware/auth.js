const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  // const token = req.header("Authorization").replace("Bearer ", "");
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Access token is missing",
    });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({
      _id: data._id,
      "tokens.token": token,
    });
    if (!user) {
      result = {
        error: true,
        message: "Invalid token",
      };

      return res.status(401).json(result);
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

module.exports = auth;
