import logger from "../util/logger.js";
import jwt from "jsonwebtoken";

const authMiddware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Token verification failed: " + error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddware;
