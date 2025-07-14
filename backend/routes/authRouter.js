import express from "express";
import logger from "../util/logger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import excludeKeys from "../util/excludeKeys.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    logger.error("Failed registration attempt: missing fields");
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.register({
      username,
      name,
      email,
      hashedPassword,
    });

    const safeUser = excludeKeys(user, ["password_hash", "email"]);
    const token = jwt.sign(safeUser, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    logger.info(`User registered: ${username}, Name: ${name}, Email: ${email}`);
    return res.status(201).json({ user: safeUser, token });
  } catch (error) {
    if (error.code === "23505") {
      logger.error(
        `Duplicate registration attempt: ${username} already exists`
      );
      return res.status(409).json({ error: "User already exists" });
    }

    logger.error(
      "Error during registration for user " +
        username +
        ": " +
        error.message +
        error.stack
    );
    return res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    logger.error("Error during login attempt: missing fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await userModel.login({ email });
    if (!user) {
      logger.error(
        `Error during login attempt: user with email ${email} not found`
      );
      return res.status(401).json({ error: "User not found" });
    }

    const isCorrectPwd = await bcrypt.compare(password, user.password_hash);
    if (isCorrectPwd) {
      logger.info(
        `User logged in: ${user.username}, Name: ${user.name}, Email: ${user.email}`
      );

      const safeUser = excludeKeys(user, ["password_hash"]);
      const token = jwt.sign(safeUser, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      return res.status(200).json({ user: safeUser, token });
    } else {
      logger.error("Error during login attempt: wrong password");
      return res.status(401).json({ error: "invalid credentials" });
    }
  } catch (error) {
    logger.error("Error during login attempt: " + error.message + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default authRouter;
